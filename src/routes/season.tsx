import { createFileRoute } from "@tanstack/react-router";
import ComingSoon from "@/components/zro/ComingSoon";
import { SEASON_ICON } from "@/lib/zro-assets";

export const Route = createFileRoute("/season")({
  component: () => <ComingSoon title="الموسم" icon={SEASON_ICON} />,
  head: () => ({
    meta: [
      { title: "الموسم — ZRO Miner" },
      { name: "description", content: "تذكرة الموسم وجوائز المستويات في ZRO Miner." },
      { property: "og:title", content: "الموسم — ZRO Miner" },
      { property: "og:description", content: "تذكرة الموسم وجوائز المستويات في ZRO Miner." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
