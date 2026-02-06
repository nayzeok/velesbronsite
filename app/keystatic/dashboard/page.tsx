import { getRecentContent } from "@/lib/recent-content";
import { getSummary } from "@/lib/analytics";
import Link from "next/link";

export const metadata = {
  title: "Дашборд — Админка VelesBron",
  description: "Обзор контента и аналитики",
};

export default async function DashboardPage() {
  const [recent, summary] = await Promise.all([
    getRecentContent(8),
    getSummary({
      from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      to: new Date(),
    }),
  ]);

  const topMarketplaces = summary.marketplaceClicks.slice(0, 3);
  const topPages = summary.pageViews.slice(0, 3);
  const totalClicks = summary.marketplaceClicks.reduce((s, m) => s + m.count, 0);
  const totalVisits = summary.pageViews.reduce((s, p) => s + p.visits, 0);

  function formatDate(d: Date) {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  }

  return (
    <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Приветствие */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Добро пожаловать в админку
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Управление контентом, продуктами и просмотр аналитики
          </p>
        </div>

        {/* Метрики за 7 дней */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 p-5 shadow-sm">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Переходы на площадки</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50 tabular-nums">
              {totalClicks}
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">за последние 7 дней</p>
          </div>
          <div className="rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 p-5 shadow-sm">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Просмотры страниц</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50 tabular-nums">
              {totalVisits}
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">визитов за 7 дней</p>
          </div>
        </div>

        {/* Быстрые действия */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
            Быстрые действия
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/keystatic/collection"
              className="group rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
            >
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors text-xl">
                ✏️
              </span>
              <span className="mt-4 block font-semibold text-zinc-900 dark:text-zinc-100">
                Редактор контента
              </span>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Сайт, продукты, страницы, контакты
              </p>
            </Link>
            <Link
              href="/keystatic/analytics"
              className="group rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
            >
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors text-xl">
                📊
              </span>
              <span className="mt-4 block font-semibold text-zinc-900 dark:text-zinc-100">
                Аналитика
              </span>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Графики и отчёты по активности
              </p>
            </Link>
            <Link
              href="/keystatic/collection/products"
              className="group rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
            >
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors text-xl">
                🛍️
              </span>
              <span className="mt-4 block font-semibold text-zinc-900 dark:text-zinc-100">
                Добавить продукт
              </span>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Новая запись в каталоге
              </p>
            </Link>
          </div>
        </section>

        {/* Две колонки: последние изменения и мини-аналитика */}
        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
              Последние изменения
            </h2>
            {recent.length === 0 ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 py-4">
                Пока нет изменений в контенте
              </p>
            ) : (
              <ul className="space-y-1">
                {recent.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between gap-3 py-2.5 px-3 -mx-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-sm transition-colors"
                    >
                      <span className="font-medium text-zinc-800 dark:text-zinc-200 truncate">
                        {item.label}
                      </span>
                      <time className="text-zinc-400 dark:text-zinc-500 text-xs shrink-0">
                        {formatDate(item.mtime)}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
              Аналитика за 7 дней
            </h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-4">Топ переходов и страниц</p>
            <div className="space-y-5">
              <div>
                <h3 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                  Переходы на площадки
                </h3>
                {topMarketplaces.length === 0 ? (
                  <p className="text-sm text-zinc-500">Нет данных</p>
                ) : (
                  <ul className="space-y-2">
                    {topMarketplaces.map((m) => (
                      <li
                        key={m.id}
                        className="flex items-center justify-between text-sm py-1.5 px-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50"
                      >
                        <span className="text-zinc-700 dark:text-zinc-300">{m.name}</span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
                          {m.count}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                  Время на страницах
                </h3>
                {topPages.length === 0 ? (
                  <p className="text-sm text-zinc-500">Нет данных</p>
                ) : (
                  <ul className="space-y-2">
                    {topPages.map((p) => (
                      <li
                        key={p.path}
                        className="flex items-center justify-between text-sm py-1.5 px-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50"
                      >
                        <span className="text-zinc-700 dark:text-zinc-300 truncate mr-2">
                          {p.path === "/" ? "Главная" : p.path.replace(/^\//, "")}
                        </span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 shrink-0 tabular-nums">
                          {p.avgSeconds} с
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Link
                href="/keystatic/analytics"
                className="inline-flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Открыть полную аналитику
                <span className="ml-1.5">→</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
