"use client";

import { useState } from "react";
import SiteHeader from "@/components/layout/SiteHeader";

type State = "idle" | "loading" | "success" | "error";

function Field({
  id,
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
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
        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[#e7813f] focus:ring-2 focus:ring-[#e7813f]/20 disabled:opacity-50"
      />
    </div>
  );
}

export default function WarrantyActivatePage() {
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  const loading = state === "loading";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/warranty/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, phone, firstName, lastName }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Ошибка активации");
        setState("error");
      } else {
        setState("success");
      }
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз.");
      setState("error");
    }
  }

  return (
    <main
      className="min-h-screen bg-white text-[#111]"
      style={{ fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif" }}
    >
      <SiteHeader />

      <div className="max-w-lg mx-auto px-4 pt-32 pb-16 min-[1200px]:pt-40">
        <div className="text-center mb-10">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-[#e7813f] to-[#fc6407] shadow-lg mb-5">
            <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#111] mb-2">Активация гарантии</h1>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Введите код с гарантийного талона и ваш телефон, чтобы зарегистрировать гарантию на изделие VELESBRON.
          </p>
        </div>

        {state === "success" ? (
          <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-green-800 mb-1">Гарантия активирована</h2>
            <p className="text-sm text-green-700">
              Ваш код успешно зарегистрирован. Сохраните этот талон вместе с изделием.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-200 bg-white shadow-sm p-6 space-y-4">
            <Field
              id="code"
              label="Гарантийный код"
              required
              value={code}
              onChange={setCode}
              placeholder="VB-XXXX-XXXX-XXXX"
              disabled={loading}
            />
            <Field
              id="phone"
              label="Телефон"
              required
              type="tel"
              value={phone}
              onChange={setPhone}
              placeholder="+7 (___) ___-__-__"
              disabled={loading}
            />

            <div className="grid grid-cols-2 gap-4">
              <Field
                id="firstName"
                label="Имя"
                value={firstName}
                onChange={setFirstName}
                placeholder="Иван"
                disabled={loading}
              />
              <Field
                id="lastName"
                label="Фамилия"
                value={lastName}
                onChange={setLastName}
                placeholder="Иванов"
                disabled={loading}
              />
            </div>

            {state === "error" && (
              <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-b from-[#e7813f] to-[#fc6407] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60 mt-2"
            >
              {loading ? "Активация…" : "Активировать гарантию"}
            </button>

            <p className="text-xs text-zinc-400 text-center">
              Поля, отмеченные <span className="text-[#e7813f]">*</span>, обязательны для заполнения
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
