// App languages: Arabic (source text), English, Russian, Persian. Picked from the player's
// Telegram language; anything else falls back to English. Arabic strings are the keys.
import DICT from "./i18n-dict";

export type Lang = "ar" | "en" | "ru" | "fa";
const dict = DICT as Record<string, Partial<Record<Exclude<Lang, "ar">, string>>>;
const AR = /[\u0600-\u06FF]/;

export function pickLang(code?: string | null): Lang {
  const c = (code ?? "").slice(0, 2).toLowerCase();
  return c === "ar" || c === "ru" || c === "fa" ? c : "en";
}

let lang: Lang = "ar";
export const currentLang = () => lang;

/** Translates one Arabic string (exact match after trimming); unknown text is returned unchanged. */
export function t(s: string): string {
  if (lang === "ar" || !s || !AR.test(s)) return s;
  let key = s.trim();
  let hit = dict[key]?.[lang];
  if (!hit) {
    // Retry without surrounding punctuation like "=", ":" or "·".
    const core = key.replace(/^[^\p{L}\d]+|[^\p{L}\d.]+$/gu, "");
    if (dict[core]?.[lang]) { key = core; hit = dict[core]![lang as "en"]; }
  }
  if (hit) return s.replace(key, hit);
  // Messages with a number inside, e.g. "محتاج 3 إعلان كمان": translate the pieces around numbers.
  const parts = key.split(/(\s*[\d.,+]+\s*)/);
  if (parts.length > 1) {
    const out = parts.map((p) => (AR.test(p) ? dict[p.trim()]?.[lang as "en"] ?? p : p));
    if (!out.some((p) => AR.test(p))) return s.replace(key, out.join(""));
  }
  return s;
}
export const useT = () => t;

const ORIG = new WeakMap<Node, string>();
function translateNode(n: Node) {
  if (n.nodeType === 3) {
    const v = n.nodeValue ?? "";
    if (!AR.test(v)) return;
    const next = t(v);
    if (next !== v) { ORIG.set(n, v); n.nodeValue = next; }
    return;
  }
  if (n.nodeType !== 1) return;
  const el = n as Element;
  if (el.tagName === "SCRIPT" || el.tagName === "STYLE") return;
  for (const a of ["placeholder", "aria-label", "title", "alt"]) {
    const v = el.getAttribute(a);
    if (v && AR.test(v)) { const x = t(v); if (x !== v) el.setAttribute(a, x); }
  }
  el.childNodes.forEach(translateNode);
}

/** Call once in the browser: sets the language and keeps every Arabic text on screen translated. */
export function startI18n() {
  const tg = (window as any).Telegram?.WebApp;
  const saved = localStorage.getItem("zro_lang") as Lang | null;
  lang = saved ?? pickLang(tg?.initDataUnsafe?.user?.language_code ?? navigator.language);
  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === "ar" || lang === "fa" ? "rtl" : "ltr";
  if (lang === "ar") return;
  translateNode(document.body);
  new MutationObserver((ms) => {
    for (const m of ms) {
      if (m.type === "characterData") translateNode(m.target);
      else if (m.type === "attributes") translateNode(m.target);
      else m.addedNodes.forEach(translateNode);
    }
  }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["placeholder", "aria-label", "title", "alt"] });
}
