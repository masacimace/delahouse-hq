import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-10 max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 text-xs uppercase site-accent">{eyebrow}</p>
      ) : null}

      <h2 className="text-4xl font-semibold md:text-6xl">{title}</h2>

      {description ? (
        <div className="mt-6 text-lg leading-8 site-muted">{description}</div>
      ) : null}
    </div>
  );
}
