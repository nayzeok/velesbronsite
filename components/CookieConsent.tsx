"use client";

import { useEffect, useState } from "react";

const COOKIE_NAME = "velesbron_cookie_consent";
const COOKIE_MAX_AGE_DAYS = 365;

function getConsent(): string | null {
  if (typeof document === "undefined") return null;
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];
  return value === "accepted" || value === "declined" ? value : null;
}

function setChoice(value: "accepted" | "declined") {
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE_DAYS * 24 * 60 * 60}; SameSite=Lax`;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (getConsent() === null) setVisible(true);
  }, []);

  const accept = () => {
    setChoice("accepted");
    setVisible(false);
  };

  const decline = () => {
    setChoice("declined");
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <div
      className="fixed z-[100] w-[min(380px,calc(100vw-2rem))] animate-cookie-in overflow-hidden rounded-xl border border-[#e5e5e5] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom))",
        left: "max(1rem, env(safe-area-inset-left))",
        fontFamily: "var(--font-roboto-flex), sans-serif",
        borderLeft: "4px solid #e7813f",
      }}
      role="dialog"
      aria-label="Уведомление об использовании cookie"
    >
      {/* Фишка: уголок-метка «Cookie» */}
      <div
        className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-lg px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white"
        style={{ background: "linear-gradient(135deg, #e7813f 0%, #d96a2a 100%)" }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Cookie
      </div>

      <div className="p-5 pt-9">
        <p className="text-[14px] leading-[1.5] text-[#111]">
          Мы используем cookie для работы сайта и его улучшения. Вы можете принять или отказаться.
        </p>
        <p className="mt-2 text-[13px] text-[#666]">
          <a
            href="/brand"
            className="text-[#c45a1f] underline underline-offset-2 transition-colors hover:text-[#a04a1a]"
          >
            Политика конфиденциальности
          </a>
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={accept}
            className="rounded-lg px-4 py-2.5 text-[14px] font-medium text-white transition-all hover:opacity-95 hover:shadow-md"
            style={{
              background: "linear-gradient(180deg, #e7813f 0%, #fc6407 100%)",
              boxShadow: "0 2px 10px rgba(231, 129, 63, 0.35)",
            }}
          >
            Принять
          </button>
          <button
            type="button"
            onClick={decline}
            className="rounded-lg border border-[#ccc] bg-white px-4 py-2.5 text-[14px] font-medium text-[#111] transition-colors hover:border-[#999] hover:bg-[#f5f5f5]"
          >
            Отказаться
          </button>
        </div>
      </div>
    </div>
  );
}
