"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const FOOTER_LOGO_DURATION = 3200;

type FooterBrandLogo = {
  _id: string;
  name: string;
  slug: string;
  logoUrl: string;
};

type FooterBrandLogoSliderProps = {
  brands: FooterBrandLogo[];
  fallbackLogoUrl?: string | null;
  siteName: string;
};

export function FooterBrandLogoSlider({
  brands,
  fallbackLogoUrl,
  siteName,
}: FooterBrandLogoSliderProps) {
  const brandLogos = useMemo(
    () => brands.filter((brand) => Boolean(brand.logoUrl && brand.slug)),
    [brands],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (brandLogos.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) =>
        current >= brandLogos.length - 1 ? 0 : current + 1,
      );
    }, FOOTER_LOGO_DURATION);

    return () => {
      window.clearInterval(interval);
    };
  }, [brandLogos.length]);

  const activeBrand = brandLogos[activeIndex];

  if (!activeBrand && fallbackLogoUrl) {
    return (
      <Image
        src={fallbackLogoUrl}
        alt={siteName}
        width={620}
        height={240}
        className="h-auto w-60 object-contain md:w-105 lg:w-130"
      />
    );
  }

  if (!activeBrand) {
    return <h2 className="text-5xl font-semibold md:text-7xl">{siteName}</h2>;
  }

  return (
    <div className="flex flex-col items-center">
      <Link
        href={`/brands/${activeBrand.slug}`}
        className="group flex h-30 w-65 items-center justify-center md:h-45 md:w-115 lg:w-140"
        aria-label={`View ${activeBrand.name}`}
      >
        <Image
          key={activeBrand._id}
          src={activeBrand.logoUrl}
          alt={activeBrand.name}
          width={620}
          height={240}
          priority
          className="footer-logo-fade h-auto max-h-22.5 w-auto object-contain transition duration-700 group-hover:scale-[1.02] md:max-h-32.5 lg:max-h-37.5"
        />
      </Link>
    </div>
  );
}
