"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";

const DESIGN_HEIGHT = 1000;

const mainBootSide = "/images/models/views/models/black/1.png";
const mainBootFront = "/images/models/views/models/black/2.png";
const mainBootTop = "/images/models/views/models/black/3.png";
const mainBootTilt = "/images/models/views/models/black/4.png";
const mainBootBack = "/images/models/views/models/black/5.png";
const pedestalImage = "/images/models/ui/pedestal-bg.png";
const thumbA = "/images/models/ui/thumb-dark.png";
const thumbB = "/images/models/ui/thumb-light.png";
const carouselCardBoot53 = "/images/models/ui/carousel/card-boot-53.png";
const carouselCardBoot30 = "/images/models/ui/carousel/card-boot-30.png";
const carouselCardBoot0 = "/images/models/ui/carousel/card-boot-0.png";
const carouselCardBootNeg36 = "/images/models/ui/carousel/card-boot-neg36.png";
const carouselCardBootNeg54 = "/images/models/ui/carousel/card-boot-neg54.png";
const backgroundShape = "/images/models/ui/background-shape.png";
const metricSideImage = "/images/models/ui/metric-side-image.png";

const colorViewImages = {
  black: [
    "/images/models/views/models/black/1.png",
    "/images/models/views/models/black/2.png",
    "/images/models/views/models/black/3.png",
    "/images/models/views/models/black/4.png",
    "/images/models/views/models/black/5.png",
  ],
  oliva: [
    "/images/models/views/models/oliva/1.png",
    "/images/models/views/models/oliva/2.png",
    "/images/models/views/models/oliva/3.png",
    "/images/models/views/models/oliva/4.png",
    "/images/models/views/models/oliva/5.png",
  ],
} as const;

type ColorVariant = keyof typeof colorViewImages;

const views = [
  {
    title: "ВНЕШНИЙ МАТЕРИАЛ",
    description:
      "Подробное описание товара с инструкциями и о том как его можно использовать. Это рыба-текст для портала или интернет-магазина, сформированное автоматически с помощью нейросети. Копировать текст.",
    image: mainBootSide,
    callout: { title: "О материале", text: "и носке ботинка" },
    calloutStyle: {
      w: 260,
      h: 109,
      titleSize: 22,
      textSize: 22,
      textOpacity: 0.4,
      notch: { w: 58, h: 58, x: 101, y: -29, color: "#8B8B8B" },
    },
    metricTop: { value: "28", title: "преимущ.", line1: "в 2 строки", line2: "описание" },
    metricSide: { value: "10", line1: "цифра", line2: "в 2 строки" },
    glue: "Написать о проклейке",
    showGlue: false,
    glueVariant: "pill",
    bootBox: { x: 460, y: 351, w: 722, h: 565 },
    bootPose: { rotate: 0, x: 0, y: -20, scale: 1.60 },
    olivaPose: { rotate: 0, x: 0, y: -20, scale: 1.60 },
    anchors: {
      calloutCard: { x: 398, y: 730 },
      calloutDot: { x: 116, y: -14 },
      glueBubble: { x: 516, y: 740 },
      glueDot: { x: 688, y: 740 },
    },
  },
  {
    title: "НОСОК БОТИНКА",
    description:
      "Подробное описание товара с инструкциями и о том как его можно использовать. Это рыба-текст для портала или интернет-магазина",
    image: mainBootFront,
    callout: { title: "Твердый носок", text: "Носок и его характеристика" },
    calloutStyle: { w: 260, h: 109, titleSize: 22, textSize: 22 },
    metricTop: { value: "30", title: "защита", line1: "усиленный", line2: "каркас" },
    metricSide: { value: "12", line1: "мм", line2: "усиление" },
    glue: "Написать о проклейке",
    showMetrics: false,
    glueVariant: "pill",
    bootBox: { x: 684, y: 232, w: 273, h: 564 },
    bootPose: { rotate: 0, x: 10, y: 40, scale: 1.75 },
    olivaPose: { rotate: 0, x: 25, y: 70, scale: 1.85 },
    anchors: {
      calloutCard: { x: 926, y: 737 },
      calloutDot: { x: -20, y: 34 },
      glueBubble: { x: 516, y: 740 },
      glueDot: { x: 688, y: 740 },
    },
  },
  {
    title: "ПОДОШВА БОТИНКА",
    description:
      "Подробное описание товара с инструкциями и о том как его можно использовать. Это рыба-текст для портала или интернет-магазина",
    image: mainBootTop,
    callout: { title: "О подошве", text: "И описание фишки в две строки" },
    calloutStyle: { w: 303, h: 128, titleSize: 36, textSize: 18 },
    metricTop: { value: "24", title: "петли", line1: "равномерная", line2: "утяжка" },
    metricSide: { value: "08", line1: "точек", line2: "фиксации" },
    glue: "И описание фишки в две строки",
    glueVariant: "card",
    showMetrics: false,
    bootBox: { x: 565, y: 105, w: 555.071, h: 689.873 },
    bootPose: { rotate: -10, x: 60, y: 20, scale: 1.55 },
    olivaPose: { rotate: -5, x: 60, y: -10, scale: 1.55 },
    anchors: {
      calloutCard: { x: 1013, y: 540 },
      calloutDot: { x: 35, y: -15 },
      glueBubble: { x: 486, y: 708 },
      glueDot: { x: 661, y: 712 },
    },
  },
  {
    title: "ВНУТРЕННИЙ МАТЕРИАЛ",
    description:
      "Подробное описание товара с инструкциями и о том как его можно использовать. Это рыба-текст для портала или интернет-магазина",
    image: mainBootTilt,
    callout: { title: "Твердый носок", text: "Носок и его характеристика" },
    calloutStyle: { w: 232.811, h: 118, titleSize: 18, textSize: 14 },
    metricTop: { value: "15", title: "протектор", line1: "глубокий", line2: "зацеп" },
    metricSide: { value: "05", line1: "слоев", line2: "подошвы" },
    glue: "Написать о проклейке",
    glueVariant: "pill",
    showMetrics: false,
    bootBox: { x: 708, y: 116, w: 247, h: 692 },
    bootPose: { rotate: 0, x: 0, y: 10, scale: 2.55 },
    olivaPose: { rotate: 0, x: 30, y: -10, scale: 2.55 },
    tempWidget: {
      x: 951,
      y: 170,
      w: 128,
      h: 227,
      topLabel: "50°C",
      bottomLabel: "-20°C",
      topLabelPos: { x: 1009, y: 131 },
      bottomLabelPos: { x: 1009, y: 409 },
      dot: { x: 913, y: 370 },
    },
    anchors: {
      calloutCard: { x: 904, y: 589 },
      calloutDot: { x: -20, y: 38 },
      glueBubble: { x: 569, y: 698 },
      glueDot: { x: 741, y: 695 },
    },
  },
  {
    title: "ЗАДНЯЯ ЧАСТЬ",
    description:
      "Подробное описание товара с инструкциями и о том как его можно использовать. Это рыба-текст для портала или интернет-магазина",
    image: mainBootBack,
    callout: { title: "О заднике", text: "И описание фишки в две строки" },
    calloutStyle: { w: 241, h: 152, titleSize: 22, textSize: 15 },
    metricTop: { value: "18", title: "стабил.", line1: "жесткая", line2: "пятка" },
    metricSide: { value: "06", line1: "зон", line2: "поддержки" },
    glue: "Написать о проклейке",
    glueVariant: "pill",
    showMetrics: false,
    bootBox: { x: 677, y: 138, w: 311, h: 675 },
    bootPose: { rotate: 0, x: 0, y: 30, scale: 1.7 },
    olivaPose: { rotate: 0, x: 0, y: 30, scale: 1.65 },
    anchors: {
      calloutCard: { x: 536, y: 460 },
      calloutDot: { x: 175, y: 4 },
      glueBubble: { x: 923, y: 726 },
      glueDot: { x: 898, y: 723 },
    },
  },
] as const;

const carouselItems = [
  { x: 181.24, y: 80.41, rotate: 53.36, z: 5, image: { w: 99, h: 70, x: 8, y: 5, rotate: 0.5, flipY: false }, exact53: true },
  { x: 92.17, y: 176.92, rotate: 30.46, z: 4, image: { w: 41, h: 86, x: 39, y: -3, rotate: 0.24, flipY: false }, exact30: true },
  { x: 58.5, y: 289.47, rotate: 0, z: 3, image: { w: 70, h: 87, x: 21, y: -9, rotate: 0, flipY: false }, exact0: true },
  { x: 99.81, y: 400.48, rotate: -36.65, z: 2, image: { w: 39, h: 107, x: 50, y: -14, rotate: 0, flipY: true }, exactNeg36: true },
  { x: 180.72, y: 481.93, rotate: -54.79, z: 1, image: { w: 38, h: 84, x: 39, y: -2, rotate: 2.94, flipY: false }, exactNeg54: true },
];
const CAROUSEL_ARC_CENTER = { x: 313, y: 296 };
const CAROUSEL_MARKER_RADIUS = 168;
const CAROUSEL_ITEMS_X_OFFSET = 42;
const CAROUSEL_ITEMS_Y_OFFSET = 52;
const CAROUSEL_MARKER_ANGLE_OFFSETS = [-6, 2, 10, 18, 16];
const carouselMarkerAngles = carouselItems.reduce<number[]>((acc, item, index) => {
  const rawAngle =
    (Math.atan2(item.y + CAROUSEL_ITEMS_Y_OFFSET - CAROUSEL_ARC_CENTER.y, item.x + CAROUSEL_ITEMS_X_OFFSET - CAROUSEL_ARC_CENTER.x) * 180) /
    Math.PI;
  if (index === 0) return [rawAngle];
  let angle = rawAngle;
  while (angle > acc[index - 1]) angle -= 360;
  return [...acc, angle];
}, []);

export default function ModelsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionTick, setTransitionTick] = useState(0);
  const [colorVariant, setColorVariant] = useState<ColorVariant>("black");
  const stageHeightFitScale = `min(1, calc(100dvh / ${DESIGN_HEIGHT}px))`;

  const currentView = views[activeIndex];
  const currentViewImage = colorViewImages[colorVariant][activeIndex] ?? currentView.image;
  const currentBootBox = currentView.bootBox ?? { x: 460, y: 351, w: 722, h: 565 };
  const currentBootPose =
    colorVariant === "oliva" && "olivaPose" in currentView
      ? (currentView.olivaPose as { rotate: number; x: number; y: number; scale: number })
      : currentView.bootPose ?? { rotate: 0, x: 0, y: 0, scale: 1 };
  const currentBootImageFrame =
    "bootImageFrame" in currentView
      ? (currentView.bootImageFrame as { wPct: number; hPct: number; leftPct: number; topPct: number })
      : null;
  const currentCalloutTextOpacity = "textOpacity" in currentView.calloutStyle ? currentView.calloutStyle.textOpacity : 0.7;
  const currentCalloutNotch = "notch" in currentView.calloutStyle ? currentView.calloutStyle.notch : null;
  const isThermalCallout = currentView.title === "ВНУТРЕННИЙ МАТЕРИАЛ";
  const calloutDotPosition = isThermalCallout
    ? {
        left: currentView.anchors.calloutCard.x + 10,
        top: currentView.anchors.calloutCard.y + 42,
      }
    : {
        left: currentView.anchors.calloutCard.x + currentView.anchors.calloutDot.x,
        top: currentView.anchors.calloutCard.y + currentView.anchors.calloutDot.y,
      };
  const calloutDotOuterSize = isThermalCallout ? 34 : 30;
  const calloutDotInnerSize = isThermalCallout ? 16 : 14;
  const markerAngle = carouselMarkerAngles[activeIndex] + CAROUSEL_MARKER_ANGLE_OFFSETS[activeIndex];
  const tempLabelStyle = {
    width: 61,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center" as const,
    fontFamily: "Gilroy, sans-serif",
    fontSize: 22,
    fontStyle: "normal" as const,
    fontWeight: 700,
    lineHeight: "115%",
    letterSpacing: "-0.22px",
    background: "linear-gradient(90deg, #111 0%, #474747 195.22%)",
    backgroundClip: "text" as const,
    WebkitBackgroundClip: "text" as const,
    WebkitTextFillColor: "transparent",
  };

  const handleChangeView = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setTransitionTick((prev) => prev + 1);
  };

  return (
    <main className="figma-site-page overflow-x-hidden overflow-y-auto bg-[#d9d9d9] text-[#111] min-[1200px]:overflow-hidden">
      <div className="sr-only" aria-hidden="true">
        {Object.values(colorViewImages).flat().map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>
      <section
        className="figma-site-stage relative mx-auto hidden h-[100dvh] w-full overflow-hidden bg-white min-[1200px]:block"
        style={{ ["--figma-stage-height" as string]: "100dvh" }}
      >
        <div className="relative mx-auto h-[100dvh] w-full max-w-[1670px] overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-[1000px] origin-top"
            style={{
              transform: `scale(${stageHeightFitScale})`,
            }}
          >
            <div className="pointer-events-none absolute bottom-[-88px] left-[439px] top-[-88px] w-[886.001px]">
              {Array.from({ length: 14 }).map((_, index) => (
                <div
                  key={index}
                  className="absolute inset-y-0 w-[63.286px]"
                  style={{ left: `${index * 63.286}px` }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(-90deg, rgba(255, 255, 255, 0.008) 20%, rgba(40, 40, 40, 0.093) 75.758%, rgba(255, 255, 255, 0.008) 123.64%)",
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
                <Link href="/" className="text-xs font-medium text-[#111]">
                  Главная
                </Link>
                <Link href="/buy" className="text-xs font-medium text-[#111]">
                  Купить
                </Link>
                <span className="rounded-[10px] bg-gradient-to-r from-[#8b7a71] to-[#756257] px-5 py-3 text-xs font-medium text-white">
                  Модели
                </span>
                <a href="#" className="text-xs font-medium text-[#111]">
                  О нас
                </a>
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

            <div className="absolute z-20 h-[520px] w-[560px]" style={{ left: "clamp(40px, 6.2vw, 103px)", top: "clamp(164px, 22.7vh, 232px)" }}>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="8"
                  viewBox="0 0 34 8"
                  fill="none"
                  aria-hidden="true"
                  className="absolute left-[-58px] top-1/2 -translate-y-1/2 shrink-0"
                >
                  <circle opacity="0.4" cx="4" cy="4" r="4" fill="#111111" />
                  <circle opacity="0.2" cx="17" cy="4" r="4" fill="#111111" />
                  <circle opacity="0.1" cx="30" cy="4" r="4" fill="#111111" />
                </svg>
                <h1
                  className="uppercase text-[#5b6a44]"
                  style={{
                    color: "#5B6A44",
                    fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                    fontSize: 45,
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                  }}
                >
                  {currentView.title}
                </h1>
              </div>
              <p className="absolute left-0 top-[84px] w-[532px] text-[24px] font-medium leading-[1.35] tracking-normal text-[#111]">
                {currentView.description}
              </p>

              <Link
                href="/buy"
                className="absolute left-0 top-[332px] flex h-20 w-[248px] items-center justify-center rounded-[20px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[34px] font-medium text-white"
                style={{ fontFamily: "Druk Cyr, var(--font-oswald), sans-serif" }}
              >
                Купить
              </Link>
            </div>

            <div
              key={`${transitionTick}-${colorVariant}`}
              className="absolute z-10 overflow-visible"
              style={{
                left: currentBootBox.x,
                top: currentBootBox.y,
                width: currentBootBox.w,
                height: currentBootBox.h,
              }}
            >
              <div className="h-full w-full animate-view-rise">
                <div
                  className="h-full w-full"
                  style={{
                    transform: `translate(${currentBootPose.x}px, ${currentBootPose.y}px) rotate(${currentBootPose.rotate}deg) scale(${currentBootPose.scale})`,
                    transformOrigin: "50% 50%",
                  }}
                >
                  {currentBootImageFrame ? (
                    <div className="relative h-full w-full overflow-hidden">
                      <img
                        src={currentViewImage}
                        alt="Модель ботинка"
                        className="absolute max-w-none drop-shadow-[0_60px_100px_rgba(0,0,0,0.12)]"
                        style={{
                          width: `${currentBootImageFrame.wPct}%`,
                          height: `${currentBootImageFrame.hPct}%`,
                          left: `${currentBootImageFrame.leftPct}%`,
                          top: `${currentBootImageFrame.topPct}%`,
                        }}
                      />
                    </div>
                  ) : (
                    <img
                      src={currentViewImage}
                      alt="Модель ботинка"
                      className="h-full w-full object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,0.12)]"
                    />
                  )}
                </div>
              </div>
            </div>

            <p
              className="pointer-events-none absolute inset-x-0 z-0 select-none text-right"
              style={{
                bottom: 130,
                color: "#AEAEAE",
                fontFamily: "Druk Cyr, var(--font-oswald), sans-serif",
                fontSize: 600,
                fontWeight: 500,
                lineHeight: "108px",
                opacity: 0.06,
                transform: "scaleY(0.67)",
                transformOrigin: "bottom right",
              }}
            >
              VELESBRON
            </p>

            <div className="absolute left-1/2 top-[555px] z-0 w-[1536px] -translate-x-1/2 overflow-hidden" style={{ height: DESIGN_HEIGHT }}>
              <img src={pedestalImage} alt="" className="h-full w-full object-cover object-center" />
            </div>

            {currentView.showMetrics !== false && (
              <>
                <div className="absolute left-[852px] top-[252px] z-20 h-[128px] w-[303px] rounded-[25px] bg-white p-6 shadow-[0_60px_100px_rgba(0,0,0,0.12)]">
                  <p className="text-[72px] font-bold leading-none tracking-[-0.04em] text-[#111]">{currentView.metricTop.value}</p>
                  <div className="absolute left-[142px] top-[18px] text-[24px] leading-[1.1] tracking-[-0.02em]">
                    <p className="font-bold text-[#111]">{currentView.metricTop.title}</p>
                    <p className="text-[#111]/40">{currentView.metricTop.line1}</p>
                    <p className="text-[#111]/40">{currentView.metricTop.line2}</p>
                  </div>
                  <span className="absolute -bottom-5 left-0 flex size-[27px] items-center justify-center rounded-full bg-gradient-to-b from-[#e7813f] to-[#fc6407]">
                    <span className="size-[10px] rounded-full bg-white" />
                  </span>
                </div>

                <div className="absolute left-[1073px] top-[593px] z-20 h-[314px] w-[172px] rounded-[25px] bg-white shadow-[0_60px_100px_rgba(0,0,0,0.12)]">
                  <span className="absolute -left-[13px] -top-[13px] flex size-[27px] items-center justify-center rounded-full bg-gradient-to-b from-[#e7813f] to-[#fc6407]">
                    <span className="size-[10px] rounded-full bg-white" />
                  </span>
                  <p className="pt-8 text-center text-[72px] font-bold leading-none tracking-[-0.08em] text-[#111]">{currentView.metricSide.value}</p>
                  <p className="pt-4 text-center text-[40px] leading-[1] tracking-[0.08em] text-[#111]/20">...</p>
                  <p className="-mt-1 text-center text-[24px] leading-[1.1] text-[#111]/40">{currentView.metricSide.line1}</p>
                  <p className="text-center text-[24px] leading-[1.1] text-[#111]/40">{currentView.metricSide.line2}</p>
                  <div className="absolute left-[10px] top-[210px] h-[94px] w-[152px] overflow-hidden rounded-[18px] bg-gradient-to-b from-[#e7813f] to-[#fc6407]">
                    <img
                      src={metricSideImage}
                      alt=""
                      className="pointer-events-none absolute max-w-none object-cover"
                      style={{ width: 274, height: 344, left: -108, top: -248 }}
                    />
                  </div>
                  <div className="absolute bottom-[10px] left-1/2 size-[9px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#e7813f] to-[#fc6407]" />
                </div>
              </>
            )}

            {currentView.tempWidget && (
              <>
                <p
                  className="absolute z-20"
                  style={{
                    ...tempLabelStyle,
                    left: currentView.tempWidget.topLabelPos?.x ?? currentView.tempWidget.x + 40,
                    top: currentView.tempWidget.topLabelPos?.y ?? currentView.tempWidget.y - 40,
                    transform: "translateX(-50%)",
                  }}
                >
                  {currentView.tempWidget.topLabel}
                </p>
                <div
                  className="absolute z-20"
                  style={{
                    left: currentView.tempWidget.x,
                    top: currentView.tempWidget.y,
                    width: currentView.tempWidget.w,
                    height: currentView.tempWidget.h,
                  }}
                >
                  <svg
                    width="127.835"
                    height="226.907"
                    viewBox="0 0 128 227"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="127.835" height="226.907" rx="30" fill="url(#paint0_linear_146_395_local)" />
                    <rect x="23.9688" y="27.9644" width="79.8969" height="3.19588" rx="1.59794" fill="white" />
                    <rect opacity="0.25" x="43.9434" y="39.1499" width="39.9485" height="3.19588" rx="1.59794" fill="#D9D9D9" />
                    <rect opacity="0.25" x="43.9434" y="95.0776" width="39.9485" height="3.19588" rx="1.59794" fill="#D9D9D9" />
                    <rect opacity="0.25" x="43.9434" y="151.005" width="39.9485" height="3.19588" rx="1.59794" fill="#D9D9D9" />
                    <rect opacity="0.25" x="43.9434" y="50.3354" width="39.9485" height="3.19588" rx="1.59794" fill="#D9D9D9" />
                    <rect opacity="0.25" x="43.9434" y="106.263" width="39.9485" height="3.19588" rx="1.59794" fill="#D9D9D9" />
                    <rect opacity="0.25" x="43.9434" y="162.191" width="39.9485" height="3.19588" rx="1.59794" fill="#D9D9D9" />
                    <rect opacity="0.25" x="43.9434" y="61.521" width="39.9485" height="3.19588" rx="1.59794" fill="#D9D9D9" />
                    <rect opacity="0.25" x="43.9434" y="117.449" width="39.9485" height="3.19588" rx="1.59794" fill="#D9D9D9" />
                    <rect opacity="0.25" x="43.9434" y="173.377" width="39.9485" height="3.19588" rx="1.59794" fill="#D9D9D9" />
                    <rect opacity="0.25" x="43.9434" y="72.7065" width="39.9485" height="3.19588" rx="1.59794" fill="#D9D9D9" />
                    <rect opacity="0.25" x="43.9434" y="128.634" width="39.9485" height="3.19588" rx="1.59794" fill="#D9D9D9" />
                    <rect opacity="0.25" x="43.9434" y="184.562" width="39.9485" height="3.19588" rx="1.59794" fill="#D9D9D9" />
                    <rect x="23.9688" y="83.8921" width="79.8969" height="3.19588" rx="1.59794" fill="white" />
                    <rect x="23.9688" y="139.82" width="79.8969" height="3.19588" rx="1.59794" fill="white" />
                    <rect x="23.9688" y="195.748" width="79.8969" height="3.19588" rx="1.59794" fill="white" />
                    <defs>
                      <linearGradient id="paint0_linear_146_395_local" x1="63.9175" y1="0" x2="63.9175" y2="226.907" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E7813F" />
                        <stop offset="1" stopColor="#FC6407" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p
                  className="absolute z-20"
                  style={{
                    ...tempLabelStyle,
                    left: currentView.tempWidget.bottomLabelPos?.x ?? currentView.tempWidget.x + 36,
                    top: currentView.tempWidget.bottomLabelPos?.y ?? currentView.tempWidget.y + currentView.tempWidget.h + 16,
                    transform: "translateX(-50%)",
                  }}
                >
                  {currentView.tempWidget.bottomLabel}
                </p>
                <span
                  className="absolute z-20 flex size-[30px] items-center justify-center rounded-full bg-gradient-to-b from-[#e7813f] to-[#fc6407]"
                  style={{ left: currentView.tempWidget.dot.x, top: currentView.tempWidget.dot.y }}
                >
                  <span className="size-[12px] rounded-full bg-white" />
                </span>
              </>
            )}

            {isThermalCallout ? (
              <div
                className="absolute z-20 transition-all duration-500"
                style={{
                  left: currentView.anchors.calloutCard.x,
                  top: currentView.anchors.calloutCard.y,
                  width: currentView.calloutStyle.w,
                  height: currentView.calloutStyle.h,
                  filter: "drop-shadow(0 60px 100px rgba(0, 0, 0, 0.12))",
                }}
              >
                <svg
                  className="absolute left-0 top-0 h-full w-full"
                  viewBox="0 0 232.811 118"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M197.811 0C217.141 0 232.811 15.67 232.811 35V83C232.811 102.33 217.141 118 197.811 118H60.514C41.59 118 26.176 102.982 25.536 84.215C25.535 84.203 25.526 84.194 25.514 84.194C11.423 84.194 0 72.771 0 58.6807C0 44.5901 11.423 33.168 25.514 33.168C25.539 33.168 25.561 33.1476 25.562 33.1219C26.538 14.6651 41.814 0 60.514 0H197.811Z"
                    fill="white"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col justify-center pl-[56px] pr-[18px]">
                  <p className="leading-[1.08] tracking-[-0.02em] text-[#111]" style={{ fontSize: currentView.calloutStyle.titleSize }}>
                    <span className="font-bold">{currentView.callout.title}</span>
                  </p>
                  <p
                    className="leading-[1.08] tracking-[-0.02em]"
                    style={{ fontSize: currentView.calloutStyle.textSize, color: `rgba(17,17,17,${currentCalloutTextOpacity})` }}
                  >
                    {currentView.callout.text}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="absolute z-20 rounded-[22px] bg-white p-6 shadow-[0_60px_100px_rgba(0,0,0,0.12)] transition-all duration-500"
                style={{
                  left: currentView.anchors.calloutCard.x,
                  top: currentView.anchors.calloutCard.y,
                  width: currentView.calloutStyle.w,
                  height: currentView.calloutStyle.h,
                  ...(currentCalloutNotch
                    ? {
                        WebkitMask: `radial-gradient(circle ${currentCalloutNotch.w / 2}px at ${
                          currentCalloutNotch.x + currentCalloutNotch.w / 2
                        }px -8px, transparent 98%, #000 100%)`,
                        mask: `radial-gradient(circle ${currentCalloutNotch.w / 2}px at ${
                          currentCalloutNotch.x + currentCalloutNotch.w / 2
                        }px -8px, transparent 98%, #000 100%)`,
                      }
                    : {}),
                }}
              >
                <p className="leading-[1.08] tracking-[-0.02em] text-[#111]" style={{ fontSize: currentView.calloutStyle.titleSize }}>
                  <span className="font-bold">{currentView.callout.title}</span>
                </p>
                <p
                  className="leading-[1.08] tracking-[-0.02em]"
                  style={{ fontSize: currentView.calloutStyle.textSize, color: `rgba(17,17,17,${currentCalloutTextOpacity})` }}
                >
                  {currentView.callout.text}
                </p>
              </div>
            )}
            <span
              className="absolute z-20 flex items-center justify-center rounded-full bg-gradient-to-b from-[#e7813f] to-[#fc6407] transition-all duration-500"
              style={{ ...calloutDotPosition, width: calloutDotOuterSize, height: calloutDotOuterSize }}
            >
              <span className="rounded-full bg-white" style={{ width: calloutDotInnerSize, height: calloutDotInnerSize }} />
            </span>

            {("showGlue" in currentView ? currentView.showGlue : true) !== false && (
              <>
                <div
                  className={`absolute z-20 bg-white text-[#111] shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500 ${
                    currentView.glueVariant === "card"
                      ? "h-[152px] w-[241px] rounded-[24px] px-8 py-7 text-left"
                      : "h-[34px] w-[180px] rounded-full px-5 py-2 text-center text-xs font-medium"
                  }`}
                  style={{ left: currentView.anchors.glueBubble.x, top: currentView.anchors.glueBubble.y }}
                >
                  {currentView.glueVariant === "card" ? (
                    <>
                      <p className="text-[22px] font-bold leading-[1.1]">О подошве</p>
                      <p className="mt-2 text-[15px] leading-[1.1] text-[#111]/70">И описание фишки</p>
                      <p className="text-[15px] leading-[1.1] text-[#111]/70">в две строки</p>
                    </>
                  ) : (
                    currentView.glue
                  )}
                </div>

                <span
                  className="absolute z-20 size-[40px] transition-all duration-500"
                  style={{ left: currentView.anchors.glueDot.x, top: currentView.anchors.glueDot.y }}
                >
                  <span className="absolute inset-0 rounded-full bg-white opacity-90 shadow-[0_20px_40px_rgba(0,0,0,0.12)]" />
                  <span className="absolute left-[3px] top-[3px] size-[34px] rounded-full bg-gradient-to-b from-[#e7813f] to-[#fc6407] opacity-95" />
                  <span className="absolute left-[12px] top-[12px] size-4 rounded-full bg-white" />
                </span>
              </>
            )}

            <div className="absolute z-20 flex items-center gap-4" style={{ left: "clamp(40px, 6.1vw, 102px)", top: "clamp(780px, 87.6vh, 897px)" }}>
              <button
                type="button"
                onClick={() => setColorVariant("black")}
                aria-label="Показать черную модель"
                className={`h-[75px] w-[76px] overflow-hidden rounded-[8px] border bg-white p-2 transition ${
                  colorVariant === "black" ? "border-[#c8c8c8]" : "border-[#9a9a9a] opacity-50"
                }`}
              >
                <img src={thumbA} alt="" className="h-full w-full object-contain" />
              </button>
              <button
                type="button"
                onClick={() => setColorVariant("oliva")}
                aria-label="Показать оливковую модель"
                className={`h-[75px] w-[74px] overflow-hidden rounded-[8px] border bg-white p-2 transition ${
                  colorVariant === "oliva" ? "border-[#c8c8c8]" : "border-[#9a9a9a] opacity-50"
                }`}
              >
                <img src={thumbB} alt="" className="h-full w-full object-contain" />
              </button>
            </div>

            <div className="absolute z-20" style={{ left: "clamp(1000px, 84.7vw, 1414px)", top: "clamp(170px, 23.5vh, 241px)" }}>
              <div
                className="pointer-events-none absolute left-[131px] top-[114px] h-[364px] w-[364px]"
                style={{
                  background: "linear-gradient(90deg, #C8C8C8 0%, rgba(255, 255, 255, 0) 33.38%)",
                  borderRadius: "364px",
                  WebkitMask:
                    "radial-gradient(closest-side, transparent calc(100% - 28px), #000 calc(100% - 27px))",
                  mask: "radial-gradient(closest-side, transparent calc(100% - 28px), #000 calc(100% - 27px))",
                }}
              />
              {carouselItems.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleChangeView(index)}
                  aria-label={`Показать ракурс ${index + 1}`}
                  className="absolute h-20 w-[117px] -translate-x-1/2 -translate-y-1/2 cursor-pointer appearance-none border-0 bg-transparent p-0 outline-none ring-0 transition-all focus:outline-none focus-visible:outline-none focus-visible:ring-0"
                  style={{
                    left: item.x + CAROUSEL_ITEMS_X_OFFSET,
                    top: item.y + CAROUSEL_ITEMS_Y_OFFSET,
                    zIndex: item.z,
                    transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
                    boxShadow: "none",
                    opacity: index === activeIndex ? 1 : 0.85,
                    WebkitAppearance: "none",
                  }}
                >
                  {item.exact53 ? (
                    <>
                      <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-[141.624px] w-[134.013px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                        <svg
                          className="h-20 w-[117px]"
                          viewBox="0 0 117 80"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M0 13.0015C0 5.2534 6.73485 -0.774587 14.4356 0.0810526L105.436 10.1922C112.019 10.9237 117 16.4885 117 23.1127V56.9899C117 63.7616 111.802 69.3992 105.052 69.9472L14.0521 77.3361C6.48245 77.9507 0 71.9733 0 64.3788V13.0015Z"
                            fill="url(#paint0_linear_0_4_exact53)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_0_4_exact53"
                              x1="58.5"
                              y1="-1.5229"
                              x2="58.5"
                              y2="78.4771"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#E7813F" />
                              <stop offset="1" stopColor="#FC6407" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-[121.701px] w-[115.55px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                        <img src={carouselCardBoot53} alt="" className="h-[70.769px] w-[99.017px] object-contain" />
                      </div>
                    </>
                  ) : item.exact30 ? (
                    <>
                      <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-[128.273px] w-[141.407px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                        <svg
                          className="h-20 w-[117px]"
                          viewBox="0 0 117 80"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M0 13.0015C0 5.2534 6.73485 -0.774587 14.4356 0.0810526L105.436 10.1922C112.019 10.9237 117 16.4885 117 23.1127V56.9899C117 63.7616 111.802 69.3992 105.052 69.9472L14.0521 77.3361C6.48245 77.9507 0 71.9733 0 64.3788V13.0015Z"
                            fill="url(#paint0_linear_0_4_exact30)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_0_4_exact30"
                              x1="58.5"
                              y1="-1.5229"
                              x2="58.5"
                              y2="78.4771"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#E7813F" />
                              <stop offset="1" stopColor="#FC6407" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-[94.88px] w-[79.156px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                        <img src={carouselCardBoot30} alt="" className="h-[86px] w-[41px] object-contain" />
                      </div>
                    </>
                  ) : item.exact0 ? (
                    <>
                      <div className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-[117px] -translate-x-1/2 -translate-y-1/2">
                        <svg
                          className="h-full w-full"
                          viewBox="0 0 117 80"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M0 13.0015C0 5.2534 6.73485 -0.774587 14.4356 0.0810526L105.436 10.1922C112.019 10.9237 117 16.4885 117 23.1127V56.9899C117 63.7616 111.802 69.3992 105.052 69.9472L14.0521 77.3361C6.48245 77.9507 0 71.9733 0 64.3788V13.0015Z"
                            fill="url(#paint0_linear_0_4_exact0)"
                          />
                          <defs>
                            <linearGradient id="paint0_linear_0_4_exact0" x1="58.5" y1="-1.5229" x2="58.5" y2="78.4771" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#E7813F" />
                              <stop offset="1" stopColor="#FC6407" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[87px] w-[70px] -translate-x-1/2 -translate-y-1/2">
                        <img src={carouselCardBoot0} alt="" className="h-full w-full object-contain" />
                      </div>
                    </>
                  ) : item.exactNeg36 ? (
                    <>
                      <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-[134.021px] w-[141.623px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                        <svg
                          className="h-20 w-[117px]"
                          viewBox="0 0 117 80"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M0 13.0015C0 5.2534 6.73485 -0.774587 14.4356 0.0810526L105.436 10.1922C112.019 10.9237 117 16.4885 117 23.1127V56.9899C117 63.7616 111.802 69.3992 105.052 69.9472L14.0521 77.3361C6.48245 77.9507 0 71.9733 0 64.3788V13.0015Z"
                            fill="url(#paint0_linear_0_4_exactNeg36)"
                          />
                          <defs>
                            <linearGradient id="paint0_linear_0_4_exactNeg36" x1="58.5" y1="-1.5229" x2="58.5" y2="78.4771" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#E7813F" />
                              <stop offset="1" stopColor="#FC6407" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-[107px] w-[39px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                        <img src={carouselCardBootNeg36} alt="" className="h-[107px] w-[39px] -scale-y-100 rotate-180 object-contain" />
                      </div>
                    </>
                  ) : item.exactNeg54 ? (
                    <>
                      <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-[141.72px] w-[132.824px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                        <svg
                          className="h-20 w-[117px]"
                          viewBox="0 0 117 80"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M0 13.0015C0 5.2534 6.73485 -0.774587 14.4356 0.0810526L105.436 10.1922C112.019 10.9237 117 16.4885 117 23.1127V56.9899C117 63.7616 111.802 69.3992 105.052 69.9472L14.0521 77.3361C6.48245 77.9507 0 71.9733 0 64.3788V13.0015Z"
                            fill="url(#paint0_linear_0_4_exactNeg54)"
                          />
                          <defs>
                            <linearGradient id="paint0_linear_0_4_exactNeg54" x1="58.5" y1="-1.5229" x2="58.5" y2="78.4771" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#E7813F" />
                              <stop offset="1" stopColor="#FC6407" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-[81.773px] w-[89.53px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                        <img src={carouselCardBootNeg54} alt="" className="h-[84px] w-[38px] object-contain" style={{ transform: "rotate(2.94deg)" }} />
                      </div>
                    </>
                  ) : (
                    <>
                      <svg
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[126px] w-[114px] -translate-x-1/2 -translate-y-1/2"
                        viewBox="0 0 114 126"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M46.4701 2.57011C52.6874 -2.0535 61.5435 -0.246327 65.4522 6.44363L111.642 85.499C114.983 91.2185 113.49 98.536 108.175 102.489L80.9905 122.705C75.5566 126.746 67.9307 125.938 63.4632 120.849L3.23104 52.2369C-1.77925 46.5295 -0.851057 37.7608 5.24309 33.2288L46.4701 2.57011Z"
                          fill={`url(#paint0_linear_146_344_${index})`}
                        />
                        <defs>
                          <linearGradient
                            id={`paint0_linear_146_344_${index}`}
                            x1="57"
                            y1="0"
                            x2="57"
                            y2="126"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#E7813F" />
                            <stop offset="1" stopColor="#FC6407" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <img
                        src={colorViewImages[colorVariant][index] ?? views[index].image}
                        alt=""
                        className="pointer-events-none absolute z-10 object-contain"
                        style={{
                          width: item.image.w,
                          height: item.image.h,
                          left: item.image.x,
                          top: item.image.y,
                          transform: `${item.image.flipY ? "scaleY(-1) rotate(180deg)" : ""} rotate(${item.image.rotate}deg)`,
                          transformOrigin: "50% 50%",
                        }}
                      />
                    </>
                  )}
                </button>
              ))}

              <div
                className="pointer-events-none absolute left-0 top-0 flex size-[38.678px] items-center justify-center transition-transform duration-500"
                style={{
                  transform: `translate(${CAROUSEL_ARC_CENTER.x}px, ${CAROUSEL_ARC_CENTER.y}px) translate(-50%, -50%) rotate(${markerAngle}deg) translateX(${CAROUSEL_MARKER_RADIUS}px)`,
                }}
              >
                <div className="flex size-7 rotate-[-32.62deg] items-center justify-center rounded-full bg-[#F17823]" />
              </div>
          </div>
          </div>
        </div>
      </section>

      <section className="min-[1200px]:hidden px-4 pb-10 pt-4">
        <header className="mb-5">
          <div className="mb-4 flex items-center justify-between">
            <Link href="/" className="text-xs font-medium text-[#111]">
              Главная
            </Link>
            <span className="rounded-[10px] bg-gradient-to-r from-[#8b7a71] to-[#756257] px-4 py-2 text-xs font-medium text-white">
              Модели
            </span>
          </div>

          <div className="mx-auto h-[72px] w-[138px] rounded-[10px] bg-white p-2">
            <img src="/images/pages/header-logo.png" alt="Velesbron" className="h-full w-full object-contain" />
          </div>
        </header>

        <h1
          className="uppercase text-[#5b6a44]"
          style={{
            color: "#5B6A44",
            fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
            fontSize: 45,
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
          }}
        >
          {currentView.title}
        </h1>
        <p className="mt-3 max-w-[700px] text-base leading-7 text-[#111]">{currentView.description}</p>

        <div className="relative mx-auto mt-4 h-[320px] w-full max-w-[460px]">
          <img
            key={`mobile-${transitionTick}`}
            src={currentViewImage}
            alt="Модель ботинка"
            className="h-full w-full animate-view-rise object-contain drop-shadow-[0_40px_70px_rgba(0,0,0,0.16)]"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="min-w-[170px] rounded-[18px] bg-white p-4 shadow-[0_20px_35px_rgba(0,0,0,0.08)]">
            <p className="text-3xl font-bold leading-none">{currentView.metricTop.value}</p>
            <p className="mt-1 text-sm font-medium">{currentView.metricTop.title}</p>
          </div>
          <div className="min-w-[140px] rounded-[18px] bg-white p-4 shadow-[0_20px_35px_rgba(0,0,0,0.08)]">
            <p className="text-3xl font-bold leading-none">{currentView.metricSide.value}</p>
            <p className="mt-1 text-sm text-[#111]/70">
              {currentView.metricSide.line1} {currentView.metricSide.line2}
            </p>
          </div>
          <div className="min-w-[220px] rounded-[999px] bg-white px-4 py-2 text-sm shadow-[0_20px_35px_rgba(0,0,0,0.08)]">
            {currentView.glue}
          </div>
        </div>

        <div className="mt-7 grid grid-cols-5 gap-2">
          {views.map((view, index) => (
            <button
              key={view.title}
              type="button"
              onClick={() => handleChangeView(index)}
              className={`rounded-[12px] border p-1 transition ${
                index === activeIndex
                  ? "border-[#fc6407] bg-gradient-to-b from-[#f2995d]/20 to-[#fc6407]/20"
                  : "border-[#c8c8c8] bg-white/70"
              }`}
              aria-label={`Показать ракурс ${index + 1}`}
            >
              <img src={colorViewImages[colorVariant][index] ?? view.image} alt="" className="h-[62px] w-full object-contain" />
            </button>
          ))}
        </div>

        <Link
          href="/buy"
          className="mt-7 flex h-14 w-[210px] items-center justify-center rounded-[16px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[26px] font-medium text-white"
          style={{ fontFamily: "Druk Cyr, var(--font-oswald), sans-serif" }}
        >
          Купить
        </Link>
      </section>
    </main>
  );
}
