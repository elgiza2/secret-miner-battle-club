import { Copy, Send } from "lucide-react";
import { toast } from "sonner";
import { GIFT } from "@/lib/zro-assets";

/** Invite friends block: personal link, share button and how many joined. No daily limit. */
export default function InviteCard({ link, count }: { link: string; count: number }) {
  const copy = async () => {
    try { await navigator.clipboard.writeText(link); toast("اتنسخ الرابط"); } catch { toast("مقدرناش ننسخ الرابط"); }
  };
  const share = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent("العب ZRO واكسب معايا")}`;
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.openTelegramLink) tg.openTelegramLink(url); else window.open(url, "_blank");
  };
  return (
    <div className="surface flex flex-col gap-3 rounded-[26px] p-4">
      <div className="flex items-center gap-2">
        <img src={GIFT} alt="" className="h-8 w-8" />
        <p className="flex-1 font-display text-base font-bold">ادعُ أصدقاءك</p>
        <span className="surface-strong rounded-full px-2.5 py-1 font-display text-sm font-bold">{count} صديق</span>
      </div>
      <button type="button" onClick={copy} className="pressable flex items-center gap-2 rounded-2xl bg-background/60 px-3 py-2 text-start">
        <p dir="ltr" className="min-w-0 flex-1 truncate text-right text-[13px] font-semibold">{link}</p>
        <Copy className="h-5 w-5 shrink-0 text-primary-glow" />
      </button>
      <button type="button" onClick={share} className="btn-glossy btn-invite pressable flex h-11 items-center justify-center gap-2 rounded-full font-display text-base font-bold">
        <Send className="h-4 w-4" /> ابعت الدعوة
      </button>
    </div>
  );
}
