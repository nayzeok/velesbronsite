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

  // В проекте нет Server Actions ("use server") — любой запрос с этим
  // заголовком гарантированно мусор от сканеров, отсекаем его сразу,
  // не давая Next.js тратить время на поиск несуществующего action.
  if (request.headers.has("next-action")) {
    return new NextResponse(null, { status: 400 });
  }

  // Защита /admin/* — кроме страницы логина
  const isProtected =
    pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  if (isProtected) {
    const cookie = request.cookies.get(ADMIN_COOKIE)?.value ?? "";
    const secret = process.env.ADMIN_SECRET ?? "velesbron-super-secret-key";

    // Новый формат: secret:username:role
    // Старый формат (обратная совместимость): просто secret
    let role: "admin" | "manager" | null = null;
    if (cookie === secret) {
      role = "admin"; // старая кука — считаем админом
    } else if (cookie.startsWith(secret + ":")) {
      const parts = cookie.split(":");
      if (parts[2] === "admin" || parts[2] === "manager") {
        role = parts[2] as "admin" | "manager";
      }
    }

    if (!role) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }

    // Менеджер может только /admin/warranty и /api/admin/warranty
    const managerAllowed =
      pathname.startsWith("/admin/warranty") ||
      pathname.startsWith("/api/admin/warranty");
    if (role === "manager" && !managerAllowed) {
      const warrantyUrl = request.nextUrl.clone();
      warrantyUrl.pathname = "/admin/warranty";
      return NextResponse.redirect(warrantyUrl);
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
