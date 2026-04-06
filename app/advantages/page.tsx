import type { Metadata } from "next";
import { AdvantagesContent } from "./AdvantagesContent";

export const metadata: Metadata = {
  title: "Конструкция VELESBRON — мембрана, антипрокол и усиленная прошивка",
  description:
    "Технологии VELESBRON: мембрана VELTEX™, антипрокольная вставка K‑29, армированные нити и анатомическая стелька. Разбираем каждый элемент конструкции.",
  alternates: { canonical: "/advantages" },
  openGraph: {
    type: "website",
    url: "https://velesbron.ru/advantages",
    title: "Конструкция VELESBRON — мембрана, антипрокол и усиленная прошивка",
    description:
      "Технологии VELESBRON: мембрана VELTEX™, антипрокольная вставка K‑29, армированные нити и анатомическая стелька. Разбираем каждый элемент конструкции.",
  },
};

export default function AdvantagesPage() {
  return (
    <main className="figma-site-page overflow-x-hidden bg-[#d9d9d9] text-[#111] min-[1200px]:overflow-hidden">
      <AdvantagesContent />
    </main>
  );
}
