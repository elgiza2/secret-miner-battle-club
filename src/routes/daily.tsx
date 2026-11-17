import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import ZroPage from "@/components/zro/ZroPage";
import { ENERGY_ICON, GIFT, GRAM_ICON, PREMIUM_PASS } from "@/lib/zro-assets";
import { DAILY_REWARD_GRAM } from "@/lib/zro-rewards";

export const Route = createFileRoute("/daily")({
  component: DailyPage,
  head: () => ({
    meta: [
      { title: "مكافأة يومية — ZRO" },
      { name: "description", content: "ادخل كل يوم واجمع 50 GRAM مكافأة يومية." },
      { property: "og:title", content: "مكافأة يومية — ZRO" },
      { property: "og:description", content: "ادخل كل يوم واجمع 50 GRAM مكافأة يومية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function Tile({ icon, value, locked }: { icon: string; value: string; locked?: boolean }) {
  return (
    <div className={`relative flex h-16 items-center justify-center gap-2 rounded-[20px] border border-border ${locked ? "bg-premium" : "bg-foreground/5"}`}>
      {locked && <Lock className="absolute right-3 top-2.5 h-4 w-4" />}
      <img src={icon} alt="" className={`h-8 w-8 rounded-full object-contain ${locked ? "opacity-60" : ""}`} />
      <span dir="ltr" className="font-display text-lg font-bold">{value}</span>
    </div>
  );
}

function DailyPage() {
  return (
    <ZroPage title="مكافأة يومية" back>
      <div className="surface flex flex-col gap-3 rounded-[26px] p-4">
        <p className="text-center font-display text-lg font-bold">مكافآت اليوم</p>
        <div className="grid grid-cols-2 gap-3">
          <Tile icon={GRAM_ICON} value={String(DAILY_REWARD_GRAM)} />
          <Tile icon={ENERGY_ICON} value="10" locked />
        </div>
        <button type="button" onClick={() => toast("البريميوم هيتفعل قريباً")} className="btn-glossy btn-premium pressable flex h-12 items-center justify-center gap-2 rounded-full font-display text-lg font-extrabold">
          <img src={PREMIUM_PASS} alt="" className="h-7 w-7" /> فتح المكافآت
        </button>
      </div>
      <div className="surface flex flex-col gap-3 rounded-[26px] p-4">
        <p className="font-display text-lg font-bold">المكافأة النهائية</p>
        <p className="text-xs text-muted-foreground">ارجع كل يوم عشان تاخد المكافأة النهائية!</p>
        <div className="flex justify-between text-xs"><span className="font-bold">تقدمك:</span><span>اليوم 1/14</span></div>
        <div className="h-3 overflow-hidden rounded-full bg-foreground/10"><div className="h-full w-[7%] rounded-full bg-accent" /></div>
        <div className="grid grid-cols-2 gap-3">
          <Tile icon={GRAM_ICON} value="500" />
          <Tile icon={ENERGY_ICON} value="100" locked />
        </div>
      </div>
      <div className="pointer-events-none fixed inset-x-0 bottom-[92px] z-[350000] px-6">
        <button type="button" onClick={() => toast("الاستلام هيتفعل لما نربط قاعدة البيانات")} className="btn-glossy btn-success pressable pointer-events-auto mx-auto flex h-12 w-full max-w-[400px] items-center justify-center gap-2 rounded-full font-display text-lg font-extrabold">
          <img src={GIFT} alt="" className="h-7 w-7" /> اجمع المكافأة
        </button>
      </div>
    </ZroPage>
  );
}
