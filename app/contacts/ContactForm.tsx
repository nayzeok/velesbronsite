"use client";

import { useRef, useState } from "react";

type FieldErrors = Record<string, string>;

/** Собирает введённые цифры в формат +7 (XXX) XXX-XX-XX по мере ввода */
function formatPhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("7") || digits.startsWith("8")) digits = digits.slice(1);
  digits = digits.slice(0, 10);

  let result = "+7";
  if (digits.length > 0) result += ` (${digits.slice(0, 3)}`;
  if (digits.length >= 3) result += ")";
  if (digits.length > 3) result += ` ${digits.slice(3, 6)}`;
  if (digits.length > 6) result += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) result += `-${digits.slice(8, 10)}`;
  return result;
}

function isPhoneComplete(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11;
}

function Field({
  id,
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled,
  error,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#111] mb-1.5">
        {label}
        {required && <span className="text-[#e7813f] ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-xl border px-4 py-3 text-sm text-zinc-900 outline-none transition focus:ring-2 disabled:opacity-50 ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-200 bg-red-50"
            : "border-zinc-200 focus:border-[#e7813f] focus:ring-[#e7813f]/20 bg-white"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  function resetForm() {
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError("");

    if (phone && !isPhoneComplete(phone)) {
      setErrors({ phone: "Введите телефон полностью" });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.set("website", honeypotRef.current?.value ?? "");
      formData.set("name", name);
      formData.set("phone", phone);
      formData.set("email", email);
      formData.set("message", message);
      if (attachment) formData.set("attachment", attachment);

      const res = await fetch("/api/contact", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) {
          const map: FieldErrors = {};
          for (const err of data.errors) map[err.field] = err.message;
          setErrors(map);
        } else {
          setServerError(data.error ?? "Ошибка");
        }
      } else {
        setSuccess(true);
        resetForm();
      }
    } catch {
      setServerError("Ошибка соединения. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="rounded-xl border-2 border-[#e5e5e5] bg-white p-6">
      <h2
        className="uppercase text-[#111] text-[14px] min-[1200px]:text-[17px]"
        style={{
          fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif",
          fontWeight: 700,
          letterSpacing: "0.08em",
          lineHeight: 1.2,
        }}
      >
        Написать нам
      </h2>
      <p className="mt-2 text-[#111]/60" style={{ fontSize: 15, lineHeight: 1.5 }}>
        Заполните форму - ответим на почту или по телефону.
      </p>

      {success ? (
        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Сообщение отправлено. Мы свяжемся с вами в ближайшее время.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Honeypot: скрыто от людей, боты часто заполняют все поля подряд */}
          <input
            ref={honeypotRef}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
          />
          <div className="grid gap-4 min-[640px]:grid-cols-2">
            <Field id="contact-name" label="Имя" required value={name} onChange={setName} disabled={loading} error={errors.name} />
            <Field id="contact-phone" label="Телефон" required type="tel" value={phone} onChange={(v) => setPhone(formatPhone(v))} placeholder="+7 (___) ___-__-__" disabled={loading} error={errors.phone} />
          </div>
          <Field id="contact-email" label="Почта" type="email" value={email} onChange={setEmail} placeholder="you@example.com" disabled={loading} error={errors.email} />

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-[#111] mb-1.5">
              Сообщение<span className="text-[#e7813f] ml-0.5">*</span>
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              className={`w-full rounded-xl border px-4 py-3 text-sm text-zinc-900 outline-none transition focus:ring-2 disabled:opacity-50 resize-none ${
                errors.message
                  ? "border-red-400 focus:border-red-400 focus:ring-red-200 bg-red-50"
                  : "border-zinc-200 focus:border-[#e7813f] focus:ring-[#e7813f]/20 bg-white"
              }`}
            />
            {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
          </div>

          <div>
            <label htmlFor="contact-attachment" className="block text-sm font-medium text-[#111] mb-1.5">
              Вложение
            </label>
            <input
              id="contact-attachment"
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.heic,.gif,.pdf,.doc,.docx"
              disabled={loading}
              onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-[#111]/70 file:mr-4 file:rounded-xl file:border-0 file:bg-[#f5f5f5] file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-[#111] hover:file:bg-[#eee] disabled:opacity-50"
            />
            <p className="mt-1 text-xs text-[#111]/50">Изображения, PDF или Word, до 10 МБ</p>
            {errors.attachment && <p className="mt-1 text-xs text-red-600">{errors.attachment}</p>}
          </div>

          {serverError && <p className="text-sm text-red-600">{serverError}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-gradient-to-b from-[#e7813f] to-[#EA6A20] px-6 py-3 text-sm font-semibold text-white shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ fontFamily: "var(--font-montserrat-bold), Montserrat, sans-serif" }}
          >
            {loading ? "Отправка…" : "Отправить"}
          </button>
        </form>
      )}
    </article>
  );
}
