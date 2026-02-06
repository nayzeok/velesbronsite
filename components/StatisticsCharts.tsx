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
} from "recharts";

type StatItem = { label: string; value: string };

const COLORS = ["#2d5a27", "#4a7c43", "#6b9b63", "#8fbc89", "#b5d9b0"];

/** Извлекает число из значения типа "10+", "500+", "99%" для графика */
function parseValueForChart(value: string): number {
  const num = parseFloat(value.replace(/[^\d.,]/g, "").replace(",", "."));
  return Number.isFinite(num) ? num : 0;
}

export function StatisticsCharts({
  displayStats = [],
}: {
  displayStats: StatItem[];
}) {
  if (displayStats.length === 0) {
    return (
      <p className="text-center text-zinc-500 py-12">
        Добавьте показатели в админке (Статистика → Показатели на сайте).
      </p>
    );
  }

  const chartData = displayStats.map((item) => ({
    name: item.label,
    value: parseValueForChart(item.value),
    fullValue: item.value,
  }));

  return (
    <div className="space-y-10">
      {/* Карточки с цифрами */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayStats.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="text-3xl sm:text-4xl font-bold text-[#2d5a27] dark:text-[#8fbc89] tabular-nums"
              style={{
                color: COLORS[Math.min(i, COLORS.length - 1)],
              }}
            >
              {item.value}
            </div>
            <div className="mt-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Столбчатая диаграмма */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-6">
          Сравнение показателей
        </h3>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 12, right: 12, left: 0, bottom: 8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="text-zinc-200 dark:text-zinc-700"
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                className="text-zinc-600 dark:text-zinc-400"
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                className="text-zinc-600 dark:text-zinc-400"
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--background)",
                }}
                formatter={(_, __, item) => [
                  (item.payload as { fullValue: string }).fullValue,
                  (item.payload as { name: string }).name,
                ]}
              />
              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
                maxBarSize={56}
                label={false}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    className="opacity-90 hover:opacity-100"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
