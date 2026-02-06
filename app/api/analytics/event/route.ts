import { NextRequest, NextResponse } from "next/server";
import { appendEvent } from "@/lib/analytics";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.type === "marketplace_click") {
      await appendEvent({
        type: "marketplace_click",
        payload: {
          marketplaceId: String(body.payload?.marketplaceId ?? ""),
          marketplaceName: String(body.payload?.marketplaceName ?? ""),
          platform: body.payload?.platform != null ? String(body.payload.platform) : undefined,
          productId: body.payload?.productId != null ? String(body.payload.productId) : undefined,
          productName: body.payload?.productName != null ? String(body.payload.productName) : undefined,
          page: body.payload?.page != null ? String(body.payload.page) : undefined,
        },
      });
      return NextResponse.json({ ok: true });
    }

    if (body.type === "page_view") {
      await appendEvent({
        type: "page_view",
        payload: {
          path: String(body.payload?.path ?? ""),
          title: body.payload?.title != null ? String(body.payload.title) : undefined,
          durationSeconds: Number(body.payload?.durationSeconds) || 0,
        },
      });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown event type" }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
