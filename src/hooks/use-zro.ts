import { useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { zroMe, type ZroMe } from "@/lib/zro.functions";
import { applyRegen, msUntilNextEnergy, canRoll } from "@/lib/zro-board";

/** Telegram's signed launch data; empty in a normal browser. */
export const initData = (): string =>
  typeof window === "undefined" ? "" : ((window as any).Telegram?.WebApp?.initData as string) ?? "";

export const ME_KEY = ["zro-me"] as const;

/** The signed-in player's balances from the database, with live energy refill. */
export function useZro() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ME_KEY, queryFn: () => zroMe({ data: { initData: initData() } }), staleTime: 30_000 });
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const me = q.data ? { ...q.data, ...applyRegen(q.data, now) } : null;
  const set = useCallback((m: ZroMe) => qc.setQueryData(ME_KEY, m), [qc]);
  return { me, set, nextEnergyIn: me ? msUntilNextEnergy(me, now) : null, canRoll: me ? canRoll(me) : false };
}

/** Runs a server action and shows its Arabic error message as a toast. */
export async function act<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (e) {
    toast(e instanceof Error ? e.message : "حصلت مشكلة");
    return null;
  }
}

/** Shows a Monetag rewarded ad; resolves true when the player watched it. */
export async function showAd(): Promise<boolean> {
  const fn = (window as any).show_12288175 as undefined | (() => Promise<void>);
  if (!fn) { toast("الإعلان مش جاهز، جرب كمان شوية"); return false; }
  try { await fn(); return true; } catch { return false; }
}
