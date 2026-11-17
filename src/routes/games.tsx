import { createFileRoute } from "@tanstack/react-router";
import ComingSoon from "@/components/zro/ComingSoon";
import { GAMEPAD } from "@/lib/zro-assets";

export const Route = createFileRoute("/games")({
  component: () => <ComingSoon title="ألعاب" icon={GAMEPAD} />,
  head: () => ({
    meta: [
      { title: "ألعاب — ZRO Miner" },
      { name: "description", content: "ألعاب صغيرة تكسب منها طاقة وZRO." },
      { property: "og:title", content: "ألعاب — ZRO Miner" },
      { property: "og:description", content: "ألعاب صغيرة تكسب منها طاقة وZRO." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
