"use client";

import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useScrollHighlight } from "./ScrollHighlightContext";

const MOBILE_BREAKPOINT = 640;

/** Подсветка на мобилке чуть акцентнее: множители для тени и подъёма */
const MOBILE_BOOST = { shadow: 1.55, lift: 1.2 };

/** Параметры подсветки при скролле (как на hover) */
type ScrollHighlightBlockProps = {
  children: ReactNode;
  /** Уникальный id для режима «только одна карточка» — интенсивность задаётся контекстом */
  id?: string;
  /** Подъём при полной подсветке, px (например 4 или 6) */
  liftPx?: number;
  /** Тень при полной подсветке: opacity оранжевой тени (например 0.18 или 0.25) */
  shadowOpacity?: number;
  className?: string;
  style?: CSSProperties;
  /** Элемент: article, div */
  as?: "article" | "div";
} & Omit<React.HTMLAttributes<HTMLElement>, "style" | "className">;

const BORDER_REST = "rgb(229, 229, 229)";
const BORDER_HOVER = "rgb(240, 116, 38)";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function blendBorder(t: number) {
  return `rgb(${Math.round(lerp(229, 240, t))}, ${Math.round(lerp(229, 116, t))}, ${Math.round(lerp(229, 38, t))})`;
}

export default function ScrollHighlightBlock({
  children,
  id: blockId,
  liftPx = 4,
  shadowOpacity = 0.18,
  className = "",
  style = {},
  as: Tag = "div",
  ...rest
}: ScrollHighlightBlockProps) {
  const ref = useRef<HTMLElement>(null);
  const [localIntensity, setLocalIntensity] = useState(0);
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const raf = useRef<number | null>(null);
  const ctx = useScrollHighlight();

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = typeof window !== "undefined" ? window.innerHeight : 600;
    const centerY = vh / 2;
    const blockCenterY = rect.top + rect.height / 2;
    const inView = rect.bottom > 0 && rect.top < vh;
    if (!inView) {
      setLocalIntensity(0);
      return;
    }
    const distance = Math.abs(blockCenterY - centerY);
    const halfView = vh / 2;
    const raw = Math.max(0, 1 - distance / halfView);
    const smooth = Math.pow(raw, 1.2);
    setLocalIntensity(smooth);
  }, []);

  const setRef = useCallback(
    (el: HTMLElement | null) => {
      (ref as React.MutableRefObject<HTMLElement | null>).current = el;
      if (blockId && ctx) ctx.register(blockId, el);
    },
    [blockId, ctx]
  );

  useEffect(() => {
    if (blockId && ctx) return;
    const onScrollOrResize = () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        update();
      });
    };
    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [blockId, ctx, update]);

  const scrollIntensity =
    blockId && ctx ? ctx.getIntensity(blockId) : localIntensity;
  const effective = hover ? 1 : scrollIntensity;
  const isScrollHighlight = effective > 0 && !hover;
  const mobileBoost =
    isMobile && isScrollHighlight
      ? { lift: MOBILE_BOOST.lift, shadow: MOBILE_BOOST.shadow }
      : { lift: 1, shadow: 1 };
  const dynamicStyle: CSSProperties = {
    transition: "transform 0.2s ease-out, border-color 0.2s ease-out, box-shadow 0.2s ease-out",
    transform:
      effective > 0
        ? `translateY(${-liftPx * effective * mobileBoost.lift}px)`
        : undefined,
    borderColor:
      effective > 0
        ? isMobile && isScrollHighlight
          ? BORDER_HOVER
          : blendBorder(effective)
        : undefined,
    boxShadow:
      effective > 0
        ? `0 ${lerp(2, 12, effective)}px ${lerp(12, 28, effective)}px rgba(0,0,0,${0.04 * (1 - effective)}), 0 12px 28px rgba(240,116,38,${(shadowOpacity * effective * mobileBoost.shadow)})`
        : undefined,
  };

  return (
    <Tag
      ref={setRef}
      className={className}
      style={{ ...style, ...dynamicStyle }}
      data-highlighted={effective > 0 ? "true" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
