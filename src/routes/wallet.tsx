import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownToLine, ArrowUpFromLine, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import ZroPage, { Section } from "@/components/zro/ZroPage";
import { useZroGame } from "@/hooks/use-zro-game";
import { useWalletVerified } from "@/hooks/use-wallet-verified";
import { getTelegramUserSync } from "@/lib/telegram-user";
import { GRAM_ICON, PRV_ICON, WALLET_ICON, ZRO_ICON } from "@/lib/zro-assets";
import { VERIFY_FEE_GRAM } from "@/lib/zro-board";
import { formatZro } from "@/lib/zro-format";

export const Route = createFileRoute("/wallet")({
  component: WalletPage,
  head: () => ({
    meta: [
      { title: "المحفظة — ZRO" },
      { name: "description", content: "رصيدك من ZRO وGRAM وPRV، ووثّق محفظتك عشان تبدأ تلعب." },
      { property: "og:title", content: "المحفظة — ZRO" },
      { property: "og:description", content: "رصيدك من ZRO وGRAM وPRV، ووثّق محفظتك عشان تبدأ تلعب." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function WalletPage() {
  const [uid, setUid] = useState<number | null>(null);
  useEffect(() => setUid(getTelegramUserSync().id), []);
  const s = useZroGame(uid).state;
  const verified = useWalletVerified();
  const coins = [
    { name: "ZRO", icon: ZRO_ICON, value: s?.zro ?? 0 },
    { name: "GRAM", icon: GRAM_ICON, value: s?.gram ?? 0 },
    { name: "PRV", icon: PRV_ICON, value: s?.prv ?? 0 },
  ];
  const soon = () => toast("الدفع هيتفعل لما نربط المحفظة");

  return (
    <ZroPage title="المحفظة">
      {verified === false && (
        <div className="bg-premium flex flex-col gap-3 rounded-[26px] p-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-10 w-10 shrink-0" />
            <div>
              <p className="font-display text-lg font-extrabold">وثّق محفظتك عشان تلعب</p>
              <p className="text-xs">ادفع مرة واحدة بس، وبعدها تقدر ترمي النرد وتجمع المكافآت.</p>
            </div>
          </div>
          <button type="button" onClick={soon} className="btn-glossy btn-premium pressable flex h-12 items-center justify-center gap-2 rounded-full font-display text-lg font-extrabold">
            ادفع <span dir="ltr">{VERIFY_FEE_GRAM}</span> <img src={GRAM_ICON} alt="GRAM" className="h-6 w-6 rounded-full" /> GRAM للتوثيق
          </button>
        </div>
      )}

      <div className="surface flex items-center gap-3 rounded-[26px] p-4">
        <img src={WALLET_ICON} alt="" className="h-14 w-14 object-contain" />
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">محفظة GRAM</p>
          <p className="font-display text-base font-bold">غير متصلة</p>
        </div>
        <button type="button" onClick={soon} className="btn-glossy btn-invite pressable rounded-full px-4 py-2 font-display text-sm font-bold">
          ربط المحفظة
        </button>
      </div>

      <Section title="رصيدك">
        <div className="surface flex flex-col divide-y divide-border rounded-[24px] px-4">
          {coins.map((c) => (
            <div key={c.name} className="flex items-center gap-3 py-3">
              <img src={c.icon} alt={c.name} className="h-10 w-10 rounded-full" />
              <span dir="ltr" className="flex-1 text-right font-display text-base font-bold">{c.name}</span>
              <span dir="ltr" className="font-display text-lg font-extrabold tabular-nums">{formatZro(c.value)}</span>
            </div>
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={soon} className="surface pressable flex h-14 items-center justify-center gap-2 rounded-[20px] font-display font-bold">
          <ArrowDownToLine className="h-5 w-5" /> إيداع
        </button>
        <button type="button" onClick={soon} className="surface pressable flex h-14 items-center justify-center gap-2 rounded-[20px] font-display font-bold">
          <ArrowUpFromLine className="h-5 w-5" /> سحب
        </button>
      </div>
    </ZroPage>
  );
}
