import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import Link from "next/link";

export const metadata = {
  title: "Статистика сайта — VelesBron",
  description: "Активность пользователей: переходы на площадки, время на страницах",
};

export default async function AdminAnalyticsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/keystatic"
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-400 mb-2 inline-block"
            >
              ← Админка
            </Link>
            <h1 className="text-2xl font-bold">Статистика сайта</h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
              Активность пользователей: переходы на площадки, время на страницах
            </p>
          </div>
        </div>
        <AnalyticsDashboard />
      </div>
    </main>
  );
}
