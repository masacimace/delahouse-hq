"use client";

import { useEffect, useState } from "react";

export function useNavbarContrastMode() {
  const [useLightNav, setUseLightNav] = useState(false);

  useEffect(() => {
    let frameId: number | null = null;

    function checkContrastSections() {
      const navbarProbeY = 40;

      const contrastSections = document.querySelectorAll<HTMLElement>(
        '[data-navbar-contrast="light"]',
      );

      const shouldUseLightNav = Array.from(contrastSections).some((section) => {
        const rect = section.getBoundingClientRect();

        return rect.top <= navbarProbeY && rect.bottom >= navbarProbeY;
      });

      setUseLightNav(shouldUseLightNav);
    }

    function handleUpdate() {
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        checkContrastSections();
        frameId = null;
      });
    }

    checkContrastSections();

    window.addEventListener("scroll", handleUpdate, { passive: true });
    window.addEventListener("resize", handleUpdate);

    return () => {
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return useLightNav;
}
