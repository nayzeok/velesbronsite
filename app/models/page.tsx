"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/layout/SiteHeader";

const DESIGN_HEIGHT = 1000;
const MOBILE_DESIGN_WIDTH = 741;
const MOBILE_DESIGN_HEIGHT = 1580;
const MOBILE_VIEWPORT_TOP_RESERVE = 86;
const MOBILE_VIEWPORT_BOTTOM_RESERVE = 18;

/** Отступ между заголовком «МОДЕЛЬ» и квадратами выбора (px). */
const DESKTOP_MODEL_HEADING_GAP = 5;
/** Отступ между блоком МОДЕЛЬ и блоком ЦВЕТ: top заголовка «ЦВЕТ» (px). Увеличить — больше промежуток. */
const DESKTOP_COLOR_TOP = 497;
/** Отступ между заголовком «ЦВЕТ» и квадратами цветов (px). */
const DESKTOP_COLOR_HEADING_GAP = 5;

/** Отступ между заголовком «МОДЕЛЬ» и квадратами на мобиле (px). */
const MOBILE_MODEL_HEADING_GAP = 12;
/** Блоки МОДЕЛЬ и ЦВЕТ на мобиле: top (px). Расположены вверху. */
const MOBILE_TOP_BLOCKS_TOP = 68;
/** Отступ между заголовком «ЦВЕТ» и квадратами на мобиле (px), как у блока МОДЕЛЬ. */
const MOBILE_COLOR_HEADING_GAP = 12;
/** Заголовок и текст на мобиле: в нижней части, как на мокапе. */
const MOBILE_TITLE_TOP = 1160;
/** Текст под заголовком: top (px), с отступом от заголовка. */
const MOBILE_TEXT_TOP = 1230;
/** Блок выбора модели на мобиле: над ботинком. */
const MOBILE_MODEL_BELOW_TEXT_TOP = 90;
/** Блок выбора цвета на мобиле: слева от ботинка, как на мокапе. */
const MOBILE_COLOR_DOTS_TOP = 280;

/**
 * Масштаб большого фото карточки (центральная картинка), по индексу карточки 0..9.
 * Отдельно для чёрных и для оливы — подгоняйте под ракурс.
 */
const BOOT_IMAGE_SCALE_DESKTOP_BY_VIEW: Record<"black" | "oliva", number[]> = {
  black: [1.27, 1.27, 0.85, 1.02, 1.27, 1.27, 1.19, 1.19, 1.19, 1.19],
  oliva: [1.27, 1.27, 0.85, 1.02, 1.27, 1.27, 1.19, 1.10, 1.19, 1.19],
};
/** Масштаб фото ботинка на мобиле (0.85 = уменьшенный размер). */
const BOOT_IMAGE_SCALE_MOBILE_BY_VIEW: Record<"black" | "oliva", number[]> = {
  black: [0.85, 0.85, 0.85, 0.65, 0.85, 0.85, 0.85, 0.85, 0.85, 0.80],
  oliva: [0.85, 0.85, 0.85, 0.65, 0.85, 0.85, 0.85, 0.85, 0.85, 0.80],
};

/**
 * Смещение центрального фото в пикселях (x, y) для каждой карточки 0..9.
 * Отдельно для чёрных и оливы. Положительный x — вправо, y — вниз.
 */
const BOOT_IMAGE_OFFSET_DESKTOP: Record<"black" | "oliva", { x: number; y: number }[]> = {
  black: [
    { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 },
    { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 },
  ],
  oliva: [
    { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 50 }, { x: 0, y: 0 },
    { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 },
  ],
};
const BOOT_IMAGE_OFFSET_MOBILE: Record<"black" | "oliva", { x: number; y: number }[]> = {
  black: [
    { x: 0, y: 10 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 },
    { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 25 },
  ],
  oliva: [
    { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 },
    { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 25 },
  ],
};

const backgroundShape = "/images_alt/models/ui/background-shape.webp";
/** Фото для страницы models лежат в public/images_alt/models/cards/ (2sk/black|oliva, 2n/black). */

/** Ширина контейнера десктоп (px), для расчёта отступов в % */
const DESKTOP_STAGE_WIDTH = 1670;
/** Отступ левого блока от края в % ширины — при сужении экрана сохраняется */
const DESKTOP_LEFT_MARGIN_PCT = (71 / DESKTOP_STAGE_WIDTH) * 100;
/** Позиция центра правого блока в % от левого края — при сужении экрана сохраняется */
const DESKTOP_RIGHT_CENTER_PCT = (1487 / DESKTOP_STAGE_WIDTH) * 100;

/** Карусель десктоп: размер миниатюр (ширина × высота), уменьшено на 15%. */
const CAROUSEL_DESKTOP_CARD_WIDTH = 137;
const CAROUSEL_DESKTOP_CARD_HEIGHT = 165;
const CAROUSEL_DESKTOP_GAP = 10;
const CAROUSEL_DESKTOP_WIDTH = CAROUSEL_DESKTOP_CARD_WIDTH * 4 + CAROUSEL_DESKTOP_GAP * 3;
const CAROUSEL_DESKTOP_SCROLL = CAROUSEL_DESKTOP_CARD_WIDTH + CAROUSEL_DESKTOP_GAP;

const LENS_D = 320;       // диаметр линзы, px (логические)
const LENS_ZOOM = 3;    // кратность увеличения
const BOOT_W = 878;
const BOOT_H = 717;

type ColorVariant = "black" | "oliva";
type ModelKey = "high" | "low";

/** Миниатюры выбора модели (правый блок) — переключаются по цвету */
const MODEL_SELECTOR_THUMBS: Record<ModelKey, Record<ColorVariant, string>> = {
  high: {
    black: "/images_alt/models/views/2sk_black.png",
    oliva: "/images_alt/models/views/2sk_oliva.png",
  },
  low: {
    black: "/images_alt/models/views/2n_black.png",
    oliva: "/images_alt/models/views/2n_oliva.png",
  },
};

const MODEL_OPTIONS: { key: ModelKey; label: string; title: string; description: string }[] = [
  {
    key: "high",
    label: "Высокая",
    title: "2СК",
    description:
      "Высокая модель обеспечивает усиленную фиксацию голеностопа и стабильность шага на смешанных покрытиях. Подходит для активной эксплуатации в городе, на объекте и в полевых условиях.",
  },
  {
    key: "low",
    label: "Низкая",
    title: "Низкая",
    description:
      "Низкая модель легче по ощущениям и дает больше свободы движения при длительной носке. Оптимальный выбор для городского ритма, маршрутов с высокой подвижностью и повседневной нагрузки.",
  },
];

const MODEL_IMAGES: Record<ModelKey, { black: string[]; oliva?: string[] }> = {
  high: {
    black: [
      "/images_alt/models/views/models/2sk/black/1.webp",
      "/images_alt/models/views/models/2sk/black/2.webp",
      "/images_alt/models/views/models/2sk/black/3.webp",
      "/images_alt/models/views/models/2sk/black/4.webp",
      "/images_alt/models/views/models/2sk/black/5.webp",
    ],
    oliva: [
      "/images_alt/models/views/models/2sk/oliva/1.webp",
      "/images_alt/models/views/models/2sk/oliva/2.webp",
      "/images_alt/models/views/models/2sk/oliva/3.webp",
      "/images_alt/models/views/models/2sk/oliva/4.webp",
      "/images_alt/models/views/models/2sk/oliva/5.webp",
    ],
  },
  low: {
    black: [
      "/images_alt/models/cards/2n_black/1_2n_card_black.webp",
      "/images_alt/models/cards/2n_black/2_2n_card_black.webp",
      "/images_alt/models/cards/2n_black/3_2n_card_black.webp",
      "/images_alt/models/cards/2n_black/4_2n_card_black.webp",
      "/images_alt/models/cards/2n_black/5_2n_card_black.webp",
      "/images_alt/models/cards/2n_black/6_2n_card_black.webp",
      "/images_alt/models/cards/2n_black/7_2n_card_black.webp",
      "/images_alt/models/cards/2n_black/8_2n_card_black.webp",
      "/images_alt/models/cards/2n_black/9_2n_card_black.png",
      "/images_alt/models/cards/2n_black/10_2n_card_black.webp",
    ],
    oliva: [
      "/images_alt/models/cards/2n_oliva/1_2n_card_oliva.webp",
      "/images_alt/models/cards/2n_oliva/2_2n_card_oliva.webp",
      "/images_alt/models/cards/2n_oliva/3_2n_card_oliva.webp",
      "/images_alt/models/cards/2n_oliva/4_2n_card_oliva.webp",
      "/images_alt/models/cards/2n_oliva/5_2n_card_oliva.webp",
      "/images_alt/models/cards/2n_oliva/6_2n_card_oliva.webp",
      "/images_alt/models/cards/2n_oliva/7_2n_card_oliva.webp",
      "/images_alt/models/cards/2n_oliva/8_2n_card_oliva.webp",
      "/images_alt/models/cards/2n_oliva/9_2n_card_oliva.png",
      "/images_alt/models/cards/2n_oliva/10_2n_card_oliva.webp",
    ],
  },
};

/** Карточки карусели только для высокой модели: 10 слотов, данные пока для 7. На каждой карточке — фото (ссылка) и тексты: для черных — заголовок + текст, для оливы — заголовок (если есть) + текст. Фото подставляете сами, размер подгоним. */
type CarouselCard = {
  imageBlack: string;
  imageOliva: string;
  titleBlack: string;
  textBlack: string;
  /** Заголовок для оливы (опционально) */
  titleOliva?: string;
  textOliva: string;
};

const CAROUSEL_CARDS: CarouselCard[] = [
  {
    imageBlack: "/images_alt/models/cards/1_card_black.webp",
    imageOliva: "/images_alt/models/cards/1_card_oliva.webp",
    titleBlack: "КОНСТРУКЦИЯ МОДЕЛИ",
    textBlack:
      "Все элементы ботинка – от материалов до сборки – подбираются с расчётом на интенсивную эксплуатацию. Усиленные зоны, прочные соединения и продуманная архитектура позволяют конструкции сохранять ресурс при высокой нагрузке.",
    titleOliva: "СТАБИЛЬНОСТЬ И ФИКСАЦИЯ ГОЛЕНОСТОПА",
    textOliva:
      "Высокая конструкция ботинка обеспечивает дополнительную поддержку голеностопного сустава. Это повышает устойчивость на неровной поверхности и помогает сохранять контроль движения.",
  },
  {
    imageBlack: "/images_alt/models/cards/2_card_black.webp",
    imageOliva: "/images_alt/models/cards/2_card_oliva.webp",
    titleBlack: "СЦЕПЛЕНИЕ НА РАЗНЫХ ПОКРЫТИЯХ",
    textBlack:
      "Специальный рисунок подмётки и состав резиновой смеси обеспечивают уверенное сцепление на асфальте, грунте, камнях и влажных поверхностях. Подошва стабильно работает как в городской среде, так и на пересечённой местности.",
    titleOliva: "ГИБРИДНАЯ ПОДОШВА ПОВЫШЕННОЙ ПРОЧНОСТИ",
    textOliva:
      "Подошва выполнена по гибридной технологии: амортизирующая основа обеспечивает лёгкость и комфорт, а износостойкая подмётка отвечает за сцепление и устойчивость. Такая конструкция снижает нагрузку на стопу и сохраняет стабильность на разных типах поверхности.",
  },
  {
    imageBlack: "/images_alt/models/cards/3_card_black.webp",
    imageOliva: "/images_alt/models/cards/3_card_oliva.webp",
    titleBlack: "ГИБРИДНАЯ ПОДОШВА ПОВЫШЕННОЙ ПРОЧНОСТИ",
    textBlack:
      "Подошва выполнена по гибридной технологии: амортизирующая основа обеспечивает лёгкость и комфорт, а износостойкая подмётка отвечает за сцепление и устойчивость. Такая конструкция снижает нагрузку на стопу и сохраняет стабильность на разных типах поверхности.",
    titleOliva: "АНТИПРОКОЛЬНАЯ ЗАЩИТА ПОДОШВЫ",
    textOliva:
      "Внутри подошвы расположена гибкая антипрокольная вставка из арамидного волокна. Материал сочетает малый вес и высокую прочность, защищая стопу от острых предметов и снижая риск травмы при движении по сложному рельефу.",
  },
  {
    imageBlack: "/images_alt/models/cards/4_card_black.webp",
    imageOliva: "/images_alt/models/cards/4_card_oliva.webp",
    titleBlack: "КОМПОЗИТНАЯ ЗАЩИТА \n НОСКА",
    textBlack:
      "Носочная часть усилена композитным элементом: защита пальцев от ударов и контактов с твёрдыми предметами. Материал прочный при меньшем весе, чем металл — обувь не утяжеляется и остаётся комфортной.",
    titleOliva: "УСИЛЕННАЯ УДАРНАЯ ЗОНА НОСКА",
    textOliva:
      "Передняя часть ботинка рассчитана на повышенную нагрузку и защищает стопу при контакте с камнями, ступенями, инструментом или строительными элементами. Усиленная конструкция распределяет энергию удара по корпусу ботинка и снижает риск травм при активной эксплуатации.",
  },
  {
    imageBlack: "/images_alt/models/cards/5_card_black.webp",
    imageOliva: "/images_alt/models/cards/5_card_oliva.webp",
    titleBlack: "ИЗНОСОСТОЙКИЕ \n МАТЕРИАЛЫ ВЕРХА",
    textBlack:
      "Верх ботинка выполнен из натурального нубука в сочетании с высокопрочной тканью Cordura. Такое сочетание обеспечивает баланс прочности, гибкости и износостойкости, позволяя обуви выдерживать интенсивную эксплуатацию.",
    titleOliva: "ИЗНОСОСТОЙКИЕ МАТЕРИАЛЫ",
    textOliva:
      "Мы используем натуральный нубук в сочетании с высокопрочным текстилем. Благодаря этому ботинки не теряют форму и защитные свойства даже после многих месяцев активного использования в самых жестких условиях.",
  },
  {
    imageBlack: "/images_alt/models/cards/6_card_black.webp",
    imageOliva: "/images_alt/models/cards/6_card_oliva.webp",
    titleBlack: "ЗАЩИТА ОТ ВЛАГИ \n И ЗАГРЯЗНЕНИЙ",
    textBlack:
      "Каждый ботинок проходит обработку гидрофобным составом, который снижает впитывание влаги и защищает материал от загрязнений. Обувь дольше сохраняет внешний вид и рабочие свойства при использовании в разных условиях.",
    titleOliva: "ВОДООТТАЛКИВАЮЩАЯ ЗАЩИТА ВЕРХА",
    textOliva:
      "Материалы верха обработаны гидрофобным составом, который снижает впитывание влаги и защищает поверхность от загрязнений. Капли воды не проникают в материал, а скатываются с поверхности. Такая обработка помогает сохранять внешний вид обуви и облегчает уход при эксплуатации в разных условиях.",
  },
  {
    imageBlack: "/images_alt/models/cards/7_card_black.webp",
    imageOliva: "/images_alt/models/cards/7_card_oliva.webp",
    titleBlack: "МЕМБРАНА VELTEX™ ВНУТРИ БОТИНКА",
    textBlack:
      "Внутренняя мембрана выполнена в виде цельной чулочной конструкции: не пропускает влагу внутрь и отводит тепло от стопы. Благодаря этому сохраняется комфортный микроклимат, ботинки можно носить в диапазоне температур — от −15 до +20 °C.",
    titleOliva: "МЕМБРАНА VELTEX™: ЗАЩИТА И КОМФОРТ",
    textOliva:
      "Внутри ботинка используется мембрана VELTEX™ в виде цельной чулочной конструкции. Она защищает от проникновения влаги, помогает отводить тепло, влагу от стопы. Такая система поддерживает комфортный микроклимат обуви позволяет использовать ботинки в диапазоне температур −15 до+20 °C.",
  },
  {
    imageBlack: "/images_alt/models/cards/8_card_black.webp",
    imageOliva: "/images_alt/models/cards/8_card_oliva.webp",
    titleBlack: "СИСТЕМА БЫСТРОЙ \n ШНУРОВКИ",
    textBlack:
      "Механизм Quick-Lock позволяет быстро и точно зафиксировать ботинок на ноге. Система обеспечивает стабильную посадку, равномерно распределяет нагрузку и облегчает регулировку шнуровки во время движения.",
    titleOliva: "QUICK-LOCK: БЫСТРАЯ ФИКСАЦИЯ",
    textOliva:
      "Система шнуровки Quick-Lock позволяет быстро и точно зафиксировать ботинок на ноге. Механизм равномерно распределяет натяжение шнурков и помогает отрегулировать посадку без лишних усилий. Ботинок надёжно удерживает стопу, обеспечивая стабильность и комфорт при движении.",
  },
  {
    imageBlack: "/images_alt/models/cards/9_card_black.webp",
    imageOliva: "/images_alt/models/cards/9_card_oliva.webp",
    titleBlack: "УСИЛЕННЫЕ ШВЫ \n КОНСТРУКЦИИ",
    textBlack:
      "Ключевые зоны ботинка прошиты прочными армированными нитями. Усиленная строчка повышает прочность соединений и помогает конструкции выдерживать многократные сгибы и повышенные нагрузки.",
    titleOliva: "ТРОЙНЫЕ ШВЫ, АРМИРОВАННЫЕ НИТИ",
    textOliva:
      "Ключевые зоны ботинка прошиты тройными швами армированными полиэфирными нитями. Такая технология усиливает соединения материалов и повышает устойчивость конструкции к нагрузкам и изгибам, сохраняя надёжность ботинка при эксплуатации.",
  },
  {
    imageBlack: "/images_alt/models/cards/10_card_black.webp",
    imageOliva: "/images_alt/models/cards/10_card_oliva.webp",
    titleBlack: "КОМФОРТ НА ДЛИННОЙ ДИСТАНЦИИ",
    textBlack:
      "Амортизирующие элементы подошвы и анатомическая стелька помогают снизить усталость при движении. Конструкция ботинка учитывает форму стопы и обеспечивает фиксацию пятки и средней части. Обувь остаётся комфортной не только при примерке, но и после многих часов эксплуатации.",
    titleOliva: "АНАТОМИЧЕСКАЯ \n ПОДДЕРЖКА СТОПЫ",
    textOliva:
      "Конструкция ботинка учитывает форму стопы и обеспечивает устойчивую фиксацию пятки и средней части. Внутри используется анатомическая стелька, поддерживает свод стопы, помогает равномерно распределять нагрузку. Это снижает усталость и повышает стабильность шага при ходьбе.",
  },
];

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
  const [isMobileTextExpanded, setIsMobileTextExpanded] = useState(false);
  const [isSizeGridOpen, setIsSizeGridOpen] = useState(false);
  const [isSizeGridVisible, setIsSizeGridVisible] = useState(false);

  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [desktopRailCursor, setDesktopRailCursor] = useState<"left" | "right" | "grab">("grab");
  const [isDesktopRailHover, setIsDesktopRailHover] = useState(false);
  // lensPos — смещение курсора в экранных пикселях от края boot-контейнера
  const [lensPos, setLensPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  // Экранные размеры boot-контейнера (после CSS scale)
  const [lensBootRect, setLensBootRect] = useState<{ w: number; h: number }>({ w: BOOT_W, h: BOOT_H });
  const [lensClientPos, setLensClientPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [lensVisible, setLensVisible] = useState(false);
  const zoomSwipeStartX = useRef<number | null>(null);
  const [railAtStart, setRailAtStart] = useState(true);
  const [railAtEnd, setRailAtEnd] = useState(false);
  const desktopRailRef = useRef<HTMLDivElement | null>(null);
  const bootContainerRef = useRef<HTMLDivElement | null>(null);

  const updateRailEdges = () => {
    const el = desktopRailRef.current;
    if (!el) return;
    setRailAtStart(el.scrollLeft <= 2);
    setRailAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  };
  const sizeGridCloseTimerRef = useRef<number | null>(null);
  const mobileSwipeStartX = useRef<number | null>(null);
  const mobileSwipeStartY = useRef<number | null>(null);
  const mobileDotsTouchIndexRef = useRef<number | null>(null);
  const viewSlideFinishTimerRef = useRef<number | null>(null);
  const [mobileScale, setMobileScale] = useState(0.5);
  const [mobileViewportHeight, setMobileViewportHeight] = useState(0);
  const [isViewSliding, setIsViewSliding] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileReady, setMobileReady] = useState(false);
  const stageHeightFitScale = `min(1, calc(100dvh / ${DESIGN_HEIGHT}px))`;

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mql = window.matchMedia("(min-width: 1200px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isDesktop) return;
    const t = setTimeout(() => setMobileReady(true), 50);
    return () => clearTimeout(t);
  }, [isDesktop]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateMobileScale = () => {
      const w = window.innerWidth;
      const viewportH = window.visualViewport?.height ?? window.innerHeight;
      const scaleByWidth = w / MOBILE_DESIGN_WIDTH;
      const availableHeight = Math.max(
        320,
        viewportH - MOBILE_VIEWPORT_TOP_RESERVE - MOBILE_VIEWPORT_BOTTOM_RESERVE
      );
      const scaleByHeight = availableHeight / MOBILE_DESIGN_HEIGHT;
      setMobileScale(Math.min(1, Math.max(0.34, Math.min(scaleByWidth, scaleByHeight))));
      setMobileViewportHeight(viewportH);
    };
    updateMobileScale();
    window.addEventListener("resize", updateMobileScale);
    window.visualViewport?.addEventListener("resize", updateMobileScale);
    return () => {
      window.removeEventListener("resize", updateMobileScale);
      window.visualViewport?.removeEventListener("resize", updateMobileScale);
    };
  }, []);
  const selectedModel = MODEL_OPTIONS.find((item) => item.key === activeModelKey) ?? MODEL_OPTIONS[0];
  const modelImagesByColor = MODEL_IMAGES[activeModelKey];
  const isHighModel = activeModelKey === "high";
  const activeViewImages = isHighModel
    ? CAROUSEL_CARDS.map((c) => (colorVariant === "black" ? c.imageBlack : c.imageOliva))
    : (modelImagesByColor[colorVariant] && modelImagesByColor[colorVariant]!.length > 0)
      ? modelImagesByColor[colorVariant]!
      : modelImagesByColor.black;
  const activeCard = isHighModel ? CAROUSEL_CARDS[activeViewIndex] : null;
  const leftBlockTitle = activeCard
    ? (colorVariant === "black" ? activeCard.titleBlack : activeCard.titleOliva ?? "")
    : "";
  const leftBlockText = activeCard
    ? (colorVariant === "black" ? activeCard.textBlack : activeCard.textOliva)
    : selectedModel.description;

  useEffect(() => {
    setActiveViewIndex(0);
    if (desktopRailRef.current) desktopRailRef.current.scrollLeft = 0;
    setRailAtStart(true);
    setRailAtEnd(false);
  }, [activeModelKey]);

  useEffect(() => {
    setIsMobileTextExpanded(false);
  }, [activeModelKey, activeViewIndex, colorVariant]);

  const SLIDE_MS = 400;

  const changeViewWithSlide = (nextIndex: number, _direction: 1 | -1) => {
    if (nextIndex === activeViewIndex || isViewSliding) return;
    const maxIndex = Math.max(0, activeViewImages.length - 1);
    if (nextIndex < 0 || nextIndex > maxIndex) return;
    if (viewSlideFinishTimerRef.current != null) window.clearTimeout(viewSlideFinishTimerRef.current);
    setIsViewSliding(true);
    setActiveViewIndex(nextIndex);
    viewSlideFinishTimerRef.current = window.setTimeout(() => {
      setIsViewSliding(false);
    }, SLIDE_MS);
  };

  useEffect(() => {
    if (typeof document === "undefined") return;
    const maxIndex = Math.max(0, activeViewImages.length - 1);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setIsZoomOpen(false); return; }
      if (isSizeGridOpen || isZoomOpen) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        changeViewWithSlide(activeViewIndex >= maxIndex ? 0 : activeViewIndex + 1, 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        changeViewWithSlide(activeViewIndex <= 0 ? maxIndex : activeViewIndex - 1, -1);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSizeGridOpen, isZoomOpen, activeViewImages.length, activeViewIndex]);

  useEffect(() => {
    if (typeof document === "undefined" || !isSizeGridOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSizeGridOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    return () => {
      if (sizeGridCloseTimerRef.current) window.clearTimeout(sizeGridCloseTimerRef.current);
      if (viewSlideFinishTimerRef.current) window.clearTimeout(viewSlideFinishTimerRef.current);
    };
  }, []);

  useEffect(() => {
    // Проверяем при маунте и при смене контента — нужна ли стрелка вправо
    const el = desktopRailRef.current;
    if (!el) return;
    const check = () => {
      setRailAtStart(el.scrollLeft <= 2);
      setRailAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isDesktop, activeModelKey, colorVariant]);

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
    <main className="figma-site-page relative overflow-x-hidden bg-white text-[#111] overscroll-none min-[1200px]:overflow-hidden">

      <div className="relative z-10">

      {/* ── ZOOM MODAL ── */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(6px)" }}
          onClick={() => setIsZoomOpen(false)}
          onTouchStart={(e) => { zoomSwipeStartX.current = e.targetTouches[0]?.clientX ?? null; }}
          onTouchEnd={(e) => {
            const isOnImage = (e.target as HTMLElement).tagName === "IMG";
            const startX = zoomSwipeStartX.current;
            if (startX == null) { if (!isOnImage) setIsZoomOpen(false); return; }
            const endX = e.changedTouches[0]?.clientX;
            if (endX == null) { if (!isOnImage) setIsZoomOpen(false); return; }
            zoomSwipeStartX.current = null;
            const delta = startX - endX;
            if (Math.abs(delta) < 40) { if (!isOnImage) setIsZoomOpen(false); return; }
            e.stopPropagation();
            const maxIndex = activeViewImages.length - 1;
            if (delta > 0) changeViewWithSlide(activeViewIndex >= maxIndex ? 0 : activeViewIndex + 1, 1);
            else changeViewWithSlide(activeViewIndex <= 0 ? maxIndex : activeViewIndex - 1, -1);
          }}
        >
          {/* Close button — снизу по центру */}
          <button
            type="button"
            className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-2 text-gray-700 transition opacity-80 hover:opacity-100 active:opacity-100"
            style={{ bottom: 42, fontSize: 19, padding: "16px 20px 12px 20px" }}
            onClick={(e) => { e.stopPropagation(); setIsZoomOpen(false); }}
            onTouchEnd={(e) => { e.stopPropagation(); setIsZoomOpen(false); }}
            aria-label="Закрыть"
          >
            ✕ <span style={{ fontSize: 17 }}>Закрыть</span>
          </button>

          {/* Desktop: prev/next navigation inside zoom */}
          {activeViewImages.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 hidden min-[1200px]:flex size-12 items-center justify-center rounded-full bg-black/10 text-gray-800 text-3xl transition hover:bg-black/20"
                onClick={(e) => {
                  e.stopPropagation();
                  const maxIndex = activeViewImages.length - 1;
                  changeViewWithSlide(activeViewIndex <= 0 ? maxIndex : activeViewIndex - 1, -1);
                }}
                aria-label="Предыдущее фото"
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 hidden min-[1200px]:flex size-12 items-center justify-center rounded-full bg-black/10 text-gray-800 text-3xl transition hover:bg-black/20"
                onClick={(e) => {
                  e.stopPropagation();
                  const maxIndex = activeViewImages.length - 1;
                  changeViewWithSlide(activeViewIndex >= maxIndex ? 0 : activeViewIndex + 1, 1);
                }}
                aria-label="Следующее фото"
              >
                ›
              </button>
            </>
          )}

          {/* Image */}
          <img
            src={activeViewImages[activeViewIndex]}
            alt="Тактическая обувь"
            className="max-h-[72vh] max-w-[86vw] object-contain select-none"
            style={{ filter: "drop-shadow(0 30px 80px rgba(0,0,0,0.7))" }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Dots */}
          {activeViewImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {activeViewImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="rounded-full transition-all"
                  style={{
                    width: activeViewIndex === i ? 20 : 8,
                    height: 8,
                    background: activeViewIndex === i ? "#f07426" : "rgba(0,0,0,0.25)",
                  }}
                  onClick={(e) => { e.stopPropagation(); changeViewWithSlide(i, i > activeViewIndex ? 1 : -1); }}
                  aria-label={`Фото ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── LENS (fixed, вне scale-контейнера, без растяжения) ── */}
      {isDesktop && lensVisible && !isZoomOpen && (
        <div
          className="pointer-events-none fixed z-[200]"
          style={{
            left: lensClientPos.x - LENS_D / 2,
            top: lensClientPos.y - LENS_D / 2,
            width: LENS_D,
            height: LENS_D,
            borderRadius: "24px",
            overflow: "hidden",
            border: "2.5px solid rgba(255,255,255,0.85)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: lensBootRect.w * LENS_ZOOM,
              height: lensBootRect.h * LENS_ZOOM,
              left: LENS_D / 2 - lensPos.x * LENS_ZOOM,
              top: LENS_D / 2 - lensPos.y * LENS_ZOOM,
            }}
          >
            <img
              src={activeViewImages[activeViewIndex]}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          </div>
        </div>
      )}

      {/* ── DESKTOP: рендерим только при width >= 1200px, чтобы на телефоне не грузить тяжёлую сцену ── */}
      {isDesktop && (
      <section
        className="figma-site-stage relative mx-auto h-[100dvh] w-full overflow-hidden bg-white"
        style={{ ["--figma-stage-height" as string]: "100dvh" }}
      >
        <div className="relative mx-auto h-[100dvh] w-full max-w-[1670px] overflow-hidden">
          {/* Glass strips — вне scale-дива, чтобы совпадать с media/brand/contacts */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.008) 0%, rgba(40,40,40,0.07) 5.4%, rgba(255,255,255,0.008) 7.143%)" }} />
            <div className="absolute inset-0" style={{ backgroundImage: `url(${backgroundShape})`, backgroundSize: "832px 832px", backgroundPosition: "top left", filter: "blur(90px)", opacity: 0.03 }} />
          </div>
          <SiteHeader activeItem="models" className="absolute left-0 right-0 top-0 z-20 h-[96px] w-full" />
          <div
            className="absolute inset-x-0 top-0 h-[1000px] origin-top"
            style={{ transform: `scale(${stageHeightFitScale})` }}
          >

            <div className="h-[96px] shrink-0" aria-hidden="true" />

            {/* Left — заголовок + текст. width задана с запасом: контейнер масштабируется (scale), после scale эффективная ширина меньше — берём ~720, чтобы в 2 строки. */}
            <div className="absolute" style={{ left: `${DESKTOP_LEFT_MARGIN_PCT}%`, top: 186, width: 720, maxWidth: 720 }}>
              <h1
                className="uppercase w-full"
                  style={{
                  fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
                  fontSize: 34,
                    fontWeight: 700,
                  lineHeight: 1.15,
                  color: "#111",
                  letterSpacing: "0.08em",
                  whiteSpace: "pre-line",
                  }}
                >
                {activeCard && leftBlockTitle ? leftBlockTitle : selectedModel.title}
                </h1>
              <p
                className="absolute max-w-[532px] font-medium tracking-normal text-[#111]"
                style={{
                  top: 115,
                  left: 0,
                  width: 408,
                  fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
                  fontSize: "clamp(21.25px, 0.94vw, 21.25px)",
                  fontWeight: 500,
                  lineHeight: 1.45,
                  color: "#111",
                }}
              >
                {leftBlockText}
              </p>
            </div>

            {/* Center — boot image (filmstrip — плавная лента) */}
            <div
              ref={bootContainerRef}
              className="absolute left-1/2 top-1/2"
              style={{
                width: BOOT_W,
                height: BOOT_H,
                transform: "translate(-50%, calc(-50% - 28px))",
                clipPath: "inset(0 0 52px 0)",
                zIndex: 5,
              }}
            >
              {/* Зона срабатывания лупы — 80% от центра (10% отступ с каждой стороны) */}
              <div
                className="absolute z-10"
                style={{ inset: "10%", cursor: "none" }}
                onMouseEnter={() => setLensVisible(true)}
                onMouseLeave={() => setLensVisible(false)}
                onMouseMove={(e) => {
                  const outer = bootContainerRef.current?.getBoundingClientRect();
                  if (!outer) return;
                  setLensPos({ x: e.clientX - outer.left, y: e.clientY - outer.top });
                  setLensBootRect({ w: outer.width, h: outer.height });
                  setLensClientPos({ x: e.clientX, y: e.clientY });
                }}
              />
              <div
                style={{
                  display: "flex",
                  width: activeViewImages.length * 878,
                  height: "100%",
                  transform: `translateX(${-activeViewIndex * 878}px)`,
                  transition: `transform ${SLIDE_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                }}
              >
                {activeViewImages.map((src, i) => {
                  const offset = BOOT_IMAGE_OFFSET_DESKTOP[colorVariant][i] ?? { x: 0, y: 0 };
                  const scale = BOOT_IMAGE_SCALE_DESKTOP_BY_VIEW[colorVariant][i] ?? 1;
                  return (
                    <div
                      key={`${activeModelKey}-${colorVariant}-${i}`}
                      className="relative flex-shrink-0"
                      style={{ width: 878, height: 717 }}
                    >
                      <div
                        className="absolute h-full w-full origin-center"
                        style={{
                          left: "50%",
                          top: "50%",
                          transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${scale})`,
                        }}
                      >
                        <img
                          src={src}
                          alt="Тактическая обувь"
                          className="h-full w-full object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,0.12)]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="absolute inset-0" style={{ transform: "translateY(-90px)" }}>
              {/* Size grid link — подчёркнутый текст, при наведении заливка оранжевым слева направо */}
              <button
                type="button"
                onClick={openSizeGrid}
                className="size-table-link absolute"
              style={{
                    left: `${DESKTOP_RIGHT_CENTER_PCT}%`,
                    top: 706,
                    transform: "translateX(-50%)",
                    fontSize: 26,
                  }}
                aria-label="Открыть таблицу размеров"
              >
                <span className="size-table-link__base">ТАБЛИЦА РАЗМЕРОВ ›</span>
                <span className="size-table-link__hover" aria-hidden="true">
                  ТАБЛИЦА РАЗМЕРОВ ›
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
                    fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
                    fontSize: 36,
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
                        onClick={() => setActiveModelKey(model.key)}
                        className="shrink-0 overflow-hidden rounded-[8px] bg-white transition-all"
                  style={{
                          width: colW,
                          height: 75,
                          border: activeModelKey === model.key ? "2px solid #f07426" : "2px solid #e0e0e0",
                          cursor: "pointer",
                          opacity: 1,
                        }}
                      >
                        <img src={MODEL_SELECTOR_THUMBS[model.key][colorVariant]} alt={model.label} className="h-full w-full object-contain" style={{ transform: "scale(1.44)", transformOrigin: "center" }} />
                      </button>
                      <p
                        className="flex min-w-0 w-full justify-center uppercase"
                  style={{
                          margin: 0,
                          padding: 0,
                          fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
                          fontSize: 17,
                          fontWeight: 400,
                          color: activeModelKey === model.key ? "#f07426" : "#111",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {model.key === "high" ? "2SK" : "2N"}
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
                    fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
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
                    className="shrink-0 rounded-[8px] bg-white transition-all"
                    style={{
                      width: 76,
                      height: 75,
                      border: colorVariant === "black" ? "2px solid #f07426" : "2px solid #e0e0e0",
                      boxShadow: colorVariant === "black" ? "0 4px 12px rgba(240,116,38,0.12)" : "none",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      className="mx-auto flex items-center justify-center rounded-[8px]"
                      style={{
                        width: 44,
                        height: 44,
                        backgroundColor: "#191919",
                      }}
                    />
                  </button>
                  <p
                    className="flex min-w-0 w-full justify-center uppercase"
                    style={{
                      margin: 0,
                      padding: 0,
                      fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
                      fontSize: 19,
                      fontWeight: 400,
                      color: colorVariant === "black" ? "#f07426" : "#111",
                      letterSpacing: "0.06em",
                    }}
                  >
                    ЧЕРНЫЙ
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4" style={{ width: 74, minWidth: 74 }}>
                  <button
                    type="button"
                    onClick={() => setColorVariant("oliva")}
                    className="shrink-0 rounded-[8px] bg-white transition-all"
                style={{
                      width: 74,
                      height: 75,
                      border: colorVariant === "oliva" ? "2px solid #f07426" : "2px solid #e0e0e0",
                      boxShadow: colorVariant === "oliva" ? "0 4px 12px rgba(240,116,38,0.12)" : "none",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      className="mx-auto flex items-center justify-center rounded-[8px]"
                      style={{
                        width: 44,
                        height: 44,
                        backgroundColor: "#686248",
                      }}
                    />
                  </button>
                  <p
                    className="flex min-w-0 w-full justify-center uppercase"
                    style={{
                      margin: 0,
                      padding: 0,
                      fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
                      fontSize: 17,
                      fontWeight: 400,
                      color: colorVariant === "oliva" ? "#f07426" : "#111",
                      letterSpacing: "0.06em",
                    }}
                  >
                    ОЛИВА
                </p>
              </div>
                </div>
              </div>

              {/* Buy button */}
              <Link
                href="/where-to-buy"
                className="absolute flex items-center justify-center no-underline"
                style={{
                  left: `${DESKTOP_RIGHT_CENTER_PCT}%`,
                  top: 794,
                  transform: "translateX(-50%)",
                  width: 260,
                  height: 75,
                  background: "linear-gradient(180deg, #E7813F 0%, #FC6407 100%)",
                  borderRadius: 22,
                  fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
                  fontSize: 19,
                  fontWeight: 400,
                  color: "#fff",
                  letterSpacing: "0.08em",
                }}
              >
                ГДЕ КУПИТЬ
              </Link>
                </div>

            {/* Bottom photo cards — 4 карточки в видимой области */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: 779,
                width: CAROUSEL_DESKTOP_WIDTH,
                cursor: desktopRailCursor === "left" ? "w-resize" : desktopRailCursor === "right" ? "e-resize" : "default",
              }}
              onMouseEnter={() => setIsDesktopRailHover(true)}
              onMouseMove={(event) => {
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
                className="scrollbar-hide flex overflow-x-auto pb-2 pr-2"
                style={{ gap: CAROUSEL_DESKTOP_GAP, scrollBehavior: "smooth" }}
                onScroll={updateRailEdges}
              >
                {isHighModel
                  ? CAROUSEL_CARDS.map((card, i) => (
              <button
                        key={`desktop-view-${i}`}
                type="button"
                        onClick={() => changeViewWithSlide(i, i > activeViewIndex ? 1 : -1)}
                        className="shrink-0 overflow-hidden rounded-[16px] transition-all"
                        style={{
                          width: CAROUSEL_DESKTOP_CARD_WIDTH,
                          height: CAROUSEL_DESKTOP_CARD_HEIGHT,
                          background: "#eceef0",
                          border: activeViewIndex === i ? "3px solid #f07426" : "1px solid rgba(0,0,0,0.04)",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={colorVariant === "black" ? card.imageBlack : card.imageOliva}
                          alt=""
                          className="h-full w-full object-contain"
                        />
              </button>
                    ))
                  : activeViewImages.map((image, i) => (
              <button
                        key={`desktop-view-${i}`}
                type="button"
                        onClick={() => changeViewWithSlide(i, i > activeViewIndex ? 1 : -1)}
                        className="shrink-0 overflow-hidden rounded-[16px] transition-all"
                        style={{
                          width: CAROUSEL_DESKTOP_CARD_WIDTH,
                          height: CAROUSEL_DESKTOP_CARD_HEIGHT,
                          background: "#eceef0",
                          border: activeViewIndex === i ? "3px solid #f07426" : "1px solid rgba(0,0,0,0.04)",
                          cursor: "pointer",
                        }}
                      >
                        <img src={image} alt="" className="h-full w-full object-contain" />
                      </button>
                    ))}
              </div>
              {!railAtStart && (
                <button
                  type="button"
                  aria-label="Прокрутить фото влево"
                  onClick={() => desktopRailRef.current?.scrollBy({ left: -CAROUSEL_DESKTOP_SCROLL, behavior: "smooth" })}
                  className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-r-[12px] bg-white/80 px-3 py-6 text-[#111] shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition hover:bg-white"
                  style={{ cursor: "w-resize" }}
                >
                  <span className="text-[24px] leading-none">‹</span>
                </button>
              )}
              {!railAtEnd && (
                <button
                  type="button"
                  aria-label="Прокрутить фото вправо"
                  onClick={() => desktopRailRef.current?.scrollBy({ left: CAROUSEL_DESKTOP_SCROLL, behavior: "smooth" })}
                  className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-l-[12px] bg-white/80 px-3 py-6 text-[#111] shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition hover:bg-white"
                  style={{ cursor: "e-resize" }}
                >
                  <span className="text-[24px] leading-none">›</span>
                </button>
              )}
            </div>

          </div>
        </div>
      </section>
      )}

      {/* ── MOBILE: рендерим только при width < 1200px; контент — после mount, чтобы не ронять Safari при первом кадре ── */}
      {!isDesktop && !mobileReady && (
      <section className="flex min-h-[100svh] items-center justify-center bg-white">
        <p className="text-[#333]" style={{ fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif", fontSize: 15 }}>Загрузка…</p>
      </section>
      )}
      {!isDesktop && mobileReady && (
      <section className="relative min-[1200px]:hidden bg-white">
        {/* Фон mobile: centered 886px — вне overflow-hidden, как на contacts */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div className="absolute left-1/2 top-0 w-[886px] -translate-x-1/2" style={{ marginTop: "-88px", height: "calc(100% + 88px)" }}>
            <div className="absolute inset-0">
              <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.008) 0%, rgba(40,40,40,0.07) 5.4%, rgba(255,255,255,0.008) 7.143%)" }} />
              <div className="absolute inset-0" style={{ backgroundImage: `url(${backgroundShape})`, backgroundSize: "832px 832px", backgroundPosition: "top left", filter: "blur(90px)", opacity: 0.03 }} />
            </div>
          </div>
        </div>
        <div className="relative min-h-[100svh]">

          <div
            className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[480px] flex-col px-4"
            style={{
              paddingTop: "calc(78px + env(safe-area-inset-top, 0px))",
              paddingBottom: "max(20px, env(safe-area-inset-bottom, 0px))",
            }}
          >
            <div className="mx-auto mt-4 flex w-full max-w-[207px] overflow-hidden rounded-[10px] border border-[#d8d8d8] bg-[#efefef]">
              {MODEL_OPTIONS.map((model) => {
                const isLow = model.key === "low";
                const isActive = activeModelKey === model.key;
                return (
                <button
                    key={`mobile-model-col-${model.key}`}
                  type="button"
                    onClick={() => setActiveModelKey(model.key)}
                    className="flex h-[35px] flex-1 items-center justify-center transition-all"
                    style={{
                      background: isActive ? "linear-gradient(180deg, #E7813F 0%, #FC6407 100%)" : "#efefef",
                      borderRight: model.key === "high" ? "1px solid #d8d8d8" : "none",
                      color: isActive ? "#fff" : "#111",
                      cursor: "pointer",
                      opacity: 1,
                      fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
                      fontSize: 15,
                      fontWeight: 400,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {model.key === "high" ? "2SK" : "2N"}
                  </button>
                );
              })}
            </div>

            <div className="relative mt-2">
                <div className="absolute left-0 top-3 z-30 w-[124px]">
                  <div className="flex items-start gap-4" aria-label="Выбор цвета">
                    {([
                      { key: "black", label: "Черный", fill: "#191919" },
                      { key: "oliva", label: "Олива", fill: "#686248" },
                    ] as const).map((item) => {
                      const isActive = colorVariant === item.key;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setColorVariant(item.key)}
                          className="flex min-h-[68px] min-w-[54px] flex-col items-center gap-2 border-0 bg-transparent px-[3px] py-[2px]"
                          aria-label={item.label}
                          aria-pressed={isActive}
                        >
                          <span
                            className="flex items-center justify-center rounded-[12px] bg-white"
                            style={{
                              width: 48,
                              height: 48,
                              border: isActive ? "2px solid #f07426" : "1px solid #cfcfcf",
                              boxShadow: isActive ? "0 4px 12px rgba(240,116,38,0.12)" : "none",
                            }}
                          >
                            <span
                              className="rounded-[8px]"
                              style={{
                                width: 28,
                                height: 28,
                                backgroundColor: item.fill,
                              }}
                            />
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
                              fontSize: 12,
                              fontWeight: 500,
                              lineHeight: 1.1,
                              color: "#555",
                            }}
                          >
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                      </div>
                      </div>

                <div className="relative mx-auto w-full max-w-[278px]">
                    <div
                      className="relative aspect-[0.88] w-full"
                      style={{ touchAction: "pan-y" }}
                      aria-label="Тап для увеличения, свайп влево или вправо для смены фото"
                      onTouchStart={(e) => {
                        mobileSwipeStartX.current = e.targetTouches[0]?.clientX ?? null;
                        mobileSwipeStartY.current = e.targetTouches[0]?.clientY ?? null;
                      }}
                      onTouchEnd={(e) => {
                        const startX = mobileSwipeStartX.current;
                        const startY = mobileSwipeStartY.current;
                        if (startX == null) return;
                        const endX = e.changedTouches[0]?.clientX;
                        const endY = e.changedTouches[0]?.clientY;
                        if (endX == null) return;
                        mobileSwipeStartX.current = null;
                        mobileSwipeStartY.current = null;
                        const deltaX = startX - endX;
                        const deltaY = startY != null && endY != null ? Math.abs(startY - endY) : 99;
                        // Тап: минимальное движение — открыть зум
                        if (Math.abs(deltaX) < 12 && deltaY < 12) {
                          setIsZoomOpen(true);
                          return;
                        }
                        const maxIndex = Math.max(0, activeViewImages.length - 1);
                        if (deltaX > 50) {
                          changeViewWithSlide(activeViewIndex >= maxIndex ? 0 : activeViewIndex + 1, 1);
                        } else if (deltaX < -50) {
                          changeViewWithSlide(activeViewIndex <= 0 ? maxIndex : activeViewIndex - 1, -1);
                        }
                      }}
                    >
                      <div className="absolute inset-0" style={{ clipPath: "inset(0)" }}>
                        <div
                          style={{
                            display: "flex",
                            width: `${activeViewImages.length * 100}%`,
                            height: "100%",
                            transform: `translateX(${-activeViewIndex * (100 / activeViewImages.length)}%)`,
                            transition: `transform ${SLIDE_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                          }}
                        >
                          {activeViewImages.map((src, i) => {
                            const offset = BOOT_IMAGE_OFFSET_MOBILE[colorVariant][i] ?? { x: 0, y: 0 };
                            const scale = BOOT_IMAGE_SCALE_MOBILE_BY_VIEW[colorVariant][i] ?? 1;
                            return (
                              <div
                                key={`${activeModelKey}-${colorVariant}-${i}`}
                                className="flex flex-shrink-0 items-center justify-center"
                                style={{ width: `${100 / activeViewImages.length}%`, height: "100%" }}
                              >
                                <div
                                  style={{
                                    transform: `translate(${offset.x * 0.45}px, ${offset.y * 0.45}px) scale(${scale})`,
                                  }}
                                >
                                  <img
                                    src={src}
                                    alt="Тактическая обувь"
                                    className="h-auto max-h-[54vh] w-full max-w-[260px] object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.18)]"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      </div>

                      </div>

                <button
                  type="button"
                  onClick={() => {
                    const maxIndex = Math.max(0, activeViewImages.length - 1);
                    changeViewWithSlide(activeViewIndex <= 0 ? maxIndex : activeViewIndex - 1, -1);
                  }}
                  className="absolute left-0 top-[54%] z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#d8d8d8] bg-[#efefef] text-[#111] shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                  aria-label="Предыдущее фото"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const maxIndex = Math.max(0, activeViewImages.length - 1);
                    changeViewWithSlide(activeViewIndex >= maxIndex ? 0 : activeViewIndex + 1, 1);
                  }}
                  className="absolute right-0 top-[54%] z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#d8d8d8] bg-[#efefef] text-[#111] shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                  aria-label="Следующее фото"
                >
                  ›
                </button>
                      </div>

            <div
              className="-mt-2 flex justify-center gap-[8.4px] py-2 touch-none"
              aria-label="Позиция фото"
              role="tablist"
              onTouchStart={(e) => {
                const touch = e.touches[0];
                if (!touch) return;
                const el = document.elementFromPoint(touch.clientX, touch.clientY);
                const idx = el?.closest("[data-dot-index]")?.getAttribute("data-dot-index");
                if (idx != null) {
                  const i = parseInt(idx, 10);
                  if (!Number.isNaN(i)) {
                    mobileDotsTouchIndexRef.current = i;
                    const maxIndex = Math.max(0, activeViewImages.length - 1);
                    if (i >= 0 && i <= maxIndex && i !== activeViewIndex) {
                      changeViewWithSlide(i, i > activeViewIndex ? 1 : -1);
                    }
                  }
                }
              }}
              onTouchMove={(e) => {
                const touch = e.touches[0];
                if (!touch) return;
                const el = document.elementFromPoint(touch.clientX, touch.clientY);
                const idx = el?.closest("[data-dot-index]")?.getAttribute("data-dot-index");
                if (idx == null) return;
                const i = parseInt(idx, 10);
                if (Number.isNaN(i)) return;
                if (mobileDotsTouchIndexRef.current === i) return;
                mobileDotsTouchIndexRef.current = i;
                const maxIndex = Math.max(0, activeViewImages.length - 1);
                if (i >= 0 && i <= maxIndex) changeViewWithSlide(i, i > activeViewIndex ? 1 : -1);
              }}
              onTouchEnd={() => {
                mobileDotsTouchIndexRef.current = null;
              }}
              onTouchCancel={() => {
                mobileDotsTouchIndexRef.current = null;
              }}
            >
              {activeViewImages.map((_, i) => (
                <div
                  key={`mobile-view-dot-${i}`}
                  className="relative h-2.5 w-2.5 shrink-0"
                  data-dot-index={i}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-label={`Фото ${i + 1}`}
                    aria-selected={activeViewIndex === i}
                    onClick={() => {
                      if (i === activeViewIndex) return;
                      changeViewWithSlide(i, i > activeViewIndex ? 1 : -1);
                    }}
                    className="absolute inset-0 cursor-pointer rounded-full border-0 bg-transparent p-0"
                        style={{
                      left: -17,
                      top: -17,
                      right: -17,
                      bottom: -17,
                      width: "unset",
                      height: "unset",
                      boxShadow: "none",
                    }}
                  >
                    <span
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: activeViewIndex === i ? "#8a8a8a" : "#d9d9d9",
                      }}
                    />
                </button>
                </div>
              ))}
            </div>

            <div className="mt-3 px-2">
              <div className="rounded-[18px] border border-[#d8d8d8] bg-white/95 px-4 py-5 shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
                <h1
                  className="uppercase text-[#111]"
                style={{
                    fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: 1.12,
                    letterSpacing: "0.08em",
                    whiteSpace: "pre-line",
                  }}
                >
                  {activeCard && leftBlockTitle ? leftBlockTitle : selectedModel.title}
                </h1>

                <div className="relative mt-3">
                  <p
                    className="text-[#111]"
                    style={{
                      fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
                      fontSize: 17,
                      lineHeight: 1.22,
                      color: "#111",
                      display: isMobileTextExpanded ? "block" : "-webkit-box",
                      WebkitLineClamp: isMobileTextExpanded ? "unset" : 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {leftBlockText}
                  </p>

                  {!isMobileTextExpanded && (
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-8"
                      style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.92) 70%, rgba(255,255,255,1) 100%)",
                      }}
                    />
                  )}
          </div>

                {!isMobileTextExpanded && (
                  <button
                    type="button"
                    onClick={() => setIsMobileTextExpanded(true)}
                    className="mt-2 flex min-h-[36px] w-full items-end gap-2 text-left text-[#6d7339]"
          style={{
                      fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      textUnderlineOffset: "3px",
                      color: "#f07426",
                    }}
                  >
                    Больше <span aria-hidden="true">▾</span>
                  </button>
                )}

        </div>

            <button
              type="button"
                onClick={openSizeGrid}
                className="size-table-link mt-1 min-h-[48px] py-2 pr-3 pl-0 text-left"
                style={{ fontSize: 17, lineHeight: 1.15 }}
                aria-label="Открыть таблицу размеров"
              >
                ТАБЛИЦА РАЗМЕРОВ ›
            </button>

        <Link
                href="/where-to-buy"
                className="-mt-2 mx-auto flex h-[56px] w-full max-w-[180px] items-center justify-center rounded-[14px] text-[17px] font-medium text-white no-underline"
                style={{
                  background: "linear-gradient(180deg, #E7813F 0%, #FC6407 100%)",
                  fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
                  fontSize: 17,
                  fontWeight: 400,
                  letterSpacing: "0.08em",
                }}
              >
                Где купить
        </Link>
            </div>
          </div>
        </div>
      </section>
      )}

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
            <div className="relative flex items-center justify-center border-b border-[#ececec] px-5 py-4 min-[1200px]:px-7">
              <h3
                className="whitespace-nowrap uppercase text-[#111]"
                style={{ fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif", fontSize: 24, fontWeight: 700, letterSpacing: "0.08em" }}
              >
                Размерная сетка
              </h3>
            </div>
            <div className="max-h-[calc(84dvh-78px)] overflow-hidden">
              <table className="w-full table-fixed border-collapse text-left min-[1200px]:w-auto min-[1200px]:min-w-[640px]">
                <colgroup>
                  <col style={{ width: "33.33%" }} />
                  <col style={{ width: "33.33%" }} />
                  <col style={{ width: "33.33%" }} />
                </colgroup>
                <thead className="sticky top-0 bg-[#f7f7f7]">
                  <tr>
                    <th className="border-b border-[#ececec] px-2 py-2.5 text-center text-[11px] font-semibold leading-[1.15] text-[#666] min-[1200px]:px-6 min-[1200px]:py-3.5 min-[1200px]:text-[13px]">
                      Размер
                    </th>
                    <th className="border-b border-[#ececec] px-2 py-2.5 text-center text-[11px] font-semibold leading-[1.15] text-[#666] min-[1200px]:px-6 min-[1200px]:py-3.5 min-[1200px]:text-[13px]">
                      Длина стопы, см
                    </th>
                    <th className="border-b border-[#ececec] px-2 py-2.5 text-center text-[11px] font-semibold leading-[1.15] text-[#666] min-[1200px]:px-6 min-[1200px]:py-3.5 min-[1200px]:text-[13px]">
                      Длина стельки, см
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
                      <td className="border-b border-[#f0f0f0] px-2 py-2.5 text-center text-[13px] leading-[1.2] text-[#111] min-[1200px]:px-6 min-[1200px]:py-3.5 min-[1200px]:text-[15px]">{row.foot}</td>
                      <td className="border-b border-[#f0f0f0] px-2 py-2.5 text-center text-[13px] leading-[1.2] text-[#111] min-[1200px]:px-6 min-[1200px]:py-3.5 min-[1200px]:text-[15px]">{row.insole}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      </div>
    </main>
  );
}
