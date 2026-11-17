import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clapperboard } from "lucide-react";
import { toast } from "@/lib/notify";
import { Wordmark } from "@/components/zro/ZroPage";
import { act, initData, showAd, useZro } from "@/hooks/use-zro";
import { ENERGY_ICON, GRAM_ICON, SPIN_ICON, ZRO_ICON } from "@/lib/zro-assets";
import { WHEEL_PRIZES, wheelRotation } from "@/lib/zro-rewards";
import { zroAd, zroSpin } from "@/lib/zro.functions";

// Warm GAMEE-style segment palette (wheel artwork, not theme colours).
const COLORS = ["#e0441f", "#ff7a00", "#ffc21a", "#ffe94a", "#ff7cf2", "#d24dd8", "#9b2fb0", "#c56a45", "#8a3b2c", "#c4122f"];
const ICON = { gram: GRAM_ICON, zro: ZRO_ICON, energy: ENERGY_ICON } as const;
const label = (p: (typeof WHEEL_PRIZES)[number]) => (p.kind === "energy" ? `${p.amount}` : `${p.amount}`);

export const Route = createFileRoute("/spin")({
  component: SpinPage,
  head: () => ({
    meta: [
      { title: "عجلة الحظ — ZRO" },
      { name: "description", content: "لف عجلة الحظ واكسب ZRO وGRAM وطاقة." },
      { property: "og:title", content: "عجلة الحظ — ZRO" },
      { property: "og:description", content: "لف عجلة الحظ واكسب ZRO وGRAM وطاقة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function SpinPage() {
  const { me, set } = useZro();
  const [rot, setRot] = useState(0);
  const [busy, setBusy] = useState(false);
  const n = WHEEL_PRIZES.length;
  const seg = 360 / n;
  const spins = me?.spins ?? 0;
  const bg = `conic-gradient(${WHEEL_PRIZES.map((_, i) => `${COLORS[i % COLORS.length]} ${i * seg}deg ${(i + 1) * seg}deg`).join(",")})`;

  const spin = async () => {
    if (busy) return;
    setBusy(true);
    if (spins <= 0) {
      if (await showAd()) {
        const m = await act(() => zroAd({ data: { initData: initData(), purpose: "spin" } }));
        if (m) set(m);
      }
      setBusy(false);
      return;
    }
    const res = await act(() => zroSpin({ data: { initData: initData() } }));
    if (!res) { setBusy(false); return; }
    const base = rot - (rot % 360);
    setRot(base + wheelRotation(res.index));
    setTimeout(() => {
      const p = WHEEL_PRIZES[res.index]!;
      set(res.me);
      toast(`كسبت ${p.amount} ${p.kind === "energy" ? "طاقة" : p.kind.toUpperCase()}`);
      setBusy(false);
    }, 4300);
  };

  return (
    <div className="relative mx-auto min-h-screen max-w-[430px] overflow-hidden pb-40">
      <div className="pt-tg-safe relative z-10 px-4"><Wordmark /></div>
      {/* Big wheel; its top half runs off the screen like the reference. */}
      <div dir="ltr" className="relative -mt-[260px] aspect-square w-[150%]" style={{ maxWidth: "none", right: "-25%" }}>
        <div className="absolute inset-0 rounded-full p-[14px]" style={{ background: "linear-gradient(180deg,#ffd84a,#f0a300 60%,#c97a00)", boxShadow: "0 30px 60px -20px rgba(0,0,0,.8), inset 0 4px 10px rgba(255,255,255,.5)" }}>
          <div className="relative h-full w-full overflow-hidden rounded-full"
            style={{ background: bg, transform: `rotate(${rot}deg)`, transition: busy ? "transform 4.2s cubic-bezier(0.12,0.8,0.2,1)" : "none" }}>
            {WHEEL_PRIZES.map((p, i) => (
              <div key={i} className="absolute inset-0" style={{ transform: `rotate(${i * seg + seg / 2}deg)` }}>
                <div className="absolute left-1/2 top-[5%] flex -translate-x-1/2 flex-col items-center gap-1" style={{ transform: "translateX(-50%) rotate(180deg)" }}>
                  <img src={ICON[p.kind]} alt="" className="h-8 w-8 rounded-full object-contain drop-shadow" />
                  <span dir="ltr" className="font-display text-[22px] font-extrabold" style={{ color: "#fff", WebkitTextStroke: "1.5px rgba(0,0,0,.35)", textShadow: "0 2px 3px rgba(0,0,0,.35)" }}>{label(p)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Hub */}
        <div className="absolute left-1/2 top-1/2 h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle at 45% 40%,#fff27a,#ffd400 55%,#e7a400)", boxShadow: "0 6px 14px rgba(0,0,0,.45), inset 0 -6px 10px rgba(180,110,0,.5)" }} />
        {/* Pointer at the bottom, pointing up */}
        <div className="absolute bottom-[-18px] left-1/2 h-[64px] w-[54px] -translate-x-1/2" style={{ clipPath: "polygon(50% 0,100% 85%,85% 100%,15% 100%,0 85%)", background: "linear-gradient(180deg,#ffd84a,#e58a00)", filter: "drop-shadow(0 6px 6px rgba(0,0,0,.4))" }}>
          <div className="absolute inset-[9px] top-[18px]" style={{ clipPath: "polygon(50% 0,100% 85%,85% 100%,15% 100%,0 85%)", background: "linear-gradient(180deg,#ff9a3c,#e2460f)" }} />
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <span className="surface-strong flex items-center gap-2 rounded-full px-3 py-1.5 font-display text-lg font-bold">
          <img src={SPIN_ICON} alt="" className="h-7 w-7" /> {spins}
        </span>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-[92px] z-[350000] px-5">
        <button type="button" onClick={spin} disabled={busy}
          className="btn-glossy pressable pointer-events-auto mx-auto flex h-14 w-full max-w-[400px] items-center justify-center gap-2 rounded-full font-display text-xl font-extrabold"
          style={{ background: "linear-gradient(180deg,#f45cf0,#c51fc9)", boxShadow: "0 8px 24px -6px #e03ee0" }}>
          {spins > 0 ? "أدِر العجلة" : <><Clapperboard className="h-6 w-6" /> أدِر مقابل إعلان</>}
        </button>
      </div>
    </div>
  );
}
