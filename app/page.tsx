"use client";

import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";

const heroBackground = "/images/pages/hero-background.png";
const figmaMobileHeaderLogo = "https://www.figma.com/api/mcp/asset/dd45ea25-f504-4c35-a74a-80ccec60b9e0";
const MOBILE_HERO_BOOT = {
  width: 660,
  height: 540,
  aspectRatio: "93 / 76",
  left: 65,
  top: 740,
  designWidth: 741,
} as const;
const MOBILE_HERO_HEADLINE = {
  left: 726,
  top: 169,
  width: 658,
  fontSize: 72,
  lineHeight: 68,
  designWidth: 741,
} as const;
const MOBILE_MODEL_LABEL = {
  left: 26,
  top: 468,
  width: 380,
  designWidth: 741,
} as const;
const MOBILE_BOTTOM_TEXT = {
  left: 56,
  bottom: 10,
  width: 232,
  fontSize: 18,
  lineHeight: 22,
} as const;
const DESIGN_HEIGHT = 1000;

const heroThumbs = [
  {
    key: "1",
    image: "/images/pages/hero_mini_photo_1.png",
    frame: { left: 3, top: -11, width: 58, height: 77 },
    transform: "scaleY(-1) rotate(180deg)",
  },
  {
    key: "2",
    image: "/images/pages/hero_mini_photo_2.png",
    frame: { left: 3, top: -11, width: 58, height: 77 },
    transform: "scaleY(-1) rotate(180deg)",
  },
  {
    key: "3",
    image: "/images/pages/hero_mini_photo_3.png",
    frame: { left: 0, top: -22, width: 67, height: 90 },
  },
  {
    key: "4",
    image: "/images/pages/hero_mini_photo_4.png",
    frame: { left: 0, top: -11, width: 66, height: 88 },
  },
];
export default function Home() {
  const stageHeightFitScale = `min(1, calc(100dvh / ${DESIGN_HEIGHT}px))`;

  return (
    <main className="figma-site-page overflow-x-hidden bg-[#e8e8e8] text-white">
      <section className="relative min-[1200px]:hidden">
        <div
          className="relative overflow-hidden"
          style={{
            minHeight: "max(100dvh, 640px)",
            paddingTop: "calc(4rem + env(safe-area-inset-top, 0px))",
            paddingLeft: "env(safe-area-inset-left, 0px)",
            paddingRight: "env(safe-area-inset-right, 0px)",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          {/* Фон на всю высоту, в т.ч. под хедером; отступ только у контента */}
          <div
            className="absolute left-0 right-0 bottom-0 z-0"
            style={{ top: "calc(-4rem - env(safe-area-inset-top, 0px))" }}
          >
            <img src={heroBackground} alt="" className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover" />
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.18)]" />
          </div>

          <h1
            className="absolute z-20 uppercase text-transparent"
            style={{
              left: `calc((100vw / ${MOBILE_HERO_HEADLINE.designWidth}) * ${MOBILE_HERO_HEADLINE.left})`,
              top: `calc((100vw / ${MOBILE_HERO_HEADLINE.designWidth}) * ${MOBILE_HERO_HEADLINE.top})`,
              width: `calc((100vw / ${MOBILE_HERO_HEADLINE.designWidth}) * ${MOBILE_HERO_HEADLINE.width})`,
              transform: "translateX(-100%)",
              textAlign: "right",
              fontFamily: "var(--font-russo-one), Russo One, sans-serif",
              fontSize: "clamp(21px, 7.1vw, 33px)",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: "0.01em",
              backgroundImage: "linear-gradient(180deg, #FCFFFC 0%, #E7D1C7 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ТАКТИЧЕСКАЯ ОБУВЬ ИЗ НАТУРАЛЬНЫХ МАТЕРИАЛОВ
          </h1>

          <div
            className="absolute z-30 max-w-[calc(100vw-32px)] overflow-visible"
            style={{
              left: `calc((100vw / ${MOBILE_MODEL_LABEL.designWidth}) * ${MOBILE_MODEL_LABEL.left})`,
              top: `calc((100vw / ${MOBILE_MODEL_LABEL.designWidth}) * ${MOBILE_MODEL_LABEL.top})`,
              width: `min(calc((100vw / ${MOBILE_MODEL_LABEL.designWidth}) * ${MOBILE_MODEL_LABEL.width}), calc(100vw - 32px))`,
            }}
          >
            <h2
              className="bg-clip-text text-[clamp(24px,9vw,36px)] uppercase leading-none text-transparent"
              style={{
                fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                fontStyle: "normal",
                fontWeight: 700,
                backgroundImage: "linear-gradient(180deg, #FCFFFC 0%, #E7D1C7 100%)",
              }}
            >
              МОДЕЛЬ &apos;2026
            </h2>

            <div className="mt-1 flex items-center">
              {heroThumbs.map((item, index) => (
                  <div key={item.key} className={`shrink-0 ${index === 0 ? "" : "-ml-3"}`}>
                    <div className="relative h-[36px] w-[36px] min-h-[36px] min-w-[36px] shrink-0 overflow-hidden rounded-full bg-[#f4f4f2]">
                      <img
                        src={item.image}
                        alt=""
                        className="pointer-events-none absolute left-0 top-0 h-full w-full object-contain"
                        style={{
                          transform: item.transform ? `scale(1.1) ${item.transform}` : "scale(1.1)",
                          transformOrigin: "center center",
                        }}
                      />
                    </div>
                  </div>
              ))}
            </div>

            <p
              className="mt-1.5 max-w-[305px] text-white"
              style={{
                fontFamily: "var(--font-roboto-flex), sans-serif",
                fontSize: "clamp(11px,3vw,13px)",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: 1.35,
              }}
            >
              Разработано для силовых структур и спортивного образа жизни
            </p>
          </div>

          <div
            className="pointer-events-none absolute z-20 overflow-hidden"
            style={{
              left: `calc((100vw / ${MOBILE_HERO_BOOT.designWidth}) * ${MOBILE_HERO_BOOT.left})`,
              top: `calc((100vw / ${MOBILE_HERO_BOOT.designWidth}) * ${MOBILE_HERO_BOOT.top})`,
              width: `calc((100vw / ${MOBILE_HERO_BOOT.designWidth}) * ${MOBILE_HERO_BOOT.width})`,
              height: `calc((100vw / ${MOBILE_HERO_BOOT.designWidth}) * ${MOBILE_HERO_BOOT.height})`,
              aspectRatio: MOBILE_HERO_BOOT.aspectRatio,
            }}
          >
            <img src="/images/pages/main-model-for-hero.png" alt="Тактическая обувь" className="h-full w-full object-cover" />
          </div>

          <div
            className="absolute z-20 max-w-[calc(100vw-24px)]"
            style={{
              left: MOBILE_BOTTOM_TEXT.left,
              right: 16,
              bottom: "max(10px, env(safe-area-inset-bottom, 0px))",
            }}
          >
            <p
              className="text-[#c6c6c6]"
              style={{
                maxWidth: MOBILE_BOTTOM_TEXT.width,
                fontFamily: "var(--font-roboto-flex), sans-serif",
                fontSize: "clamp(15px,4.2vw,18px)",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "22px",
              }}
            >
              <span className="block">
                <span className="text-white">Одна универсальная пара обуви,</span> которая
              </span>
              <span className="block">не подведет ни в походе, ни на службе,</span>
              <span className="block">ни в городе</span>
            </p>
            <Link
              href="/where-to-buy"
              className="mt-5 flex h-[64px] w-[190px] items-center justify-center rounded-[16px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[22px] font-medium text-white"
              style={{ fontFamily: "var(--font-roboto-flex), sans-serif", fontWeight: 500 }}
            >
              Купить
            </Link>
          </div>
        </div>
      </section>

      <section
        className="figma-site-stage relative hidden h-[100dvh] overflow-hidden min-[1200px]:block"
        style={{ ["--figma-stage-height" as string]: "100dvh" }}
      >
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 mx-auto h-[100dvh] w-full max-w-[1670px] overflow-hidden">
          <SiteHeader
            tone="light"
            className="absolute left-0 right-0 top-0 z-20 h-[96px] w-full"
          />
          <div
            className="absolute inset-x-0 top-0 h-[1000px] origin-top"
            style={{
              transform: `scale(${stageHeightFitScale})`,
            }}
          >
        <div className="relative flex h-[1000px] w-full flex-col px-[clamp(28px,3.5vw,56px)] pb-0 pt-[18px]">
          <div className="h-[96px] shrink-0" aria-hidden="true" />

          <div className="relative mt-[clamp(24px,6vh,74px)] flex flex-1">
            <div className="relative z-30 w-[clamp(320px,28vw,420px)] shrink-0 overflow-visible">
              <h2
                className="bg-clip-text text-[clamp(40px,3.4vw,55px)] font-medium uppercase leading-none text-transparent"
                style={{
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                  backgroundImage: "linear-gradient(180deg, #FCFFFC 0%, #E7D1C7 100%)",
                }}
              >
                МОДЕЛЬ &apos;2026
              </h2>

              <div className="mt-1 flex items-center">
                {heroThumbs.map((item) => (
                    <div key={item.key} className="shrink-0 -ml-5 first:ml-0">
                      <div className="relative h-[66px] w-[66px] min-h-[66px] min-w-[66px] shrink-0 overflow-hidden rounded-full bg-transparent">
                        <img
                          src={item.image}
                          alt=""
                          className="pointer-events-none absolute left-0 top-0 h-full w-full object-contain"
                          style={{
                            transform: item.transform ? `scale(0.94) ${item.transform}` : "scale(0.94)",
                            transformOrigin: "center center",
                            mixBlendMode: "multiply",
                          }}
                        />
                      </div>
                    </div>
                ))}
              </div>

              <p className="mt-4 w-[305px] text-[18px] leading-[26px] text-white">
                Разработано для силовых структур и спортивного образа жизни
              </p>
            </div>

            <div className="relative flex-1" />
          </div>

          <div
            className="absolute right-0 top-[clamp(138px,calc(7.5rem+6vh),188px)] z-20 w-[clamp(320px,40vw,658px)] flex flex-col items-end"
            style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif" }}
          >
            <h1
              className="flex flex-col items-end uppercase"
              style={{
                textAlign: "right",
                fontSize: "clamp(37px,4.5vw,43px)",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "0.94",
                letterSpacing: "0.01em",
                backgroundImage: "linear-gradient(180deg, #FCFFFC 0%, #E7D1C7 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <span className="whitespace-nowrap">ТАКТИЧЕСКАЯ ОБУВЬ</span>
              <span className="whitespace-nowrap">ИЗ НАТУРАЛЬНЫХ</span>
              <span className="whitespace-nowrap">МАТЕРИАЛОВ</span>
            </h1>
          </div>

          <div className="pointer-events-none absolute left-[320px] top-[194px] z-20 h-[690px] w-[844px] overflow-visible">
            <img
              src="/images/pages/main-model-for-hero.png"
              alt="Тактическая обувь"
              className="pointer-events-none absolute max-w-none drop-shadow-[0_40px_80px_rgba(0,0,0,0.28)]"
              style={{ left: 60, top: -200, width: 750 }}
            />
          </div>

          {/* Высота блока «Одна универсальная пара» + кнопка: больше bottom = выше */}
          <div className="absolute bottom-[clamp(170px,10vh,100px)] right-0 z-20 flex flex-col items-end">
            <p className="w-[clamp(320px,24vw,398px)] max-w-full text-right text-[24px] font-medium leading-[33px] text-[#c6c6c6]">
              <span className="text-white">Одна универсальная пара обуви,</span> которая не подведет ни в походе, ни на службе, ни в городе
            </p>

            <Link
              href="/where-to-buy"
              className="mt-6 flex h-20 w-[248px] shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[34px] font-medium text-white"
              style={{ fontFamily: "var(--font-roboto-flex), sans-serif", fontWeight: 500 }}
            >
              Купить
            </Link>
          </div>
        </div>
          </div>
        </div>
      </section>
    </main>
  );
}
