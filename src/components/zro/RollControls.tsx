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
      <div className="surface-strong absolute right-[calc(50%+46px)] top-1/2 flex h-[58px] -translate-y-1/2 flex-col justify-center rounded-l-[22px] rounded-r-none pl-4 pr-[42px]">
        <div className="flex items-center gap-0.5 font-display text-lg font-bold leading-none tabular-nums">
          <img src={ENERGY_ICON} alt="" className="h-5 w-5" />
          <span className="text-energy">{energy}</span>
          <span>/{MAX_ENERGY}</span>
        </div>
        {nextEnergyIn != null && (
          <p dir="rtl" className="mt-1 text-[11px] leading-none text-muted-foreground tabular-nums">
            ‎+1 في {formatCountdown(nextEnergyIn)}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onRoll}
        disabled={disabled}
        className="roll-button relative flex h-[66px] w-[150px] items-center justify-center gap-1 rounded-full font-display text-[28px] font-extrabold"
      >
        <span dir="rtl" className="flex items-center gap-1">
          <span>{ROLL_COST}</span>
          <img src={ENERGY_ICON} alt="طاقة" className="h-8 w-8" />
          <span>ارم</span>
        </span>
      </button>
    </div>
  );
}
