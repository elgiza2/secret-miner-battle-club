// Daily reward, share gift, season and wheel rules (design stage; amounts the owner set).
export const DAILY_REWARD_GRAM = 50;
export const SHARE_REWARD_GRAM = 0.05;
export const SEASON_TIER_COUNT = 30;

export type WheelPrize = { kind: "gram" | "zro" | "energy"; amount: number };
export const WHEEL_PRIZES: WheelPrize[] = [
  { kind: "energy", amount: 10 }, { kind: "zro", amount: 50 }, { kind: "gram", amount: 0.01 },
  { kind: "energy", amount: 25 }, { kind: "zro", amount: 120 }, { kind: "gram", amount: 0.2 },
  { kind: "energy", amount: 20 }, { kind: "zro", amount: 80 }, { kind: "gram", amount: 0.4 },
  { kind: "energy", amount: 30 }, { kind: "zro", amount: 100 }, { kind: "gram", amount: 0.1 },
];

/** Rotation (deg, clockwise) that lands segment `index` under the top pointer after `turns` full spins. */
export function wheelRotation(index: number, turns = 6, count = WHEEL_PRIZES.length): number {
  const seg = 360 / count;
  return turns * 360 + (360 - (index * seg + seg / 2));
}

/** Which segment sits under the top pointer for a given rotation. */
export function segmentAt(rotation: number, count = WHEEL_PRIZES.length): number {
  const seg = 360 / count;
  const r = ((360 - (rotation % 360)) % 360 + 360) % 360;
  return Math.floor(r / seg) % count;
}
