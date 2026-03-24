"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { useEffect, useState } from "react";

type MarketplaceClick = { id: string; name: string; platform?: string; count: number };
type PageView = {
  path: string;
  title?: string;
  totalSeconds: number;
  visits: number;
  avgSeconds: number;
};
type DeviceStat = { device: string; count: number };
type CountryStat = { country: string; count: number };

const BAR_COLORS = [
  "hsl(158, 42%, 42%)",
  "hsl(158, 38%, 48%)",
  "hsl(158, 35%, 54%)",
  "hsl(158, 32%, 60%)",
  "hsl(158, 28%, 68%)",
];

const emptyState = (
  <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-700/50 bg-white dark:bg-zinc-900/30 p-12 text-center shadow-sm">
    <div className="mx-auto w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-4">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    </div>
    <p className="text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed">
      Пока нет данных. Переходы на площадки и время на страницах начнут
      записываться, когда пользователи начнут пользоваться сайтом.
    </p>
    <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-3">
      Клики по ссылкам «Где купить» и время на каждой странице отправляются в аналитику автоматически.
    </p>
  </div>
);

function TooltipContent(props: {
  active?: boolean;
  payload?: readonly { payload: Record<string, unknown> }[];
  label?: string | number;
  valueLabel: string;
  formatValue: (p: Record<string, unknown>) => string;
}) {
  const { active, payload, label, valueLabel, formatValue } = props;
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-600/50 shadow-lg shadow-zinc-200/50 dark:shadow-black/20 text-sm">
      <p className="font-medium text-zinc-900 dark:text-zinc-100">{String(label ?? "")}</p>
      <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">
        {valueLabel}: {formatValue(p)}
      </p>
    </div>
  );
}

export function AnalyticsDashboard() {
  const [range, setRange] = useState<"all" | "7d" | "30d">("30d");
  const [data, setData] = useState<{
    marketplaceClicks: MarketplaceClick[];
    pageViews: PageView[];
    devices: DeviceStat[];
    countries: CountryStat[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (range !== "all") params.set("range", range);

    fetch("/api/analytics/summary" + (params.toString() ? `?${params.toString()}` : ""), {
      cache: "no-store",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed");
        const json = await res.json();
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setError("Не удалось загрузить данные");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [range]);

  const marketplaceClicks = data?.marketplaceClicks ?? [];
  const pageViews = data?.pageViews ?? [];
  const devices = data?.devices ?? [];
  const countries = data?.countries ?? [];
  const hasClicks = marketplaceClicks.length > 0;
  const hasPages = pageViews.length > 0;
  const hasDevices = devices.length > 0;
  const hasCountries = countries.length > 0;
  const nothingToShow = !hasClicks && !hasPages && !hasDevices && !hasCountries;

  const deviceLabel: Record<string, string> = { mobile: "Мобильный", tablet: "Планшет", desktop: "Десктоп" };
  const deviceTotal = devices.reduce((s, d) => s + d.count, 0);

  if (!loading && !error && nothingToShow) {
    return emptyState;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-end mb-2">
        <div className="inline-flex rounded-full bg-zinc-100/80 dark:bg-zinc-800/60 p-1 text-xs sm:text-sm">
          {[
            { id: "all" as const, label: "За всё время" },
            { id: "7d" as const, label: "7 дней" },
            { id: "30d" as const, label: "30 дней" },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setRange(opt.id)}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                range === opt.id
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {loading && !data && (
        <div className="rounded-2xl border border-dashed border-zinc-200/80 dark:border-zinc-700/60 bg-white/40 dark:bg-zinc-900/20 p-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Обновляем данные за выбранный период…
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200/80 dark:border-red-700/60 bg-red-50/80 dark:bg-red-900/20 p-4 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {hasClicks && (
        <section className="rounded-2xl border border-zinc-200/80 dark:border-zinc-700/50 bg-white dark:bg-zinc-900/30 p-6 sm:p-8 shadow-sm">
          <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-6">
            Переходы на площадки
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 -mt-4 mb-6">
            Клики по ссылкам «Где купить»
          </p>
          <div className="min-h-[220px] w-full" style={{ height: Math.max(220, marketplaceClicks.length * 44) }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={marketplaceClicks.map((m) => ({
                  name: m.name,
                  count: m.count,
                  platform: m.platform ?? "",
                }))}
                margin={{ top: 8, right: 48, left: 8, bottom: 8 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  className="stroke-zinc-200/80 dark:stroke-zinc-700/60"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  dataKey="count"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  className="text-zinc-500 dark:text-zinc-400"
                  width={36}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 13, fill: "currentColor" }}
                  tickLine={false}
                  axisLine={false}
                  width={120}
                  className="text-zinc-600 dark:text-zinc-300"
                  tickMargin={8}
                />
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                  content={(tooltipProps) => (
                    <TooltipContent
                      {...tooltipProps}
                      valueLabel="Переходов"
                      formatValue={(p) => String(p.count ?? 0)}
                    />
                  )}
                  formatter={(value) => [value ?? 0, ""]}
                  labelFormatter={(label, payload) =>
                    payload?.[0]?.payload?.platform
                      ? `${label} (${payload[0].payload.platform})`
                      : label
                  }
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={28} minPointSize={8}>
                  <LabelList
                    dataKey="count"
                    position="right"
                    className="text-zinc-500 dark:text-zinc-400"
                    style={{ fontSize: 12 }}
                    offset={6}
                  />
                  {marketplaceClicks.map((_, i) => (
                    <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {hasPages && (
        <section className="rounded-2xl border border-zinc-200/80 dark:border-zinc-700/50 bg-white dark:bg-zinc-900/30 p-6 sm:p-8 shadow-sm">
          <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-6">
            Время на страницах
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 -mt-4 mb-6">
            Дольше всего смотрят
          </p>
          <div className="min-h-[220px] w-full" style={{ height: Math.max(220, pageViews.length * 44) }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={pageViews.map((p) => ({
                  name: p.path === "/" ? "Главная" : p.path.replace(/^\//, "").replace(/-/g, " ") || "Главная",
                  seconds: p.avgSeconds,
                  visits: p.visits,
                  total: p.totalSeconds,
                }))}
                margin={{ top: 8, right: 56, left: 8, bottom: 8 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  className="stroke-zinc-200/80 dark:stroke-zinc-700/60"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  dataKey="seconds"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v} с`}
                  className="text-zinc-500 dark:text-zinc-400"
                  width={40}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 13, fill: "currentColor" }}
                  tickLine={false}
                  axisLine={false}
                  width={140}
                  className="text-zinc-600 dark:text-zinc-300"
                  tickMargin={8}
                />
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                  content={(tooltipProps) => (
                    <TooltipContent
                      {...tooltipProps}
                      valueLabel="Среднее время"
                      formatValue={(p) =>
                        `${p.seconds ?? 0} с (визитов: ${p.visits ?? 0})`
                      }
                    />
                  )}
                  formatter={(value, _name, item) => [
                    `${value ?? 0} с (визитов: ${(item.payload as { visits?: number }).visits ?? 0})`,
                    "",
                  ]}
                />
                <Bar dataKey="seconds" radius={[0, 8, 8, 0]} barSize={28} minPointSize={8}>
                  <LabelList
                    dataKey="seconds"
                    position="right"
                    formatter={(v) => (typeof v === "number" ? `${v} с` : "")}
                    className="text-zinc-500 dark:text-zinc-400"
                    style={{ fontSize: 12 }}
                    offset={6}
                  />
                  {pageViews.map((_, i) => (
                    <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* Устройства + Страны */}
      {hasDevices && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <section className="rounded-2xl border border-zinc-200/80 dark:border-zinc-700/50 bg-white dark:bg-zinc-900/30 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Устройства</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">С чего заходят</p>
            <div className="space-y-3">
              {devices.map((d) => {
                const pct = deviceTotal > 0 ? Math.round((d.count / deviceTotal) * 100) : 0;
                return (
                  <div key={d.device}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-700 dark:text-zinc-300">{deviceLabel[d.device] ?? d.device}</span>
                      <span className="text-zinc-500 dark:text-zinc-400">{d.count} <span className="text-zinc-400">({pct}%)</span></span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {hasCountries && (
            <section className="rounded-2xl border border-zinc-200/80 dark:border-zinc-700/50 bg-white dark:bg-zinc-900/30 p-6 shadow-sm">
              <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-1">География</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">Топ стран</p>
              <div className="space-y-2.5">
                {countries.map((c) => (
                  <div key={c.country} className="flex items-center justify-between text-sm">
                    <span className="text-zinc-700 dark:text-zinc-300">{c.country}</span>
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">{c.count}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
