import { createFileRoute } from "@tanstack/react-router";
import { Timer } from "lucide-react";
import ZroPage, { Section } from "@/components/zro/ZroPage";
import { GIFT, GRAM_ICON } from "@/lib/zro-assets";
import { SHARE_REWARD_GRAM } from "@/lib/zro-rewards";

const DAYS = ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"];

export const Route = createFileRoute("/share")({
  component: SharePage,
  head: () => ({
    meta: [
      { title: "شارك هدية — ZRO" },
      { name: "description", content: "شارك التطبيق مع أصدقائك كل يوم واكسب 0.05 GRAM." },
      { property: "og:title", content: "شارك هدية — ZRO" },
      { property: "og:description", content: "شارك التطبيق مع أصدقائك كل يوم واكسب 0.05 GRAM." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function SharePage() {
  const today = (new Date().getDay() + 6) % 7;
  const share = () => {
    const url = "https://t.me/zro_bot/start?startapp=gift";
    const text = "العب معايا ZRO واكسب GRAM 🎁";
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
  };
  return (
    <ZroPage title="شارك هدية!" back>
      <p className="-mt-2 text-center text-sm text-muted-foreground">شارك هدية مختلفة كل يوم. وأصحابك كمان يقدروا يبعتولك هدايا!</p>
      <div className="surface flex flex-col gap-3 rounded-[26px] p-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <p className="font-display text-xl font-extrabold">هدية اليوم:</p>
          <span className="surface-strong flex items-center gap-1.5 rounded-full px-3 py-1.5 font-display text-lg font-bold">
            <span dir="ltr">{SHARE_REWARD_GRAM}</span><img src={GRAM_ICON} alt="GRAM" className="h-6 w-6 rounded-full" />
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>هدايا جمعها أصدقاؤك</span>
          <span className="flex items-center gap-1"><img src={GIFT} alt="" className="h-5 w-5" /> <span dir="ltr">0 / 5</span></span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-foreground/10"><div className="h-full w-3 rounded-full bg-primary" /></div>
        <button type="button" onClick={share} className="btn-glossy btn-invite pressable h-12 rounded-full font-display text-lg font-extrabold">شارك هدية مع الأصدقاء</button>
        <span className="mx-auto flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1 text-xs font-bold text-background"><Timer className="h-4 w-4" /> الهدية الجاية بكرة</span>
      </div>
      <Section title="هدايا الأسبوع">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {DAYS.map((d, i) => (
            <div key={d} className={`flex w-[76px] shrink-0 flex-col items-center gap-1 rounded-[18px] border p-2.5 ${i === today ? "border-success bg-success/15" : "border-border bg-foreground/5"}`}>
              <img src={GRAM_ICON} alt="" className="h-7 w-7 rounded-full" />
              <span dir="ltr" className="font-display text-sm font-bold">{SHARE_REWARD_GRAM}</span>
              <span className="text-[11px] text-muted-foreground">{i === today ? "النهارده" : d}</span>
            </div>
          ))}
        </div>
      </Section>
    </ZroPage>
  );
}
