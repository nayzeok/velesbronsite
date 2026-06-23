import { NextRequest, NextResponse } from "next/server";
import { readRegistrations, createManagerRegistration } from "@/lib/warranty";

function getManagerName(request: NextRequest): string {
  const cookie = request.cookies.get("admin_session")?.value ?? "";
  const secret = process.env.ADMIN_SECRET ?? "velesbron-super-secret-key";
  if (cookie.startsWith(secret + ":")) {
    return cookie.split(":")[1] ?? "unknown";
  }
  return "admin";
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = 50;

    let list = await readRegistrations();

    if (search) {
      list = list.filter(
        (r) =>
          r.code.toLowerCase().includes(search) ||
          (r.phone ?? "").includes(search) ||
          (r.firstName ?? "").toLowerCase().includes(search) ||
          (r.lastName ?? "").toLowerCase().includes(search) ||
          (r.shop ?? "").toLowerCase().includes(search) ||
          (r.marketplace ?? "").toLowerCase().includes(search)
      );
    }

    const total = list.length;
    const items = list.slice().reverse().slice((page - 1) * limit, page * limit);

    return NextResponse.json({ items, total, page, limit });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await createManagerRegistration({
      code: body.code ?? "",
      shop: body.shop ?? "",
      marketplace: body.marketplace ?? "",
      purchaseDate: body.purchaseDate ?? "",
      firstName: body.firstName ?? "",
      rating: body.rating ? Number(body.rating) : undefined,
      note: body.note ?? "",
      addedBy: getManagerName(request),
    });
    if (!result.ok) return NextResponse.json({ errors: result.errors }, { status: 400 });
    return NextResponse.json({ ok: true, registration: result.registration });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
