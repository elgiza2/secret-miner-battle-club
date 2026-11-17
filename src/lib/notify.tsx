import { useEffect, useState } from "react";

/**
 * Quiet text notices shown right under the button/box the player just tapped,
 * instead of popups in the header. Same call shape as sonner's toast.
 */
type Kind = "info" | "success" | "error" | "loading";
type Note = { id: number; text: string; kind: Kind; x: number; y: number; w: number };
let last: DOMRect | null = null;
let seq = 0;
const subs = new Set<(n: Note | null) => void>();
let timer: ReturnType<typeof setTimeout> | undefined;

if (typeof window !== "undefined") {
  window.addEventListener("pointerdown", (e) => {
    const el = (e.target as HTMLElement | null)?.closest("button, a, input, [role=button]") as HTMLElement | null;
    last = el?.getBoundingClientRect() ?? null;
  }, true);
}

function show(text: string, kind: Kind, id?: number) {
  const r = last;
  const n: Note = {
    id: id ?? ++seq, text: String(text), kind,
    x: r ? r.left + r.width / 2 : window.innerWidth / 2,
    y: r ? r.bottom + window.scrollY + 6 : window.scrollY + window.innerHeight / 2,
    w: Math.max(r?.width ?? 0, 160),
  };
  subs.forEach((s) => s(n));
  clearTimeout(timer);
  if (kind !== "loading") timer = setTimeout(() => subs.forEach((s) => s(null)), 2600);
  return n.id;
}

type Opt = { id?: number | string };
const idOf = (o?: Opt) => (o?.id === undefined ? undefined : Number(o.id));
export const toast = Object.assign((t: string, o?: Opt) => show(t, "info", idOf(o)), {
  success: (t: string, o?: Opt) => show(t, "success", idOf(o)),
  error: (t: string, o?: Opt) => show(t, "error", idOf(o)),
  loading: (t: string, o?: Opt) => show(t, "loading", idOf(o)),
  dismiss: () => subs.forEach((s) => s(null)),
});

export function InlineNotices() {
  const [n, setN] = useState<Note | null>(null);
  useEffect(() => { subs.add(setN); return () => { subs.delete(setN); }; }, []);
  if (!n) return null;
  const color = n.kind === "error" ? "text-destructive" : n.kind === "success" ? "text-primary" : "text-muted-foreground";
  return (
    <p
      className={`pointer-events-none absolute z-50 -translate-x-1/2 text-center font-display text-xs font-bold ${color}`}
      style={{ left: n.x, top: n.y, width: n.w, maxWidth: "90vw" }}
    >
      {n.text}
    </p>
  );
}
