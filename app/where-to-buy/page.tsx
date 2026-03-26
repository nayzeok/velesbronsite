export const metadata = {
  title: "Где купить — VelesBron",
  description: "Каналы продаж VelesBron: Wildberries, Ozon и B2B",
};

import SiteHeader from "@/components/layout/SiteHeader";
import MarketplaceCards from "./MarketplaceCards";

const backgroundShape = "/images_alt/models/ui/background-shape.webp";

function LifetimeGuaranteeCard({ compact }: { compact?: boolean }) {
  return (
    <div className="rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] min-[640px]:p-5">
      <div className="flex flex-col items-center gap-4 min-[800px]:flex-row min-[800px]:items-center">
        <img
          src="/images_alt/models/ui/2ico.webp"
          alt=""
          aria-hidden="true"
          className={compact ? "h-[52px] w-[52px] object-contain shrink-0" : "h-[86px] w-[86px] object-contain shrink-0"}
        />
        <div className="flex-1">
          <h2
            className="uppercase text-[#111]"
            style={{
              fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
              fontSize: compact ? "clamp(16px, 1.3vw, 24px)" : "clamp(20px, 1.8vw, 34px)",
              lineHeight: 1.05,
              letterSpacing: "0.02em",
              fontWeight: 700,
            }}
          >
            ПОЖИЗНЕННАЯ ГАРАНТИЯ VELESBRON
          </h2>
          <p
            className="mt-2 leading-[1.5] text-[#2b2b2b]"
            style={{ fontSize: compact ? 14 : 17 }}
          >
            Мы настолько уверены в качестве своей обуви, что предоставляем пожизненную гарантию на любые производственные дефекты.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WhereToBuyPage() {
  return (
    <main
      className="figma-site-page relative overflow-x-hidden bg-white text-[#111] min-h-screen"
      style={{ fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif", fontWeight: 400 }}
    >
      {/* Фон desktop */}
      <div className="pointer-events-none absolute inset-0 z-0 max-[1199px]:hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.008) 0%, rgba(40,40,40,0.07) 5.4%, rgba(255,255,255,0.008) 7.143%)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: `url(${backgroundShape})`, backgroundSize: "832px 832px", backgroundPosition: "top left", filter: "blur(90px)", opacity: 0.03 }} />
      </div>
      {/* Фон mobile */}
      <div className="pointer-events-none absolute inset-0 z-0 min-[1200px]:hidden">
        <div className="absolute left-1/2 top-0 w-[886px] -translate-x-1/2" style={{ marginTop: "-88px", height: "calc(100% + 88px)" }}>
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.008) 0%, rgba(40,40,40,0.07) 5.4%, rgba(255,255,255,0.008) 7.143%)" }} />
            <div className="absolute inset-0" style={{ backgroundImage: `url(${backgroundShape})`, backgroundSize: "832px 832px", backgroundPosition: "top left", filter: "blur(90px)", opacity: 0.03 }} />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1670px]">
        <SiteHeader activeItem="whereToBuy" />

        {/* ── DESKTOP: всё в 1 экран ── */}
        <div
          className="hidden min-[1200px]:flex flex-col justify-center px-6"
          style={{ minHeight: "calc(100dvh - 96px)", paddingTop: 86, paddingBottom: 0 }}
        >
          <div className="mx-auto w-full max-w-[1100px] flex flex-col gap-4">

            {/* Гарантия — ВЫШЕ блока с карточками */}
            <LifetimeGuaranteeCard />

            {/* Основной блок: заголовок + карточки маркетплейсов */}
            <div className="rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] min-[640px]:p-6">
              <div className="text-center">
                <h1
                  className="uppercase text-[#111] text-[29px] min-[1200px]:text-[34px]"
                  style={{
                    fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: "0.08em",
                  }}
                >
                  ГДЕ КУПИТЬ VELESBRON
                </h1>
                <p className="mt-3 font-medium leading-[1.35] text-[#333] text-[17px] min-[1200px]:text-[20px]">
                  Выберите удобный канал. Официальные площадки бренда.
                </p>
              </div>
              <MarketplaceCards />
            </div>

          </div>
        </div>

        {/* ── MOBILE: прежний вид ── */}
        <div className="min-[1200px]:hidden">
          <div className="px-4 pt-[140px] pb-8">
            <div className="mx-auto w-full max-w-[1100px]">
              <div className="rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] min-[640px]:p-6">
                <div className="text-center">
                  <h1
                    className="uppercase text-[#111] text-[29px]"
                    style={{
                      fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
                      fontWeight: 700,
                      lineHeight: 1.15,
                      letterSpacing: "0.08em",
                    }}
                  >
                    ГДЕ КУПИТЬ VELESBRON
                  </h1>
                  <p className="mt-3 font-medium leading-[1.35] text-[#333] text-[17px]">
                    Выберите удобный канал. Официальные площадки бренда.
                  </p>
                </div>
                <MarketplaceCards />
              </div>
            </div>
          </div>
          <div className="px-4 pb-16">
            <div className="mx-auto w-full max-w-[1100px]">
              <LifetimeGuaranteeCard />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
