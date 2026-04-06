import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import ClientErrorToServer from "@/components/ClientErrorToServer";
import CookieConsent from "@/components/CookieConsent";
import MobileHeader from "@/components/layout/MobileHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const drukCyr = localFont({
  src: "../public/fonts/DrukCyr-Medium.woff2",
  variable: "--font-druk-cyr",
  weight: "500",
  style: "normal",
  display: "swap",
});

const pobeda = localFont({
  src: "../public/fonts/Pobeda-Regular.woff",
  variable: "--font-pobeda",
  weight: "400",
  style: "normal",
  display: "swap",
});

const gilroyLight = localFont({
  src: "../public/fonts/Gilroy-Light.otf",
  variable: "--font-gilroy-light",
  weight: "300",
  style: "normal",
  display: "swap",
});

const russoOne = localFont({
  src: "../public/fonts/RussoOne-Regular.ttf",
  variable: "--font-russo-one",
  weight: "400",
  style: "normal",
  display: "swap",
});

const robotoFlex = localFont({
  src: "../public/fonts/robotoflex_regular.ttf",
  variable: "--font-roboto-flex",
  weight: "400",
  style: "normal",
  display: "swap",
});

const montserratBold = localFont({
  src: "../public/fonts/Montserrat-Bold.ttf",
  variable: "--font-montserrat-bold",
  weight: "700",
  style: "normal",
  display: "swap",
});

const montserratLight = localFont({
  src: "../public/fonts/Montserrat-Light.ttf",
  variable: "--font-montserrat-light",
  weight: "300",
  style: "normal",
  display: "swap",
});

const BASE_URL = "https://velesbron.ru";

export const metadata: Metadata = {
  title: {
    default: "Тактические ботинки VELESBRON — мембрана VELTEX™ и антипрокол",
    template: "%s — VELESBRON",
  },
  description:
    "VELESBRON — тактические ботинки из натуральных материалов: мембрана VELTEX™, антипрокольная защита K‑29, усиленная прошивка. Выберите модель и канал покупки.",
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "VELESBRON",
    locale: "ru_RU",
    url: BASE_URL,
    title: "Тактические ботинки VELESBRON — мембрана VELTEX™ и антипрокол",
    description:
      "VELESBRON — тактические ботинки из натуральных материалов: мембрана VELTEX™, антипрокольная защита K‑29, усиленная прошивка. Выберите модель и канал покупки.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "VELESBRON — тактические ботинки" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} ${drukCyr.variable} ${pobeda.variable} ${gilroyLight.variable} ${russoOne.variable} ${robotoFlex.variable} ${montserratBold.variable} ${montserratLight.variable} antialiased`}
      >
        <ClientErrorToServer />
        <MobileHeader />
        <div>{children}</div>
        <AnalyticsTracker />
        <CookieConsent />
      </body>
    </html>
  );
}
