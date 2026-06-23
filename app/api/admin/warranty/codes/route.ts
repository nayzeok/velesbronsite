import { NextRequest, NextResponse } from "next/server";
import { readCodes } from "@/lib/warranty";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // "unused" | "activated" | null
    const batch = searchParams.get("batch");
    const search = searchParams.get("search")?.toLowerCase();
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = 50;

    let codes = await readCodes();

    if (status === "unused" || status === "activated") {
      codes = codes.filter((c) => c.status === status);
    }
    if (batch) {
      codes = codes.filter((c) => c.batch === batch);
    }
    if (search) {
      codes = codes.filter(
        (c) =>
          c.code.toLowerCase().includes(search) ||
          c.model.toLowerCase().includes(search) ||
          (c.activatedBy?.email ?? "").toLowerCase().includes(search)
      );
    }

    const total = codes.length;
    const slice = codes
      .slice()
      .reverse()
      .slice((page - 1) * limit, page * limit);

    const batches = [...new Set((await readCodes()).map((c) => c.batch).filter(Boolean))];

    return NextResponse.json({ codes: slice, total, page, limit, batches });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
