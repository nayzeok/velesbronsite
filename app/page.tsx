"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AdvantagesContent } from "@/app/advantages/page";
import SiteHeader from "@/components/layout/SiteHeader";

const heroBackgroundDesktop = "/images/pages/2.2.png";
const heroBackgroundMobile = "/images/pages/hero_back_for_mobile.png";
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

/** Нижняя полоска преимуществ на десктопе (мокап): 3 колонки с иконкой */
const HERO_FEATURES_STRIP = [
  {
    title: "АНТИПРОКОЛЬНАЯ ЗАЩИТА",
    desc: "Гибридная подошва усилена вставкой из арамидной ткани K-29.",
    icon: "/images/models/ui/антипрокол.png",
  },
  {
    title: "МЕМБРАНА VELTEX™",
    desc: "Герметичная чулочная конструкция отводит влагу и сохраняет микроклимат.",
    icon: "/images/models/ui/мембрана_VELTEX.png",
  },
  {
    title: "УСИЛЕННАЯ КОНСТРУКЦИЯ",
    desc: "Тройная прошивка армированными лавсановыми нитями.",
    icon: "/images/models/ui/Гарантия_усил.констр..png",
  },
];

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

    useEffect(() => {
        if (typeof window === "undefined") return;

        const pendingTarget = window.sessionStorage.getItem("pending-home-scroll");
        const hashTarget = window.location.hash === "#advantages" ? "advantages" : null;
        const target = pendingTarget ?? hashTarget;
        if (target !== "advantages") return;

        const scrollToAdvantages = () => {
            const section = secondScreenRef.current ?? document.getElementById("advantages");
            if (!section) return false;
            const scrollEl = document.querySelector<HTMLElement>(".figma-site-page");
            const isScrollable = scrollEl && scrollEl.scrollHeight > scrollEl.clientHeight;
            if (isScrollable && scrollEl) {
                const nextTop = section.getBoundingClientRect().top - scrollEl.getBoundingClientRect().top + scrollEl.scrollTop;
                if (nextTop <= 0) return false;
                scrollEl.scrollTo({
                    top: nextTop,
                    behavior: "smooth",
                });
            } else {
                const nextTop = section.getBoundingClientRect().top + window.scrollY;
                if (nextTop <= 0) return false;
                window.scrollTo({
                    top: nextTop,
                    behavior: "smooth",
                });
            }
            window.sessionStorage.removeItem("pending-home-scroll");
            if (window.location.hash === "#advantages") {
                window.history.replaceState(null, "", "/");
            }
            return true;
        };

        let attempts = 0;
        const maxAttempts = 20;
        const intervalId = window.setInterval(() => {
            attempts += 1;
            const didScroll = scrollToAdvantages();
            if (didScroll || attempts >= maxAttempts) {
                window.clearInterval(intervalId);
            }
        }, 120);

        return () => window.clearInterval(intervalId);
    }, []);

    /** Смещение трека: слот = карточка + зазор, по центру окна с запасом под кольцо */
    const carouselOffset = MOBILE_CAROUSEL_RING_PAD - mobileCarouselActiveIndex * MOBILE_CAROUSEL_SLOT;

    return (
        <main className="figma-site-page relative overflow-x-hidden bg-[#e8e8e8] text-white">
            <section className="relative min-h-[100svh] min-[1200px]:hidden snap-start snap-always">
                <div
                    className="relative overflow-hidden"
                    style={{
                        minHeight: "clamp(720px, 100svh, 900px)",
                        paddingTop: "calc(5rem + env(safe-area-inset-top, 0px))",
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
                            background: `url(${heroBackgroundMobile}) lightgray 50% 42% / auto 100% no-repeat`,
                        }}
                    />
                        <div className="absolute inset-0 bg-black" style={{ opacity: HERO_BG_EFFECTS.overlayOpacity }} />
                        <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_EFFECTS.topGradient }} />
                        <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_EFFECTS.bottomGradient }} />
                        {HERO_BG_EFFECTS.vignetteOn && (
                            <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_EFFECTS.vignette }} />
                        )}
                    </div>

                    {/* Верхний блок: Новая модель */}
                    <div className="relative z-20 mt-1 mb-5" style={{ maxWidth: "calc(100vw - 2 * clamp(16px, 4vw, 24px))" }}>
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
                className="figma-site-stage relative hidden overflow-visible min-[1200px]:block snap-start snap-always"
                style={{
                    ["--figma-stage-height" as string]: "100dvh",
                    height: "calc(100dvh - 65px)",
                    minHeight: "calc(100dvh - 65px)",
                }}
            >
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `url(${heroBackgroundDesktop})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "0% 70%",
                            backgroundColor: "lightgray",
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
                            <div className="h-[80px] shrink-0" aria-hidden="true" />

                            {/* Правый верхний блок с текстовкой, как в исходном варианте */}
                            <div
                                className="absolute right-0 z-20 flex flex-col items-end text-right"
                                style={{ top: "clamp(140px, calc(116px + 5vh), 164px)", maxWidth: "min(460px, 30vw)" }}
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
                                    РАССЧИТАНО НА НАГРУЗКУ
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
                                    Конструкция, рассчитанная на нагрузку: гибридная подошва, усиленные узлы и современные материалы для защиты и комфорта на дистанции.
                                </p>
                            </div>

                            {/* Слева — новая модель, кнопка */}
                            <div className="relative z-30 flex min-h-0 flex-1 items-start justify-between gap-[clamp(24px,4vw,64px)]">
                                <div
                                    className="flex max-w-[480px] flex-col"
                                    style={{ marginTop: "clamp(60px, calc(36px + 5vh), 84px)" }}
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
                                        НОВЫЕ МОДЕЛИ VELESBRON
                                    </h2>
                                    <div className="mt-4 flex">
                                        {["/images/pages/hero_mini_photo_1.png", "/images/pages/hero_mini_photo_2.png", "/images/pages/hero_mini_photo_3.png", "/images/pages/hero_mini_photo_4.png"].map((src, idx) => (
                                            <div
                                                key={src}
                                                className={`flex h-[86px] w-[86px] items-center justify-center rounded-full border border-white/80 bg-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.35)] ${
                                                    idx === 0 ? "" : "-ml-3"
                                                }`}
                                            >
                                                <img
                                                    src={src}
                                                    alt={`Миниатюра модели ${idx + 1}`}
                                                    className="h-[78px] w-[78px] rounded-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p
                                        className="mt-3 text-white/90"
                                        style={{
                                            fontFamily: "var(--font-roboto-flex), sans-serif",
                                            fontSize: "clamp(23px, 0.94vw, 25px)",
                                            fontWeight: 400,
                                            lineHeight: 1.45,
                                        }}
                                    >
                                        Гибридная подошва с антипрокольной защитой, мембрана VELTEX™ и продуманная конструкция моделей создают уверенность в каждом шаге.
                                    </p>
                                    <Link
                                        href="/models"
                                        className="mt-4 inline-flex h-[75px] w-[260px] shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[19px] font-medium uppercase tracking-[0.08em] text-white"
                                        style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontWeight: 700 }}
                                    >
                                        Изучить модель
                                    </Link>
                                </div>

                                {/* Справа: фото ботинка — закомментировано по запросу */}
                                {/* <div
                                    className="pointer-events-none relative z-20 flex shrink-0 items-end justify-end"
                                    style={{
                                        width: "clamp(320px, 42vw, 580px)",
                                        height: "clamp(380px, 52vh, 620px)",
                                    }}
                                >
                                    <img
                                        src="/images/pages/main_left_model for_hero.png"
                                        alt="Треккинговые ботинки Velesbron"
                                        className="h-full w-full object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
                                    />
                                </div> */}
                            </div>
                            {/* Вертикальные полосы под плашкой преимуществ, визуально продолжающие фон второго экрана */}
                            <div
                                className="pointer-events-none absolute left-1/2 z-[30] hidden h-[15px] w-[790px] -translate-x-1/2 min-[1200px]:block"
                                style={{ top: "calc(100dvh - 10px)" }}
                            >
                                <div className="pointer-events-none absolute inset-0">
                                    {Array.from({ length: 14 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="absolute inset-y-0"
                                            style={{ left: `${(index * 100) / 14}%`, width: `${100 / 14}%` }}
                                        >
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    backgroundImage:
                                                        "linear-gradient(-90deg, rgba(255,255,255,0.01) 20%, rgba(40,40,40,0.12) 75.758%, rgba(255,255,255,0.01) 123.64%)",
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Нижняя полоска: 3 преимущества (мокап), отдельным слоем поверх границы экранов */}
            <div
                className="pointer-events-none hidden min-[1200px]:flex absolute left-1/2 z-[50] h-[110px] min-h-[110px] min-w-[min(100%,1280px)] -translate-x-1/2 items-stretch justify-center gap-0 rounded-[22px] bg-white/98 px-[clamp(20px,3vw,56px)] py-6 shadow-[0_18px_40px_rgba(0,0,0,0.55),0_-6px_18px_rgba(0,0,0,0.16)] ring-1 ring-white/70"
                style={{ top: "calc(100dvh - 120px)" }}
            >
                {HERO_FEATURES_STRIP.map((item, index) => (
                    <div
                        key={item.title}
                        className="flex min-w-0 flex-1 items-center border-r border-[#e0e0e0] px-5 last:border-r-0"
                        style={{ maxWidth: index === 1 ? 700 :380 }}
                    >
                        <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
                            <img
                                src={item.icon}
                                alt=""
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col items-start text-left">
                            <span
                                className="whitespace-nowrap text-[#222222] uppercase"
                                style={{
                                    fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                                    fontSize: "clamp(15px, 0.95vw, 18px)",
                                    fontWeight: 700,
                                    letterSpacing: "0.04em",
                                    lineHeight: 1.2,
                                }}
                            >
                                {item.title}
                            </span>
                            <span
                                className="mt-1 text-[#6b6b6b]"
                                style={{
                                    fontFamily: "var(--font-roboto-flex), sans-serif",
                                    fontSize: "clamp(14px, 0.9vw, 16px)",
                                    fontWeight: 400,
                                    lineHeight: 1.5,
                                }}
                            >
                                {item.desc}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Второй экран: контент страницы «Конструкция» (та же вставка на /advantages).
                Секция прозрачная, белый фон и отступ начинаются только внутри контента,
                чтобы плашка-переход из hero всегда была поверх всего. */}
            <section
                id="advantages"
                ref={secondScreenRef}
                className="relative z-0 min-h-[100dvh] w-full snap-start"
            >
                <div className="bg-white pt-[70px]">
                    <AdvantagesContent showHeader={false} />
                </div>
            </section>
        </main>
    );
}
