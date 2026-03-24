import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "admin_session";

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function middleware(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  const url = `${pathname}${search}`;

  // Защита /admin/* — кроме страницы логина
  const isProtected =
    pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  if (isProtected) {
    const cookie = request.cookies.get(ADMIN_COOKIE)?.value ?? "";
    const secret = process.env.ADMIN_SECRET ?? "velesbron-super-secret-key";
    if (cookie !== secret) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();
  response.headers.set("x-request-id", requestId);

  if (process.env.NODE_ENV !== "production") {
    const durationMs = Date.now() - startedAt;
    const ip = getClientIp(request);
    const userAgent = request.headers.get("user-agent") ?? "unknown";
    console.log(
      `[REQ] id=${requestId} method=${request.method} url="${url}" ip=${ip} ua="${userAgent}" durationMs=${durationMs}`
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)$).*)",
  ],
};
