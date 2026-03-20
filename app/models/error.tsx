"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ModelsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Отправляем ошибку на сервер — она выведется в терминал (удобно при отладке с телефона)
    fetch("/api/log-error", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        digest: error.digest,
        page: "/models",
      }),
    }).catch(() => {});
  }, [error]);

  return (
    <main className="figma-site-page flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#d9d9d9] px-4 py-12">
      <p
        className="text-center text-[18px] text-[#333]"
        style={{ fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif", fontWeight: 400 }}
      >
        Не удалось загрузить страницу «Модельный ряд».
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-[#f07426] px-5 py-2.5 text-white transition-colors hover:bg-[#e56a1a]"
          style={{ fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif", fontSize: 16, fontWeight: 400 }}
        >
          Попробовать снова
        </button>
        <Link
          href="/"
          className="rounded-xl border-2 border-[#e5e5e5] bg-white px-5 py-2.5 text-[#111] transition-colors hover:border-[#f07426]"
          style={{ fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif", fontSize: 16, fontWeight: 400 }}
        >
          На главную
        </Link>
      </div>
    </main>
  );
}
