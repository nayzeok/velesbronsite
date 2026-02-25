"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const figmaHeroBackground = "https://www.figma.com/api/mcp/asset/60c54a29-4bcc-4980-852b-b25d59719777";
const figmaPreviewCardBackground = "https://www.figma.com/api/mcp/asset/0cc1de12-e6e7-4b8b-bc1b-277f10898fa0";
const figmaPreviewCardModel = "https://www.figma.com/api/mcp/asset/657e6955-f498-415b-a0de-c7c0b1b9bb6b";
const figmaMobilePreviewCardModel = "https://www.figma.com/api/mcp/asset/3b809981-9952-42d2-919c-602578ecc9bd";
const figmaMobileHeaderLogo = "https://www.figma.com/api/mcp/asset/dd45ea25-f504-4c35-a74a-80ccec60b9e0";
const MOBILE_HERO_BOOT = {
  width: 660,
  height: 540,
  aspectRatio: "93 / 76",
  left: 65,
  top: 740,
  designWidth: 741,
} as const;
const MOBILE_HERO_HEADLINE = {
  left: 726,
  top: 169,
  width: 658,
  fontSize: 96,
  lineHeight: 90,
  designWidth: 741,
} as const;
const MOBILE_MODEL_LABEL = {
  left: 26,
  top: 440,
  width: 380,
  designWidth: 741,
} as const;
const MOBILE_BOTTOM_TEXT = {
  left: 32,
  bottom: 10,
  width: 232,
  fontSize: 18,
  lineHeight: 22,
} as const;
const MOBILE_LOGO_BLOCK = {
  panelWidth: 199,
  panelHeight: 108,
  panelTop: -25,
  panelOffsetX: -5,
  panelRadius: 10,
  logoWidth: 209,
  logoHeight: 69,
  logoTop: 30,
  designWidth: 741,
} as const;
const DESIGN_HEIGHT = 1000;

const heroThumbs = [
  {
    key: "146:20",
    image: "https://www.figma.com/api/mcp/asset/f6b599c0-0070-466c-88e2-937ee312b22c",
    frame: { left: 3, top: -11, width: 58, height: 77 },
    transform: "scaleY(-1) rotate(180deg)",
  },
  {
    key: "146:22",
    image: "https://www.figma.com/api/mcp/asset/7ddefd8e-e56f-4ef0-aaa6-705a339a8363",
    frame: { left: 3, top: -11, width: 58, height: 77 },
    transform: "scaleY(-1) rotate(180deg)",
  },
  {
    key: "146:24",
    image: "https://www.figma.com/api/mcp/asset/9c1f73ec-752c-49ba-8507-0f41e65fdd4c",
    frame: { left: 0, top: -22, width: 67, height: 90 },
  },
  {
    key: "146:26",
    image: "https://www.figma.com/api/mcp/asset/5ec81acf-7868-46a4-8e09-0b6c4020723e",
    frame: { left: 0, top: -11, width: 66, height: 88 },
  },
];
const MAIN_MENU_ITEMS = [
  { label: "Главная", href: "/" },
  { label: "Купить", href: "/buy" },
  { label: "Модели", href: "/models" },
  { label: "О нас", href: "#" },
] as const;

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const stageHeightFitScale = `min(1, calc(100dvh / ${DESIGN_HEIGHT}px))`;

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  return (
    <main className="figma-site-page overflow-x-hidden bg-[#e8e8e8] text-white">
      <section className="relative min-[1200px]:hidden">
        <div className="relative h-[100dvh] min-h-[860px] overflow-hidden">
          <img src={figmaHeroBackground} alt="" className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover" />
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.18)]" />

          <div className="absolute left-4 top-4 z-30 flex items-center gap-2.5">
            <button
              type="button"
              aria-label="Язык"
              className="flex size-10 items-center justify-center rounded-[10px] bg-gradient-to-b from-[#7f766f] to-[#635b50]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Корзина"
              className="flex size-10 items-center justify-center rounded-[10px] bg-gradient-to-b from-[#7f766f] to-[#635b50]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                <path d="M4 6h2l1.2 8.5a2 2 0 0 0 2 1.5h7.8a2 2 0 0 0 2-1.6L20 8H8" />
                <circle cx="10" cy="19" r="1.5" />
                <circle cx="17" cy="19" r="1.5" />
              </svg>
            </button>
          </div>

          <div className="absolute right-4 top-4 z-30">
            <button
              type="button"
              aria-label="Меню"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex size-10 items-center justify-center rounded-[10px] bg-gradient-to-b from-[#e7813f] to-[#fc6407]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>

          <div
            className={`absolute inset-0 z-40 bg-black/55 backdrop-blur-[1px] transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside
            className={`absolute right-0 top-0 z-50 h-full w-[304px] border-l border-white/15 bg-[linear-gradient(180deg,rgba(30,30,30,0.98)_0%,rgba(18,18,18,0.96)_100%)] shadow-[-20px_0_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-transform duration-300 ease-out ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            aria-hidden={!isMobileMenuOpen}
          >
            <div className="flex items-center justify-between px-5 pb-4 pt-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Меню</p>
                <p className="mt-0.5 text-[21px] text-white" style={{ fontFamily: "var(--font-druk-cyr), var(--font-oswald), sans-serif" }}>
                  VELESBRON
                </p>
              </div>
              <button
                type="button"
                aria-label="Закрыть меню"
                className="flex size-9 items-center justify-center rounded-[10px] bg-white/10 text-white transition-colors hover:bg-white/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="mx-5 h-px bg-white/10" />
            <nav className="px-4 py-3">
              {MAIN_MENU_ITEMS.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`mb-1 flex items-center justify-between rounded-[12px] px-3 py-3.5 text-[22px] transition-all duration-300 ${
                    isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                  } ${
                    index === 0 ? "bg-gradient-to-r from-[#e7813f] to-[#fc6407] text-white shadow-[0_10px_20px_rgba(252,100,7,0.22)]" : "text-white/92 hover:bg-white/10"
                  }`}
                  style={{
                    fontFamily: "Gilroy, var(--font-gilroy-light), var(--font-oswald), sans-serif",
                    fontWeight: 500,
                    transitionDelay: isMobileMenuOpen ? `${100 + index * 55}ms` : "0ms",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`size-2 rounded-full ${index === 0 ? "bg-white/90" : "bg-white/35"}`} />
                    {item.label}
                  </span>
                  <span className={`text-base ${index === 0 ? "text-white/95" : "text-white/45"}`}>›</span>
                </a>
              ))}
            </nav>
            <div className="absolute bottom-6 left-4 right-4 rounded-[12px] border border-white/10 bg-white/[0.04] px-4 py-3 text-[12px] leading-[1.35] text-white/60">
              Тактическая обувь из натуральных материалов
            </div>
          </aside>

          <div
            className="absolute left-1/2 z-30 bg-white"
            style={{
              top: `calc((100vw / ${MOBILE_LOGO_BLOCK.designWidth}) * ${MOBILE_LOGO_BLOCK.panelTop})`,
              marginLeft: `calc((100vw / ${MOBILE_LOGO_BLOCK.designWidth}) * ${MOBILE_LOGO_BLOCK.panelOffsetX})`,
              width: `calc((100vw / ${MOBILE_LOGO_BLOCK.designWidth}) * ${MOBILE_LOGO_BLOCK.panelWidth})`,
              height: `calc((100vw / ${MOBILE_LOGO_BLOCK.designWidth}) * ${MOBILE_LOGO_BLOCK.panelHeight})`,
              borderRadius: `calc((100vw / ${MOBILE_LOGO_BLOCK.designWidth}) * ${MOBILE_LOGO_BLOCK.panelRadius})`,
              transform: "translateX(-50%)",
            }}
          >
            <img
              src={figmaMobileHeaderLogo}
              alt="Velesbron"
              className="pointer-events-none absolute left-1/2 max-w-none object-cover"
              style={{
                top: `calc((100vw / ${MOBILE_LOGO_BLOCK.designWidth}) * ${MOBILE_LOGO_BLOCK.logoTop})`,
                width: `calc((100vw / ${MOBILE_LOGO_BLOCK.designWidth}) * ${MOBILE_LOGO_BLOCK.logoWidth})`,
                height: `calc((100vw / ${MOBILE_LOGO_BLOCK.designWidth}) * ${MOBILE_LOGO_BLOCK.logoHeight})`,
                transform: "translateX(-50%)",
              }}
            />
          </div>

          <h1
            className="absolute z-20 uppercase text-transparent"
            style={{
              left: `calc((100vw / ${MOBILE_HERO_HEADLINE.designWidth}) * ${MOBILE_HERO_HEADLINE.left})`,
              top: `calc((100vw / ${MOBILE_HERO_HEADLINE.designWidth}) * ${MOBILE_HERO_HEADLINE.top})`,
              width: `calc((100vw / ${MOBILE_HERO_HEADLINE.designWidth}) * ${MOBILE_HERO_HEADLINE.width})`,
              transform: "translateX(-100%)",
              textAlign: "right",
              fontFamily: "var(--font-druk-cyr), var(--font-oswald), sans-serif",
              fontSize: `calc((100vw / ${MOBILE_HERO_HEADLINE.designWidth}) * ${MOBILE_HERO_HEADLINE.fontSize})`,
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: `calc((100vw / ${MOBILE_HERO_HEADLINE.designWidth}) * ${MOBILE_HERO_HEADLINE.lineHeight})`,
              letterSpacing: "0.01em",
              backgroundImage: "linear-gradient(180deg, #FCFFFC 0%, #E7D1C7 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ТАКТИЧЕСКАЯ ОБУВЬ ИЗ НАТУРАЛЬНЫХ МАТЕРИАЛОВ
          </h1>

          <div
            className="absolute z-20"
            style={{
              left: `calc((100vw / ${MOBILE_MODEL_LABEL.designWidth}) * ${MOBILE_MODEL_LABEL.left})`,
              top: `calc((100vw / ${MOBILE_MODEL_LABEL.designWidth}) * ${MOBILE_MODEL_LABEL.top})`,
              width: `calc((100vw / ${MOBILE_MODEL_LABEL.designWidth}) * ${MOBILE_MODEL_LABEL.width})`,
            }}
          >
            <h2
              className="bg-clip-text uppercase text-transparent"
              style={{
                fontFamily: "var(--font-druk-cyr), var(--font-oswald), sans-serif",
                fontSize: 46,
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "normal",
                backgroundImage: "linear-gradient(180deg, #FCFFFC 0%, #E7D1C7 100%)",
              }}
            >
              МОДЕЛЬ &apos;2026
            </h2>

            <div className="mt-1.5 flex items-center">
              {heroThumbs.map((item, index) => (
                <div key={item.key} className={index === 0 ? "" : "-ml-1.5"}>
                  <div className="relative size-[44px] overflow-hidden rounded-full bg-[#f4f4f2]">
                    <img
                      src={item.image}
                      alt=""
                      className="pointer-events-none absolute max-w-none object-cover"
                      style={{
                        left: item.frame.left * 0.66,
                        top: item.frame.top * 0.66,
                        width: item.frame.width * 0.66,
                        height: item.frame.height * 0.66,
                        transform: item.transform,
                        transformOrigin: "center center",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p
              className="mt-2 w-[305px] text-white"
              style={{
                fontFamily: "Gilroy, var(--font-gilroy-light), var(--font-oswald), sans-serif",
                fontSize: 15,
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "22px",
              }}
            >
              Разработано для силовых структур и спортивного образа жизни
            </p>
          </div>

          <div
            className="pointer-events-none absolute z-20 overflow-hidden"
            style={{
              left: `calc((100vw / ${MOBILE_HERO_BOOT.designWidth}) * ${MOBILE_HERO_BOOT.left})`,
              top: `calc((100vw / ${MOBILE_HERO_BOOT.designWidth}) * ${MOBILE_HERO_BOOT.top})`,
              width: `calc((100vw / ${MOBILE_HERO_BOOT.designWidth}) * ${MOBILE_HERO_BOOT.width})`,
              height: `calc((100vw / ${MOBILE_HERO_BOOT.designWidth}) * ${MOBILE_HERO_BOOT.height})`,
              aspectRatio: MOBILE_HERO_BOOT.aspectRatio,
            }}
          >
            <img src="/images/pages/main-model-for-hero.png" alt="Тактическая обувь" className="h-full w-full object-cover" />
          </div>

          <div className="absolute z-20" style={{ left: MOBILE_BOTTOM_TEXT.left, bottom: MOBILE_BOTTOM_TEXT.bottom }}>
            <p
              className="text-[#c6c6c6]"
              style={{
                width: MOBILE_BOTTOM_TEXT.width,
                fontFamily: "Gilroy, var(--font-gilroy-light), var(--font-oswald), sans-serif",
                fontSize: MOBILE_BOTTOM_TEXT.fontSize,
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: `${MOBILE_BOTTOM_TEXT.lineHeight}px`,
              }}
            >
              <span className="block">
                <span className="text-white">Одна универсальная пара обуви,</span> которая
              </span>
              <span className="block">не подведет ни в походе, ни на службе,</span>
              <span className="block">ни в городе</span>
            </p>
            <Link
              href="/buy"
              className="mt-5 flex h-[64px] w-[190px] items-center justify-center rounded-[16px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[22px] font-medium text-white"
              style={{ fontFamily: "Gilroy, var(--font-gilroy-light), var(--font-oswald), sans-serif", fontWeight: 500 }}
            >
              Купить
            </Link>
          </div>

          <div className="absolute bottom-2.5 right-4 z-20 h-[170px] w-[133px] overflow-hidden rounded-[11px] bg-white">
            <img
              src={figmaPreviewCardBackground}
              alt=""
              className="pointer-events-none absolute max-w-none object-cover opacity-85"
              style={{ left: -52, top: -17, width: 288, height: 192 }}
            />
            <img
              src={figmaMobilePreviewCardModel}
              alt="Превью модели"
              className="pointer-events-none absolute max-w-none object-cover"
              style={{ left: 0, top: -10, width: 133, height: 177 }}
            />
          </div>

          <p className="absolute bottom-3 right-[164px] z-20 text-[18px] leading-[1.1] text-white">| 01/04 |</p>
          <div className="absolute bottom-[175px] right-[90px] z-20 flex items-center gap-[6px]">
            <span className="size-[8px] rounded-full bg-white" />
            <span className="size-[8px] rounded-full bg-white/45" />
            <span className="size-[8px] rounded-full bg-white/45" />
            <span className="size-[8px] rounded-full bg-white/45" />
          </div>
        </div>
      </section>

      <section
        className="figma-site-stage relative hidden h-[100dvh] overflow-hidden min-[1200px]:block"
        style={{ ["--figma-stage-height" as string]: "100dvh" }}
      >
        <div className="absolute inset-0">
          <img
            src={figmaHeroBackground}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 mx-auto h-[100dvh] w-full max-w-[1670px] overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-[1000px] origin-top"
            style={{
              transform: `scale(${stageHeightFitScale})`,
            }}
          >
        <div className="relative flex h-[1000px] w-full flex-col px-[clamp(24px,3.6vw,67px)] pb-0 pt-[18px]">
          <header className="relative h-[96px]">
            <nav className="flex items-center gap-6 pt-[9px]">
              {MAIN_MENU_ITEMS.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={index === 0 ? "rounded-[10px] bg-gradient-to-r from-[#8b7a71] to-[#756257] px-5 py-3 text-xs font-medium" : "text-xs font-medium text-white/95"}
                  style={{ fontFamily: "Gilroy, var(--font-gilroy-light), var(--font-oswald), sans-serif", fontWeight: 500 }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="absolute left-1/2 top-0 h-[86px] w-[175px] -translate-x-1/2 rounded-[10px] bg-white">
              <div className="absolute left-1/2 top-[13px] h-[55px] w-[167px] -translate-x-1/2">
                <Image
                  src="/images/pages/header-logo.png"
                  alt="Velesbron"
                  width={167}
                  height={55}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>

            <div className="absolute right-[clamp(16px,5.7vw,96px)] top-[22px] flex items-center gap-[10px]">
              <button
                type="button"
                aria-label="Язык"
                className="flex size-[42px] items-center justify-center rounded-[10px] bg-gradient-to-b from-[#7f766f] to-[#635b50]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Корзина"
                className="flex size-[42px] items-center justify-center rounded-[10px] bg-gradient-to-b from-[#7f766f] to-[#635b50]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                  <path d="M4 6h2l1.2 8.5a2 2 0 0 0 2 1.5h7.8a2 2 0 0 0 2-1.6L20 8H8" />
                  <circle cx="10" cy="19" r="1.5" />
                  <circle cx="17" cy="19" r="1.5" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Профиль"
                className="flex size-[42px] items-center justify-center rounded-[10px] bg-gradient-to-b from-[#e7813f] to-[#fc6407]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <circle cx="12" cy="8.2" r="3.2" />
                  <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
                </svg>
              </button>
            </div>
          </header>

          <div className="relative mt-[clamp(24px,6vh,74px)] flex flex-1">
            <div className="relative z-20 w-[clamp(320px,28vw,420px)]">
              <h2
                className="bg-clip-text text-[clamp(40px,3.4vw,55px)] font-medium uppercase leading-none text-transparent"
                style={{
                  fontFamily: "var(--font-druk-cyr), var(--font-oswald), sans-serif",
                  backgroundImage: "linear-gradient(180deg, #FCFFFC 0%, #E7D1C7 100%)",
                }}
              >
                МОДЕЛЬ &apos;2026
              </h2>

              <div className="mt-1 flex items-center">
                {heroThumbs.map((item) => (
                  <div key={item.key} className="-ml-[8px] first:ml-0">
                    <div className="relative size-[66px] overflow-hidden rounded-full bg-transparent">
                      <img
                        src={item.image}
                        alt=""
                        className="pointer-events-none absolute max-w-none object-cover"
                        style={{
                          left: item.frame.left,
                          top: item.frame.top,
                          width: item.frame.width,
                          height: item.frame.height,
                          transform: item.transform,
                          transformOrigin: "center center",
                          mixBlendMode: "multiply",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 w-[305px] text-[18px] leading-[26px] text-white">
                Разработано для силовых структур и спортивного образа жизни
              </p>
            </div>

            <div className="relative flex-1">
              <div className="absolute right-[clamp(0px,2vw,40px)] top-[clamp(10px,5vh,90px)] z-30 w-[clamp(460px,40vw,658px)] overflow-visible">
                <h1
                  className="flex flex-col items-end uppercase"
                  style={{
                    fontFamily: "var(--font-druk-cyr), var(--font-oswald), sans-serif",
                    textAlign: "right",
                    fontSize: "clamp(84px,6vw,115px)",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "0.94",
                    letterSpacing: "0.01em",
                    backgroundImage: "linear-gradient(180deg, #FCFFFC 0%, #E7D1C7 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <span className="whitespace-nowrap">ТАКТИЧЕСКАЯ ОБУВЬ</span>
                  <span className="whitespace-nowrap">ИЗ НАТУРАЛЬНЫХ</span>
                  <span className="whitespace-nowrap">МАТЕРИАЛОВ</span>
                </h1>
              </div>

              <p className="absolute bottom-[clamp(35px,2.4vh,34px)] right-[clamp(104px,13vw,226px)] z-20 text-[18px] leading-[26px] text-white">
                | 01/04 |
              </p>

              <div className="absolute bottom-[clamp(2px,0.8vh,10px)] right-[clamp(16px,4vw,55px)] z-20 flex items-center gap-[7px]">
                <span className="size-[9px] rounded-full bg-white" />
                <span className="size-[9px] rounded-full bg-white/45" />
                <span className="size-[9px] rounded-full bg-white/45" />
                <span className="size-[9px] rounded-full bg-white/45" />
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute left-[320px] top-[194px] z-20 h-[690px] w-[844px] overflow-visible">
            {/* left/top — сдвиг в пикселях, width — размер */}
            <img
              src="/images/pages/main-model-for-hero.png"
              alt="Тактическая обувь"
              className="pointer-events-none absolute max-w-none drop-shadow-[0_40px_80px_rgba(0,0,0,0.28)]"
              style={{ left: 60, top: -200, width: 750 }}
            />
          </div>

          <div className="absolute right-[clamp(0px,2vw,40px)] top-[676px] z-20 h-[293px] w-[230px] overflow-hidden rounded-[19px] bg-white">
            <div className="relative h-full w-full">
              <img
                src={figmaPreviewCardBackground}
                alt=""
                className="pointer-events-none absolute max-w-none object-cover opacity-85"
                style={{ left: -92, top: -30, width: 498, height: 332 }}
              />
              <img
                src={figmaPreviewCardModel}
                alt="Превью модели"
                className="pointer-events-none absolute max-w-none object-cover"
                style={{ left: 0, top: -17, width: 230, height: 306 }}
              />
            </div>
          </div>

          <div className="absolute bottom-[clamp(8px,1.1vh,16px)] left-[clamp(24px,3.1vw,52px)] z-20">
            <p className="w-[clamp(320px,24vw,398px)] text-[24px] font-medium leading-[33px] text-[#c6c6c6]">
              <span className="text-white">Одна универсальная пара обуви,</span> которая не подведет ни в походе, ни на службе, ни в городе
            </p>

            <Link
              href="/buy"
              className="mt-6 flex h-20 w-[248px] items-center justify-center rounded-[20px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[34px] font-medium text-white"
              style={{ fontFamily: "Gilroy, var(--font-gilroy-light), var(--font-oswald), sans-serif", fontWeight: 500 }}
            >
              Купить
            </Link>
          </div>
        </div>
          </div>
        </div>
      </section>
    </main>
  );
}
