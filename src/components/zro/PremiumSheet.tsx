import { X } from "lucide-react";
import { toast } from "@/lib/notify";
import { useZro } from "@/hooks/use-zro";
import { usePay } from "@/hooks/use-pay";
import { ENERGY_BOX, GIFT, GRAM_ICON, PREMIUM_PASS, SPIN_ICON } from "@/lib/zro-assets";
import { SEASON_PASS_GRAM } from "@/lib/zro-board";

const PERKS = [
  { icon: SPIN_ICON, label: "إسقاطات برعاية" },
  { icon: GIFT, label: "جوائز ضخمة" },
  { icon: ENERGY_BOX, label: "مكافآت أكبر" },
];

/** Bottom sheet that sells the premium season pass for GRAM. */
export default function PremiumSheet({ onClose }: { onClose: () => void }) {
  const { me } = useZro();
  const payer = usePay();
  const buy = async () => {
    if (me?.premium || !me) { onClose(); return; }
    if (await payer.pay("P", SEASON_PASS_GRAM)) { toast("مبروك، بقيت بريميوم"); onClose(); }
  };

  return (
    <div className="fixed inset-0 z-[500000] flex items-end bg-background/70 backdrop-blur-[2px] animate-in fade-in duration-200" onClick={onClose}>
      <div
        className="pb-tg-safe mx-auto flex w-full max-w-[430px] flex-col items-center gap-3 rounded-t-[30px] border-t border-border bg-background px-4 pt-4 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={onClose} aria-label="إغلاق" className="surface-strong pressable grid h-9 w-9 place-items-center self-start rounded-full">
          <X className="h-5 w-5" />
        </button>
        <img src={PREMIUM_PASS} alt="" className="h-28 w-28 object-contain" />
        <h2 className="font-display text-2xl font-extrabold">احصل على تصريح بريميوم</h2>
        <p className="text-sm text-muted-foreground">بريميوم الموسم كله</p>
        <div className="bg-premium w-full rounded-[24px] p-3">
          <p className="mb-2 text-center font-display text-sm font-bold">ما ستحصل عليه</p>
          <div className="grid grid-cols-3 gap-2">
            {PERKS.map((p) => (
              <div key={p.label} className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-foreground/10 py-2.5">
                <img src={p.icon} alt="" className="h-10 w-10 object-contain" />
                <span className="text-[11px] font-semibold">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={buy}
          className="btn-glossy btn-premium pressable mb-4 flex h-12 w-full items-center justify-center gap-2 rounded-full font-display text-lg font-extrabold"
        >
          شراء <span dir="ltr">{SEASON_PASS_GRAM}</span>
          <img src={GRAM_ICON} alt="GRAM" className="h-6 w-6 rounded-full" />
        </button>
      </div>
    </div>
  );
}
