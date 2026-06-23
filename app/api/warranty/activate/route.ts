import { NextRequest, NextResponse } from "next/server";
import { activateCode } from "@/lib/warranty";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const code = (body.code ?? "").trim();
    const phone = (body.phone ?? "").trim();

    if (!code) return NextResponse.json({ error: "Введите код" }, { status: 400 });
    if (!phone) return NextResponse.json({ error: "Введите телефон" }, { status: 400 });

    const firstName = (body.firstName ?? "").trim();
    const lastName = (body.lastName ?? "").trim();
    const fullName = [firstName, lastName].filter(Boolean).join(" ");

    const result = await activateCode(code, {
      name: fullName,
      email: "",
      phone,
      purchasedAt: "",
      shop: "",
    });

    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
