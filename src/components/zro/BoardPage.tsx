import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import Board, { type BoardHandle } from "./Board";
import ProfileHeader from "./ProfileHeader";
import RollControls from "./RollControls";
import DiceOverlay from "./DiceOverlay";
import { act, initData, useZro } from "@/hooks/use-zro";
import { zroRoll } from "@/lib/zro.functions";
import { CART, GRAM_ICON, SPIN_ICON } from "@/lib/zro-assets";
import { VERIFY_FEE_GRAM } from "@/lib/zro-board";
import { getTelegramUserSync, type TelegramUserInfo } from "@/lib/telegram-user";
import { APP_NAME } from "@/lib/zro-brand";
import type { Reward } from "@/lib/zro-board";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function rewardText(r: Reward): string | null {
  if (r.zro) return `+${r.zro} ZRO`;
  if (r.gram) return `+${r.gram} GRAM`;
  if (r.spins) return `+${r.spins} لفة`;
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
  const game = useZro();
  const verified = game.me ? game.me.verified : null;
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getTelegramUserSync());
    const measure = () => setWidth(Math.min(window.innerWidth, 430));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const onRoll = async () => {
    if (busy) return;
    if (!game.canRoll) {
      // Out of energy: send them to the store to refill.
      navigate({ to: "/store" });
      return;
    }
    setBusy(true);
    const res = await act(() => zroRoll({ data: { initData: initData() } }));
    if (!res) { setBusy(false); return; }
    setDice({ target: res.die, reveal: false });
    await wait(1250);
    setDice({ target: res.die, reveal: true });
    await wait(650);
    setDice(null);
    await boardRef.current?.hop(res.from, res.landed);
    game.set(res.me);
    const text = rewardText(res.reward);
    if (text) setPopup({ text, key: Date.now() });
    setBusy(false);
  };

  const s = game.me;

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
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <ProfileHeader user={user} energy={s?.energy ?? 0} zro={s?.zro ?? 0} />
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { to: "/store" as const, label: "المتجر", icon: CART },
              { to: "/spin" as const, label: "عجلة", icon: SPIN_ICON },
            ].map((q) => (
              <Link key={q.to} to={q.to} className="surface-strong sheen-corner pressable flex h-[62px] w-[62px] flex-col items-center justify-center gap-0.5 rounded-[18px]">
                <img src={q.icon} alt="" className="h-8 w-8 object-contain" />
                <span className="font-display text-[11px] font-bold">{q.label}</span>
              </Link>
            ))}
          </div>
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
          {verified === false ? (
            <div className="px-6">
              <Link
                to="/wallet"
                className="btn-glossy btn-premium pressable flex h-12 items-center justify-center gap-2 rounded-full font-display text-base font-extrabold"
              >
                <ShieldCheck className="h-5 w-5" />
                وثّق محفظتك بـ <span dir="ltr">{VERIFY_FEE_GRAM}</span>
                <img src={GRAM_ICON} alt="GRAM" className="h-5 w-5 rounded-full" /> عشان تلعب
              </Link>
            </div>
          ) : (
            <RollControls
              energy={s?.energy ?? 0}
              nextEnergyIn={game.nextEnergyIn}
              disabled={!s || busy || verified !== true}
              onRoll={onRoll}
            />
          )}
        </div>
      </div>

      {dice && <DiceOverlay target={dice.target} reveal={dice.reveal} />}
    </div>
  );
}
