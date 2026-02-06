"use client";

import { usePathname } from "next/navigation";
import KeystaticApp from "./keystatic";
import Link from "next/link";
import { AdminThemeProvider, useAdminTheme } from "./ThemeProvider";

function AdminLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname === "/keystatic/dashboard";
  const isAnalytics = pathname === "/keystatic/analytics";
  const isExactKeystatic = pathname === "/keystatic";
  const isContent =
    !isExactKeystatic &&
    pathname !== "/keystatic/dashboard" &&
    pathname !== "/keystatic/analytics" &&
    pathname.startsWith("/keystatic");
  const { theme, setTheme, resolved } = useAdminTheme();

  return (
    <div className={`flex flex-col h-screen ${resolved === "dark" ? "dark" : ""}`}>
      <header className="flex-shrink-0 flex items-center justify-between gap-4 px-4 py-3 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/keystatic/dashboard"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isDashboard
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            Дашборд
          </Link>
          <Link
            href="/keystatic/collection"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isContent
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            Контент
          </Link>
          <Link
            href="/keystatic/analytics"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isAnalytics
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            }`}
          >
            Аналитика
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 dark:text-zinc-500 mr-1">Тема</span>
          <div className="flex rounded-lg bg-zinc-100 dark:bg-zinc-800 p-0.5 text-xs">
            {(["light", "dark", "system"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
                  theme === t
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                {t === "light" ? "Светлая" : t === "dark" ? "Тёмная" : "Системная"}
              </button>
            ))}
          </div>
        </div>
      </header>
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        {isDashboard || isAnalytics ? children : isContent ? <KeystaticApp /> : children}
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminThemeProvider>
  );
}
