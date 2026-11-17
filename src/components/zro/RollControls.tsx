import { ENERGY_ICON } from "@/lib/zro-assets";
import { MAX_ENERGY, ROLL_COST } from "@/lib/zro-board";
import { formatCountdown } from "@/lib/zro-format";

type Props = {
  energy: number;
  nextEnergyIn: number | null;
  disabled: boolean;
  onRoll: () => void;
};

export default function RollControls({ energy, nextEnergyIn, disabled, onRoll }: Props) {
  return (
    <div dir="ltr" className="relative flex items-center justify-center">
      <div className="surface-strong absolute right-[calc(50%+38px)] top-1/2 flex h-[46px] -translate-y-1/2 flex-col justify-center rounded-l-[18px] rounded-r-none pl-3 pr-[34px]">
        <div className="flex items-center gap-0.5 font-display text-sm font-bold leading-none tabular-nums">
          <img src={ENERGY_ICON} alt="" className="h-4 w-4" />
          <span className="text-energy">{energy}</span>
          <span>/{MAX_ENERGY}</span>
        </div>
        {nextEnergyIn != null && (
          <p dir="rtl" className="mt-1 text-[10px] leading-none text-muted-foreground tabular-nums">
            ‎+1 في {formatCountdown(nextEnergyIn)}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onRoll}
        disabled={disabled}
        className="roll-button relative flex h-[52px] w-[118px] items-center justify-center gap-1 rounded-full font-display text-[21px] font-extrabold"
      >
        <span dir="rtl" className="flex items-center gap-1">
          <span>{ROLL_COST}</span>
          <img src={ENERGY_ICON} alt="طاقة" className="h-6 w-6" />
          <span>ارم</span>
        </span>
      </button>
    </div>
  );
}
