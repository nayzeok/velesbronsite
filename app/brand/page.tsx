import SiteHeader from "@/components/layout/SiteHeader";

export const metadata = {
  title: "О бренде — VelesBron",
  description: "О бренде VelesBron: история, производство и гарантия",
};

const backgroundShape = "/images/models/ui/background-shape.png";

const BRAND_BLOCKS = [
  {
    title: "История",
    text: "VELESBRON появился как прагматичный ответ на разрыв между массовой обувью и дорогим импортом. Мы адаптировали европейскую конструкцию под российские условия, климат и особенности стопы.",
  },
  {
    title: "Производство",
    text: "Гибридная подошва EVA + резина, кевлар K-29, композитный подносок, Cordura 1000D и усиленные узлы сборки. Конструкция рассчитана на реальную нагрузку и долгий ресурс.",
  },
  {
    title: "Гарантия",
    text: "Расширенная пожизненная гарантия действует при активации сертификата в течение 14 дней. Мы не обещаем лишнего: при подтверждении дефекта выполняется ремонт или замена.",
  },
] as const;

const BRAND_TIMELINE = [
  { year: "Этап 1", text: "Изучены лучшие европейские и американские образцы треккингово-тактической обуви." },
  { year: "Этап 2", text: "Европейская конструкция переосмыслена инженерами-технологами под российские сценарии." },
  { year: "Этап 3", text: "Сделан акцент на ресурсе, защите, анатомической посадке и сервисной ответственности." },
] as const;

const CORE_ADVANTAGES = [
  "Повышенная износостойкость за счет гибридной подошвы и материалов верха.",
  "Усиленная конструкция с тройными швами и армированными лавсановыми нитями.",
  "Антипрокольная защита: кевлар K-29 и сопротивление точечной нагрузке более 1265 Н.",
  "Всесезонный комфорт: мембрана VELTEX в диапазоне от -15°C до +20°C.",
  "Анатомическая посадка под полноту 8 и размерный ряд, адаптированный под российскую стопу.",
] as const;

const BRAND_VALUES = [
  {
    title: "Прагматизм",
    text: "Мы появились не из моды, а из реального запроса: убрать разрыв между «одноразовым» сегментом и дорогим неадаптированным импортом.",
  },
  {
    title: "Адаптация",
    text: "Российская стопа шире, климат жестче, покрытия агрессивнее. Конструкция, колодка и материалы рассчитаны именно на эти условия.",
  },
  {
    title: "Технологичность",
    text: "Кевлар K-29, композитный подносок, Cordura 1000D, гибридная подошва и усиленная сборка — не ради маркетинга, а ради функциональности.",
  },
  {
    title: "Ответственность",
    text: "Вместо стоимости скидок мы закладываем стоимость ресурса и сервиса. Гарантия — это контракт ответственности бренда.",
  },
  {
    title: "Честность",
    text: "Мы не обещаем легкий путь. Мы обещаем, что пара рассчитана на нагрузку и что по сервису мы действительно разбираемся в ситуации.",
  },
] as const;

const PRODUCT_ARCHITECTURE = [
  {
    title: "Гибридная подошва и защита",
    text: "Основа EVA с амортизацией и устойчивостью к холоду, подметка из износостойкой резиновой смеси, антипрокольная вставка из кевлара K-29.",
  },
  {
    title: "Верх ботинка",
    text: "Натуральный нубук с гидрофобной обработкой, вставки Cordura 1000D и композитный подносок для защиты без лишнего веса.",
  },
  {
    title: "Мембрана VELTEX",
    text: "«Чулочная» конструкция с герметизацией швов: защита от влаги при типовых сценариях и комфортная терморегуляция.",
  },
  {
    title: "Сборка и контроль",
    text: "Тройные швы, армированные нити, проклейка ключевых узлов и многоуровневый контроль качества на этапах производства.",
  },
] as const;

const VOICE_RULES = [
  "Спокойно, точно, по делу: факты вместо пафоса.",
  "Сила без агрессии и уважение к человеку в формулировках.",
  "Без обещаний сверх регламента и условий сертификата.",
  "Если есть проблема — разбираемся и предлагаем решение.",
] as const;

export default function BrandPage() {
  return (
    <main className="figma-site-page min-h-screen overflow-x-hidden overflow-y-auto bg-[#d9d9d9] text-[#111]">
      <section className="figma-site-stage relative mx-auto min-h-[100dvh] w-full overflow-hidden bg-white">
        <div className="relative mx-auto h-full min-h-[100dvh] w-full max-w-[1670px] overflow-hidden">
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

          <SiteHeader />

          <div className="relative mx-auto w-[min(1120px,92vw)] pb-24 mobile-header-offset min-[1200px]:pt-[168px]">
            <section className="rounded-[28px] bg-white/90 p-8 shadow-[0_30px_70px_rgba(0,0,0,0.1)] backdrop-blur-sm min-[980px]:p-10">
              <h1
                className="uppercase text-[#111]"
                style={{
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                  fontSize: "clamp(42px,5vw,88px)",
                  lineHeight: 1,
                }}
              >
                О VELESBRON
              </h1>
              <p className="mt-3 text-[20px] leading-[1.3] text-[#111]/80">
              </p>
              <p className="mt-5 max-w-[1060px] text-[19px] leading-[1.38] text-[#111]/72">
                VELESBRON — это обувь повышенной надёжности, разработанная в России для реальных условий эксплуатации.

                Бренд появился как ответ на разрыв между массовыми моделями «для вида» и дорогими импортными решениями, не всегда адаптированными под климат, покрытия и особенности стопы.

                Мы изучили лучшие зарубежные конструкции, переосмыслили их и доработали с учётом российских условий. Усилили зоны нагрузки. Скорректировали посадку. Подобрали материалы, которые работают в широком диапазоне температур и сохраняют свойства при активной эксплуатации.

                Каждая пара VELESBRON — это продуманная система защиты и поддержки: износостойкие материалы верха, усиленная сборка, устойчивая подошва, внутренняя мембранная конструкция и элементы дополнительной безопасности. Ничего лишнего. Только то, что действительно работает.

                Мы не обещаем лёгкий путь.
                Мы создаём обувь, рассчитанную на нагрузку.

                Отдельная часть философии бренда — гарантийные обязательства.
                Мы изначально закладываем в продукт ресурс и ответственность. Гарантия для нас — не инструмент продаж и не формальность в документах. Это подтверждение уверенности в конструкции и готовности отвечать за результат.

                Если пара требует внимания — мы разбираемся и принимаем решение. Спокойно, по делу, без перекладывания ответственности и без громких заявлений.

                VELESBRON стоит выше массового сегмента по ресурсу и контролю качества, сохраняя главный принцип — устойчивость, защиту и опору в каждом шаге.

                VELESBRON — броня для ваших ног.
                Ты идёшь — мы держим землю под ногами.
              </p>
            </section>

            <section className="mt-8 rounded-[28px] bg-white p-7 shadow-[0_30px_70px_rgba(0,0,0,0.11)] min-[980px]:p-10">
              <h2
                className="uppercase text-[#111]"
                style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontSize: "clamp(36px,3.2vw,56px)", lineHeight: 1 }}
              >
                Миссия и ценности
              </h2>
              <p className="mt-4 max-w-[850px] text-[17px] leading-[1.35] text-[#111]/72">
                Создавать надежную обувь для тех, кто идет своим маршрутом — в городе, на объекте, в лесу, в горах или при выполнении
                тактических задач. Мы не обещаем легкий путь. Мы гарантируем защиту и поддержку на нём.
              </p>
              <div className="mt-7 grid gap-4 min-[980px]:grid-cols-2">
                {BRAND_VALUES.map((item) => (
                  <article key={item.title} className="rounded-[18px] border border-[#111]/10 bg-[#f6f6f6] p-5">
                    <h3 className="text-[30px] leading-none text-[#111]" style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif" }}>
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.35] text-[#111]/72">{item.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-8 rounded-[28px] bg-white p-7 shadow-[0_30px_70px_rgba(0,0,0,0.11)] min-[980px]:p-10">
              <h2
                className="uppercase text-[#111]"
                style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontSize: "clamp(36px,3.2vw,56px)", lineHeight: 1 }}
              >
                Ключевые преимущества
              </h2>
              <ul className="mt-6 grid gap-3 min-[980px]:grid-cols-2">
                {CORE_ADVANTAGES.map((item) => (
                  <li key={item} className="rounded-[14px] bg-[#f3f3f3] px-4 py-3 text-[15px] leading-[1.35] text-[#111]/78">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-8 rounded-[28px] bg-white p-7 shadow-[0_30px_70px_rgba(0,0,0,0.11)] min-[980px]:p-10">
              <h2
                className="uppercase text-[#111]"
                style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontSize: "clamp(36px,3.2vw,56px)", lineHeight: 1 }}
              >
                Архитектура продукта
              </h2>
              <div className="mt-7 grid gap-4 min-[980px]:grid-cols-2">
                {PRODUCT_ARCHITECTURE.map((item) => (
                  <article key={item.title} className="rounded-[18px] border border-[#111]/10 bg-[#fafafa] p-5">
                    <h3 className="text-[27px] leading-none text-[#111]" style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif" }}>
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.35] text-[#111]/72">{item.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-8 rounded-[28px] bg-white p-7 shadow-[0_30px_70px_rgba(0,0,0,0.11)] min-[980px]:p-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2
                  className="uppercase text-[#111]"
                  style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontSize: "clamp(36px,3.2vw,56px)", lineHeight: 1 }}
                >
                  Фото и видео
                </h2>
                <span className="rounded-[12px] bg-[#111] px-4 py-2 text-[13px] font-medium uppercase tracking-wide text-white/90">
                  Контентный блок
                </span>
              </div>
              <p className="mt-4 max-w-[760px] text-[16px] leading-[1.35] text-[#111]/66">
                Здесь можно размещать репортажи с производства, полевые испытания, интервью, материал о технологиях и инструкции по
                уходу за обувью.
              </p>
              <div className="mt-7 grid gap-5 min-[700px]:grid-cols-2">
                {[
                  { title: "Полевые испытания", type: "Фото" },
                  { title: "Производство и сборка", type: "Видео" },
                  { title: "Материалы и узлы", type: "Фото" },
                  { title: "Сервис и гарантия", type: "Видео" },
                ].map((item) => (
                  <article key={item.title} className="overflow-hidden rounded-[20px] border border-[#111]/8 bg-[#f2f2f2]">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[linear-gradient(140deg,#D8D8D8_0%,#BCBCBC_100%)]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.55),rgba(255,255,255,0)_55%)]" />
                      <span className="absolute left-4 top-4 rounded-[10px] bg-white/90 px-3 py-1 text-[12px] font-semibold uppercase text-[#111]">
                        {item.type}
                      </span>
                      {item.type === "Видео" ? (
                        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#111]/80 text-white">
                          ▶
                        </span>
                      ) : null}
                    </div>
                    <div className="p-5">
                      <h3 className="text-[24px] leading-none text-[#111]" style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif" }}>
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.35] text-[#111]/68">Здесь можно поставить ссылку на медиа-материал или открыть модальное окно.</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

          </div>
        </div>
      </section>
    </main>
  );
}
