// Telegram webhook for @zroeobot: answers /start with the welcome message and records invites.
import { createFileRoute } from "@tanstack/react-router";

const APP_URL = "https://project--5ca5574f-0b2d-4147-a25f-736a900a14cd.lovable.app";
const E = { gem: "5449699825106829662", rocket: "5451622273943358160", wallet: "5449659783126730639", star: "5429523378715254219" };
const em = (id: string, fb: string) => `<tg-emoji emoji-id="${id}">${fb}</tg-emoji>`;

async function webhookSecret(token: string) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`zro-webhook:${token}`));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function welcome(name: string, fancy: boolean) {
  const e = (k: keyof typeof E, fb: string) => (fancy ? em(E[k], fb) : fb);
  const text =
    `${e("gem", "💎")} <b>أهلاً ${name}</b>\n\n` +
    `<b>ارمي النرد، حرّك قطعتك، واجمع ZRO</b> ${e("rocket", "🚀")}\n\n` +
    `${e("star", "⭐️")} <b>مكافآت كل يوم</b>\n` +
    `${e("wallet", "👛")} <b>اسحب على محفظتك</b>`;
  const btn = (b: Record<string, unknown>, icon: string) => (fancy ? { ...b, icon_custom_emoji_id: icon } : b);
  const reply_markup = {
    inline_keyboard: [
      [btn({ text: "العب الآن", web_app: { url: APP_URL }, style: "success" }, E.rocket)],
      [btn({ text: "ادعُ صحابك", url: "https://t.me/share/url?url=https://t.me/zroeobot", style: "primary" }, E.gem)],
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
          const w = welcome(esc(from.first_name ?? "بيك"), fancy);
          return fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: msg.chat.id, parse_mode: "HTML", photo: `${APP_URL}/zro-start.jpg`, caption: w.text, reply_markup: w.reply_markup }),
          });
        };
        const r = await send(true);
        // Custom emoji or coloured buttons can be refused for some bots; fall back to plain.
        if (!r.ok) {
          console.error("zro bot fancy send failed", r.status, await r.text());
          await send(false);
        }
        return Response.json({ ok: true });
      },
    },
  },
});
