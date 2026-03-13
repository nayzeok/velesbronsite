import ScrollHighlightBlock from "@/components/ScrollHighlightBlock";
import { ScrollHighlightProvider, ScrollHighlightScrollMain } from "@/components/ScrollHighlightContext";
import SiteHeader from "@/components/layout/SiteHeader";

export const metadata = {
  title: "О бренде — VelesBron",
  description: "О бренде VelesBron: миссия, ценности, архитектура продукта",
};

const backgroundShape = "/images/models/ui/background-shape.png";

/** Картинки для блока «Миссия и ценности»: Прагматизм, Адаптация, Технологичность, Ответственность */
const PRINCIPLE_IMAGES: Record<"pragmatism" | "adaptation" | "technology" | "responsibility", string> = {
  pragmatism: "/images/models/ui/15.png",
  adaptation: "/images/models/ui/14.png",
  technology: "/images/models/ui/12.png",
  responsibility: "/images/models/ui/13.png",
};

const MISSION_VALUES = [
  { key: "pragmatism" as const, title: "Прагматизм", text: "Мы появились не из моды, а из реального запроса: убрать разрыв между «одноразовым» сегментом и дорогим неадаптированным импортом." },
  { key: "adaptation" as const, title: "Адаптация", text: "Российская стопа шире, климат жёстче, покрытия агрессивнее. Конструкция, колодка и материалы рассчитаны именно на эти условия." },
  { key: "technology" as const, title: "Технологичность", text: "Кевлар K-29, композитный подносок, Cordura 1000D, гибридная подошва и усиленная сборка — не ради маркетинга, а ради функциональности." },
  { key: "responsibility" as const, title: "Ответственность", text: "Вместо стоимости скидок мы закладываем стоимость ресурса и сервиса. Гарантия — это контракт ответственности бренда." },
];

const PRODUCT_ARCHITECTURE = [
  { title: "Гибридная подошва и защита", text: "Основа EVA с амортизацией и устойчивостью к холоду, подмётка из износостойкой резиновой смеси, антипрокольная вставка из кевлара K-29." },
  { title: "Верх ботинка", text: "Натуральный нубук с гидрофобной обработкой, вставки Cordura 1000D и композитный подносок для защиты без лишнего веса." },
  { title: "Мембрана VELTEX™", text: "«Чулочная» конструкция с герметизацией швов: защита от влаги при типовых сценариях и комфортная терморегуляция." },
  { title: "Сборка и контроль", text: "Тройные швы, армированные нити, проклейка ключевых узлов и многоуровневый контроль качества на этапах производства." },
];

/** Блок «Почему появился VELESBRON»: три карточки */
const WHY_VELESBRON_CARDS = [
  {
    id: "mass",
    title: "Массовый сегмент",
    icon: "/images/models/ui/1ico.png",
    iconScale: 2,
    text: "Часто рассчитан на внешний вид, а не на реальную эксплуатацию.",
    points: ["Низкий ресурс", "Слабая защита", "Быстрый износ"],
    highlight: false,
  },
  {
    id: "solution",
    title: "Решение VELESBRON",
    icon: "/images/models/ui/6ico.png",
    iconScale: 2,
    text: "Мы изучили лучшие европейские и американские конструкции, переосмыслили их и адаптировали под реальные условия эксплуатации.",
    points: ["Защита", "Ресурс", "Ответственность"],
    highlight: true,
  },
  {
    id: "import",
    title: "Импортные бренды",
    icon: "/images/models/ui/3ico.png",
    iconScale: 2,
    text: "Высокое качество, но не всегда адаптация под российский климат, покрытия и форму стопы.",
    points: ["Высокая стоимость"],
    highlight: false,
  },
];

/** Блок «Гарантия VELESBRON»: три карточки */
const GUARANTEE_CARDS = [
  {
    id: "lifetime",
    title: "Пожизненная гарантия",
    icon: "/images/models/ui/2ico.png",
    iconScale: 2,
    text: "Расширенная гарантия действует при активации сертификата.",
    line2: "Мы уверены в конструкции и берем ответственность",
  },
  {
    id: "repair",
    title: "Ремонт или замена",
    icon: "/images/models/ui/4ico.png",
    iconScale: 2,
    text: "Если дефект подтверждается, мы выполняем ремонт или замену пары.",
    line2: "Решение принимается после диагностики.",
  },
  {
    id: "service",
    title: "Сервисная поддержка",
    icon: "/images/models/ui/5ico.png",
    iconScale: 2,
    text: "Экспертиза и ремонт осуществляются брендом.",
    line2: "Обратная отправка обуви выполняется за счёт бренда.",
  },
];

export default function BrandPage() {
  return (
    <ScrollHighlightProvider>
      <ScrollHighlightScrollMain className="figma-site-page min-h-screen overflow-x-hidden bg-[#d9d9d9] text-[#111]">
        <section className="figma-site-stage relative mx-auto min-h-[100dvh] w-full overflow-hidden bg-white">
          <div className="relative mx-auto h-full min-h-[100dvh] w-full max-w-[1670px] overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="absolute inset-y-0" style={{ left: `${(i * 100) / 14}%`, width: `${100 / 14}%` }}>
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

          <SiteHeader activeItem="brand" />

          <div
            className="relative mx-auto max-w-[1000px] px-4 pb-20 pt-[calc(5rem+env(safe-area-inset-top))] min-[1200px]:px-8 min-[1200px]:pt-[7rem]"
            style={{ fontFamily: "var(--font-roboto-flex), sans-serif", fontWeight: 400 }}
          >

        {/* О VELESBRON */}
        <header className="mb-14">
          <div className="rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] min-[640px]:p-6">
            <div className="text-center">
              <h1
                className="text-[26px] min-[1200px]:text-[30px] uppercase text-[#111]"
                style={{
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "0.08em",
                }}
              >
                О VELESBRON - надёжность в деталях
              </h1>
            </div>
            <div className="mt-6 max-w-[900px] space-y-4 text-[17px] min-[1200px]:text-[20px] font-medium leading-[1.35] tracking-normal text-[#333]">
            <p>
              VELESBRON — это обувь повышенной надёжности, разработанная в России для реальных условий эксплуатации.
            </p>
            <p>
              Бренд появился как ответ на разрыв между массовыми моделями «для вида» и дорогими импортными решениями, не всегда адаптированными под климат, покрытия и особенности стопы.
            </p>
            <p>
              Мы изучили лучшие зарубежные конструкции, переосмыслили их и доработали с учётом российских условий. Усилили зоны нагрузки. Скорректировали посадку. Подобрали материалы, которые работают в широком диапазоне температур и сохраняют свойства при активной эксплуатации.
            </p>
            <p>
              Каждая пара VELESBRON — это продуманная система защиты и поддержки: износостойкие материалы верха, усиленная сборка, устойчивая подошва, внутренняя мембранная конструкция и элементы дополнительной безопасности. Ничего лишнего. Только то, что действительно работает.
            </p>
            <p>
              Мы не обещаем лёгкий путь.<br />
              Мы создаём обувь, рассчитанную на нагрузку.
            </p>
            <p>
              Отдельная часть философии бренда — гарантийные обязательства.<br />
              Мы изначально закладываем в продукт ресурс и ответственность. Гарантия для нас — не инструмент продаж и не формальность в документах. Это подтверждение уверенности в конструкции и готовности отвечать за результат.
            </p>
            <p>
              Если пара требует внимания — мы разбираемся и принимаем решение. Спокойно, по делу, без перекладывания ответственности и без громких заявлений.
            </p>
            <p>
              VELESBRON стоит выше массового сегмента по ресурсу и контролю качества, сохраняя главный принцип — устойчивость, защиту и опору в каждом шаге.
            </p>
            <p>
              VELESBRON — броня для ваших ног.<br />
              Ты идёшь — мы держим землю под ногами.
            </p>
            </div>
          </div>
        </header>

        {/* МИССИЯ И ЦЕННОСТИ */}
        <section className="mb-14">
          <div className="rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] min-[640px]:p-6">
            <div className="text-center">
              <h2
                className="text-[26px] min-[1200px]:text-[30px] uppercase text-[#111]"
                style={{
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "0.08em",
                }}
              >
                Миссия и ценности
              </h2>
            </div>
            <div className="mt-5 max-w-[900px] space-y-4 text-[17px] min-[1200px]:text-[20px] font-medium leading-[1.35] tracking-normal text-[#333]">
              <p>
                Мы создаём надёжную обувь для тех, кто идёт своим маршрутом — в городе, на объекте, в лесу, в горах или при выполнении тактических задач.
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-[#111]/40" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <span>Мы не обещаем лёгкий путь. Мы гарантируем защиту и поддержку на нём.</span>
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {MISSION_VALUES.map((item, index) => (
              <ScrollHighlightBlock
                key={item.key}
                id={`mission-${item.key}`}
                as="article"
                liftPx={4}
                shadowOpacity={0.18}
                tabIndex={0}
                className="group relative rounded-xl border-2 border-[#e5e5e5] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f07426] focus-visible:ring-offset-2 active:scale-[0.99] active:bg-[#fafafa] sm:p-5 brand-card-mobile-enter"
                style={{ animationDelay: `${index * 120}ms` }}
                aria-label={`${item.title}: ${item.text.slice(0, 60)}…`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f5f5f5] transition-transform duration-300 group-hover:scale-105">
                    <img src={PRINCIPLE_IMAGES[item.key]} alt="" className="h-8 w-8 object-contain" />
                  </span>
                  <h3
                    className="text-[14px] min-[1200px]:text-[17px] uppercase text-[#111]"
                    style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontWeight: 700, letterSpacing: "0.08em", lineHeight: 1.2 }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 text-[17px] min-[1200px]:text-[20px] font-medium leading-[1.35] tracking-normal text-[#444]">{item.text}</p>
              </ScrollHighlightBlock>
            ))}
          </div>
        </section>

        {/* АРХИТЕКТУРА ПРОДУКТА */}
        <section className="mb-14">
          <div className="rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] min-[640px]:p-6">
            <div className="text-center">
              <h2
                className="text-[26px] min-[1200px]:text-[30px] uppercase text-[#111]"
                style={{
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "0.08em",
                }}
              >
                Архитектура продукта
              </h2>
            </div>
            <p className="mt-3 text-[17px] min-[1200px]:text-[20px] font-medium leading-[1.35] tracking-normal text-[#555]">
              Каждая пара VELESBRON — это система защиты, устойчивости и комфорта.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {PRODUCT_ARCHITECTURE.map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl border border-[#e5e5e5] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                >
                  <h3
                    className="text-[14px] min-[1200px]:text-[17px] uppercase text-[#111]"
                    style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontWeight: 700, letterSpacing: "0.08em", lineHeight: 1.25 }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[17px] min-[1200px]:text-[20px] font-medium leading-[1.35] tracking-normal text-[#444]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ПОЧЕМУ ПОЯВИЛСЯ VELESBRON */}
        <section className="mb-14">
          <div className="rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] min-[640px]:p-6">
            <div className="text-center">
              <h2
                className="text-[26px] min-[1200px]:text-[30px] uppercase text-[#111]"
                style={{
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "0.08em",
                }}
              >
                Почему появился VELESBRON
              </h2>
              <p className="mt-3 text-[17px] min-[1200px]:text-[20px] font-medium leading-[1.35] tracking-normal text-[#333]">
                Ответ на разрыв между массовым сегментом и дорогим импортом.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {WHY_VELESBRON_CARDS.map((card) => (
                <ScrollHighlightBlock
                  key={card.id}
                  id={`why-${card.id}`}
                  as="article"
                  liftPx={6}
                  shadowOpacity={0.25}
                  className="group cursor-pointer overflow-hidden rounded-xl border-2 border-[#e5e5e5] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300"
                >
                  <div className="scroll-highlight-header px-4 py-3 text-center transition-colors duration-300 group-hover:bg-[#f07426]/20">
                    <h3
                      className="text-[14px] min-[1200px]:text-[17px] uppercase text-[#111]"
                      style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontWeight: 700, letterSpacing: "0.08em", lineHeight: 1.2 }}
                    >
                      {card.title}
                    </h3>
                  </div>
                  <div className="px-5 pt-0.5 pb-5">
                    <div className="flex justify-center">
                      <span className={`relative inline-flex items-center justify-center ${(card as { iconScale?: number }).iconScale === 2 ? "size-28" : "size-14"}`}>
                        <img
                          src={card.icon}
                          alt=""
                          className={`object-contain ${(card as { iconScale?: number }).iconScale === 2 ? "h-24 w-24" : "h-12 w-12"}`}
                        />
                        <span
                          className="scroll-highlight-check absolute bottom-3 right-0 flex size-8 items-center justify-center rounded-full bg-[#f07426] text-white opacity-0 shadow transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90"
                          aria-hidden
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                      </span>
                    </div>
                    <p className="mt-2 text-[17px] min-[1200px]:text-[20px] font-medium leading-[1.35] tracking-normal text-[#444]">{card.text}</p>
                    <div className="mt-4 border-t border-[#e5e5e5] pt-4">
                    {card.points.map((point, pointIndex) => (
                      <p
                        key={point}
                        className="scroll-highlight-text flex items-center text-[17px] min-[1200px]:text-[20px] font-medium leading-[1.35] tracking-normal text-[#444] transition-colors duration-300 group-hover:text-[#f07426]"
                        style={{ transitionDelay: `${pointIndex * 80}ms` }}
                      >
                        <span
                          className="scroll-highlight-checkmark mr-1.5 inline-flex w-4 shrink-0 items-center justify-center opacity-0 text-[#f07426] transition-opacity duration-200 group-hover:opacity-100"
                          style={{ transitionDelay: `${pointIndex * 80}ms` }}
                          aria-hidden
                        >
                          ✓
                        </span>
                        {point}
                      </p>
                    ))}
                    </div>
                  </div>
                </ScrollHighlightBlock>
              ))}
            </div>
            <div className="mt-8 max-w-[900px] space-y-3 text-center">
              <p className="text-[17px] min-[1200px]:text-[20px] font-semibold leading-[1.35] tracking-normal text-[#111]">
                VELESBRON создавался как прагматичный ответ на этот разрыв.
              </p>
              <p className="text-[17px] min-[1200px]:text-[20px] font-medium leading-[1.35] tracking-normal text-[#333]">
                Мы взяли лучшие инженерные решения, доработали конструкцию, адаптировали колодку под российскую стопу и усилили ключевые узлы. Получилась обувь, рассчитанная на реальную нагрузку.
              </p>
            </div>
          </div>
        </section>

        {/* ГАРАНТИЯ VELESBRON */}
        <section className="mb-14">
          <div className="rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] min-[640px]:p-6">
            <div className="text-center">
              <h2
                className="text-[29px] min-[1200px]:text-[34px] uppercase text-[#111]"
                style={{
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "0.08em",
                }}
              >
                Гарантия VELESBRON
              </h2>
              <p className="mt-3 text-[17px] min-[1200px]:text-[20px] font-medium leading-[1.35] tracking-normal text-[#333]">
                Мы отвечаем за свою работу.
              </p>
            </div>
            <div className="mt-6 max-w-[900px] space-y-4 text-[17px] min-[1200px]:text-[20px] font-medium leading-[1.35] tracking-normal text-[#333]">
              <p>Гарантия — это не маркетинг. Это ответственность за конструкцию.</p>
              <p>Гарантия распространяется на производственные дефекты, расхождение швов, отслоение подошвы и нарушения конструкций.</p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {GUARANTEE_CARDS.map((card) => (
                <ScrollHighlightBlock
                  key={card.id}
                  id={`guarantee-${card.id}`}
                  as="article"
                  liftPx={6}
                  shadowOpacity={0.25}
                  className="group cursor-pointer overflow-hidden rounded-xl border-2 border-[#e5e5e5] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300"
                >
                  <div className="scroll-highlight-header px-4 py-3 text-center transition-colors duration-300 group-hover:bg-[#f07426]/20">
                    <h3
                      className="text-[14px] min-[1200px]:text-[17px] uppercase text-[#111]"
                      style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontWeight: 700, letterSpacing: "0.08em", lineHeight: 1.2 }}
                    >
                      {card.title}
                    </h3>
                  </div>
                  <div className="px-5 pt-2 pb-5">
                    <div className="mb-4 flex justify-center">
                      <span className={`relative inline-flex items-center justify-center ${(card as { iconScale?: number }).iconScale === 2 ? "size-28" : "size-16"}`}>
                        <img
                          src={card.icon}
                          alt=""
                          className={`object-contain ${(card as { iconScale?: number }).iconScale === 2 ? "h-24 w-24" : "h-12 w-12"}`}
                        />
                        <span
                          className="scroll-highlight-check absolute bottom-3 right-0 flex size-8 items-center justify-center rounded-full bg-[#f07426] text-white opacity-0 shadow transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90"
                          aria-hidden
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                      </span>
                    </div>
                    <div className="space-y-2">
                      {[card.text, card.line2].map((line, pointIndex) => (
                        <p
                          key={pointIndex}
                          className="scroll-highlight-text flex items-center text-[17px] min-[1200px]:text-[20px] font-medium leading-[1.35] tracking-normal text-[#444] transition-colors duration-300 group-hover:text-[#f07426]"
                          style={{ transitionDelay: `${pointIndex * 80}ms` }}
                        >
                          <span
                            className="scroll-highlight-checkmark mr-1.5 inline-flex w-4 shrink-0 items-center justify-center opacity-0 text-[#f07426] transition-opacity duration-200 group-hover:opacity-100"
                            style={{ transitionDelay: `${pointIndex * 80}ms` }}
                            aria-hidden
                          >
                            ✓
                          </span>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </ScrollHighlightBlock>
              ))}
            </div>
            <div className="mt-8 max-w-[900px] space-y-3 text-center">
              <p className="text-[17px] min-[1200px]:text-[20px] font-semibold leading-[1.35] tracking-normal text-[#111]">
                Если пара подвела — мы разбираемся и решаем.
              </p>
            </div>
          </div>
        </section>
          </div>
        </div>
      </section>
      </ScrollHighlightScrollMain>
    </ScrollHighlightProvider>
  );
}
