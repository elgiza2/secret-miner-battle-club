import { useCallback, useEffect, useRef, useState } from "react";
import {
  applyRegen, applyRoll, canRoll, initialState, MAX_ENERGY, msUntilNextEnergy, rollDie,
  type BoardState, type Reward, type TileKind,
} from "@/lib/zro-board";

const keyFor = (userId: number) => `zro_board_v1_${userId}`;

const num = (v: unknown, d: number) => (typeof v === "number" && Number.isFinite(v) ? v : d);

function load(userId: number): BoardState {
  const now = Date.now();
  try {
    const raw = localStorage.getItem(keyFor(userId));
    if (raw) {
      // Older saves have no coin fields, so every field gets a default.
      const p = JSON.parse(raw) as Record<string, unknown>;
      if (Number.isFinite(p.position) && Number.isFinite(p.energy)) {
        return applyRegen(
          {
            position: num(p.position, 0),
            energy: num(p.energy, MAX_ENERGY),
            zro: num(p.zro, 0),
            xp: num(p.xp, 0),
            gram: num(p.gram, 0),
            prv: num(p.prv, 0),
            ton: num(p.ton, 0),
            regenFrom: num(p.regenFrom, now),
          },
          now,
        );
      }
    }
  } catch {
    /* ignore corrupt storage */
  }
  return initialState(now);
}

export type RollResult = { die: number; from: number; landed: number; kind: TileKind; reward: Reward };

/** Board state for one player, persisted on this device and refilled over time. */
export function useZroGame(userId: number | null) {
  const [state, setState] = useState<BoardState | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const stateRef = useRef<BoardState | null>(null);
  stateRef.current = state;

  useEffect(() => {
    if (userId == null) return;
    setState(load(userId));
  }, [userId]);

  useEffect(() => {
    if (userId == null || !state) return;
    try {
      localStorage.setItem(keyFor(userId), JSON.stringify(state));
    } catch {
      /* storage full or blocked */
    }
  }, [userId, state]);

  // Tick every second for the refill countdown.
  useEffect(() => {
    const id = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      setState((s) => (s ? applyRegen(s, t) : s));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  /** Spends energy and returns where the pawn should go. The state updates immediately. */
  const roll = useCallback((): RollResult | null => {
    const s = stateRef.current;
    if (!s || !canRoll(s)) return null;
    const die = rollDie();
    const t = Date.now();
    const res = applyRoll(s, die, t);
    setState(res.state);
    return { die, from: s.position, landed: res.landed, kind: res.kind, reward: res.reward };
  }, []);

  return {
    state,
    nextEnergyIn: state ? msUntilNextEnergy(state, now) : null,
    canRoll: state ? canRoll(state) : false,
    roll,
  };
}
