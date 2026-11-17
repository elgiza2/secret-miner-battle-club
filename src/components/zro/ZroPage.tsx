import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import ProfileHeader from "./ProfileHeader";
import { useZroGame } from "@/hooks/use-zro-game";
import { getTelegramUserSync, type TelegramUserInfo } from "@/lib/telegram-user";

/** Shell for every page except the board: profile row on top, scrolling content, room for the bottom bar. */
export default function ZroPage({ title, back, children }: { title?: string; back?: boolean; children: ReactNode }) {
  const [user, setUser] = useState<TelegramUserInfo | null>(null);
  useEffect(() => setUser(getTelegramUserSync()), []);
  const game = useZroGame(user?.id ?? null);
  return (
    <div className="pt-tg-safe mx-auto flex min-h-screen max-w-[430px] flex-col gap-4 px-4 pb-32">
      {back ? (
        <Link to="/" className="pressable flex w-fit items-center gap-1 text-sm font-semibold"><ArrowRight className="h-5 w-5" /> عودة</Link>
      ) : (
        <ProfileHeader user={user} energy={game.state?.energy ?? 0} zro={game.state?.zro ?? 0} />
      )}
      {title && <h1 className={`font-display text-2xl font-extrabold ${back ? "text-center" : ""}`}>{title}</h1>}
      {children}
    </div>
  );
}

export function Section({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-2.5">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-xl font-extrabold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
