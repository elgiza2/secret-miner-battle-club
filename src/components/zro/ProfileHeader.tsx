import { ENERGY_ICON, ZRO_ICON } from "@/lib/zro-assets";
import { formatZro } from "@/lib/zro-format";
import type { TelegramUserInfo } from "@/lib/telegram-user";

type Props = { user: TelegramUserInfo | null; energy: number; zro: number };

export default function ProfileHeader({ user, energy, zro }: Props) {
  const name = user ? [user.first_name, user.last_name].filter(Boolean).join(" ") : "";
  const initial = (name || "?").trim().charAt(0).toUpperCase();

  return (
    <div dir="ltr" className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative shrink-0">
          <div className="h-14 w-14 rounded-full p-[3px]" style={{ background: "var(--ring-avatar)" }}>
            {user?.photo_url ? (
              <img src={user.photo_url} alt={name} className="h-full w-full rounded-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center rounded-full bg-secondary font-display text-xl font-bold">
                {initial}
              </div>
            )}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-background bg-online" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-bold leading-tight">{name || "…"}</p>
          {user?.username && (
            <p className="truncate text-xs text-muted-foreground">@{user.username}</p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <div className="surface-strong flex h-10 items-center gap-1 rounded-full px-3">
          <img src={ENERGY_ICON} alt="طاقة" className="h-6 w-6" />
          <span className="font-display text-base font-bold tabular-nums">{energy}</span>
        </div>
        <div className="surface-strong flex h-10 items-center gap-1.5 rounded-full pl-1.5 pr-3">
          <img src={ZRO_ICON} alt="ZRO" className="h-7 w-7" />
          <span className="font-display text-base font-bold tabular-nums">{formatZro(zro)}</span>
        </div>
      </div>
    </div>
  );
}
