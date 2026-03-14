 "use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";

/** Отступ от краёв — на 13" меньше, чтобы меню не заходило под лого */
const HEADER_EDGE_PADDING_LEFT = "clamp(16px, 2.2vw, 136px)";
const HEADER_EDGE_PADDING_RIGHT = "clamp(16px, 2.2vw, 106px)";
/** Зазор между колонкой лого и пунктами меню — на узких экранах меньше */
const LOGO_GAP = 48;

type MenuKey = "brand" | "advantages" | "models" | "whereToBuy" | "media" | "contacts";
type HeaderTone = "dark" | "light" | "lightBg";

type SiteHeaderProps = {
  activeItem?: MenuKey;
  tone?: HeaderTone;
  className?: string;
  style?: CSSProperties;
};

const LEFT_ITEMS: { key: MenuKey; label: string; href: string }[] = [
  { key: "brand", label: "О бренде", href: "/brand" },
  { key: "advantages", label: "Конструкция", href: "/#advantages" },
  { key: "models", label: "Модели", href: "/models" },
];
const RIGHT_ITEMS: { key: MenuKey; label: string; href: string }[] = [
  { key: "whereToBuy", label: "Где купить", href: "/where-to-buy" },
  { key: "media", label: "Медиа", href: "/media" },
  { key: "contacts", label: "Контакты", href: "/contacts" },
];

export default function SiteHeader({ activeItem, tone = "dark", className, style }: SiteHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isLight = tone === "light";
  const isLightBg = tone === "lightBg";
  const handleAdvantagesClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") {
      event.preventDefault();
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("pending-home-scroll", "advantages");
      }
      router.push("/");
      return;
    }
    const section = document.getElementById("advantages");
    if (!section) return;
    event.preventDefault();
    const scrollEl = document.querySelector<HTMLElement>(".figma-site-page");
    const isScrollable = scrollEl && scrollEl.scrollHeight > scrollEl.clientHeight;
    if (isScrollable && scrollEl) {
      scrollEl.scrollTo({
        top: section.getBoundingClientRect().top - scrollEl.getBoundingClientRect().top + scrollEl.scrollTop,
        behavior: "smooth",
      });
      return;
    }
    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY,
      behavior: "smooth",
    });
  };
  /** Общие отступы у всех пунктов — чтобы плашка активного не сдвигала сетку */
  const itemPadding = "px-3 py-2.5 rounded-[10px]";
  /** Активный пункт — плашка через CSS ::before; light = на тёмном фоне, lightBg = на белом фоне (тёмный текст) */
  const linkClass = (active: boolean) =>
    `nav-link-fill ${itemPadding} ${isLight ? "nav-link-fill--light" : ""} ${isLightBg ? "nav-link-fill--lightBg" : ""} ${active ? "nav-link-fill--active text-white bg-gradient-to-r from-[#8b7a71] to-[#756257]" : ""} ${active && isLight ? "!bg-white/10" : ""}`;

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
          gridTemplateColumns: `1fr ${LOGO_GAP}px min(340px, 26vw) ${LOGO_GAP}px 1fr`,
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
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={item.key === "advantages" ? handleAdvantagesClick : undefined}
                className={linkClass(isActive)}
                style={{
                  fontFamily: "var(--font-roboto-flex), sans-serif",
                  ...(isActive && !isLightBg && { color: "#fff" }),
                }}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="nav-link-fill__inner">
                  <span className="nav-link-fill__base">{item.label}</span>
                  <span className="nav-link-fill__hover" aria-hidden="true">
                    {item.label}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>

        <div aria-hidden="true" />

        <Link
          href="/"
          className="header-logo-link group relative flex justify-center min-h-[95px] w-full max-w-[306px]"
          aria-label="Velesbron — на главную"
        >
          {/* Белая плашка за лого: при наведении подсвечивается */}
          <div
            className="logo-plaque pointer-events-none absolute left-1/2 z-[5] h-[162px] w-full max-w-[306px] -translate-x-1/2 rounded-b-[12px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-200 group-hover:shadow-[0_10px_40px_rgba(231,129,63,0.5),0_0_0_3px_rgba(231,129,63,0.4)]"
            style={{ top: "-63px" }}
            aria-hidden="true"
          />
          <img
            src="/images/pages/velesbron_logo.png"
            alt=""
            className="relative z-10 h-[95px] w-full max-w-[252px] object-contain"
          />
        </Link>

        <div aria-hidden="true" />

        <nav className="flex justify-between items-center min-w-0" aria-label="Меню справа">
          {RIGHT_ITEMS.map((item) => {
            const isActiveByPath =
              (item.key === "whereToBuy" && pathname?.startsWith("/where-to-buy")) ||
              (item.key === "media" && pathname?.startsWith("/media")) ||
              (item.key === "contacts" && pathname?.startsWith("/contacts"));
            const isActive = item.key === activeItem || isActiveByPath;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={linkClass(isActive)}
                style={{
                  fontFamily: "var(--font-roboto-flex), sans-serif",
                  ...(isActive && !isLightBg && { color: "#fff" }),
                }}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="nav-link-fill__inner">
                  <span className="nav-link-fill__base">{item.label}</span>
                  <span className="nav-link-fill__hover" aria-hidden="true">
                    {item.label}
                  </span>
                </span>
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
