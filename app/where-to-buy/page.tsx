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
    <main className="figma-site-page overflow-x-hidden overflow-y-auto bg-[#d9d9d9] text-[#111] min-h-screen">
      <section className="figma-site-stage relative mx-auto h-[100dvh] w-full overflow-hidden bg-white">
        <div className="relative mx-auto h-full w-full max-w-[1670px] overflow-hidden">
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

          <div className="absolute left-1/2 top-[168px] w-[min(1100px,92vw)] -translate-x-1/2">
            <h1
              className="uppercase text-[#111]"
              style={{
                fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif",
                fontSize: "clamp(48px,4.8vw,82px)",
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
                    style={{ fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif", fontSize: 40, lineHeight: 1 }}
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
                style={{ fontFamily: "var(--font-pobeda), Pobeda, var(--font-oswald), sans-serif", fontSize: 40, lineHeight: 1 }}
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
    </main>
  );
}
