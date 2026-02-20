"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";

const DESIGN_HEIGHT = 1000;

const backgroundShape = "/images/models/ui/background-shape.png";

const bootImages = {
  black: "/images/models/views/models/black/1.png",
  oliva: "/images/models/views/models/oliva/1.png",
};

const thumbImages = {
  black: "/images/models/ui/thumb-dark.png",
  oliva: "/images/models/ui/thumb-light.png",
};

const cardImages = [
  {
    black: "/images/models/views/models/black/1.png",
    oliva: "/images/models/views/models/oliva/1.png",
  },
  {
    black: "/images/models/views/models/black/2.png",
    oliva: "/images/models/views/models/oliva/2.png",
  },
  {
    black: "/images/models/views/models/black/3.png",
    oliva: "/images/models/views/models/oliva/3.png",
  },
];

const sizes = [41, 42, 43, 44, 45];

type ColorVariant = "black" | "oliva";

export default function BuyPage() {
  const [selectedSize, setSelectedSize] = useState(42);
  const [colorVariant, setColorVariant] = useState<ColorVariant>("black");
  const stageHeightFitScale = `min(1, calc(100dvh / ${DESIGN_HEIGHT}px))`;

  return (
    <main className="figma-site-page overflow-x-hidden overflow-y-auto bg-[#d9d9d9] text-[#111] min-[1200px]:overflow-hidden">

      {/* ── DESKTOP ── */}
      <section
        className="figma-site-stage relative mx-auto hidden h-[100dvh] w-full overflow-hidden bg-white min-[1200px]:block"
        style={{ ["--figma-stage-height" as string]: "100dvh" }}
      >
        <div className="relative mx-auto h-[100dvh] w-full max-w-[1670px] overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-[1000px] origin-top"
            style={{ transform: `scale(${stageHeightFitScale})` }}
          >

            {/* Glass strips */}
            <div className="pointer-events-none absolute bottom-[-88px] left-[388px] top-[-88px] w-[886px]">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="absolute inset-y-0 w-[63.286px]" style={{ left: `${i * 63.286}px` }}>
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

            {/* Header */}
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
                <Link href="/" className="text-xs font-medium text-[#111]">Главная</Link>
                <span className="rounded-[10px] bg-gradient-to-r from-[#8b7a71] to-[#756257] px-5 py-3 text-xs font-medium text-white">
                  Купить
                </span>
                <Link href="/models" className="text-xs font-medium text-[#111]">Модели</Link>
                <a href="#" className="text-xs font-medium text-[#111]">О нас</a>
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

            {/* Left — model name + description */}
            <div className="absolute" style={{ left: 71, top: 186 }}>
              <h1
                className="uppercase"
                style={{
                  fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                  fontSize: 75,
                  fontWeight: 700,
                  lineHeight: "normal",
                  color: "#111",
                }}
              >
                МОДЕЛЬ 1
              </h1>
              <p
                className="absolute"
                style={{
                  top: 88,
                  left: 0,
                  width: 408,
                  fontFamily: "Gilroy, sans-serif",
                  fontSize: 20,
                  fontWeight: 500,
                  lineHeight: 1.45,
                  color: "#111",
                }}
              >
                Подробное описание товара с инструкциями и о том как его можно использовать. Это рыба-текст для портала или интернет-магазина, сформированное автоматически с помощью нейросети.
              </p>
            </div>

            {/* Center — boot image */}
            <div
              className="pointer-events-none absolute"
              style={{ left: 479, top: 76, width: 746, height: 609 }}
            >
              <img
                key={colorVariant}
                src={bootImages[colorVariant]}
                alt="Тактическая обувь"
                className="h-full w-full animate-view-rise object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,0.12)]"
              />
            </div>

            {/* Right — РАЗМЕР */}
            <p
              className="absolute uppercase"
              style={{
                left: 1444,
                top: 82,
                fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                fontSize: 48,
                fontWeight: 700,
                color: "#111",
              }}
            >
              РАЗМЕР
            </p>

            {/* Size circles */}
            <div className="absolute flex gap-[9px]" style={{ left: 1316, top: 159 }}>
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className="flex items-center justify-center rounded-full transition-all"
                  style={{
                    width: 44,
                    height: 44,
                    background:
                      selectedSize === size
                        ? "linear-gradient(180deg, #E7813F 0%, #FC6407 100%)"
                        : "#d9d9d9",
                    fontFamily: "Gilroy, sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: selectedSize === size ? "#fff" : "#7a7a7a",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Size grid link */}
            <button
              type="button"
              className="absolute"
              style={{
                left: 1399,
                top: 233,
                fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                fontSize: 30,
                fontWeight: 700,
                color: "#999",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Размерная сетка
            </button>

            {/* Right — ЦВЕТ */}
            <p
              className="absolute uppercase"
              style={{
                left: 1494,
                top: 305,
                fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                fontSize: 48,
                fontWeight: 700,
                color: "#111",
              }}
            >
              ЦВЕТ
            </p>

            {/* Color swatches */}
            <div className="absolute flex" style={{ left: 1382, top: 372, gap: 46 }}>
              <button
                type="button"
                onClick={() => setColorVariant("black")}
                className="overflow-hidden rounded-[8px] bg-white p-[6px] transition-all"
                style={{
                  width: 76,
                  height: 75,
                  border: colorVariant === "black" ? "2px solid #f07426" : "2px solid #e0e0e0",
                }}
              >
                <img src={thumbImages.black} alt="Черный" className="h-full w-full object-contain" />
              </button>
              <button
                type="button"
                onClick={() => setColorVariant("oliva")}
                className="overflow-hidden rounded-[8px] bg-white p-[6px] transition-all"
                style={{
                  width: 74,
                  height: 75,
                  border: colorVariant === "oliva" ? "2px solid #f07426" : "2px solid #e0e0e0",
                }}
              >
                <img src={thumbImages.oliva} alt="Оливковый" className="h-full w-full object-contain" />
              </button>
            </div>

            {/* Color labels */}
            <p
              className="absolute uppercase"
              style={{
                left: 1382,
                top: 456,
                fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#999",
              }}
            >
              ЧЕРНЫЙ
            </p>
            <p
              className="absolute uppercase"
              style={{
                left: 1498,
                top: 456,
                fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#999",
              }}
            >
              ОЛИВА
            </p>

            {/* Buy button */}
            <button
              type="button"
              className="absolute"
              style={{
                left: 1341,
                top: 518,
                width: 248,
                height: 72,
                background: "linear-gradient(180deg, #E7813F 0%, #FC6407 100%)",
                borderRadius: 16,
                fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                fontSize: 24,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Купить
            </button>

            {/* Bottom photo cards */}
            {cardImages.map((card, i) => (
              <div
                key={i}
                className="absolute overflow-hidden rounded-[16px]"
                style={{
                  left: 331 + i * (332 + 12),
                  top: 629,
                  width: 332,
                  height: 395,
                  background: "#eceef0",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <img
                  src={card[colorVariant]}
                  alt=""
                  className="object-contain"
                  style={{ height: 329 }}
                />
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── MOBILE ── */}
      <section className="min-[1200px]:hidden px-4 pb-10 pt-4">
        <header className="mb-5">
          <div className="mb-4 flex items-center justify-between">
            <Link href="/" className="text-xs font-medium text-[#111]">Главная</Link>
            <span className="rounded-[10px] bg-gradient-to-r from-[#8b7a71] to-[#756257] px-4 py-2 text-xs font-medium text-white">
              Купить
            </span>
          </div>
          <div className="mx-auto h-[72px] w-[138px] rounded-[10px] bg-white p-2">
            <img src="/images/pages/header-logo.png" alt="Velesbron" className="h-full w-full object-contain" />
          </div>
        </header>

        <h1
          className="uppercase"
          style={{
            fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
            fontSize: 40,
            fontWeight: 700,
            lineHeight: "normal",
            color: "#111",
          }}
        >
          МОДЕЛЬ 1
        </h1>

        <div className="relative mx-auto mt-4 h-[280px] w-full max-w-[420px]">
          <img
            key={colorVariant}
            src={bootImages[colorVariant]}
            alt="Тактическая обувь"
            className="h-full w-full animate-view-rise object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.16)]"
          />
        </div>

        <p className="mt-3 max-w-[600px] text-base leading-7 text-[#111]">
          Подробное описание товара с инструкциями и о том как его можно использовать. Это рыба-текст для портала или интернет-магазина.
        </p>

        {/* Size */}
        <div className="mt-6">
          <p
            className="mb-3 uppercase"
            style={{
              fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            РАЗМЕР
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className="flex items-center justify-center rounded-full transition-all"
                style={{
                  width: 44,
                  height: 44,
                  background:
                    selectedSize === size
                      ? "linear-gradient(180deg, #E7813F 0%, #FC6407 100%)"
                      : "#d9d9d9",
                  fontFamily: "Gilroy, sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  color: selectedSize === size ? "#fff" : "#7a7a7a",
                }}
              >
                {size}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="mt-2"
            style={{
              fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: "#999",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Размерная сетка
          </button>
        </div>

        {/* Color */}
        <div className="mt-6">
          <p
            className="mb-3 uppercase"
            style={{
              fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            ЦВЕТ
          </p>
          <div className="flex gap-4">
            {(["black", "oliva"] as ColorVariant[]).map((v) => (
              <div key={v} className="flex flex-col items-center gap-1">
                <button
                  type="button"
                  onClick={() => setColorVariant(v)}
                  className="overflow-hidden rounded-[8px] bg-white p-[5px] transition-all"
                  style={{
                    width: 64,
                    height: 64,
                    border: colorVariant === v ? "2px solid #f07426" : "2px solid #e0e0e0",
                  }}
                >
                  <img src={thumbImages[v]} alt={v} className="h-full w-full object-contain" />
                </button>
                <p
                  className="uppercase"
                  style={{
                    fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#999",
                  }}
                >
                  {v === "black" ? "ЧЕРНЫЙ" : "ОЛИВА"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="mt-7 h-14 w-[210px] rounded-[16px] text-[22px] font-bold text-white"
          style={{
            background: "linear-gradient(180deg, #E7813F 0%, #FC6407 100%)",
            fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
          }}
        >
          Купить
        </button>

        {/* Bottom cards */}
        <div className="mt-8 grid grid-cols-3 gap-2">
          {cardImages.map((card, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-[12px]"
              style={{ background: "#eceef0", aspectRatio: "332/395" }}
            >
              <img src={card[colorVariant]} alt="" className="h-full w-full object-contain" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
