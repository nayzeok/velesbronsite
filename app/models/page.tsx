"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";

const DESIGN_WIDTH = 1670;
const DESIGN_HEIGHT = 1024;

const mainBootSide = "/images/models/views/boot-side.png";
const mainBootFront = "/images/models/views/boot-front.png";
const mainBootTop = "/images/models/views/boot-top.png";
const mainBootTilt = "/images/models/views/boot-tilt.png";
const mainBootBack = "/images/models/views/boot-back.png";
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
    bootPose: { rotate: 0, x: 0, y: 0, scale: 1 },
    bootImageFrame: { wPct: 136.08, hPct: 115.93, leftPct: -16.66, topPct: -15.93 },
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
    bootPose: { rotate: 0, x: 0, y: 0, scale: 1 },
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
    image: "/images/models/views/boot-sole-angle.png",
    callout: { title: "О подошве", text: "И описание фишки в две строки" },
    calloutStyle: { w: 303, h: 128, titleSize: 36, textSize: 18 },
    metricTop: { value: "24", title: "петли", line1: "равномерная", line2: "утяжка" },
    metricSide: { value: "08", line1: "точек", line2: "фиксации" },
    glue: "И описание фишки в две строки",
    glueVariant: "card",
    showMetrics: false,
    bootBox: { x: 413, y: 7, w: 859, h: 885 },
    bootPose: { rotate: 37.25, x: 0, y: 8, scale: 0.86 },
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
    image: "/images/models/views/boot-inner-material.png",
    callout: { title: "Твердый носок", text: "Носок и его характеристика" },
    calloutStyle: { w: 233, h: 118, titleSize: 18, textSize: 14 },
    metricTop: { value: "15", title: "протектор", line1: "глубокий", line2: "зацеп" },
    metricSide: { value: "05", line1: "слоев", line2: "подошвы" },
    glue: "Написать о проклейке",
    glueVariant: "pill",
    showMetrics: false,
    bootBox: { x: 708, y: 116, w: 247, h: 692 },
    bootPose: { rotate: 0, x: 0, y: 0, scale: 1 },
    tempWidget: {
      x: 961,
      y: 188,
      w: 128,
      h: 227,
      topLabel: "50°C",
      bottomLabel: "-20°C",
      topLabelPos: { x: 1025, y: 149 },
      bottomLabelPos: { x: 1025, y: 427 },
      dot: { x: 929, y: 388 },
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
    image: "/images/models/views/boot-rear.png",
    callout: { title: "О заднике", text: "И описание фишки в две строки" },
    calloutStyle: { w: 241, h: 152, titleSize: 22, textSize: 15 },
    metricTop: { value: "18", title: "стабил.", line1: "жесткая", line2: "пятка" },
    metricSide: { value: "06", line1: "зон", line2: "поддержки" },
    glue: "Написать о проклейке",
    glueVariant: "pill",
    showMetrics: false,
    bootBox: { x: 677, y: 138, w: 311, h: 675 },
    bootPose: { rotate: 0, x: 0, y: 0, scale: 1 },
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

  const currentView = views[activeIndex];
  const currentBootBox = currentView.bootBox ?? { x: 460, y: 351, w: 722, h: 565 };
  const currentBootPose = currentView.bootPose ?? { rotate: 0, x: 0, y: 0, scale: 1 };
  const currentBootImageFrame = "bootImageFrame" in currentView ? currentView.bootImageFrame : null;
  const currentCalloutTextOpacity = "textOpacity" in currentView.calloutStyle ? currentView.calloutStyle.textOpacity : 0.7;
  const currentCalloutNotch = "notch" in currentView.calloutStyle ? currentView.calloutStyle.notch : null;
  const markerAngle = carouselMarkerAngles[activeIndex] + CAROUSEL_MARKER_ANGLE_OFFSETS[activeIndex];

  const handleChangeView = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setTransitionTick((prev) => prev + 1);
  };

  return (
    <main className="figma-site-page overflow-x-auto bg-[#d9d9d9] text-[#111]">
      <section
        className="figma-site-stage relative mx-auto hidden h-screen min-h-[1024px] min-w-[1670px] overflow-hidden bg-[#efefef] min-[1200px]:block"
      >
            <div className="absolute left-1/2 top-0 h-full min-h-[1024px] w-[1670px] -translate-x-1/2">
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
                left: "max(0px, calc((100vw - 1670px) / 2))",
                width: "min(1670px, 100vw)",
                paddingLeft: "clamp(16px, 3.6vw, 61px)",
                paddingRight: "clamp(16px, 3.6vw, 61px)",
              }}
            >
              <nav className="flex items-center gap-6">
                <Link href="/" className="text-xs font-medium text-[#111]">
                  Главная
                </Link>
                <a href="#" className="text-xs font-medium text-[#111]">
                  Купить
                </a>
                <span className="rounded-[10px] bg-gradient-to-r from-[#8b7a71] to-[#756257] px-5 py-3 text-xs font-medium text-white">
                  Модели
                </span>
                <a href="#" className="text-xs font-medium text-[#111]">
                  О нас
                </a>
              </nav>

              <div className="absolute left-1/2 top-0 h-[86px] w-[159px] -translate-x-1/2 rounded-[10px] bg-white">
                <img
                  src="/images/pages/header-logo.png"
                  alt="Velesbron"
                  className="absolute left-[-4px] top-[13px] h-[55px] w-[167px] object-contain"
                />
              </div>

              <div className="absolute top-[22px] flex items-center gap-[10px]" style={{ right: "96px" }}>
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

            <div className="absolute left-[103px] top-[232px] z-20 w-[560px]">
              <h1
                className="text-[45px] font-bold uppercase leading-none text-[#5b6a44]"
                style={{ fontFamily: "Druk Cyr, var(--font-oswald), sans-serif" }}
              >
                {currentView.title}
              </h1>
              <p className="mt-6 text-[41px] leading-[1] tracking-[0.08em] text-[#111]/20">...</p>
              <p className="mt-2 text-[40px] leading-[1] tracking-[0.08em] text-[#111]/20">...</p>

              <p className="mt-4 text-[40px] leading-[1] tracking-[0.08em] text-[#111]/20">...</p>
              <p className="mt-3 w-[532px] text-[40px] leading-[1] tracking-[0.08em] text-[#111]/20">...</p>

              <p className="mt-[-120px] w-[532px] text-[39px] leading-[1] tracking-[0.08em] text-[#111]/20">...</p>

              <p className="absolute left-0 top-[78px] w-[532px] text-[40px] leading-[1] tracking-[0.08em] text-[#111]/20">...</p>

              <p className="absolute left-0 top-[84px] w-[532px] text-[24px] font-medium leading-[1.35] tracking-normal text-[#111]">
                {currentView.description}
              </p>

              <button
                type="button"
                className="mt-[190px] h-20 w-[248px] rounded-[20px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[34px] font-medium text-white"
                style={{ fontFamily: "Druk Cyr, var(--font-oswald), sans-serif" }}
              >
                Купить
              </button>
            </div>

            <div
              className="absolute z-10 overflow-visible"
              style={{
                left: currentBootBox.x,
                top: currentBootBox.y,
                width: currentBootBox.w,
                height: currentBootBox.h,
              }}
            >
              <div key={transitionTick} className="h-full w-full animate-view-rise">
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
                        src={currentView.image}
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
                      src={currentView.image}
                      alt="Модель ботинка"
                      className="h-full w-full object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,0.12)]"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="absolute left-1/2 top-[555px] z-0 h-[1024px] w-[1536px] -translate-x-1/2 overflow-hidden">
              <img src={pedestalImage} alt="" className="h-full w-full object-cover object-center" />
            </div>

            {currentView.showMetrics !== false && (
              <>
                <div className="absolute left-[918px] top-[236px] z-20 h-[128px] w-[303px] rounded-[25px] bg-white p-6 shadow-[0_60px_100px_rgba(0,0,0,0.12)]">
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
                  className="absolute z-20 text-[22px] font-bold leading-[1.15] text-[#111]"
                  style={{
                    left: currentView.tempWidget.topLabelPos?.x ?? currentView.tempWidget.x + 40,
                    top: currentView.tempWidget.topLabelPos?.y ?? currentView.tempWidget.y - 40,
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
                  className="absolute z-20 text-[22px] font-bold leading-[1.15] text-[#111]"
                  style={{
                    left: currentView.tempWidget.bottomLabelPos?.x ?? currentView.tempWidget.x + 36,
                    top: currentView.tempWidget.bottomLabelPos?.y ?? currentView.tempWidget.y + currentView.tempWidget.h + 16,
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
            <span
              className="absolute z-20 flex size-[27px] items-center justify-center rounded-full bg-gradient-to-b from-[#e7813f] to-[#fc6407] transition-all duration-500"
              style={{
                left: currentView.anchors.calloutCard.x + currentView.anchors.calloutDot.x,
                top: currentView.anchors.calloutCard.y + currentView.anchors.calloutDot.y,
              }}
            >
              <span className="size-[10px] rounded-full bg-white" />
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

            <div className="absolute left-[102px] top-[897px] z-20 flex items-center gap-4">
              <div className="h-[75px] w-[76px] overflow-hidden rounded-[8px] border border-[#c8c8c8] bg-white p-2">
                <img src={thumbA} alt="" className="h-full w-full object-contain" />
              </div>
              <div className="h-[75px] w-[74px] overflow-hidden rounded-[8px] border border-[#9a9a9a] bg-white/40 p-2 opacity-50">
                <img src={thumbB} alt="" className="h-full w-full object-contain" />
              </div>
              <div className="ml-2 flex gap-2">
                <span className="size-[8px] rounded-full bg-[#a4a4a4]" />
                <span className="size-[8px] rounded-full bg-[#d0d0d0]" />
                <span className="size-[8px] rounded-full bg-[#d0d0d0]" />
              </div>
            </div>

            <div className="absolute top-[241px] z-20" style={{ left: "min(1414px, calc(100vw - 256px))" }}>
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
                        src={views[index].image}
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

              <div className="relative h-[560px] w-[340px]">
              </div>
            </div>
            </div>
      </section>

      <section className="min-[1200px]:hidden px-4 pb-10 pt-4">
        <header className="mb-5 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-[#111]">
            Главная
          </Link>
          <span className="rounded-[10px] bg-gradient-to-r from-[#8b7a71] to-[#756257] px-4 py-2 text-xs font-medium text-white">
            Модели
          </span>
        </header>

        <h1
          className="text-[32px] font-bold uppercase leading-none text-[#5b6a44]"
          style={{ fontFamily: "Druk Cyr, var(--font-oswald), sans-serif" }}
        >
          {currentView.title}
        </h1>
        <p className="mt-3 max-w-[700px] text-base leading-7 text-[#111]">{currentView.description}</p>

        <div className="relative mx-auto mt-4 h-[320px] w-full max-w-[460px]">
          <img
            key={`mobile-${transitionTick}`}
            src={currentView.image}
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
              <img src={view.image} alt="" className="h-[62px] w-full object-contain" />
            </button>
          ))}
        </div>

        <button
          type="button"
          className="mt-7 h-14 w-[210px] rounded-[16px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[26px] font-medium text-white"
          style={{ fontFamily: "Druk Cyr, var(--font-oswald), sans-serif" }}
        >
          Купить
        </button>
      </section>
    </main>
  );
}
