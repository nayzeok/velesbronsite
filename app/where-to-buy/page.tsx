export const metadata = {
  title: "Где купить — VelesBron",
  description: "Каналы продаж VelesBron: Wildberries, Ozon и B2B",
};

import SiteHeader from "@/components/layout/SiteHeader";
import MarketplaceCards from "./MarketplaceCards";

const backgroundShape = "/images_alt/models/ui/background-shape.webp";


function LifetimeGuaranteeCard() {
  return (
    <div className="px-4 pb-20 pt-10">
        <div className="mx-auto w-full max-w-[1100px]">
      <div className="rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] min-[640px]:p-6">
        <div className="flex flex-col items-center gap-6 min-[800px]:flex-row min-[800px]:items-start">
          <img src="/images_alt/models/ui/2ico.webp" alt="" aria-hidden="true" className="h-[86px] w-[86px] object-contain shrink-0" />
          <div className="flex-1">
            <h2
              className="uppercase text-[#111]"
              style={{
                fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
                fontSize: "clamp(20px, 1.8vw, 34px)",
                lineHeight: 1.05,
                letterSpacing: "0.02em",
                fontWeight: 700,
              }}
            >
              ПОЖИЗНЕННАЯ ГАРАНТИЯ VELESBRON
            </h2>
            <p className="mt-4 leading-[1.6] text-[#2b2b2b]" style={{ fontSize: 17 }}>
              Мы настолько уверены в качестве своей обуви, что предоставляем пожизненную гарантию на любые производственные дефекты.
            </p>
          </div>
        </div>
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
      {/* Общий фон (как на других страницах) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 w-[886px] -translate-x-1/2" style={{ marginTop: "-88px", height: "calc(100% + 88px)" }}>
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.008) 0%, rgba(40,40,40,0.07) 5.4%, rgba(255,255,255,0.008) 7.143%)" }} />
            <div className="absolute inset-0" style={{ backgroundImage: `url(${backgroundShape})`, backgroundSize: "832px 832px", backgroundPosition: "top left", filter: "blur(90px)", opacity: 0.03 }} />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1670px]">
        <SiteHeader activeItem="whereToBuy" />

        <div className="px-4 pt-[140px] pb-12 min-[1200px]:pt-[168px]">
          <div className="mx-auto w-full max-w-[1100px]">
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

        <LifetimeGuaranteeCard />
      </div>
    </main>
  );
}
