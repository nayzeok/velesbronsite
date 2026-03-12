"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const MOBILE_MENU_ITEMS = [
  { label: "Главная", href: "/" },
  { label: "О бренде", href: "/brand" },
  { label: "Конструкция", href: "/advantages" },
  { label: "Модели", href: "/models" },
  { label: "Где купить", href: "/where-to-buy" },
  { label: "Медиа", href: "/media" },
  { label: "Контакты", href: "/contacts" },
] as const;

const LOGO_SRC = "/images/pages/velesbron_logo.png";

export default function MobileHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    menuButtonRef.current?.focus();
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined" || !isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-[60] flex h-16 items-center justify-between bg-transparent px-4 min-[1200px]:hidden"
        style={{ paddingTop: "max(1rem, env(safe-area-inset-top, 0px))" }}
      >
        <div className="size-10 shrink-0" aria-hidden="true" />

        {pathname === "/" && (
          <Link
            href="/"
            className="header-logo-link group absolute left-1/2 top-0 flex h-16 w-[220px] -translate-x-1/2 items-center justify-center"
            aria-label="VelesBron — на главную"
          >
            {/* Белая плашка за лого: при наведении подсвечивается */}
            <div
              className="logo-plaque pointer-events-none absolute left-1/2 top-0 z-[5] h-[88px] w-[220px] -translate-x-1/2 rounded-b-[12px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-200 group-hover:shadow-[0_10px_40px_rgba(231,129,63,0.5),0_0_0_3px_rgba(231,129,63,0.4)]"
              style={{ top: "-28px" }}
              aria-hidden="true"
            />
            <img
              src={LOGO_SRC}
              alt="VelesBron"
              className="relative z-10 h-10 w-[180px] object-contain object-center"
            />
          </Link>
        )}

        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Меню"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
          className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-white"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </header>

      <div
        className={`fixed inset-0 z-[70] bg-black/55 backdrop-blur-[1px] transition-opacity duration-300 min-[1200px]:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={closeMenu}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed right-0 top-0 z-[80] h-dvh w-[304px] border-l border-[#e5e5e5] bg-white shadow-[-20px_0_40px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out min-[1200px]:hidden ${
          isOpen ? "translate-x-0" : "translate-x-[calc(100%+24px)]"
        }`}
        aria-hidden={!isOpen}
        style={{ willChange: isOpen ? "transform" : undefined }}
      >
        <div className="flex items-center justify-between px-5 pb-4 pt-5" style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top, 0px))" }}>
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e7813f] focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-[8px]"
            aria-label="VelesBron — на главную"
          >
            <img
              src={LOGO_SRC}
              alt="VelesBron"
              className="h-9 w-[160px] object-contain object-left"
            />
          </Link>
          <button
            type="button"
            aria-label="Закрыть меню"
            className="flex size-9 items-center justify-center rounded-[10px] bg-[#f0f0f0] text-[#111] transition-colors hover:bg-[#e5e5e5]"
            onClick={closeMenu}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="mx-5 h-px bg-[#e5e5e5]" />
        <nav className="px-4 py-3">
          {MOBILE_MENU_ITEMS.map((item, index) => {
            const isActive = item.href === "/" ? pathname === "/" : (pathname?.startsWith(item.href) ?? false);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`mb-1 flex items-center justify-between rounded-[12px] px-3 py-3.5 text-[22px] transition-all duration-300 ${
                  isOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                } ${
                  isActive
                    ? "bg-gradient-to-r from-[#e7813f] to-[#fc6407] text-white shadow-[0_10px_20px_rgba(252,100,7,0.22)]"
                    : "text-[#111] hover:bg-[#f5f5f5]"
                }`}
                style={{
                  fontFamily: "var(--font-roboto-flex), sans-serif",
                  fontWeight: 500,
                  transitionDelay: isOpen ? `${100 + index * 55}ms` : "0ms",
                }}
                onClick={closeMenu}
              >
                <span className="flex items-center gap-2.5">
                  <span className={`size-2 rounded-full ${isActive ? "bg-white/90" : "bg-[#111]/25"}`} />
                  {item.label}
                </span>
                <span className={`text-base ${isActive ? "text-white/95" : "text-[#111]/45"}`}>›</span>
              </Link>
            );
          })}
        </nav>
        <div
          className="absolute bottom-6 left-4 right-4 rounded-[12px] border border-[#e5e5e5] bg-[#f5f5f5] px-4 py-3 text-[12px] leading-[1.35] text-[#666]"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))" }}
        >
          Тактическая обувь из натуральных материалов
        </div>
      </aside>
    </>
  );
}
