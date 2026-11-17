// Admin panel (/101). Owners (by verified Telegram username) see everything;
// task admins (zro_admins rows) can only list, add, edit and delete tasks.
import { createServerFn } from "@tanstack/react-start";
import { OWNER_USERNAMES, db, verifyUser } from "./zro.functions";

type Input = { initData: string };
type Role = "owner" | "tasks" | null;

async function whoAmI(initData: string): Promise<{ role: Role; tg: number }> {
  const { user } = await verifyUser(initData);
  if (user.username && OWNER_USERNAMES.includes(user.username.toLowerCase())) return { role: "owner", tg: user.id };
  const sb = await db();
  const { data } = await sb.from("zro_admins").select("role").eq("tg_id", user.id).maybeSingle();
  return { role: data ? "tasks" : null, tg: user.id };
}
async function need(initData: string, min: "owner" | "tasks") {
  const me = await whoAmI(initData);
  if (!me.role || (min === "owner" && me.role !== "owner")) throw new Error("مش مسموح");
  return me;
}

export const adminMe = createServerFn({ method: "POST" }).inputValidator((i: Input) => i)
  .handler(async ({ data }) => ({ role: (await whoAmI(data.initData)).role }));

export const adminStats = createServerFn({ method: "POST" }).inputValidator((i: Input) => i)
  .handler(async ({ data }) => {
    await need(data.initData, "owner");
    const sb = await db();
    const day = new Date(Date.now() - 86_400_000).toISOString();
    const c = (q: any) => q.then((r: any) => r.count ?? 0);
    const [users, users24, verified, premium, withdrawals, pays] = await Promise.all([
      c(sb.from("zro_users").select("tg_id", { count: "exact", head: true })),
      c(sb.from("zro_users").select("tg_id", { count: "exact", head: true }).gte("created_at", day)),
      c(sb.from("zro_users").select("tg_id", { count: "exact", head: true }).eq("verified", true)),
      c(sb.from("zro_users").select("tg_id", { count: "exact", head: true }).eq("premium", true)),
      c(sb.from("zro_withdrawals").select("id", { count: "exact", head: true })),
      sb.from("zro_payments").select("memo,tg_id,kind,ref,amount,created_at").order("created_at", { ascending: false }).limit(1000),
    ]);
    const list = pays.data ?? [];
    const gram = list.reduce((a: number, p: any) => a + Number(p.amount), 0);
    const gram24 = list.filter((p: any) => p.created_at >= day).reduce((a: number, p: any) => a + Number(p.amount), 0);
    const { data: admins } = await sb.from("zro_admins").select("tg_id,username");
    return { users, users24, verified, premium, withdrawals, payments: list.length, gram, gram24, recent: list.slice(0, 20), admins: admins ?? [] };
  });

export const adminTasks = createServerFn({ method: "POST" }).inputValidator((i: Input) => i)
  .handler(async ({ data }) => {
    await need(data.initData, "tasks");
    const sb = await db();
    const { data: rows } = await sb.from("zro_tasks").select("id,title,url,chat_id,reward_energy,active,expires_at").order("sort");
    return rows ?? [];
  });

type TaskIn = { id?: string; title: string; url: string; chat_id?: string | null; reward_energy: number; active: boolean };
export const adminSaveTask = createServerFn({ method: "POST" }).inputValidator((i: Input & { task: TaskIn }) => i)
  .handler(async ({ data }) => {
    await need(data.initData, "tasks");
    const t = data.task;
    const title = String(t.title ?? "").trim().slice(0, 80);
    const url = String(t.url ?? "").trim();
    const energy = Math.max(0, Math.min(1000, Math.round(Number(t.reward_energy) || 0)));
    if (title.length < 2 || !/^https:\/\/\S+$/.test(url)) throw new Error("اكتب اسم ورابط صح");
    const row = { title, url, chat_id: t.chat_id?.trim() || null, reward_energy: energy, active: !!t.active };
    const sb = await db();
    const r = t.id ? await sb.from("zro_tasks").update(row).eq("id", t.id) : await sb.from("zro_tasks").insert({ ...row, sort: 50 });
    if (r.error) throw new Error(r.error.message);
    return { ok: true };
  });

export const adminDeleteTask = createServerFn({ method: "POST" }).inputValidator((i: Input & { id: string }) => i)
  .handler(async ({ data }) => {
    await need(data.initData, "tasks");
    const sb = await db();
    await sb.from("zro_task_claims").delete().eq("task_id", data.id);
    const r = await sb.from("zro_tasks").delete().eq("id", data.id);
    if (r.error) throw new Error(r.error.message);
    return { ok: true };
  });

/** Owners add/remove task admins by Telegram username (the person must have opened the app once). */
export const adminSetTaskAdmin = createServerFn({ method: "POST" }).inputValidator((i: Input & { username: string; remove?: boolean }) => i)
  .handler(async ({ data }) => {
    await need(data.initData, "owner");
    const name = String(data.username ?? "").replace(/^@/, "").trim();
    const sb = await db();
    const { data: u } = await sb.from("zro_users").select("tg_id,username").ilike("username", name).maybeSingle();
    if (!u) throw new Error("المستخدم ده لازم يفتح التطبيق الأول");
    const r = data.remove ? await sb.from("zro_admins").delete().eq("tg_id", u.tg_id)
      : await sb.from("zro_admins").upsert({ tg_id: u.tg_id, username: u.username, role: "tasks" });
    if (r.error) throw new Error(r.error.message);
    return { ok: true };
  });
