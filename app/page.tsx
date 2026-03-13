"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AdvantagesContent } from "@/app/advantages/page";
import SiteHeader from "@/components/layout/SiteHeader";

const heroBackgroundDesktop = "/images/pages/2.2.png";
const heroBackgroundMobile = "/images/pages/hero-background.png";
const DESIGN_HEIGHT = 1000;

/** Эффекты поверх фона hero (как в Figma): затемнение + градиенты. Подстрой под node 260-3. */
const HERO_BG_EFFECTS = {
  /** Общее затемнение поверх картинки (0–1) — сделаем светлее */
  overlayOpacity: 0.08,
  /** Градиент сверху: лёгкое затемнение для читаемости заголовка */
  topGradient: "linear-gradient(180deg, rgba(0,0,0,0.22) 0%, transparent 45%)",
  /** Градиент снизу: лёгкое затемнение к низу */
  bottomGradient: "linear-gradient(0deg, rgba(0,0,0,0.26) 0%, transparent 50%)",
  /** Виньетка по краям (опционально, тоже помягче) */
  vignette: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.18) 100%)",
  /** Включить виньетку */
  vignetteOn: true,
};

/** Ботинок в hero: мобильная версия — привязка к контейнеру в %, чтобы не прыгал относительно подиума на фоне */
const HERO_BOOT_MOBILE = {
  leftPct: 50,
  translateXPct: -50,
  /** Позиция сверху в % высоты контейнера — совпадает с масштабированием фона, ботинок стабильно на подиуме */
  topPct: 44,
  /** Ширина картинки: clamp(min, vw, max) — на узких экранах уже */
  widthCss: "clamp(260px, 82vw, 340px)",
  /** Высота по aspect 93/76 — в разметке через aspect-ratio */
};
/** Карусель: отступ сверху в % от контейнера (под ботинком; запас, чтобы не налезала на ботинок на узких экранах) */
const MOBILE_CAROUSEL_TOP_PCT = 78;

/** Иконки преимуществ на главной: картинки вместо векторной графики */
const HERO_ADVANTAGES = [
  { label: "Антипрокольная защита", icon: "/images/models/ui/13.png" },
  { label: "Мембрана VELTEX™", icon: "/images/models/ui/14.png" },
  { label: "Пожизненная гарантия", icon: "/images/models/ui/4ico.png" },
];

/** Ботинок в hero: десктоп — позиция в % от сцены, чтобы не прыгал относительно подиума на фоне */
const HERO_BOOT_DESKTOP = {
  /** Позиция контейнера: left (clamp или %, от ширины экрана) */
  containerLeft: "clamp(140px, 22vw, 320px)",
  /** Позиция контейнера: top в % от высоты сцены (1000px) — стабильно на подиуме */
  containerTopPct: 5,
  /** Смещение картинки внутри контейнера, px */
  imgOffsetX: 450,
  imgOffsetY: 300,
  /** Ширина картинки ботинка — адаптивно при сужении */
  width: "clamp(380px, 36vw, 550px)",
};

const MOBILE_CARD_WIDTH = 260;
const MOBILE_CARD_GAP = 56;
const MOBILE_SET_WIDTH = HERO_ADVANTAGES.length * MOBILE_CARD_WIDTH + (HERO_ADVANTAGES.length - 1) * MOBILE_CARD_GAP;
/** Расстояние между карточками в карусели (px) */
const MOBILE_CAROUSEL_GAP = 16;
/** Запас по краям окна карусели, чтобы кольцо/тень подсветки не обрезались (px с каждой стороны) */
const MOBILE_CAROUSEL_RING_PAD = 14;
/** Запас сверху/снизу окна карусели (px), чтобы подсветка не обрезалась */
const MOBILE_CAROUSEL_VERTICAL_PAD = 18;
const MOBILE_CAROUSEL_SLOT = MOBILE_CARD_WIDTH + MOBILE_CAROUSEL_GAP;
const MOBILE_CAROUSEL_TRACK_WIDTH = HERO_ADVANTAGES.length * 2 * MOBILE_CARD_WIDTH + (HERO_ADVANTAGES.length * 2 - 1) * MOBILE_CAROUSEL_GAP;
/** Длительность показа одной карточки (мс), затем смена на следующую */
const MOBILE_CAROUSEL_HOLD_MS = 2500;
/** Длительность анимации сдвига к следующей карточке (мс) */
const MOBILE_CAROUSEL_TRANSITION_MS = 800;

export default function Home() {
    const stageHeightFitScale = `min(1, calc(100dvh / ${DESIGN_HEIGHT}px))`;
    const mobileCarouselTrackRef = useRef<HTMLDivElement>(null);
    const secondScreenRef = useRef<HTMLElement>(null);
    const [mobileCarouselActiveIndex, setMobileCarouselActiveIndex] = useState(0);
    const [carouselTransitionEnabled, setCarouselTransitionEnabled] = useState(true);

    useEffect(() => {
        const t = setInterval(() => {
            setMobileCarouselActiveIndex((prev) => {
                const next = (prev + 1) % (HERO_ADVANTAGES.length * 2);
                if (next === 0) setCarouselTransitionEnabled(false);
                return next;
            });
        }, MOBILE_CAROUSEL_HOLD_MS);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        if (mobileCarouselActiveIndex !== 0 || carouselTransitionEnabled) return;
        const id = requestAnimationFrame(() => {
            requestAnimationFrame(() => setCarouselTransitionEnabled(true));
        });
        return () => cancelAnimationFrame(id);
    }, [mobileCarouselActiveIndex, carouselTransitionEnabled]);

    /** Смещение трека: слот = карточка + зазор, по центру окна с запасом под кольцо */
    const carouselOffset = MOBILE_CAROUSEL_RING_PAD - mobileCarouselActiveIndex * MOBILE_CAROUSEL_SLOT;

    return (
        <main className="figma-site-page overflow-x-hidden bg-[#e8e8e8] text-white">
            <section className="relative min-h-[100svh] min-[1200px]:hidden snap-start snap-always">
                <div
                    className="relative overflow-hidden"
                    style={{
                        minHeight: "clamp(720px, 100svh, 900px)",
                        paddingTop: "calc(4rem + env(safe-area-inset-top, 0px))",
                        paddingLeft: "max(clamp(16px, 4vw, 24px), env(safe-area-inset-left))",
                        paddingRight: "max(clamp(16px, 4vw, 24px), env(safe-area-inset-right))",
                        paddingBottom: "max(48px, env(safe-area-inset-bottom, 24px))",
                    }}
                >
                    {/* Фон: отзеркален, по высоте вписан в рамки */}
                    <div
                        className="absolute left-0 right-0 bottom-0 z-0"
                        style={{ top: "calc(-4rem - env(safe-area-inset-top, 0px))" }}
                    >
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: `url(${heroBackgroundMobile}) lightgray 50% center / auto 100% no-repeat`,
                        }}
                    />
                        <div className="absolute inset-0 bg-black" style={{ opacity: HERO_BG_EFFECTS.overlayOpacity }} />
                        <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_EFFECTS.topGradient }} />
                        <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_EFFECTS.bottomGradient }} />
                        {HERO_BG_EFFECTS.vignetteOn && (
                            <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_EFFECTS.vignette }} />
                        )}
                    </div>

                    {/* Лого в контенте у самого верха (скроллится вместе со страницей и уходит за экран); мобильное — уменьшено */}
                    <Link
                        href="/"
                        className="header-logo-link group absolute left-1/2 top-0 z-20 flex h-12 w-[165px] -translate-x-1/2 items-center justify-center"
                        style={{ top: "env(safe-area-inset-top, 0px)" }}
                        aria-label="VelesBron — на главную"
                    >
                        <div
                            className="logo-plaque pointer-events-none absolute left-1/2 top-0 z-[5] h-[66px] w-[165px] -translate-x-1/2 rounded-b-[10px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-200 group-hover:shadow-[0_10px_40px_rgba(231,129,63,0.5),0_0_0_3px_rgba(231,129,63,0.4)]"
                            style={{ top: "-22px" }}
                            aria-hidden="true"
                        />
                        <img
                            src="/images/pages/velesbron_logo.png"
                            alt="VelesBron"
                            className="relative z-10 h-8 w-[140px] object-contain object-center"
                        />
                    </Link>

                    {/* Верхний блок: Новая модель — прижат к левому краю, выше за счёт компактного лого */}
                    <div className="relative z-20 mt-1" style={{ maxWidth: "calc(100vw - 2 * clamp(16px, 4vw, 24px))" }}>
                        <h2
                            className="uppercase text-white text-left"
                            style={{
                                fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                                fontSize: 29,
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                lineHeight: 1.15,
                            }}
                        >
                            НОВАЯ МОДЕЛЬ VELESBRON
                        </h2>
                        <p
                            className="mt-1.5 text-white/90 text-left font-medium"
                            style={{
                                fontFamily: "var(--font-roboto-flex), sans-serif",
                                fontSize: 19,
                                lineHeight: 1.35,
                            }}
                        >
                            Усиленная конструкция, гибридная подошва и современные материалы обеспечивают защиту, устойчивость и комфорт на дистанции.
                        </p>
                        <Link
                            href="/models"
                            className="mt-4 inline-flex h-14 min-w-[220px] items-center justify-center rounded-[14px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] px-6 text-[17px] font-medium uppercase tracking-[0.08em] text-white"
                            style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontWeight: 700 }}
                        >
                            Изучить модель
                        </Link>
                    </div>

                    {/* Ботинок — позиция в % от контейнера, как и фон: не прыгает относительно подиума (временно отключено, фон содержит ботинок) */}
                    {/*{false && (
                        <div
                            className="pointer-events-none absolute z-10 overflow-hidden"
                            style={{
                                left: `${HERO_BOOT_MOBILE.leftPct}%`,
                                top: `${HERO_BOOT_MOBILE.topPct}%`,
                                width: HERO_BOOT_MOBILE.widthCss,
                                transform: `translateX(${HERO_BOOT_MOBILE.translateXPct}%)`,
                                aspectRatio: "93 / 76",
                            }}
                        >
                            <img src="/images/pages/main_left_model for_hero.png" alt="Тактическая обувь" className="h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]" />
                        </div>
                    )}
*/}
                    {/* Карусель преимуществ: под ботинком, top в % от контейнера */}
                    <div
                        className="absolute left-0 right-0 z-20 w-full"
                        style={{
                            top: `${MOBILE_CAROUSEL_TOP_PCT}%`,
                        }}
                    >
                        {/* Окно карусели: одна карточка + запас под кольцо (по бокам и сверху/снизу), плавная смена */}
                        <div
                            className="mx-auto overflow-hidden"
                            style={{
                                width: MOBILE_CARD_WIDTH + MOBILE_CAROUSEL_RING_PAD * 2,
                                paddingTop: MOBILE_CAROUSEL_VERTICAL_PAD,
                                paddingBottom: MOBILE_CAROUSEL_VERTICAL_PAD,
                            }}
                        >
                            <div
                                ref={mobileCarouselTrackRef}
                                className="flex pb-2"
                                style={{
                                    width: MOBILE_CAROUSEL_TRACK_WIDTH,
                                    gap: MOBILE_CAROUSEL_GAP,
                                    transform: `translateX(${carouselOffset}px)`,
                                    transition: carouselTransitionEnabled ? `transform ${MOBILE_CAROUSEL_TRANSITION_MS}ms cubic-bezier(0.25, 0.1, 0.25, 1)` : "none",
                                }}
                            >
                            {[...HERO_ADVANTAGES, ...HERO_ADVANTAGES].map((item, index) => {
                                const isActive = mobileCarouselActiveIndex === index;
                                return (
                                    <div
                                        key={`${item.label}-${index}`}
                                        data-carousel-card={index}
                                        className={`group flex shrink-0 items-center gap-3 rounded-xl py-2.5 pr-3 pl-2.5 transition-all duration-200 hover:scale-[1.02] hover:bg-white/20 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:ring-2 hover:ring-[#e7813f]/70 ${
                                            isActive ? "!scale-[1.04] !bg-white/25 !shadow-[0_6px_24px_rgba(0,0,0,0.25)] !ring-2 !ring-[#e7813f]" : ""
                                        }`}
                                        style={{
                                            width: MOBILE_CARD_WIDTH,
                                            minWidth: MOBILE_CARD_WIDTH,
                                        }}
                                    >
                                        <span
                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-inner transition-all duration-200 hero-advantage-icon-glow ${
                                                isActive ? "!bg-white/60 shadow-[0_0_16px_4px_rgba(231,129,63,0.5)]" : "bg-white/25 group-hover:bg-white/50"
                                            }`}
                                        >
                                            <img src={item.icon} alt="" className="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-105" />
                                        </span>
                                        <span className="min-w-0 flex-1 text-white/90 font-medium" style={{ fontFamily: "var(--font-roboto-flex), sans-serif", fontSize: 19, lineHeight: 1.35 }}>
                                            {item.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        </div>
                    </div>

                    </div>
            </section>

            <section
                className="figma-site-stage relative hidden h-[100dvh] min-h-[100dvh] overflow-hidden min-[1200px]:block snap-start snap-always"
                style={{ ["--figma-stage-height" as string]: "100dvh" }}
            >
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: `url(${heroBackgroundDesktop}) lightgray 50% / cover no-repeat`,
                        }}
                    />
                    <div className="absolute inset-0 bg-black" style={{ opacity: HERO_BG_EFFECTS.overlayOpacity }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_EFFECTS.topGradient }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_EFFECTS.bottomGradient }} />
                    {HERO_BG_EFFECTS.vignetteOn && (
                        <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_EFFECTS.vignette }} />
                    )}
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

                            {/* Заголовок и подзаголовок — справа вверху, в один уровень с левым блоком (96px spacer + clamp как у левого) */}
                            <div
                                className="absolute right-0 z-20 flex flex-col items-end text-right"
                                style={{ top: "clamp(140px, calc(116px + 5vh), 164px)", maxWidth: "min(520px, 32vw)" }}
                            >
                                <h1
                                    className="uppercase text-white"
                                    style={{
                                        fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                                        fontSize: "clamp(29px, 1.68vw, 30px)",
                                        fontWeight: 700,
                                        letterSpacing: "0.04em",
                                        lineHeight: 1.25,
                                    }}
                                >
                                    БОТИНКИ ПОВЫШЕННОЙ НАДЁЖНОСТИ
                                </h1>
                                <p
                                    className="mt-2 text-white/90"
                                    style={{
                                        fontFamily: "var(--font-roboto-flex), sans-serif",
                                        fontSize: "clamp(23px, 0.94vw, 25px)",
                                        fontWeight: 400,
                                        lineHeight: 1.45,
                                    }}
                                >
                                    Треккингово-тактическая обувь из натуральных материалов для города, работы и активной эксплуатации.
                                </p>
                            </div>

                            {/* Левый блок: новая модель, кнопка, преимущества */}
                            <div
                                className="relative z-30 flex flex-col"
                                style={{
                                    marginTop: "clamp(24px, 5vh, 48px)",
                                    maxWidth: 480,
                                }}
                            >
                                <h2
                                    className="uppercase text-white"
                                style={{
                                    fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                                    fontSize: "clamp(29px, 1.68vw, 30px)",
                                    fontWeight: 700,
                                    letterSpacing: "0.04em",
                                    lineHeight: 1.25,
                                }}
                            >
                                НОВАЯ МОДЕЛЬ VELESBRON
                            </h2>
                            <p
                                className="mt-2 text-white/90"
                                style={{
                                    fontFamily: "var(--font-roboto-flex), sans-serif",
                                    fontSize: "clamp(23px, 0.94vw, 25px)",
                                        fontWeight: 400,
                                        lineHeight: 1.45,
                                    }}
                                >
                                    Усиленная конструкция, гибридная подошва и современные материалы обеспечивают защиту, устойчивость и комфорт на дистанции.
                                </p>
                                <Link
                                    href="/models"
                                    className="mt-4 flex h-16 w-[260px] shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[19px] font-medium uppercase tracking-[0.08em] text-white"
                                    style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontWeight: 700 }}
                                >
                                    Изучить модель
                                </Link>

                                {/* Преимущества */}
                                <h2
                                    className="mt-8 uppercase text-white"
                                    style={{
                                        fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                                        fontSize: "clamp(29px, 1.68vw, 30px)",
                                        fontWeight: 700,
                                        letterSpacing: "0.04em",
                                    }}
                                >
                                    Преимущества
                                </h2>
                                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                                    {HERO_ADVANTAGES.map((item, index) => (
                                        <div
                                            key={item.label}
                                            className="hero-advantage-entry group flex cursor-default items-center gap-3 rounded-xl py-3 pr-4 pl-3 transition-all duration-200 hover:scale-[1.02] hover:bg-white/20 hover:shadow-[0_6px_24px_rgba(0,0,0,0.25)] hover:ring-2 hover:ring-[#e7813f]/70"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <span className="hero-advantage-icon-glow flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/25 shadow-inner transition-all duration-200 group-hover:bg-white/50">
                                                <img src={item.icon} alt="" className="h-9 w-9 object-contain transition-transform duration-200 group-hover:scale-105" />
                                            </span>
                                            <span className="text-white/90" style={{ fontFamily: "var(--font-roboto-flex), sans-serif", fontSize: "clamp(28px, 1.1vw, 30px)", fontWeight: 400, lineHeight: 1.45 }}>
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <p
                                    className="mt-4 text-white/80"
                                    style={{
                                        fontFamily: "var(--font-roboto-flex), sans-serif",
                                        fontSize: "clamp(23px, 0.94vw, 25px)",
                                        fontWeight: 400,
                                        lineHeight: 1.45,
                                    }}
                                >
                                    Для города, работы и сложного рельефа
                                </p>
                            </div>

                            {/* Ботинок — адаптивные размер и положение в HERO_BOOT_DESKTOP */}
                            <div
                                className="pointer-events-none absolute z-20 overflow-visible"
                                style={{
                                    left: HERO_BOOT_DESKTOP.containerLeft,
                                    top: `${HERO_BOOT_DESKTOP.containerTopPct}%`,
                                    width: "clamp(400px, 50vw, 860px)",
                                    height: "clamp(400px, 55vh, 700px)",
                                }}
                            >
                                {/*<img
                                    src="/images/pages/main_left_model for_hero.png"
                                    alt="Тактическая обувь"
                                    className="pointer-events-none absolute max-w-none drop-shadow-[0_40px_80px_rgba(0,0,0,0.28)]"
                                    style={{
                                        left: HERO_BOOT_DESKTOP.imgOffsetX,
                                        top: HERO_BOOT_DESKTOP.imgOffsetY,
                                        width: HERO_BOOT_DESKTOP.width,
                                    }}
                                />*/}
                            </div>

                            </div>
                    </div>
                </div>
            </section>

            {/* Второй экран: контент страницы «Конструкция» (та же вставка на /advantages) */}
            <section ref={secondScreenRef} className="min-h-[100dvh] w-full snap-start">
                <AdvantagesContent showHeader={false} />
            </section>
        </main>
    );
}
