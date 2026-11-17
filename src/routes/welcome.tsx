import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Wordmark } from "@/components/zro/ZroPage";
import { ALL_IMAGES, DICE as DICE_ICON, GRAM_ICON, SPIN_ICON, WALLET_ICON, ZRO_ICON } from "@/lib/zro-assets";

export const Route = createFileRoute("/welcome")({
  component: WelcomePage,
  head: () => ({
    meta: [
      { title: "أهلاً بيك في ZRO" },
      { name: "description", content: "ارمي النرد، لف العجلة، واجمع ZRO وGRAM." },
      { property: "og:title", content: "أهلاً بيك في ZRO" },
      { property: "og:description", content: "ارمي النرد، لف العجلة، واجمع ZRO وGRAM." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

const TABS = [
  { icon: DICE_ICON, title: "ارمي النرد", body: "حرّك قطعتك على اللوحة واجمع ZRO مع كل خطوة." },
  { icon: SPIN_ICON, title: "لف واكسب", body: "عجلة الحظ والمهام والموسم بيدوك طاقة وعملات كل يوم." },
  { icon: WALLET_ICON, title: "اسحب على محفظتك", body: "رصيدك بالدولار، واسحب ZRO أو GRAM وقت ما تحب." },
];

/** Downloads every app image into the browser cache, reporting progress 0..1. */
function usePreload() {
  const [done, setDone] = useState(0);
  useEffect(() => {
    let n = 0;
    const tick = () => setDone(++n);
    ALL_IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = tick;
      img.src = src;
    });
    // Also keep a copy in Cache Storage so images load instantly next time.
    if ("caches" in window) caches.open("zro-images-v1").then((c) => c.addAll(ALL_IMAGES)).catch(() => {});
  }, []);
  return ALL_IMAGES.length ? Math.min(1, done / ALL_IMAGES.length) : 1;
}

function WelcomePage() {
  const [tab, setTab] = useState(0);
  const progress = usePreload();
  const navigate = useNavigate();
  const last = tab === TABS.length - 1;
  const next = () => {
    if (!last) return setTab(tab + 1);
    localStorage.setItem("zro_welcomed", "1");
    navigate({ to: "/" });
  };
  const t = TABS[tab]!;
  return (
    <div className="pt-tg-safe pb-tg-safe mx-auto flex min-h-screen max-w-[430px] flex-col px-5">
      <Wordmark />
      <div className="relative mt-6 flex flex-1 flex-col items-center justify-center">
        <div className="absolute h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <img src={ZRO_ICON} alt="" className="h-14 w-14 -rotate-12 rounded-full" />
          <img key={tab} src={t.icon} alt="" className="h-40 w-40 object-contain drop-shadow-2xl" />
          <img src={GRAM_ICON} alt="" className="h-12 w-12 rotate-12 rounded-full" />
        </div>
      </div>
      <div className="flex flex-col gap-2 pb-4">
        <h1 className="font-display text-[34px] font-extrabold leading-tight">{t.title}</h1>
        <p className="text-base text-muted-foreground">{t.body}</p>
      </div>
      <div className="mb-4 flex justify-center gap-2">
        {TABS.map((_, i) => (
          <button key={i} type="button" aria-label={`صفحة ${i + 1}`} onClick={() => setTab(i)}
            className={`h-2 rounded-full transition-all ${i === tab ? "w-7 bg-foreground" : "w-2 bg-foreground/25"}`} />
        ))}
      </div>
      <button type="button" onClick={next} disabled={last && progress < 1}
        className="btn-glossy btn-invite pressable mb-6 flex h-14 items-center justify-center gap-2 rounded-full font-display text-lg font-extrabold disabled:opacity-70">
        {last ? (progress < 1 ? `بنجهز التطبيق ${Math.round(progress * 100)}%` : "يلا نبدأ") : "التالي"}
        {!(last && progress < 1) && <ArrowLeft className="h-5 w-5" />}
      </button>
    </div>
  );
}
