import { useQuery } from "@tanstack/react-query";

/** Live USD prices from Binance: ZRO from ZRO/USDT, GRAM from TON/USDT. */
export function usePrices() {
  const q = useQuery({
    queryKey: ["zro-prices"],
    refetchInterval: 60_000,
    queryFn: async () => {
      const r = await fetch('https://api.binance.com/api/v3/ticker/price?symbols=["ZROUSDT","TONUSDT"]');
      const j = (await r.json()) as { symbol: string; price: string }[];
      const get = (s: string) => Number(j.find((x) => x.symbol === s)?.price ?? 0);
      return { zro: get("ZROUSDT"), gram: get("TONUSDT") };
    },
  });
  return q.data ?? { zro: 0, gram: 0 };
}
