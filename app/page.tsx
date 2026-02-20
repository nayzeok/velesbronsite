"use client";

import Image from "next/image";
import Link from "next/link";

const figmaHeroBackground = "https://www.figma.com/api/mcp/asset/60c54a29-4bcc-4980-852b-b25d59719777";
const figmaPreviewCardBackground = "https://www.figma.com/api/mcp/asset/0cc1de12-e6e7-4b8b-bc1b-277f10898fa0";
const figmaPreviewCardModel = "https://www.figma.com/api/mcp/asset/657e6955-f498-415b-a0de-c7c0b1b9bb6b";
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
        <div className="relative min-h-screen overflow-hidden">
          <img
            src={figmaHeroBackground}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />

          <header className="relative z-30 px-4 pt-4">
            <div className="mb-4 flex items-center justify-between">
              <a
                href="#"
                className="rounded-[10px] bg-gradient-to-r from-[#8b7a71] to-[#756257] px-4 py-2 text-xs font-medium"
              >
                Главная
              </a>
              <a href="/models" className="text-xs font-medium text-white/95">
                Модели
              </a>
            </div>
            <div className="mx-auto h-[72px] w-[138px] rounded-[10px] bg-white p-2">
              <Image src="/images/pages/header-logo.png" alt="Velesbron" width={132} height={55} className="h-full w-full object-contain" />
            </div>
          </header>

          <div className="relative z-20 px-4 pb-10 pt-8">
            <h2
              className="bg-clip-text text-[34px] font-medium uppercase leading-none text-transparent"
              style={{
                fontFamily: "var(--font-druk-cyr), var(--font-oswald), sans-serif",
                backgroundImage: "linear-gradient(180deg, #FCFFFC 0%, #E7D1C7 100%)",
              }}
            >
              МОДЕЛЬ &apos;2026
            </h2>

            <p className="mt-3 max-w-[340px] text-sm leading-6 text-white">
              Разработано для силовых структур и спортивного образа жизни
            </p>

            <div className="relative mx-auto mt-6 h-[260px] w-full max-w-[360px]">
              <Image
                src="/images/pages/main-model-for-hero.png"
                alt="Тактическая обувь"
                fill
                className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.28)]"
                priority
              />
            </div>

            <h1
              className="mt-5 bg-clip-text text-[40px] font-medium uppercase leading-[0.95] text-transparent"
              style={{
                fontFamily: "var(--font-druk-cyr), var(--font-oswald), sans-serif",
                backgroundImage: "linear-gradient(180deg, #FCFFFC 0%, #E7D1C7 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ТАКТИЧЕСКАЯ ОБУВЬ
              <br />
              ИЗ НАТУРАЛЬНЫХ
              <br />
              МАТЕРИАЛОВ
            </h1>

            <p className="mt-5 max-w-[420px] text-base leading-7 text-[#d6d6d6]">
              <span className="text-white">Одна универсальная пара обуви,</span> которая не подведет ни в походе, ни на службе, ни в городе
            </p>

            <Link
              href="/buy"
              className="mt-6 flex h-14 w-[210px] items-center justify-center rounded-[16px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[26px] font-medium text-white"
              style={{ fontFamily: "var(--font-druk-cyr), var(--font-oswald), sans-serif" }}
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
          <header className="relative h-[96px]">
            <nav className="flex items-center gap-6 pt-[9px]">
              <a
                href="#"
                className="rounded-[10px] bg-gradient-to-r from-[#8b7a71] to-[#756257] px-5 py-3 text-xs font-medium"
              >
                Главная
              </a>
              <a href="/buy" className="text-xs font-medium text-white/95">
                Купить
              </a>
              <a href="/models" className="text-xs font-medium text-white/95">
                Модели
              </a>
              <a href="#" className="text-xs font-medium text-white/95">
                О нас
              </a>
            </nav>

            <div className="absolute left-1/2 top-0 h-[86px] w-[175px] -translate-x-1/2 rounded-[10px] bg-white">
              <div className="absolute left-1/2 top-[13px] h-[55px] w-[167px] -translate-x-1/2">
                <Image
                  src="/images/pages/header-logo.png"
                  alt="Velesbron"
                  width={167}
                  height={55}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>

            <div className="absolute right-[clamp(16px,5.7vw,96px)] top-[22px] flex items-center gap-[10px]">
              <button
                type="button"
                aria-label="Язык"
                className="flex size-[42px] items-center justify-center rounded-[10px] bg-gradient-to-b from-[#7f766f] to-[#635b50]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Корзина"
                className="flex size-[42px] items-center justify-center rounded-[10px] bg-gradient-to-b from-[#7f766f] to-[#635b50]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                  <path d="M4 6h2l1.2 8.5a2 2 0 0 0 2 1.5h7.8a2 2 0 0 0 2-1.6L20 8H8" />
                  <circle cx="10" cy="19" r="1.5" />
                  <circle cx="17" cy="19" r="1.5" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Профиль"
                className="flex size-[42px] items-center justify-center rounded-[10px] bg-gradient-to-b from-[#e7813f] to-[#fc6407]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <circle cx="12" cy="8.2" r="3.2" />
                  <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
                </svg>
              </button>
            </div>
          </header>

          <div className="relative mt-[clamp(24px,6vh,74px)] flex flex-1">
            <div className="relative z-20 w-[clamp(320px,28vw,420px)]">
              <h2
                className="bg-clip-text text-[clamp(40px,3.4vw,55px)] font-medium uppercase leading-none text-transparent"
                style={{
                  fontFamily: "var(--font-druk-cyr), var(--font-oswald), sans-serif",
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
              <div className="absolute right-[clamp(0px,2vw,40px)] top-[clamp(10px,5vh,90px)] z-30 w-[clamp(460px,40vw,658px)] overflow-visible">
                <h1
                  className="flex flex-col items-end uppercase"
                  style={{
                    fontFamily: "var(--font-druk-cyr), var(--font-oswald), sans-serif",
                    textAlign: "right",
                    fontSize: "clamp(84px,6vw,115px)",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "0.94",
                    letterSpacing: "-0.02em",
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

              <p className="absolute bottom-[clamp(35px,2.4vh,34px)] right-[clamp(104px,13vw,226px)] z-20 text-[18px] leading-[26px] text-white">
                | 01/04 |
              </p>

              <div className="absolute bottom-[clamp(2px,0.8vh,10px)] right-[clamp(16px,4vw,55px)] z-20 flex items-center gap-[7px]">
                <span className="size-[9px] rounded-full bg-white" />
                <span className="size-[9px] rounded-full bg-white/45" />
                <span className="size-[9px] rounded-full bg-white/45" />
                <span className="size-[9px] rounded-full bg-white/45" />
              </div>
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

          <div className="absolute bottom-[clamp(8px,1.1vh,16px)] left-[clamp(24px,3.1vw,52px)] z-20">
            <p className="w-[clamp(320px,24vw,398px)] text-[24px] font-medium leading-[33px] text-[#c6c6c6]">
              <span className="text-white">Одна универсальная пара обуви,</span> которая не подведет ни в походе, ни на службе, ни в городе
            </p>

            <Link
              href="/buy"
              className="mt-6 flex h-20 w-[248px] items-center justify-center rounded-[20px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[34px] font-medium text-white"
              style={{ fontFamily: "var(--font-druk-cyr), var(--font-oswald), sans-serif" }}
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
