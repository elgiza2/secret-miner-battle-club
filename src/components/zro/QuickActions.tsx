import { toast } from "sonner";
import { QUICK_ACTIONS } from "@/lib/zro-assets";

export default function QuickActions() {
  return (
    <div dir="ltr" className="flex gap-3">
      {QUICK_ACTIONS.map((a) => (
        <button
          key={a.id}
          type="button"
          onClick={() => toast(`${a.label} — قريباً`)}
          className="surface sheen-corner pressable relative flex h-[66px] w-[66px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-[18px]"
        >
          {a.dot && <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-background bg-destructive" />}
          <img src={a.icon} alt="" className="h-9 w-9 object-contain" />
          <span className="font-display text-[11px] font-bold leading-none">{a.label}</span>
        </button>
      ))}
    </div>
  );
}
