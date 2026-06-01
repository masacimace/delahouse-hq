import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  className?: string;
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center text-xs uppercase transition",
    variant === "primary" &&
      "border border-[var(--foreground)] bg-[var(--foreground)] px-5 py-3 text-[var(--background)] hover:bg-transparent hover:text-[var(--foreground)]",
    variant === "secondary" &&
      "border border-[var(--border-strong)] px-5 py-3 text-[var(--foreground)] hover:border-[var(--foreground)]",
    variant === "text" &&
      "underline underline-offset-4 text-[var(--foreground)] hover:text-[var(--accent)]",
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
