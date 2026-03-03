 "use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";

/** Отступ от левого края экрана: min (px), vw, max (px) */
const HEADER_EDGE_PADDING_LEFT = "clamp(138px, 9.5vw, 136px)";
/** Отступ от правого края экрана: min (px), vw, max (px) */
const HEADER_EDGE_PADDING_RIGHT = "clamp(108px, 9.5vw, 106px)";
/** Отступ от лого до пунктов меню (слева и справа), px */
const LOGO_GAP = 100;

type MenuKey = "brand" | "advantages" | "models" | "whereToBuy" | "media" | "contacts";
type HeaderTone = "dark" | "light";

type SiteHeaderProps = {
  activeItem?: MenuKey;
  tone?: HeaderTone;
  className?: string;
  style?: CSSProperties;
};

const LEFT_ITEMS: { key: MenuKey; label: string; href: string }[] = [
  { key: "brand", label: "О бренде", href: "/brand" },
  { key: "advantages", label: "Преимущества", href: "/advantages" },
  { key: "models", label: "Модельный ряд", href: "/models" },
];
const RIGHT_ITEMS: { key: MenuKey; label: string; href: string }[] = [
  { key: "whereToBuy", label: "Где купить", href: "/where-to-buy" },
  { key: "media", label: "Медиа", href: "/media" },
  { key: "contacts", label: "Контакты", href: "/contacts" },
];

export default function SiteHeader({ activeItem, tone = "dark", className, style }: SiteHeaderProps) {
  const pathname = usePathname();
  const inactiveTextClass = tone === "light" ? "text-white/95" : "text-[#111]";

  return (
    <header
      className={`hidden min-[1200px]:block ${className ?? "absolute top-0 z-20 h-[96px]"}`}
      style={style ?? { left: 0, width: "100%" }}
    >
      <div
        className="relative grid w-full items-center"
        style={{
          paddingLeft: HEADER_EDGE_PADDING_LEFT,
          paddingRight: HEADER_EDGE_PADDING_RIGHT,
          gridTemplateColumns: `1fr ${LOGO_GAP}px 280px ${LOGO_GAP}px 1fr`,
          gap: "0",
        }}
      >
        <nav className="flex justify-between items-center min-w-0" aria-label="Меню слева">
          {LEFT_ITEMS.map((item) => {
            const isActiveByPath =
              (item.key === "brand" && pathname?.startsWith("/brand")) ||
              (item.key === "advantages" && pathname?.startsWith("/advantages")) ||
              (item.key === "models" && pathname?.startsWith("/models"));
            const isActive = item.key === activeItem || isActiveByPath;
            if (isActive) {
              return (
                <span
                  key={item.key}
                  className="rounded-[10px] bg-gradient-to-r from-[#8b7a71] to-[#756257] px-5 py-3 text-[24px] font-medium text-white whitespace-nowrap"
                  style={{ fontFamily: "var(--font-roboto-flex), sans-serif" }}
                >
                  {item.label}
                </span>
              );
            }
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`text-[24px] font-medium whitespace-nowrap ${inactiveTextClass}`}
                style={{ fontFamily: "var(--font-roboto-flex), sans-serif" }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div aria-hidden="true" />

        <div className="relative flex justify-center">
          {/* Белая плашка за лого: верх уходит за край экрана */}
          <div
            className="absolute left-1/2 z-[5] h-[180px] w-[320px] -translate-x-1/2 rounded-b-[12px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            style={{ top: "-70px" }}
            aria-hidden="true"
          />
          <Link
            href="/"
            className="relative z-10 flex h-[105px] w-[280px] items-center justify-center rounded-[10px]"
            aria-label="Velesbron — на главную"
          >
            <img
              src="/images/pages/velesbron_logo.png"
              alt=""
              className="h-[105px] w-[280px] object-contain"
            />
          </Link>
        </div>

        <div aria-hidden="true" />

        <nav className="flex justify-between items-center min-w-0" aria-label="Меню справа">
          {RIGHT_ITEMS.map((item) => {
            const isActiveByPath =
              (item.key === "whereToBuy" && pathname?.startsWith("/where-to-buy")) ||
              (item.key === "media" && pathname?.startsWith("/media")) ||
              (item.key === "contacts" && pathname?.startsWith("/contacts"));
            const isActive = item.key === activeItem || isActiveByPath;
            if (isActive) {
              return (
                <span
                  key={item.key}
                  className="rounded-[10px] bg-gradient-to-r from-[#8b7a71] to-[#756257] px-5 py-3 text-[24px] font-medium text-white whitespace-nowrap"
                  style={{ fontFamily: "var(--font-roboto-flex), sans-serif" }}
                >
                  {item.label}
                </span>
              );
            }
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`text-[24px] font-medium whitespace-nowrap ${inactiveTextClass}`}
                style={{ fontFamily: "var(--font-roboto-flex), sans-serif" }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/*<div className="absolute top-[22px] flex items-center gap-[10px]" style={{ right: "clamp(24px, 5.7vw, 96px)" }}>
        <button className="flex size-[42px] items-center justify-center rounded-[10px] bg-gradient-to-b from-[#7f766f] to-[#635b50] text-white">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
          </svg>
        </button>
        <button className="flex size-[42px] items-center justify-center rounded-[10px] bg-gradient-to-b from-[#7f766f] to-[#635b50] text-white">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
            <path d="M4 6h2l1.2 8.5a2 2 0 0 0 2 1.5h7.8a2 2 0 0 0 2-1.6L20 8H8" />
            <circle cx="10" cy="19" r="1.5" />
            <circle cx="17" cy="19" r="1.5" />
          </svg>
        </button>
        <button className="flex size-[42px] items-center justify-center rounded-[10px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-white">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <circle cx="12" cy="8.2" r="3.2" />
            <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
          </svg>
        </button>
      </div>*/}
    </header>
  );
}
