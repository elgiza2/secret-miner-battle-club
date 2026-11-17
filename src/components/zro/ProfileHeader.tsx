import { ENERGY_ICON, GRAM_ICON, PRV_ICON, TON_ICON, ZRO_ICON } from "@/lib/zro-assets";
import { formatZro } from "@/lib/zro-format";
import type { TelegramUserInfo } from "@/lib/telegram-user";

type Props = {
  user: TelegramUserInfo | null;
  energy: number;
  zro: number;
  gram: number;
  prv: number;
  ton: number;
};

function Coin({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <span className="flex items-center gap-1">
      <img src={icon} alt={label} className="h-4 w-4" />
      <span className="font-display text-[11px] font-bold tabular-nums">{formatZro(value)}</span>
    </span>
  );
}

export default function ProfileHeader({ user, energy, zro, gram, prv, ton }: Props) {
  const name = user ? [user.first_name, user.last_name].filter(Boolean).join(" ") : "";
  const initial = (name || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="flex flex-col gap-1">
      <div dir="ltr" className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <div className="relative shrink-0">
          <div className="h-10 w-10 rounded-full p-[2px]" style={{ background: "var(--ring-avatar)" }}>
            {user?.photo_url ? (
              <img src={user.photo_url} alt={name} className="h-full w-full rounded-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center rounded-full bg-secondary font-display text-base font-bold">
                {initial}
              </div>
            )}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-online" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold leading-tight">{name || "…"}</p>
          {user?.username && (
            <p className="truncate text-[11px] text-muted-foreground">@{user.username}</p>
          )}
        </div>
      </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <div className="surface-strong flex h-8 items-center gap-1 rounded-full px-2.5">
            <img src={ENERGY_ICON} alt="طاقة" className="h-4 w-4" />
            <span className="font-display text-sm font-bold tabular-nums">{energy}</span>
          </div>
          <div className="surface-strong flex h-8 items-center gap-1 rounded-full pl-1 pr-2.5">
            <img src={ZRO_ICON} alt="ZRO" className="h-6 w-6" />
            <span className="font-display text-sm font-bold tabular-nums">{formatZro(zro)}</span>
          </div>
        </div>
      </div>

      {/* Wallet of the other coins you can win on the board. */}
      <div dir="ltr" className="surface-strong flex h-7 items-center justify-end gap-2 rounded-full px-2.5">
        <Coin icon={GRAM_ICON} label="GRAM" value={gram} />
        <span className="h-3 w-px bg-border" />
        <Coin icon={PRV_ICON} label="PRV" value={prv} />
        <span className="h-3 w-px bg-border" />
        <Coin icon={TON_ICON} label="TON" value={ton} />
      </div>
    </div>
  );
}
