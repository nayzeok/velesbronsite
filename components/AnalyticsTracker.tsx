"use client";

import { useEffect, useRef } from "react";

export function AnalyticsTracker() {
  const startRef = useRef<number>(Date.now());
  const sentRef = useRef(false);

  const getDevice = () => {
    const ua = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
    if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua)) return "mobile";
    return "desktop";
  };

  const sendPageView = (durationSeconds: number) => {
    if (sentRef.current) return;
    sentRef.current = true;
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    const title = typeof document !== "undefined" ? document.title : "";
    const device = getDevice();
    fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "page_view",
        payload: { path, title, durationSeconds, device },
      }),
    }).catch(() => {});
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname;
    if (path.startsWith("/admin") || path.startsWith("/keystatic")) return;
    startRef.current = Date.now();

    const onLeave = () => {
      const durationSeconds = Math.round((Date.now() - startRef.current) / 1000);
      sendPageView(durationSeconds);
    };

    const onVisibilityChange = () => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") onLeave();
    };

    window.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onLeave);
    window.addEventListener("beforeunload", onLeave);

    return () => {
      window.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onLeave);
      window.removeEventListener("beforeunload", onLeave);
    };
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest("a[data-analytics='marketplace']");
      if (!target) return;
      const a = target as HTMLAnchorElement;
      const id = a.dataset.marketplaceId ?? "";
      const name = a.dataset.marketplaceName ?? "";
      const platform = a.dataset.platform ?? undefined;
      const productId = a.dataset.productId ?? undefined;
      const productName = a.dataset.productName ?? undefined;
      const page = typeof window !== "undefined" ? window.location.pathname : undefined;

      fetch("/api/analytics/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "marketplace_click",
          payload: {
            marketplaceId: id,
            marketplaceName: name,
            platform,
            productId,
            productName,
            page,
            device: getDevice(),
          },
        }),
      }).catch(() => {});
    };

    document.documentElement.addEventListener("click", onClick, true);
    return () => document.documentElement.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
