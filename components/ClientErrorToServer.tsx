"use client";

import { useEffect } from "react";

/**
 * Отправляет необработанные ошибки с клиента на сервер — в терминале появится лог.
 * Нужно для отладки падений на телефоне, когда консоль браузера недоступна.
 */
export default function ClientErrorToServer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const send = (payload: { message: string; stack?: string; source?: string }) => {
      fetch("/api/log-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          page: window.location.pathname || undefined,
        }),
      }).catch(() => {});
    };

    const onError = (event: ErrorEvent) => {
      send({
        message: event.message || "Unknown error",
        stack: event.error?.stack,
        source: "window.onerror",
      });
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const message =
        event.reason instanceof Error
          ? event.reason.message
          : String(event.reason);
      const stack = event.reason instanceof Error ? event.reason.stack : undefined;
      send({
        message: `Unhandled rejection: ${message}`,
        stack,
        source: "unhandledrejection",
      });
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}
