"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useHeroNavMode() {
  const pathname = usePathname();
  const [isHeroMode, setIsHeroMode] = useState(pathname === "/");

  useEffect(() => {
    if (pathname !== "/") {
      setIsHeroMode(false);
      return;
    }

    function handleScroll() {
      const triggerPoint = window.innerHeight * 0.8;
      setIsHeroMode(window.scrollY < triggerPoint);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  return isHeroMode;
}
