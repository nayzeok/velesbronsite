import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

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

export const metadata: Metadata = {
  title: "VelesBron - Тактическая обувь из натуральных материалов",
  description: "Универсальная тактическая обувь для службы, походов и города. Натуральные материалы, усиленный протектор, надёжная конструкция.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} ${drukCyr.variable} ${pobeda.variable} antialiased`}
      >
        {children}
        <AnalyticsTracker />
      </body>
    </html>
  );
}
