"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [parallaxY, setParallaxY] = useState(0);
  const [advantageSlider, setAdvantageSlider] = useState([0, 1]);
  const advantages = [
    {
      title: "Надежная фиксация",
      text: "Плотная шнуровка и анатомическая колодка для устойчивости стопы в движении.",
    },
    {
      title: "Усиленная подошва",
      text: "Глубокий протектор и амортизация пятки для уверенного шага по любому рельефу.",
    },
    {
      title: "Натуральные материалы",
      text: "Кожа и дышащая подкладка сохраняют комфорт при длительной носке.",
    },
  ];

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setParallaxY(window.scrollY * 0.16);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const updateAdvantageSlider = (idx: number, value: number) => {
    setAdvantageSlider((prev) => {
      const next = [...prev];
      next[idx] = Math.max(0, Math.min(2, value));
      return next;
    });
  };
  const sliderStops = [10, 50, 90];

  return (
    <main className="min-h-screen bg-[#0d0f10] text-zinc-50">
      <div className="mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <section
          id="home"
          className="relative flex min-h-[86vh] flex-col overflow-hidden rounded-[28px] border border-zinc-700/60 px-5 pb-7 pt-8 sm:px-8 lg:aspect-[1536/1024] lg:min-h-0 lg:px-12 lg:pb-10 lg:pt-10"
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/pages/hero-back.png"
              alt=""
              fill
              priority
              className="object-cover object-center will-change-transform"
              style={{
                transform: `translate3d(0, ${parallaxY}px, 0) scale(1.15)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/58 via-black/22 to-black/52" />
          </div>

          <header className="relative z-20 mb-8 flex items-center justify-end text-[12px] text-zinc-200/90">
            <nav className="flex items-center gap-6 sm:gap-8">
              <a href="#home" className="transition-colors hover:text-[#d1ad76]">
                Главная
              </a>
              <a href="#buy" className="transition-colors hover:text-[#d1ad76]">
                Купить
              </a>
              <a href="#models" className="transition-colors hover:text-[#d1ad76]">
                Модели
              </a>
              <a href="#about" className="transition-colors hover:text-[#d1ad76]">
                О нас
              </a>
              <button
                type="button"
                aria-label="Корзина"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8b7355]/40 backdrop-blur-sm transition-all hover:bg-[#8b7355]/60"
              >
                <span className="text-lg">🛒</span>
              </button>
            </nav>
          </header>

          <div className="relative z-10 grid flex-1 grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="relative z-20 max-w-[680px] pt-4 lg:col-span-5 lg:pt-2">
                <p className="mb-5 text-[clamp(0.95rem,1.2vw,1.15rem)] text-zinc-200/85">
                  Одно универсальная пара обуви
                </p>
                <h1 className="font-[family-name:var(--font-oswald)] text-[clamp(2.8rem,5.7vw,5.7rem)] font-bold leading-[0.95] tracking-[0.02em] text-[#c9a961] uppercase">
                  <span className="block whitespace-nowrap">ТАКТИЧЕСКАЯ ОБУВЬ</span>
                  <span className="block whitespace-nowrap">ИЗ НАТУРАЛЬНЫХ</span>
                  <span className="block whitespace-nowrap">МАТЕРИАЛОВ</span>
                </h1>
                <p className="mt-6 max-w-[28rem] text-[clamp(0.95rem,1.2vw,1.15rem)] leading-[1.5] text-zinc-200/85">
                  <span className="block">Одно универсальная пара обуви, которая не подведет</span>
                  <span className="block">ни в походе, ни на службе, ни в городе</span>
                </p>

                <div className="mt-9 flex flex-wrap gap-4">
                  <button
                    id="buy"
                    type="button"
                    className="min-w-44 rounded-full bg-[#c9a961] px-10 py-3.5 text-sm font-bold uppercase tracking-wide text-zinc-900 transition-all hover:bg-[#d4b56f] hover:shadow-[0_5px_20px_rgba(201,169,97,0.4)]"
                  >
                    купить
                  </button>
                  <button
                    type="button"
                    className="min-w-44 rounded-full border-2 border-white/50 bg-transparent px-10 py-3.5 text-sm font-bold uppercase tracking-wide text-zinc-100 transition-all hover:border-white/80 hover:bg-white/10"
                  >
                    подробнее
                  </button>
                </div>
              </div>

              <div className="pointer-events-none relative flex items-end justify-center lg:col-span-7 lg:justify-end">
                <Image
                  src="/images/pages/hero-boot.png"
                  alt="Тактическая обувь VelesBron"
                  width={1185}
                  height={790}
                  className="h-auto w-full max-w-[980px] rotate-[-3.61041deg] object-contain drop-shadow-[0_34px_45px_rgba(0,0,0,0.65)]"
                  priority
                />
              </div>
          </div>

          <div className="relative z-10 mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[0, 1].map((idx) => (
              <div key={idx} className="rounded-xl border border-zinc-200/10 bg-zinc-900/15 px-6 py-5 backdrop-blur-[2px]">
                {(() => {
                  const currentIndex = advantageSlider[idx];
                  const item = advantages[currentIndex];
                  return (
                    <>
                      <div className="relative mb-4">
                        <div className="h-[3px] w-full bg-[#c1b6ae]" />
                        <div
                          className="absolute top-[-5px] h-[14px] w-[74px] bg-[#b39264] transition-all"
                          style={{ left: `calc(${sliderStops[currentIndex]}% - 37px)` }}
                        />
                        <input
                          type="range"
                          min={0}
                          max={2}
                          step={1}
                          value={currentIndex}
                          onChange={(e) => updateAdvantageSlider(idx, Number(e.target.value))}
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          aria-label={`Ползунок преимущества ${idx + 1}`}
                        />
                      </div>
                      <p className="text-[clamp(1.2rem,2vw,1.5rem)] font-semibold leading-tight text-white">
                        {item.title}
                      </p>
                      <p className="mt-3 max-w-[26rem] text-[14px] leading-relaxed text-zinc-300/75">
                        {item.text}
                      </p>
                    </>
                  );
                })()}
              </div>
            ))}
          </div>
        </section>

        <section id="models" className="mt-6 rounded-[28px] border border-zinc-700/60 bg-zinc-900/40 p-6 sm:p-8 lg:p-10">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Коллекция</p>
              <h2 className="mt-2 text-3xl font-semibold text-zinc-100 sm:text-4xl">Модели обуви</h2>
            </div>
            <a href="#buy" className="text-sm text-zinc-300 hover:text-white">
              Смотреть все
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {["Штурм", "Патруль", "Тайга", "Город"].map((model) => (
              <article key={model} className="rounded-2xl border border-zinc-700/70 bg-zinc-950/40 p-4">
                <div className="h-44 rounded-xl bg-zinc-800/70" />
                <h3 className="mt-4 text-lg font-medium text-zinc-100">{model}</h3>
                <p className="mt-1 text-sm text-zinc-300/85">Высокая фиксация голеностопа и износостойкие материалы.</p>
                <button className="mt-4 rounded-full border border-zinc-500/80 px-5 py-2 text-xs uppercase tracking-wide text-zinc-200">
                  Подробнее
                </button>
              </article>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="mt-6 grid grid-cols-1 gap-4 rounded-[28px] border border-zinc-700/60 bg-zinc-900/40 p-6 sm:p-8 lg:grid-cols-12 lg:p-10"
        >
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">О продукте</p>
            <h2 className="mt-2 text-3xl font-semibold text-zinc-100 sm:text-4xl">Почему выбирают VelesBron</h2>
            <p className="mt-4 text-zinc-300/90">
              Мы делаем тактическую обувь для ежедневной нагрузки: служба, выезды, город и походы. Основа
              конструкции - натуральные материалы, усиленный носок и устойчивый протектор.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                "Натуральная кожа",
                "Амортизация пятки",
                "Усиленный протектор",
                "Дышащая подкладка",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-zinc-700/70 bg-zinc-950/35 p-5">
                  <p className="text-lg font-medium text-zinc-100">{item}</p>
                  <p className="mt-2 text-sm text-zinc-300/85">Стабильная работа в любых погодных условиях.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="buy" className="mt-6 rounded-[28px] border border-zinc-700/60 bg-zinc-900/40 p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Где купить</p>
              <h2 className="mt-2 text-3xl font-semibold text-zinc-100 sm:text-4xl">Оформите заказ сегодня</h2>
              <p className="mt-4 max-w-2xl text-zinc-300/90">
                Оставьте заявку, и менеджер поможет подобрать размер и модель под ваш сценарий использования.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-700/70 bg-zinc-950/35 p-5 lg:col-span-5">
              <p className="text-sm text-zinc-300">Цена от</p>
              <p className="mt-1 text-4xl font-semibold text-[#d1ad76]">7 990 ₽</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-full bg-[#c7a26d] px-6 py-3 text-sm font-semibold uppercase text-zinc-950">
                  Купить
                </button>
                <button className="rounded-full border border-zinc-500/80 px-6 py-3 text-sm font-semibold uppercase text-zinc-100">
                  Консультация
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
