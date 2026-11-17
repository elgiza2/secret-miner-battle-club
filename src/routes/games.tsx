import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, X } from "lucide-react";
import ZroPage, { Section } from "@/components/zro/ZroPage";
import { GAMES, GAME_CATS, type Game, type GameCat } from "@/lib/zro-games";

export const Route = createFileRoute("/games")({
  component: GamesPage,
  head: () => ({
    meta: [
      { title: "ألعاب — ZRO" },
      { name: "description", content: "ألعاب مجانية من غير إعلانات تلعبها جوه ZRO." },
      { property: "og:title", content: "ألعاب — ZRO" },
      { property: "og:description", content: "ألعاب مجانية من غير إعلانات تلعبها جوه ZRO." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function Thumb({ g, big }: { g: Game; big?: boolean }) {
  return (
    <div className={`grid shrink-0 place-items-center ${big ? "h-full w-full text-6xl" : "h-14 w-14 rounded-2xl text-2xl"}`}
      style={{ background: `linear-gradient(150deg, ${g.color}, color-mix(in oklab, ${g.color} 45%, black))` }}>
      {g.emoji}
    </div>
  );
}

function GamesPage() {
  const [cat, setCat] = useState<GameCat | "">("");
  const [searching, setSearching] = useState(false);
  const [term, setTerm] = useState("");
  const [playing, setPlaying] = useState<Game | null>(null);
  const list = GAMES.filter((g) => (!cat || g.cat === cat) && g.title.toLowerCase().includes(term.toLowerCase()));
  const groups = GAME_CATS.filter((c) => c.key && (!cat || c.key === cat));

  return (
    <ZroPage>
      <div className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4">
        <button type="button" aria-label="بحث" onClick={() => { setSearching((v) => !v); setTerm(""); }} className={`pressable grid h-9 w-9 shrink-0 place-items-center rounded-full ${searching ? "bg-foreground text-background" : "surface"}`}>
          {searching ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
        </button>
        {searching ? (
          <input autoFocus value={term} onChange={(e) => setTerm(e.target.value)} placeholder="دور على لعبة" className="surface h-9 min-w-0 flex-1 rounded-full px-4 text-sm outline-none" />
        ) : GAME_CATS.map((c) => (
          <button key={c.key} type="button" onClick={() => setCat(c.key)} className={`pressable h-9 shrink-0 rounded-full px-4 font-display text-sm font-bold ${cat === c.key ? "bg-foreground text-background" : "surface"}`}>
            {c.label}
          </button>
        ))}
      </div>

      {!term && !cat && (
        <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4">
          {GAMES.slice(0, 5).map((g) => (
            <div key={g.id} className="relative h-44 w-[85%] shrink-0 snap-center overflow-hidden rounded-[26px]">
              <Thumb g={g} big />
              <div className="surface-strong absolute inset-x-2 bottom-2 flex items-center gap-2 rounded-[20px] p-2">
                <p dir="ltr" className="min-w-0 flex-1 truncate text-right font-display text-sm font-bold">{g.title}</p>
                <button type="button" onClick={() => setPlaying(g)} className="btn-glossy btn-invite pressable rounded-full px-4 py-1.5 font-display text-sm font-bold">العب</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {term ? (
        <Section title="النتائج"><GameList games={list} play={setPlaying} /></Section>
      ) : groups.map((c) => {
        const gs = list.filter((g) => g.cat === c.key);
        return gs.length ? <Section key={c.key} title={c.label}><GameList games={gs} play={setPlaying} /></Section> : null;
      })}
      {term && list.length === 0 && <p className="text-center text-sm text-muted-foreground">مفيش لعبة بالاسم ده</p>}

      {playing && (
        <div className="fixed inset-0 z-[600000] flex flex-col bg-background">
          <div className="pt-tg-safe flex items-center justify-between px-4 py-2">
            <p dir="ltr" className="truncate font-display font-bold">{playing.title}</p>
            <button type="button" aria-label="قفل" onClick={() => setPlaying(null)} className="surface pressable grid h-9 w-9 place-items-center rounded-full"><X className="h-5 w-5" /></button>
          </div>
          <iframe title={playing.title} src={playing.url} className="w-full flex-1 border-0" allow="autoplay; fullscreen; gamepad" allowFullScreen />
        </div>
      )}
    </ZroPage>
  );
}

function GameList({ games, play }: { games: Game[]; play: (g: Game) => void }) {
  return (
    <div className="flex flex-col gap-3">
      {games.map((g) => (
        <div key={g.id} className="flex items-center gap-3">
          <Thumb g={g} />
          <p dir="ltr" className="min-w-0 flex-1 truncate text-right font-display text-sm font-bold">{g.title}</p>
          <button type="button" onClick={() => play(g)} className="btn-glossy btn-invite pressable shrink-0 rounded-full px-4 py-1.5 font-display text-sm font-bold">العب</button>
        </div>
      ))}
    </div>
  );
}
