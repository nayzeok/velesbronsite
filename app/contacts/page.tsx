import SiteHeader from "@/components/layout/SiteHeader";

export const metadata = {
  title: "Контакты — VelesBron",
  description: "Служба качества и юридическая информация VelesBron",
};

const backgroundShape = "/images_alt/models/ui/background-shape.webp";

function TelegramIcon() {
  return (
    <img
      src="/images_alt/models/ui/tg-logo.webp"
      alt=""
      aria-hidden="true"
      className="inline-block h-[42px] w-[42px] shrink-0 overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.10)]"
      style={{ borderRadius: 12, objectFit: "cover", display: "block" }}
    />
  );
}

export default function ContactsPage() {
  return (
    <main
      className="figma-site-page relative overflow-x-hidden bg-white text-[#111] min-h-screen"
      style={{ fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif", fontWeight: 400 }}
    >
      {/* Фон */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 w-[886px] -translate-x-1/2" style={{ marginTop: "-88px", height: "calc(100% + 88px)" }}>
          <div className="absolute inset-0">
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
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1670px]">
        <SiteHeader activeItem="contacts" />

        <div className="px-4 pt-[140px] pb-20 min-[1200px]:pt-[168px]">
          <div className="mx-auto w-full max-w-[1100px]">
            <div className="rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] min-[640px]:p-6">

              {/* Заголовок */}
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
                  КОНТАКТЫ
                </h1>
              </div>

              {/* Подблоки */}
              <div className="mt-8 grid gap-4 md:grid-cols-2">

                {/* Служба качества */}
                <article className="rounded-xl border-2 border-[#e5e5e5] bg-white p-6">
                  <h2
                    className="uppercase text-[#111] text-[14px] min-[1200px]:text-[17px]"
                    style={{
                      fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      lineHeight: 1.2,
                    }}
                  >
                    Служба качества
                  </h2>
                  <div className="mt-5 space-y-3" style={{ fontSize: 17, lineHeight: 1.5 }}>
                    <a
                      href="https://t.me/shop_MP_support"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#111] hover:text-[#f07426] transition-colors duration-200"
                    >
                      <TelegramIcon />
                      <span>@shop_MP_support</span>
                    </a>
                    <div className="flex select-none items-center gap-2 text-[#111]/80">
                      <span className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.08)]" style={{ borderRadius: 12, background: "#e8e8e8" }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <rect x="2" y="4" width="20" height="16" rx="3" stroke="#555" strokeWidth="1.8"/>
                          <path d="M2 8l10 7 10-7" stroke="#555" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                      </span>
                      <span>sale-yamarket@yandex.ru</span>
                    </div>
                    <div className="flex select-none items-center gap-2 text-[#111]/80">
                      <span className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.08)]" style={{ borderRadius: 12, background: "linear-gradient(135deg, #E7813F 0%, #FC6407 100%)" }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>+7 (969) 103-00-33</span>
                    </div>
                  </div>
                </article>

                {/* Юридическая информация */}
                <article className="rounded-xl border-2 border-[#e5e5e5] bg-white p-6">
                  <h2
                    className="uppercase text-[#111] text-[14px] min-[1200px]:text-[17px]"
                    style={{
                      fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      lineHeight: 1.2,
                    }}
                  >
                    Юридическая информация
                  </h2>
                  <div className="mt-5 select-none space-y-2 text-[#111]/80" style={{ fontSize: 17, lineHeight: 1.5 }}>
                    <p>ООО «РЕШЕНИЕ»</p>
                    <p>ИНН 5406849838, КПП 540601001</p>
                    <p>ОГРН 1255400025715</p>
                    <p>630007, Новосибирская область, г. Новосибирск, ул. Октябрьская, зд. 42</p>
                    <p>e-mail: mail@evbul.ru</p>
                  </div>
                </article>

              </div>


            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
