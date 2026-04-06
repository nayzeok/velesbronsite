import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Модели VELESBRON — тактические ботинки и берцы: выбрать свою пару",
  description:
    "Каталог моделей VELESBRON: тактические ботинки/берцы для города и активных задач. Сравните особенности, материалы и конструкцию, выберите подходящую пару и размер.",
  alternates: { canonical: "/models" },
  openGraph: {
    type: "website",
    url: "https://velesbron.ru/models",
    title: "Модели VELESBRON — тактические ботинки и берцы: выбрать свою пару",
    description:
      "Каталог моделей VELESBRON: тактические ботинки/берцы для города и активных задач. Сравните особенности, материалы и конструкцию, выберите подходящую пару и размер.",
  },
};

export default function ModelsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
