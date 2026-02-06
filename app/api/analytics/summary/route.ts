import { NextRequest, NextResponse } from "next/server";
import { getSummary } from "@/lib/analytics";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const range = url.searchParams.get("range");
  const fromParam = url.searchParams.get("from");
  const toParam = url.searchParams.get("to");

  let from: Date | undefined;
  let to: Date | undefined;

  if (range === "7d" || range === "30d") {
    const days = range === "7d" ? 7 : 30;
    to = new Date();
    from = new Date(to.getTime() - days * 24 * 60 * 60 * 1000);
  } else {
    if (fromParam) {
      const d = new Date(fromParam);
      if (!isNaN(d.getTime())) from = d;
    }
    if (toParam) {
      const d = new Date(toParam);
      if (!isNaN(d.getTime())) to = d;
    }
  }

  const summary = await getSummary({ from, to });
  return NextResponse.json(summary);
}
