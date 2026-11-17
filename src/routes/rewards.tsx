import { createFileRoute } from "@tanstack/react-router";
import ComingSoon from "@/components/zro/ComingSoon";
import { GIFT } from "@/lib/zro-assets";

export const Route = createFileRoute("/rewards")({
  component: () => <ComingSoon title="المكافآت" icon={GIFT} />,
  head: () => ({
    meta: [
      { title: "المكافآت — ZRO Miner" },
      { name: "description", content: "مكافآت يومية ومهام لجمع ZRO أكتر." },
      { property: "og:title", content: "المكافآت — ZRO Miner" },
      { property: "og:description", content: "مكافآت يومية ومهام لجمع ZRO أكتر." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
