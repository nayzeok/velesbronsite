import SiteHeader from "@/components/layout/SiteHeader";

export const metadata = {
  title: "Медиа — VelesBron",
  description: "Фото и видео VelesBron: полевые испытания, производство, материалы и сервис",
};

const backgroundShape = "/images/models/ui/background-shape.png";

const MEDIA_ITEMS = [
  { title: "Полевые испытания", type: "Фото" as const },
  { title: "Производство и сборка", type: "Видео" as const },
  { title: "Материалы и узлы", type: "Фото" as const },
  { title: "Сервис и гарантия", type: "Видео" as const },
] as const;

export default function MediaPage() {
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

          <div className="relative mx-auto w-[min(1120px,92vw)] pb-24 min-[1200px]:pt-[168px]">
            <section className="rounded-[28px] bg-white p-7 shadow-[0_30px_70px_rgba(0,0,0,0.11)] min-[980px]:p-10">
              <h1
                className="uppercase text-[#111]"
                style={{
                  fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                  fontSize: "clamp(32px,3.75vw,66px)",
                  lineHeight: 1,
                }}
              >
                Медиа
              </h1>
              <p className="mt-4 max-w-[760px] text-[16px] leading-[1.35] text-[#111]/66">
                Репортажи с производства, полевые испытания, интервью, материал о технологиях и инструкции по уходу за обувью.
              </p>
              <div className="mt-10 grid gap-5 min-[700px]:grid-cols-2">
                {MEDIA_ITEMS.map((item) => (
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
                      <h2 className="text-[24px] leading-none text-[#111]" style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif" }}>
                        {item.title}
                      </h2>
                      <p className="mt-3 text-[15px] leading-[1.35] text-[#111]/68">
                        Здесь можно поставить ссылку на медиа-материал или открыть модальное окно.
                      </p>
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
