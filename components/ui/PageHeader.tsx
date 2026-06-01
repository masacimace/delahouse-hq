import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <section className={cn("py-20 md:py-24", className)}>
      <div className="site-container">
        {eyebrow ? (
          <p className="mb-6 text-xs uppercase site-muted">{eyebrow}</p>
        ) : null}

        <h1 className="max-w-5xl text-6xl font-semibold md:text-8xl">
          {title}
        </h1>

        {description ? (
          <div className="mt-8 max-w-3xl text-lg leading-8 site-muted">
            {description}
          </div>
        ) : null}
      </div>
    </section>
  );
}
