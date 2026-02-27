export const metadata = {
  title: "Где купить — VelesBron",
  description: "Каналы продаж VelesBron: Wildberries, Ozon и B2B",
};

import SiteHeader from "@/components/layout/SiteHeader";

const backgroundShape = "/images/models/ui/background-shape.png";

const SALES_CHANNELS = [
  {
    title: "Wildberries",
    description: "Официальный канал бренда на Wildberries. Актуальные модели и размеры.",
    href: "#",
    icon: "wildberries",
  },
  {
    title: "Ozon",
    description: "Официальный канал бренда на Ozon. Быстрая доставка и актуальные остатки.",
    href: "#",
    icon: "ozon",
  },
] as const;

const GUARANTEE_STEPS = [
  "Обращение клиента через Telegram/сайт с описанием, фото/видео и данными сертификата.",
  "Предварительный анализ и инструкция по отправке пары.",
  "Отправка обуви клиентом в чистом виде с оригиналом сертификата.",
  "Диагностика и экспертиза, финальное решение по случаю.",
  "При подтверждении дефекта — ремонт или комплиментарная замена.",
  "Обратная отправка за счет бренда. Срок процесса — до 45 дней.",
] as const;

const GUARANTEE_LIMITS = [
  "Расширенная пожизненная гарантия действует только при активации сертификата в течение 14 дней.",
  "Возврат денежных средств по расширенной гарантии не предусмотрен.",
  "Гарантия предоставляется один раз на одну пару.",
  "При отсутствии активации действует стандартная гарантия по законодательству РФ.",
] as const;

function MarketplaceIcon({ type }: { type: "wildberries" | "ozon" }) {
  if (type === "wildberries") {
    return (
      <span
        className="relative -top-[2px] inline-flex h-[42px] w-[42px] items-center justify-center rounded-[12px] text-[14px] font-semibold text-white"
        style={{ background: "linear-gradient(135deg, #8d1fff 0%, #ff2f7a 100%)" }}
        aria-hidden="true"
      >
        wb
      </span>
    );
  }

  return (
    <span
      className="relative -top-[2px] inline-flex h-[42px] w-[42px] items-center justify-center rounded-[12px] text-[16px] font-bold text-white"
      style={{ background: "linear-gradient(135deg, #0066ff 0%, #00a3ff 100%)" }}
      aria-hidden="true"
    >
      O
    </span>
  );
}

export default function WhereToBuyPage() {
  return (
    <main className="figma-site-page relative overflow-x-hidden overflow-y-auto bg-white text-[#111] min-h-screen">
      {/* Фоновая подложка на всю страницу */}
      <div className="pointer-events-none fixed inset-0 z-0 mx-auto max-w-[1670px]">
        <div className="absolute left-1/2 top-0 h-[200vmin] w-[886px] -translate-x-1/2" style={{ marginTop: "-88px" }}>
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
      </div>

      <section className="figma-site-stage relative z-10 mx-auto h-[100dvh] w-full overflow-hidden mobile-header-offset">
        <div className="relative mx-auto h-full w-full max-w-[1670px] overflow-hidden">
          <SiteHeader />

          <div className="absolute left-1/2 top-[168px] w-[min(1100px,92vw)] -translate-x-1/2">
            <h1
              className="uppercase text-[#111]"
              style={{
                fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                fontSize: "clamp(48px,4.8vw,65px)",
                lineHeight: 1,
              }}
            >
              Где купить
            </h1>
            <p className="mt-5 max-w-[720px] text-[20px] leading-[1.35] text-[#111]/72">
              Выберите удобный канал продаж или свяжитесь с менеджером для B2B-условий.
            </p>
          </div>

          <div className="absolute left-1/2 top-[340px] grid w-[min(1100px,92vw)] -translate-x-1/2 gap-5 min-[980px]:grid-cols-3">
            {SALES_CHANNELS.map((channel) => (
              <a
                key={channel.title}
                href={channel.href}
                className="group rounded-[24px] bg-white p-7 shadow-[0_30px_70px_rgba(0,0,0,0.11)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <p
                    className="uppercase text-[#111]"
                    style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontSize: 33, lineHeight: 1 }}
                  >
                    {channel.title}
                  </p>
                  <MarketplaceIcon type={channel.icon} />
                </div>
                <p className="mt-4 text-[17px] leading-[1.35] text-[#111]/70">{channel.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[16px] font-semibold text-[#f07426]">
                  Перейти
                  <span aria-hidden="true">→</span>
                </span>
              </a>
            ))}

            <div className="rounded-[24px] bg-[linear-gradient(180deg,#E7813F_0%,#FC6407_100%)] p-7 text-white shadow-[0_30px_70px_rgba(252,100,7,0.28)]">
              <p
                className="uppercase"
                style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontSize: 40, lineHeight: 1 }}
              >
                B2B
              </p>
              <p className="mt-4 text-[17px] leading-[1.35] text-white/90">
                Оптовые поставки для магазинов, экипировочных центров и корпоративных клиентов.
              </p>
              <div className="mt-6 space-y-2 text-[16px]">
                <p>
                  Менеджер: <span className="font-semibold">Алексей</span>
                </p>
                <a href="tel:+79990000000" className="block underline decoration-white/70 underline-offset-4">
                  +7 (999) 000-00-00
                </a>
                <a href="mailto:b2b@velesbron.ru" className="block underline decoration-white/70 underline-offset-4">
                  b2b@velesbron.ru
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16">
        <div className="mx-auto w-[min(1100px,92vw)]">
          <div className="rounded-[28px] bg-[linear-gradient(180deg,#E7813F_0%,#FC6407_100%)] p-7 text-white shadow-[0_30px_70px_rgba(252,100,7,0.28)] min-[980px]:p-10">
            <h2
              className="uppercase"
              style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontSize: "clamp(36px,3.2vw,56px)", lineHeight: 1 }}
            >
              Гарантия и сервис
            </h2>
            <p className="mt-4 max-w-[850px] text-[18px] leading-[1.35] text-white/92">
              Гарантия VELESBRON — это элемент позиционирования, инструмент доверия и управляемый сервисный процесс. Это не «подарок»,
              а контракт ответственности.
            </p>
            <ol className="mt-6 grid gap-3 text-[15px] leading-[1.35] text-white/95 min-[980px]:grid-cols-2">
              {GUARANTEE_STEPS.map((item, i) => (
                <li key={item} className="rounded-[14px] bg-white/14 px-4 py-3">
                  <span className="mr-2 font-semibold">{i + 1}.</span>
                  {item}
                </li>
              ))}
            </ol>
            <ul className="mt-5 grid gap-3 text-[14px] leading-[1.35] text-white/95 min-[980px]:grid-cols-2">
              {GUARANTEE_LIMITS.map((item) => (
                <li key={item} className="rounded-[14px] bg-[#111]/16 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
