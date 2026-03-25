"use client";

import { MarketplaceLink } from "@/components/MarketplaceLink";

type MarketplaceType = "wildberries" | "ozon";

const SALES_CHANNELS: {
  title: string;
  subtitle: string;
  href: string;
  type: MarketplaceType;
  bullets: string[];
}[] = [
  {
    title: "WILDBERRIES",
    subtitle: "Официальный магазин VELESBRON",
    href: "https://www.wildberries.ru/seller/250045449",
    type: "wildberries",
    bullets: ["Полный ассортимент", "Актуальные остатки", "Быстрая доставка", "Бонусы за отзывы"],
  },
  {
    title: "OZON",
    subtitle: "Официальный магазин VELESBRON",
    href: "https://www.ozon.ru/seller/velesbron/",
    type: "ozon",
    bullets: ["Полный ассортимент", "Актуальные остатки", "Удобный выбор", "Дополнительные скидки"],
  },
];

function MarketplaceLogo({ type }: { type: MarketplaceType }) {
  if (type === "wildberries") {
    return (
      <img
        src="/images_alt/models/ui/wb-logo.webp"
        alt=""
        aria-hidden="true"
        className="relative -top-[6px] inline-flex h-[42px] w-[42px] items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
        style={{ borderRadius: 12, objectFit: "cover" }}
      />
    );
  }
  return (
    <img
      src="/images_alt/models/ui/ozon_logo.webp"
      alt=""
      aria-hidden="true"
      className="relative -top-[6px] inline-flex h-[42px] w-[42px] items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
      style={{ borderRadius: 12, objectFit: "cover" }}
    />
  );
}

function CheckRow({ text, index }: { text: string; index: number }) {
  return (
    <li
      className="scroll-highlight-text flex items-center gap-3 text-[15px] font-normal text-[#2b2b2b] transition-colors duration-300 group-hover:text-[#f07426]"
      style={{
        lineHeight: 1.35,
        transitionDelay: `${index * 80}ms`,
        fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
        fontWeight: 400,
      }}
    >
      <span
        className="scroll-highlight-checkmark inline-flex w-4 shrink-0 items-center justify-center opacity-100 min-[1200px]:opacity-0 text-[#f07426] transition-opacity duration-200 min-[1200px]:group-hover:opacity-100"
        style={{ transitionDelay: `${index * 80}ms` }}
        aria-hidden="true"
      >
        ✓
      </span>
      <span>{text}</span>
    </li>
  );
}

export default function MarketplaceCards() {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      e.preventDefault();
      window.location.href = href;
    }
  }

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      {SALES_CHANNELS.map((channel) => (
        <MarketplaceLink
          key={channel.title}
          href={channel.href}
          target="_blank"
          rel="noopener noreferrer"
          marketplaceId={channel.type}
          marketplaceName={channel.title}
          platform={channel.type === "wildberries" ? "wb" : "ozon"}
          onClick={(e) => handleClick(e as React.MouseEvent<HTMLAnchorElement>, channel.href)}
          className="group relative flex flex-col rounded-xl border-2 border-[#e5e5e5] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 active:scale-[0.99] hover:-translate-y-[4px] hover:border-[#f07426] hover:shadow-[0_6px_24px_rgba(0,0,0,0.04),0_12px_28px_rgba(240,116,38,0.20)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f07426] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <div className="flex items-baseline gap-3">
            <p
              className="uppercase text-[20px] min-[1200px]:text-[24px] text-[#111]"
              style={{
                fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
                fontWeight: 700,
                letterSpacing: "0.08em",
                lineHeight: 1.2,
              }}
            >
              {channel.title}
            </p>
            <span aria-hidden="true">
              <MarketplaceLogo type={channel.type} />
            </span>
          </div>
          <p
            className="mt-3 leading-[1.35] text-[#333]/90"
            style={{
              fontSize: 17,
              fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif",
              fontWeight: 400,
            }}
          >
            {channel.subtitle}
          </p>

          <ul className="mt-6 space-y-3">
            {channel.bullets.map((b, i) => (
              <CheckRow key={`${b}-${i}`} text={b} index={i} />
            ))}
          </ul>

          <span
            className={`${channel.type === "wildberries" ? "mt-6 md:mt-auto" : "mt-6"} self-center flex h-[61px] w-[210px] shrink-0 items-center justify-center rounded-[22px] bg-gradient-to-b from-[#E7813F] to-[#FC6407] text-[19px] text-white`}
            style={{ fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif", fontWeight: 400, letterSpacing: "0.08em" }}
          >
            Перейти <span className="ml-2" aria-hidden="true">→</span>
          </span>
        </MarketplaceLink>
      ))}
    </div>
  );
}
