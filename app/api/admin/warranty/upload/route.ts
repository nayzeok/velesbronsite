import { NextRequest, NextResponse } from "next/server";
import { importCodes } from "@/lib/warranty";

function parseCSV(text: string): { code: string; model: string; batch: string }[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return [];

  // Определяем есть ли заголовок
  const firstLower = lines[0].toLowerCase();
  const hasHeader = firstLower.includes("code") || firstLower.includes("код");
  const dataLines = hasHeader ? lines.slice(1) : lines;

  return dataLines.map((line) => {
    const cols = line.split(/[,;	]/).map((c) => c.trim().replace(/^["']|["']$/g, ""));
    return {
      code: cols[0] ?? "",
      model: cols[1] ?? "",
      batch: cols[2] ?? "",
    };
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Файл не передан" }, { status: 400 });
    }

    const text = await file.text();
    const rows = parseCSV(text);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Файл пустой или не удалось распарсить" }, { status: 400 });
    }

    const result = await importCodes(rows);
    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка при загрузке" }, { status: 500 });
  }
}
