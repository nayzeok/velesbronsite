"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import {
  mobileCarouselCards,
  mobileCarouselMarkerAngles,
  MOBILE_BOOT,
  MOBILE_BOOT_BY_VIEW_BY_COLOR,
  MOBILE_CAROUSEL_ELLIPSE,
  MOBILE_CAROUSEL_CARD_SCALE,
  MOBILE_CAROUSEL_IMAGE_BOOST,
  MOBILE_CAROUSEL_IMAGE_TUNE,
  MOBILE_CAROUSEL_LAYOUT_SCALE,
  MOBILE_CAROUSEL_MARKER,
  MOBILE_CAROUSEL_MARKER_ANGLE_OFFSETS,
  MOBILE_PEDESTAL,
  MOBILE_PLAQUE_DOT,
  MOBILE_PLAQUE_TEXT_SCALE,
  MOBILE_PLAQUE_WIDTH_SCALE,
  MOBILE_PLATES_BY_VIEW,
} from "./constants-mobile";

const DESIGN_HEIGHT = 1000;

/** Ракурсы ботинка: папка public/images/models/advantages-views/2sk/ */
const mainBootSide = "/images/models/advantages-views/2sk/black/1.png";
const mainBootFront = "/images/models/advantages-views/2sk/black/2.png";
const mainBootTop = "/images/models/advantages-views/2sk/black/3.png";
const mainBootTilt = "/images/models/advantages-views/2sk/black/4.png";
const mainBootBack = "/images/models/advantages-views/2sk/black/5.png";
const pedestalImage = "/images/models/ui/pedestal-bg.png";
const thumbA = "/images/models/ui/thumb-dark.png";
const thumbB = "/images/models/ui/thumb-light.png";
const carouselCardBoot53 = "/images/models/advantages-views/2sk/oliva/1_3.png";
const carouselCardBoot30 = "/images/models/advantages-views/2sk/oliva/6.png";
const carouselCardBoot0 = "/images/models/advantages-views/2sk/oliva/3.png";
const carouselCardBootNeg36 = "/images/models/advantages-views/2sk/oliva/4.png";
const carouselCardBootNeg54 = "/images/models/advantages-views/2sk/oliva/1_2.png";
const backgroundShape = "/images/models/ui/background-shape.png";
const metricSideImage = "/images/models/ui/metric-side-image.png";

const colorViewImages = {
  black: [
    "/images/models/advantages-views/2sk/black/1.png",
    "/images/models/advantages-views/2sk/black/2.png",
    "/images/models/advantages-views/2sk/black/3.png",
    "/images/models/advantages-views/2sk/black/4.png",
    "/images/models/advantages-views/2sk/black/5.png",
  ],
  oliva: [
    "/images/models/advantages-views/2sk/oliva/1_3.png",
    "/images/models/advantages-views/2sk/oliva/6.png",
    "/images/models/advantages-views/2sk/oliva/3.png",
    "/images/models/advantages-views/2sk/oliva/4.png",
    "/images/models/advantages-views/2sk/oliva/1_2.png",
  ],
} as const;

type ColorVariant = keyof typeof colorViewImages;

const views = [
  {
    title: "ВНЕШНИЙ МАТЕРИАЛ",
    description:
      "Натуральный нубук и износостойкие вставки из Cordura 1000D выдерживают повышенную нагрузку. Гидрофобное покрытие снижает впитывание влаги и упрощает уход.",
    image: mainBootSide,
    callout: { title: "Натуральный нубук", text: "" },
    calloutStyle: {
      w: 260,
      h: 120,
      titleSize: 22,
      textSize: 22,
      textOpacity: 0.4,
      //notch: { w: 58, h: 58, x: 220, y: -29, color: "#8B8B8B" },
    },
    metricTop: { value: "12", title: "кН", line1: "НАГРУЗКА", line2: "НА ПРОКОЛ" },
    metricSide: { value: "10", line1: "СЛОЁВ", line2: "ЗАЩИТЫ" },
    glue: "Гидрофобное покрытие",
    glueStyle: { w: 300, h: 109, textSize: 22 },
    showGlue: true,
    showMetrics: false,
    glueVariant: "card",
    bootBox: { x: 460, y: 351, w: 722, h: 565 },
    bootPose: { rotate: 0, x: 0, y: 0, scale: 1.60 },
    olivaPose: { rotate: 0, x: 60, y: -175, scale: 3 },
    anchors: {
      calloutCard: { x: 420, y: 600 },
      calloutDot: { x: 235, y: 65 },
      glueBubble: { x: 1050, y: 570 },
      glueDot: { x: -14, y: 50 },
    },
    mobilePlates: {
      showTopMetric: false,
      showSideMetric: false,
      showCallout: true,
      showGluePill: true,
      showSecondaryCallout: false,
      topMetric: { left: 62, top: 442, width: 182, height: 78 },
      topMetricDot: { x: 170, y: 63 },
      callout: { left: 0, top: 700, width: 125, height: 72 },
      calloutDot: { x: 136, y: 0 },
      secondaryCallout: { left: 22, top: 60, width: 125, height: 72 },
      secondaryCalloutDot: { x: 66, y: -10 },
      sideMetric: { left: 348, top: 724, width: 103, height: 188 },
      gluePill: { left: 318, top: 700, width: 125, height: 72 },
      glueDot: { x: -5, y: -5 },
    },
  },
  {
    title: "Защита и фиксация стопы",
    description:
      "Защита и фиксация стопы: носовая часть усилена композитным подноском, а система шнуровки Quick-Lock помогает быстро и точно зафиксировать посадку под нагрузку.",
    image: mainBootFront,
    callout: { title: "Композитный подносок", text: "" },
    calloutStyle: { w: 260, h: 120, titleSize: 22, textSize: 22 },
    glue: "Система Quick-Lock",
    glueStyle: { w: 300, h: 109, textSize: 22 },
    showMetrics: false,
    glueVariant: "card",
    bootBox: { x: 684, y: 232, w: 273, h: 564 },
    bootPose: { rotate: 0, x: 10, y: 40, scale: 1.75 },
    olivaPose: { rotate: 0, x: 25, y: 45, scale: 1.77 },
    anchors: {
      calloutCard: { x: 1066, y: 717 },
      calloutDot: { x: -20, y: 34 },
      glueBubble: { x: 806, y: 340 },
      glueDot: { x: -20, y: 50 },
    },
    mobilePlates: {
      showTopMetric: false,
      showSideMetric: false,
      showCallout: true,
      showGluePill: true,
      showSecondaryCallout: false,
      topMetric: { left: 62, top: 442, width: 182, height: 78 },
      topMetricDot: { x: 170, y: 63 },
      callout: { left: 330, top: 756, width: 125, height: 72 },
      calloutDot: { x: -12, y: 10 },
      secondaryCallout: { left: 22, top: 60, width: 125, height: 72 },
      secondaryCalloutDot: { x: 66, y: -10 },
      sideMetric: { left: 348, top: 724, width: 103, height: 188 },
      gluePill: { left: 228, top: 494, width: 125, height: 72 },
      glueDot: { x: -10, y: 53 },
    },
  },
  {
    title: "ПОДОШВА БОТИНКА",
    description:
      "Гибридная литьевая подошва с износостойкой резиновой накладкой обеспечивает амортизацию, сцепление и лёгкость.\n" +
        "Антипрокольная вставка из кевлара K-29 выдерживает нагрузку свыше 1265Н и защищает от проколов.",
    image: mainBootTop,
    callout: { title: "Гибридная подошва", text: "" },
    /** Текст левой плашки на мобиле (правая плашка — callout «Гибридная подошва») */
    calloutSecondary: { title: "Антипрокольная вставка", text: "" },
    calloutStyle: { w: 260, h: 120, titleSize: 22, textSize: 22 },
    glueStyle: { w: 300, h: 109, textSize: 22 },
    glue: "Антипрокольная вставка",
    glueVariant: "card",
    showMetrics: false,
    bootBox: { x: 565, y: 105, w: 555.071, h: 689.873 },
    bootPose: { rotate: -10, x: 60, y: 20, scale: 1.55 },
    olivaPose: { rotate: -5, x: 60, y: 50, scale: 1.28 },
    anchors: {
      calloutCard: { x: 983, y: 500 },
      calloutDot: { x: 35, y: -15 },
      glueBubble: { x: 460, y: 735 },
      glueDot: { x: 281, y: -13 },
    },
    mobilePlates: {
      showTopMetric: false,
      showSideMetric: false,
      showCallout: true,
      showGluePill: false,
      showSecondaryCallout: true,
      topMetric: { left: 62, top: 442, width: 182, height: 78 },
      topMetricDot: { x: 170, y: 63 },
      callout: { left: 304, top: 664, width: 125, height: 72 },
      calloutDot: { x: -12, y: 12 },
      secondaryCallout: { left: 38, top: 774, width: 125, height: 72 },
      secondaryCalloutDot: { x: 110, y: -12 },
      sideMetric: { left: 348, top: 724, width: 103, height: 188 },
      gluePill: { left: 38, top: 700, width: 125, height: 72 },
      glueDot: { x: 172, y: 3 },
    },
  },
  {
    title: "Комфорт и внутренняя архитектура",
    description:
      "Мембрана VELTEX™ выполнена \"чулком\", проклеена по швам, защищает от влаги и сохраняет оптимальный микроклимат. Анатомическая стелька поддерживает стопу и снижает усталость.",
    image: mainBootTilt,
    callout: { title: "Мембрана VELTEX™", text: "" },
    calloutStyle: { w: 260, h: 120, titleSize: 22, textSize: 22 },
    metricTop: { value: "35", title: "°C", line1: "РАБОЧИЙ", line2: "ДИАПАЗОН" },
    metricSide: { value: "15", line1: "ОТ -15°C", line2: "СТАРТ" },
    glue: "Анатомическая стелька",
    glueStyle: { w: 300, h: 109, textSize: 22 },
    glueVariant: "card",
    showMetrics: false,
    bootBox: { x: 708, y: 116, w: 247, h: 692 },
    bootPose: { rotate: 0, x: 0, y: 10, scale: 2.75 },
    olivaPose: { rotate: 0, x: 30, y: 50, scale: 2.2 },
    tempWidget: {
      x: 951,
      y: 170,
      w: 128,
      h: 227,
      topLabel: "+20°C",
      bottomLabel: "-15°C",
      topLabelPos: { x: 1009, y: 131 },
      bottomLabelPos: { x: 1009, y: 409 },
      dot: { x: 963, y: 370 },
    },
    anchors: {
      calloutCard: { x: 904, y: 589 },
      calloutDot: { x: -20, y: 38 },
      glueBubble: { x: 540, y: 685 },
      glueDot: { x: 280, y: -13 },
    },
    mobilePlates: {
      showTopMetric: false,
      showSideMetric: false,
      showCallout: true,
      showGluePill: true,
      showSecondaryCallout: false,
      topMetric: { left: 62, top: 442, width: 182, height: 78 },
      topMetricDot: { x: 170, y: 63 },
      callout: { left: 300, top: 482, width: 125, height: 72 },
      calloutDot: { x: -12, y: 10 },
      secondaryCallout: { left: 22, top: 60, width: 125, height: 72 },
      secondaryCalloutDot: { x: 66, y: -10 },
      sideMetric: { left: 348, top: 724, width: 103, height: 188 },
      gluePill: { left: 54, top: 706, width: 125, height: 72 },
      glueDot: { x: 172, y: 3 },
    },
  },
  {
    title: "Сборка и прочность конструкции",
    description:
      "Узлы усилены тройными швами и армированными лавсановыми нитями. Конструкция рассчитана на многократные сгибы и повышенную нагрузку без расхождения швов.",
    image: mainBootBack,
    callout: { title: "Усиленные швы", text: "" },
    calloutStyle: { w: 260, h: 120, titleSize: 22, textSize: 22 },
    metricTop: { value: "14", title: "ДН", line1: "СРОК", line2: "АКТИВАЦИИ" },
    metricSide: { value: "08", line1: "FIT", line2: "ПОЛНОТА" },
    glue: "Армированные нити",
    glueStyle: { w: 300, h: 109, textSize: 22 },
    glueVariant: "card",
    showMetrics: false,
    bootBox: { x: 677, y: 138, w: 311, h: 675 },
    bootPose: { rotate: 0, x: 0, y: 30, scale: 1.7 },
    olivaPose: { rotate: 0, x: 60, y: 0, scale: 3.5 },
    anchors: {
      calloutCard: { x: 406, y: 610 },
      calloutDot: { x: 245, y: 60 },
      glueBubble: { x: 1053, y: 726 },
      glueDot: { x: -25, y: -15 },
    },
    mobilePlates: {
      showTopMetric: false,
      showSideMetric: false,
      showCallout: true,
      showGluePill: true,
      showSecondaryCallout: false,
      topMetric: { left: 62, top: 442, width: 182, height: 78 },
      topMetricDot: { x: 170, y: 63 },
      callout: { left: 38, top: 650, width: 125, height: 72 },
      calloutDot: { x: 142, y: 60 },
      secondaryCallout: { left: 22, top: 60, width: 125, height: 72 },
      secondaryCalloutDot: { x: 66, y: -10 },
      sideMetric: { left: 348, top: 724, width: 103, height: 188 },
      gluePill: { left: 316, top: 740, width: 125, height: 72 },
      glueDot: { x: -8, y: -3 },
    },
  },
] as const;

/** scale в image — масштаб картинки внутри карточки (1 = 100%). */
const carouselItems = [
  { x: 181.24, y: 80.41, rotate: 53.36, z: 5, image: { w: 99, h: 70, x: -20, y: -30, rotate: -45.9, flipY: false, scale: 5.5 }, exact53: true },
  { x: 92.17, y: 176.92, rotate: 30.46, z: 4, image: { w: 41, h: 86, x: -5, y: -25, rotate: -30.24, flipY: false, scale: 2.7 }, exact30: true },
  { x: 58.5, y: 289.47, rotate: 0, z: 3, image: { w: 70, h: 87, x: 10, y: -15, rotate: 0, flipY: false, scale: 2 }, exact0: true },
  { x: 99.81, y: 400.48, rotate: -36.65, z: 2, image: { w: 39, h: 107, x: 0, y: 0, rotate: -45, flipY: true, scale: 2.9 }, exactNeg36: true },
  { x: 180.72, y: 481.93, rotate: -54.79, z: 1, image: { w: 38, h: 84, x: 20, y: -25, rotate: 55, flipY: false, scale: 5.7 }, exactNeg54: true },
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
  const [colorVariant, setColorVariant] = useState<ColorVariant>("oliva");
  const [displayColorVariant, setDisplayColorVariant] = useState<ColorVariant>("oliva");
  const [bootColorOpacity, setBootColorOpacity] = useState(1);
  const [mobileBootShiftX, setMobileBootShiftX] = useState(0);
  const [mobileBootShiftTransition, setMobileBootShiftTransition] = useState(false);
  const [mobileBootShiftDurationMs, setMobileBootShiftDurationMs] = useState(320);
  const [isMobileBootAnimating, setIsMobileBootAnimating] = useState(false);
  const mobileSceneRef = useRef<HTMLDivElement | null>(null);
  const mobileSwipeStartXRef = useRef<number | null>(null);
  const mobileSwipeStartYRef = useRef<number | null>(null);
  const mobileBootPhaseTimerRef = useRef<number | null>(null);
  const mobileBootFinishTimerRef = useRef<number | null>(null);
  const [mobileScale, setMobileScale] = useState(1);
  const stageHeightFitScale = `min(1, calc(100dvh / ${DESIGN_HEIGHT}px))`;

  const currentView = views[activeIndex];
  const currentViewImage = colorViewImages[colorVariant][activeIndex] ?? currentView.image;
  const displayViewImage = colorViewImages[displayColorVariant][activeIndex] ?? currentView.image;
  const mobileBootByColor = MOBILE_BOOT_BY_VIEW_BY_COLOR[displayColorVariant] ?? MOBILE_BOOT_BY_VIEW_BY_COLOR.black;
  const currentMobileBoot = mobileBootByColor[activeIndex] ?? MOBILE_BOOT;
  const fallbackMobilePlates = MOBILE_PLATES_BY_VIEW[activeIndex] ?? MOBILE_PLATES_BY_VIEW[0];
  const currentMobilePlates = (currentView as { mobilePlates?: typeof fallbackMobilePlates }).mobilePlates ?? fallbackMobilePlates;
  const currentBootBox = currentView.bootBox ?? { x: 460, y: 351, w: 722, h: 565 };
  const currentBootPose =
    colorVariant === "oliva" && "olivaPose" in currentView
      ? (currentView.olivaPose as { rotate: number; x: number; y: number; scale: number })
      : currentView.bootPose ?? { rotate: 0, x: 0, y: 0, scale: 1 };
  const currentBootImageFrame =
    "bootImageFrame" in currentView
      ? (currentView.bootImageFrame as { wPct: number; hPct: number; leftPct: number; topPct: number })
      : null;
  /** Плашки: сузить по горизонтали на 20%, текст +20%. Точка привязана к плашке (позиция от плашки + смещение). */
  const DESKTOP_PLAQUE_WIDTH_SCALE = 0.8;
  const DESKTOP_PLAQUE_TEXT_SCALE = 1.2;
  const currentCalloutTextOpacity = "textOpacity" in currentView.calloutStyle ? currentView.calloutStyle.textOpacity : 0.7;
  const currentCalloutNotch = "notch" in currentView.calloutStyle ? currentView.calloutStyle.notch : null;
  const isCalloutSingleLine = !String(currentView.callout.text ?? "").trim();
  const calloutCardWidth = currentView.calloutStyle.w * DESKTOP_PLAQUE_WIDTH_SCALE;
  const calloutCardHeight = isCalloutSingleLine ? 80 : currentView.calloutStyle.h;
  const isGlueSingleLine = !currentView.glue.includes("\n");
  const currentGlueStyle =
    "glueStyle" in currentView
      ? currentView.glueStyle
      : { w: 180, h: 34, textSize: 12 };
  const glueCardWidth = currentGlueStyle.w * DESKTOP_PLAQUE_WIDTH_SCALE;
  const glueVariant = "glueVariant" in currentView ? currentView.glueVariant : "bubble";
  const glueCardHeight =
    glueVariant === "card" ? (isGlueSingleLine ? 80 : currentGlueStyle.h) : currentGlueStyle.h;
  const isThermalCallout = (currentView.title as string) === "ВНУТРЕННИЙ МАТЕРИАЛ";
  /** Точка привязана к плашке: позиция плашки + смещение (как на мобильной). При сужении плашки смещение по X масштабируем. */
  const calloutDotPosition = isThermalCallout
    ? {
        left: currentView.anchors.calloutCard.x + 10 * DESKTOP_PLAQUE_WIDTH_SCALE,
        top: currentView.anchors.calloutCard.y + 42,
      }
    : {
        left: currentView.anchors.calloutCard.x + currentView.anchors.calloutDot.x * DESKTOP_PLAQUE_WIDTH_SCALE,
        top: currentView.anchors.calloutCard.y + currentView.anchors.calloutDot.y,
      };
  const calloutDotOuterSize = isThermalCallout ? 34 : 30;
  const calloutDotInnerSize = isThermalCallout ? 16 : 14;
  const bootCenterOffsetX = 1536 / 2 - currentBootBox.w / 2 - currentBootBox.x;
  const desktopMarkerAngle = carouselMarkerAngles[activeIndex] + CAROUSEL_MARKER_ANGLE_OFFSETS[activeIndex];
  const mobileMarkerAngle = mobileCarouselMarkerAngles[activeIndex] + MOBILE_CAROUSEL_MARKER_ANGLE_OFFSETS[activeIndex];
  const tempLabelStyle = {
    width: 61,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center" as const,
    fontFamily: "var(--font-roboto-flex), sans-serif",
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

  useEffect(() => {
    if (displayColorVariant === colorVariant) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBootColorOpacity(0.50);
    const swapTimer = window.setTimeout(() => {
      setDisplayColorVariant(colorVariant);
      setBootColorOpacity(1);
    }, 240);

    return () => window.clearTimeout(swapTimer);
  }, [colorVariant, displayColorVariant]);

  useEffect(() => {
    return () => {
      if (mobileBootPhaseTimerRef.current !== null) {
        window.clearTimeout(mobileBootPhaseTimerRef.current);
      }
      if (mobileBootFinishTimerRef.current !== null) {
        window.clearTimeout(mobileBootFinishTimerRef.current);
      }
    };
  }, []);

  const resolveMobileDirection = (targetIndex: number): -1 | 1 => {
    if (activeIndex === targetIndex) return 1;
    if (activeIndex === views.length - 1 && targetIndex === 0) return -1;
    if (activeIndex === 0 && targetIndex === views.length - 1) return 1;
    return targetIndex > activeIndex ? -1 : 1;
  };

  const handleChangeView = (index: number, mobileSwipeDirection?: -1 | 1) => {
    if (index === activeIndex || isMobileBootAnimating) return;

    const resolvedDirection = mobileSwipeDirection ?? resolveMobileDirection(index);
    const MOBILE_EXIT_DISTANCE = 560;
    const MOBILE_EXIT_MS = 420;
    const MOBILE_ENTER_MS = 420;

    if (mobileBootPhaseTimerRef.current !== null) {
      window.clearTimeout(mobileBootPhaseTimerRef.current);
    }
    if (mobileBootFinishTimerRef.current !== null) {
      window.clearTimeout(mobileBootFinishTimerRef.current);
    }
    setIsMobileBootAnimating(true);

    if (resolvedDirection) {
      // resolvedDirection: 1 => swipe left, -1 => swipe right
      // current boot exits in swipe direction, new boot enters from opposite side
      const exitTarget = -resolvedDirection * MOBILE_EXIT_DISTANCE;
      const enterStart = resolvedDirection * MOBILE_EXIT_DISTANCE;

      setMobileBootShiftDurationMs(MOBILE_EXIT_MS);
      setMobileBootShiftTransition(true);
      setMobileBootShiftX(exitTarget);

      mobileBootPhaseTimerRef.current = window.setTimeout(() => {
        setActiveIndex(index);
        setTransitionTick((prev) => prev + 1);
        setMobileBootShiftTransition(false);
        setMobileBootShiftX(enterStart);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setMobileBootShiftDurationMs(MOBILE_ENTER_MS);
            setMobileBootShiftTransition(true);
            setMobileBootShiftX(0);
          });
        });
      }, MOBILE_EXIT_MS);

      mobileBootFinishTimerRef.current = window.setTimeout(() => {
        setIsMobileBootAnimating(false);
      }, MOBILE_EXIT_MS + MOBILE_ENTER_MS);
      return;
    }

    setActiveIndex(index);
    setTransitionTick((prev) => prev + 1);
    setIsMobileBootAnimating(false);
  };
  const handleMobileBootTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    mobileSwipeStartXRef.current = touch.clientX;
    mobileSwipeStartYRef.current = touch.clientY;
  };
  const handleMobileBootTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (mobileSwipeStartXRef.current === null || mobileSwipeStartYRef.current === null) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - mobileSwipeStartXRef.current;
    const deltaY = touch.clientY - mobileSwipeStartYRef.current;

    mobileSwipeStartXRef.current = null;
    mobileSwipeStartYRef.current = null;

    // Ignore mostly vertical gestures to keep page scroll natural.
    if (Math.abs(deltaY) > Math.abs(deltaX)) return;
    if (Math.abs(deltaX) < 24) return;

    if (deltaX < 0) {
      // Swipe left -> animate boot movement to the left.
      handleChangeView((activeIndex + 1) % views.length, 1);
      return;
    }
    // Swipe right -> animate boot movement to the right.
    handleChangeView((activeIndex - 1 + views.length) % views.length, -1);
  };

  useEffect(() => {
    const node = mobileSceneRef.current;
    if (!node) return;

    const updateScale = () => {
      const width = node.clientWidth || 460;
      setMobileScale(width / 460);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

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
          <SiteHeader className="absolute left-0 right-0 top-0 z-20 h-[96px] w-full" />
          <div
            className="absolute inset-x-0 top-0 h-[1000px] origin-top"
            style={{
              transform: `scale(${stageHeightFitScale})`,
            }}
          >
            <div className="pointer-events-none absolute left-1/2 top-0 h-full w-[886px] -translate-x-1/2">
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
            </div>

            <div className="h-[96px] shrink-0" aria-hidden="true" />

            <div
              className="absolute z-20 h-[520px]"
              style={{
                left: "clamp(20px, 3.5vw, 72px)",
                top: "clamp(164px, 22.7vh, 232px)",
                width: (currentView.title as string) === "Комфорт и внутренняя архитектура" ? 680 : 560,
              }}
            >
              <div className="relative flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="8"
                    viewBox="0 0 34 8"
                    fill="none"
                    aria-hidden="true"
                    className="mt-6 shrink-0"
                  >
                    <circle opacity="0.4" cx="4" cy="4" r="4" fill="#111111" />
                    <circle opacity="0.2" cx="17" cy="4" r="4" fill="#111111" />
                    <circle opacity="0.1" cx="30" cy="4" r="4" fill="#111111" />
                  </svg>
                  <h1
                    className="uppercase leading-tight"
                    style={{
                      color: "#111",
                      fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                      fontSize: 34,
                      fontStyle: "normal",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                    }}
                  >
                  {currentView.title}
                  </h1>
                </div>
                <div className="flex gap-4">
                  <div className="w-[34px] shrink-0" aria-hidden="true" />
                  <p className="max-w-[532px] text-[24px] font-medium leading-[1.35] tracking-normal text-[#111]">
                    {currentView.description}
                  </p>
                </div>
              </div>
              <Link
                href="/models"
                className="absolute left-[50px] top-[368px] flex h-20 w-[248px] items-center justify-center rounded-[20px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[26px] font-medium text-white"
                style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", letterSpacing: "0.08em" }}
              >
                ПОДРОБНЕЕ
              </Link>
            </div>

            <div className="absolute left-1/2 top-0 h-[1000px] w-[1536px] -translate-x-1/2">
              <div
                key={`${transitionTick}-${colorVariant}`}
                className="absolute z-10 overflow-visible"
                style={{
                  left: 1536 / 2 - currentBootBox.w / 2,
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
                          src={displayViewImage}
                          alt="Модель ботинка"
                          className="absolute max-w-none drop-shadow-[0_60px_100px_rgba(0,0,0,0.12)]"
                          style={{
                            width: `${currentBootImageFrame.wPct}%`,
                            height: `${currentBootImageFrame.hPct}%`,
                            left: `${currentBootImageFrame.leftPct}%`,
                            top: `${currentBootImageFrame.topPct}%`,
                            opacity: bootColorOpacity,
                            transition: "opacity 280ms ease",
                          }}
                        />
                      </div>
                    ) : (
                      <img
                        src={displayViewImage}
                        alt="Модель ботинка"
                        className="h-full w-full object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,0.12)]"
                        style={{
                          opacity: bootColorOpacity,
                          transition: "opacity 280ms ease",
                        }}
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
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
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

              <div className="absolute left-0 top-[555px] z-0 w-[1536px] overflow-hidden" style={{ height: DESIGN_HEIGHT }}>
                <img src={pedestalImage} alt="" className="h-full w-full object-cover object-center" />
              </div>

            {currentView.showMetrics !== false && "metricTop" in currentView && "metricSide" in currentView && (
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

            {/* Градусник на 4-м ракурсе — временно отключен */}
            {false && currentView.tempWidget && (
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
                  left: currentView.anchors.calloutCard.x + bootCenterOffsetX,
                  top: currentView.anchors.calloutCard.y,
                  width: calloutCardWidth,
                  height: calloutCardHeight,
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
                <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
                  <p className="leading-[1.08] tracking-[-0.02em] text-[#111]" style={{ fontSize: currentView.calloutStyle.titleSize * DESKTOP_PLAQUE_TEXT_SCALE }}>
                    <span className="font-bold">{currentView.callout.title}</span>
                  </p>
                  <p
                    className="leading-[1.08] tracking-[-0.02em]"
                    style={{ fontSize: currentView.calloutStyle.textSize * DESKTOP_PLAQUE_TEXT_SCALE, color: `rgba(17,17,17,${currentCalloutTextOpacity})` }}
                  >
                    {currentView.callout.text}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="absolute z-20 flex flex-col items-center justify-center rounded-[22px] bg-white p-6 text-center shadow-[0_60px_100px_rgba(0,0,0,0.12)] transition-all duration-500"
                style={{
                  left: currentView.anchors.calloutCard.x + bootCenterOffsetX,
                  top: currentView.anchors.calloutCard.y,
                  width: calloutCardWidth,
                  height: calloutCardHeight,
                  ...(currentCalloutNotch
                    ? {
                        WebkitMask: `radial-gradient(circle ${(currentCalloutNotch.w * DESKTOP_PLAQUE_WIDTH_SCALE) / 2}px at ${
                          (currentCalloutNotch.x + currentCalloutNotch.w / 2) * DESKTOP_PLAQUE_WIDTH_SCALE
                        }px -8px, transparent 98%, #000 100%)`,
                        mask: `radial-gradient(circle ${(currentCalloutNotch.w * DESKTOP_PLAQUE_WIDTH_SCALE) / 2}px at ${
                          (currentCalloutNotch.x + currentCalloutNotch.w / 2) * DESKTOP_PLAQUE_WIDTH_SCALE
                        }px -8px, transparent 98%, #000 100%)`,
                      }
                    : {}),
                }}
              >
                <p className="leading-[1.08] tracking-[-0.02em] text-[#111]" style={{ fontSize: currentView.calloutStyle.titleSize * DESKTOP_PLAQUE_TEXT_SCALE }}>
                  <span className="font-bold">{currentView.callout.title}</span>
                </p>
                <p
                  className="leading-[1.08] tracking-[-0.02em]"
                  style={{ fontSize: currentView.calloutStyle.textSize * DESKTOP_PLAQUE_TEXT_SCALE, color: `rgba(17,17,17,${currentCalloutTextOpacity})` }}
                >
                  {currentView.callout.text}
                </p>
              </div>
            )}
            <span
              className="absolute z-20 flex items-center justify-center rounded-full bg-gradient-to-b from-[#e7813f] to-[#fc6407] transition-all duration-500"
              style={{ ...calloutDotPosition, left: calloutDotPosition.left + bootCenterOffsetX, width: calloutDotOuterSize, height: calloutDotOuterSize }}
            >
              <span className="rounded-full bg-white" style={{ width: calloutDotInnerSize, height: calloutDotInnerSize }} />
            </span>

            {("showGlue" in currentView ? currentView.showGlue : true) !== false && (
              <>
                <div
                  className={`absolute z-20 bg-white text-[#111] shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500 ${
                    glueVariant === "card"
                      ? "flex flex-col items-center justify-center rounded-[22px] p-6 text-center"
                      : "flex items-center justify-center rounded-full px-6 py-3 text-center font-medium leading-[1.1]"
                  }`}
                  style={{
                    left: currentView.anchors.glueBubble.x + bootCenterOffsetX,
                    top: currentView.anchors.glueBubble.y,
                    width: glueCardWidth,
                    height: glueCardHeight,
                    fontSize: currentGlueStyle.textSize * DESKTOP_PLAQUE_TEXT_SCALE,
                  }}
                >
                  {glueVariant === "card" ? (
                    <>
                      {(() => {
                        const glueLines = currentView.glue.split("\n");
                        const glueTitle = glueLines[0] ?? "";
                        const glueItems = glueLines.slice(1);
                        const glueTitleSize = currentGlueStyle.textSize * DESKTOP_PLAQUE_TEXT_SCALE;
                        const glueBodySize = Math.max(glueTitleSize - 7, 14);
                        return (
                          <>
                            <p className="leading-[1.08] tracking-[-0.02em] font-bold text-[#111]" style={{ fontSize: glueTitleSize }}>
                              {glueTitle}
                            </p>
                            {glueItems.map((line) => (
                              <p key={line} className="mt-1 leading-[1.08] tracking-[-0.02em] text-[#111]/75" style={{ fontSize: glueBodySize }}>
                                {line}
                              </p>
                            ))}
                          </>
                        );
                      })()}
                    </>
                  ) : (
                    currentView.glue
                  )}
                </div>

                <span
                  className="absolute z-20 size-[40px] transition-all duration-500"
                  style={{
                    left: currentView.anchors.glueBubble.x + currentView.anchors.glueDot.x * DESKTOP_PLAQUE_WIDTH_SCALE + bootCenterOffsetX,
                    top: currentView.anchors.glueBubble.y + currentView.anchors.glueDot.y,
                  }}
                >
                  <span className="absolute inset-0 rounded-full bg-white opacity-90 shadow-[0_20px_40px_rgba(0,0,0,0.12)]" />
                  <span className="absolute left-[3px] top-[3px] size-[34px] rounded-full bg-gradient-to-b from-[#e7813f] to-[#fc6407] opacity-95" />
                  <span className="absolute left-[12px] top-[12px] size-4 rounded-full bg-white" />
                </span>
              </>
            )}

            </div>

            {/*<div className="absolute z-20 flex items-center gap-4" style={{ left: "clamp(40px, 6.1vw, 102px)", top: "clamp(780px, 87.6vh, 897px)" }}>
               Временно отключили переключение на черный. Блок оставлен для быстрого возврата.
              {false && (
                <button
                  type="button"
                  onClick={() => setColorVariant("black")}
                  aria-label="Показать черную модель"
                  className={`h-[80px] w-[81px] overflow-hidden rounded-[8px] border bg-white p-2 transition ${
                    colorVariant === "black" ? "border-[#c8c8c8]" : "border-[#9a9a9a] opacity-50"
                  }`}
                >
                  <img src={thumbA} alt="" className="h-full w-full object-contain" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setColorVariant("oliva")}
                aria-label="Показать оливковую модель"
                className={`h-[80px] w-[79px] overflow-hidden rounded-[8px] border bg-white p-2 transition ${
                  colorVariant === "oliva" ? "border-[#c8c8c8]" : "border-[#9a9a9a] opacity-50"
                }`}
              >
                <img src={thumbB} alt="" className="h-full w-full object-contain" />
              </button>
            </div>*/}

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
                        <img src={carouselCardBoot53} alt="" className="h-[70.769px] w-[99.017px] object-contain" style={{ transform: `translate(${item.image.x}px, ${item.image.y}px) rotate(${item.image.rotate}deg) scale(${item.image.scale ?? 1})`, transformOrigin: "50% 50%" }} />
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
                        <img src={carouselCardBoot30} alt="" className="h-[86px] w-[41px] object-contain" style={{ transform: `translate(${item.image.x}px, ${item.image.y}px) rotate(${item.image.rotate}deg) scale(${item.image.scale ?? 1})`, transformOrigin: "50% 50%" }} />
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
                        <img src={carouselCardBoot0} alt="" className="h-full w-full object-contain" style={{ transform: `translate(${item.image.x}px, ${item.image.y}px) rotate(${item.image.rotate}deg) scale(${item.image.scale ?? 1})`, transformOrigin: "50% 50%" }} />
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
                        <img src={carouselCardBootNeg36} alt="" className="h-[107px] w-[39px] object-contain" style={{ transform: `scaleY(-1) rotate(180deg) translate(${item.image.x}px, ${item.image.y}px) rotate(${item.image.rotate}deg) scale(${item.image.scale ?? 1})`, transformOrigin: "50% 50%" }} />
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
                        <img src={carouselCardBootNeg54} alt="" className="h-[84px] w-[38px] object-contain" style={{ transform: `translate(${item.image.x}px, ${item.image.y}px) rotate(${item.image.rotate}deg) scale(${item.image.scale ?? 1})`, transformOrigin: "50% 50%" }} />
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
                          transform: `${item.image.flipY ? "scaleY(-1) rotate(180deg)" : ""} rotate(${item.image.rotate}deg) scale(${item.image.scale ?? 1})`,
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
                  transform: `translate(${CAROUSEL_ARC_CENTER.x}px, ${CAROUSEL_ARC_CENTER.y}px) translate(-50%, -50%) rotate(${desktopMarkerAngle}deg) translateX(${CAROUSEL_MARKER_RADIUS}px)`,
                }}
              >
                <div className="flex size-7 rotate-[-32.62deg] items-center justify-center rounded-full bg-[#F17823]" />
              </div>
          </div>
          </div>
        </div>
      </section>

      <section className="min-[1200px]:hidden">
        <div ref={mobileSceneRef} className="relative mx-auto w-full max-w-[460px] overflow-hidden" style={{ height: `${1024 * mobileScale}px` }}>
          <div className="absolute left-0 top-0 h-[1024px] w-[460px] origin-top-left bg-[#f4f4f4]" style={{ transform: `scale(${mobileScale})` }}>
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

          {/*<div className="absolute right-[10px] top-[30px] z-20 flex gap-2">*/}
          {/*   Временно отключили переключение на черный. Блок оставлен для быстрого возврата. */}
          {/*  {false && (*/}
          {/*    <button*/}
          {/*      type="button"*/}
          {/*      onClick={() => setColorVariant("black")}*/}
          {/*      aria-label="Показать черную модель"*/}
          {/*      className={`h-[48px] w-[50px] overflow-hidden rounded-[6px] border bg-white p-1 transition ${*/}
          {/*        colorVariant === "black" ? "border-[#c8c8c8]" : "border-[#9a9a9a] opacity-45"*/}
          {/*      }`}*/}
          {/*    >*/}
          {/*      <img src={thumbA} alt="" className="h-full w-full object-contain" />*/}
          {/*    </button>*/}
          {/*  )}*/}
          {/*  <button*/}
          {/*    type="button"*/}
          {/*    onClick={() => setColorVariant("oliva")}*/}
          {/*    aria-label="Показать оливковую модель"*/}
          {/*    className={`h-[48px] w-[50px] overflow-hidden rounded-[6px] border bg-white p-1 transition ${*/}
          {/*      colorVariant === "oliva" ? "border-[#c8c8c8]" : "border-[#9a9a9a] opacity-35"*/}
          {/*    }`}*/}
          {/*  >*/}
          {/*    <img src={thumbB} alt="" className="h-full w-full object-contain" />*/}
          {/*  </button>*/}
          {/*</div>*/}

          <div
            className="absolute left-[8px] top-[46px] z-20"
            style={{ width: (currentView.title as string) === "Комфорт и внутренняя архитектура" ? 380 : 312 }}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-[10px]">
                <div className="mt-3.5 flex h-2 w-[34px] shrink-0 items-center justify-between">
                  <span className="size-2 rounded-full bg-[#111]/40" />
                  <span className="size-2 rounded-full bg-[#111]/20" />
                  <span className="size-2 rounded-full bg-[#111]/10" />
                </div>
                <h1
                  className="uppercase leading-tight"
                  style={{
                    color: "#111",
                    fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                    fontSize: 21,
                    fontStyle: "normal",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                  }}
                >
                {currentView.title}
              </h1>
            </div>
            <div className="flex gap-[10px]">
              <div className="w-[34px] shrink-0" aria-hidden="true" />
              <p className="max-w-[236px] text-[14px] leading-[1.15] text-[#111]" style={{ fontFamily: "var(--font-roboto-flex), sans-serif" }}>
                  {currentView.description}
                </p>
              </div>
            </div>
            <Link
              href="/where-to-buy"
              className="ml-[44px] mt-5 flex h-12 w-[150px] items-center justify-center rounded-[12px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[14px] text-white"
              style={{ fontFamily: "var(--font-roboto-flex), sans-serif", fontWeight: 500 }}
            >
              Купить
            </Link>
          </div>

          <div className="absolute left-0 top-0 z-40">
            <div
              className="pointer-events-none absolute"
              style={{
                left: MOBILE_CAROUSEL_ELLIPSE.left,
                top: MOBILE_CAROUSEL_ELLIPSE.top,
                width: MOBILE_CAROUSEL_ELLIPSE.size,
                height: MOBILE_CAROUSEL_ELLIPSE.size,
                background: "linear-gradient(90deg, #C8C8C8 0%, rgba(255, 255, 255, 0) 33.38%)",
                borderRadius: "50%",
                WebkitMask: `radial-gradient(closest-side, transparent calc(100% - ${MOBILE_CAROUSEL_ELLIPSE.thickness}px), #000 calc(100% - ${
                  MOBILE_CAROUSEL_ELLIPSE.thickness - 1
                }px))`,
                mask: `radial-gradient(closest-side, transparent calc(100% - ${MOBILE_CAROUSEL_ELLIPSE.thickness}px), #000 calc(100% - ${
                  MOBILE_CAROUSEL_ELLIPSE.thickness - 1
                }px))`,
              }}
            />
            {views.map((view, index) => (
              <button
                key={view.title}
                type="button"
                onClick={() => handleChangeView(index)}
                aria-label={`Показать ракурс ${index + 1}`}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: mobileCarouselCards[index].x,
                  top: mobileCarouselCards[index].y,
                  width: 69 * MOBILE_CAROUSEL_CARD_SCALE,
                  height: 47 * MOBILE_CAROUSEL_CARD_SCALE,
                  transform: `translate(-50%, -50%) rotate(${mobileCarouselCards[index].rotate}deg)`,
                  zIndex: carouselItems[index].z,
                  opacity: index === activeIndex ? 1 : 0.9,
                }}
              >
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 117 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path
                    d="M0 13.0015C0 5.2534 6.73485 -0.774587 14.4356 0.0810526L105.436 10.1922C112.019 10.9237 117 16.4885 117 23.1127V56.9899C117 63.7616 111.802 69.3992 105.052 69.9472L14.0521 77.3361C6.48245 77.9507 0 71.9733 0 64.3788V13.0015Z"
                    fill="url(#paint0_mobile)"
                  />
                  <defs>
                    <linearGradient id="paint0_mobile" x1="58.5" y1="-1.5229" x2="58.5" y2="78.4771" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E7813F" />
                      <stop offset="1" stopColor="#FC6407" />
                    </linearGradient>
                  </defs>
                </svg>
                <img
                  src={colorViewImages[colorVariant][index] ?? view.image}
                  alt=""
                  className="pointer-events-none absolute object-contain"
                  style={{
                    width:
                      carouselItems[index].image.w *
                      MOBILE_CAROUSEL_LAYOUT_SCALE *
                      MOBILE_CAROUSEL_IMAGE_BOOST *
                      MOBILE_CAROUSEL_IMAGE_TUNE[index].boost *
                      MOBILE_CAROUSEL_CARD_SCALE,
                    height:
                      carouselItems[index].image.h *
                      MOBILE_CAROUSEL_LAYOUT_SCALE *
                      MOBILE_CAROUSEL_IMAGE_BOOST *
                      MOBILE_CAROUSEL_IMAGE_TUNE[index].boost *
                      MOBILE_CAROUSEL_CARD_SCALE,
                    left:
                      (carouselItems[index].image.x * MOBILE_CAROUSEL_LAYOUT_SCALE -
                        (carouselItems[index].image.w *
                          MOBILE_CAROUSEL_LAYOUT_SCALE *
                          (MOBILE_CAROUSEL_IMAGE_BOOST * MOBILE_CAROUSEL_IMAGE_TUNE[index].boost - 1)) /
                          2 +
                        MOBILE_CAROUSEL_IMAGE_TUNE[index].x) *
                      MOBILE_CAROUSEL_CARD_SCALE,
                    top:
                      (carouselItems[index].image.y * MOBILE_CAROUSEL_LAYOUT_SCALE -
                        (carouselItems[index].image.h *
                          MOBILE_CAROUSEL_LAYOUT_SCALE *
                          (MOBILE_CAROUSEL_IMAGE_BOOST * MOBILE_CAROUSEL_IMAGE_TUNE[index].boost - 1)) /
                          2 +
                        MOBILE_CAROUSEL_IMAGE_TUNE[index].y) *
                      MOBILE_CAROUSEL_CARD_SCALE,
                    transform: `${carouselItems[index].image.flipY ? "scaleY(-1) rotate(180deg)" : ""} rotate(${carouselItems[index].image.rotate}deg) scale(${carouselItems[index].image.scale ?? 1})`,
                    transformOrigin: "50% 50%",
                  }}
                />
              </button>
            ))}
            <div
              className="pointer-events-none absolute flex items-center justify-center rounded-full bg-[#F17823] transition-all duration-500"
              style={{
                width: MOBILE_CAROUSEL_MARKER.size,
                height: MOBILE_CAROUSEL_MARKER.size,
                transform: `translate(${MOBILE_CAROUSEL_MARKER.centerX}px, ${MOBILE_CAROUSEL_MARKER.centerY}px) translate(-50%, -50%) rotate(${mobileMarkerAngle}deg) translateX(${MOBILE_CAROUSEL_MARKER.radius}px)`,
              }}
            />
          </div>

          <div
            className="pointer-events-none absolute z-10"
            style={{
              left: MOBILE_PEDESTAL.left,
              top: MOBILE_PEDESTAL.top,
              width: MOBILE_PEDESTAL.width,
              height: MOBILE_PEDESTAL.height,
            }}
          >
            <img src={pedestalImage} alt="" className="h-full w-full object-cover object-top" style={{ opacity: MOBILE_PEDESTAL.opacity }} />
          </div>

          <div
            className="absolute z-20"
            style={{
              left: currentMobileBoot.left,
              top: currentMobileBoot.top,
              width: currentMobileBoot.width,
              height: currentMobileBoot.height,
              touchAction: "pan-x",
              transform: `translateX(${mobileBootShiftX}px) scale(${currentMobileBoot.scale ?? 1})`,
              transformOrigin: "50% 50%",
              transition: mobileBootShiftTransition ? `transform ${mobileBootShiftDurationMs}ms ease-out` : "none",
            }}
            onTouchStart={handleMobileBootTouchStart}
            onTouchEnd={handleMobileBootTouchEnd}
          >
            <img
              key={`mobile-${transitionTick}-${colorVariant}`}
              src={displayViewImage}
              alt="Модель ботинка"
              className="h-full w-full drop-shadow-[0_30px_70px_rgba(0,0,0,0.2)]"
              style={{
                objectFit: "contain",
                objectPosition: currentMobileBoot.objectPosition,
                opacity: bootColorOpacity,
                transition: "opacity 280ms ease",
              }}
            />
          </div>

          {currentMobilePlates.showTopMetric && (
            <>
              <div
                className="absolute z-30 flex flex-col items-center justify-center rounded-[22px] bg-white p-5 text-center shadow-[0_60px_100px_rgba(0,0,0,0.12)] transition-all duration-500"
                style={{
                  left: currentMobilePlates.topMetric.left,
                  top: currentMobilePlates.topMetric.top,
                  width: currentMobilePlates.topMetric.width,
                  height: currentMobilePlates.topMetric.height,
                }}
              >
                <p className="font-bold leading-none tracking-[-0.04em] text-[#111]" style={{ fontSize: 43 * MOBILE_PLAQUE_TEXT_SCALE }}>{currentView.metricTop.value}</p>
                <div className="mt-1 leading-[1.03]" style={{ fontSize: 14 * MOBILE_PLAQUE_TEXT_SCALE }}>
                  <p className="font-bold text-[#111]">{currentView.metricTop.title}</p>
                  <p className="text-[#111]/35">{currentView.metricTop.line1}</p>
                  <p className="text-[#111]/35">{currentView.metricTop.line2}</p>
                </div>
              </div>
              <span
                className="absolute z-30 flex items-center justify-center rounded-full bg-gradient-to-b from-[#e7813f] to-[#fc6407] transition-all duration-500"
                style={{
                  left: currentMobilePlates.topMetric.left + currentMobilePlates.topMetricDot.x,
                  top: currentMobilePlates.topMetric.top + currentMobilePlates.topMetricDot.y,
                  width: MOBILE_PLAQUE_DOT.outer,
                  height: MOBILE_PLAQUE_DOT.outer,
                }}
              >
                <span className="rounded-full bg-white" style={{ width: MOBILE_PLAQUE_DOT.inner, height: MOBILE_PLAQUE_DOT.inner }} />
              </span>
            </>
          )}

          {currentMobilePlates.showGluePill && (
            <>
              <div
                className="absolute z-30 flex flex-col items-center justify-center rounded-[22px] bg-white p-5 text-center shadow-[0_60px_100px_rgba(0,0,0,0.12)] transition-all duration-500"
                style={{
                  left: currentMobilePlates.gluePill.left,
                  top: currentMobilePlates.gluePill.top,
                  width: currentMobilePlates.gluePill.width,
                  height: currentMobilePlates.gluePill.height,
                }}
              >
                {(() => {
                  const glueLines = currentView.glue.split("\n");
                  const glueTitle = glueLines[0] ?? "";
                  const glueItems = glueLines.slice(1);
                  return (
                    <>
                      <p className="leading-[1.05] tracking-[-0.01em] font-bold text-[#111]" style={{ fontSize: 13 * MOBILE_PLAQUE_TEXT_SCALE }}>{glueTitle}</p>
                      {glueItems.map((line) => (
                        <p key={line} className="mt-0.5 leading-[1.05] text-[#111]/75" style={{ fontSize: 11 * MOBILE_PLAQUE_TEXT_SCALE }}>
                          {line}
                        </p>
                      ))}
                    </>
                  );
                })()}
              </div>
              <span
                className="absolute z-30 flex items-center justify-center rounded-full bg-gradient-to-b from-[#e7813f] to-[#fc6407] transition-all duration-500"
                style={{
                  left: currentMobilePlates.gluePill.left + currentMobilePlates.glueDot.x * MOBILE_PLAQUE_WIDTH_SCALE,
                  top: currentMobilePlates.gluePill.top + currentMobilePlates.glueDot.y,
                  width: MOBILE_PLAQUE_DOT.outer,
                  height: MOBILE_PLAQUE_DOT.outer,
                }}
              >
                <span className="rounded-full bg-white" style={{ width: MOBILE_PLAQUE_DOT.inner, height: MOBILE_PLAQUE_DOT.inner }} />
              </span>
            </>
          )}

          {currentMobilePlates.showCallout && (
            <>
              <div
                className="absolute z-30 flex flex-col items-center justify-center rounded-[22px] bg-white p-5 text-center shadow-[0_60px_100px_rgba(0,0,0,0.12)] transition-all duration-500"
                style={{
                  left: currentMobilePlates.callout.left,
                  top: currentMobilePlates.callout.top,
                  width: currentMobilePlates.callout.width,
                  height: currentMobilePlates.callout.height,
                }}
              >
                <p className="leading-[1.05]" style={{ fontSize: 13 * MOBILE_PLAQUE_TEXT_SCALE }}>
                  <span className="font-bold text-[#111]">{currentView.callout.title}</span>
                </p>
                <p className="leading-[1.05] text-[#111]/40" style={{ fontSize: 13 * MOBILE_PLAQUE_TEXT_SCALE }}>{currentView.callout.text}</p>
              </div>
              <span
                className="absolute z-30 flex items-center justify-center rounded-full bg-gradient-to-b from-[#e7813f] to-[#fc6407] transition-all duration-500"
                style={{
                  left: currentMobilePlates.callout.left + currentMobilePlates.calloutDot.x * MOBILE_PLAQUE_WIDTH_SCALE,
                  top: currentMobilePlates.callout.top + currentMobilePlates.calloutDot.y,
                  width: MOBILE_PLAQUE_DOT.outer,
                  height: MOBILE_PLAQUE_DOT.outer,
                }}
              >
                <span className="rounded-full bg-white" style={{ width: MOBILE_PLAQUE_DOT.inner, height: MOBILE_PLAQUE_DOT.inner }} />
              </span>
            </>
          )}

          {currentMobilePlates.showSecondaryCallout && (() => {
            const secondaryCalloutContent = (currentView as { calloutSecondary?: { title: string; text: string } }).calloutSecondary ?? currentView.callout;
            return (
            <>
              <div
                className="absolute z-30 flex flex-col items-center justify-center rounded-[22px] bg-white p-5 text-center shadow-[0_60px_100px_rgba(0,0,0,0.12)] transition-all duration-500"
                style={{
                  left: currentMobilePlates.secondaryCallout.left,
                  top: currentMobilePlates.secondaryCallout.top,
                  width: currentMobilePlates.secondaryCallout.width,
                  height: currentMobilePlates.secondaryCallout.height,
                }}
              >
                <p className="leading-[1.05]" style={{ fontSize: 13 * MOBILE_PLAQUE_TEXT_SCALE }}>
                  <span className="font-bold text-[#111]">{secondaryCalloutContent.title}</span>
                </p>
                <p className="leading-[1.05] text-[#111]/40" style={{ fontSize: 13 * MOBILE_PLAQUE_TEXT_SCALE }}>{secondaryCalloutContent.text}</p>
              </div>
              <span
                className="absolute z-30 flex items-center justify-center rounded-full bg-gradient-to-b from-[#e7813f] to-[#fc6407] transition-all duration-500"
                style={{
                  left: currentMobilePlates.secondaryCallout.left + currentMobilePlates.secondaryCalloutDot.x * MOBILE_PLAQUE_WIDTH_SCALE,
                  top: currentMobilePlates.secondaryCallout.top + currentMobilePlates.secondaryCalloutDot.y,
                  width: MOBILE_PLAQUE_DOT.outer,
                  height: MOBILE_PLAQUE_DOT.outer,
                }}
              >
                <span className="rounded-full bg-white" style={{ width: MOBILE_PLAQUE_DOT.inner, height: MOBILE_PLAQUE_DOT.inner }} />
              </span>
            </>
            );
          })()}

          {currentMobilePlates.showSideMetric && (
            <div
              className="absolute z-30 flex flex-col items-center justify-center rounded-[22px] bg-white p-5 text-center shadow-[0_60px_100px_rgba(0,0,0,0.12)] transition-all duration-500"
              style={{
                left: currentMobilePlates.sideMetric.left,
                top: currentMobilePlates.sideMetric.top,
                width: currentMobilePlates.sideMetric.width,
                height: currentMobilePlates.sideMetric.height,
              }}
            >
              <span
                className="absolute -left-[8px] top-[18px] flex items-center justify-center rounded-full bg-gradient-to-b from-[#e7813f] to-[#fc6407]"
                style={{ width: MOBILE_PLAQUE_DOT.outer, height: MOBILE_PLAQUE_DOT.outer }}
              >
                <span className="rounded-full bg-white" style={{ width: MOBILE_PLAQUE_DOT.inner, height: MOBILE_PLAQUE_DOT.inner }} />
              </span>
              <p className="font-bold leading-none tracking-[-0.08em] text-[#111]" style={{ fontSize: 43 * MOBILE_PLAQUE_TEXT_SCALE }}>{currentView.metricSide.value}</p>
              <p className="pt-2 leading-[1.05] text-[#111]/40" style={{ fontSize: 14 * MOBILE_PLAQUE_TEXT_SCALE }}>{currentView.metricSide.line1}</p>
              <p className="leading-[1.05] text-[#111]/40" style={{ fontSize: 14 * MOBILE_PLAQUE_TEXT_SCALE }}>{currentView.metricSide.line2}</p>
              <div className="relative mt-2 h-[56px] w-[91px] overflow-hidden rounded-[11px] bg-gradient-to-b from-[#e7813f] to-[#fc6407]">
                <img src={metricSideImage} alt="" className="absolute max-w-none object-cover" style={{ width: 164, height: 118, left: -42, top: -64 }} />
              </div>
            </div>
          )}
        </div>
        </div>
      </section>
    </main>
  );
}
