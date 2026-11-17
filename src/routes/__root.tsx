import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { initData } from "@/hooks/use-zro";
import { zroDraw, zroInvites, zroMe, zroSeason, zroTasks } from "@/lib/zro.functions";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { InlineNotices } from "@/lib/notify";
import BottomNav from "@/components/zro/BottomNav";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-extrabold">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">الصفحة دي مش موجودة.</p>
        <Link to="/" className="roll-button mt-6 inline-flex rounded-full px-6 py-2.5 font-display font-bold">
          ارجع للوحة
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-bold">حصلت مشكلة في التحميل</h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="roll-button mt-6 inline-flex rounded-full px-6 py-2.5 font-display font-bold"
        >
          حاول تاني
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
      },
      { name: "theme-color", content: "#0b0c1a" },
      { title: "ZRO" },
      { name: "description", content: "ارمي النرد، حرك قطعتك، واجمع ZRO." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@500;600;700;800&family=Rubik:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      { src: "https://telegram.org/js/telegram-web-app.js" },
      { src: "https://libtl.com/sdk.js", "data-zone": "12288175", "data-sdk": "show_12288175", async: true } as any,
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <InlineNotices />
      <TelegramChrome />
      <Outlet />
      <BottomNav />
    </QueryClientProvider>
  );
}

/** Full-screen Telegram app: Telegram's own back button replaces in-app back links. */
function TelegramChrome() {
  const { pathname } = useLocation();
  const router = useRouter();
  const qc = useQueryClient();
  // Warm every page's data once at app open so switching tabs is instant.
  useEffect(() => {
    const d = { data: { initData: initData() } };
    const pre = [
      ["zro-me", () => zroMe(d)], ["zro-tasks", () => zroTasks(d)], ["zro-invites", () => zroInvites(d)],
      ["zro-draw", () => zroDraw(d)], ["zro-season", () => zroSeason(d)],
    ] as const;
    for (const [k, fn] of pre) qc.prefetchQuery({ queryKey: [k], queryFn: fn as () => Promise<unknown> });
    for (const r of ["/", "/rewards", "/wallet", "/season", "/games", "/spin", "/store"]) router.preloadRoute({ to: r as any }).catch(() => {});
  }, [qc, router]);
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    tg?.ready?.();
    tg?.expand?.();
    tg?.disableVerticalSwipes?.();
    try { if (tg?.isVersionAtLeast?.("8.0")) tg.requestFullscreen?.(); } catch { /* older client */ }
    if (tg?.platform && tg.platform !== "unknown") document.documentElement.classList.add("tg-app");
  }, []);
  useEffect(() => {
    // First visit goes through the welcome screen, which also caches every image.
    if (pathname !== "/welcome" && !localStorage.getItem("zro_welcomed")) router.navigate({ to: "/welcome" });
  }, [pathname, router]);
  useEffect(() => {
    const bb = (window as any).Telegram?.WebApp?.BackButton;
    if (!bb) return;
    const back = () => (window.history.length > 1 ? router.history.back() : router.navigate({ to: "/" }));
    if (pathname === "/" || pathname === "/welcome") bb.hide(); else bb.show();
    bb.onClick(back);
    return () => bb.offClick(back);
  }, [pathname, router]);
  return null;
}
