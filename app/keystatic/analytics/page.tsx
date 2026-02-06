import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";

export const metadata = {
  title: "Аналитика — Админка VelesBron",
  description: "Активность пользователей: переходы на площадки, время на страницах",
};

export default async function KeystaticAnalyticsPage() {
  return (
    <main className="flex-1 min-h-0 overflow-auto bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Аналитика</h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
            Переходы на площадки, время на страницах
          </p>
        </div>
        <AnalyticsDashboard />
      </div>
    </main>
  );
}
