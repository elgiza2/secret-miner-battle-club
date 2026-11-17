import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Tv } from "lucide-react";
import { toast } from "@/lib/notify";
import ZroPage, { Section } from "@/components/zro/ZroPage";
import PremiumSheet from "@/components/zro/PremiumSheet";
import { act, initData, showAd, useZro } from "@/hooks/use-zro";
import { usePay } from "@/hooks/use-pay";
import { ENERGY_BOX, ENERGY_ICON, GRAM_ICON, PREMIUM_PASS, SPIN_ICON, ZRO_ICON } from "@/lib/zro-assets";
import { adsForPrice } from "@/lib/zro-board";
import { BUNDLES } from "@/lib/zro-rewards";
import { zroAd, zroBuy } from "@/lib/zro.functions";

export const Route = createFileRoute("/store")({
  component: StorePage,
  head: () => ({
    meta: [
      { title: "المتجر — ZRO" },
      { name: "description", content: "باقات فيها طاقة ولفات وعملات، بـ GRAM أو بمشاهدة إعلانات." },
      { property: "og:title", content: "المتجر — ZRO" },
      { property: "og:description", content: "باقات فيها طاقة ولفات وعملات، بـ GRAM أو بمشاهدة إعلانات." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function Line({ icon, value }: { icon: string; value: string }) {
  return (
    <span className="flex items-center gap-1 font-display text-sm font-bold">
      <img src={icon} alt="" className="h-4 w-4 rounded-full" /><span dir="ltr">{value}</span>
    </span>
  );
}

function StorePage() {
  const { me, set } = useZro();
  const [sheet, setSheet] = useState(false);
  const [busy, setBusy] = useState(false);
  const payer = usePay();
  const buy = async (id: string, withAds: boolean) => {
    if (!withAds) {
      const b = BUNDLES.find((x) => x.id === id)!;
      if (await payer.pay("B", b.gram, id)) toast("الباقة اتضافت لحسابك");
      return;
    }
    setBusy(true);
    const m = await act(() => zroBuy({ data: { initData: initData(), bundle: id, withAds } }));
    if (m) { set(m); toast("الباقة اتضافت لحسابك"); }
    setBusy(false);
  };
  const watch = async () => {
    setBusy(true);
    if (await showAd()) {
      const m = await act(() => zroAd({ data: { initData: initData(), purpose: "credit" } }));
      if (m) set(m);
    }
    setBusy(false);
  };
  const ads = me?.ads ?? 0;
  return (
    <ZroPage>
      <div className="bg-premium relative overflow-hidden rounded-[26px] p-4">
        <img src={PREMIUM_PASS} alt="" className="absolute -left-2 top-2 h-28 w-28 object-contain" />
        <h2 className="font-display text-2xl font-extrabold">عزّز مكافآتك</h2>
        <p className="mt-1 max-w-[60%] text-xs">بريميوم الموسم بيفتح مكافآت أكبر في كل مستوى.</p>
        <button type="button" onClick={() => setSheet(true)} className="btn-glossy btn-premium pressable mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full font-display text-base font-extrabold">
          <img src={PREMIUM_PASS} alt="" className="h-6 w-6" /> {me?.premium ? "أنت بريميوم" : "احصل على بريميوم"}
        </button>
      </div>

      <button type="button" disabled={busy} onClick={watch} className="surface pressable flex items-center gap-3 rounded-[22px] p-3">
        <Tv className="h-8 w-8 shrink-0" />
        <div className="flex-1 text-start">
          <p className="font-display text-sm font-bold">شاهد إعلان واجمع رصيد إعلانات</p>
          <p className="text-xs text-muted-foreground">رصيدك: <b>{ads}</b> إعلان</p>
        </div>
      </button>

      <Section title="الباقات">
        <div className="grid grid-cols-2 gap-3">
          {BUNDLES.map((b) => (
            <div key={b.id} className="surface flex flex-col items-center gap-2 rounded-[24px] p-3 text-center">
              <img src={ENERGY_BOX} alt="" className="h-16 w-16 object-contain" />
              <p className="font-display text-sm font-extrabold">{b.name}</p>
              <div className="grid w-full grid-cols-2 gap-1 rounded-2xl bg-foreground/5 p-2">
                <Line icon={ENERGY_ICON} value={`+${b.energy}`} />
                <Line icon={SPIN_ICON} value={`+${b.spins}`} />
                <Line icon={ZRO_ICON} value={`+${b.zro}`} />
                {b.bonusGram > 0 && <Line icon={GRAM_ICON} value={`+${b.bonusGram}`} />}
              </div>
              <button type="button" disabled={busy || payer.busy} onClick={() => buy(b.id, false)} className="btn-glossy btn-success pressable flex h-9 w-full items-center justify-center gap-1 rounded-full font-display text-base font-extrabold">
                <span dir="ltr">{b.gram}</span><img src={GRAM_ICON} alt="GRAM" className="h-5 w-5 rounded-full" />
              </button>
              <button type="button" disabled={busy} onClick={() => buy(b.id, true)} className="pressable flex h-8 w-full items-center justify-center gap-1 rounded-full border border-border text-[11px] font-semibold">
                <Tv className="h-3.5 w-3.5" /> أو {adsForPrice(b.gram)} إعلان
              </button>
            </div>
          ))}
        </div>
      </Section>
      {sheet && <PremiumSheet onClose={() => setSheet(false)} />}
    </ZroPage>
  );
}
