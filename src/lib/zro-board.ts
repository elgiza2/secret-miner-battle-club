// Pure game rules for the ZRO board. No React, no storage — shared by UI and server.

export const MAX_ENERGY = 25;
export const ROLL_COST = 5;
/** One energy point refills every 10 minutes while below the max. */
export const REGEN_MS = 10 * 60 * 1000;
/** Bonus energy from tiles can go above the max, but never beyond this. */
export const ENERGY_HARD_CAP = 999;
/** One-time GRAM payment that verifies a wallet; players can't roll before it. */
export const VERIFY_FEE_GRAM = 0.05;
/** Price of the premium season pass, in GRAM. */
export const SEASON_PASS_GRAM = 5;
/** Ads a player can watch instead of paying 1 GRAM for a store item. */
export const ADS_PER_GRAM = 100;
export const adsForPrice = (gram: number) => Math.ceil(gram * ADS_PER_GRAM);
/** Smallest amount of any coin a player can withdraw. */
export const MIN_WITHDRAW = 2;

export type TileKind = "plain" | "bolt" | "zro" | "xp" | "box" | "gram" | "spin";

export type Reward = { zro: number; xp: number; energy: number; gram: number; spins: number };

const R = (p: Partial<Reward>): Reward => ({ zro: 0, xp: 0, energy: 0, gram: 0, spins: 0, ...p });

/** ZRO is the main coin and pays tiny amounts; GRAM is a bonus coin capped at 0.01 per win. */
export const TILE_REWARDS: Record<TileKind, Reward> = {
  plain: R({ zro: 0.001 }),
  bolt: R({ energy: 5 }),
  zro: R({ zro: 0.005 }),
  xp: R({ xp: 25 }),
  box: R({ energy: 10 }),
  gram: R({ gram: 0.002 }),
  spin: R({ spins: 1 }),
};

// Repeating 16-tile pattern. Consecutive columns always differ by exactly 1.
const COLS = [1, 2, 3, 2, 1, 0, 1, 2, 1, 0, 1, 0, 1, 2, 1, 0];
const KINDS: TileKind[] = [
  "plain", "bolt", "plain", "zro", "gram", "xp",
  "plain", "box", "plain", "zro", "bolt", "spin",
  "plain", "gram", "xp", "plain",
];

export const tileColumn = (i: number) => COLS[i % COLS.length]!;
export const tileKind = (i: number): TileKind => (i === 0 ? "plain" : KINDS[i % KINDS.length]!);

export type BoardState = {
  position: number;
  energy: number;
  zro: number;
  xp: number;
  gram: number;
  spins: number;
  /** Timestamp the current regen interval started counting from. */
  regenFrom: number;
};

export const initialState = (now: number): BoardState => ({
  position: 0, energy: MAX_ENERGY, zro: 0, xp: 0, gram: 0, spins: 1, regenFrom: now,
});

export function applyRegen(state: BoardState, now: number): BoardState {
  if (state.energy >= MAX_ENERGY) return { ...state, regenFrom: now };
  const ticks = Math.floor((now - state.regenFrom) / REGEN_MS);
  if (ticks <= 0) return state;
  const energy = Math.min(MAX_ENERGY, state.energy + ticks);
  const regenFrom = energy >= MAX_ENERGY ? now : state.regenFrom + ticks * REGEN_MS;
  return { ...state, energy, regenFrom };
}

export function msUntilNextEnergy(state: BoardState, now: number): number | null {
  if (state.energy >= MAX_ENERGY) return null;
  const elapsed = (now - state.regenFrom) % REGEN_MS;
  return REGEN_MS - elapsed;
}

export const canRoll = (state: BoardState) => state.energy >= ROLL_COST;

export const round = (n: number) => Math.round(n * 1e6) / 1e6;

export function addReward(state: BoardState, r: Reward): BoardState {
  return {
    ...state,
    zro: round(state.zro + r.zro),
    gram: round(state.gram + r.gram),
    xp: state.xp + r.xp,
    spins: state.spins + r.spins,
    energy: Math.min(ENERGY_HARD_CAP, state.energy + r.energy),
  };
}

export function applyRoll(state: BoardState, die: number, now: number) {
  if (!canRoll(state)) throw new Error("not enough energy");
  if (!Number.isInteger(die) || die < 1 || die > 6) throw new Error("invalid die");
  const wasFull = state.energy >= MAX_ENERGY;
  const landed = state.position + die;
  const kind = tileKind(landed);
  const reward = TILE_REWARDS[kind];
  const paid = { ...state, energy: state.energy - ROLL_COST, position: landed, regenFrom: wasFull ? now : state.regenFrom };
  return { landed, kind, reward, state: addReward(paid, reward) };
}

export const rollDie = (rand: () => number = Math.random) => 1 + Math.floor(rand() * 6);
