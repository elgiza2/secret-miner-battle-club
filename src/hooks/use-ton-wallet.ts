import { useCallback, useEffect, useState } from "react";
import type { TonConnectUI } from "@tonconnect/ui";

let ui: Promise<TonConnectUI> | null = null;
function getUi() {
  // Browser-only library: loaded on first use, one shared instance.
  ui ??= import("@tonconnect/ui").then(
    ({ TonConnectUI }) => new TonConnectUI({ manifestUrl: `${window.location.origin}/tonconnect-manifest.json` }),
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
  return { address, connect, disconnect };
}
