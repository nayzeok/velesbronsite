import { reader } from "@/lib/keystatic";
import { StatisticsCharts } from "@/components/StatisticsCharts";

export const metadata = {
  title: "Статистика — VelesBron",
  description: "Показатели и статистика VelesBron",
};

export default async function StatisticsPage() {
  const statistics = await reader.singletons.statistics.read();

  const displayStats =
    statistics?.displayStats?.map((item) => ({
      label: item.label ?? "",
      value: item.value ?? "",
    })) ?? [];

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">
        Статистика
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-10">
        Показатели из раздела «Статистика» в админке.
      </p>
      <StatisticsCharts displayStats={displayStats} />
    </main>
  );
}
