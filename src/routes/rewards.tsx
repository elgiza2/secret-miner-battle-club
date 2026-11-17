import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Check, Users } from "lucide-react";
import { toast } from "sonner";
import ZroPage, { Section } from "@/components/zro/ZroPage";
import InviteCard from "@/components/zro/InviteCard";
import { act, initData, useZro } from "@/hooks/use-zro";
import { ENERGY_ICON, GRAM_ICON, LUCKY_DRAW } from "@/lib/zro-assets";
import { DRAW_ENTRY_GRAM } from "@/lib/zro-rewards";
import { zroClaimTask, zroDraw, zroInvites, zroTasks } from "@/lib/zro.functions";

export const Route = createFileRoute("/rewards")({
  component: RewardsPage,
  head: () => ({
    meta: [
      { title: "المكافآت — ZRO" },
      { name: "description", content: "سحب الحظ والمهام ودعوة الأصدقاء في ZRO." },
      { property: "og:title", content: "المكافآت — ZRO" },
      { property: "og:description", content: "سحب الحظ والمهام ودعوة الأصدقاء في ZRO." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function Amount({ value, icon }: { value: string; icon: string }) {
  return (
    <span className="surface-strong flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 font-display text-sm font-bold">
      <span dir="ltr">{value}</span>
      <img src={icon} alt="" className="h-5 w-5 rounded-full" />
    </span>
  );
}

function LuckyDraw() {
  const { set } = useZro();
  const q = useQuery({ queryKey: ["zro-draw"], queryFn: () => zroDraw({ data: { initData: initData() } }) });
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);
  const join = async () => {
    setBusy(true);
    const r = await act(() => zroDraw({ data: { initData: initData(), join: true } }));
    if (r) { set(r.me); qc.setQueryData(["zro-draw"], r); toast("دخلت السحب، بالتوفيق"); }
    setBusy(false);
  };
  const d = q.data;
  return (
    <div className="surface relative overflow-hidden rounded-[28px] p-4">
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/25 blur-3xl" />
      <div className="relative flex items-center gap-4">
        <img src={LUCKY_DRAW} alt="سحب الحظ" className="h-24 w-24 shrink-0 object-contain drop-shadow-xl" />
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">جائزة سحب النهارده</p>
          <p dir="ltr" className="flex items-center justify-end gap-1.5 font-display text-3xl font-extrabold tabular-nums">
            {d?.pot ?? 0} <img src={GRAM_ICON} alt="GRAM" className="h-7 w-7 rounded-full" />
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Users className="h-3.5 w-3.5" /> {d?.entrants ?? 0} مشارك</p>
        </div>
      </div>
      <button type="button" disabled={busy || d?.joined} onClick={join}
        className="btn-glossy btn-premium pressable relative mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full font-display text-base font-extrabold disabled:opacity-60">
        {d?.joined ? <><Check className="h-5 w-5" /> أنت مشارك النهارده</> : <>ادخل السحب بـ <span dir="ltr">{DRAW_ENTRY_GRAM}</span> <img src={GRAM_ICON} alt="" className="h-5 w-5 rounded-full" /></>}
      </button>
    </div>
  );
}

function RewardsPage() {
  const { set } = useZro();
  const qc = useQueryClient();
  const tasks = useQuery({ queryKey: ["zro-tasks"], queryFn: () => zroTasks({ data: { initData: initData() } }) });
  const inv = useQuery({ queryKey: ["zro-invites"], queryFn: () => zroInvites({ data: { initData: initData() } }) });
  const [opened, setOpened] = useState<Record<string, boolean>>({});

  const open = (id: string, url: string) => {
    const tg = (window as any).Telegram?.WebApp;
    if (url.startsWith("https://t.me/") && tg?.openTelegramLink) tg.openTelegramLink(url); else window.open(url, "_blank");
    setOpened((o) => ({ ...o, [id]: true }));
  };
  const claim = async (id: string) => {
    const m = await act(() => zroClaimTask({ data: { initData: initData(), taskId: id } }));
    if (m) { set(m); qc.invalidateQueries({ queryKey: ["zro-tasks"] }); toast("اتضافت الطاقة"); }
  };
  const list = tasks.data ?? [];
  const todo = list.filter((t) => !t.done);
  const done = list.filter((t) => t.done);

  return (
    <ZroPage>
      <Section title="سحب الحظ"><LuckyDraw /></Section>

      <Section title="المهام">
        <div className="surface flex flex-col divide-y divide-border rounded-[24px] px-3">
          {todo.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">خلصت كل المهام</p>}
          {todo.map((t) => (
            <div key={t.id} className="flex items-center gap-3 py-3">
              <p className="min-w-0 flex-1 truncate font-display text-sm font-bold">{t.title}</p>
              <Amount value={String(t.reward_energy)} icon={ENERGY_ICON} />
              {opened[t.id] ? (
                <button type="button" onClick={() => claim(t.id)} className="btn-glossy btn-success pressable rounded-full px-3 py-1.5 font-display text-sm font-bold">تحقق</button>
              ) : (
                <button type="button" onClick={() => open(t.id, t.url)} className="btn-glossy btn-invite pressable rounded-full px-3 py-1.5 font-display text-sm font-bold">ابدأ</button>
              )}
            </div>
          ))}
        </div>
      </Section>

      {inv.data && <InviteCard link={`https://t.me/zroeobot?start=ref_${inv.data.tg}`} count={inv.data.count} />}

      {done.length > 0 && (
        <Section title="المهام المنتهية">
          {done.map((t) => (
            <div key={t.id} className="flex items-center gap-3 rounded-[22px] border border-success/60 bg-success/15 p-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-success/30"><Check className="h-6 w-6 text-success" /></span>
              <p className="min-w-0 flex-1 truncate font-display text-sm font-bold">{t.title}</p>
              <Amount value={String(t.reward_energy)} icon={ENERGY_ICON} />
            </div>
          ))}
        </Section>
      )}
    </ZroPage>
  );
}
