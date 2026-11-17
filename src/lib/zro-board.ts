// Pure game rules for the ZRO board. No React, no storage — easy to test.

export const MAX_ENERGY = 25;
export const ROLL_COST = 5;
/** One energy point refills every 10 minutes while below the max. */
export const REGEN_MS = 10 * 60 * 1000;
/** Bonus energy from tiles can go above the max, but never beyond this. */
export const ENERGY_HARD_CAP = 99;

export type TileKind = "plain" | "bolt" | "zro" | "xp" | "box";

export type Reward = { zro: number; xp: number; energy: number };

export const TILE_REWARDS: Record<TileKind, Reward> = {
  plain: { zro: 0.01, xp: 0, energy: 0 },
  bolt: { zro: 0, xp: 0, energy: 5 },
  zro: { zro: 0.25, xp: 0, energy: 0 },
  xp: { zro: 0, xp: 25, energy: 0 },
  box: { zro: 0, xp: 0, energy: 10 },
};

// Repeating 12-tile pattern. Consecutive columns always differ by exactly 1,
// including across the wrap (last 0 -> first 1), so the path stays connected.
const COLS = [1, 2, 3, 2, 1, 0, 1, 2, 1, 0, 1, 0];
const KINDS: TileKind[] = [
  "plain", "bolt", "plain", "zro", "plain", "xp",
  "plain", "box", "plain", "zro", "bolt", "plain",
];

export const tileColumn = (i: number) => COLS[i % COLS.length]!;
export const tileKind = (i: number): TileKind => (i === 0 ? "plain" : KINDS[i % KINDS.length]!);

export type BoardState = {
  position: number;
  energy: number;
  zro: number;
  xp: number;
  /** Timestamp the current regen interval started counting from. */
  regenFrom: number;
};

export const initialState = (now: number): BoardState => ({
  position: 0,
  energy: MAX_ENERGY,
  zro: 0,
  xp: 0,
  regenFrom: now,
});

/** Adds the energy that refilled since `regenFrom`, up to the max. */
export function applyRegen(state: BoardState, now: number): BoardState {
  if (state.energy >= MAX_ENERGY) return { ...state, regenFrom: now };
  const ticks = Math.floor((now - state.regenFrom) / REGEN_MS);
  if (ticks <= 0) return state;
  const energy = Math.min(MAX_ENERGY, state.energy + ticks);
  const regenFrom = energy >= MAX_ENERGY ? now : state.regenFrom + ticks * REGEN_MS;
  return { ...state, energy, regenFrom };
}

/** Milliseconds until the next +1 energy, or null when already full. */
export function msUntilNextEnergy(state: BoardState, now: number): number | null {
  if (state.energy >= MAX_ENERGY) return null;
  const elapsed = (now - state.regenFrom) % REGEN_MS;
  return REGEN_MS - elapsed;
}

export const canRoll = (state: BoardState) => state.energy >= ROLL_COST;

const round = (n: number) => Math.round(n * 10000) / 10000;

/** Spends energy, moves `die` tiles forward and collects the landing tile. */
export function applyRoll(
  state: BoardState,
  die: number,
  now: number,
): { state: BoardState; landed: number; kind: TileKind; reward: Reward } {
  if (!canRoll(state)) throw new Error("not enough energy");
  if (!Number.isInteger(die) || die < 1 || die > 6) throw new Error("invalid die");
  const wasFull = state.energy >= MAX_ENERGY;
  const landed = state.position + die;
  const kind = tileKind(landed);
  const reward = TILE_REWARDS[kind];
  const afterCost = state.energy - ROLL_COST;
  const energy = Math.min(ENERGY_HARD_CAP, afterCost + reward.energy);
  return {
    landed,
    kind,
    reward,
    state: {
      position: landed,
      energy,
      zro: round(state.zro + reward.zro),
      xp: state.xp + reward.xp,
      regenFrom: wasFull ? now : state.regenFrom,
    },
  };
}

export const rollDie = (rand: () => number = Math.random) => 1 + Math.floor(rand() * 6);
