import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownToLine, ArrowUpFromLine, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { usePrices } from "@/hooks/use-prices";
import ZroPage, { Section } from "@/components/zro/ZroPage";
import { act, initData, useZro } from "@/hooks/use-zro";
import { GRAM_ICON, WALLET_ICON, ZRO_ICON } from "@/lib/zro-assets";
import { MIN_WITHDRAW, VERIFY_FEE_GRAM } from "@/lib/zro-board";
import { formatZro } from "@/lib/zro-format";
import { zroSetWallet, zroVerify, zroWithdraw } from "@/lib/zro.functions";
import { shortAddress, useTonWallet } from "@/hooks/use-ton-wallet";

export const Route = createFileRoute("/wallet")({
  component: WalletPage,
  head: () => ({
    meta: [
      { title: "المحفظة — ZRO" },
      { name: "description", content: "رصيدك من ZRO وGRAM، وسحب وإيداع وتوثيق المحفظة." },
      { property: "og:title", content: "المحفظة — ZRO" },
      { property: "og:description", content: "رصيدك من ZRO وGRAM، وسحب وإيداع وتوثيق المحفظة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function WalletPage() {
  const { me, set } = useZro();
  const wallet = useTonWallet();
  const [sheet, setSheet] = useState(false);
  const [coin, setCoin] = useState<"zro" | "gram">("zro");
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);

  // Save the connected wallet address on the player's account.
  useEffect(() => {
    if (wallet.address && me && wallet.address !== me.wallet) {
      act(() => zroSetWallet({ data: { initData: initData(), wallet: wallet.address } })).then((m) => m && set(m));
    }
  }, [wallet.address, me?.wallet]);

  const prices = usePrices();
  const usd = (me?.zro ?? 0) * prices.zro + (me?.gram ?? 0) * prices.gram;
  const verify = async () => {
    if (!me) return;
    setBusy(true);
    try { await wallet.pay(VERIFY_FEE_GRAM, `ZRO-V-${me.tgId}`); } catch (e) { toast((e as Error).message || "اتلغى الدفع"); setBusy(false); return; }
    toast("بنتحقق من الدفع…");
    await new Promise((r) => setTimeout(r, 15000));
    const m = await act(() => zroVerify({ data: { initData: initData(), wallet: wallet.address ?? undefined } }));
    if (m) { set(m); toast("اتوثقت محفظتك، تقدر تلعب دلوقتي"); }
    setBusy(false);
  };
  const withdraw = async () => {
    setBusy(true);
    const m = await act(() => zroWithdraw({ data: { initData: initData(), coin, amount: Number(amount) } }));
    if (m) { set(m); setSheet(false); setAmount(""); toast("طلب السحب اتسجل"); }
    setBusy(false);
  };
  const coins = [
    { key: "zro" as const, name: "ZRO", icon: ZRO_ICON, value: me?.zro ?? 0 },
    { key: "gram" as const, name: "GRAM", icon: GRAM_ICON, value: me?.gram ?? 0 },
  ];

  return (
    <ZroPage profile={false}>
      <div className="surface flex flex-col items-center gap-1 rounded-[28px] p-5">
        <p className="text-xs text-muted-foreground">رصيدك</p>
        <p dir="ltr" className="font-display text-4xl font-extrabold tabular-nums">
          ${usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: usd < 1 ? 4 : 2 })}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={() => setSheet(true)} className="surface pressable flex h-14 items-center justify-center gap-2 rounded-[20px] font-display font-bold">
          <ArrowUpFromLine className="h-5 w-5" /> سحب
        </button>
        <button type="button" onClick={() => toast("الإيداع هيتفعل أول ما نضيف عنوان محفظة الاستلام")} className="surface pressable flex h-14 items-center justify-center gap-2 rounded-[20px] font-display font-bold">
          <ArrowDownToLine className="h-5 w-5" /> إيداع
        </button>
      </div>

      {me && !me.verified && (
        <div className="bg-premium flex flex-col gap-3 rounded-[26px] p-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-10 w-10 shrink-0" />
            <div>
              <p className="font-display text-lg font-extrabold">وثّق محفظتك عشان تلعب</p>
              <p className="text-xs">مرة واحدة بس، وبعدها تقدر ترمي النرد.</p>
            </div>
          </div>
          <button type="button" disabled={busy} onClick={verify} className="btn-glossy btn-premium pressable flex h-12 items-center justify-center gap-2 rounded-full font-display text-lg font-extrabold">
            ادفع <span dir="ltr">{VERIFY_FEE_GRAM}</span> <img src={GRAM_ICON} alt="GRAM" className="h-6 w-6 rounded-full" /> GRAM
          </button>
        </div>
      )}

      <div className="surface flex items-center gap-3 rounded-[26px] p-4">
        <img src={WALLET_ICON} alt="" className="h-12 w-12 object-contain" />
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">محفظة GRAM</p>
          <p dir="ltr" className="truncate text-right font-display text-base font-bold">{wallet.address ? shortAddress(wallet.address) : "غير متصلة"}</p>
        </div>
        <button type="button" onClick={wallet.address ? wallet.disconnect : wallet.connect} className="btn-glossy btn-invite pressable rounded-full px-4 py-2 font-display text-sm font-bold">
          {wallet.address ? "فصل" : "ربط المحفظة"}
        </button>
      </div>

      <Section title="العملات">
        <div className="surface flex flex-col divide-y divide-border rounded-[24px] px-4">
          {coins.map((c) => (
            <div key={c.name} className="flex items-center gap-3 py-3">
              <img src={c.icon} alt={c.name} className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <p dir="ltr" className="text-right font-display text-base font-bold">{c.name}</p>
                <p dir="ltr" className="text-right text-xs text-muted-foreground">${prices[c.key].toFixed(c.key === "zro" ? 4 : 3)}</p>
              </div>
              <div className="text-left">
                <p dir="ltr" className="font-display text-lg font-extrabold tabular-nums">{formatZro(c.value)}</p>
                <p dir="ltr" className="text-xs text-muted-foreground">${(c.value * prices[c.key]).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {sheet && (
        <div className="fixed inset-0 z-[500000] flex items-end bg-background/70" onClick={() => setSheet(false)}>
          <div className="pb-tg-safe mx-auto flex w-full max-w-[430px] flex-col gap-3 rounded-t-[30px] border-t border-border bg-background p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <p className="font-display text-xl font-extrabold">سحب</p>
              <button type="button" aria-label="إغلاق" onClick={() => setSheet(false)} className="surface pressable grid h-9 w-9 place-items-center rounded-full"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {coins.map((c) => (
                <button key={c.key} type="button" onClick={() => setCoin(c.key)} className={`pressable flex h-12 items-center justify-center gap-2 rounded-2xl font-display font-bold ${coin === c.key ? "bg-foreground text-background" : "surface"}`}>
                  <img src={c.icon} alt="" className="h-6 w-6 rounded-full" /> {c.name}
                </button>
              ))}
            </div>
            <input dir="ltr" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={`${MIN_WITHDRAW}`} className="surface h-12 rounded-2xl px-4 text-right font-display text-lg font-bold outline-none" />
            <p className="text-xs text-muted-foreground">أقل سحب <b dir="ltr">{MIN_WITHDRAW}</b> عملة. بيوصل على المحفظة المربوطة.</p>
            <button type="button" disabled={busy} onClick={withdraw} className="btn-glossy btn-premium pressable mb-2 h-12 rounded-full font-display text-lg font-extrabold">اسحب</button>
          </div>
        </div>
      )}
    </ZroPage>
  );
}
