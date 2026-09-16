import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { saveContactMessage } from "@/lib/contact";
import { isRateLimited } from "@/lib/rateLimit";

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024; // 10 МБ
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 час

// Разрешаем только безопасные типы вложений — фото и документы
const ALLOWED_ATTACHMENT_EXTENSIONS = [
  ".jpg", ".jpeg", ".png", ".webp", ".heic", ".gif",
  ".pdf", ".doc", ".docx",
];

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(`contact:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
      return NextResponse.json(
        { error: "Слишком много попыток. Попробуйте через час." },
        { status: 429 }
      );
    }

    const formData = await request.formData();

    // Honeypot: скрытое поле, которое настоящие пользователи не видят и не заполняют.
    // Если оно заполнено — это бот, тихо отвечаем "ок", ничего не отправляя и не сохраняя.
    const honeypot = String(formData.get("website") ?? "").trim();
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const attachment = formData.get("attachment");

    const errors: { field: string; message: string }[] = [];
    if (!name) errors.push({ field: "name", message: "Введите имя" });
    if (!phone) errors.push({ field: "phone", message: "Введите телефон" });
    else if (phone.replace(/\D/g, "").length !== 11) errors.push({ field: "phone", message: "Введите телефон полностью" });
    if (!message) errors.push({ field: "message", message: "Введите сообщение" });

    let attachmentFile: File | null = null;
    if (attachment instanceof File && attachment.size > 0) {
      const ext = attachment.name.slice(attachment.name.lastIndexOf(".")).toLowerCase();
      if (attachment.size > MAX_ATTACHMENT_BYTES) {
        errors.push({ field: "attachment", message: "Файл слишком большой (максимум 10 МБ)" });
      } else if (!ALLOWED_ATTACHMENT_EXTENSIONS.includes(ext)) {
        errors.push({ field: "attachment", message: "Недопустимый тип файла. Разрешены изображения, PDF и документы Word" });
      } else {
        attachmentFile = attachment;
      }
    }

    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    let emailSent = false;
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const attachments = attachmentFile
        ? [
            {
              filename: attachmentFile.name,
              content: Buffer.from(await attachmentFile.arrayBuffer()),
            },
          ]
        : undefined;

      const result = await resend.emails.send({
        from: `VELESBRON — сайт <${process.env.CONTACT_EMAIL_FROM}>`,
        to: [process.env.CONTACT_EMAIL_TO ?? ""],
        replyTo: email || undefined,
        subject: `Новое сообщение с сайта от ${name}`,
        text: [
          `Имя: ${name}`,
          `Телефон: ${phone}`,
          `Почта: ${email || "не указана"}`,
          "",
          "Сообщение:",
          message,
        ].join("\n"),
        attachments,
      });
      emailSent = !result.error;
      if (result.error) console.error("Resend error:", result.error);
    } catch (e) {
      console.error("Ошибка отправки письма:", e);
    }

    await saveContactMessage({
      name,
      phone,
      email: email || undefined,
      message,
      attachmentName: attachmentFile?.name,
      emailSent,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
