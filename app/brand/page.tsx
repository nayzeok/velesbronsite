import ScrollHighlightBlock from "@/components/ScrollHighlightBlock";
import { ScrollHighlightProvider, ScrollHighlightScrollMain } from "@/components/ScrollHighlightContext";
import SiteHeader from "@/components/layout/SiteHeader";

export const metadata = {
  title: "О бренде — VelesBron",
  description: "О бренде VelesBron: миссия, ценности, архитектура продукта",
};

const backgroundShape = "/images_alt/models/ui/background-shape.webp";

const PRINCIPLE_IMAGES: Record<"pragmatism" | "adaptation" | "technology" | "responsibility", string> = {
  pragmatism: "/images_alt/models/ui/15.webp",
  adaptation: "/images_alt/models/ui/14.webp",
  technology: "/images_alt/models/ui/12.webp",
  responsibility: "/images_alt/models/ui/13.webp",
};

const MISSION_VALUES = [
  { key: "pragmatism" as const, title: "Прагматизм", text: "Мы появились не потому, что «хотели делать обувь», а потому что увидели проблему: разрыв между «одноразовым» ширпотребом и дорогим, неадаптированным импортом." },
  { key: "adaptation" as const, title: "Адаптация", text: "Российская стопа шире, зима холоднее, покрытия агрессивнее, а реагенты едкие. Импортные бренды это часто игнорируют. Мы — нет." },
  { key: "technology" as const, title: "Технологичность", text: "Мы используем серьезные материалы: KEVLAR K-29 (используемый в бронежилетах), композитный подносок, армированные лавсановые нити. Это не дань моде, это функциональная необходимость для надёжности и безопасности." },
  { key: "responsibility" as const, title: "Честность", text: "Мы не обещаем, что в наших ботинках путь станет легким. Мы обещаем, что вы его пройдете. Мы не прячемся за громкими именами, а честно говорим: мы изучили опыт других, переработали его и сделали продукт, который работает здесь." },
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
              style={{ fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif", fontWeight: 400 }}
            >

              {/* О VELESBRON */}
              <header className="mb-14">
                <div className="rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] min-[640px]:p-6">
                  <div className="text-center">
                    <h1
                      className="text-[26px] min-[1200px]:text-[30px] uppercase text-[#111]"
                      style={{
                        fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
                        fontWeight: 700,
                        lineHeight: 1.15,
                        letterSpacing: "0.08em",
                      }}
                    >
                      О VELESBRON - надёжность в деталях
                    </h1>
                  </div>
                  <div className="mt-6 max-w-[900px] space-y-4 text-[17px] min-[1200px]:text-[20px] font-medium leading-[1.35] tracking-normal text-[#333]">
                    <p>VELESBRON — это обувь повышенной надёжности, разработанная в России и для России.</p>
                    <p>Наш бренд родился из ощущения, что на рынке образовалась пустота. С одной стороны — масс-маркет, сделанный «для галочки», с другой — дорогие импортные модели, которые редко учитывают реальные запросы нашего покупателя. Мы захотели создать обувь, которая будет лишена этих компромиссов. Ту, в которой учтено всё: от анатомии стопы до переменчивого климата и настоящих условий носки, а не рекламных картинок.</p>
                    <p>Мы не стали изобретать велосипед, а пошли другим путём: изучили лучшие зарубежные конструкции, переосмыслили их и доработали под российскую реальность. Там, где нужно — усилили зоны нагрузки, скорректировали посадку, подобрали материалы, которые не дубеют на морозе и не «плывут» в слякоть, сохраняя свойства при активной, иногда жёсткой эксплуатации.</p>
                    <p>Каждая пара VELESBRON — это продуманная система защиты и поддержки. Мы собрали в ней всё, что действительно важно: износостойкие материалы верха, усиленную сборку, устойчивую подошву, продуманную внутреннюю конструкцию с мембраной и элементы дополнительной безопасности. Ничего лишнего. Только то, что работает.</p>
                    <p>Отдельная и очень важная часть нашей философии — отношение к гарантии.</p>
                    <p>Мы с самого начала закладываем в обувь запас прочности и честно отвечаем за результат. Гарантия для нас — не маркетинговый ход и не формальная бумажка. Это наша уверенность в конструкции и готовность решать вопросы, если они возникнут.</p>
                    <p>VELESBRON стоит выше массового сегмента по ресурсу и контролю качества, сохраняя главный принцип — дарить устойчивость, защиту и опору с каждым шагом.</p>
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
                        fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
                        fontWeight: 700,
                        lineHeight: 1.15,
                        letterSpacing: "0.08em",
                      }}
                    >
                      Миссия и ценности
                    </h2>
                  </div>
                  <div className="mt-5 max-w-[900px] space-y-4 text-[17px] min-[1200px]:text-[20px] font-medium leading-[1.35] tracking-normal text-[#333]">
                    <p>Создавать надёжную обувь для тех, кто идёт своим маршрутом – в городе, на объекте, в лесу, в горах или при выполнении тактических задач.</p>
                    <p>Мы не обещаем лёгкий путь. Мы гарантируем защиту и поддержку на нём.</p>
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
                            style={{ fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif", fontWeight: 700, letterSpacing: "0.08em", lineHeight: 1.2 }}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <p className="mt-3 text-[17px] min-[1200px]:text-[20px] font-medium leading-[1.35] tracking-normal text-[#444]">{item.text}</p>
                      </ScrollHighlightBlock>
                    ))}
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
