import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Board, { type BoardHandle } from "./Board";
import ProfileHeader from "./ProfileHeader";
import RollControls from "./RollControls";
import DiceOverlay from "./DiceOverlay";
import { useZroGame } from "@/hooks/use-zro-game";
import { getTelegramUserSync, type TelegramUserInfo } from "@/lib/telegram-user";
import { APP_NAME } from "@/lib/zro-brand";
import type { Reward } from "@/lib/zro-board";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function rewardText(r: Reward): string | null {
  if (r.zro) return `+${r.zro} ZRO`;
  if (r.gram) return `+${r.gram} GRAM`;
  if (r.prv) return `+${r.prv} PRV`;
  if (r.ton) return `+${r.ton} TON`;
  if (r.energy) return `+${r.energy} طاقة`;
  if (r.xp) return `+${r.xp} XP`;
  return null;
}

export default function BoardPage() {
  const [user, setUser] = useState<TelegramUserInfo | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [dice, setDice] = useState<{ target: number; reveal: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [popup, setPopup] = useState<{ text: string; key: number } | null>(null);
  const boardRef = useRef<BoardHandle>(null);
  const game = useZroGame(user?.id ?? null);

  useEffect(() => {
    const tg = (window as { Telegram?: { WebApp?: { ready?: () => void; expand?: () => void; disableVerticalSwipes?: () => void } } }).Telegram?.WebApp;
    tg?.ready?.();
    tg?.expand?.();
    // Dragging on the board must not pull the mini app down.
    tg?.disableVerticalSwipes?.();
    setUser(getTelegramUserSync());
    const measure = () => setWidth(Math.min(window.innerWidth, 430));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const onRoll = async () => {
    if (busy) return;
    const res = game.roll();
    if (!res) {
      toast("الطاقة غير كافية — استنى شوية تتشحن");
      return;
    }
    setBusy(true);
    setDice({ target: res.die, reveal: false });
    await wait(1250);
    setDice({ target: res.die, reveal: true });
    await wait(650);
    setDice(null);
    await boardRef.current?.hop(res.from, res.landed);
    const text = rewardText(res.reward);
    if (text) setPopup({ text, key: Date.now() });
    setBusy(false);
  };

  const s = game.state;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {s && width && <Board ref={boardRef} position={s.position} width={width} />}

      {/* Top: wordmark and profile. Fades into the board. */}
      <header
        className="pt-tg-safe pointer-events-none fixed inset-x-0 top-0 z-[300000] pb-8"
        style={{ background: "linear-gradient(180deg, var(--background) 0%, color-mix(in oklab, var(--background) 70%, transparent) 55%, transparent 100%)" }}
      >
        <div className="pointer-events-auto mx-auto flex max-w-[430px] flex-col gap-2 px-4">
          <h1 dir="ltr" className="text-center font-display text-[18px] font-extrabold uppercase leading-none tracking-[0.08em]">
            {APP_NAME}
          </h1>
          <ProfileHeader
            user={user}
            energy={s?.energy ?? 0}
            zro={s?.zro ?? 0}
            gram={s?.gram ?? 0}
            prv={s?.prv ?? 0}
            ton={s?.ton ?? 0}
          />
        </div>
      </header>

      {/* Roll controls float above the bottom bar */}
      <div className="pointer-events-none fixed inset-x-0 bottom-[92px] z-[350000]">
        <div className="pointer-events-auto relative mx-auto max-w-[430px]">
          {popup && (
            <div
              key={popup.key}
              dir="ltr"
              className="animate-reward-rise surface-strong absolute -top-10 left-1/2 rounded-full px-3 py-1 font-display text-sm font-bold"
            >
              {popup.text}
            </div>
          )}
          <RollControls
            energy={s?.energy ?? 0}
            nextEnergyIn={game.nextEnergyIn}
            disabled={!s || busy || !game.canRoll}
            onRoll={onRoll}
          />
        </div>
      </div>

      {dice && <DiceOverlay target={dice.target} reveal={dice.reveal} />}
    </div>
  );
}
