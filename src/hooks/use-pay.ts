import { useCallback, useState } from "react";
import { toast } from "sonner";
import { initData, useZro } from "@/hooks/use-zro";
import { useTonWallet } from "@/hooks/use-ton-wallet";
import { zroPayConfirm } from "@/lib/zro.functions";

export type PayKind = "V" | "P" | "D" | "B";

/**
 * Pays straight from the player's TON wallet and applies the purchase automatically
 * as soon as the transfer shows up on the chain (checked every 3 seconds).
 */
export function usePay() {
  const wallet = useTonWallet();
  const { me, set } = useZro();
  const [busy, setBusy] = useState(false);
  const pay = useCallback(async (kind: PayKind, amount: number, ref = "") => {
    if (!me || busy) return false;
    setBusy(true);
    const memo = `ZRO-${kind}-${ref}-${me.tgId}-${Math.random().toString(36).slice(2, 10)}`;
    try {
      await wallet.pay(amount, memo);
    } catch (e) {
      toast((e as Error).message || "اتلغى الدفع");
      setBusy(false);
      return false;
    }
    const t = toast.loading("بنأكد الدفع…");
    for (let i = 0; i < 40; i++) {
      await new Promise((r) => setTimeout(r, 3000));
      try {
        const r = await zroPayConfirm({ data: { initData: initData(), memo } });
        if (r.paid) { set(r.me); toast.success("تم الدفع", { id: t }); setBusy(false); return true; }
      } catch (e) { toast.error((e as Error).message, { id: t }); setBusy(false); return false; }
    }
    toast.error("الدفع لسه موصلش، لو اتخصم منك ابعتلنا", { id: t });
    setBusy(false);
    return false;
  }, [me, busy, wallet, set]);
  return { pay, busy, connected: !!wallet.address, connect: wallet.connect };
}
