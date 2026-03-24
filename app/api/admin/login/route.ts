import { NextResponse } from "next/server";

const ADMIN_COOKIE = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 дней

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { user, password } = body as { user?: string; password?: string };

  const adminUser = process.env.ADMIN_USER ?? "admin";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "velesbron2025";
  const secret = process.env.ADMIN_SECRET ?? "velesbron-super-secret-key";

  if (user !== adminUser || password !== adminPassword) {
    return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return response;
}
