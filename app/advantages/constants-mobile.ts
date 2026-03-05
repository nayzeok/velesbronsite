/**
 * Константы мобильной версии страницы «Преимущества».
 * Регулировка положения плашек, фото ботинка, карусели и пьедестала — здесь.
 */

/** Координаты карточек карусели на мобиле (x, y, rotate в градусах) */
export const mobileCarouselCards = [
  { x: 431, y: 217, rotate: 53.36 },
  { x: 393, y: 259, rotate: 30.46 },
  { x: 379, y: 313, rotate: 0 },
  { x: 394, y: 370, rotate: -30.65 },
  { x: 431, y: 415, rotate: -54.79 },
] as const;

/** Пьедестал под ботинком (позиция и размер в px) */
export const MOBILE_PEDESTAL = {
  left: -350,
  top: 590,
  width: 1158,
  height: 772,
  opacity: 0.95,
} as const;

/** Дефолтные позиция, размер и масштаб фото ботинка на мобиле (scale: 1 = 100%) */
export const MOBILE_BOOT = {
  left: -74,
  top: 292,
  width: 630,
  height: 520,
  objectPosition: "50% 50%",
  scale: 1,
} as const;

/** Позиция, размер и масштаб фото ботинка по ракурсам и цветам (black / oliva). У каждого фото свой scale. */
export const MOBILE_BOOT_BY_VIEW_BY_COLOR = {
  black: [
    { left: -16, top: 372, width: 469, height: 566, objectPosition: "50% 50%" as const, scale: 1 },
    { left: -4, top: 415, width: 470, height: 420, objectPosition: "52% 56%" as const, scale: 1 },
    { left: -12, top: 334, width: 512, height: 560, objectPosition: "50% 52%" as const, scale: 1 },
    { left: -8, top: 308, width: 476, height: 584, objectPosition: "50% 52%" as const, scale: 1 },
    { left: -6, top: 382, width: 472, height: 450, objectPosition: "50% 53%" as const, scale: 1 },
  ],
  oliva: [
    { left: 16, top: 242, width: 469, height: 566, objectPosition: "50% 50%" as const, scale: 2.2 },
    { left: 9, top: 380, width: 470, height: 460, objectPosition: "52% 56%" as const, scale: 1.2 },
    { left: -12, top: 324, width: 512, height: 560, objectPosition: "50% 52%" as const, scale: 1 },
    { left: 9, top: 308, width: 476, height: 584, objectPosition: "50% 52%" as const, scale: 1 },
    { left: -2, top: 362, width: 472, height: 450, objectPosition: "50% 53%" as const, scale: 2.2 },
  ],
} as const;

/** Масштаб ширины плашек по горизонтали (1 = 100%) */
export const MOBILE_PLAQUE_WIDTH_SCALE = 0.8;
/** Масштаб размера текста в плашках (1.2 = +20%) */
export const MOBILE_PLAQUE_TEXT_SCALE = 1.2;

/** Размер точки у плашек на мобиле (px): внешний оранжевый круг и внутренний белый кружок */
export const MOBILE_PLAQUE_DOT = { outer: 16, inner: 6 } as const;

const MOBILE_CALLOUT_SIZE = {
  width: Math.round(156 * MOBILE_PLAQUE_WIDTH_SCALE),
  height: 72,
} as const;
const MOBILE_GLUE_PILL_SIZE = {
  width: Math.round(156 * MOBILE_PLAQUE_WIDTH_SCALE),
  height: 72,
} as const;

/** Базовые размеры и позиции плашек (callout, glue, topMetric, sideMetric). Точечные смещения — calloutDot, glueDot. */
export const MOBILE_PLATES = {
  topMetric: { left: 62, top: 442, width: 182, height: 78 },
  topMetricDot: { x: 170, y: 63 },
  callout: { left: 22, top: 60, ...MOBILE_CALLOUT_SIZE },
  calloutDot: { x: 66, y: -10 },
  sideMetric: { left: 348, top: 724, width: 103, height: 188 },
  gluePill: { left: 38, top: 700, ...MOBILE_GLUE_PILL_SIZE },
  glueDot: { x: 172, y: 3 },
} as const;

/** По ракурсам (0..4): какие плашки показывать и их left/top. Смещения точек (calloutDot, glueDot и т.д.) задаются в views[].mobileAnchors в page.tsx — по аналогии с anchors для десктопа. */
export const MOBILE_PLATES_BY_VIEW = [
  {
    showTopMetric: false,
    showSideMetric: false,
    showCallout: true,
    showGluePill: true,
    showSecondaryCallout: false,
    topMetric: MOBILE_PLATES.topMetric,
    topMetricDot: MOBILE_PLATES.topMetricDot,
    callout: { ...MOBILE_PLATES.callout, left: 42, top: 760 },
    calloutDot: MOBILE_PLATES.calloutDot,
    secondaryCallout: MOBILE_PLATES.callout,
    secondaryCalloutDot: MOBILE_PLATES.calloutDot,
    sideMetric: MOBILE_PLATES.sideMetric,
    gluePill: { ...MOBILE_PLATES.gluePill, left: 18, top: 700 },
    glueDot: MOBILE_PLATES.glueDot,
  },
  {
    showTopMetric: false,
    showSideMetric: false,
    showCallout: true,
    showGluePill: true,
    showSecondaryCallout: false,
    topMetric: MOBILE_PLATES.topMetric,
    topMetricDot: MOBILE_PLATES.topMetricDot,
    callout: { ...MOBILE_PLATES.callout, left: 310, top: 706 },
    calloutDot: MOBILE_PLATES.calloutDot,
    secondaryCallout: MOBILE_PLATES.callout,
    secondaryCalloutDot: MOBILE_PLATES.calloutDot,
    sideMetric: MOBILE_PLATES.sideMetric,
    gluePill: { ...MOBILE_PLATES.gluePill, left: -28, top: 694 },
    glueDot: MOBILE_PLATES.glueDot,
  },
  {
    showTopMetric: false,
    showSideMetric: false,
    showCallout: true,
    showGluePill: false,
    showSecondaryCallout: true,
    topMetric: MOBILE_PLATES.topMetric,
    topMetricDot: MOBILE_PLATES.topMetricDot,
    callout: { ...MOBILE_PLATES.callout, left: 304, top: 664 },
    calloutDot: MOBILE_PLATES.calloutDot,
    secondaryCallout: { ...MOBILE_PLATES.callout, left: 38, top: 774 },
    secondaryCalloutDot: MOBILE_PLATES.calloutDot,
    sideMetric: MOBILE_PLATES.sideMetric,
    gluePill: MOBILE_PLATES.gluePill,
    glueDot: MOBILE_PLATES.glueDot,
  },
  {
    showTopMetric: false,
    showSideMetric: false,
    showCallout: true,
    showGluePill: true,
    showSecondaryCallout: false,
    topMetric: MOBILE_PLATES.topMetric,
    topMetricDot: MOBILE_PLATES.topMetricDot,
    callout: { ...MOBILE_PLATES.callout, left: 300, top: 482 },
    secondaryCallout: MOBILE_PLATES.callout,
    secondaryCalloutDot: MOBILE_PLATES.calloutDot,
    sideMetric: MOBILE_PLATES.sideMetric,
    gluePill: { ...MOBILE_PLATES.gluePill, left: 54, top: 776 },
    glueDot: MOBILE_PLATES.glueDot,
  },
  {
    showTopMetric: false,
    showSideMetric: false,
    showCallout: true,
    showGluePill: true,
    showSecondaryCallout: false,
    topMetric: MOBILE_PLATES.topMetric,
    topMetricDot: MOBILE_PLATES.topMetricDot,
    callout: { ...MOBILE_PLATES.callout, left: 48, top: 650 },
    calloutDot: MOBILE_PLATES.calloutDot,
    secondaryCallout: MOBILE_PLATES.callout,
    secondaryCalloutDot: MOBILE_PLATES.calloutDot,
    sideMetric: MOBILE_PLATES.sideMetric,
    gluePill: { ...MOBILE_PLATES.gluePill, left: 286, top: 740 },
    glueDot: MOBILE_PLATES.glueDot,
  },
] as const;

/** Масштаб карусели ракурсов */
export const MOBILE_CAROUSEL_LAYOUT_SCALE = 0.615;
export const MOBILE_CAROUSEL_IMAGE_BOOST = 1.24;
export const MOBILE_CAROUSEL_IMAGE_TUNE = [
  { boost: 1, x: 0, y: 0 },
  { boost: 1, x: 0, y: 0 },
  { boost: 1, x: 0, y: 0 },
  { boost: 1, x: 0, y: 0 },
  { boost: 1, x: 0, y: 0 },
] as const;

/** Эллипс карусели (позиция и размер) */
export const MOBILE_CAROUSEL_ELLIPSE = {
  left: 386,
  top: 202,
  size: 182,
  thickness: 22,
} as const;

/** Маркер текущего ракурса на эллипсе */
export const MOBILE_CAROUSEL_MARKER = {
  centerX: MOBILE_CAROUSEL_ELLIPSE.left + MOBILE_CAROUSEL_ELLIPSE.size / 2,
  centerY: MOBILE_CAROUSEL_ELLIPSE.top + MOBILE_CAROUSEL_ELLIPSE.size / 2,
  radius: 82,
  size: 16,
} as const;

export const MOBILE_CAROUSEL_MARKER_ANGLE_OFFSETS = [-10, 0, 13, 20, 20];

/** Углы ракурсов для маркера (вычисляются из mobileCarouselCards и MOBILE_CAROUSEL_MARKER) */
export const mobileCarouselMarkerAngles = mobileCarouselCards.reduce<number[]>((acc, item, index) => {
  const rawAngle = (Math.atan2(item.y - MOBILE_CAROUSEL_MARKER.centerY, item.x - MOBILE_CAROUSEL_MARKER.centerX) * 180) / Math.PI;
  if (index === 0) return [rawAngle];
  let angle = rawAngle;
  while (angle > acc[index - 1]) angle -= 360;
  return [...acc, angle];
}, []);
