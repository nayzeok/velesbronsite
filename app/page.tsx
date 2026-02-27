"use client";

import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";

const figmaHeroBackground = "https://www.figma.com/api/mcp/asset/60c54a29-4bcc-4980-852b-b25d59719777";
const figmaPreviewCardBackground = "https://www.figma.com/api/mcp/asset/0cc1de12-e6e7-4b8b-bc1b-277f10898fa0";
const figmaPreviewCardModel = "https://www.figma.com/api/mcp/asset/657e6955-f498-415b-a0de-c7c0b1b9bb6b";
const figmaMobilePreviewCardModel = "https://www.figma.com/api/mcp/asset/3b809981-9952-42d2-919c-602578ecc9bd";
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
  fontSize: 96,
  lineHeight: 90,
  designWidth: 741,
} as const;
const MOBILE_MODEL_LABEL = {
  left: 26,
  top: 440,
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
    key: "146:20",
    image: "https://www.figma.com/api/mcp/asset/f6b599c0-0070-466c-88e2-937ee312b22c",
    frame: { left: 3, top: -11, width: 58, height: 77 },
    transform: "scaleY(-1) rotate(180deg)",
  },
  {
    key: "146:22",
    image: "https://www.figma.com/api/mcp/asset/7ddefd8e-e56f-4ef0-aaa6-705a339a8363",
    frame: { left: 3, top: -11, width: 58, height: 77 },
    transform: "scaleY(-1) rotate(180deg)",
  },
  {
    key: "146:24",
    image: "https://www.figma.com/api/mcp/asset/9c1f73ec-752c-49ba-8507-0f41e65fdd4c",
    frame: { left: 0, top: -22, width: 67, height: 90 },
  },
  {
    key: "146:26",
    image: "https://www.figma.com/api/mcp/asset/5ec81acf-7868-46a4-8e09-0b6c4020723e",
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
            paddingTop: "calc(5.5rem + env(safe-area-inset-top, 0px))",
            paddingLeft: "env(safe-area-inset-left, 0px)",
            paddingRight: "env(safe-area-inset-right, 0px)",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          {/* Фон на всю высоту, в т.ч. под хедером; отступ только у контента */}
          <div
            className="absolute left-0 right-0 bottom-0 z-0"
            style={{ top: "calc(-5.5rem - env(safe-area-inset-top, 0px))" }}
          >
            <img src={figmaHeroBackground} alt="" className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover" />
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
              fontSize: `calc((100vw / ${MOBILE_HERO_HEADLINE.designWidth}) * ${MOBILE_HERO_HEADLINE.fontSize})`,
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: `calc((100vw / ${MOBILE_HERO_HEADLINE.designWidth}) * ${MOBILE_HERO_HEADLINE.lineHeight})`,
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
            className="absolute z-20 max-w-[calc(100vw-32px)]"
            style={{
              left: `calc((100vw / ${MOBILE_MODEL_LABEL.designWidth}) * ${MOBILE_MODEL_LABEL.left})`,
              top: `calc((100vw / ${MOBILE_MODEL_LABEL.designWidth}) * ${MOBILE_MODEL_LABEL.top})`,
              width: `min(calc((100vw / ${MOBILE_MODEL_LABEL.designWidth}) * ${MOBILE_MODEL_LABEL.width}), calc(100vw - 32px))`,
            }}
          >
            <h2
              className="bg-clip-text text-[clamp(32px,12vw,46px)] uppercase leading-none text-transparent"
              style={{
                fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                fontStyle: "normal",
                fontWeight: 700,
                backgroundImage: "linear-gradient(180deg, #FCFFFC 0%, #E7D1C7 100%)",
              }}
            >
              МОДЕЛЬ &apos;2026
            </h2>

            <div className="mt-1.5 flex items-center">
              {heroThumbs.map((item, index) => (
                <div key={item.key} className={index === 0 ? "" : "-ml-1.5"}>
                  <div className="relative size-[44px] overflow-hidden rounded-full bg-[#f4f4f2]">
                    <img
                      src={item.image}
                      alt=""
                      className="pointer-events-none absolute max-w-none object-cover"
                      style={{
                        left: item.frame.left * 0.66,
                        top: item.frame.top * 0.66,
                        width: item.frame.width * 0.66,
                        height: item.frame.height * 0.66,
                        transform: item.transform,
                        transformOrigin: "center center",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p
              className="mt-2 max-w-[305px] text-white"
              style={{
                fontFamily: "var(--font-roboto-flex), sans-serif",
                fontSize: "clamp(13px,3.8vw,15px)",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "22px",
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

          <div
            className="absolute right-4 z-20 overflow-hidden rounded-[11px] bg-white"
            style={{
              width: "min(133px, 36vw)",
              height: "min(170px, 45vw)",
              bottom: "max(0.625rem, env(safe-area-inset-bottom, 0px))",
            }}
          >
            <img
              src={figmaPreviewCardBackground}
              alt=""
              className="pointer-events-none absolute max-w-none object-cover opacity-85"
              style={{ left: -52, top: -17, width: 288, height: 192 }}
            />
            <img
              src={figmaMobilePreviewCardModel}
              alt="Превью модели"
              className="pointer-events-none absolute max-w-none object-cover"
              style={{ left: 0, top: -10, width: 133, height: 177 }}
            />
          </div>

          {/* | 01/04 | и точки-индикаторы
          <p className="absolute bottom-3 right-[164px] z-20 text-[18px] leading-[1.1] text-white">| 01/04 |</p>
          <div className="absolute bottom-[175px] right-[90px] z-20 flex items-center gap-[6px]">
            <span className="size-[8px] rounded-full bg-white" />
            <span className="size-[8px] rounded-full bg-white/45" />
            <span className="size-[8px] rounded-full bg-white/45" />
            <span className="size-[8px] rounded-full bg-white/45" />
          </div>
          */}
        </div>
      </section>

      <section
        className="figma-site-stage relative hidden h-[100dvh] overflow-hidden min-[1200px]:block"
        style={{ ["--figma-stage-height" as string]: "100dvh" }}
      >
        <div className="absolute inset-0">
          <img
            src={figmaHeroBackground}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 mx-auto h-[100dvh] w-full max-w-[1670px] overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-[1000px] origin-top"
            style={{
              transform: `scale(${stageHeightFitScale})`,
            }}
          >
        <div className="relative flex h-[1000px] w-full flex-col px-[clamp(24px,3.6vw,67px)] pb-0 pt-[18px]">
          <SiteHeader
            activeItem="home"
            tone="light"
            className="relative h-[96px]"
            style={{ left: 0, width: "100%" }}
          />

          <div className="relative mt-[clamp(24px,6vh,74px)] flex flex-1">
            <div className="relative z-20 w-[clamp(320px,28vw,420px)] shrink-0">
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
                  <div key={item.key} className="-ml-[8px] first:ml-0">
                    <div className="relative size-[66px] overflow-hidden rounded-full bg-transparent">
                      <img
                        src={item.image}
                        alt=""
                        className="pointer-events-none absolute max-w-none object-cover"
                        style={{
                          left: item.frame.left,
                          top: item.frame.top,
                          width: item.frame.width,
                          height: item.frame.height,
                          transform: item.transform,
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

            <div className="relative flex-1">
              <div className="absolute right-[clamp(0px,2vw,40px)] top-0 z-30 w-[clamp(320px,40vw,658px)] overflow-visible">
                <h1
                  className="flex flex-col items-end uppercase"
                  style={{
                    fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                    textAlign: "right",
                    fontSize: "clamp(50px,6vw,58px)",
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

              {/* | 01/04 | и точки-индикаторы
              <p className="absolute bottom-[clamp(35px,2.4vh,34px)] right-[clamp(104px,13vw,226px)] z-20 text-[18px] leading-[26px] text-white">
                | 01/04 |
              </p>

              <div className="absolute bottom-[clamp(2px,0.8vh,10px)] right-[clamp(16px,4vw,55px)] z-20 flex items-center gap-[7px]">
                <span className="size-[9px] rounded-full bg-white" />
                <span className="size-[9px] rounded-full bg-white/45" />
                <span className="size-[9px] rounded-full bg-white/45" />
                <span className="size-[9px] rounded-full bg-white/45" />
              </div>
              */}
            </div>
          </div>

          <div className="pointer-events-none absolute left-[320px] top-[194px] z-20 h-[690px] w-[844px] overflow-visible">
            {/* left/top — сдвиг в пикселях, width — размер */}
            <img
              src="/images/pages/main-model-for-hero.png"
              alt="Тактическая обувь"
              className="pointer-events-none absolute max-w-none drop-shadow-[0_40px_80px_rgba(0,0,0,0.28)]"
              style={{ left: 60, top: -200, width: 750 }}
            />
          </div>

          {/* Превью-карточка модели — убрана с главной
          <div className="absolute right-[clamp(0px,2vw,40px)] top-[676px] z-20 h-[293px] w-[230px] overflow-hidden rounded-[19px] bg-white">
            <div className="relative h-full w-full">
              <img
                src={figmaPreviewCardBackground}
                alt=""
                className="pointer-events-none absolute max-w-none object-cover opacity-85"
                style={{ left: -92, top: -30, width: 498, height: 332 }}
              />
              <img
                src={figmaPreviewCardModel}
                alt="Превью модели"
                className="pointer-events-none absolute max-w-none object-cover"
                style={{ left: 0, top: -17, width: 230, height: 306 }}
              />
            </div>
          </div>
          */}

          <div className="absolute bottom-[clamp(80px,1.1vh,16px)] right-[clamp(24px,3.6vw,67px)] z-20 flex flex-col items-end">
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
