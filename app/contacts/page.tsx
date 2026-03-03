import SiteHeader from "@/components/layout/SiteHeader";

export const metadata = {
  title: "Контакты — VelesBron",
  description: "Юридическая информация, контакты сервисной службы, менеджера B2B и поддержки",
};

const backgroundShape = "/images/models/ui/background-shape.png";

export default function ContactsPage() {
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

          <div className="relative mx-auto w-[min(1120px,92vw)] pb-20 min-[1200px]:pt-[168px]">
            <h1
              className="uppercase text-[#111]"
              style={{
                fontFamily: "var(--font-russo-one), Russo One, sans-serif",
                fontSize: "clamp(39px,3.75vw,66px)",
                lineHeight: 1,
              }}
            >
              Контакты
            </h1>
            <p className="mt-5 max-w-[760px] text-[19px] leading-[1.35] text-[#111]/72">
              Здесь размещены юридические реквизиты, контакты сервисной службы, менеджера B2B и каналы поддержки.
            </p>

            <div className="mt-8 grid gap-5 min-[980px]:grid-cols-2">
              <article className="rounded-[24px] bg-white p-7 shadow-[0_30px_70px_rgba(0,0,0,0.11)]">
                <h2
                  className="uppercase text-[#111]"
                  style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontSize: 28, lineHeight: 1 }}
                >
                  Юридическая информация
                </h2>
                <div className="mt-5 space-y-2 text-[16px] leading-[1.35] text-[#111]/78">
                  <p>ООО "ВЕЛЕСБРОН"</p>
                  <p>ИНН: уточняется</p>
                  <p>ОГРН: уточняется</p>
                  <p>Юр. адрес: уточняется</p>
                  <p>Email: info@velesbron.ru</p>
                </div>
              </article>

              <article className="rounded-[24px] bg-white p-7 shadow-[0_30px_70px_rgba(0,0,0,0.11)]">
                <h2
                  className="uppercase text-[#111]"
                  style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontSize: 28, lineHeight: 1 }}
                >
                  Сервисная служба
                </h2>
                <div className="mt-5 space-y-3 text-[16px] leading-[1.35] text-[#111]/78">
                  <a href="tel:+79990000001" className="block underline decoration-[#111]/35 underline-offset-4">
                    +7 (999) 000-00-01
                  </a>
                  <a href="mailto:service@velesbron.ru" className="block underline decoration-[#111]/35 underline-offset-4">
                    service@velesbron.ru
                  </a>
                  <p>График: Пн-Пт, 10:00-19:00 (МСК)</p>
                </div>
              </article>

              <article className="rounded-[24px] bg-[linear-gradient(180deg,#E7813F_0%,#FC6407_100%)] p-7 text-white shadow-[0_30px_70px_rgba(252,100,7,0.28)]">
                <h2
                  className="uppercase"
                  style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontSize: 28, lineHeight: 1 }}
                >
                  Менеджер B2B
                </h2>
                <div className="mt-5 space-y-3 text-[16px] leading-[1.35] text-white/95">
                  <p>Контакт: Алексей</p>
                  <a href="tel:+79990000002" className="block underline decoration-white/70 underline-offset-4">
                    +7 (999) 000-00-02
                  </a>
                  <a href="mailto:b2b@velesbron.ru" className="block underline decoration-white/70 underline-offset-4">
                    b2b@velesbron.ru
                  </a>
                </div>
              </article>

              <article className="rounded-[24px] bg-white p-7 shadow-[0_30px_70px_rgba(0,0,0,0.11)]">
                <h2
                  className="uppercase text-[#111]"
                  style={{ fontFamily: "var(--font-russo-one), Russo One, sans-serif", fontSize: 28, lineHeight: 1 }}
                >
                  Поддержка
                </h2>
                <div className="mt-5 space-y-3 text-[16px] leading-[1.35] text-[#111]/78">
                  <a href="mailto:support@velesbron.ru" className="block underline decoration-[#111]/35 underline-offset-4">
                    support@velesbron.ru
                  </a>
                  <a href="https://t.me/velesbron" className="block underline decoration-[#111]/35 underline-offset-4">
                    t.me/velesbron
                  </a>
                  <p>По вопросам заказа, гарантии и эксплуатации.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
