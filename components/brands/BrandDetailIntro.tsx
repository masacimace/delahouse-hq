type BrandDetailIntroProps = {
  description?: string;
  instagramUrl?: string;
};

export function BrandDetailIntro({
  description,
  instagramUrl,
}: BrandDetailIntroProps) {
  if (!description && !instagramUrl) return null;

  return (
    <section className="bg-(--background) px-6 py-20 text-(--foreground) md:px-10 md:py-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        {description ? (
          <p className="whitespace-pre-line text-md font-light leading-6 text-(--foreground) md:text-lg md:leading-10">
            {description}
          </p>
        ) : null}

        {instagramUrl ? (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex border border-(--border) px-8 py-3 text-xs font-semibold uppercase tracking-wide transition hover:bg-(--foreground) hover:text-(--background)"
          >
            Explore More
          </a>
        ) : null}
      </div>
    </section>
  );
}
