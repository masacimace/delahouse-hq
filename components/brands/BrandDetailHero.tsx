import type { SanityImageSource } from "@sanity/image-url";

import { SanityImage } from "@/components/SanityImage";

type BrandDetailHeroProps = {
  name: string;
  shortDescription?: string;
  logo?: SanityImageSource | null;
  heroImage?: SanityImageSource | null;
  heroVideoUrl?: string | null;
};

export function BrandDetailHero({
  name,
  shortDescription,
  logo,
  heroImage,
  heroVideoUrl,
}: BrandDetailHeroProps) {
  return (
    <section
      data-navbar-contrast="light"
      className="relative min-h-screen overflow-hidden bg-black text-white md:min-h-screen"
    >
      {heroVideoUrl ? (
        <video
          src={heroVideoUrl}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : heroImage ? (
        <>
          <SanityImage
            source={heroImage}
            aspectRatio={9 / 20}
            alt={name}
            fill
            fetchPriority="high"
            className="object-cover md:hidden"
            sizes="100vw"
          />
          <SanityImage
            source={heroImage}
            aspectRatio={12 / 7}
            alt={name}
            fill
            fetchPriority="high"
            className="hidden object-cover md:block"
            sizes="100vw"
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-neutral-950" />
      )}

      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/70" />

      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-24 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col items-center text-center">
            {logo ? (
              <SanityImage
                source={logo}
                alt={name}
                width={560}
                height={220}
                fetchPriority="high"
                className="h-auto max-h-24 w-auto object-contain md:max-h-34"
              />
            ) : (
              <h1 className="mx-auto max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
                {name}
              </h1>
            )}

            {shortDescription ? (
              <p className="mt-8 max-w-2xl text-sm font-medium leading-6 text-white/85 md:text-base">
                {shortDescription}
              </p>
            ) : null}
            <div className="mt-10 flex flex-col items-center gap-2 md:text-[11px] text-[10px] font-medium uppercase text-white/75">
              <span>Scroll to Explore</span>
              <span className="animate-pulse text-lg" aria-hidden="true">
                ↓
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
