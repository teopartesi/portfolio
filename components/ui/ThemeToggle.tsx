"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const storageKey = "portfolio-theme";

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  const isDark = theme === "dark";

  root.classList.toggle("dark", isDark);
  root.style.colorScheme = theme;
}

function getStoredTheme() {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

export function ThemeToggle() {
  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (getStoredTheme() === null) {
        applyTheme(event.matches ? "dark" : "light");
      }
    };

    systemTheme.addEventListener("change", handleSystemThemeChange);

    return () => {
      systemTheme.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const handleToggle = () => {
    const nextTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";

    applyTheme(nextTheme);

    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-sm transition hover:border-accent/50 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:size-11"
      aria-label="Basculer entre les thèmes clair et sombre"
      title="Changer de thème"
    >
      <Sun className="size-5 dark:hidden" aria-hidden="true" />
      <Moon className="hidden size-5 dark:block" aria-hidden="true" />
    </button>
  );
}
