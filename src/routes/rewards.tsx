import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Check } from "lucide-react";
import ZroPage, { Section } from "@/components/zro/ZroPage";
import InviteCard from "@/components/zro/InviteCard";
import { ENERGY_ICON, GAMEPAD, GRAM_ICON, SPIN_ICON, ZRO_ICON } from "@/lib/zro-assets";

// Sample content for the design stage; tasks and draws come from the database later.
const HOT_TASKS = [
  { icon: GAMEPAD, title: "العب 10 رميات النهارده", sub: "ارمي النرد 10 مرات واجمع المكافأة", reward: "0.5" },
  { icon: SPIN_ICON, title: "تابع ZRO على X", sub: "خليك أول واحد يعرف الجديد", reward: "1" },
];
const DONE_TASKS = [
  { title: "ادعُ 5 أصدقاء", sub: "شارك رابطك وابني فريقك", reward: "2" },
  { title: "انضم لقناة تيليجرام", sub: "آخر الأخبار والإسقاطات", reward: "1" },
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
        <div className="bg-premium flex flex-col gap-3 rounded-[26px] p-3">
          <div className="surface flex flex-col gap-2 rounded-[22px] p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">السحب</p>
                <p className="font-display text-xl font-extrabold">سحب الحظ 500 GRAM</p>
              </div>
              <div className="text-end">
                <p className="text-xs text-muted-foreground">الجائزة الأولى</p>
                <Amount value="200" icon={GRAM_ICON} />
              </div>
            </div>
            <span className="surface-strong flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-sm font-bold">
              <span dir="ltr">30</span><img src={ZRO_ICON} alt="" className="h-4 w-4 rounded-full" /> إدخال
            </span>
            <p className="text-xs text-muted-foreground"><b className="text-foreground">15 - 22 نوفمبر</b> | <b className="text-foreground">27,615</b> لاعبين</p>
          </div>
          <p className="flex items-center justify-center gap-1 text-[11px]"><AlertTriangle className="h-3.5 w-3.5 text-accent" /> الموارد غير كافية.</p>
          <button type="button" disabled className="btn-glossy pressable h-11 rounded-full bg-foreground/20 font-display text-base font-bold">
            انضم إلى السحب بـ 30 ZRO
          </button>
        </div>
      </Section>

      <Section title="اجمع المكافآت">
        <div className="surface flex items-center gap-3 rounded-[22px] p-3">
          <img src={SPIN_ICON} alt="" className="h-11 w-11 rounded-2xl bg-background/60 p-1.5" />
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-bold">مكافآت الفريق!</p>
            <p dir="ltr" className="text-right text-xs text-muted-foreground">@zro_team</p>
          </div>
          <button type="button" className="btn-glossy btn-invite pressable flex items-center gap-1 rounded-full px-3 py-1.5 font-display font-bold">
            10 <img src={ENERGY_ICON} alt="" className="h-4 w-4" />
          </button>
        </div>
      </Section>

      <Section title="مهام ساخنة">
        <div className="surface flex flex-col divide-y divide-border rounded-[24px] px-3">
          {HOT_TASKS.map((t) => (
            <div key={t.title} className="flex items-center gap-3 py-3">
              <img src={t.icon} alt="" className="h-12 w-12 rounded-2xl object-contain" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-bold">{t.title}</p>
                <p className="truncate text-xs text-muted-foreground">{t.sub}</p>
              </div>
              <Amount value={t.reward} />
            </div>
          ))}
        </div>
      </Section>

      <InviteCard link={ref} />

      <Section title="المهام المنتهية" action={<span className="text-xs text-muted-foreground">عرض الكل</span>}>
        {DONE_TASKS.map((t) => (
          <div key={t.title} className="flex items-center gap-3 rounded-[22px] border border-success/60 bg-success/15 p-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-success/30"><Check className="h-6 w-6 text-success" /></span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-bold">{t.title}</p>
              <p className="truncate text-xs text-muted-foreground">{t.sub}</p>
            </div>
            <Amount value={t.reward} />
          </div>
        ))}
      </Section>
    </ZroPage>
  );
}
