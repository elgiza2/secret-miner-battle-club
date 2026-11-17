import { useCallback, useEffect, useRef, useState } from "react";
import {
  applyRegen, applyRoll, canRoll, initialState, msUntilNextEnergy, rollDie,
  type BoardState, type Reward, type TileKind,
} from "@/lib/zro-board";

const keyFor = (userId: number) => `zro_board_v1_${userId}`;

function load(userId: number): BoardState {
  const now = Date.now();
  try {
    const raw = localStorage.getItem(keyFor(userId));
    if (raw) {
      const s = JSON.parse(raw) as BoardState;
      if (Number.isFinite(s.position) && Number.isFinite(s.energy)) return applyRegen(s, now);
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
