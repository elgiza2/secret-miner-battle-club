import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clapperboard } from "lucide-react";
import { toast } from "sonner";
import ZroPage from "@/components/zro/ZroPage";
import { ENERGY_ICON, GRAM_ICON, SPIN_ICON, ZRO_ICON } from "@/lib/zro-assets";
import { WHEEL_PRIZES, wheelRotation } from "@/lib/zro-rewards";

const COLORS = ["#ff3b5c", "#ff7a1a", "#ffb800", "#ffe14d", "#ff6bf0", "#c94dff", "#8a3ffc", "#c8663c", "#e0523a", "#f2a33a", "#d946ef", "#7c3aed"];
const ICON = { gram: GRAM_ICON, zro: ZRO_ICON, energy: ENERGY_ICON } as const;

export const Route = createFileRoute("/spin")({
  component: SpinPage,
  head: () => ({
    meta: [
      { title: "عجلة الحظ — ZRO" },
      { name: "description", content: "لف عجلة الحظ واكسب GRAM وZRO وطاقة." },
      { property: "og:title", content: "عجلة الحظ — ZRO" },
      { property: "og:description", content: "لف عجلة الحظ واكسب GRAM وZRO وطاقة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function SpinPage() {
  const [rot, setRot] = useState(0);
  const [spins, setSpins] = useState(1);
  const [busy, setBusy] = useState(false);
  const n = WHEEL_PRIZES.length;
  const seg = 360 / n;
  const bg = `conic-gradient(${WHEEL_PRIZES.map((_, i) => `${COLORS[i % COLORS.length]} ${i * seg}deg ${(i + 1) * seg}deg`).join(",")})`;

  const spin = () => {
    if (busy) return;
    if (spins <= 0) { toast("الإعلانات هتتفعل قريباً"); return; }
    const idx = Math.floor(Math.random() * n);
    const base = rot - (rot % 360);
    setBusy(true);
    setSpins((v) => v - 1);
    setRot(base + wheelRotation(idx));
    setTimeout(() => {
      const p = WHEEL_PRIZES[idx];
      toast(`كسبت ${p.amount} ${p.kind === "energy" ? "طاقة" : p.kind.toUpperCase()}`);
      setBusy(false);
    }, 4200);
  };

  return (
    <ZroPage title="عجلة الحظ" back>
      <div className="relative mx-auto mt-2 aspect-square w-full max-w-[360px]">
        <div className="absolute inset-0 rounded-full p-3" style={{ background: "linear-gradient(160deg,#ffe27a,#d99a00)", boxShadow: "0 20px 50px -20px #000" }}>
          <div
            className="relative h-full w-full overflow-hidden rounded-full"
            style={{ background: bg, transform: `rotate(${rot}deg)`, transition: busy ? "transform 4s cubic-bezier(0.15,0.85,0.25,1)" : "none" }}
          >
            {WHEEL_PRIZES.map((p, i) => (
              <div key={i} className="absolute inset-0 flex justify-center" style={{ transform: `rotate(${i * seg + seg / 2}deg)` }}>
                <div className="mt-4 flex flex-col items-center gap-1">
                  <span dir="ltr" className="font-display text-sm font-extrabold drop-shadow">{p.amount}</span>
                  <img src={ICON[p.kind]} alt="" className="h-6 w-6 rounded-full object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button type="button" onClick={spin} aria-label="لف" className="pressable absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#ffcf33]" style={{ background: "radial-gradient(circle at 40% 35%,#fff59a,#ffd000 60%,#e0a800)" }} />
        <div className="absolute left-1/2 top-[-6px] h-0 w-0 -translate-x-1/2 border-x-[14px] border-t-[24px] border-x-transparent border-t-[#ff7a1a] drop-shadow" />
      </div>
      <span className="surface-strong mx-auto flex items-center gap-1.5 rounded-full px-3 py-1 font-display font-bold">
        <img src={SPIN_ICON} alt="" className="h-6 w-6" /> {spins}
      </span>
      <div className="pointer-events-none fixed inset-x-0 bottom-[92px] z-[350000] px-6">
        <button type="button" onClick={spin} disabled={busy} className="btn-glossy btn-premium pressable pointer-events-auto mx-auto flex h-12 w-full max-w-[400px] items-center justify-center gap-2 rounded-full font-display text-lg font-extrabold">
          {spins > 0 ? "لف العجلة" : <><Clapperboard className="h-5 w-5" /> أدِر مقابل إعلان</>}
        </button>
      </div>
    </ZroPage>
  );
}
