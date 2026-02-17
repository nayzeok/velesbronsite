import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
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
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased`}
      >
        {children}
        <AnalyticsTracker />
      </body>
    </html>
  );
}
