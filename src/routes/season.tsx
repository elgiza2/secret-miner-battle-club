import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import ZroPage from "@/components/zro/ZroPage";
import PremiumSheet from "@/components/zro/PremiumSheet";
import { ENERGY_ICON, GRAM_ICON, PREMIUM_PASS, ZRO_ICON } from "@/lib/zro-assets";
import { SEASON_PASS_GRAM } from "@/lib/zro-board";

// Sample tiers for the design stage; real progress comes later from the database.
const TIERS = [
  { free: { icon: ZRO_ICON, amount: "0.5" }, premium: { icon: ZRO_ICON, amount: "2" }, claimed: true },
  { free: { icon: ZRO_ICON, amount: "0.5" }, premium: { icon: ZRO_ICON, amount: "2" }, claimed: true },
  { free: { icon: ENERGY_ICON, amount: "50" }, premium: { icon: ENERGY_ICON, amount: "100" }, claimed: false },
  { free: { icon: ZRO_ICON, amount: "1" }, premium: { icon: GRAM_ICON, amount: "0.2" }, claimed: false },
  { free: { icon: ENERGY_ICON, amount: "75" }, premium: { icon: ZRO_ICON, amount: "5" }, claimed: false },
];

export const Route = createFileRoute("/season")({
  component: SeasonPage,
  head: () => ({
    meta: [
      { title: "الموسم — ZRO" },
      { name: "description", content: "تذكرة الموسم وجوائز المستويات في ZRO، والبريميوم بـ 5 GRAM." },
      { property: "og:title", content: "الموسم — ZRO" },
      { property: "og:description", content: "تذكرة الموسم وجوائز المستويات في ZRO، والبريميوم بـ 5 GRAM." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function Cell({ icon, amount, state }: { icon: string; amount: string; state: "claimed" | "locked" | "premium" }) {
  const bg = state === "claimed" ? "bg-claimed" : state === "premium" ? "bg-foreground/10" : "bg-foreground/5";
  return (
    <div className={`relative flex h-[132px] flex-col items-center justify-center gap-1 rounded-[22px] border border-border ${bg}`}>
      {state !== "claimed" && <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />}
      <img src={icon} alt="" className={`h-12 w-12 rounded-full object-contain ${state === "claimed" ? "" : "opacity-60"}`} />
      <span dir="ltr" className="font-display text-base font-bold">{amount}</span>
      {state === "claimed" ? (
        <span className="flex items-center gap-1 text-xs text-success"><CheckCircle2 className="h-3.5 w-3.5" /> تم الاستلام</span>
      ) : state === "premium" ? (
        <span className="rounded-full border border-border px-2 py-0.5 text-[10px]">احصل على بريميوم</span>
      ) : null}
    </div>
  );
}

function SeasonPage() {
  const [sheet, setSheet] = useState(false);
  return (
    <ZroPage title="مكافآت الموسم">
      <div className="surface flex flex-col gap-2 rounded-[24px] p-4">
        <div className="flex items-center justify-between">
          <span dir="ltr" className="font-display text-xl font-extrabold">Season Pass</span>
          <span className="text-xs text-muted-foreground">مكافآت الموسم 2 / 20</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-foreground/10">
          <div className="btn-premium h-full w-[62%] rounded-full" />
        </div>
        <span dir="ltr" className="text-right text-xs text-muted-foreground"><b className="text-foreground">130</b> / 210 XP</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-premium flex flex-col gap-2 rounded-[26px] p-2">
          <p className="py-1 text-center font-display text-lg font-extrabold">بريميوم</p>
          {TIERS.map((t, i) => <Cell key={i} icon={t.premium.icon} amount={t.premium.amount} state="premium" />)}
        </div>
        <div className="surface flex flex-col gap-2 rounded-[26px] p-2">
          <p className="py-1 text-center font-display text-lg font-extrabold">أساسي</p>
          {TIERS.map((t, i) => <Cell key={i} icon={t.free.icon} amount={t.free.amount} state={t.claimed ? "claimed" : "locked"} />)}
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-[92px] z-[350000] px-6">
        <button
          type="button"
          onClick={() => setSheet(true)}
          className="btn-glossy btn-premium pressable pointer-events-auto mx-auto flex h-12 w-full max-w-[400px] items-center justify-center gap-2 rounded-full font-display text-lg font-extrabold"
        >
          <img src={PREMIUM_PASS} alt="" className="h-7 w-7" />
          فتح المكافآت بـ <span dir="ltr">{SEASON_PASS_GRAM}</span>
          <img src={GRAM_ICON} alt="GRAM" className="h-5 w-5 rounded-full" />
        </button>
      </div>
      {sheet && <PremiumSheet onClose={() => setSheet(false)} />}
    </ZroPage>
  );
}
