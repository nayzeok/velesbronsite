"use client";

import { useEffect, useState, useCallback } from "react";
import type { WarrantyRegistration } from "@/lib/warranty";

type ListResponse = { items: WarrantyRegistration[]; total: number; page: number; limit: number };
type FieldErrors = Record<string, string>;

const SHOPS = ["ДИНАМИКА", "РИТЕЙЛ"];
const MARKETPLACES = ["WB", "OZON", "YM"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function Stars({ value }: { value?: number }) {
  if (!value) return <span className="text-zinc-300">—</span>;
  return <span className="text-amber-400">{"★".repeat(value)}{"☆".repeat(5 - value)}</span>;
}

function Field({
  id, label, required, type = "text", value, onChange, placeholder, error,
}: {
  id: string; label: string; required?: boolean; type?: string;
  value: string; onChange: (v: string) => void; placeholder?: string; error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-zinc-600 mb-1">
        {label}{required && <span className="text-orange-500 ml-0.5">*</span>}
      </label>
      <input
        id={id} type={type} required={required} value={value}
        onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className={`w-full rounded-lg border px-3 py-2 text-sm text-zinc-900 outline-none transition focus:ring-2 ${
          error ? "border-red-400 focus:ring-red-200 bg-red-50" : "border-zinc-200 focus:border-orange-400 focus:ring-orange-100 bg-white"
        }`}
      />
      {error && <p className="mt-0.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function Select({
  id, label, required, value, onChange, options, error,
}: {
  id: string; label: string; required?: boolean;
  value: string; onChange: (v: string) => void; options: string[]; error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-zinc-600 mb-1">
        {label}{required && <span className="text-orange-500 ml-0.5">*</span>}
      </label>
      <select
        id={id} required={required} value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border px-3 py-2 text-sm text-zinc-900 outline-none transition focus:ring-2 ${
          error ? "border-red-400 focus:ring-red-200 bg-red-50" : "border-zinc-200 focus:border-orange-400 focus:ring-orange-100 bg-white"
        }`}
      >
        <option value="">Выбрать…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <p className="mt-0.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

const emptyForm = { code: "", shop: "", marketplace: "", purchaseDate: "", firstName: "", rating: "", note: "" };

export default function WarrantyAdminPage() {
  const [data, setData] = useState<ListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [currentUser, setCurrentUser] = useState("");

  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState<FieldErrors>({});
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const set = (field: string) => (v: string) => setForm((f) => ({ ...f, [field]: v }));

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      params.set("page", String(page));
      const res = await fetch(`/api/admin/warranty/codes?${params}`);
      setData(await res.json());
    } catch { /**/ } finally { setLoading(false); }
  }, [search, page]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    fetch("/api/admin/warranty/me").then((r) => r.json()).then((d) => setCurrentUser(d.user ?? "")).catch(() => {});
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setFormErrors({});
    setFormSuccess(false);
    setFormLoading(true);
    try {
      const res = await fetch("/api/admin/warranty/codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating: form.rating ? Number(form.rating) : undefined }),
      });
      const json = await res.json();
      if (!res.ok) {
        const map: FieldErrors = {};
        for (const err of json.errors ?? []) map[err.field] = err.message;
        setFormErrors(map);
      } else {
        setFormSuccess(true);
        setForm(emptyForm);
        setPage(1);
        load();
        setTimeout(() => setFormSuccess(false), 3000);
      }
    } finally { setFormLoading(false); }
  }

  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="max-w-[1600px] mx-auto px-4 py-8">

        {/* Шапка */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-1">VELESBRON</p>
            <h1 className="text-2xl font-bold text-zinc-900">Гарантийные регистрации</h1>
            {currentUser && <p className="text-xs text-zinc-400 mt-0.5">Вы вошли как <span className="font-medium text-zinc-600">{currentUser}</span></p>}
          </div>
          <div className="flex items-center gap-4">
            <a href="/admin/analytics" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">← Дашборд</a>
            <button
              type="button"
              onClick={async () => { await fetch("/api/admin/logout", { method: "POST" }); window.location.href = "/admin/login"; }}
              className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-red-500 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Выйти
            </button>
          </div>
        </div>

        {/* Форма */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm mb-6">
          <h2 className="text-sm font-semibold text-zinc-700 mb-4">Внести гарантию</h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              <Select id="shop" label="Магазин" required value={form.shop} onChange={set("shop")} options={SHOPS} error={formErrors.shop} />
              <Select id="marketplace" label="Маркетплейс" required value={form.marketplace} onChange={set("marketplace")} options={MARKETPLACES} error={formErrors.marketplace} />
              <Field id="purchaseDate" label="Дата покупки" required type="date" value={form.purchaseDate} onChange={set("purchaseDate")} error={formErrors.purchaseDate} />
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <Field id="firstName" label="Имя" required value={form.firstName} onChange={set("firstName")} placeholder="Иван" error={formErrors.firstName} />
              <Field id="code" label="Номер талона" required value={form.code} onChange={set("code")} placeholder="26778" error={formErrors.code} />
              <div>
                <label htmlFor="rating" className="block text-xs font-medium text-zinc-600 mb-1">Оценка</label>
                <select
                  id="rating" value={form.rating} onChange={(e) => set("rating")(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 bg-white"
                >
                  <option value="">—</option>
                  {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} ★</option>)}
                </select>
              </div>
              <Field id="note" label="Примечание" value={form.note} onChange={set("note")} placeholder="Утерян талон…" error={formErrors.note} />
            </div>
            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit" disabled={formLoading}
                className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 transition-colors"
              >
                {formLoading ? "Сохранение…" : "Добавить"}
              </button>
              {formSuccess && <span className="text-sm text-green-600">Запись добавлена ✓</span>}
            </div>
          </form>
        </div>

        {/* Поиск */}
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text" placeholder="Поиск по коду, имени, магазину…"
            value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 w-72"
          />
          {data && <span className="ml-auto text-xs text-zinc-400">Всего: {data.total}</span>}
        </div>

        {/* Таблица */}
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-sm text-zinc-400">Загрузка…</div>
          ) : !data || data.items.length === 0 ? (
            <div className="p-12 text-center text-sm text-zinc-400">Записей нет</div>
          ) : (
            <table className="w-full text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b border-zinc-100 text-xs text-zinc-400 uppercase tracking-wide">
                  <th className="px-4 py-3 text-left font-medium">Талон</th>
                  <th className="px-4 py-3 text-left font-medium">Магазин</th>
                  <th className="px-4 py-3 text-left font-medium">Площадка</th>
                  <th className="px-4 py-3 text-left font-medium">Дата покупки</th>
                  <th className="px-4 py-3 text-left font-medium">Имя</th>
                  <th className="px-4 py-3 text-left font-medium">Телефон</th>
                  <th className="px-4 py-3 text-left font-medium">Оценка</th>
                  <th className="px-4 py-3 text-left font-medium">Источник</th>
                  <th className="px-4 py-3 text-left font-medium">Менеджер</th>
                  <th className="px-4 py-3 text-left font-medium">Подтверждён</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {data.items.map((r) => (
                  <tr key={r.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-zinc-800" title={r.note}>{r.code}</td>
                    <td className="px-4 py-3 text-zinc-600 text-xs">{r.shop ?? "—"}</td>
                    <td className="px-4 py-3 text-zinc-600 text-xs">{r.marketplace ?? "—"}</td>
                    <td className="px-4 py-3 text-zinc-400 text-xs">{r.purchaseDate ? formatDate(r.purchaseDate) : "—"}</td>
                    <td className="px-4 py-3 text-zinc-700">{r.firstName} {r.lastName ?? ""}</td>
                    <td className="px-4 py-3 text-zinc-600 text-xs">{r.phone ?? "—"}</td>
                    <td className="px-4 py-3 text-sm"><Stars value={r.rating} /></td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${r.source === "site" ? "bg-blue-50 text-blue-600" : "bg-zinc-100 text-zinc-500"}`}>
                        {r.source === "site" ? "Сайт" : "Менеджер"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-600">{r.addedBy ?? "—"}</td>
                    <td className="px-4 py-3 text-xs">
                      {r.siteUpdatedAt ? (
                        <span className="text-green-600" title={formatDate(r.siteUpdatedAt)}>✓ {formatDate(r.siteUpdatedAt)}</span>
                      ) : r.source === "site" ? (
                        <span className="text-blue-500">✓ с сайта</span>
                      ) : (
                        <span className="text-zinc-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 transition-colors">←</button>
            <span className="self-center text-sm text-zinc-500">{page} / {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 transition-colors">→</button>
          </div>
        )}
      </div>
    </main>
  );
}
