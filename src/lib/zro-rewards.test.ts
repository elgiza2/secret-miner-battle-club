import { describe, expect, it } from "vitest";
import { DAILY_REWARD_GRAM, SEASON_TIER_COUNT, SHARE_REWARD_GRAM, WHEEL_PRIZES, segmentAt, wheelRotation } from "./zro-rewards";

describe("rewards rules", () => {
  it("daily reward is 50 GRAM", () => expect(DAILY_REWARD_GRAM).toBe(50));
  it("sharing gives 0.05 GRAM", () => expect(SHARE_REWARD_GRAM).toBe(0.05));
  it("season has 30 tiers", () => expect(SEASON_TIER_COUNT).toBe(30));
  it("wheel lands on the chosen segment", () => {
    for (let i = 0; i < WHEEL_PRIZES.length; i++) expect(segmentAt(wheelRotation(i))).toBe(i);
  });
});
