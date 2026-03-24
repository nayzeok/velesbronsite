"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });
      if (res.ok) {
        window.location.href = "/admin/analytics";
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError((data as { error?: string }).error ?? "Неверный логин или пароль");
    } catch {
      setError("Ошибка соединения");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-[#e7813f] to-[#fc6407] shadow-lg mb-4">
            <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-zinc-900">Вход в админку</h1>
          <p className="text-sm text-zinc-500 mt-1">VELESBRON</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5" htmlFor="user">
              Логин
            </label>
            <input
              id="user"
              type="text"
              autoComplete="username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[#e7813f] focus:ring-2 focus:ring-[#e7813f]/20"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5" htmlFor="password">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[#e7813f] focus:ring-2 focus:ring-[#e7813f]/20"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-b from-[#e7813f] to-[#fc6407] px-4 py-3 text-sm font-medium text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Входим…" : "Войти"}
          </button>
        </form>
      </div>
    </main>
  );
}
