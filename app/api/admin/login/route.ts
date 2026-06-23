import { NextResponse } from "next/server";

const ADMIN_COOKIE = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

type Account = { user: string; password: string; role: "admin" | "manager" };

function getAccounts(): Account[] {
  const accounts: Account[] = [
    {
      user: process.env.ADMIN_USER ?? "admin",
      password: process.env.ADMIN_PASSWORD ?? "velesbron2025",
      role: "admin",
    },
  ];
  if (process.env.MANAGER_1_USER) {
    accounts.push({ user: process.env.MANAGER_1_USER, password: process.env.MANAGER_1_PASSWORD ?? "", role: "manager" });
  }
  if (process.env.MANAGER_2_USER) {
    accounts.push({ user: process.env.MANAGER_2_USER, password: process.env.MANAGER_2_PASSWORD ?? "", role: "manager" });
  }
  return accounts;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { user, password } = body as { user?: string; password?: string };

  const secret = process.env.ADMIN_SECRET ?? "velesbron-super-secret-key";
  const accounts = getAccounts();
  const match = accounts.find((a) => a.user === user && a.password === password);

  if (!match) {
    return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
  }

  // Формат куки: secret:username:role
  const cookieValue = `${secret}:${match.user}:${match.role}`;
  const response = NextResponse.json({ ok: true, role: match.role });
  response.cookies.set(ADMIN_COOKIE, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return response;
}
