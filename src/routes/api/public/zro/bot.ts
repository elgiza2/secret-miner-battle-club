// Telegram webhook for @zroeobot: answers /start with the welcome message and records invites.
import { createFileRoute } from "@tanstack/react-router";

const SITE = "https://secret-miner-battle-club.lovable.app";
const APP_URL = SITE;
const E = { gem: "5449699825106829662", rocket: "5451622273943358160", wallet: "5449659783126730639", star: "5429523378715254219" };
const em = (id: string, fb: string) => `<tg-emoji emoji-id="${id}">${fb}</tg-emoji>`;

async function webhookSecret(token: string) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`zro-webhook:${token}`));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

type Lang = "ar" | "en" | "ru" | "fa";
const pickLang = (code?: string): Lang => { const c = (code ?? "").slice(0, 2).toLowerCase(); return c === "ar" || c === "ru" || c === "fa" ? c : "en"; };
const COPY: Record<Lang, { hi: string; you: string; l1: string; l2: string; l3: string; play: string; invite: string }> = {
  ar: { hi: "أهلاً", you: "بيك", l1: "ارمي النرد، حرّك قطعتك، واجمع ZRO", l2: "مكافآت كل يوم", l3: "اسحب على محفظتك", play: "العب الآن", invite: "ادعُ صحابك" },
  en: { hi: "Welcome", you: "friend", l1: "Roll the dice, move your piece and collect ZRO", l2: "Rewards every day", l3: "Withdraw to your wallet", play: "Play now", invite: "Invite friends" },
  ru: { hi: "Привет", you: "друг", l1: "Бросай кубик, двигай фишку и собирай ZRO", l2: "Награды каждый день", l3: "Вывод на твой кошелёк", play: "Играть", invite: "Пригласить друзей" },
  fa: { hi: "خوش آمدی", you: "دوست", l1: "تاس بنداز، مهره‌ات را حرکت بده و ZRO جمع کن", l2: "جایزه هر روز", l3: "برداشت به کیف پولت", play: "همین حالا بازی کن", invite: "دعوت از دوستان" },
};

function welcome(name: string, fancy: boolean, lang: Lang, tg: number) {
  const c = COPY[lang];
  const e = (k: keyof typeof E, fb: string) => (fancy ? em(E[k], fb) : fb);
  const text =
    `${e("gem", "💎")} <b>${c.hi} ${name || c.you}</b>\n\n` +
    `<b>${c.l1}</b> ${e("rocket", "🚀")}\n\n` +
    `${e("star", "⭐️")} <b>${c.l2}</b>\n` +
    `${e("wallet", "👛")} <b>${c.l3}</b>`;
  const btn = (b: Record<string, unknown>, icon: string) => (fancy ? { ...b, icon_custom_emoji_id: icon } : b);
  const share = `https://t.me/share/url?url=${encodeURIComponent(`https://t.me/zroeobot?startapp=ref_${tg}`)}`;
  const reply_markup = {
    inline_keyboard: [
      [btn({ text: c.play, web_app: { url: APP_URL }, style: "success" }, E.rocket)],
      [btn({ text: c.invite, url: share, style: "primary" }, E.gem)],
    ],
  };
  return { text, reply_markup };
}

const esc = (s: string) => s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]!);

export const Route = createFileRoute("/api/public/zro/bot")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = process.env["ZRO_BOT_TOKEN"];
        if (!token) return new Response("not configured", { status: 500 });
        if (request.headers.get("X-Telegram-Bot-Api-Secret-Token") !== (await webhookSecret(token))) {
          return new Response("Unauthorized", { status: 401 });
        }
        const update = (await request.json()) as any;
        const msg = update?.message;
        const text: string = msg?.text ?? "";
        if (!msg?.chat?.id || !text.startsWith("/start")) return Response.json({ ok: true });
        const from = msg.from ?? {};
        const arg = text.split(" ")[1] ?? "";
        const ref = /^ref_?\d+$/.test(arg) ? Number(arg.replace(/\D/g, "")) : null;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: exists } = await supabaseAdmin.from("zro_users").select("tg_id").eq("tg_id", from.id).maybeSingle();
        if (!exists) {
          const refBy = ref && ref !== from.id ? ref : null;
          const ins = await supabaseAdmin.from("zro_users").insert({
            tg_id: from.id, username: from.username ?? null, first_name: from.first_name ?? null, ref_by: refBy,
          });
          // Each invited friend pays the inviter 0.005 ZRO (atomic, in the database).
          if (!ins.error && refBy) await supabaseAdmin.rpc("zro_invite_reward", { _tg: refBy, _amount: 0.005 });
        }

        const send = (fancy: boolean) => {
          const w = welcome(esc(from.first_name ?? ""), fancy, pickLang(from.language_code), from.id);
          return fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: msg.chat.id, parse_mode: "HTML", photo: `${SITE}/zro-start.jpg`, caption: w.text, reply_markup: w.reply_markup }),
          });
        };
        const r = await send(true);
        // Custom emoji or coloured buttons can be refused for some bots; fall back to plain.
        if (!r.ok) {
          console.error("zro bot fancy send failed", r.status, await r.text());
          const r2 = await send(false);
          if (!r2.ok) console.error("zro bot plain send failed", r2.status, await r2.text());
        }
        return Response.json({ ok: true });
      },
    },
  },
});
