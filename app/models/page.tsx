"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/layout/SiteHeader";

const DESIGN_HEIGHT = 1000;
const MOBILE_DESIGN_WIDTH = 741;
const MOBILE_DESIGN_HEIGHT = 1716;
const MOBILE_SCROLL_EXTRA = 48;

const backgroundShape = "/images/models/ui/background-shape.png";

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
  const [desktopRailCursor, setDesktopRailCursor] = useState<"left" | "right" | "grab">("grab");
  const [isDesktopRailHover, setIsDesktopRailHover] = useState(false);
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveViewIndex(0);
  }, [activeModelKey, colorVariant]);

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

            <SiteHeader />

            {/* Left — model name + description */}
            <div className="absolute" style={{ left: 71, top: 186 }}>
              <h1
                className="uppercase"
                style={{
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
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
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
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
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
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
                      fontFamily: "var(--font-russo-one), Russo One, sans-serif",
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
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
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
                    fontFamily: "var(--font-russo-one), Russo One, sans-serif",
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
                    fontFamily: "var(--font-russo-one), Russo One, sans-serif",
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
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
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
      <section className="min-[1200px]:hidden mobile-header-offset">
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
              className="absolute left-[70px] top-[764px] flex h-[72px] w-[286px] items-center justify-center rounded-[16px] text-white shadow-[0_8px_20px_rgba(240,116,38,0.35)]"
              style={{
                background: "linear-gradient(180deg, #E7813F 0%, #FC6407 100%)",
                fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              Таблица размеров
            </button>

            <p
              className="absolute left-[70px] top-[452px] uppercase"
              style={{
                fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                fontSize: 54,
                fontWeight: 700,
                color: "#111",
              }}
            >
              МОДЕЛЬ
            </p>

            <div className="absolute left-[70px] top-[532px] flex items-start gap-[24px]">
              {MODEL_OPTIONS.map((model) => (
                <button
                  key={`mobile-model-${model.key}`}
                  type="button"
                  onClick={() => setActiveModelKey(model.key)}
                  className="overflow-hidden rounded-[8px] bg-white p-[4px] transition-all"
                  style={{
                    width: model.key === "high" ? 96 : 94,
                    height: 95,
                    border: activeModelKey === model.key ? "2px solid #f07426" : "1px solid #9a9a9a",
                  }}
                >
                  <img src={MODEL_IMAGES[model.key].black[0]} alt={model.label} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>

            <div className="absolute left-[70px] top-[638px] flex gap-[20px]">
              {MODEL_OPTIONS.map((model) => (
                <p
                  key={`mobile-model-label-${model.key}`}
                  className="text-center uppercase whitespace-nowrap"
                  style={{
                    width: model.key === "high" ? 96 : 94,
                    fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: activeModelKey === model.key ? "#f07426" : "#9a9a9a",
                    textDecoration: activeModelKey === model.key ? "underline" : "none",
                  }}
                >
                  {model.label}
                </p>
              ))}
            </div>

            <p
              className="absolute left-[398px] top-[452px] uppercase"
              style={{
                fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                fontSize: 54,
                fontWeight: 700,
                color: "#111",
              }}
            >
              ЦВЕТ
            </p>
            <div className="absolute left-[398px] top-[532px] flex items-start gap-[20px]">
              {(["black", "oliva"] as ColorVariant[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setColorVariant(v)}
                  className="rounded-[8px] transition-all"
                  style={{
                    width: v === "black" ? 96 : 94,
                    height: 95,
                    backgroundColor: v === "black" ? "#191919" : "#686248",
                    border: colorVariant === v ? "2px solid #f07426" : "1px solid #9a9a9a",
                  }}
                />
              ))}
            </div>

            <p
              className="absolute left-[446px] top-[638px] -translate-x-1/2"
              style={{
                fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                fontSize: 22,
                fontWeight: 700,
                color: colorVariant === "black" ? "#f07426" : "#9a9a9a",
                textDecoration: colorVariant === "black" ? "underline" : "none",
              }}
            >
              ЧЕРНЫЙ
            </p>
            <p
              className="absolute left-[574px] top-[638px] -translate-x-1/2"
              style={{
                fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                fontSize: 22,
                fontWeight: 700,
                color: colorVariant === "oliva" ? "#f07426" : "#9a9a9a",
                textDecoration: colorVariant === "oliva" ? "underline" : "none",
              }}
            >
              ОЛИВА
            </p>

            <button
              type="button"
              className="absolute left-[398px] top-[764px] h-[72px] w-[248px] rounded-[16px] text-[26px] text-white"
              style={{
                background: "linear-gradient(180deg, #E7813F 0%, #FC6407 100%)",
                fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                fontWeight: 700,
              }}
            >
              Купить
            </button>

            <div className="pointer-events-none absolute left-[-56px] top-[772px] h-[720px] w-[868px]">
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
                style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontSize: 32, fontWeight: 700 }}
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
