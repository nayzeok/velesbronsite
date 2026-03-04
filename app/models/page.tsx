"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/layout/SiteHeader";

const DESIGN_HEIGHT = 1000;
const MOBILE_DESIGN_WIDTH = 741;
const MOBILE_DESIGN_HEIGHT = 1716;
const MOBILE_SCROLL_EXTRA = 48;

/** Отступ между заголовком «МОДЕЛЬ» и квадратами выбора (px). */
const DESKTOP_MODEL_HEADING_GAP = 5;
/** Отступ между блоком МОДЕЛЬ и блоком ЦВЕТ: top заголовка «ЦВЕТ» (px). Увеличить — больше промежуток. */
const DESKTOP_COLOR_TOP = 457;
/** Отступ между заголовком «ЦВЕТ» и квадратами цветов (px). */
const DESKTOP_COLOR_HEADING_GAP = 5;

/** Отступ между заголовком «МОДЕЛЬ» и квадратами на мобиле (px). */
const MOBILE_MODEL_HEADING_GAP = 16;
/** Блок ЦВЕТ на мобиле: top заголовка (px). Чем больше — тем больше отступ от блока МОДЕЛЬ. */
const MOBILE_COLOR_TOP = 452;
/** Отступ между заголовком «ЦВЕТ» и квадратами на мобиле (px). */
const MOBILE_COLOR_HEADING_GAP = 40;

/** Масштаб фото ботинка по ракурсам: ПК. Высокая модель — 5 ракурсов [0..4], низкая — 4 [0..3], для низкой берётся scale[0..3]. */
const BOOT_IMAGE_SCALE_DESKTOP_BY_VIEW = [1.5, 1, 1.3, 1.3, 1.05];
/** Масштаб фото ботинка по ракурсам: мобильная. */
const BOOT_IMAGE_SCALE_MOBILE_BY_VIEW = [1, 1, 1, 1, 1];

const backgroundShape = "/images/models/ui/background-shape.png";

/** Ширина контейнера десктоп (px), для расчёта отступов в % */
const DESKTOP_STAGE_WIDTH = 1670;
/** Отступ левого блока от края в % ширины — при сужении экрана сохраняется */
const DESKTOP_LEFT_MARGIN_PCT = (71 / DESKTOP_STAGE_WIDTH) * 100;
/** Позиция центра правого блока в % от левого края — при сужении экрана сохраняется */
const DESKTOP_RIGHT_CENTER_PCT = (1487 / DESKTOP_STAGE_WIDTH) * 100;

/** Карусель десктоп: видно 4 карточки, размер карточек без изменений */
const CAROUSEL_DESKTOP_CARD_WIDTH = 161;
const CAROUSEL_DESKTOP_CARD_HEIGHT = 194;
const CAROUSEL_DESKTOP_GAP = 12;
const CAROUSEL_DESKTOP_WIDTH = CAROUSEL_DESKTOP_CARD_WIDTH * 4 + CAROUSEL_DESKTOP_GAP * 3;
const CAROUSEL_DESKTOP_SCROLL = CAROUSEL_DESKTOP_CARD_WIDTH + CAROUSEL_DESKTOP_GAP;

type ColorVariant = "black" | "oliva";
type ModelKey = "high" | "low";

const MODEL_OPTIONS: { key: ModelKey; label: string; description: string }[] = [
  {
    key: "high",
    label: "Высокая",
    description:
      "Высокая модель обеспечивает усиленную фиксацию голеностопа и стабильность шага на смешанных покрытиях. Подходит для активной эксплуатации в городе, на объекте и в полевых условиях.",
  },
  {
    key: "low",
    label: "Низкая",
    description:
      "Низкая модель легче по ощущениям и дает больше свободы движения при длительной носке. Оптимальный выбор для городского ритма, маршрутов с высокой подвижностью и повседневной нагрузки.",
  },
];

const MODEL_IMAGES: Record<ModelKey, { black: string[]; oliva?: string[] }> = {
  high: {
    black: [
      "/images/models/views/models/2sk/black/1.png",
      "/images/models/views/models/2sk/black/2.png",
      "/images/models/views/models/2sk/black/3.png",
      "/images/models/views/models/2sk/black/4.png",
      "/images/models/views/models/2sk/black/5.png",
    ],
    oliva: [
      "/images/models/views/models/2sk/oliva/1.png",
      "/images/models/views/models/2sk/oliva/2.png",
      "/images/models/views/models/2sk/oliva/3.png",
      "/images/models/views/models/2sk/oliva/4.png",
      "/images/models/views/models/2sk/oliva/5.png",
    ],
  },
  low: {
    black: [
      "/images/models/views/models/2n/black/1.png",
      "/images/models/views/models/2n/black/2.png",
      "/images/models/views/models/2n/black/3.png",
      "/images/models/views/models/2n/black/4.png",
    ],
  },
};

const SIZE_GRID_ROWS = [
  { size: "39", insole: "26,0", foot: "24,5 - 25,0" },
  { size: "40", insole: "26,5", foot: "25,1 - 25,6" },
  { size: "41", insole: "27,2", foot: "25,7 - 26,2" },
  { size: "42", insole: "27,8", foot: "26,3 - 26,9" },
  { size: "43", insole: "28,5", foot: "27,0 - 27,6" },
  { size: "44", insole: "29,2", foot: "27,7 - 28,2" },
  { size: "45", insole: "29,6", foot: "28,1 - 28,6" },
  { size: "46", insole: "30,2", foot: "28,7 - 29,2" },
  { size: "47", insole: "30,8", foot: "29,3 - 29,8" },
] as const;

export default function BuyPage() {
  const [colorVariant, setColorVariant] = useState<ColorVariant>("black");
  const [activeModelKey, setActiveModelKey] = useState<ModelKey>("high");
  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const [isSizeGridOpen, setIsSizeGridOpen] = useState(false);
  const [isSizeGridVisible, setIsSizeGridVisible] = useState(false);
  const [showLowComingSoon, setShowLowComingSoon] = useState(false);
  const [desktopRailCursor, setDesktopRailCursor] = useState<"left" | "right" | "grab">("grab");
  const [isDesktopRailHover, setIsDesktopRailHover] = useState(false);
  const desktopRailRef = useRef<HTMLDivElement | null>(null);
  const mobileRailRef = useRef<HTMLDivElement | null>(null);
  const sizeGridCloseTimerRef = useRef<number | null>(null);
  const desktopRailDragRef = useRef({ isDragging: false, startX: 0, startScrollLeft: 0 });
  const mobileRailDragRef = useRef({ isDragging: false, startX: 0, startScrollLeft: 0 });
  const railDidDragRef = useRef(false);
  const stageHeightFitScale = `min(1, calc(100dvh / ${DESIGN_HEIGHT}px))`;
  const selectedModel = MODEL_OPTIONS.find((item) => item.key === activeModelKey) ?? MODEL_OPTIONS[0];
  const modelImagesByColor = MODEL_IMAGES[activeModelKey];
  const activeViewImages = (modelImagesByColor[colorVariant] && modelImagesByColor[colorVariant]!.length > 0)
    ? modelImagesByColor[colorVariant]!
    : modelImagesByColor.black;
  const currentViewImage = activeViewImages[activeViewIndex] ?? activeViewImages[0];

  const [desktopRailDragging, setDesktopRailDragging] = useState(false);
  const [mobileRailDragging, setMobileRailDragging] = useState(false);

  useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveViewIndex(0);
  }, [activeModelKey, colorVariant]);

  useEffect(() => {
    if (!desktopRailDragging) return;
    const move = (e: MouseEvent) => {
      const el = desktopRailRef.current;
      if (!el) return;
      const ref = desktopRailDragRef.current;
      railDidDragRef.current = true;
      const deltaX = ref.startX - e.clientX;
      el.scrollLeft = ref.startScrollLeft + deltaX;
      ref.startX = e.clientX;
      ref.startScrollLeft = el.scrollLeft;
    };
    const up = () => {
      setDesktopRailDragging(false);
      setTimeout(() => { railDidDragRef.current = false; }, 0);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
  }, [desktopRailDragging]);

  useEffect(() => {
    if (!mobileRailDragging) return;
    const move = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const el = mobileRailRef.current;
      if (!el) return;
      const ref = mobileRailDragRef.current;
      const touchX = e.touches[0].clientX;
      railDidDragRef.current = true;
      const deltaX = ref.startX - touchX;
      el.scrollLeft = ref.startScrollLeft + deltaX;
      ref.startX = touchX;
      ref.startScrollLeft = el.scrollLeft;
      e.preventDefault();
    };
    const up = () => {
      setMobileRailDragging(false);
      setTimeout(() => { railDidDragRef.current = false; }, 0);
    };
    document.addEventListener("touchmove", move, { passive: false });
    document.addEventListener("touchend", up);
    return () => {
      document.removeEventListener("touchmove", move);
      document.removeEventListener("touchend", up);
    };
  }, [mobileRailDragging]);

  useEffect(() => {
    if (!isSizeGridOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSizeGridOpen]);

  useEffect(() => {
    return () => {
      if (sizeGridCloseTimerRef.current) {
        window.clearTimeout(sizeGridCloseTimerRef.current);
      }
    };
  }, []);

  const openSizeGrid = () => {
    if (sizeGridCloseTimerRef.current) {
      window.clearTimeout(sizeGridCloseTimerRef.current);
      sizeGridCloseTimerRef.current = null;
    }
    setIsSizeGridOpen(true);
    requestAnimationFrame(() => setIsSizeGridVisible(true));
  };

  const closeSizeGrid = () => {
    setIsSizeGridVisible(false);
    sizeGridCloseTimerRef.current = window.setTimeout(() => {
      setIsSizeGridOpen(false);
      sizeGridCloseTimerRef.current = null;
    }, 220);
  };

  return (
    <main className="figma-site-page overflow-x-hidden overflow-y-auto bg-[#d9d9d9] text-[#111] min-[1200px]:overflow-hidden">
      {showLowComingSoon && (
        <div
          className="fixed left-1/2 top-[20%] z-[100] -translate-x-1/2 rounded-[12px] bg-[#111] px-6 py-3 text-center text-white shadow-lg"
          style={{ fontFamily: "var(--font-roboto-flex), sans-serif", fontSize: 16 }}
        >
          Ожидается поступление
        </div>
      )}

      {/* ── DESKTOP ── */}
      <section
        className="figma-site-stage relative mx-auto hidden h-[100dvh] w-full overflow-hidden bg-white min-[1200px]:block"
        style={{ ["--figma-stage-height" as string]: "100dvh" }}
      >
        <div className="relative mx-auto h-[100dvh] w-full max-w-[1670px] overflow-hidden">
          <SiteHeader className="absolute left-0 right-0 top-0 z-20 h-[96px] w-full" />
          <div
            className="absolute inset-x-0 top-0 h-[1000px] origin-top"
            style={{ transform: `scale(${stageHeightFitScale})` }}
          >

            {/* Glass strips */}
            <div className="pointer-events-none absolute inset-0">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="absolute inset-y-0" style={{ left: `${(i * 100) / 14}%`, width: `${100 / 14}%` }}>
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(-90deg, rgba(255,255,255,0.008) 20%, rgba(40,40,40,0.093) 75.758%, rgba(255,255,255,0.008) 123.64%)",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${backgroundShape})`,
                      backgroundSize: "832px 832px",
                      backgroundPosition: "top left",
                      filter: "blur(90px)",
                      opacity: 0.03,
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="h-[96px] shrink-0" aria-hidden="true" />

            {/* Left — model name + description */}
            <div className="absolute" style={{ left: `${DESKTOP_LEFT_MARGIN_PCT}%`, top: 186 }}>
              <h1
                className="uppercase"
                style={{
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                  fontSize: 34,
                  fontWeight: 700,
                  lineHeight: "normal",
                  color: "#111",
                  letterSpacing: "0.08em",
                }}
              >
                {`МОДЕЛЬ ${selectedModel.label.toUpperCase()}`}
              </h1>
              <p
                className="absolute"
                style={{
                  top: 88,
                  left: 0,
                  width: 408,
                  fontFamily: "var(--font-roboto-flex), sans-serif",
                  fontSize: 20,
                  fontWeight: 500,
                  lineHeight: 1.45,
                  color: "#111",
                }}
              >
                {selectedModel.description}
              </p>
            </div>

            {/* Center — boot image (масштаб через BOOT_IMAGE_SCALE_DESKTOP), по центру экрана */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 origin-center"
              style={{
                width: 746,
                height: 609,
                transform: `translate(-50%, calc(-50% - 28px)) scale(${BOOT_IMAGE_SCALE_DESKTOP_BY_VIEW[activeViewIndex] ?? 1})`,
              }}
            >
              <img
                key={`${activeModelKey}-${colorVariant}-${activeViewIndex}`}
                src={currentViewImage}
                alt="Тактическая обувь"
                className="h-full w-full animate-view-rise object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,0.12)]"
              />
            </div>

            <div className="absolute inset-0" style={{ transform: "translateY(-90px)" }}>
              {/* Size grid link — подчёркнутый текст, при наведении заливка оранжевым слева направо */}
              <button
                type="button"
                onClick={openSizeGrid}
                className="size-table-link absolute"
                style={{
                  left: `${DESKTOP_RIGHT_CENTER_PCT}%`,
                  top: 656,
                  transform: "translateX(-50%)",
                  fontSize: 26,
                }}
                aria-label="Открыть таблицу размеров"
              >
                <span className="size-table-link__base">Таблица размеров</span>
                <span className="size-table-link__hover" aria-hidden="true">
                  Таблица размеров
                </span>
              </button>

              {/* Right — МОДЕЛЬ (заголовок и квадраты) */}
              <div
                className="absolute flex flex-col items-center"
                style={{
                  left: `${DESKTOP_RIGHT_CENTER_PCT}%`,
                  top: 269,
                  transform: "translateX(-50%)",
                  gap: DESKTOP_MODEL_HEADING_GAP,
                }}
              >
                <p
                  className="uppercase"
                  style={{
                    fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                    fontSize: 34,
                    fontWeight: 700,
                    color: "#111",
                    letterSpacing: "0.08em",
                  }}
                >
                  МОДЕЛЬ
                </p>
                <div className="flex gap-[46px]">
                {MODEL_OPTIONS.map((model) => {
                  const colW = model.key === "high" ? 76 : 74;
                  const isLow = model.key === "low";
                  return (
                    <div key={`desktop-model-col-${model.key}`} className="flex flex-col items-center gap-4" style={{ width: colW, minWidth: colW }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (isLow) {
                            setShowLowComingSoon(true);
                            window.setTimeout(() => setShowLowComingSoon(false), 2500);
                          } else {
                            setActiveModelKey(model.key);
                          }
                        }}
                        className="shrink-0 overflow-hidden rounded-[8px] bg-white p-[4px] transition-all"
                        style={{
                          width: colW,
                          height: 75,
                          border: activeModelKey === model.key ? "2px solid #f07426" : "2px solid #e0e0e0",
                          cursor: isLow ? "default" : "pointer",
                          opacity: isLow ? 0.85 : 1,
                        }}
                      >
                        <img src={MODEL_IMAGES[model.key].black[0]} alt={model.label} className="h-full w-full object-contain" />
                      </button>
                      <p
                        className="flex min-w-0 w-full justify-center uppercase"
                        style={{
                          margin: 0,
                          padding: 0,
                          fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                          fontSize: 17,
                          fontWeight: 700,
                          color: activeModelKey === model.key ? "#f07426" : isLow ? "#9a9a9a" : "#9a9a9a",
                          textDecoration: activeModelKey === model.key ? "underline" : "none",
                        }}
                      >
                        {model.label}
                      </p>
                    </div>
                  );
                })}
                </div>
              </div>

              {/* Right — ЦВЕТ (заголовок и квадраты в одном блоке) */}
              <div
                className="absolute flex flex-col items-center"
                style={{
                  left: `${DESKTOP_RIGHT_CENTER_PCT}%`,
                  top: DESKTOP_COLOR_TOP,
                  transform: "translateX(-50%)",
                  gap: DESKTOP_COLOR_HEADING_GAP,
                }}
              >
                <p
                  className="uppercase"
                  style={{
                    fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                    fontSize: 34,
                    fontWeight: 700,
                    color: "#111",
                    letterSpacing: "0.08em",
                  }}
                >
                  ЦВЕТ
                </p>
                <div className="flex gap-[46px]">
                <div className="flex flex-col items-center gap-4" style={{ width: 76, minWidth: 76 }}>
                  <button
                    type="button"
                    onClick={() => setColorVariant("black")}
                    className="shrink-0 rounded-[8px] transition-all"
                    style={{
                      width: 76,
                      height: 75,
                      backgroundColor: "#191919",
                      border: colorVariant === "black" ? "2px solid #f07426" : "2px solid #e0e0e0",
                    }}
                  />
                  <p
                    className="flex min-w-0 w-full justify-center uppercase"
                    style={{
                      margin: 0,
                      padding: 0,
                      fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                      fontSize: 17,
                      fontWeight: 700,
                      color: colorVariant === "black" ? "#f07426" : "#9a9a9a",
                      textDecoration: colorVariant === "black" ? "underline" : "none",
                    }}
                  >
                    ЧЕРНЫЙ
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4" style={{ width: 74, minWidth: 74 }}>
                  <button
                    type="button"
                    onClick={() => setColorVariant("oliva")}
                    className="shrink-0 rounded-[8px] transition-all"
                    style={{
                      width: 74,
                      height: 75,
                      backgroundColor: "#686248",
                      border: colorVariant === "oliva" ? "2px solid #f07426" : "2px solid #e0e0e0",
                    }}
                  />
                  <p
                    className="flex min-w-0 w-full justify-center uppercase"
                    style={{
                      margin: 0,
                      padding: 0,
                      fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                      fontSize: 17,
                      fontWeight: 700,
                      color: colorVariant === "oliva" ? "#f07426" : "#9a9a9a",
                      textDecoration: colorVariant === "oliva" ? "underline" : "none",
                    }}
                  >
                    ОЛИВА
                  </p>
                </div>
                </div>
              </div>

              {/* Buy button */}
              <button
                type="button"
                className="absolute"
                style={{
                  left: `${DESKTOP_RIGHT_CENTER_PCT}%`,
                  top: 754,
                  transform: "translateX(-50%)",
                  width: 224,
                  height: 72,
                  background: "linear-gradient(180deg, #E7813F 0%, #FC6407 100%)",
                  borderRadius: 16,
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "0.08em",
                }}
              >
                Где Купить
              </button>
            </div>

            {/* Bottom photo cards — 4 карточки в видимой области, перетаскивание */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: 739,
                width: CAROUSEL_DESKTOP_WIDTH,
                cursor: desktopRailDragging ? "grabbing" : desktopRailCursor === "left" ? "w-resize" : desktopRailCursor === "right" ? "e-resize" : "grab",
              }}
              onMouseEnter={() => setIsDesktopRailHover(true)}
              onMouseMove={(event) => {
                if (desktopRailDragging) return;
                const rect = event.currentTarget.getBoundingClientRect();
                const x = event.clientX - rect.left;
                if (x < 80) {
                  setDesktopRailCursor("left");
                  return;
                }
                if (x > rect.width - 80) {
                  setDesktopRailCursor("right");
                  return;
                }
                setDesktopRailCursor("grab");
              }}
              onMouseLeave={() => {
                setDesktopRailCursor("grab");
                setIsDesktopRailHover(false);
              }}
            >
              <div
                className="pointer-events-none absolute left-0 top-0 z-[9] rounded-l-[16px] transition-opacity duration-200"
                style={{
                  width: 70,
                  height: CAROUSEL_DESKTOP_CARD_HEIGHT,
                  opacity: isDesktopRailHover && desktopRailCursor === "left" ? 1 : 0,
                  background:
                    "linear-gradient(90deg, rgba(240,116,38,0.26) 0%, rgba(240,116,38,0.12) 48%, rgba(240,116,38,0) 100%)",
                }}
              />
              <div
                className="pointer-events-none absolute right-0 top-0 z-[9] rounded-r-[16px] transition-opacity duration-200"
                style={{
                  width: 70,
                  height: CAROUSEL_DESKTOP_CARD_HEIGHT,
                  opacity: isDesktopRailHover && desktopRailCursor === "right" ? 1 : 0,
                  background:
                    "linear-gradient(270deg, rgba(240,116,38,0.26) 0%, rgba(240,116,38,0.12) 48%, rgba(240,116,38,0) 100%)",
                }}
              />
              <div
                ref={desktopRailRef}
                className="scrollbar-hide flex overflow-x-auto pb-2 pr-2 select-none"
                style={{
                  gap: CAROUSEL_DESKTOP_GAP,
                  scrollBehavior: desktopRailDragging ? "auto" : "smooth",
                  userSelect: desktopRailDragging ? "none" : undefined,
                }}
                onMouseDown={(e) => {
                  if (e.button !== 0) return;
                  desktopRailDragRef.current = {
                    isDragging: true,
                    startX: e.clientX,
                    startScrollLeft: desktopRailRef.current?.scrollLeft ?? 0,
                  };
                  setDesktopRailDragging(true);
                }}
              >
                {activeViewImages.map((image, i) => (
                  <button
                    key={`desktop-view-${i}`}
                    type="button"
                    onClick={() => {
                      if (railDidDragRef.current) {
                        railDidDragRef.current = false;
                        return;
                      }
                      setActiveViewIndex(i);
                    }}
                    className="shrink-0 overflow-hidden rounded-[16px] transition-all"
                    style={{
                      width: CAROUSEL_DESKTOP_CARD_WIDTH,
                      height: CAROUSEL_DESKTOP_CARD_HEIGHT,
                      background: "#eceef0",
                      border: activeViewIndex === i ? "3px solid #f07426" : "1px solid rgba(0,0,0,0.04)",
                      cursor: desktopRailDragging ? "grabbing" : "pointer",
                    }}
                  >
                    <img src={image} alt="" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                aria-label="Прокрутить фото влево"
                onClick={() => desktopRailRef.current?.scrollBy({ left: -CAROUSEL_DESKTOP_SCROLL, behavior: "smooth" })}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-r-[12px] bg-white/80 px-3 py-6 text-[#111] shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition hover:bg-white"
                style={{ cursor: "w-resize" }}
              >
                <span className="text-[24px] leading-none">‹</span>
              </button>
              <button
                type="button"
                aria-label="Прокрутить фото вправо"
                onClick={() => desktopRailRef.current?.scrollBy({ left: CAROUSEL_DESKTOP_SCROLL, behavior: "smooth" })}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-l-[12px] bg-white/80 px-3 py-6 text-[#111] shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition hover:bg-white"
                style={{ cursor: "e-resize" }}
              >
                <span className="text-[24px] leading-none">›</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── MOBILE ── */}
      <section className="min-[1200px]:hidden">
        <div
          className="relative w-full overflow-hidden bg-white"
          style={{
            ["--mobile-scale" as string]: `min(1, calc(100vw / ${MOBILE_DESIGN_WIDTH}px))`,
            height: `calc(${MOBILE_DESIGN_HEIGHT}px * var(--mobile-scale) + ${MOBILE_SCROLL_EXTRA}px)`,
          }}
        >
          <div
            className="absolute left-0 top-0 h-[1716px] w-[741px] origin-top-left bg-white"
            style={{ transform: "scale(var(--mobile-scale))" }}
          >
            <div className="pointer-events-none absolute left-[-1px] top-0 h-[1716px] w-[743px]">
              {Array.from({ length: 10 }).map((_, offset) => {
                const i = offset + 2;
                return (
                <div key={i} className="absolute inset-y-0" style={{ left: `${(i * 100) / 14}%`, width: `${100 / 14}%` }}>
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(-90deg, rgba(255,255,255,0.008) 20%, rgba(40,40,40,0.093) 75.758%, rgba(255,255,255,0.008) 123.64%)",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${backgroundShape})`,
                      backgroundSize: "832px 832px",
                      backgroundPosition: "top left",
                      filter: "blur(90px)",
                      opacity: 0.03,
                    }}
                  />
                </div>
                );
              })}
            </div>
            <div className="pointer-events-none absolute right-0 top-0 h-[1716px] w-[10px] bg-white" />

            <div className="absolute left-[21px] top-[90px] flex h-[8px] w-[34px] items-center justify-between">
              <span className="size-[8px] rounded-full bg-[#111]/35" />
              <span className="size-[8px] rounded-full bg-[#111]/20" />
              <span className="size-[8px] rounded-full bg-[#111]/12" />
            </div>

            <h1
              className="absolute left-[74px] top-[59px] uppercase"
              style={{
                fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                fontSize: 21,
                fontWeight: 700,
                color: "#111",
                letterSpacing: "0.08em",
              }}
            >
              {`МОДЕЛЬ ${selectedModel.label.toUpperCase()}`}
            </h1>

            <p
              className="absolute left-[74px] top-[147px] w-[408px]"
              style={{
                fontFamily: "var(--font-roboto-flex), sans-serif",
                fontSize: 20,
                fontWeight: 500,
                lineHeight: 1.28,
                color: "#111",
              }}
            >
              {selectedModel.description}
            </p>

            <button
              type="button"
              onClick={openSizeGrid}
              className="size-table-link absolute left-[70px] top-[764px]"
              style={{ fontSize: 26 }}
              aria-label="Открыть таблицу размеров"
            >
              <span className="size-table-link__base">Таблица размеров</span>
              <span className="size-table-link__hover" aria-hidden="true">
                Таблица размеров
              </span>
            </button>

            <div
              className="absolute left-[70px] top-[452px] flex flex-col"
              style={{ gap: MOBILE_MODEL_HEADING_GAP }}
            >
              <p
                className="uppercase"
                style={{
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                  fontSize: 21,
                  fontWeight: 700,
                  color: "#111",
                  letterSpacing: "0.08em",
                }}
              >
                МОДЕЛЬ
              </p>
              <div className="flex gap-[24px]">
              {MODEL_OPTIONS.map((model) => {
                const colW = model.key === "high" ? 96 : 94;
                const isLow = model.key === "low";
                return (
                  <div key={`mobile-model-col-${model.key}`} className="flex flex-col items-center gap-3" style={{ width: colW, minWidth: colW }}>
                    <button
                      type="button"
                      onClick={() => {
                        if (isLow) {
                          setShowLowComingSoon(true);
                          window.setTimeout(() => setShowLowComingSoon(false), 2500);
                        } else {
                          setActiveModelKey(model.key);
                        }
                      }}
                      className="shrink-0 overflow-hidden rounded-[8px] bg-white p-[4px] transition-all"
                      style={{
                        width: colW,
                        height: 95,
                        border: activeModelKey === model.key ? "2px solid #f07426" : "1px solid #9a9a9a",
                        cursor: isLow ? "default" : "pointer",
                        opacity: isLow ? 0.85 : 1,
                      }}
                    >
                      <img src={MODEL_IMAGES[model.key].black[0]} alt={model.label} className="h-full w-full object-contain" />
                    </button>
                    <p
                      className="flex min-w-0 w-full justify-center uppercase"
                      style={{
                        margin: 0,
                        padding: 0,
                        fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                        fontSize: 19,
                        fontWeight: 700,
                        color: activeModelKey === model.key ? "#f07426" : "#9a9a9a",
                        textDecoration: activeModelKey === model.key ? "underline" : "none",
                      }}
                    >
                      {model.label}
                    </p>
                  </div>
                );
              })}
              </div>
            </div>

            <div
              className="absolute left-[398px] flex flex-col"
              style={{ top: MOBILE_COLOR_TOP, gap: MOBILE_COLOR_HEADING_GAP }}
            >
              <p
                className="uppercase"
                style={{
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                  fontSize: 21,
                  fontWeight: 700,
                  color: "#111",
                  letterSpacing: "0.08em",
                }}
              >
                ЦВЕТ
              </p>
              <div className="flex gap-[20px]">
              {(["black", "oliva"] as ColorVariant[]).map((v) => {
                const colW = v === "black" ? 96 : 94;
                return (
                  <div key={v} className="flex flex-col items-center gap-3" style={{ width: colW, minWidth: colW }}>
                    <button
                      type="button"
                      onClick={() => setColorVariant(v)}
                      className="shrink-0 rounded-[8px] transition-all"
                      style={{
                        width: colW,
                        height: 95,
                        backgroundColor: v === "black" ? "#191919" : "#686248",
                        border: colorVariant === v ? "2px solid #f07426" : "1px solid #9a9a9a",
                      }}
                    />
                    <p
                      className="flex min-w-0 w-full justify-center uppercase"
                      style={{
                        margin: 0,
                        padding: 0,
                        fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                        fontSize: 19,
                        fontWeight: 700,
                        color: colorVariant === v ? "#f07426" : "#9a9a9a",
                        textDecoration: colorVariant === v ? "underline" : "none",
                      }}
                    >
                      {v === "black" ? "ЧЕРНЫЙ" : "ОЛИВА"}
                    </p>
                  </div>
                );
              })}
              </div>
            </div>

            <button
              type="button"
              className="absolute left-[398px] top-[852px] h-[72px] w-[248px] rounded-[16px] text-[26px] text-white"
              style={{
                background: "linear-gradient(180deg, #E7813F 0%, #FC6407 100%)",
                fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              Купить
            </button>

            {/* Текущее фото ботинка (мобильная). Масштаб через BOOT_IMAGE_SCALE_MOBILE, по центру экрана. */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 origin-center"
              style={{
                width: 741,
                height: 944,
                transform: `translate(-50%, calc(-50% - 28px)) scale(${BOOT_IMAGE_SCALE_MOBILE_BY_VIEW[activeViewIndex] ?? 1})`,
              }}
            >
              <img
                key={`mobile-${activeModelKey}-${colorVariant}-${activeViewIndex}`}
                src={currentViewImage}
                alt="Тактическая обувь"
                className="h-full w-full animate-view-rise object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.18)]"
              />
            </div>

            <div className="absolute left-1/2 top-[1592px] w-[578px] -translate-x-1/2">
              <div
                ref={mobileRailRef}
                className="scrollbar-hide flex gap-[10px] overflow-x-auto pb-3 pr-3"
                style={{ scrollBehavior: mobileRailDragging ? "auto" : "smooth", touchAction: "pan-y" }}
                onTouchStart={(e) => {
                  if (e.touches.length !== 1) return;
                  mobileRailDragRef.current = {
                    isDragging: true,
                    startX: e.touches[0].clientX,
                    startScrollLeft: mobileRailRef.current?.scrollLeft ?? 0,
                  };
                  setMobileRailDragging(true);
                }}
              >
                {activeViewImages.map((image, i) => (
                  <button
                    key={`mobile-view-${i}`}
                    type="button"
                    onClick={() => {
                      if (railDidDragRef.current) {
                        railDidDragRef.current = false;
                        return;
                      }
                      setActiveViewIndex(i);
                    }}
                    className="h-[186px] w-[140px] shrink-0 overflow-hidden rounded-[20px] bg-[#eceef0] transition-all"
                    style={{ border: activeViewIndex === i ? "3px solid #f07426" : "1px solid rgba(0,0,0,0.04)" }}
                  >
                    <img src={image} alt="" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                aria-label="Прокрутить фото влево"
                onClick={() => mobileRailRef.current?.scrollBy({ left: -196, behavior: "smooth" })}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-r-[12px] bg-white/85 px-2.5 py-4 text-[#111] shadow-[0_6px_20px_rgba(0,0,0,0.16)]"
                style={{ cursor: "w-resize" }}
              >
                <span className="text-[22px] leading-none">‹</span>
              </button>
              <button
                type="button"
                aria-label="Прокрутить фото вправо"
                onClick={() => mobileRailRef.current?.scrollBy({ left: 196, behavior: "smooth" })}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-l-[12px] bg-white/85 px-2.5 py-4 text-[#111] shadow-[0_6px_20px_rgba(0,0,0,0.16)]"
                style={{ cursor: "e-resize" }}
              >
                <span className="text-[22px] leading-none">›</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {isSizeGridOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
          <div
            className={`absolute inset-0 bg-black/55 transition-opacity duration-200 ${isSizeGridVisible ? "opacity-100" : "opacity-0"}`}
            onClick={closeSizeGrid}
          />
          <div
            className={`relative z-[91] max-h-[84dvh] w-auto max-w-[min(94vw,760px)] overflow-hidden rounded-[18px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.25)] transition-all duration-200 ${
              isSizeGridVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#ececec] px-5 py-4 min-[1200px]:px-7">
              <h3
                className="uppercase text-[#111]"
                style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontSize: 24, fontWeight: 700, letterSpacing: "0.08em" }}
              >
                Размерная сетка
              </h3>
              <button
                type="button"
                aria-label="Закрыть таблицу размеров"
                onClick={closeSizeGrid}
                className="flex size-9 items-center justify-center rounded-[10px] bg-[#f4f4f4] text-[#111]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="max-h-[calc(84dvh-78px)] overflow-auto">
              <table className="w-full table-fixed border-collapse text-left min-[1200px]:w-auto min-[1200px]:min-w-[640px]">
                <colgroup>
                  <col className="w-[72px] min-[1200px]:w-[92px]" />
                  <col className="w-[118px] min-[1200px]:w-[180px]" />
                  <col />
                </colgroup>
                <thead className="sticky top-0 bg-[#f7f7f7]">
                  <tr>
                    <th className="border-b border-[#ececec] px-2 py-2.5 text-center text-[11px] font-semibold leading-[1.15] text-[#666] min-[1200px]:px-6 min-[1200px]:py-3.5 min-[1200px]:text-[13px]">
                      Размер
                    </th>
                    <th className="border-b border-[#ececec] px-2 py-2.5 text-center text-[11px] font-semibold leading-[1.15] text-[#666] min-[1200px]:px-6 min-[1200px]:py-3.5 min-[1200px]:text-[13px]">
                      Длина стельки, см
                    </th>
                    <th className="border-b border-[#ececec] px-2 py-2.5 text-center text-[11px] font-semibold leading-[1.15] text-[#666] min-[1200px]:px-6 min-[1200px]:py-3.5 min-[1200px]:text-[13px]">
                      Рекомендуемая длина стопы, см
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_GRID_ROWS.map((row, index) => (
                    <tr
                      key={row.size}
                      className="odd:bg-white even:bg-[#fcfcfc] transition-all duration-300"
                      style={{
                        opacity: isSizeGridVisible ? 1 : 0,
                        transform: isSizeGridVisible ? "translateY(0)" : "translateY(8px)",
                        transitionDelay: `${index * 65}ms`,
                      }}
                    >
                      <td className="border-b border-[#f0f0f0] px-2 py-2.5 text-center text-[13px] leading-[1.2] text-[#111] min-[1200px]:px-6 min-[1200px]:py-3.5 min-[1200px]:text-[15px]">{row.size}</td>
                      <td className="border-b border-[#f0f0f0] px-2 py-2.5 text-center text-[13px] leading-[1.2] text-[#111] min-[1200px]:px-6 min-[1200px]:py-3.5 min-[1200px]:text-[15px]">{row.insole}</td>
                      <td className="border-b border-[#f0f0f0] px-2 py-2.5 text-center text-[13px] leading-[1.2] text-[#111] min-[1200px]:px-6 min-[1200px]:py-3.5 min-[1200px]:text-[15px]">{row.foot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
