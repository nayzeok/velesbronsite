"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { WarrantyCode } from "@/lib/warranty";

type CodesResponse = {
  codes: WarrantyCode[];
  total: number;
  page: number;
  limit: number;
  batches: string[];
};

function Badge({ status }: { status: WarrantyCode["status"] }) {
  return status === "activated" ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
      Активирован
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500">
      <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
      Не активирован
    </span>
  );
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function WarrantyAdminPage() {
  const [data, setData] = useState<CodesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ added?: number; skipped?: number; error?: string } | null>(null);
  const [status, setStatus] = useState("");
  const [batch, setBatch] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (status) params.set("status", status);
      if (batch) params.set("batch", batch);
      if (search) params.set("search", search);
      params.set("page", String(page));
      const res = await fetch(`/api/admin/warranty/codes?${params}`);
      const json = await res.json();
      setData(json);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }, [status, batch, search, page]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadResult(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/warranty/upload", { method: "POST", body: fd });
      const json = await res.json();
      setUploadResult(json);
      if (json.added > 0) {
        setPage(1);
        load();
      }
      if (fileRef.current) fileRef.current.value = "";
    } finally {
      setUploading(false);
    }
  }

  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Шапка */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-1">VELESBRON</p>
            <h1 className="text-2xl font-bold text-zinc-900">Гарантийные коды</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="/admin/analytics" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
              ← Дашборд
            </a>
            <button
              type="button"
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                window.location.href = "/admin/login";
              }}
              className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-red-500 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Выйти
            </button>
          </div>
        </div>

        {/* Загрузка CSV */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm mb-6">
          <h2 className="text-sm font-semibold text-zinc-700 mb-3">Загрузить коды из CSV</h2>
          <p className="text-xs text-zinc-400 mb-4">
            Формат файла: <code className="bg-zinc-100 px-1 py-0.5 rounded">КОД, МОДЕЛЬ, ПАРТИЯ</code> — по одному коду на строку. Заголовок необязателен. Дубликаты пропускаются.
          </p>
          <form onSubmit={handleUpload} className="flex items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.txt"
              required
              className="flex-1 text-sm text-zinc-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer"
            />
            <button
              type="submit"
              disabled={uploading}
              className="shrink-0 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 transition-colors"
            >
              {uploading ? "Загружаю..." : "Загрузить"}
            </button>
          </form>

          {uploadResult && (
            <div className={`mt-3 rounded-lg px-4 py-2.5 text-sm ${uploadResult.error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
              {uploadResult.error
                ? `Ошибка: ${uploadResult.error}`
                : `Добавлено: ${uploadResult.added} кодов. Пропущено (дубликаты): ${uploadResult.skipped}.`}
            </div>
          )}
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="text"
            placeholder="Поиск по коду или email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300"
          />
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-300"
          >
            <option value="">Все статусы</option>
            <option value="unused">Не активированы</option>
            <option value="activated">Активированы</option>
          </select>
          {data && data.batches.length > 0 && (
            <select
              value={batch}
              onChange={(e) => { setBatch(e.target.value); setPage(1); }}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-300"
            >
              <option value="">Все партии</option>
              {data.batches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          )}
          {data && (
            <span className="ml-auto self-center text-xs text-zinc-400">
              Всего: {data.total}
            </span>
          )}
        </div>

        {/* Таблица */}
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-sm text-zinc-400">Загрузка...</div>
          ) : !data || data.codes.length === 0 ? (
            <div className="p-12 text-center text-sm text-zinc-400">Коды не найдены</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 text-xs text-zinc-400 uppercase tracking-wide">
                  <th className="px-4 py-3 text-left font-medium">Код</th>
                  <th className="px-4 py-3 text-left font-medium">Модель</th>
                  <th className="px-4 py-3 text-left font-medium">Партия</th>
                  <th className="px-4 py-3 text-left font-medium">Статус</th>
                  <th className="px-4 py-3 text-left font-medium">Активирован</th>
                  <th className="px-4 py-3 text-left font-medium">Покупатель</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {data.codes.map((c) => (
                  <tr key={c.code} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-zinc-800">{c.code}</td>
                    <td className="px-4 py-3 text-zinc-600">{c.model || "—"}</td>
                    <td className="px-4 py-3 text-zinc-400 text-xs">{c.batch || "—"}</td>
                    <td className="px-4 py-3"><Badge status={c.status} /></td>
                    <td className="px-4 py-3 text-zinc-400 text-xs">{formatDate(c.activatedAt)}</td>
                    <td className="px-4 py-3 text-zinc-500 text-xs">
                      {c.activatedBy ? (
                        <span title={c.activatedBy.email}>{c.activatedBy.name}</span>
                      ) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 transition-colors"
            >
              ←
            </button>
            <span className="self-center text-sm text-zinc-500">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 transition-colors"
            >
              →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
