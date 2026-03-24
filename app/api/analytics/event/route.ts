import { NextRequest, NextResponse } from "next/server";
import { appendEvent, type DeviceType } from "@/lib/analytics";

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "";
  return request.headers.get("x-real-ip") ?? "";
}

function getGeo(ip: string): { country?: string; city?: string } {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const geoip = require("geoip-lite") as {
      lookup: (ip: string) => { country?: string; city?: string } | null;
    };
    const geo = geoip.lookup(ip);
    return { country: geo?.country ?? undefined, city: geo?.city ?? undefined };
  } catch {
    return {};
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ip = getClientIp(request);
    const geo = ip ? getGeo(ip) : {};
    const device = body.payload?.device as DeviceType | undefined;

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
          device,
          ...geo,
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
          device,
          ...geo,
        },
      });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown event type" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
