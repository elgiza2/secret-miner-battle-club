import { DICE } from "@/lib/zro-assets";

/** Dims the board while the dice tumble, then shows the number rolled. */
export default function DiceOverlay({ value }: { value: number | null }) {
  return (
    <div className="fixed inset-0 z-[500000] flex items-center justify-center bg-background/60 backdrop-blur-[2px] animate-in fade-in duration-200">
      <div dir="ltr" className="flex items-center gap-3">
        <img
          src={DICE}
          alt="النرد"
          className={`h-24 w-24 object-contain ${value == null ? "animate-dice-shake" : "animate-in zoom-in-90 duration-200"}`}
        />
        {value != null && (
          <span className="font-display text-[64px] font-extrabold leading-none animate-in zoom-in-50 fade-in duration-300">
            {value}
          </span>
        )}
      </div>
    </div>
  );
}
