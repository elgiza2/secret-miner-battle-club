import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search, X } from "lucide-react";
import ZroPage, { Section } from "@/components/zro/ZroPage";

// Free HTML5 games catalog (GameMonetize feed, thousands of titles, CORS-open).
type Game = { id: string; title: string; description: string; url: string; category: string; thumb: string };
const CATS = [
  { key: "", label: "الكل" }, { key: "Arcade", label: "ARCADE" }, { key: "Puzzles", label: "PUZZLE" },
  { key: "Sports", label: "SPORT" }, { key: "Action", label: "ACTION" }, { key: "Racing", label: "RACING" },
];

async function fetchGames(category: string): Promise<Game[]> {
  const q = new URLSearchParams({ format: "0", num: "60", page: "1" });
  if (category) q.set("category", category);
  const r = await fetch(`https://gamemonetize.com/feed.php?${q}`);
  if (!r.ok) throw new Error("feed");
  return r.json();
}

export const Route = createFileRoute("/games")({
  component: GamesPage,
  head: () => ({
    meta: [
      { title: "ألعاب — ZRO" },
      { name: "description", content: "أكتر من ألف لعبة مجانية تلعبها جوه ZRO." },
      { property: "og:title", content: "ألعاب — ZRO" },
      { property: "og:description", content: "أكتر من ألف لعبة مجانية تلعبها جوه ZRO." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function GamesPage() {
  const [cat, setCat] = useState("");
  const [term, setTerm] = useState("");
  const [playing, setPlaying] = useState<Game | null>(null);
  const { data, isLoading, isError } = useQuery({ queryKey: ["games", cat], queryFn: () => fetchGames(cat), staleTime: 600_000 });
  const list = (data ?? []).filter((g) => g.title.toLowerCase().includes(term.toLowerCase()));
  const featured = list.slice(0, 6);

  return (
    <ZroPage>
      <div className="surface flex items-center gap-2 rounded-full px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="دور على لعبة" className="w-full bg-transparent text-sm outline-none" />
      </div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {CATS.map((c) => (
          <button key={c.key} type="button" onClick={() => setCat(c.key)} className={`pressable shrink-0 rounded-full px-4 py-2 font-display text-sm font-bold ${cat === c.key ? "bg-foreground text-background" : "surface"}`}>
            {c.label}
          </button>
        ))}
      </div>

      {isLoading && <p className="text-center text-sm text-muted-foreground">بنحمّل الألعاب…</p>}
      {isError && <p className="text-center text-sm text-muted-foreground">مقدرناش نحمّل الألعاب، جرب تاني.</p>}

      {featured.length > 0 && (
        <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4">
          {featured.map((g) => (
            <div key={g.id} className="relative h-48 w-[85%] shrink-0 snap-center overflow-hidden rounded-[26px]">
              <img src={g.thumb} alt={g.title} className="h-full w-full object-cover" />
              <div className="surface-strong absolute inset-x-2 bottom-2 flex items-center gap-2 rounded-[20px] p-2">
                <img src={g.thumb} alt="" className="h-10 w-10 rounded-xl object-cover" />
                <p dir="ltr" className="min-w-0 flex-1 truncate text-right font-display text-sm font-bold">{g.title}</p>
                <button type="button" onClick={() => setPlaying(g)} className="btn-glossy btn-invite pressable rounded-full px-4 py-1.5 font-display text-sm font-bold">العب</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {list.length > 0 && (
        <Section title="الألعاب الرائجة">
          <div className="flex flex-col gap-3">
            {list.map((g) => (
              <div key={g.id} className="flex items-center gap-3">
                <img src={g.thumb} alt={g.title} loading="lazy" className="h-14 w-14 shrink-0 rounded-2xl object-cover" />
                <div dir="ltr" className="min-w-0 flex-1 text-right">
                  <p className="truncate font-display text-sm font-bold">{g.title}</p>
                  <p className="line-clamp-2 text-[11px] text-muted-foreground">{g.description}</p>
                </div>
                <button type="button" onClick={() => setPlaying(g)} className="btn-glossy btn-invite pressable shrink-0 rounded-full px-4 py-1.5 font-display text-sm font-bold">العب</button>
              </div>
            ))}
          </div>
        </Section>
      )}

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
