import { NextRequest, NextResponse } from "next/server";
import { createSiteRegistration } from "@/lib/warranty";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await createSiteRegistration({
      code: body.code ?? "",
      phone: body.phone ?? "",
      firstName: body.firstName ?? "",
      lastName: body.lastName ?? "",
    });
    if (!result.ok) return NextResponse.json({ errors: result.errors }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
