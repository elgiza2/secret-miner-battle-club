// Wheel, draw, store bundles and season rules (amounts the owner set).
import type { Reward } from "./zro-board";

export const DRAW_ENTRY_GRAM = 0.05;
export const SEASON_TIER_COUNT = 30;
export const XP_PER_TIER = 100;
/** Seconds a player must wait between two rewarded ads. */
export const AD_GAP_SECONDS = 15;

export type WheelPrize = { kind: "gram" | "zro" | "energy"; amount: number; weight: number };
// ZRO pays tiny amounts and 0.05 only rarely; GRAM never above 0.01.
export const WHEEL_PRIZES: WheelPrize[] = [
  { kind: "zro", amount: 0.001, weight: 22 },
  { kind: "energy", amount: 10, weight: 16 },
  { kind: "gram", amount: 0.001, weight: 14 },
  { kind: "zro", amount: 0.003, weight: 14 },
  { kind: "energy", amount: 20, weight: 8 },
  { kind: "gram", amount: 0.005, weight: 6 },
  { kind: "zro", amount: 0.01, weight: 6 },
  { kind: "energy", amount: 5, weight: 9 },
  { kind: "gram", amount: 0.01, weight: 2 },
  { kind: "zro", amount: 0.05, weight: 1 },
];

export function pickPrize(rand: () => number = Math.random): number {
  const total = WHEEL_PRIZES.reduce((s, p) => s + p.weight, 0);
  let x = rand() * total;
  for (let i = 0; i < WHEEL_PRIZES.length; i++) {
    x -= WHEEL_PRIZES[i]!.weight;
    if (x < 0) return i;
  }
  return WHEEL_PRIZES.length - 1;
}

export const prizeReward = (p: WheelPrize): Reward => ({
  zro: p.kind === "zro" ? p.amount : 0, gram: p.kind === "gram" ? p.amount : 0,
  energy: p.kind === "energy" ? p.amount : 0, xp: 0, spins: 0,
});

/** Rotation (deg, clockwise) that lands segment `index` under the BOTTOM pointer after `turns` spins. */
export function wheelRotation(index: number, turns = 6, count = WHEEL_PRIZES.length): number {
  const seg = 360 / count;
  return turns * 360 + ((180 - (index * seg + seg / 2)) % 360 + 360) % 360;
}

/** Which segment sits under the bottom pointer for a given rotation. */
export function segmentAt(rotation: number, count = WHEEL_PRIZES.length): number {
  const seg = 360 / count;
  const r = ((180 - (rotation % 360)) % 360 + 360) % 360;
  return Math.floor(r / seg) % count;
}

export type Bundle = { id: string; name: string; gram: number; energy: number; spins: number; zro: number; bonusGram: number };
export const BUNDLES: Bundle[] = [
  { id: "starter", name: "باقة البداية", gram: 0.2, energy: 50, spins: 2, zro: 0.01, bonusGram: 0 },
  { id: "plus", name: "باقة بلس", gram: 0.5, energy: 150, spins: 5, zro: 0.03, bonusGram: 0.005 },
  { id: "pro", name: "باقة برو", gram: 1, energy: 350, spins: 12, zro: 0.08, bonusGram: 0.01 },
  { id: "mega", name: "الباقة الكبرى", gram: 2, energy: 800, spins: 30, zro: 0.2, bonusGram: 0.01 },
];
export const bundleReward = (b: Bundle): Reward => ({ zro: b.zro, gram: b.bonusGram, energy: b.energy, spins: b.spins, xp: 0 });

export type TierReward = { kind: "zro" | "gram" | "energy" | "spins"; amount: number };
const FREE_CYCLE: TierReward[] = [
  { kind: "energy", amount: 10 }, { kind: "zro", amount: 0.002 }, { kind: "spins", amount: 1 }, { kind: "energy", amount: 15 }, { kind: "zro", amount: 0.003 },
];
const PREMIUM_CYCLE: TierReward[] = [
  { kind: "energy", amount: 50 }, { kind: "zro", amount: 0.01 }, { kind: "spins", amount: 3 }, { kind: "gram", amount: 0.005 }, { kind: "energy", amount: 80 }, { kind: "zro", amount: 0.02 }, { kind: "gram", amount: 0.01 },
];
export const tierReward = (tier: number, track: "free" | "premium"): TierReward => {
  const c = track === "free" ? FREE_CYCLE : PREMIUM_CYCLE;
  const base = c[(tier - 1) % c.length]!;
  // Every 10th premium tier doubles.
  return track === "premium" && tier % 10 === 0 ? { ...base, amount: base.amount * 2 } : base;
};
export const tierToReward = (t: TierReward): Reward => ({
  zro: t.kind === "zro" ? t.amount : 0, gram: t.kind === "gram" ? t.amount : 0,
  energy: t.kind === "energy" ? t.amount : 0, spins: t.kind === "spins" ? t.amount : 0, xp: 0,
});
