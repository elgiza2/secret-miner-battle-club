import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Tv } from "lucide-react";
import { toast } from "sonner";
import ZroPage, { Section } from "@/components/zro/ZroPage";
import PremiumSheet from "@/components/zro/PremiumSheet";
import InviteCard from "@/components/zro/InviteCard";
import { ENERGY_BOX, ENERGY_ICON, GRAM_ICON, PREMIUM_PASS, SPIN_ICON } from "@/lib/zro-assets";
import { adsForPrice } from "@/lib/zro-board";

// Design-stage catalogue; prices and stock move to the database later.
const ITEMS = [
  { name: "صندوق طاقة ملحمي", energy: 150, gram: 0.5, icon: ENERGY_BOX },
  { name: "صندوق طاقة أسطوري", energy: 350, gram: 1, icon: ENERGY_BOX },
  { name: "لفة سبين إضافية", energy: 0, gram: 0.2, icon: SPIN_ICON },
  { name: "صندوق طاقة ضخم", energy: 800, gram: 2, icon: ENERGY_BOX },
];

export const Route = createFileRoute("/store")({
  component: StorePage,
  head: () => ({
    meta: [
      { title: "المتجر — ZRO" },
      { name: "description", content: "اشتري طاقة ومعززات بـ GRAM أو بمشاهدة إعلانات." },
      { property: "og:title", content: "المتجر — ZRO" },
      { property: "og:description", content: "اشتري طاقة ومعززات بـ GRAM أو بمشاهدة إعلانات." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function StorePage() {
  const [sheet, setSheet] = useState(false);
  const navigate = useNavigate();
  const soon = () => toast("الشراء هيتفعل لما نربط قاعدة البيانات");
  return (
    <ZroPage>
      <button type="button" onClick={() => navigate({ to: "/" })} className="pressable flex w-fit items-center gap-1 text-sm text-muted-foreground">
        <ArrowRight className="h-4 w-4" /> رجوع للوحة
      </button>

      <div className="bg-premium relative overflow-hidden rounded-[26px] p-4">
        <img src={PREMIUM_PASS} alt="" className="absolute -left-2 top-2 h-28 w-28 object-contain" />
        <h1 className="font-display text-2xl font-extrabold">عزّز مكافآتك</h1>
        <p className="mt-1 max-w-[60%] text-xs">احصل على باس بريميوم وضاعف مكافآتك من كل رمية وزود فرصك في الفوز!</p>
        <button type="button" onClick={() => setSheet(true)} className="btn-glossy btn-premium pressable mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full font-display text-base font-extrabold">
          <img src={PREMIUM_PASS} alt="" className="h-6 w-6" /> احصل على بريميوم
        </button>
      </div>

      <Section title="العناصر الشائعة">
        <div className="grid grid-cols-2 gap-3">
          {ITEMS.map((it) => (
            <div key={it.name} className="surface flex flex-col items-center gap-1.5 rounded-[24px] p-3 text-center">
              <img src={it.icon} alt="" className="h-20 w-20 object-contain" />
              <p className="font-display text-sm font-bold">{it.name}</p>
              {it.energy > 0 && (
                <p className="flex items-center gap-0.5 font-display text-sm font-bold text-energy">
                  <span dir="ltr">+{it.energy}</span><img src={ENERGY_ICON} alt="" className="h-4 w-4" />
                </p>
              )}
              <button type="button" onClick={soon} className="btn-glossy btn-success pressable flex h-9 w-full items-center justify-center gap-1 rounded-full font-display text-base font-extrabold">
                <span dir="ltr">{it.gram}</span><img src={GRAM_ICON} alt="GRAM" className="h-5 w-5 rounded-full" />
              </button>
              <button type="button" onClick={soon} className="pressable flex h-8 w-full items-center justify-center gap-1 rounded-full border border-border text-[11px] font-semibold">
                <Tv className="h-3.5 w-3.5" /> أو شاهد {adsForPrice(it.gram)} إعلان
              </button>
            </div>
          ))}
        </div>
      </Section>

      <InviteCard link="https://t.me/zro_bot/start?startapp=ref" />
      {sheet && <PremiumSheet onClose={() => setSheet(false)} />}
    </ZroPage>
  );
}
