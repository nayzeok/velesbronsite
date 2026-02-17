"use client";

import Image from "next/image";
export default function Home() {
  return (
    <main className="figma-site-page bg-[#e8e8e8] text-white">
      <section className="figma-site-stage" style={{ ["--figma-stage-height" as string]: "1112px" }}>
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <div className="absolute inset-0">
                <Image src="/images/pages/main-background.png" alt="" fill priority className="object-cover" />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              <header className="absolute left-0 top-0 z-30 h-[96px] w-full px-[61px] pt-[18px]">
                <nav className="flex items-center gap-6">
                  <a
                    href="#"
                    className="rounded-[10px] bg-gradient-to-r from-[#8b7a71] to-[#756257] px-5 py-3 text-xs font-medium"
                  >
                    Главная
                  </a>
                  <a href="#" className="text-xs font-medium text-white/95">
                    Купить
                  </a>
                  <a href="/models" className="text-xs font-medium text-white/95">
                    Модели
                  </a>
                  <a href="#" className="text-xs font-medium text-white/95">
                    О нас
                  </a>
                </nav>

                <div className="absolute left-1/2 top-0 h-[86px] w-[159px] -translate-x-1/2 rounded-[10px] bg-white">
                  <div className="absolute left-[-4px] top-[13px] h-[55px] w-[167px]">
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

              <div className="absolute right-[61px] top-[22px] flex items-center gap-[10px]">
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

            <div className="absolute left-[64px] top-[173px] z-20">
              <h2
                className="bg-clip-text text-[55px] font-medium uppercase leading-none text-transparent"
                style={{
                  fontFamily: "Druk Cyr, var(--font-oswald), sans-serif",
                  backgroundImage: "linear-gradient(180deg, #FCFFFC 0%, #E7D1C7 100%)",
                }}
              >
                МОДЕЛЬ &apos;2026
              </h2>

              <div className="mt-1 flex items-center rounded-full bg-[#f4f4f2] p-[3px]">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="-ml-[8px] first:ml-0">
                    <div className="size-[66px] overflow-hidden rounded-full bg-[#f4f4f2]">
                      <Image
                        src="/images/pages/main-model-for-hero.png"
                        alt=""
                        width={66}
                        height={66}
                        className="h-full w-full object-cover object-left-top"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 w-[305px] text-[18px] leading-[26px] text-white">
                Разработано для силовых структур и спортивного образа жизни
              </p>
            </div>

            <div className="absolute left-[826px] top-[215px] z-10 h-[421px] w-[658px]">
              <h1
                className="bg-clip-text text-right text-[115px] font-medium uppercase leading-[108px] text-transparent"
                style={{
                  fontFamily: "Druk Cyr, var(--font-oswald), sans-serif",
                  backgroundImage: "linear-gradient(180deg, #FCFFFC 0%, #E7D1C7 100%)",
                }}
              >
                ТАКТИЧЕСКАЯ ОБУВЬ
                <br />
                ИЗ НАТУРАЛЬНЫХ
                <br />
                МАТЕРИАЛОВ
              </h1>
            </div>

            <div className="absolute left-[320px] top-[194px] z-20 h-[690px] w-[844px]">
              <Image
                src="/images/pages/main-model-for-hero.png"
                alt="Тактическая обувь"
                width={844}
                height={690}
                className="h-full w-full object-contain"
                priority
              />
            </div>

            <div className="absolute left-[52px] top-[759px] z-20 w-[398px] text-[24px] font-medium leading-[33px] text-[#c6c6c6]">
              <span className="text-white">Одна универсальная пара обуви,</span> которая не подведет ни в походе, ни на
              службе, ни в городе
            </div>

            <button
              type="button"
              className="absolute left-[52px] top-[889px] z-20 h-20 w-[248px] rounded-[20px] bg-gradient-to-b from-[#e7813f] to-[#fc6407] text-[34px] font-medium"
              style={{ fontFamily: "Druk Cyr, var(--font-oswald), sans-serif" }}
            >
              Купить
            </button>

            <div className="absolute left-[1256px] top-[676px] z-20 h-[293px] w-[230px] overflow-hidden rounded-[19px] bg-white">
              <div className="relative h-full w-full">
                <Image src="/images/pages/main-background.png" alt="" fill className="object-cover opacity-85" />
                <Image
                  src="/images/pages/main-model-for-hero.png"
                  alt="Превью модели"
                  fill
                  className="object-cover object-bottom"
                />
              </div>
            </div>

            <p className="absolute left-[1171px] top-[939px] z-20 text-[18px] leading-[26px] text-white">| 01/04 |</p>

            <div className="absolute left-[1342px] top-[978px] z-20 flex items-center gap-[7px]">
              <span className="size-[9px] rounded-full bg-white" />
              <span className="size-[9px] rounded-full bg-white/45" />
              <span className="size-[9px] rounded-full bg-white/45" />
              <span className="size-[9px] rounded-full bg-white/45" />
            </div>
          </div>
      </section>
    </main>
  );
}
