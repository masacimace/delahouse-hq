"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

import { useNavbarContrastMode } from "@/hooks/useNavbarContrastMode";

const subscribeToClientState = () => () => {};

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribeToClientState,
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();
  const useLightNav = useNavbarContrastMode();

  const buttonClassName = [
    "flex h-9 w-9 items-center justify-center transition hover:opacity-60",
    useLightNav ? "text-white" : "text-[var(--foreground)]",
  ].join(" ");

  if (!mounted) {
    return (
      <button
        type="button"
        className={buttonClassName}
        disabled
        aria-label="Toggle theme"
      >
        <span className="h-5 w-5 rounded-full border border-current" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={buttonClassName}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
    </button>
  );
}
