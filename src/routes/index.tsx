import { createFileRoute } from "@tanstack/react-router";
import BoardPage from "@/components/zro/BoardPage";

export const Route = createFileRoute("/")({
  component: BoardPage,
  head: () => ({
    meta: [
      { title: "ZRO Miner — ارمي النرد واجمع ZRO" },
      { name: "description", content: "لوحة تعدين ZRO: ارمي النرد، حرك قطعتك، واجمع ZRO وطاقة وXP." },
      { property: "og:title", content: "ZRO Miner — ارمي النرد واجمع ZRO" },
      { property: "og:description", content: "لوحة تعدين ZRO: ارمي النرد، حرك قطعتك، واجمع ZRO وطاقة وXP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
