"use client";

import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";

const heroBackground = "/images/pages/hero-background.png";
const DESIGN_HEIGHT = 1000;

export default function Home() {
  const stageHeightFitScale = `min(1, calc(100dvh / ${DESIGN_HEIGHT}px))`;

  return (
    <main className="figma-site-page overflow-x-hidden bg-[#e8e8e8] text-white">
      <section className="relative min-[1200px]:hidden">
        <div
          className="relative overflow-hidden"
          style={{
            minHeight: "max(100dvh, 720px)",
            paddingTop: "calc(4rem + env(safe-area-inset-top, 0px))",
            paddingLeft: "env(safe-area-inset-left, 20px)",
            paddingRight: "env(safe-area-inset-right, 20px)",
            paddingBottom: "env(safe-area-inset-bottom, 24px)",
          }}
        >
          {/* Фон */}
          <div
            className="absolute left-0 right-0 bottom-0 z-0"
            style={{ top: "calc(-4rem - env(safe-area-inset-top, 0px))" }}
          >
            <img src={heroBackground} alt="" className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover" />
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.18)]" />
          </div>

          {/* Левый блок: заголовок и текст */}
          <div className="relative z-20 max-w-[calc(100vw-40px)]">
            <h1
              className="uppercase leading-tight text-white"
              style={{
                fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                fontSize: "clamp(24px, 6.5vw, 32px)",
                fontWeight: 700,
                letterSpacing: "0.02em",
                lineHeight: 1.15,
              }}
            >
              БОТИНКИ ПОВЫШЕННОЙ НАДЁЖНОСТИ
            </h1>
            <p
              className="mt-3 text-white/95"
              style={{
                fontFamily: "var(--font-roboto-flex), sans-serif",
                fontSize: "clamp(14px, 3.8vw, 16px)",
                lineHeight: 1.45,
              }}
            >
              Треккингово-тактическая обувь из натуральных материалов для города, работы и активной эксплуатации.
            </p>
            <Link
              href="/models"
              className="mt-4 inline-flex h-12 min-w-[180px] items-center justify-center rounded-[12px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] px-5 text-[16px] font-medium text-white"
              style={{ fontFamily: "var(--font-roboto-flex), sans-serif", fontWeight: 500 }}
            >
              Изучить модель
            </Link>

            <h2
              className="mt-6 uppercase text-white"
              style={{
                fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                fontSize: "clamp(18px, 4.5vw, 22px)",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              НОВАЯ МОДЕЛЬ VELESBRON
            </h2>
            <p
              className="mt-1.5 text-white/90"
              style={{
                fontFamily: "var(--font-roboto-flex), sans-serif",
                fontSize: "clamp(13px, 3.5vw, 15px)",
                lineHeight: 1.45,
              }}
            >
              Усиленная конструкция, гибридная подошва и современные материалы обеспечивают защиту, устойчивость и комфорт на дистанции.
            </p>

            <p className="mt-5 font-bold text-white" style={{ fontFamily: "var(--font-roboto-flex), sans-serif", fontSize: 15 }}>
              Преимущества
            </p>
            <div className="mt-2 flex flex-col gap-2">
              {["Антипрокольная защита", "Мембрана VELTEX", "Пожизненная гарантия"].map((label) => (
                <span key={label} className="text-white" style={{ fontFamily: "var(--font-roboto-flex), sans-serif", fontSize: 14 }}>
                  • {label}
                </span>
              ))}
            </div>
            <p className="mt-3 text-white/80" style={{ fontFamily: "var(--font-roboto-flex), sans-serif", fontSize: 13 }}>
              Для города, работы и сложного рельефа
            </p>
          </div>

          {/* Ботинок */}
          <div
            className="pointer-events-none absolute z-10 overflow-hidden"
            style={{
              left: "50%",
              top: "min(52vw, 380px)",
              width: "min(75vw, 340px)",
              transform: "translateX(-45%)",
              aspectRatio: "93 / 76",
            }}
          >
            <img src="/images/pages/main-model-for-hero.png" alt="Тактическая обувь" className="h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]" />
          </div>

          {/* Кнопка Купить внизу */}
          <div
            className="absolute bottom-0 left-0 right-0 z-20 px-5 pb-[max(24px,env(safe-area-inset-bottom))]"
            style={{ paddingLeft: "max(20px, env(safe-area-inset-left))" }}
          >
            <Link
              href="/where-to-buy"
              className="flex h-14 w-full max-w-[200px] items-center justify-center rounded-[14px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[18px] font-medium text-white"
              style={{ fontFamily: "var(--font-roboto-flex), sans-serif", fontWeight: 500 }}
            >
              Купить
            </Link>
          </div>
        </div>
      </section>

      <section
        className="figma-site-stage relative hidden h-[100dvh] overflow-hidden min-[1200px]:block"
        style={{ ["--figma-stage-height" as string]: "100dvh" }}
      >
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 mx-auto h-[100dvh] w-full max-w-[1670px] overflow-hidden">
          <SiteHeader
            tone="light"
            className="absolute left-0 right-0 top-0 z-20 h-[96px] w-full"
          />
          <div
            className="absolute inset-x-0 top-0 h-[1000px] origin-top"
            style={{
              transform: `scale(${stageHeightFitScale})`,
            }}
          >
            <div className="relative flex h-[1000px] w-full flex-col px-[clamp(28px,3.5vw,56px)] pb-0 pt-[18px]">
              <div className="h-[96px] shrink-0" aria-hidden="true" />

              {/* Левый блок: заголовок, описание, кнопка, новая модель, преимущества */}
              <div
                className="relative z-30 flex flex-col"
                style={{
                  marginTop: "clamp(24px, 5vh, 48px)",
                  maxWidth: 480,
                }}
              >
                <h1
                  className="uppercase leading-tight text-white"
                  style={{
                    fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                    fontSize: "clamp(32px, 3.2vw, 44px)",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  БОТИНКИ ПОВЫШЕННОЙ НАДЁЖНОСТИ
                </h1>
                <p
                  className="mt-4 text-white/95"
                  style={{
                    fontFamily: "var(--font-roboto-flex), sans-serif",
                    fontSize: "clamp(16px, 1.1vw, 18px)",
                    fontWeight: 400,
                    lineHeight: 1.45,
                  }}
                >
                  Треккингово-тактическая обувь из натуральных материалов для города, работы и активной эксплуатации.
                </p>
                <Link
                  href="/models"
                  className="mt-6 flex h-14 w-[220px] shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[18px] font-medium text-white"
                  style={{ fontFamily: "var(--font-roboto-flex), sans-serif", fontWeight: 500 }}
                >
                  Изучить модель
                </Link>

                <h2
                  className="mt-10 uppercase text-white"
                  style={{
                    fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                    fontSize: "clamp(22px, 1.8vw, 28px)",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}
                >
                  НОВАЯ МОДЕЛЬ VELESBRON
                </h2>
                <p
                  className="mt-2 text-white/90"
                  style={{
                    fontFamily: "var(--font-roboto-flex), sans-serif",
                    fontSize: "clamp(15px, 1vw, 17px)",
                    fontWeight: 400,
                    lineHeight: 1.45,
                  }}
                >
                  Усиленная конструкция, гибридная подошва и современные материалы обеспечивают защиту, устойчивость и комфорт на дистанции.
                </p>

                {/* Преимущества */}
                <p
                  className="mt-8 font-bold text-white"
                  style={{
                    fontFamily: "var(--font-roboto-flex), sans-serif",
                    fontSize: "clamp(16px, 1.1vw, 18px)",
                  }}
                >
                  Преимущества
                </p>
                <div className="mt-3 flex flex-wrap gap-x-8 gap-y-4">
                  {[
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 text-white" aria-hidden>
                          <path d="M12 2L3 7v10c0 5.55 3.84 7.74 9 10 5.16-2.26 9-4.45 9-10V7l-9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ),
                      label: "Антипрокольная защита",
                    },
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 text-white" aria-hidden>
                          <path d="M12 3v2M12 19v2M5 12H3M21 12h-2M7.34 7.34l-1.42-1.42M18.08 18.08l-1.42-1.42M7.34 16.66l-1.42 1.42M18.08 5.92l-1.42 1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M8 12c0-1.5.5-2.8 1.4-3.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      ),
                      label: "Мембрана VELTEX",
                    },
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 text-white" aria-hidden>
                          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 11-2.12-2.12L17.3 7.7l-2.6-2.6a1 1 0 00-1.4 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M12 12l-2 2-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ),
                      label: "Пожизненная гарантия",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      {item.icon}
                      <span className="text-white" style={{ fontFamily: "var(--font-roboto-flex), sans-serif", fontSize: 15, fontWeight: 500 }}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                <p
                  className="mt-4 text-white/80"
                  style={{
                    fontFamily: "var(--font-roboto-flex), sans-serif",
                    fontSize: "clamp(14px, 0.95vw, 16px)",
                    fontWeight: 400,
                  }}
                >
                  Для города, работы и сложного рельефа
                </p>
              </div>

              {/* Ботинок справа */}
              <div className="pointer-events-none absolute left-[320px] top-[120px] z-20 h-[700px] w-[860px] overflow-visible">
                <img
                  src="/images/pages/main-model-for-hero.png"
                  alt="Тактическая обувь"
                  className="pointer-events-none absolute max-w-none drop-shadow-[0_40px_80px_rgba(0,0,0,0.28)]"
                  style={{ left: 60, top: -180, width: 750 }}
                />
              </div>

              {/* Кнопка Купить справа внизу */}
              <div className="absolute bottom-[clamp(80px,8vh,120px)] right-0 z-20 flex flex-col items-end">
                <Link
                  href="/where-to-buy"
                  className="flex h-16 w-[220px] shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[22px] font-medium text-white"
                  style={{ fontFamily: "var(--font-roboto-flex), sans-serif", fontWeight: 500 }}
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
