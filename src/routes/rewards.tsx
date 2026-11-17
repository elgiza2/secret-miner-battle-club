import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { DAILY_REWARD_GRAM, SHARE_REWARD_GRAM } from "@/lib/zro-rewards";
import ZroPage, { Section } from "@/components/zro/ZroPage";
import InviteCard from "@/components/zro/InviteCard";
import { ENERGY_ICON, GAMEPAD, GIFT, GRAM_ICON, LUCKY_DRAW, SPIN_ICON, ZRO_ICON } from "@/lib/zro-assets";

// Sample content for the design stage; tasks and draws come from the database later.
// Sample tasks for the design stage; real tasks come from the database later. Rewards are energy.
const HOT_TASKS = [
  { icon: GAMEPAD, title: "العب 10 رميات النهارده", reward: "10" },
  { icon: SPIN_ICON, title: "تابع ZRO على X", reward: "15" },
];
const DONE_TASKS = [
  { title: "ادعُ 5 أصدقاء", reward: "20" },
  { title: "انضم لقناة تيليجرام", reward: "10" },
];

export const Route = createFileRoute("/rewards")({
  component: RewardsPage,
  head: () => ({
    meta: [
      { title: "المكافآت — ZRO" },
      { name: "description", content: "سحوبات ومهام ودعوة أصدقاء لجمع ZRO أكتر." },
      { property: "og:title", content: "المكافآت — ZRO" },
      { property: "og:description", content: "سحوبات ومهام ودعوة أصدقاء لجمع ZRO أكتر." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function Amount({ value, icon = ZRO_ICON }: { value: string; icon?: string }) {
  return (
    <span className="surface-strong flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 font-display text-sm font-bold">
      <span dir="ltr">{value}</span>
      <img src={icon} alt="" className="h-5 w-5 rounded-full" />
    </span>
  );
}

function RewardsPage() {
  const ref = "https://t.me/zro_bot/start?startapp=ref";
  return (
    <ZroPage>
      <Section title="انضم واربح">
        <div className="grid grid-cols-2 gap-3">
          <Link to="/daily" className="surface sheen-corner pressable flex flex-col items-center gap-1.5 rounded-[22px] p-3">
            <img src={GIFT} alt="" className="h-12 w-12 object-contain" />
            <p className="font-display text-sm font-bold">مكافأة يومية</p>
            <Amount value={String(DAILY_REWARD_GRAM)} icon={GRAM_ICON} />
          </Link>
          <Link to="/share" className="surface sheen-corner pressable flex flex-col items-center gap-1.5 rounded-[22px] p-3">
            <img src={GIFT} alt="" className="h-12 w-12 object-contain" />
            <p className="font-display text-sm font-bold">شارك التطبيق</p>
            <Amount value={String(SHARE_REWARD_GRAM)} icon={GRAM_ICON} />
          </Link>
        </div>
      </Section>

      <Section title="سحب الحظ">
        <div className="bg-premium flex flex-col gap-3 rounded-[26px] p-3">
          <div className="surface flex items-center gap-3 rounded-[22px] p-3">
            <img src={LUCKY_DRAW} alt="سحب الحظ" className="h-24 w-24 shrink-0 object-contain" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-extrabold">سحب الحظ 500 GRAM</p>
              <p className="text-xs text-muted-foreground">الجائزة الأولى</p>
              <Amount value="200" icon={GRAM_ICON} />
            </div>
          </div>
          <button type="button" disabled className="btn-glossy pressable h-11 rounded-full bg-foreground/20 font-display text-base font-bold">
            انضم إلى السحب بـ 30 ZRO
          </button>
        </div>
      </Section>

      <Section title="المهام">
        <div className="surface flex flex-col divide-y divide-border rounded-[24px] px-3">
          {HOT_TASKS.map((t) => (
            <div key={t.title} className="flex items-center gap-3 py-3">
              <img src={t.icon} alt="" className="h-10 w-10 rounded-2xl object-contain" />
              <p className="min-w-0 flex-1 truncate font-display text-sm font-bold">{t.title}</p>
              <Amount value={t.reward} icon={ENERGY_ICON} />
            </div>
          ))}
        </div>
      </Section>

      <InviteCard link={ref} />

      <Section title="المهام المنتهية">
        {DONE_TASKS.map((t) => (
          <div key={t.title} className="flex items-center gap-3 rounded-[22px] border border-success/60 bg-success/15 p-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-success/30"><Check className="h-6 w-6 text-success" /></span>
            <p className="min-w-0 flex-1 truncate font-display text-sm font-bold">{t.title}</p>
            <Amount value={t.reward} icon={ENERGY_ICON} />
          </div>
        ))}
      </Section>
    </ZroPage>
  );
}
