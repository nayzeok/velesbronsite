"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const MOBILE_MENU_ITEMS = [
  { label: "Главная", href: "/" },
  { label: "О бренде", href: "/brand" },
  { label: "Конструкция", href: "/#advantages" },
  { label: "Модели", href: "/models" },
  { label: "Где купить", href: "/where-to-buy" },
  { label: "Медиа", href: "/media" },
  { label: "Контакты", href: "/contacts" },
] as const;

const LOGO_SRC = "/images_alt/pages/velesbron_logo.webp";

export default function MobileHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    menuButtonRef.current?.focus();
    setIsOpen(false);
  }, []);

  const scrollToTop = useCallback(() => {
    if (typeof document === "undefined") return;
    const scrollEl = document.querySelector<HTMLElement>(".figma-site-page");
    const isScrollable = scrollEl && scrollEl.scrollHeight > scrollEl.clientHeight;
    if (isScrollable && scrollEl) {
      scrollEl.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === "/") {
        e.preventDefault();
        scrollToTop();
      }
    },
    [pathname, scrollToTop]
  );

  const handleAdvantagesClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") {
      event.preventDefault();
      closeMenu();
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("pending-home-scroll", "advantages");
      }
      router.push("/");
      return;
    }
    const section = document.getElementById("advantages");
    if (!section) return;
    event.preventDefault();
    closeMenu();
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

  useEffect(() => {
    if (typeof document === "undefined" || !isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-[60] min-[1200px]:hidden"
        style={{
          paddingTop: "max(1rem, env(safe-area-inset-top, 0px))",
        }}
      >
        <div className="mx-3 flex h-14 items-center rounded-[22px] border border-[#ececec]/70 bg-white/70 px-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Мен"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(true)}
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-[10px] text-[#8d8d8d]"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <div className="flex flex-1 items-center justify-center px-2">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e7813f] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-[8px]"
              aria-label="VelesBron — на главную"
            >
              <img
                src={LOGO_SRC}
                alt="VelesBron"
                className="h-8 w-[140px] object-contain object-center"
              />
            </Link>
          </div>

          <div className="min-h-[44px] min-w-[44px] shrink-0" aria-hidden="true" />
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[70] bg-black/55 backdrop-blur-[1px] transition-opacity duration-300 min-[1200px]:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={closeMenu}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed left-0 top-0 z-[80] h-dvh w-[304px] border-r border-[#e5e5e5] bg-white shadow-[20px_0_40px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out min-[1200px]:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-[calc(100%+24px)]"
        }`}
        aria-hidden={!isOpen}
        style={{ willChange: isOpen ? "transform" : undefined }}
      >
        <div className="flex items-center justify-between px-5 pb-4 pt-5" style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top, 0px))" }}>
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                scrollToTop();
              }
              closeMenu();
            }}
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
            className="flex min-h-[62px] min-w-[62px] items-center justify-center text-[#111] transition-opacity hover:opacity-70 focus:outline-none"
            onClick={closeMenu}
          >
            <span className="flex size-[46px] items-center justify-center">
              <svg className="h-[21px] w-[21px]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </span>
          </button>
        </div>
        <div className="mx-5 h-px bg-[#e5e5e5]" />
        <nav className="px-4 py-3">
          {MOBILE_MENU_ITEMS.map((item, index) => {
            const isActive = item.href === "/" ? pathname === "/" : (pathname?.startsWith(item.href) ?? false);
            const isDisabled = item.label === "Медиа";
            const commonClass = `mb-1 flex items-center justify-between rounded-[12px] px-3 py-3.5 transition-all duration-300 ${
              isOpen ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
            } ${
              isDisabled
                ? "text-[#111]/35 cursor-default"
                : isActive
                ? "bg-gradient-to-r from-[#e7813f] to-[#fc6407] text-white shadow-[0_10px_20px_rgba(252,100,7,0.22)]"
                : "text-[#111] hover:bg-[#f5f5f5]"
            }`;
            const commonStyle = {
              fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
              fontWeight: 500,
              fontSize: 16.94,
              transitionDelay: isOpen ? `${100 + index * 55}ms` : "0ms",
            };
            if (isDisabled) {
              return (
                <span key={item.label} className={commonClass} style={commonStyle}>
                  <span>{item.label}</span>
                  <span className="text-[12px] text-[#111]/20">›</span>
                </span>
              );
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={item.label === "Конструкция" ? handleAdvantagesClick : closeMenu}
                className={commonClass}
                style={commonStyle}
              >
                <span>{item.label}</span>
                <span className={`text-[12px] ${isActive ? "text-white/95" : "text-[#111]/45"}`}>›</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
