import { readdir, stat } from "fs/promises";
import { join } from "path";

const CONTENT_DIR = join(process.cwd(), "content");

export type RecentItem = {
  path: string;
  mtime: Date;
  label: string;
  href: string;
};

export async function getRecentContent(limit = 10): Promise<RecentItem[]> {
  const items: { docPath: string; mtime: Date }[] = [];

  async function walk(dir: string, base = ""): Promise<void> {
    let names: { name: string; isFile: boolean }[];
    try {
      const entries = await readdir(dir, { withFileTypes: true });
      names = entries.map((d) => ({ name: d.name, isFile: d.isFile() }));
    } catch {
      return;
    }

    for (const e of names) {
      if (e.name.startsWith(".") || e.name === "node_modules") continue;

      const rel = base ? `${base}/${e.name}` : e.name;
      const full = join(dir, e.name);

      if (e.isFile) {
        if (!/\.(json|yaml|yml|mdoc|md)$/i.test(e.name)) continue;
        const s = await stat(full);
        const docPath = /^index\.(json|yaml|yml|mdoc|md)$/i.test(e.name)
          ? (base || e.name)
          : rel;
        items.push({ docPath, mtime: s.mtime });
      } else {
        await walk(full, rel);
      }
    }
  }

  await walk(CONTENT_DIR);

  const byDoc = new Map<string, Date>();
  for (const { docPath, mtime } of items) {
    const key = docPath.replace(/\/index\.(json|yaml|mdoc|md)$/i, "").replace(/\.(json|yaml|mdoc|md)$/i, "");
    const prev = byDoc.get(key);
    if (!prev || mtime > prev) byDoc.set(key, mtime);
  }

  const sorted = Array.from(byDoc.entries())
    .filter(([p]) => !p.includes(".gitkeep"))
    .sort((a, b) => b[1].getTime() - a[1].getTime())
    .slice(0, limit)
    .map(([path, mtime]) => ({ path, mtime }));

  return sorted.map(({ path, mtime }) => ({
    path,
    mtime,
    label: pathToLabel(path),
    href: pathToKeystaticHref(path),
  }));
}

function pathToLabel(path: string): string {
  const parts = path.split("/");
  if (parts[0] === "settings") {
    const map: Record<string, string> = {
      site: "Сайт",
      contacts: "Контакты",
      statistics: "Статистика",
    };
    return map[parts[1] ?? ""] ?? parts[1] ?? path;
  }
  if (parts[0] === "pages") {
    const map: Record<string, string> = {
      home: "Главная",
      faq: "FAQ",
      partnership: "Сотрудничество",
      production: "Производство",
      "where-to-buy": "Где купить",
    };
    return `Страница: ${map[parts[1] ?? ""] ?? parts[1] ?? path}`;
  }
  if (parts[0] === "products") return `Продукт: ${parts[1] ?? path}`;
  if (parts[0] === "where-to-buy") return `Где купить: ${parts[1] ?? path}`;
  return path;
}

function pathToKeystaticHref(path: string): string {
  const parts = path.split("/");
  if (parts[0] === "settings" && parts[1]) {
    const map: Record<string, string> = {
      site: "singleton/site",
      contacts: "singleton/contacts",
      statistics: "singleton/statistics",
    };
    return `/keystatic/${map[parts[1]] ?? "singleton/" + parts[1]}`;
  }
  if (parts[0] === "pages" && parts[1]) {
    const map: Record<string, string> = {
      home: "singleton/pageHome",
      faq: "singleton/pageFaq",
      partnership: "singleton/pagePartnership",
      production: "singleton/pageProduction",
      "where-to-buy": "singleton/pageWhereToBuy",
    };
    return `/keystatic/${map[parts[1]] ?? "singleton/page" + parts[1]}`;
  }
  if (parts[0] === "products" && parts[1]) return `/keystatic/collection/products/${parts[1]}`;
  if (parts[0] === "where-to-buy" && parts[1]) return `/keystatic/collection/whereToBuy/${parts[1]}`;
  return "/keystatic";
}
