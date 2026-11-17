// Free, ad-free browser games from the NEBULA CDN catalog (served by jsDelivr).
// The slim list lives in public/zro-games.json as [slug, name, category] rows.
export type GameCat = "puzzle" | "arcade" | "action" | "racing" | "sports" | "strategy";
export type Game = { id: string; title: string; cat: GameCat };
export const GAME_CATS: { key: GameCat | ""; label: string; emoji: string }[] = [
  { key: "", label: "الكل", emoji: "" },
  { key: "arcade", label: "آركيد", emoji: "👾" }, { key: "puzzle", label: "ألغاز", emoji: "🧩" },
  { key: "action", label: "أكشن", emoji: "🔫" }, { key: "racing", label: "سباق", emoji: "🏎️" },
  { key: "sports", label: "رياضة", emoji: "⚽" }, { key: "strategy", label: "استراتيجية", emoji: "♟️" },
];
export const NEBULA_BASE = "https://cdn.jsdelivr.net/gh/GoatTech-42/NEBULACDN@main/games/";

export async function loadGames(): Promise<Game[]> {
  const r = await fetch("/zro-games.json");
  const rows = (await r.json()) as [string, string, GameCat][];
  return rows.map(([id, title, cat]) => ({ id, title, cat }));
}

/** jsDelivr serves .html as plain text, so the page is fetched and run from srcdoc with a base URL. */
// Sandboxed games can't touch real storage; give them an in-memory one so they don't crash.
const SHIM = `<script>(function(){function M(){var d={};return{getItem:function(k){return k in d?d[k]:null},setItem:function(k,v){d[k]=String(v)},removeItem:function(k){delete d[k]},clear:function(){d={}},key:function(i){return Object.keys(d)[i]||null},get length(){return Object.keys(d).length}}}["localStorage","sessionStorage"].forEach(function(n){try{window[n].length}catch(e){Object.defineProperty(window,n,{value:M(),configurable:true})}});try{document.cookie}catch(e){Object.defineProperty(document,"cookie",{get:function(){return""},set:function(){},configurable:true})}})()</script>`;

/** jsDelivr serves .html as plain text, so the page is fetched and run from srcdoc with a base URL. */
export async function gameHtml(g: Game): Promise<string> {
  let html = await (await fetch(`${NEBULA_BASE}${g.id}.html`)).text();
  if (!/<base\s/i.test(html)) html = `<base href="${NEBULA_BASE}">` + html;
  return SHIM + html;
}

const PALETTE = ["#ff6b6b", "#feca57", "#1dd1a1", "#54a0ff", "#5f27cd", "#ff9f43", "#0abde3", "#ee5253", "#10ac84", "#f368e0"];
export function gameColor(id: string) {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return PALETTE[h % PALETTE.length]!;
}
