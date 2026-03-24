import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data", "analytics");
const EVENTS_FILE = join(DATA_DIR, "events.ndjson");

export type DeviceType = "mobile" | "tablet" | "desktop";

export type AnalyticsEvent =
  | {
      type: "marketplace_click";
      payload: {
        marketplaceId: string;
        marketplaceName: string;
        platform?: string;
        productId?: string;
        productName?: string;
        page?: string;
        device?: DeviceType;
        country?: string;
        city?: string;
      };
      timestamp: string;
    }
  | {
      type: "page_view";
      payload: {
        path: string;
        title?: string;
        durationSeconds: number;
        device?: DeviceType;
        country?: string;
        city?: string;
      };
      timestamp: string;
    };

export async function appendEvent(event: Omit<AnalyticsEvent, "timestamp">): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const line = JSON.stringify({ ...event, timestamp: new Date().toISOString() }) + "\n";
  await writeFile(EVENTS_FILE, line, { flag: "a" });
}

export async function readEvents(): Promise<AnalyticsEvent[]> {
  try {
    const content = await readFile(EVENTS_FILE, "utf-8");
    return content
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as AnalyticsEvent);
  } catch {
    return [];
  }
}

export type AnalyticsSummary = {
  marketplaceClicks: { id: string; name: string; platform?: string; count: number }[];
  pageViews: { path: string; title?: string; totalSeconds: number; visits: number; avgSeconds: number }[];
  devices: { device: DeviceType; count: number }[];
  countries: { country: string; count: number }[];
};

export async function getSummary(opts?: { from?: Date; to?: Date }): Promise<AnalyticsSummary> {
  const events = await readEvents();

  const filtered = opts?.from || opts?.to
    ? events.filter((e) => {
        const ts = new Date(e.timestamp).getTime();
        if (opts.from && ts < opts.from.getTime()) return false;
        if (opts.to && ts > opts.to.getTime()) return false;
        return true;
      })
    : events;

  // Маркетплейс клики
  const marketplaceMap = new Map<string, { name: string; platform?: string; count: number }>();
  for (const e of filtered) {
    if (e.type === "marketplace_click") {
      const key = e.payload.marketplaceId;
      const cur = marketplaceMap.get(key) ?? { name: e.payload.marketplaceName, platform: e.payload.platform, count: 0 };
      cur.count += 1;
      marketplaceMap.set(key, cur);
    }
  }
  const marketplaceClicks = Array.from(marketplaceMap.entries())
    .map(([id, v]) => ({ id, name: v.name, platform: v.platform, count: v.count }))
    .sort((a, b) => b.count - a.count);

  // Просмотры страниц
  const pageMap = new Map<string, { title?: string; totalSeconds: number; visits: number }>();
  for (const e of filtered) {
    if (e.type === "page_view") {
      const key = e.payload.path;
      const cur = pageMap.get(key) ?? { title: e.payload.title, totalSeconds: 0, visits: 0 };
      cur.totalSeconds += e.payload.durationSeconds;
      cur.visits += 1;
      pageMap.set(key, cur);
    }
  }
  const pageViews = Array.from(pageMap.entries())
    .map(([path, v]) => ({ path, title: v.title, totalSeconds: v.totalSeconds, visits: v.visits, avgSeconds: v.visits > 0 ? Math.round(v.totalSeconds / v.visits) : 0 }))
    .sort((a, b) => b.totalSeconds - a.totalSeconds);

  // Устройства
  const deviceMap = new Map<string, number>();
  for (const e of filtered) {
    const d = e.payload.device;
    if (d) deviceMap.set(d, (deviceMap.get(d) ?? 0) + 1);
  }
  const devices = Array.from(deviceMap.entries())
    .map(([device, count]) => ({ device: device as DeviceType, count }))
    .sort((a, b) => b.count - a.count);

  // Страны
  const countryMap = new Map<string, number>();
  for (const e of filtered) {
    const c = e.payload.country;
    if (c) countryMap.set(c, (countryMap.get(c) ?? 0) + 1);
  }
  const countries = Array.from(countryMap.entries())
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return { marketplaceClicks, pageViews, devices, countries };
}
