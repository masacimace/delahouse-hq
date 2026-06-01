import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";

import { urlFor } from "@/sanity/lib/image";

type HomeHeroProps = {
  title?: string;
  eyebrow?: string;
  description?: string;
  heroLogo?: SanityImageSource | null;
  image?: SanityImageSource | null;
  videoUrl?: string | null;
};

export function HomeHero({
  title,
  eyebrow,
  description,
  heroLogo,
  image,
  videoUrl,
}: HomeHeroProps) {
  const imageUrl = image
    ? urlFor(image).width(2400).height(1400).fit("crop").url()
    : null;

  const heroLogoUrl = heroLogo
    ? urlFor(heroLogo).width(520).fit("max").url()
    : null;

  return (
    <section
      data-navbar-contrast="light"
      className="relative min-h-svh w-full overflow-hidden bg-black text-white"
    >
      {videoUrl ? (
        <video
          src={videoUrl}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : imageUrl ? (
        <Image
          src={imageUrl}
          alt={title || "Delahouse Indonesia"}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-900" />
      )}

      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/20 to-black/65" />

      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-5 text-xs font-medium text-white/80">{eyebrow}</p>
          ) : null}

          {heroLogoUrl ? (
            <Image
              src={heroLogoUrl}
              alt={title || "Delahouse Indonesia"}
              width={520}
              height={220}
              priority
              className="mx-auto h-auto w-50 object-contain md:w-85 lg:w-85"
            />
          ) : (
            <h1 className="text-6xl font-medium leading-none text-white md:text-8xl lg:text-9xl">
              {title || "Welcome"}
            </h1>
          )}

          {description ? (
            <p className="mx-auto mt-6 max-w-2xl text-[14px] font-base leading-5 text-white md:text-[21px] md:leading-7">
              {description}
            </p>
          ) : null}
          <a
            href="#brands"
            className="mx-auto mt-10 inline-flex flex-col items-center gap-4 text-xs font-medium text-white/75 transition hover:text-white"
            aria-label="Scroll to explore"
          >
            <span>Scroll to explore</span>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[calc(env(safe-area-inset-bottom)+1rem)] left-0 right-0 z-10 px-6 text-white md:bottom-6 md:px-10">
        <div className="flex justify-center text-center text-[9px] md:text-[9px] font-base">
          <p></p>
        </div>
      </div>
    </section>
  );
}
