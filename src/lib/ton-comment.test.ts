import { describe, expect, it } from "vitest";
import { beginCell } from "@ton/core";
import { commentPayload } from "./ton-comment";

describe("commentPayload", () => {
  it("matches @ton/core for a payment memo", () => {
    const m = "ZRO-B-plus-8436961304-k3j4h5g6";
    expect(commentPayload(m)).toBe(beginCell().storeUint(0, 32).storeStringTail(m).endCell().toBoc().toString("base64"));
  });
});
