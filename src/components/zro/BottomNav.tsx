import { Link, useRouterState } from "@tanstack/react-router";
import { NAV_ITEMS } from "@/lib/zro-assets";

export default function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="pb-tg-safe pointer-events-none fixed inset-x-0 bottom-0 z-[400000] px-4">
      <div className="surface-strong pointer-events-auto mx-auto flex max-w-[430px] items-stretch justify-between rounded-[26px] px-1.5 py-1.5">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="pressable flex flex-1 flex-col items-center gap-0.5"
            >
              <img
                src={item.icon}
                alt=""
                className={`h-8 w-8 object-contain transition-transform ${active ? "scale-110" : "opacity-90"}`}
              />
              <span className={`font-display text-[10px] leading-none ${active ? "font-bold text-foreground" : "text-muted-foreground"}`}>
                {item.label}
              </span>
              <span className={`h-[3px] w-2 rounded-full ${active ? "bg-accent" : "bg-transparent"}`} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
