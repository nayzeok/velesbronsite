"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ScrollHighlightContextValue = {
  register: (id: string, el: HTMLElement | null) => void;
  getIntensity: (id: string) => number;
  registerScrollContainer: (el: HTMLElement | null) => void;
};

const ScrollHighlightContext = createContext<ScrollHighlightContextValue | null>(null);

export function useScrollHighlight() {
  const ctx = useContext(ScrollHighlightContext);
  return ctx;
}

export function ScrollHighlightProvider({
  children,
  scrollContainerRef,
}: {
  children: ReactNode;
  /** Контейнер скролла (например main с overflow-y-auto). Если не передан — слушаем window. */
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
}) {
  const refs = useRef<Map<string, HTMLElement>>(new Map());
  const [active, setActive] = useState<{ id: string | null; intensity: number }>({
    id: null,
    intensity: 0,
  });
  const raf = useRef<number | null>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  const register = useCallback((id: string, el: HTMLElement | null) => {
    if (el) refs.current.set(id, el);
    else refs.current.delete(id);
  }, []);

  const registerScrollContainer = useCallback((el: HTMLElement | null) => {
    setScrollContainer((prev) => (prev === el ? prev : el));
  }, []);

  const getIntensity = useCallback(
    (id: string) => {
      if (active.id !== id) return 0;
      return active.intensity;
    },
    [active.id, active.intensity]
  );

  const update = useCallback(() => {
    const isDesktop =
      typeof window !== "undefined" && window.innerWidth >= 640;
    if (isDesktop) {
      setActive((prev) =>
        prev.id === null && prev.intensity === 0 ? prev : { id: null, intensity: 0 }
      );
      return;
    }

    const vh = typeof window !== "undefined" ? window.innerHeight : 600;
    const centerY = vh / 2;
    const halfView = vh / 2;
    let bestId: string | null = null;
    let bestDistance = Infinity;

    refs.current.forEach((el, id) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < vh;
      if (!inView) return;
      const blockCenterY = rect.top + rect.height / 2;
      const distance = Math.abs(blockCenterY - centerY);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestId = id;
      }
    });

    const intensity =
      bestId === null
        ? 0
        : Math.pow(Math.max(0, 1 - bestDistance / halfView), 1.2);

    setActive((prev) =>
      prev.id === bestId && Math.abs(prev.intensity - intensity) < 0.01
        ? prev
        : { id: bestId, intensity }
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const scrollEl = scrollContainerRef?.current ?? scrollContainer ?? null;
    const target: HTMLElement | Window = scrollEl ?? window;

    const onScrollOrResize = () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        update();
      });
    };
    update();
    target.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("touchmove", onScrollOrResize, { passive: true });
    return () => {
      target.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("touchmove", onScrollOrResize);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [update, scrollContainerRef, scrollContainer]);

  const value: ScrollHighlightContextValue = {
    register,
    getIntensity,
    registerScrollContainer,
  };

  return (
    <ScrollHighlightContext.Provider value={value}>
      {children}
    </ScrollHighlightContext.Provider>
  );
}

/** Оборачивает scroll-контейнер (например main) и регистрирует его в контексте для подсветки по скроллу */
export function ScrollHighlightScrollMain({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLElement>) {
  const ctx = useScrollHighlight();
  const setRef = useCallback(
    (el: HTMLMainElement | null) => {
      ctx?.registerScrollContainer(el);
    },
    [ctx]
  );
  return (
    <main ref={setRef} className={className} {...rest}>
      {children}
    </main>
  );
}
