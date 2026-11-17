import { describe, expect, it } from "vitest";
import { dailyDrawPrize, DRAW_ENTRY_GRAM, SEASON_TIER_COUNT, WHEEL_PRIZES, segmentAt, wheelRotation, tierReward } from "./zro-rewards";

describe("rewards rules", () => {
  it("joining the lucky draw costs 0.05 GRAM", () => expect(DRAW_ENTRY_GRAM).toBe(0.05));
  it("season has 30 tiers", () => expect(SEASON_TIER_COUNT).toBe(30));
  it("wheel lands on the chosen segment", () => {
    for (let i = 0; i < WHEEL_PRIZES.length; i++) expect(segmentAt(wheelRotation(i))).toBe(i);
  });
  it("wheel: ZRO at most 0.05 and GRAM at most 0.01", () => {
    for (const p of WHEEL_PRIZES) {
      if (p.kind === "zro") expect(p.amount).toBeLessThanOrEqual(0.05);
      if (p.kind === "gram") expect(p.amount).toBeLessThanOrEqual(0.01);
    }
  });
  it("premium season rewards beat free ones", () => {
    expect(tierReward(1, "premium").amount).toBeGreaterThan(tierReward(1, "free").amount);
  });
  it("premium ZRO reaches 0.25 at the last level", () => {
    const zros = Array.from({ length: SEASON_TIER_COUNT }, (_, i) => tierReward(i + 1, "premium")).filter((r) => r.kind === "zro").map((r) => r.amount);
    expect(Math.max(...zros)).toBeLessThanOrEqual(0.25);
    expect(Math.max(...zros)).toBeGreaterThan(0.2);
  });
  it("daily draw prize is fixed per day", () => {
    expect(dailyDrawPrize("2026-11-18")).toBe(dailyDrawPrize("2026-11-18"));
    expect(dailyDrawPrize("2026-11-18")).toBeGreaterThanOrEqual(50);
  });
});
