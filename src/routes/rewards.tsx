import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Check, Users } from "lucide-react";
import { toast } from "@/lib/notify";
import ZroPage, { Section } from "@/components/zro/ZroPage";
import { usePay } from "@/hooks/use-pay";
import InviteCard from "@/components/zro/InviteCard";
import { act, initData, useZro } from "@/hooks/use-zro";
import { DRAW_BG, ENERGY_ICON, GRAM_ICON } from "@/lib/zro-assets";
import { DRAW_ENTRY_GRAM, dailyDrawPrize } from "@/lib/zro-rewards";
import { zroAddTask, zroClaimTask, zroDraw, zroInvites, zroTasks } from "@/lib/zro.functions";

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
  const payer = usePay();
  const join = async () => {
    setBusy(true);
    if (await payer.pay("D", DRAW_ENTRY_GRAM)) { qc.invalidateQueries({ queryKey: ["zro-draw"] }); toast("دخلت السحب، بالتوفيق"); }
    setBusy(false);
  };
  const d = q.data;
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-border p-4" style={{ backgroundImage: `linear-gradient(270deg, var(--background) 30%, transparent 75%), url(${DRAW_BG})`, backgroundSize: "cover", backgroundPosition: "left center" }}>
      <div className="relative flex items-center gap-4">
        <div className="min-w-0 flex-1 py-4">
          <p className="text-xs text-muted-foreground">جائزة سحب النهارده</p>
          <p dir="ltr" className="flex items-center justify-end gap-1.5 font-display text-4xl font-extrabold tabular-nums">
            {dailyDrawPrize(new Date().toISOString().slice(0, 10))} <img src={GRAM_ICON} alt="GRAM" className="h-7 w-7 rounded-full" />
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

      <InviteCard link={`https://t.me/zroeobot?start=ref_${inv.data?.tg ?? (typeof window !== "undefined" ? (window as any).Telegram?.WebApp?.initDataUnsafe?.user?.id ?? "" : "")}`} count={inv.data?.count ?? 0} />

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
        <AddTask />
      </Section>

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

const TASK_KEY = "zro_task_memo";

/** Paid 1 GRAM listing: pay from the wallet, then name the task and its link. */
function AddTask() {
  const { pay, busy, connected, connect } = usePay();
  const qc = useQueryClient();
  const [memo, setMemo] = useState<string | null>(() => (typeof window !== "undefined" ? localStorage.getItem(TASK_KEY) : null));
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const start = async () => {
    if (!connected) return connect();
    let m = "";
    const ok = await pay("T", 1, "", (x) => { m = x; });
    if (ok) { localStorage.setItem(TASK_KEY, m); setMemo(m); }
  };
  const submit = async () => {
    if (!memo) return;
    const r = await act(() => zroAddTask({ data: { initData: initData(), memo, title, url } }));
    if (r) { localStorage.removeItem(TASK_KEY); setMemo(null); setTitle(""); setUrl(""); qc.invalidateQueries({ queryKey: ["zro-tasks"] }); toast.success("اتضافت مهمتك"); }
  };
  if (memo) return (
    <div className="surface mt-3 flex flex-col gap-2 rounded-[24px] p-3">
      <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={60} placeholder="اسم المهمة" className="rounded-2xl bg-muted px-3 py-2 text-sm outline-none" />
      <input value={url} onChange={(e) => setUrl(e.target.value)} dir="ltr" placeholder="https://t.me/..." className="rounded-2xl bg-muted px-3 py-2 text-sm outline-none" />
      <button type="button" onClick={submit} className="btn-glossy btn-success pressable rounded-full py-2 font-display text-sm font-bold">أضف المهمة</button>
    </div>
  );
  return (
    <button type="button" disabled={busy} onClick={start} className="surface pressable mt-3 flex w-full items-center gap-3 rounded-[24px] px-3 py-3">
      <span className="flex-1 text-start font-display text-sm font-bold">أضف مهمتك</span>
      <Amount value="1" icon={GRAM_ICON} />
    </button>
  );
}
