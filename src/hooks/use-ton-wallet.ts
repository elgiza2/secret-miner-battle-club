import { useCallback, useEffect, useState } from "react";
import type { TonConnectUI } from "@tonconnect/ui";

// Wallets fetch this from their own servers, so it must be a public (published) URL.
const MANIFEST_URL = "https://secret-miner-battle-club.lovable.app/tonconnect-manifest.json";

export const PAY_TO = "UQA5k2qscmlDz0tYaNMlmhCW5czvc6zMJpB78T4y4GDz9Q5a";

let ui: Promise<TonConnectUI> | null = null;
function getUi() {
  // Browser-only library: loaded on first use, one shared instance.
  ui ??= import("@tonconnect/ui").then(
    ({ TonConnectUI }) => new TonConnectUI({
      manifestUrl: MANIFEST_URL,
      actionsConfiguration: { twaReturnUrl: "https://t.me/zroeobot" },
    }),
  );
  return ui;
}

export function shortAddress(a: string) {
  return a.length > 12 ? `${a.slice(0, 6)}…${a.slice(-4)}` : a;
}

/** Connects the player's TON (GRAM) wallet through the TON Connect wallet picker. */
export function useTonWallet() {
  const [address, setAddress] = useState<string | null>(null);
  useEffect(() => {
    let off: (() => void) | undefined;
    getUi().then((t) => {
      setAddress(t.account?.address ?? null);
      off = t.onStatusChange((w) => setAddress(w?.account.address ?? null));
    }).catch(() => {});
    return () => off?.();
  }, []);
  const connect = useCallback(() => { getUi().then((t) => t.openModal()); }, []);
  const disconnect = useCallback(() => { getUi().then((t) => t.disconnect()); }, []);
  /** Sends `ton` GRAM to the app's receiving wallet with a text comment. */
  const pay = useCallback(async (ton: number, memo: string) => {
    const t = await getUi();
    if (!t.account) { await t.openModal(); throw new Error("اربط محفظتك الأول"); }
    // @ton/core needs Node's Buffer, which browsers and Telegram don't have.
    if (!(globalThis as any).Buffer) (globalThis as any).Buffer = (await import("buffer")).Buffer;
    const { beginCell } = await import("@ton/core");
    const payload = beginCell().storeUint(0, 32).storeStringTail(memo).endCell().toBoc().toString("base64");
    await t.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [{ address: PAY_TO, amount: String(Math.round(ton * 1e9)), payload }],
    });
  }, []);
  return { address, connect, disconnect, pay };
}
