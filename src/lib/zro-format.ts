/** Compact ZRO amount: 0.27 · 12.5 · 1.2k · 507k */
export function formatZro(n: number): string {
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1000) return `${+(n / 1000).toFixed(n >= 100_000 ? 0 : 1)}k`;
  if (n >= 100) return n.toFixed(0);
  return `${+n.toFixed(2)}`;
}

/** mm:ss countdown */
export function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
