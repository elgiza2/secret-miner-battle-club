import { createFileRoute } from "@tanstack/react-router";
import ComingSoon from "@/components/zro/ComingSoon";
import { CART } from "@/lib/zro-assets";

export const Route = createFileRoute("/store")({
  component: () => <ComingSoon title="المتجر" icon={CART} />,
  head: () => ({
    meta: [
      { title: "المتجر — ZRO Miner" },
      { name: "description", content: "اشتري طاقة ومعززات للتعدين في ZRO Miner." },
      { property: "og:title", content: "المتجر — ZRO Miner" },
      { property: "og:description", content: "اشتري طاقة ومعززات للتعدين في ZRO Miner." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
