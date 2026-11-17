import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { toast } from "@/lib/notify";
import ZroPage from "@/components/zro/ZroPage";
import PremiumSheet from "@/components/zro/PremiumSheet";
import { act, initData, useZro } from "@/hooks/use-zro";
import { ENERGY_ICON, GRAM_ICON, PREMIUM_PASS, SPIN_ICON, ZRO_ICON } from "@/lib/zro-assets";
import { SEASON_PASS_GRAM } from "@/lib/zro-board";
import { SEASON_TIER_COUNT, XP_PER_TIER, tierReward, type TierReward } from "@/lib/zro-rewards";
import { zroSeason } from "@/lib/zro.functions";

const ICON: Record<TierReward["kind"], string> = { zro: ZRO_ICON, gram: GRAM_ICON, energy: ENERGY_ICON, spins: SPIN_ICON };

export const Route = createFileRoute("/season")({
  component: SeasonPage,
  head: () => ({
    meta: [
      { title: "الموسم — ZRO" },
      { name: "description", content: "30 مستوى أساسي و30 بريميوم، والبريميوم بـ 5 GRAM." },
      { property: "og:title", content: "الموسم — ZRO" },
      { property: "og:description", content: "30 مستوى أساسي و30 بريميوم، والبريميوم بـ 5 GRAM." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

type CellState = "claimed" | "ready" | "locked" | "premium";
function Cell({ r, state, onClaim }: { r: TierReward; state: CellState; onClaim: () => void }) {
  const bg = state === "claimed" ? "bg-claimed" : state === "ready" ? "bg-success/20" : "bg-foreground/5";
  return (
    <button type="button" disabled={state !== "ready"} onClick={onClaim} className={`relative flex h-[120px] flex-col items-center justify-center gap-1 rounded-[22px] border border-border ${bg}`}>
      {(state === "locked" || state === "premium") && <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />}
      <img src={ICON[r.kind]} alt="" className={`h-11 w-11 rounded-full object-contain ${state === "locked" || state === "premium" ? "opacity-60" : ""}`} />
      <span dir="ltr" className="font-display text-base font-bold">{r.amount}</span>
      {state === "claimed" && <span className="flex items-center gap-1 text-xs text-success"><CheckCircle2 className="h-3.5 w-3.5" /> تم</span>}
      {state === "ready" && <span className="rounded-full bg-success px-2 py-0.5 text-[11px] font-bold text-background">استلم</span>}
    </button>
  );
}

function SeasonPage() {
  const { me, set } = useZro();
  const qc = useQueryClient();
  const [sheet, setSheet] = useState(false);
  const q = useQuery({ queryKey: ["zro-season"], queryFn: () => zroSeason({ data: { initData: initData() } }) });
  const claims = new Set(q.data?.claims ?? []);
  const xp = me?.xp ?? 0;
  const level = Math.min(SEASON_TIER_COUNT, Math.floor(xp / XP_PER_TIER));
  const pct = level >= SEASON_TIER_COUNT ? 100 : ((xp % XP_PER_TIER) / XP_PER_TIER) * 100;

  const claim = async (tier: number, track: "free" | "premium") => {
    const r = await act(() => zroSeason({ data: { initData: initData(), claim: { tier, track } } }));
    if (r) { set(r.me); qc.setQueryData(["zro-season"], r); toast("اتضافت المكافأة"); }
  };
  const stateOf = (tier: number, track: "free" | "premium"): CellState => {
    if (claims.has(`${track}:${tier}`)) return "claimed";
    if (track === "premium" && !me?.premium) return "premium";
    return tier <= level ? "ready" : "locked";
  };
  const tiers = Array.from({ length: SEASON_TIER_COUNT }, (_, i) => i + 1);

  return (
    <ZroPage>
      <div className="surface flex flex-col gap-2 rounded-[24px] p-4">
        <div className="flex items-center justify-between">
          <span dir="ltr" className="font-display text-xl font-extrabold">Season Pass</span>
          <span className="text-xs text-muted-foreground">المستوى {level} / {SEASON_TIER_COUNT}</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-foreground/10">
          <div className="btn-premium h-full rounded-full" style={{ width: `${pct}%` }} />
        </div>
        <span dir="ltr" className="text-right text-xs text-muted-foreground"><b className="text-foreground">{xp % XP_PER_TIER}</b> / {XP_PER_TIER} XP</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-premium flex flex-col gap-2 rounded-[26px] p-2">
          <p className="py-1 text-center font-display text-lg font-extrabold">بريميوم</p>
          {tiers.map((t) => <Cell key={t} r={tierReward(t, "premium")} state={stateOf(t, "premium")} onClaim={() => claim(t, "premium")} />)}
        </div>
        <div className="surface flex flex-col gap-2 rounded-[26px] p-2">
          <p className="py-1 text-center font-display text-lg font-extrabold">أساسي</p>
          {tiers.map((t) => <Cell key={t} r={tierReward(t, "free")} state={stateOf(t, "free")} onClaim={() => claim(t, "free")} />)}
        </div>
      </div>

      {!me?.premium && (
        <div className="pointer-events-none fixed inset-x-0 bottom-[92px] z-[350000] px-6">
          <button type="button" onClick={() => setSheet(true)} className="btn-glossy btn-premium pressable pointer-events-auto mx-auto flex h-12 w-full max-w-[400px] items-center justify-center gap-2 rounded-full font-display text-lg font-extrabold">
            <img src={PREMIUM_PASS} alt="" className="h-7 w-7" />
            فتح البريميوم بـ <span dir="ltr">{SEASON_PASS_GRAM}</span>
            <img src={GRAM_ICON} alt="GRAM" className="h-5 w-5 rounded-full" />
          </button>
        </div>
      )}
      {sheet && <PremiumSheet onClose={() => setSheet(false)} />}
    </ZroPage>
  );
}
