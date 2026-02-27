 "use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";

type MenuKey = "home" | "brand" | "advantages" | "models" | "whereToBuy" | "media" | "contacts";
type HeaderTone = "dark" | "light";

type SiteHeaderProps = {
  activeItem?: MenuKey;
  tone?: HeaderTone;
  className?: string;
  style?: CSSProperties;
};

const HEADER_MENU_ITEMS: { key: MenuKey; label: string; href: string }[] = [
  { key: "home", label: "Главная", href: "/" },
  { key: "brand", label: "О бренде", href: "/brand" },
  { key: "advantages", label: "Преимущества", href: "/advantages" },
  { key: "models", label: "Модельный ряд", href: "/models" },
  { key: "whereToBuy", label: "Где купить", href: "/where-to-buy" },
  { key: "media", label: "Медиа", href: "/#media" },
  { key: "contacts", label: "Контакты", href: "/contacts" },
];

export default function SiteHeader({ activeItem, tone = "dark", className, style }: SiteHeaderProps) {
  const pathname = usePathname();
  const inactiveTextClass = tone === "light" ? "text-white/95" : "text-[#111]";

  return (
    <header
      className={`hidden min-[1200px]:block ${className ?? "absolute top-0 z-20 h-[96px] pt-[18px]"}`}
      style={
        style ?? {
          left: 0,
          width: "100%",
          paddingLeft: "clamp(24px, 3.6vw, 61px)",
          paddingRight: "clamp(24px, 3.6vw, 61px)",
        }
      }
    >
      <nav className="flex items-center gap-5">
        {HEADER_MENU_ITEMS.map((item) => {
          const isActiveByPath =
            (item.key === "home" && pathname === "/") ||
            (item.key === "brand" && pathname?.startsWith("/brand")) ||
            (item.key === "advantages" && pathname?.startsWith("/advantages")) ||
            (item.key === "models" && pathname?.startsWith("/models")) ||
            (item.key === "whereToBuy" && pathname?.startsWith("/where-to-buy")) ||
            (item.key === "contacts" && pathname?.startsWith("/contacts"));
          const isActive = item.key === activeItem || isActiveByPath;
          if (isActive) {
            return (
              <span
                key={item.key}
                className="rounded-[10px] bg-gradient-to-r from-[#8b7a71] to-[#756257] px-5 py-3 text-xs font-medium text-white"
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
              className={`text-xs font-medium ${inactiveTextClass}`}
              style={{ fontFamily: "var(--font-roboto-flex), sans-serif" }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute left-1/2 top-0 h-[166px] w-[345px] -translate-x-1/2 rounded-[10px]">
        <img
          src="/images/pages/velesbron_logo_countr.png"
          alt="Velesbron"
          className="absolute left-1/2 top-[13px] h-[105px] w-[327px] -translate-x-1/2 object-contain"
        />
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
