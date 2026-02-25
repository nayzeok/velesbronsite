"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const DESIGN_HEIGHT = 1000;
const MOBILE_DESIGN_WIDTH = 741;
const MOBILE_DESIGN_HEIGHT = 1716;
const MOBILE_SCROLL_EXTRA = 48;

const backgroundShape = "/images/models/ui/background-shape.png";

type ColorVariant = "black" | "oliva";
type ModelKey = "high" | "low";

const MODEL_OPTIONS: { key: ModelKey; label: string }[] = [
  { key: "high", label: "Высокая" },
  { key: "low", label: "Низкая" },
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
  const [mobileScale, setMobileScale] = useState(1);
  const [desktopRailCursor, setDesktopRailCursor] = useState<"left" | "right" | "grab">("grab");
  const [isDesktopRailHover, setIsDesktopRailHover] = useState(false);
  const mobileSceneRef = useRef<HTMLDivElement | null>(null);
  const desktopRailRef = useRef<HTMLDivElement | null>(null);
  const mobileRailRef = useRef<HTMLDivElement | null>(null);
  const sizeGridCloseTimerRef = useRef<number | null>(null);
  const stageHeightFitScale = `min(1, calc(100dvh / ${DESIGN_HEIGHT}px))`;
  const selectedModel = MODEL_OPTIONS.find((item) => item.key === activeModelKey) ?? MODEL_OPTIONS[0];
  const modelImagesByColor = MODEL_IMAGES[activeModelKey];
  const activeViewImages = (modelImagesByColor[colorVariant] && modelImagesByColor[colorVariant]!.length > 0)
    ? modelImagesByColor[colorVariant]!
    : modelImagesByColor.black;
  const currentViewImage = activeViewImages[activeViewIndex] ?? activeViewImages[0];

  useEffect(() => {
    setActiveViewIndex(0);
  }, [activeModelKey, colorVariant]);

  useEffect(() => {
    const node = mobileSceneRef.current;
    if (!node) return;

    const updateScale = () => {
      const width = node.clientWidth || MOBILE_DESIGN_WIDTH;
      setMobileScale(width / MOBILE_DESIGN_WIDTH);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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

      {/* ── DESKTOP ── */}
      <section
        className="figma-site-stage relative mx-auto hidden h-[100dvh] w-full overflow-hidden bg-white min-[1200px]:block"
        style={{ ["--figma-stage-height" as string]: "100dvh" }}
      >
        <div className="relative mx-auto h-[100dvh] w-full max-w-[1670px] overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-[1000px] origin-top"
            style={{ transform: `scale(${stageHeightFitScale})` }}
          >

            {/* Glass strips */}
            <div className="pointer-events-none absolute bottom-[-88px] left-[388px] top-[-88px] w-[886px]">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="absolute inset-y-0 w-[63.286px]" style={{ left: `${i * 63.286}px` }}>
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

            {/* Header */}
            <header
              className="absolute top-0 z-20 h-[96px] pt-[18px]"
              style={{
                left: 0,
                width: "100%",
                paddingLeft: "clamp(24px, 3.6vw, 61px)",
                paddingRight: "clamp(24px, 3.6vw, 61px)",
              }}
            >
              <nav className="flex items-center gap-6">
                <Link href="/" className="text-xs font-medium text-[#111]">Главная</Link>
                <span className="rounded-[10px] bg-gradient-to-r from-[#8b7a71] to-[#756257] px-5 py-3 text-xs font-medium text-white">
                  Купить
                </span>
                <Link href="/models" className="text-xs font-medium text-[#111]">Модели</Link>
                <a href="#" className="text-xs font-medium text-[#111]">О нас</a>
              </nav>

              <div className="absolute left-1/2 top-0 h-[86px] w-[175px] -translate-x-1/2 rounded-[10px] bg-white">
                <img
                  src="/images/pages/header-logo.png"
                  alt="Velesbron"
                  className="absolute left-1/2 top-[13px] h-[55px] w-[167px] -translate-x-1/2 object-contain"
                />
              </div>

              <div className="absolute top-[22px] flex items-center gap-[10px]" style={{ right: "clamp(24px, 5.7vw, 96px)" }}>
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
              </div>
            </header>

            {/* Left — model name + description */}
            <div className="absolute" style={{ left: 71, top: 186 }}>
              <h1
                className="uppercase"
                style={{
                  fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                  fontSize: 75,
                  fontWeight: 700,
                  lineHeight: "normal",
                  color: "#111",
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
                  fontFamily: "Gilroy, sans-serif",
                  fontSize: 20,
                  fontWeight: 500,
                  lineHeight: 1.45,
                  color: "#111",
                }}
              >
                Подробное описание товара с инструкциями и о том как его можно использовать. Это рыба-текст для портала или интернет-магазина, сформированное автоматически с помощью нейросети.
              </p>
            </div>

            {/* Center — boot image */}
            <div
              className="pointer-events-none absolute"
              style={{ left: 479, top: 76, width: 746, height: 609 }}
            >
              <img
                key={`${activeModelKey}-${colorVariant}-${activeViewIndex}`}
                src={currentViewImage}
                alt="Тактическая обувь"
                className="h-full w-full animate-view-rise object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,0.12)]"
              />
            </div>

            <div className="absolute inset-0" style={{ transform: "translateY(-90px)" }}>
              {/* Size grid link */}
              <button
                type="button"
                onClick={openSizeGrid}
                className="absolute rounded-[14px] px-5 py-2.5 text-white shadow-[0_8px_24px_rgba(240,116,38,0.35)] transition hover:brightness-105"
                style={{
                  left: 1465,
                  top: 624,
                  transform: "translateX(-50%)",
                  background: "linear-gradient(180deg, #E7813F 0%, #FC6407 100%)",
                  fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                  fontSize: 26,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Таблица размеров
              </button>

              {/* Right — МОДЕЛЬ */}
              <p
                className="absolute uppercase"
                style={{
                  left: 1465,
                  top: 210,
                  transform: "translateX(-50%)",
                  fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                  fontSize: 48,
                  fontWeight: 700,
                  color: "#111",
                }}
              >
                МОДЕЛЬ
              </p>
              <div className="absolute flex -translate-x-1/2" style={{ left: 1465, top: 288, gap: 46 }}>
                {MODEL_OPTIONS.map((model) => (
                  <button
                    key={`desktop-model-${model.key}`}
                    type="button"
                    onClick={() => setActiveModelKey(model.key)}
                    className="overflow-hidden rounded-[8px] bg-white p-[4px] transition-all"
                    style={{
                      width: model.key === "high" ? 76 : 74,
                      height: 75,
                      border: activeModelKey === model.key ? "2px solid #f07426" : "2px solid #e0e0e0",
                    }}
                  >
                    <img src={MODEL_IMAGES[model.key].black[0]} alt={model.label} className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
              <div className="absolute flex -translate-x-1/2 gap-[44px]" style={{ left: 1465, top: 372 }}>
                {MODEL_OPTIONS.map((model) => (
                  <p
                    key={`desktop-model-label-${model.key}`}
                    className="text-center uppercase whitespace-nowrap"
                    style={{
                      width: model.key === "high" ? 76 : 74,
                      fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: activeModelKey === model.key ? "#f07426" : "#9a9a9a",
                      textDecoration: activeModelKey === model.key ? "underline" : "none",
                    }}
                  >
                    {model.label}
                  </p>
                ))}
              </div>

              {/* Right — ЦВЕТ */}
              <p
                className="absolute uppercase"
                style={{
                  left: 1465,
                  top: 398,
                  transform: "translateX(-50%)",
                  fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                  fontSize: 48,
                  fontWeight: 700,
                  color: "#111",
                }}
              >
                ЦВЕТ
              </p>

              {/* Color swatches */}
              <div className="absolute flex -translate-x-1/2" style={{ left: 1465, top: 476, gap: 46 }}>
                <button
                  type="button"
                  onClick={() => setColorVariant("black")}
                  className="rounded-[8px] transition-all"
                  style={{
                    width: 76,
                    height: 75,
                    backgroundColor: "#191919",
                    border: colorVariant === "black" ? "2px solid #f07426" : "2px solid #e0e0e0",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setColorVariant("oliva")}
                  className="rounded-[8px] transition-all"
                  style={{
                    width: 74,
                    height: 75,
                    backgroundColor: "#686248",
                    border: colorVariant === "oliva" ? "2px solid #f07426" : "2px solid #e0e0e0",
                  }}
                />
              </div>

              {/* Color labels */}
              <div className="absolute flex -translate-x-1/2 gap-[44px]" style={{ left: 1465, top: 560 }}>
                <p
                  className="w-[76px] text-center uppercase"
                  style={{
                    fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#999",
                  }}
                >
                  ЧЕРНЫЙ
                </p>
                <p
                  className="w-[74px] text-center uppercase"
                  style={{
                    fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#999",
                  }}
                >
                  ОЛИВА
                </p>
              </div>

              {/* Buy button */}
              <button
                type="button"
                className="absolute"
                style={{
                  left: 1465,
                  top: 692,
                  transform: "translateX(-50%)",
                  width: 224,
                  height: 72,
                  background: "linear-gradient(180deg, #E7813F 0%, #FC6407 100%)",
                  borderRadius: 16,
                  fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                Где Купить
              </button>
            </div>

            {/* Bottom photo cards */}
            <div
              className="absolute"
              style={{
                left: 331,
                top: 590,
                width: 1018,
                cursor: desktopRailCursor === "left" ? "w-resize" : desktopRailCursor === "right" ? "e-resize" : "grab",
              }}
              onMouseEnter={() => setIsDesktopRailHover(true)}
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const x = event.clientX - rect.left;
                if (x < 120) {
                  setDesktopRailCursor("left");
                  return;
                }
                if (x > rect.width - 120) {
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
                className="pointer-events-none absolute left-0 top-0 z-[9] h-[395px] w-[140px] rounded-l-[16px] transition-opacity duration-200"
                style={{
                  opacity: isDesktopRailHover && desktopRailCursor === "left" ? 1 : 0,
                  background:
                    "linear-gradient(90deg, rgba(240,116,38,0.26) 0%, rgba(240,116,38,0.12) 48%, rgba(240,116,38,0) 100%)",
                }}
              />
              <div
                className="pointer-events-none absolute right-0 top-0 z-[9] h-[395px] w-[140px] rounded-r-[16px] transition-opacity duration-200"
                style={{
                  opacity: isDesktopRailHover && desktopRailCursor === "right" ? 1 : 0,
                  background:
                    "linear-gradient(270deg, rgba(240,116,38,0.26) 0%, rgba(240,116,38,0.12) 48%, rgba(240,116,38,0) 100%)",
                }}
              />
              <div
                ref={desktopRailRef}
                className="flex gap-3 overflow-x-auto pb-2 pr-2"
                style={{ scrollBehavior: "smooth" }}
              >
                {activeViewImages.map((image, i) => (
                  <button
                    key={`desktop-view-${i}`}
                    type="button"
                    onClick={() => setActiveViewIndex(i)}
                    className="shrink-0 overflow-hidden rounded-[16px] transition-all"
                    style={{
                      width: 332,
                      height: 395,
                      background: "#eceef0",
                      border: activeViewIndex === i ? "3px solid #f07426" : "1px solid rgba(0,0,0,0.04)",
                      cursor: "pointer",
                    }}
                  >
                    <img src={image} alt="" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                aria-label="Прокрутить фото влево"
                onClick={() => desktopRailRef.current?.scrollBy({ left: -344, behavior: "smooth" })}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-r-[12px] bg-white/80 px-3 py-6 text-[#111] shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition hover:bg-white"
                style={{ cursor: "w-resize" }}
              >
                <span className="text-[24px] leading-none">‹</span>
              </button>
              <button
                type="button"
                aria-label="Прокрутить фото вправо"
                onClick={() => desktopRailRef.current?.scrollBy({ left: 344, behavior: "smooth" })}
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
          ref={mobileSceneRef}
          className="relative mx-auto w-full max-w-[741px] overflow-hidden"
          style={{ height: `${MOBILE_DESIGN_HEIGHT * mobileScale + MOBILE_SCROLL_EXTRA}px` }}
        >
          <div
            className="absolute left-0 top-0 h-[1716px] w-[741px] origin-top-left bg-[#f4f4f4]"
            style={{ transform: `scale(${mobileScale})` }}
          >
            <div className="pointer-events-none absolute left-[69px] top-0 h-[1716px] w-[649px]">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="absolute inset-y-0 w-[46.357px]" style={{ left: `${i * 46.357}px` }}>
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

            <div className="absolute left-[21px] top-[90px] flex h-[8px] w-[34px] items-center justify-between">
              <span className="size-[8px] rounded-full bg-[#111]/35" />
              <span className="size-[8px] rounded-full bg-[#111]/20" />
              <span className="size-[8px] rounded-full bg-[#111]/12" />
            </div>

            <h1
              className="absolute left-[74px] top-[59px] uppercase"
              style={{
                fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                fontSize: 75,
                fontWeight: 700,
                color: "#111",
              }}
            >
              {`МОДЕЛЬ ${selectedModel.label.toUpperCase()}`}
            </h1>

            <p
              className="absolute left-[74px] top-[147px] w-[408px]"
              style={{
                fontFamily: "Gilroy, sans-serif",
                fontSize: 20,
                fontWeight: 500,
                lineHeight: 1.28,
                color: "#111",
              }}
            >
              Подробное описание товара с инструкциями и о том как его можно использовать. Это рыба-текст для портала или интернет-магазина, сформированное автоматически с помощью нейросети. Копировать текст.
            </p>

            <button
              type="button"
              onClick={openSizeGrid}
              className="absolute left-[70px] top-[724px] rounded-[14px] px-5 py-2.5 text-white shadow-[0_8px_20px_rgba(240,116,38,0.35)]"
              style={{
                background: "linear-gradient(180deg, #E7813F 0%, #FC6407 100%)",
                fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              Таблица размеров
            </button>

            <p
              className="absolute left-[70px] top-[509px] uppercase"
              style={{
                fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                fontSize: 48,
                fontWeight: 700,
              }}
            >
              ЦВЕТ
            </p>

            <div className="absolute left-[70px] top-[579px] flex items-start gap-[46px]">
              {(["black", "oliva"] as ColorVariant[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setColorVariant(v)}
                  className="rounded-[8px] transition-all"
                  style={{
                    width: v === "black" ? 76 : 74,
                    height: 75,
                    backgroundColor: v === "black" ? "#191919" : "#686248",
                    border: colorVariant === v ? "2px solid #f07426" : "1px solid #9a9a9a",
                  }}
                />
              ))}
            </div>

            <p
              className="absolute left-[108px] top-[663px] -translate-x-1/2 underline"
              style={{
                fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#9a9a9a",
              }}
            >
              ЧЕРНЫЙ
            </p>
            <p
              className="absolute left-[229px] top-[663px] -translate-x-1/2"
              style={{
                fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#9a9a9a",
              }}
            >
              КОРИЧНЕВЫЙ
            </p>

            <p
              className="absolute left-[70px] top-[666px] uppercase"
              style={{
                fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                fontSize: 48,
                fontWeight: 700,
                color: "#111",
              }}
            >
              МОДЕЛЬ
            </p>
            <div className="absolute left-[70px] top-[736px] flex items-start gap-[46px]">
              {MODEL_OPTIONS.map((model) => (
                <button
                  key={`mobile-model-${model.key}`}
                  type="button"
                  onClick={() => setActiveModelKey(model.key)}
                  className="overflow-hidden rounded-[8px] bg-white p-[4px] transition-all"
                  style={{
                    width: model.key === "high" ? 76 : 74,
                    height: 75,
                    border: activeModelKey === model.key ? "2px solid #f07426" : "1px solid #9a9a9a",
                  }}
                >
                  <img src={MODEL_IMAGES[model.key].black[0]} alt={model.label} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
            <div className="absolute left-[70px] top-[820px] flex gap-[44px]">
              {MODEL_OPTIONS.map((model) => (
                <p
                  key={`mobile-model-label-${model.key}`}
                  className="text-center uppercase whitespace-nowrap"
                  style={{
                    width: model.key === "high" ? 76 : 74,
                    fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: activeModelKey === model.key ? "#f07426" : "#9a9a9a",
                    textDecoration: activeModelKey === model.key ? "underline" : "none",
                  }}
                >
                  {model.label}
                </p>
              ))}
            </div>

            <button
              type="button"
              className="absolute left-[72px] top-[865px] h-[72px] w-[248px] rounded-[52px] text-[24px] text-white"
              style={{
                background: "linear-gradient(180deg, #E7813F 0%, #FC6407 100%)",
                fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                fontWeight: 700,
              }}
            >
              Купить
            </button>

            <div className="pointer-events-none absolute left-[-35px] top-[838px] h-[668px] w-[810px]">
              <img
                key={`mobile-${activeModelKey}-${colorVariant}-${activeViewIndex}`}
                src={currentViewImage}
                alt="Тактическая обувь"
                className="h-full w-full animate-view-rise object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.18)]"
              />
            </div>

            <div className="absolute left-[20px] top-[1285px] w-[688px]">
              <div
                ref={mobileRailRef}
                className="flex gap-[10px] overflow-x-auto pb-3 pr-3"
                style={{ scrollBehavior: "smooth" }}
              >
                {activeViewImages.map((image, i) => (
                  <button
                    key={`mobile-view-${i}`}
                    type="button"
                    onClick={() => setActiveViewIndex(i)}
                    className="h-[305px] w-[230px] shrink-0 overflow-hidden rounded-[20px] bg-[#eceef0] transition-all"
                    style={{ border: activeViewIndex === i ? "3px solid #f07426" : "1px solid rgba(0,0,0,0.04)" }}
                  >
                    <img src={image} alt="" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                aria-label="Прокрутить фото влево"
                onClick={() => mobileRailRef.current?.scrollBy({ left: -240, behavior: "smooth" })}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-r-[12px] bg-white/85 px-2.5 py-4 text-[#111] shadow-[0_6px_20px_rgba(0,0,0,0.16)]"
                style={{ cursor: "w-resize" }}
              >
                <span className="text-[22px] leading-none">‹</span>
              </button>
              <button
                type="button"
                aria-label="Прокрутить фото вправо"
                onClick={() => mobileRailRef.current?.scrollBy({ left: 240, behavior: "smooth" })}
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
                style={{ fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif", fontSize: 32, fontWeight: 700 }}
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
              <table className="w-auto min-w-[640px] border-collapse text-left">
                <thead className="sticky top-0 bg-[#f7f7f7]">
                  <tr>
                    <th className="border-b border-[#ececec] px-5 py-3.5 text-center text-[13px] font-semibold leading-[1.2] text-[#666] min-[1200px]:px-6">Размер</th>
                    <th className="border-b border-[#ececec] px-5 py-3.5 text-center text-[13px] font-semibold leading-[1.2] text-[#666] min-[1200px]:px-6">
                      Длина стельки, см
                    </th>
                    <th className="border-b border-[#ececec] px-5 py-3.5 text-center text-[13px] font-semibold leading-[1.2] text-[#666] min-[1200px]:px-6">
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
                      <td className="border-b border-[#f0f0f0] px-5 py-3.5 text-center text-[15px] leading-[1.2] text-[#111] min-[1200px]:px-6">{row.size}</td>
                      <td className="border-b border-[#f0f0f0] px-5 py-3.5 text-center text-[15px] leading-[1.2] text-[#111] min-[1200px]:px-6">{row.insole}</td>
                      <td className="border-b border-[#f0f0f0] px-5 py-3.5 text-center text-[15px] leading-[1.2] text-[#111] min-[1200px]:px-6">{row.foot}</td>
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
