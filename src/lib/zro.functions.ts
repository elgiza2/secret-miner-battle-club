// Every ZRO balance change happens here, on the server, against the zro_* tables.
// The caller is identified by Telegram's signed initData, checked with the bot token.
import { createServerFn } from "@tanstack/react-start";
import {
  applyRegen, applyRoll, addReward, canRoll, rollDie, round, MIN_WITHDRAW, SEASON_PASS_GRAM,
  VERIFY_FEE_GRAM, adsForPrice, type BoardState, type Reward,
} from "./zro-board";
import {
  AD_GAP_SECONDS, BUNDLES, DRAW_ENTRY_GRAM, SEASON_TIER_COUNT, WHEEL_PRIZES, XP_PER_TIER,
  bundleReward, pickPrize, prizeReward, tierReward, tierToReward,
} from "./zro-rewards";

type TgUser = { id: number; username?: string; first_name?: string; photo_url?: string };
type Input = { initData: string };
const v = <T extends object>(i: unknown) => i as Input & T;

async function hmac(key: BufferSource, msg: string) {
  const k = await crypto.subtle.importKey("raw", key as ArrayBuffer, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(msg)));
}

async function verifyUser(initData: string): Promise<{ user: TgUser; ref: number | null }> {
  const token = process.env["ZRO_BOT_TOKEN"];
  if (!initData) {
    // Browser preview only (outside Telegram): a fixed test player. Never in the published app.
    if (process.env["NODE_ENV"] !== "production") return { user: { id: 123456789, first_name: "Player" }, ref: null };
    throw new Error("افتح التطبيق من تيليجرام");
  }
  if (!token) throw new Error("bot token missing");
  const params = new URLSearchParams(initData);
  const hash = params.get("hash") ?? "";
  params.delete("hash");
  const check = [...params.entries()].map(([k, x]) => `${k}=${x}`).sort().join("\n");
  const secret = await hmac(new TextEncoder().encode("WebAppData"), token);
  const sig = [...(await hmac(secret, check))].map((b) => b.toString(16).padStart(2, "0")).join("");
  if (sig !== hash) throw new Error("invalid telegram data");
  const authDate = Number(params.get("auth_date") ?? 0);
  if (Date.now() / 1000 - authDate > 7 * 86400) throw new Error("session expired");
  const user = JSON.parse(params.get("user") ?? "{}") as TgUser;
  const sp = params.get("start_param") ?? "";
  const ref = /^ref_?(\d+)$/.test(sp) ? Number(sp.replace(/\D/g, "")) : null;
  return { user, ref: ref && ref !== user.id ? ref : null };
}

async function db() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

type Row = Record<string, any>;

async function loadUser(initData: string) {
  const { user, ref } = await verifyUser(initData);
  const sb = await db();
  let { data: row } = await sb.from("zro_users").select("*").eq("tg_id", user.id).maybeSingle();
  if (!row) {
    const ins = await sb.from("zro_users").insert({
      tg_id: user.id, username: user.username ?? null, first_name: user.first_name ?? null,
      photo_url: user.photo_url ?? null, ref_by: ref,
    }).select("*").single();
    if (ins.error) throw new Error(ins.error.message);
    row = ins.data;
  }
  return { sb, row: row as Row, tg: user.id };
}

const toState = (r: Row): BoardState => applyRegen({
  position: r.position, energy: r.energy, zro: Number(r.zro), xp: r.xp, gram: Number(r.gram),
  spins: r.spins, regenFrom: new Date(r.regen_from).getTime(),
}, Date.now());

const fromState = (s: BoardState) => ({
  position: s.position, energy: s.energy, zro: s.zro, xp: s.xp, gram: s.gram, spins: s.spins,
  regen_from: new Date(s.regenFrom).toISOString(),
});

/** Writes only if nobody changed the row since we read it (stops double-spend from parallel taps). */
async function save(sb: Awaited<ReturnType<typeof db>>, r: Row, patch: Row) {
  const { data, error } = await sb.from("zro_users").update(patch as any).eq("tg_id", r.tg_id).eq("updated_at", r.updated_at).select("*");
  if (error) throw new Error(error.message);
  if (!data?.length) throw new Error("حاول تاني");
  return data[0] as Row;
}

function dto(r: Row) {
  const s = toState(r);
  return {
    ...s, verified: r.verified as boolean, premium: r.premium as boolean, ads: r.ads_watched as number,
    wallet: (r.wallet_address as string | null) ?? null, tgId: Number(r.tg_id),
  };
}
export type ZroMe = ReturnType<typeof dto>;

const needVerified = (r: Row) => { if (!r.verified) throw new Error("وثّق محفظتك الأول"); };
const spendGram = (s: BoardState, amount: number) => {
  if (s.gram < amount) throw new Error("رصيد GRAM مش كفاية");
  return { ...s, gram: round(s.gram - amount) };
};

export const zroMe = createServerFn({ method: "POST" }).inputValidator((i: Input) => i)
  .handler(async ({ data }) => dto((await loadUser(data.initData)).row));

export const zroRoll = createServerFn({ method: "POST" }).inputValidator((i: Input) => i)
  .handler(async ({ data }) => {
    const { sb, row } = await loadUser(data.initData);
    needVerified(row);
    const s = toState(row);
    if (!canRoll(s)) throw new Error("الطاقة خلصت");
    const die = rollDie();
    const res = applyRoll(s, die, Date.now());
    const saved = await save(sb, row, fromState(res.state));
    return { me: dto(saved), die, from: s.position, landed: res.landed, kind: res.kind, reward: res.reward as Reward };
  });

export const zroSpin = createServerFn({ method: "POST" }).inputValidator((i: Input) => i)
  .handler(async ({ data }) => {
    const { sb, row } = await loadUser(data.initData);
    const s = toState(row);
    if (s.spins <= 0) throw new Error("مفيش لفات");
    const idx = pickPrize();
    const next = addReward({ ...s, spins: s.spins - 1 }, prizeReward(WHEEL_PRIZES[idx]!));
    return { me: dto(await save(sb, row, fromState(next))), index: idx };
  });

/** Called after a Monetag rewarded ad finished. `purpose` decides the reward. */
export const zroAd = createServerFn({ method: "POST" }).inputValidator((i: unknown) => v<{ purpose: "spin" | "credit" | "energy" }>(i))
  .handler(async ({ data }) => {
    const { sb, row } = await loadUser(data.initData);
    const last = row.last_ad_at ? new Date(row.last_ad_at).getTime() : 0;
    if (Date.now() - last < AD_GAP_SECONDS * 1000) throw new Error("استنى شوية قبل الإعلان الجاي");
    let s = toState(row);
    if (data.purpose === "spin") s = { ...s, spins: s.spins + 1 };
    if (data.purpose === "energy") s = { ...s, energy: s.energy + 5 };
    const saved = await save(sb, row, { ...fromState(s), last_ad_at: new Date().toISOString(), ads_watched: row.ads_watched + (data.purpose === "credit" ? 1 : 0) });
    return dto(saved);
  });

export const zroBuy = createServerFn({ method: "POST" }).inputValidator((i: unknown) => v<{ bundle: string; withAds: boolean }>(i))
  .handler(async ({ data }) => {
    const { sb, row } = await loadUser(data.initData);
    const b = BUNDLES.find((x) => x.id === data.bundle);
    if (!b) throw new Error("باقة غير موجودة");
    let s = toState(row);
    let ads = row.ads_watched as number;
    if (data.withAds) {
      const need = adsForPrice(b.gram);
      if (ads < need) throw new Error(`محتاج ${need - ads} إعلان كمان`);
      ads -= need;
    } else throw new Error("الدفع بيتم من محفظتك");
    s = addReward(s, bundleReward(b));
    return dto(await save(sb, row, { ...fromState(s), ads_watched: ads }));
  });

/** Receiving wallet for verification and premium payments. */
const PAY_TO = "UQA5k2qscmlDz0tYaNMlmhCW5czvc6zMJpB78T4y4GDz9Q5a";

/** True when the receiving wallet got at least `minTon` with comment `memo` (checked on the TON blockchain). */
async function paidOnChain(memo: string, minTon: number) {
  const r = await fetch(`https://toncenter.com/api/v2/getTransactions?address=${PAY_TO}&limit=100&archival=true`);
  if (!r.ok) throw new Error("مقدرناش نتحقق من الدفع دلوقتي، جرب كمان شوية");
  const j = (await r.json()) as { result?: { in_msg?: { value?: string; message?: string } }[] };
  return (j.result ?? []).some((t) => t.in_msg?.message?.trim() === memo && Number(t.in_msg?.value ?? 0) >= minTon * 1e9);
}

export const zroBuyPass = createServerFn({ method: "POST" }).inputValidator((i: Input) => i)
  .handler(async ({ data }) => {
    const { sb, row } = await loadUser(data.initData);
    if (row.premium) return dto(row);
    if (!(await paidOnChain(`ZRO-P-${row.tg_id}`, SEASON_PASS_GRAM))) throw new Error("لسه الدفع موصلش، استنى دقيقة وجرب تاني");
    return dto(await save(sb, row, { premium: true }));
  });

/** Pays the one-time verification fee from the in-app GRAM balance. */
export const zroVerify = createServerFn({ method: "POST" }).inputValidator((i: unknown) => v<{ wallet?: string }>(i))
  .handler(async ({ data }) => {
    const { sb, row } = await loadUser(data.initData);
    if (row.verified) return dto(row);
    if (!(await paidOnChain(`ZRO-V-${row.tg_id}`, VERIFY_FEE_GRAM))) throw new Error("لسه الدفع موصلش، استنى دقيقة وجرب تاني");
    return dto(await save(sb, row, { verified: true, wallet_address: data.wallet ?? row.wallet_address }));
  });

export const zroSetWallet = createServerFn({ method: "POST" }).inputValidator((i: unknown) => v<{ wallet: string | null }>(i))
  .handler(async ({ data }) => {
    const { sb, row } = await loadUser(data.initData);
    if (data.wallet && !/^[A-Za-z0-9_\-:]{40,70}$/.test(data.wallet)) throw new Error("عنوان غير صالح");
    return dto(await save(sb, row, { wallet_address: data.wallet }));
  });

export const zroWithdraw = createServerFn({ method: "POST" }).inputValidator((i: unknown) => v<{ coin: "zro" | "gram"; amount: number }>(i))
  .handler(async ({ data }) => {
    const { sb, row } = await loadUser(data.initData);
    needVerified(row);
    if (!row.wallet_address) throw new Error("اربط محفظتك الأول");
    const amount = Number(data.amount);
    if (!Number.isFinite(amount) || amount < MIN_WITHDRAW) throw new Error(`أقل سحب ${MIN_WITHDRAW}`);
    if (data.coin !== "zro" && data.coin !== "gram") throw new Error("عملة غير معروفة");
    const s = toState(row);
    if (s[data.coin] < amount) throw new Error("رصيدك مش كفاية");
    const saved = await save(sb, row, { [data.coin]: round(s[data.coin] - amount) });
    const w = await sb.from("zro_withdrawals").insert({ tg_id: row.tg_id, coin: data.coin, amount, address: row.wallet_address });
    if (w.error) throw new Error(w.error.message);
    return dto(saved);
  });

export const zroDraw = createServerFn({ method: "POST" }).inputValidator((i: unknown) => v<{ join?: boolean }>(i))
  .handler(async ({ data }) => {
    const { sb, row } = await loadUser(data.initData);
    const today = new Date().toISOString().slice(0, 10);
    let me = dto(row);
    const mine = await sb.from("zro_draw_entries").select("id").eq("tg_id", row.tg_id).eq("draw_day", today).maybeSingle();
    let joined = !!mine.data;
    if (data.join && !joined) throw new Error("الدخول بيتم بالدفع من محفظتك");
    const { count } = await sb.from("zro_draw_entries").select("id", { count: "exact", head: true }).eq("draw_day", today);
    return { me, joined, entrants: count ?? 0, pot: round((count ?? 0) * DRAW_ENTRY_GRAM * 0.9) };
  });

export const zroTasks = createServerFn({ method: "POST" }).inputValidator((i: Input) => i)
  .handler(async ({ data }) => {
    const { sb, tg } = await loadUser(data.initData);
    const [{ data: tasks }, { data: done }] = await Promise.all([
      sb.from("zro_tasks").select("id,title,url,reward_energy").eq("active", true).order("sort"),
      sb.from("zro_task_claims").select("task_id").eq("tg_id", tg),
    ]);
    const set = new Set((done ?? []).map((d) => d.task_id));
    return (tasks ?? []).map((t) => ({ ...t, done: set.has(t.id) }));
  });

export const zroClaimTask = createServerFn({ method: "POST" }).inputValidator((i: unknown) => v<{ taskId: string }>(i))
  .handler(async ({ data }) => {
    const { sb, row } = await loadUser(data.initData);
    const { data: t } = await sb.from("zro_tasks").select("*").eq("id", data.taskId).eq("active", true).maybeSingle();
    if (!t) throw new Error("المهمة مش موجودة");
    if (t.chat_id) {
      const token = process.env["ZRO_BOT_TOKEN"];
      const r = await fetch(`https://api.telegram.org/bot${token}/getChatMember?chat_id=${encodeURIComponent(t.chat_id)}&user_id=${row.tg_id}`);
      const j = (await r.json()) as { ok: boolean; result?: { status: string } };
      // If the bot isn't admin there Telegram refuses; then we can't check and we trust the tap.
      if (j.ok && ["left", "kicked"].includes(j.result?.status ?? "")) throw new Error("انضم الأول وبعدين اضغط تحقق");
    }
    const c = await sb.from("zro_task_claims").insert({ tg_id: row.tg_id, task_id: t.id });
    if (c.error) throw new Error("خدت المكافأة قبل كده");
    const s = toState(row);
    return dto(await save(sb, row, fromState({ ...s, energy: s.energy + t.reward_energy })));
  });

export const zroSeason = createServerFn({ method: "POST" }).inputValidator((i: unknown) => v<{ claim?: { tier: number; track: "free" | "premium" } }>(i))
  .handler(async ({ data }) => {
    const { sb, row } = await loadUser(data.initData);
    let me = dto(row);
    if (data.claim) {
      const { tier, track } = data.claim;
      if (!Number.isInteger(tier) || tier < 1 || tier > SEASON_TIER_COUNT) throw new Error("مستوى غلط");
      if (track === "premium" && !row.premium) throw new Error("محتاج البريميوم");
      if (row.xp < tier * XP_PER_TIER) throw new Error("لسه موصلتش للمستوى ده");
      const c = await sb.from("zro_season_claims").insert({ tg_id: row.tg_id, tier, track });
      if (c.error) throw new Error("خدتها قبل كده");
      me = dto(await save(sb, row, fromState(addReward(toState(row), tierToReward(tierReward(tier, track))))));
    }
    const { data: claims } = await sb.from("zro_season_claims").select("tier,track").eq("tg_id", row.tg_id);
    return { me, claims: (claims ?? []).map((c) => `${c.track}:${c.tier}`) };
  });

export const zroInvites = createServerFn({ method: "POST" }).inputValidator((i: Input) => i)
  .handler(async ({ data }) => {
    const { sb, tg } = await loadUser(data.initData);
    const { count } = await sb.from("zro_users").select("tg_id", { count: "exact", head: true }).eq("ref_by", tg);
    return { count: count ?? 0, tg };
  });

/** Price in GRAM for each thing bought straight from the player's wallet. */
function payPrice(kind: string, ref: string): number {
  if (kind === "V") return VERIFY_FEE_GRAM;
  if (kind === "P") return SEASON_PASS_GRAM;
  if (kind === "D") return DRAW_ENTRY_GRAM;
  if (kind === "B") { const b = BUNDLES.find((x) => x.id === ref); if (b) return b.gram; }
  throw new Error("دفع غير معروف");
}

/**
 * Called right after the wallet sends GRAM. Looks for the transfer on the TON chain
 * (comment = memo) and applies it once; returns { paid:false } until it lands.
 * Memo: ZRO-<kind>-<ref>-<tg>-<nonce>
 */
export const zroPayConfirm = createServerFn({ method: "POST" }).inputValidator((i: unknown) => v<{ memo: string }>(i))
  .handler(async ({ data }) => {
    const { sb, row } = await loadUser(data.initData);
    const m = /^ZRO-([VPDB])-([a-z0-9]*)-(\d+)-([a-z0-9]{6,16})$/.exec(data.memo ?? "");
    if (!m || Number(m[3]) !== Number(row.tg_id)) throw new Error("دفع غير صالح");
    const [, kind, ref] = m as unknown as [string, string, string];
    const amount = payPrice(kind, ref);
    const seen = await sb.from("zro_payments").select("memo").eq("memo", data.memo).maybeSingle();
    if (seen.data) return { paid: true, me: dto(row) };
    if (!(await paidOnChain(data.memo, amount))) return { paid: false, me: dto(row) };
    // The memo is the primary key, so one transfer can only ever count once.
    const ins = await sb.from("zro_payments").insert({ memo: data.memo, tg_id: row.tg_id, kind, ref, amount });
    if (ins.error) return { paid: true, me: dto(row) };
    let patch: Record<string, unknown> = {};
    if (kind === "V") patch = { verified: true };
    if (kind === "P") patch = { premium: true };
    if (kind === "B") patch = fromState(addReward(toState(row), bundleReward(BUNDLES.find((x) => x.id === ref)!)));
    if (kind === "D") {
      await sb.from("zro_draw_entries").insert({ tg_id: row.tg_id, draw_day: new Date().toISOString().slice(0, 10) });
    }
    const saved = Object.keys(patch).length ? await save(sb, row, patch) : row;
    return { paid: true, me: dto(saved) };
  });
