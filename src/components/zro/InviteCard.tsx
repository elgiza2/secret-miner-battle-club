import { Copy, Info } from "lucide-react";
import { toast } from "sonner";
import { ENERGY_ICON, GIFT } from "@/lib/zro-assets";

const FRIENDS = [1, 2, 3, 4, 5];

/** Invite friends block shared by the rewards and store pages. */
export default function InviteCard({ link }: { link: string }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast("اتنسخ الرابط");
    } catch {
      toast("مقدرناش ننسخ الرابط");
    }
  };
  return (
    <div className="surface flex flex-col gap-3 rounded-[26px] p-4">
      <div className="flex items-center gap-2">
        <img src={GIFT} alt="" className="h-8 w-8" />
        <p className="font-display text-base font-bold">ادعُ أصدقاءك. احصل على مكافآت.</p>
      </div>
      <button type="button" onClick={copy} className="pressable flex items-center gap-2 rounded-2xl bg-background/60 px-3 py-2 text-start">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-primary-glow">رابط الإحالة الخاص بك</p>
          <p dir="ltr" className="truncate text-right text-[13px] font-semibold">{link}</p>
        </div>
        <Copy className="h-5 w-5 shrink-0 text-primary-glow" />
      </button>
      <button type="button" className="btn-glossy btn-invite pressable h-11 rounded-full font-display text-base font-bold">
        ارسل هدية دعوة
      </button>
      <p className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
        <Info className="h-3.5 w-3.5" /> الحد اليومي هو 10 أصدقاء مدعوين.
      </p>
      <ul className="flex flex-col divide-y divide-border">
        {FRIENDS.map((n) => (
          <li key={n} className="flex items-center justify-between py-2.5">
            <span className="text-sm font-semibold">ادعُ الصديق {n}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <img src={ENERGY_ICON} alt="" className="h-3.5 w-3.5" />
              <span dir="ltr">+15</span>
            </span>
          </li>
        ))}
        <li className="flex items-center justify-between py-2.5">
          <span className="text-sm font-semibold">ادعُ المزيد من الأصدقاء</span>
          <span className="surface-strong flex items-center gap-1 rounded-full px-2.5 py-1 font-display text-sm font-bold">
            10 <img src={ENERGY_ICON} alt="" className="h-4 w-4" />
          </span>
        </li>
      </ul>
      <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
        كل صديق يحصل على <b className="text-energy">15</b> <img src={ENERGY_ICON} alt="" className="h-3.5 w-3.5" />
      </p>
    </div>
  );
}

