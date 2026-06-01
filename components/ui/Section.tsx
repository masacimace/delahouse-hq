import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  withBorder?: boolean;
};

export function Section({
  children,
  className,
  withBorder = true,
}: SectionProps) {
  return (
    <section
      className={cn(
        withBorder && "site-section",
        !withBorder && "py-20 md:py-24",
        className,
      )}
    >
      {children}
    </section>
  );
}
