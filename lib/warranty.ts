import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data", "warranty");
const CODES_FILE = join(DATA_DIR, "codes.json");

export type WarrantyCode = {
  code: string;
  model: string;
  batch: string;
  status: "unused" | "activated";
  activatedAt: string | null;
  activatedBy: {
    name: string;
    email: string;
    phone: string;
    purchasedAt: string;
    shop: string;
  } | null;
  createdAt: string;
};

async function ensureFile(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(CODES_FILE);
  } catch {
    await writeFile(CODES_FILE, "[]", "utf-8");
  }
}

export async function readCodes(): Promise<WarrantyCode[]> {
  await ensureFile();
  const raw = await readFile(CODES_FILE, "utf-8");
  return JSON.parse(raw) as WarrantyCode[];
}

async function writeCodes(codes: WarrantyCode[]): Promise<void> {
  await ensureFile();
  await writeFile(CODES_FILE, JSON.stringify(codes, null, 2), "utf-8");
}

export async function importCodes(
  rows: { code: string; model: string; batch: string }[]
): Promise<{ added: number; skipped: number }> {
  const existing = await readCodes();
  const existingSet = new Set(existing.map((c) => c.code));

  const now = new Date().toISOString();
  let added = 0;
  let skipped = 0;

  for (const row of rows) {
    const code = row.code.trim().toUpperCase();
    if (!code || existingSet.has(code)) {
      skipped++;
      continue;
    }
    existing.push({
      code,
      model: row.model?.trim() ?? "",
      batch: row.batch?.trim() ?? "",
      status: "unused",
      activatedAt: null,
      activatedBy: null,
      createdAt: now,
    });
    existingSet.add(code);
    added++;
  }

  await writeCodes(existing);
  return { added, skipped };
}

export async function activateCode(
  code: string,
  by: NonNullable<WarrantyCode["activatedBy"]>
): Promise<{ ok: boolean; error?: string }> {
  const codes = await readCodes();
  const idx = codes.findIndex((c) => c.code === code.trim().toUpperCase());

  if (idx === -1) return { ok: false, error: "Код не найден" };
  if (codes[idx].status === "activated") return { ok: false, error: "Код уже активирован" };

  codes[idx].status = "activated";
  codes[idx].activatedAt = new Date().toISOString();
  codes[idx].activatedBy = by;

  await writeCodes(codes);
  return { ok: true };
}
