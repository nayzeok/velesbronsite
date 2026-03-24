"use client";

import { useEffect, useState } from "react";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";

type Summary = {
  marketplaceClicks: { id: string; name: string; platform?: string; count: number }[];
  pageViews: { path: string; title?: string; totalSeconds: number; visits: number; avgSeconds: number }[];
};

function StatCard({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm flex items-center gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-50 text-zinc-500">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-zinc-500 mb-0.5">{label}</p>
        <p className="text-2xl font-bold text-zinc-900 leading-none">{value}</p>
        {sub && <p className="text-xs text-zinc-400 mt-1 truncate">{sub}</p>}
      </div>
    </div>
  );
}

function formatPath(path: string) {
  if (path === "/") return "Главная";
  return path.replace(/^\//, "").replace(/-/g, " ");
}

export default function AdminAnalyticsPage() {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    fetch("/api/analytics/summary", { cache: "no-store" })
      .then((r) => r.json())
      .then(setSummary)
      .catch(() => {});
  }, []);

  const totalClicks = summary?.marketplaceClicks.reduce((s, m) => s + m.count, 0) ?? 0;
  const totalVisits = summary?.pageViews.reduce((s, p) => s + p.visits, 0) ?? 0;
  const topPage = summary?.pageViews[0];
  const topMarketplace = summary?.marketplaceClicks[0];

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Шапка */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-1">VELESBRON</p>
            <h1 className="text-2xl font-bold text-zinc-900">Дашборд</h1>
          </div>
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              window.location.href = "/admin/login";
            }}
            className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-red-500 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Выйти
          </button>
        </div>

        {/* Карточки метрик */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatCard
            label="Переходов на площадки"
            value={totalClicks}
            sub="за всё время"
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            }
          />
          <StatCard
            label="Визитов на страницы"
            value={totalVisits}
            sub="за всё время"
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />
          <StatCard
            label="Топ страница"
            value={topPage ? formatPath(topPage.path) : "—"}
            sub={topPage ? `${topPage.visits} визитов` : undefined}
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            }
          />
          <StatCard
            label="Топ площадка"
            value={topMarketplace ? topMarketplace.name : "—"}
            sub={topMarketplace ? `${topMarketplace.count} кликов` : undefined}
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
            }
          />
        </div>

        {/* Графики */}
        <AnalyticsDashboard />
      </div>
    </main>
  );
}
