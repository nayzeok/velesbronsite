"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AdvantagesContent } from "@/app/advantages/page";
import SiteHeader from "@/components/layout/SiteHeader";

const heroBackgroundDesktop = "/images/pages/2.2.png";
const heroBackgroundMobile = "/images/pages/mobile_hero_back.PNG";
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
    title: "Антипрокольная защита",
    desc: "Гибридная подошва усилена вставкой из арамидной ткани K-29.",
    icon: "/images/models/ui/антипрокол.png",
  },
  {
    title: "Мембрана VELTEX™",
    desc: "Герметичная чулочная конструкция отводит влагу и сохраняет микроклимат.",
    icon: "/images/models/ui/мембрана_VELTEX.png",
  },
  {
    title: "Усиленная конструкция",
    desc: "Тройная прошивка армированными лавсановыми нитями.",
    icon: "/images/models/ui/Гарантия_усил.констр..png",
  },
];

/** Горизонтальный отступ левого и правого блоков героя от краёв (desktop) */
const HERO_CONTENT_PADDING_X = "39px";
/** Отступ от верха: левый блок = 80px (спейсер) + HERO_LEFT_BLOCK_MARGIN_TOP */
const HERO_LEFT_BLOCK_MARGIN_TOP = "clamp(60px, calc(36px + 5vh), 84px)";
/** Отступ правого блока от верха. Увеличь числа — блок опустится (например 180px, 156px+5vh, 204px) */
const HERO_RIGHT_BLOCK_TOP = "clamp(154px, calc(130px + 5vh), 178px)";
/** Смещение скролла при переходе по якорю «Конструкция»: прокрутить ниже, чтобы плашка преимуществ не перекрывала контент (px) */
const ADVANTAGES_SCROLL_OFFSET = 120;

const MOBILE_CARD_WIDTH = 337;
const MOBILE_CARD_GAP = 56;
const MOBILE_SET_WIDTH = HERO_FEATURES_STRIP.length * MOBILE_CARD_WIDTH + (HERO_FEATURES_STRIP.length - 1) * MOBILE_CARD_GAP;
/** Расстояние между карточками в карусели (px) */
const MOBILE_CAROUSEL_GAP = 85;
/** Запас по краям окна: только активная карточка в кадре, соседние почти не видны (px с каждой стороны) */
const MOBILE_CAROUSEL_RING_PAD = 4;
/** Запас сверху/снизу окна карусели (px), чтобы подсветка не обрезалась */
const MOBILE_CAROUSEL_VERTICAL_PAD = 18;
const MOBILE_CAROUSEL_SLOT = MOBILE_CARD_WIDTH + MOBILE_CAROUSEL_GAP;
const MOBILE_CAROUSEL_TRACK_WIDTH = HERO_FEATURES_STRIP.length * 2 * MOBILE_CARD_WIDTH + (HERO_FEATURES_STRIP.length * 2 - 1) * MOBILE_CAROUSEL_GAP;
/** Длительность показа одной карточки (мс), затем смена на следующую */
const MOBILE_CAROUSEL_HOLD_MS = 3800;
/** Длительность анимации сдвига к следующей карточке (мс) */
const MOBILE_CAROUSEL_TRANSITION_MS = 800;
/** Порог свайпа (px): сдвиг больше — переключить слайд */
const MOBILE_CAROUSEL_SWIPE_THRESHOLD = 50;
/** Высота свёрнутой карточки и прирост при раскрытии (для margin-top компенсации, px) */
/** Высота свёрнутой карточки: py-2.5 (20) + иконка h-12 (48) + запас; окно карусели не должно обрезать верх */
const MOBILE_CARD_COLLAPSED_H = 80;
const MOBILE_CARD_EXPANDED_EXTRA_H = 72;

export default function Home() {
    const [stageHeightFitScale, setStageHeightFitScale] = useState(1);
    useEffect(() => {
        const update = () => setStageHeightFitScale(Math.min(1, (typeof window !== "undefined" ? window.innerHeight : 900) / DESIGN_HEIGHT));
        update();
        if (typeof window === "undefined") return;
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    useEffect(() => {
        const el = mobileCarouselContainerRef.current;
        if (!el) return;
        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length !== 1) return;
            const t = e.touches[0];
            if (mobileCarouselPointerIdRef.current !== t.identifier) return;
            if (mobileCarouselTouchStartX.current === null || mobileCarouselTouchStartY.current === null) return;
            const dx = t.clientX - mobileCarouselTouchStartX.current;
            const dy = t.clientY - mobileCarouselTouchStartY.current;
            if (!mobileCarouselDidLockHorizontalRef.current) {
                if (Math.abs(dx) < 8) return;
                if (Math.abs(dy) > Math.abs(dx)) return;
                mobileCarouselDidLockHorizontalRef.current = true;
            }
            e.preventDefault();
            const clamped = Math.max(-MOBILE_CAROUSEL_SLOT, Math.min(MOBILE_CAROUSEL_SLOT, dx));
            carouselSwipeOffsetRef.current = clamped;
            setCarouselSwipeOffset(clamped);
        };
        el.addEventListener("touchmove", onTouchMove, { passive: false });
        return () => el.removeEventListener("touchmove", onTouchMove);
    }, []);

    const mobileCarouselTrackRef = useRef<HTMLDivElement>(null);
    const mobileCarouselContainerRef = useRef<HTMLDivElement>(null);
    const mobileCarouselTouchStartX = useRef<number | null>(null);
    const mobileCarouselAutoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const carouselAutoResumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const secondScreenRef = useRef<HTMLElement>(null);
    const [mobileCarouselActiveIndex, setMobileCarouselActiveIndex] = useState(0);
    const [carouselTransitionEnabled, setCarouselTransitionEnabled] = useState(true);
    const [carouselSwipeOffset, setCarouselSwipeOffset] = useState(0);
    /** Индекс раскрытой карточки карусели (null = все свёрнуты). По тапу раскрывается и показывается описание. */
    const [expandedCarouselIndex, setExpandedCarouselIndex] = useState<number | null>(null);
    /** Чей пульс запустить один раз после остановки карусели */
    const [pulseCardIndex, setPulseCardIndex] = useState<number | null>(null);
    const carouselLastSwipeDistanceRef = useRef(0);
    const carouselSwipeOffsetRef = useRef(0);
    const activeIndexRef = useRef(mobileCarouselActiveIndex);
    activeIndexRef.current = mobileCarouselActiveIndex;
    carouselSwipeOffsetRef.current = carouselSwipeOffset;

    /** Пульс по transitionend трека (когда карусель закончила переход) */
    const pulseClearTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => {
        const track = mobileCarouselTrackRef.current;
        if (!track) return;

        const onTransitionEnd = (e: TransitionEvent) => {
            if (e.propertyName !== "transform") return;
            if (pulseClearTimeoutRef.current) {
                clearTimeout(pulseClearTimeoutRef.current);
                pulseClearTimeoutRef.current = null;
            }
            setPulseCardIndex(activeIndexRef.current);
            pulseClearTimeoutRef.current = setTimeout(() => setPulseCardIndex(null), 1700);
        };
        track.addEventListener("transitionend", onTransitionEnd);
        return () => {
            track.removeEventListener("transitionend", onTransitionEnd);
            if (pulseClearTimeoutRef.current) clearTimeout(pulseClearTimeoutRef.current);
        };
    }, []);

    /** Первая загрузка: пульс центральной карточки через 500ms (transitionend при первом рендере не срабатывает) */
    const didInitialPulseRef = useRef(false);
    useEffect(() => {
        if (didInitialPulseRef.current) return;
        didInitialPulseRef.current = true;
        const t = setTimeout(() => {
            setPulseCardIndex(0);
            setTimeout(() => setPulseCardIndex(null), 1700);
        }, 500);
        return () => clearTimeout(t);
    }, []);

    const startCarouselAuto = () => {
        if (mobileCarouselAutoIntervalRef.current !== null) return;
        const t = setInterval(() => {
            setMobileCarouselActiveIndex((prev) => {
                const next = (prev + 1) % (HERO_FEATURES_STRIP.length * 2);
                if (next === 0) setCarouselTransitionEnabled(false);
                return next;
            });
        }, MOBILE_CAROUSEL_HOLD_MS);
        mobileCarouselAutoIntervalRef.current = t;
    };
    const stopCarouselAuto = () => {
        if (mobileCarouselAutoIntervalRef.current === null) return;
        clearInterval(mobileCarouselAutoIntervalRef.current);
        mobileCarouselAutoIntervalRef.current = null;
    };

    useEffect(() => {
        startCarouselAuto();
        return () => stopCarouselAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                const nextTop = section.getBoundingClientRect().top - scrollEl.getBoundingClientRect().top + scrollEl.scrollTop + ADVANTAGES_SCROLL_OFFSET;
                if (nextTop <= 0) return false;
                scrollEl.scrollTo({
                    top: nextTop,
                    behavior: "smooth",
                });
            } else {
                const nextTop = section.getBoundingClientRect().top + window.scrollY + ADVANTAGES_SCROLL_OFFSET;
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
    const carouselTotalCards = HERO_FEATURES_STRIP.length * 2;

    const mobileCarouselPointerIdRef = useRef<number | null>(null);
    const mobileCarouselTouchStartY = useRef<number | null>(null);
    const mobileCarouselDidLockHorizontalRef = useRef(false);

    const resetCarouselPointerGesture = () => {
        mobileCarouselPointerIdRef.current = null;
        mobileCarouselDidLockHorizontalRef.current = false;
        mobileCarouselTouchStartX.current = null;
        mobileCarouselTouchStartY.current = null;
        setCarouselSwipeOffset(0);
        setCarouselTransitionEnabled(true);
    };

    const handleCarouselPointerDown = (e: React.PointerEvent) => {
        if (e.pointerType !== "touch") return;
        carouselLastSwipeDistanceRef.current = 0;
        if (mobileCarouselAutoIntervalRef.current !== null) {
            clearInterval(mobileCarouselAutoIntervalRef.current);
            mobileCarouselAutoIntervalRef.current = null;
        }
        mobileCarouselPointerIdRef.current = e.pointerId;
        mobileCarouselDidLockHorizontalRef.current = false;
        mobileCarouselTouchStartX.current = e.clientX;
        mobileCarouselTouchStartY.current = e.clientY;
        setCarouselTransitionEnabled(false);
    };
    const handleCarouselPointerMove = (e: React.PointerEvent) => {
        if (e.pointerType !== "touch") return;
        if (mobileCarouselPointerIdRef.current !== e.pointerId) return;
        if (mobileCarouselTouchStartX.current === null || mobileCarouselTouchStartY.current === null) return;

        const dx = e.clientX - mobileCarouselTouchStartX.current;
        const dy = e.clientY - mobileCarouselTouchStartY.current;

        // Не блокируем вертикальный скролл: «захватываем» только явно горизонтальный жест.
        if (!mobileCarouselDidLockHorizontalRef.current) {
            if (Math.abs(dx) < 8) return;
            if (Math.abs(dy) > Math.abs(dx)) {
                // Вертикаль — отдаём жест странице.
                resetCarouselPointerGesture();
                return;
            }
            mobileCarouselDidLockHorizontalRef.current = true;
            try {
                (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            } catch {
                // ignore
            }
        }

        e.preventDefault();
        const clamped = Math.max(-MOBILE_CAROUSEL_SLOT, Math.min(MOBILE_CAROUSEL_SLOT, dx));
        carouselSwipeOffsetRef.current = clamped;
        setCarouselSwipeOffset(clamped);
    };
    const handleCarouselPointerUp = (e: React.PointerEvent) => {
        if (e.pointerType !== "touch") return;
        if (mobileCarouselPointerIdRef.current !== e.pointerId) return;
        try {
            (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {
            // ignore
        }
        const dx = carouselSwipeOffsetRef.current;
        carouselLastSwipeDistanceRef.current = Math.abs(dx);
        resetCarouselPointerGesture();
        if (dx > MOBILE_CAROUSEL_SWIPE_THRESHOLD) {
            setMobileCarouselActiveIndex((prev) => Math.max(0, prev - 1));
            setExpandedCarouselIndex(null);
        } else if (dx < -MOBILE_CAROUSEL_SWIPE_THRESHOLD) {
            setMobileCarouselActiveIndex((prev) => (prev + 1) % carouselTotalCards);
            setExpandedCarouselIndex(null);
        }
    };
    const handleCarouselLostPointerCapture = (e: React.PointerEvent) => {
        if (e.pointerType !== "touch") return;
        resetCarouselPointerGesture();
    };

    const handleCarouselTouchStart = (e: React.TouchEvent) => {
        if (e.changedTouches.length === 0) return;
        const t = e.changedTouches[0];
        carouselLastSwipeDistanceRef.current = 0;
        mobileCarouselPointerIdRef.current = t.identifier;
        mobileCarouselDidLockHorizontalRef.current = false;
        mobileCarouselTouchStartX.current = t.clientX;
        mobileCarouselTouchStartY.current = t.clientY;
        setCarouselTransitionEnabled(false);
    };
    const handleCarouselTouchMove = (e: React.TouchEvent) => {
        if (e.changedTouches.length === 0) return;
        const t = e.changedTouches[0];
        if (mobileCarouselPointerIdRef.current !== t.identifier) return;
        if (mobileCarouselTouchStartX.current === null || mobileCarouselTouchStartY.current === null) return;
        const dx = t.clientX - mobileCarouselTouchStartX.current;
        const dy = t.clientY - mobileCarouselTouchStartY.current;
        if (!mobileCarouselDidLockHorizontalRef.current) {
            if (Math.abs(dx) < 8) return;
            if (Math.abs(dy) > Math.abs(dx)) {
                resetCarouselPointerGesture();
                return;
            }
            mobileCarouselDidLockHorizontalRef.current = true;
        }
        e.preventDefault();
        const clamped = Math.max(-MOBILE_CAROUSEL_SLOT, Math.min(MOBILE_CAROUSEL_SLOT, dx));
        carouselSwipeOffsetRef.current = clamped;
        setCarouselSwipeOffset(clamped);
    };
    const handleCarouselTouchEnd = (e: React.TouchEvent) => {
        if (e.changedTouches.length === 0) return;
        const t = e.changedTouches[0];
        if (mobileCarouselPointerIdRef.current !== t.identifier) return;
        const dx = carouselSwipeOffsetRef.current;
        carouselLastSwipeDistanceRef.current = Math.abs(dx);
        resetCarouselPointerGesture();
        if (dx > MOBILE_CAROUSEL_SWIPE_THRESHOLD) {
            setMobileCarouselActiveIndex((prev) => Math.max(0, prev - 1));
            setExpandedCarouselIndex(null);
            if (carouselAutoResumeTimeoutRef.current) clearTimeout(carouselAutoResumeTimeoutRef.current);
            carouselAutoResumeTimeoutRef.current = setTimeout(startCarouselAuto, 2000);
        } else if (dx < -MOBILE_CAROUSEL_SWIPE_THRESHOLD) {
            setMobileCarouselActiveIndex((prev) => (prev + 1) % carouselTotalCards);
            setExpandedCarouselIndex(null);
            if (carouselAutoResumeTimeoutRef.current) clearTimeout(carouselAutoResumeTimeoutRef.current);
            carouselAutoResumeTimeoutRef.current = setTimeout(startCarouselAuto, 2000);
        }
    };

    const handleCarouselCardTap = (index: number) => {
        if (carouselLastSwipeDistanceRef.current > 15) return;
        setExpandedCarouselIndex((prev) => {
            const isClosing = prev === index;
            if (isClosing) {
                startCarouselAuto();
            } else {
                stopCarouselAuto();
            }
            return isClosing ? null : index;
        });
    };

    return (
            <main
                className="figma-site-page figma-site-page--hero-visible relative overflow-x-hidden bg-[#e8e8e8] text-white"
                style={{ overflowY: "visible" }}
            >
            <section className="relative min-h-[100svh] min-[1200px]:hidden snap-start snap-always overflow-visible" style={{ overflow: "visible" }}>
                <div
                    className="relative overflow-visible"
                    style={{
                        overflow: "visible",
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
                        <div className="absolute inset-0 pointer-events-none bg-black" style={{ opacity: HERO_BG_EFFECTS.overlayOpacity }} />
                        <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_EFFECTS.topGradient }} />
                        <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_EFFECTS.bottomGradient }} />
                        {HERO_BG_EFFECTS.vignetteOn && (
                            <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_EFFECTS.vignette }} />
                        )}
                    </div>

                    {/* Верхний блок: Новые модели */}
                    <div className="relative z-20 mt-6 mb-5" style={{ maxWidth: "calc(100vw - 2 * clamp(16px, 4vw, 24px))" }}>
                        <h2
                            className="uppercase text-white text-left"
                            style={{
                                fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
                                fontSize: 29,
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                lineHeight: 1.15,
                            }}
                        >
                            НОВЫЕ МОДЕЛИ VELESBRON
                        </h2>
                        <p
                            className="mt-1.5 text-white/90 text-left font-medium"
                            style={{
                                fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
                                fontSize: 19,
                                lineHeight: 1.35,
                            }}
                        >
                            Гибридная подошва с антипрокольной защитой, мембрана VELTEX™ и продуманная конструкция моделей создают уверенность в каждом шаге.
                        </p>
                        <Link
                            href="/models"
                            className="mt-4 inline-flex h-14 min-w-[220px] items-center justify-center rounded-[22px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] px-6 text-[17px] font-medium uppercase tracking-[0.08em] text-white"
                            style={{ fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif", fontWeight: 400 }}
                        >
                            Изучить модель
                        </Link>
                    </div>
                    {/* Карусель: z-10 ниже меню. Окно фиксированной высоты — карточка раскрывается ВВЕРХ, предки overflow:visible чтобы не обрезало. */}
                    <div
                        className="absolute left-0 right-0 z-10 flex w-full flex-col justify-end overflow-visible"
                        style={{
                            top: expandedCarouselIndex !== null ? `calc(${MOBILE_CAROUSEL_TOP_PCT}% - ${MOBILE_CARD_EXPANDED_EXTRA_H + 80}px)` : `${MOBILE_CAROUSEL_TOP_PCT}%`,
                            minHeight: expandedCarouselIndex !== null ? MOBILE_CARD_COLLAPSED_H + MOBILE_CAROUSEL_VERTICAL_PAD * 2 + MOBILE_CARD_EXPANDED_EXTRA_H + 100 : undefined,
                            overflow: "visible",
                        }}
                    >
                        <div
                            ref={mobileCarouselContainerRef}
                            className="pointer-events-auto mx-auto flex flex-col justify-end overflow-x-hidden overflow-y-visible"
                            style={{
                                width: MOBILE_CARD_WIDTH + MOBILE_CAROUSEL_RING_PAD * 2,
                                height: MOBILE_CARD_COLLAPSED_H + MOBILE_CAROUSEL_VERTICAL_PAD * 2,
                                paddingTop: MOBILE_CAROUSEL_VERTICAL_PAD,
                                paddingBottom: MOBILE_CAROUSEL_VERTICAL_PAD,
                                overflow: "visible",
                                touchAction: "pan-y",
                            }}
                            onTouchStart={handleCarouselTouchStart}
                            onTouchEnd={handleCarouselTouchEnd}
                        >
                            <div
                                ref={mobileCarouselTrackRef}
                                className="flex items-end pb-2"
                                style={{
                                    width: MOBILE_CAROUSEL_TRACK_WIDTH,
                                    gap: MOBILE_CAROUSEL_GAP,
                                    transform: `translateX(${carouselOffset + carouselSwipeOffset}px)`,
                                    transition: carouselTransitionEnabled ? `transform ${MOBILE_CAROUSEL_TRANSITION_MS}ms cubic-bezier(0.25, 0.1, 0.25, 1)` : "none",
                                }}
                            >
                            {[...HERO_FEATURES_STRIP, ...HERO_FEATURES_STRIP].map((item, index) => {
                                const isActive = mobileCarouselActiveIndex === index;
                                const isExpanded = expandedCarouselIndex === index;
                                return (
                                    <div
                                        key={`${item.title}-${index}`}
                                        data-carousel-card={index}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleCarouselCardTap(index)}
                                        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleCarouselCardTap(index)}
                                        className={`group flex shrink-0 cursor-pointer flex-col gap-0 self-end overflow-visible transition-all duration-300 ease-out hover:scale-[1.02] ${
                                            isActive ? "!scale-[1.04]" : ""
                                        } ${isExpanded ? "!scale-[1.02]" : ""}`}
                                        style={{
                                            width: MOBILE_CARD_WIDTH,
                                            minWidth: MOBILE_CARD_WIDTH,
                                        }}
                                    >
                                        <div
                                            className={`flex flex-col gap-0 overflow-visible rounded-[22px] border bg-black/20 py-2.5 pr-3 pl-2.5 backdrop-blur-md ${
                                                isActive && pulseCardIndex !== index ? "shadow-[0_6px_24px_rgba(0,0,0,0.25)]" : ""
                                            } ${pulseCardIndex === index ? "hero-card-pulse" : ""} hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]`}
                                            style={{
                                                borderWidth: 1,
                                                borderStyle: "solid",
                                                borderColor: "#B58B71",
                                            }}
                                        >
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-inner transition-all duration-200 hero-advantage-icon-glow ${
                                                    isActive ? "!bg-white/60 shadow-[0_0_16px_4px_rgba(231,129,63,0.5)]" : "bg-white/25 group-hover:bg-white/50"
                                                }`}
                                            >
                                                <img src={item.icon} alt="" className="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-105" />
                                            </span>
                                            <span className="min-w-0 flex-1 text-white/90 font-semibold uppercase tracking-wide" style={{ fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif", fontSize: 19, lineHeight: 1.35, fontWeight: 600 }}>
                                                {item.title}
                                            </span>
                                        </div>
                                        <div
                                            className="grid transition-all duration-300 ease-out"
                                            style={{
                                                gridTemplateRows: isExpanded ? "1fr" : "0fr",
                                            }}
                                        >
                                            <div className="overflow-hidden">
                                                <p
                                                    className="mt-2 text-white/90"
                                                    style={{
                                                        fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
                                                        fontSize: 17,
                                                        lineHeight: 1.45,
                                                        fontWeight: 400,
                                                    }}
                                                >
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                        </div>
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
                    height: "calc(100dvh - 90px)",
                    minHeight: "calc(100dvh - 90px)",
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
                    <div className="absolute inset-0 pointer-events-none bg-black" style={{ opacity: HERO_BG_EFFECTS.overlayOpacity }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_EFFECTS.topGradient }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_EFFECTS.bottomGradient }} />
                    {HERO_BG_EFFECTS.vignetteOn && (
                        <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_EFFECTS.vignette }} />
                    )}
                </div>

                <div className="relative z-10 h-[100dvh] w-full overflow-hidden">
                    <SiteHeader
                        tone="light"
                        className="absolute left-0 right-0 top-0 z-20 h-[96px] w-full"
                    />
                    <div
                        className="absolute top-0 h-[1000px]"
                        style={{
                            left: HERO_CONTENT_PADDING_X,
                            right: HERO_CONTENT_PADDING_X,
                            width: `calc((100% - 78px) / ${stageHeightFitScale})`,
                            transformOrigin: "top left",
                            transform: `scale(${stageHeightFitScale})`,
                        }}
                    >
                        <div className="relative flex h-[1000px] w-full flex-col pb-0 pt-[18px]">
                            <div className="h-[80px] shrink-0" aria-hidden="true" />

                            {/* Правый верхний блок с текстовкой, как в исходном варианте */}
                            <div
                                className="absolute right-0 z-20 flex min-w-0 max-w-[585px] flex-col items-end text-right"
                                style={{ top: HERO_RIGHT_BLOCK_TOP, width: "min(585px, 32.81vw)" }}
                            >
                                {/*<div className="rounded-[22px] bg-black/25 px-5 py-4 backdrop-blur-sm w-full min-w-0">
                                <h1
                                    className="uppercase text-white"
                                    style={{
                                        fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
                                        fontSize: "clamp(29px, 1.68vw, 30px)",
                                        fontWeight: 700,
                                        letterSpacing: "0.08em",
                                        lineHeight: 1.25,
                                    }}
                                >
                                    РАССЧИТАНО НА НАГРУЗКУ
                                </h1>
                                <p
                                    className="mt-3 text-white/90"
                                    style={{
                                        fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
                                        fontSize: "clamp(25px, 0.94vw, 25px)",
                                        fontWeight: 400,
                                        lineHeight: 1.45,
                                    }}
                                >
                                    Конструкция, рассчитанная на нагрузку: гибридная подошва, усиленные узлы и современные материалы для защиты и комфорта на дистанции.
                                </p>
                                </div>*/}
                            </div>

                            {/* Слева — новая модель, кнопка */}
                            <div className="relative z-30 flex min-h-0 flex-1 items-start justify-between gap-[clamp(24px,4vw,64px)]">
                                <div
                                    className="flex max-w-[853px] flex-col"
                                    style={{ marginTop: HERO_LEFT_BLOCK_MARGIN_TOP }}
                                >
                                    <div className="rounded-[22px] bg-black/25 px-5 py-4 backdrop-blur-sm">
                                    <h2
                                        className="whitespace-nowrap uppercase text-white"
                                        style={{
                                            fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
                                            fontSize: "clamp(29px, 1.68vw, 30px)",
                                            fontWeight: 700,
                                            letterSpacing: "0.08em",
                                            lineHeight: 1.25,
                                        }}
                                    >
                                        НОВЫЕ МОДЕЛИ VELESBRON
                                    </h2>
                                    <div className="mt-4 flex">
                                        {[
                                            "/images/models/ui/IMG_2384 с лого 500_500.png",
                                            "/images/models/ui/IMG_2396_500_500.png",
                                            "/images/models/ui/IMG_8761_500_500.png",
                                            "/images/models/ui/mpphoto_qadrat.png",
                                        ].map((src, idx) => (
                                            <div
                                                key={src}
                                                className={`flex h-[86px] w-[86px] items-center justify-center overflow-hidden rounded-full border-[0.5px] border-white/80 bg-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.35)] ${
                                                    idx === 0 ? "" : "-ml-1"
                                                }`}
                                            >
                                                <img
                                                    src={src}
                                                    alt={`Миниатюра модели ${idx + 1}`}
                                                    className="h-[80px] w-[80px] object-contain"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p
                                        className="mt-3 text-white/90"
                                        style={{
                                            fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
                                            fontSize: "clamp(25px, 0.94vw, 25px)",
                                            fontWeight: 400,
                                            lineHeight: 1.45,
                                        }}
                                    >
                                        Гибридная подошва с антипрокольной защитой, мембрана VELTEX™ и продуманная конструкция моделей создают уверенность в каждом шаге.
                                    </p>
                                    </div>
                                    <Link
                                        href="/models"
                                        className="mt-4 inline-flex h-[75px] w-[260px] shrink-0 items-center justify-center rounded-[22px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[19px] font-medium uppercase tracking-[0.08em] text-white"
                                        style={{ fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif", fontWeight: 400 }}
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
                                style={{ top: "calc(100dvh - 35px)" }}
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
                className="pointer-events-none hidden min-[1200px]:flex absolute left-1/2 z-[50] h-[125px] min-h-[125px] w-full max-w-[1280px] -translate-x-1/2 items-stretch justify-center gap-0 rounded-[22px] bg-white/85 px-[clamp(8px,1.2vw,24px)] py-6 shadow-[0_18px_40px_rgba(0,0,0,0.55),0_-6px_18px_rgba(0,0,0,0.16)] ring-1 ring-white/70"
                style={{ top: "calc(100dvh - 145px)" }}
            >
                {HERO_FEATURES_STRIP.map((item) => (
                    <div
                        key={item.title}
                        className="flex min-w-0 flex-1 items-center justify-center border-r border-[#e0e0e0] px-[clamp(12px,2.2vw,28px)] last:border-r-0"
                    >
                        <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden">
                            <img
                                src={item.icon}
                                alt=""
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <div className="flex min-w-0 flex-col items-left text-left">
                            <span
                                className="whitespace-nowrap text-[#222222] uppercase"
                                style={{
                                    fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
                                    fontSize: "clamp(13.5px, 0.86vw, 16px)",
                                    fontWeight: 700,
                                    letterSpacing: "0.04em",
                                    lineHeight: 1.2,
                                }}
                            >
                                {item.title}
                            </span>
                            <span
                                className="mt-4 text-[#6b6b6b]"
                                style={{
                                    fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
                                    fontSize: "clamp(13.8px, 0.81vw, 16px)",
                                    fontWeight: 400,
                                    lineHeight: 1.5,
                                }}
                            >
                                {item.desc}
                            </span>
                        </div>
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
                <div className="min-[1200px]:bg-white min-[1200px]:pt-[70px]">
                    <AdvantagesContent showHeader={false} />
                </div>
            </section>
        </main>
    );
}
