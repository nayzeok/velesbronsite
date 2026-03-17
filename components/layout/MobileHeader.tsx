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

const MOBILE_PAGE_TITLES: { match: (pathname: string | null) => boolean; title: string }[] = [
  { match: (pathname) => pathname === "/", title: "ГЛАВНАЯ" },
  { match: (pathname) => pathname?.startsWith("/brand") ?? false, title: "О БРЕНДЕ" },
  { match: (pathname) => pathname?.startsWith("/advantages") ?? false, title: "КОНСТРУКЦИЯ" },
  { match: (pathname) => pathname?.startsWith("/models") ?? false, title: "МОДЕЛИ" },
  { match: (pathname) => pathname?.startsWith("/where-to-buy") ?? false, title: "ГДЕ КУПИТЬ" },
  { match: (pathname) => pathname?.startsWith("/media") ?? false, title: "МЕДИА" },
  { match: (pathname) => pathname?.startsWith("/contacts") ?? false, title: "КОНТАКТЫ" },
];

const LOGO_SRC = "/images/pages/velesbron_logo.png";

const SCROLL_THRESHOLD_PX = 60;
const SCROLL_DIRECTION_THRESHOLD_PX = 5;

export default function MobileHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuButtonVisible, setIsMenuButtonVisible] = useState(true);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const closeMenu = useCallback(() => {
    menuButtonRef.current?.focus();
    setIsOpen(false);
  }, []);

  const currentPageTitle =
    MOBILE_PAGE_TITLES.find((item) => item.match(pathname))?.title ?? "VELESBRON";

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    let teardown: (() => void) | null = null;
    const timeoutId = window.setTimeout(() => {
      const scrollEl = document.querySelector<HTMLElement>(".figma-site-page");
      const isScrollable = scrollEl && scrollEl.scrollHeight > scrollEl.clientHeight;
      const target: HTMLElement | Window = isScrollable ? scrollEl! : window;
      const getScrollY = () =>
        target === window ? window.scrollY : (target as HTMLElement).scrollTop;

      lastScrollY.current = getScrollY();

      const updateVisibility = () => {
        const y = getScrollY();
        const delta = y - lastScrollY.current;
        if (y <= SCROLL_THRESHOLD_PX) {
          setIsMenuButtonVisible(true);
        } else if (delta > SCROLL_DIRECTION_THRESHOLD_PX) {
          setIsMenuButtonVisible(false);
        } else if (delta < -SCROLL_DIRECTION_THRESHOLD_PX) {
          setIsMenuButtonVisible(true);
        }
        lastScrollY.current = y;
        ticking.current = false;
      };
      const onScroll = () => {
        if (!ticking.current) {
          ticking.current = true;
          requestAnimationFrame(updateVisibility);
        }
      };
      target.addEventListener("scroll", onScroll, { passive: true });
      teardown = () => target.removeEventListener("scroll", onScroll);
    }, 150);
    return () => {
      window.clearTimeout(timeoutId);
      teardown?.();
    };
  }, [pathname]);

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-[60] min-[1200px]:hidden transition-transform duration-300 ease-out"
        style={{
          paddingTop: "max(1rem, env(safe-area-inset-top, 0px))",
          transform: isMenuButtonVisible ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <div className="mx-3 flex h-14 items-center rounded-[22px] border border-[#ececec] bg-white/78 px-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-sm">
          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Меню"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(true)}
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-[10px] text-[#8d8d8d]"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <div className="flex-1 px-2 text-center">
            {pathname === "/" ? (
              <img
                src={LOGO_SRC}
                alt="VelesBron"
                className="mx-auto h-8 w-[140px] object-contain object-center"
              />
            ) : (
              <span
                className="block truncate uppercase text-[#111]"
                style={{
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}
              >
                {currentPageTitle}
              </span>
            )}
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
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={item.label === "Конструкция" ? handleAdvantagesClick : closeMenu}
                className={`mb-1 flex items-center justify-between rounded-[12px] px-3 py-3.5 text-[22px] transition-all duration-300 ${
                  isOpen ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
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
              >
                <span>{item.label}</span>
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
