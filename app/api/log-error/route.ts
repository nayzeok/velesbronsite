import { NextRequest, NextResponse } from "next/server";

/** Принимает ошибку с клиента и выводит в терминал сервера (для отладки с телефона). */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body?.message != null ? String(body.message) : "Unknown error";
    const stack = body?.stack != null ? String(body.stack) : "";
    const digest = body?.digest != null ? String(body.digest) : "";
    const page = body?.page != null ? String(body.page) : "";

    // eslint-disable-next-line no-console
    console.error(
      "\n========== CLIENT ERROR (см. ниже) ==========",
      page ? ` page=${page}` : "",
      "\nMessage:",
      message,
      digest ? `\nDigest: ${digest}` : "",
      stack ? `\nStack:\n${stack}` : "",
      "\n============================================\n"
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
