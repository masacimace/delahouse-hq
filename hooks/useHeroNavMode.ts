"use client";

import { useCallback, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

function subscribeToViewport(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("resize", callback);

  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

export function useHeroNavMode() {
  const pathname = usePathname();

  const getSnapshot = useCallback(() => {
    if (pathname !== "/") return false;

    const triggerPoint = window.innerHeight * 0.8;
    return window.scrollY < triggerPoint;
  }, [pathname]);

  const getServerSnapshot = useCallback(() => pathname === "/", [pathname]);

  return useSyncExternalStore(
    subscribeToViewport,
    getSnapshot,
    getServerSnapshot,
  );
}
