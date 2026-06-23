import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get("admin_session")?.value ?? "";
  const secret = process.env.ADMIN_SECRET ?? "velesbron-super-secret-key";

  if (cookie === secret) return NextResponse.json({ user: "admin", role: "admin" });

  if (cookie.startsWith(secret + ":")) {
    const parts = cookie.split(":");
    return NextResponse.json({ user: parts[1] ?? "", role: parts[2] ?? "" });
  }

  return NextResponse.json({ user: "", role: "" });
}
