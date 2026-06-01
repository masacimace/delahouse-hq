import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";

import { urlFor } from "@/sanity/lib/image";

export type BrandOutlet = {
  _id: string;
  name: string;
  area?: string;
  image?: SanityImageSource | null;
  address?: string;
  googleMapsUrl?: string;
  openingHours?: string;
  menuUrl?: string;
  menuFileUrl?: string;
  reservationUrl?: string;
  sortOrder?: number;
};

type BrandLocationsProps = {
  outlets: BrandOutlet[];
};

export function BrandLocations({ outlets }: BrandLocationsProps) {
  if (!outlets.length) return null;

  return (
    <section className="bg-(--background) px-6 py-20 text-(--foreground) md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.6fr]">
        <div>
          <h2 className="text-2xl font-semibold uppercase tracking-wide md:text-3xl">
            Visit Our Branch Locations
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {outlets.map((outlet) => (
            <OutletCard key={outlet._id} outlet={outlet} />
          ))}
        </div>
      </div>
    </section>
  );
}

type OutletCardProps = {
  outlet: BrandOutlet;
};

function OutletCard({ outlet }: OutletCardProps) {
  const imageUrl = outlet.image
    ? urlFor(outlet.image).width(900).height(560).fit("crop").url()
    : null;

  const menuHref = outlet.menuFileUrl || outlet.menuUrl;

  return (
    <article className="border border-(--border) p-5">
      <div className="mb-4">
        <h3 className="text-xl font-semibold uppercase tracking-wide">
          {outlet.name}
        </h3>

        {outlet.area ? (
          <p className="mt-1 text-sm italic text-(--muted)">{outlet.area}</p>
        ) : null}
      </div>

      <div className="relative mb-5 aspect-video overflow-hidden bg-(--surface-muted)">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={outlet.name}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 32vw, 100vw"
          />
        ) : null}
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-dashed border-(--border) pb-4 text-sm">
        {outlet.address ? (
          <p className="whitespace-pre-line leading-6 text-(--muted)">
            {outlet.address}
          </p>
        ) : (
          <span />
        )}

        {outlet.googleMapsUrl ? (
          <a
            href={outlet.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="h-fit text-xs font-semibold uppercase underline underline-offset-4 transition hover:text-(--accent)"
          >
            See Map
          </a>
        ) : null}
      </div>

      {outlet.openingHours ? (
        <p className="border-b border-dashed border-(--border) py-4 text-sm leading-6 text-(--muted)">
          {outlet.openingHours}
        </p>
      ) : null}

      <div className="mt-5 grid gap-2">
        {menuHref ? (
          <a
            href={menuHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center bg-(--foreground) px-5 py-3 text-xs font-semibold uppercase tracking-wide text-(--background) transition hover:bg-(--accent) hover:text-white"
          >
            View Menu
          </a>
        ) : null}

        {outlet.reservationUrl ? (
          <a
            href={outlet.reservationUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center border border-(--foreground) px-5 py-3 text-xs font-semibold uppercase tracking-wide transition hover:bg-(--foreground) hover:text-(--background)"
          >
            Reservation
          </a>
        ) : null}
      </div>
    </article>
  );
}
