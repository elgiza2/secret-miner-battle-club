import { useEffect, useState, type ReactNode } from "react";
import ProfileHeader from "./ProfileHeader";
import { useZro } from "@/hooks/use-zro";
import { getTelegramUserSync, type TelegramUserInfo } from "@/lib/telegram-user";
import { APP_NAME } from "@/lib/zro-brand";

/** The ZRO wordmark that sits at the top of every page. */
export function Wordmark() {
  return (
    <h1 dir="ltr" className="text-center font-display text-[18px] font-extrabold uppercase leading-none tracking-[0.08em]">{APP_NAME}</h1>
  );
}

/** Shell for every page except the board: ZRO on top, profile row, scrolling content. */
export default function ZroPage({ children, profile = true }: { children: ReactNode; profile?: boolean }) {
  const [user, setUser] = useState<TelegramUserInfo | null>(null);
  useEffect(() => setUser(getTelegramUserSync()), []);
  const { me } = useZro();
  return (
    <div className="pt-tg-safe mx-auto flex min-h-screen max-w-[430px] flex-col gap-4 px-4 pb-32">
      <Wordmark />
      {profile && <ProfileHeader user={user} energy={me?.energy ?? 0} zro={me?.zro ?? 0} />}
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
