"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type FooterVisibilityProps = {
  children: ReactNode;
};

export function FooterVisibility({ children }: FooterVisibilityProps) {
  const pathname = usePathname();

  if (pathname === "/about") {
    return null;
  }

  return <>{children}</>;
}
