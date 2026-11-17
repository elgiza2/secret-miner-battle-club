import { describe, expect, it } from "vitest";
import {
  applyRegen, applyRoll, canRoll, initialState, msUntilNextEnergy, tileColumn, tileKind,
} from "./zro-board";

const T0 = 1_000_000;
const MIN = 60_000;

describe("ZRO board rules", () => {
  it("starts with 25 of 25 energy", () => {
    expect(initialState(T0).energy).toBe(25);
  });

  it("a roll costs 5 energy", () => {
    // tile 2 is a plain tile, so no bonus energy
    const { state } = applyRoll(initialState(T0), 2, T0);
    expect(state.energy).toBe(20);
  });

  it("cannot roll with less than 5 energy", () => {
    expect(canRoll({ ...initialState(T0), energy: 4 })).toBe(false);
    expect(() => applyRoll({ ...initialState(T0), energy: 4 }, 2, T0)).toThrow();
  });

  it("refills 1 energy every 10 minutes, never above 25", () => {
    const s = { ...initialState(T0), energy: 10, regenFrom: T0 };
    expect(applyRegen(s, T0 + 9 * MIN).energy).toBe(10);
    expect(applyRegen(s, T0 + 10 * MIN).energy).toBe(11);
    expect(applyRegen(s, T0 + 35 * MIN).energy).toBe(13);
    expect(applyRegen(s, T0 + 1000 * MIN).energy).toBe(25);
  });

  it("counts down to the next energy point", () => {
    const s = { ...initialState(T0), energy: 10, regenFrom: T0 };
    expect(msUntilNextEnergy(s, T0 + 4 * MIN)).toBe(6 * MIN);
    expect(msUntilNextEnergy(initialState(T0), T0)).toBeNull();
  });

  it("landing on a ZRO tile gives 0.25 ZRO", () => {
    expect(tileKind(3)).toBe("zro");
    expect(applyRoll(initialState(T0), 3, T0).state.zro).toBe(0.25);
  });

  it("landing on a lightning tile gives 5 energy back", () => {
    expect(tileKind(1)).toBe("bolt");
    expect(applyRoll(initialState(T0), 1, T0).state.energy).toBe(25);
  });

  it("landing on an XP tile gives 25 XP", () => {
    expect(tileKind(5)).toBe("xp");
    expect(applyRoll(initialState(T0), 5, T0).state.xp).toBe(25);
  });

  it("path stays connected: neighbouring tiles are one column apart", () => {
    for (let i = 0; i < 100; i++) {
      expect(Math.abs(tileColumn(i + 1) - tileColumn(i))).toBe(1);
    }
  });
});
