"use client";

import Image, { type ImageLoader, type ImageProps } from "next/image";
import type { SanityImageSource } from "@sanity/image-url";

import { urlFor } from "@/sanity/lib/image";

const DEFAULT_IMAGE_QUALITY = 90;

type SanityCrop = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

type SanityImageProps = Omit<ImageProps, "src" | "loader" | "quality"> & {
  source: SanityImageSource;
  /**
   * Target width / height ratio for CDN-side cropping.
   * When omitted, the original image ratio is preserved.
   */
  aspectRatio?: number;
  quality?: number;
};

function getSourceDimensions(source: SanityImageSource) {
  const sourceUrl = urlFor(source).url();
  const match = sourceUrl.match(/-(\d+)x(\d+)\.[a-z0-9]+(?:\?|$)/i);

  if (!match) return null;

  return {
    width: Number(match[1]),
    height: Number(match[2]),
  };
}

function getCrop(source: SanityImageSource): SanityCrop | null {
  if (!source || typeof source !== "object" || !("crop" in source)) {
    return null;
  }

  const crop = (source as { crop?: SanityCrop | null }).crop;
  return crop || null;
}

function getMaximumRenderableWidth(
  source: SanityImageSource,
  aspectRatio?: number,
) {
  const dimensions = getSourceDimensions(source);

  if (!dimensions) return null;

  const crop = getCrop(source);
  const left = crop?.left || 0;
  const right = crop?.right || 0;
  const top = crop?.top || 0;
  const bottom = crop?.bottom || 0;

  const usableWidth = dimensions.width * Math.max(0, 1 - left - right);
  const usableHeight = dimensions.height * Math.max(0, 1 - top - bottom);

  if (!aspectRatio || aspectRatio <= 0) {
    return Math.max(1, Math.floor(usableWidth));
  }

  return Math.max(
    1,
    Math.floor(Math.min(usableWidth, usableHeight * aspectRatio)),
  );
}

export function SanityImage({
  source,
  aspectRatio,
  quality = DEFAULT_IMAGE_QUALITY,
  alt,
  ...imageProps
}: SanityImageProps) {
  const maximumRenderableWidth = getMaximumRenderableWidth(source, aspectRatio);

  const loader: ImageLoader = ({ width, quality: requestedQuality }) => {
    const targetWidth = maximumRenderableWidth
      ? Math.min(width, maximumRenderableWidth)
      : width;

    let imageBuilder = urlFor(source)
      .width(Math.max(1, Math.round(targetWidth)))
      .quality(requestedQuality || quality)
      .auto("format");

    if (aspectRatio && aspectRatio > 0) {
      imageBuilder = imageBuilder
        .height(Math.max(1, Math.round(targetWidth / aspectRatio)))
        .fit("crop");
    } else {
      imageBuilder = imageBuilder.fit("max");
    }

    return imageBuilder.url();
  };

  return (
    <Image
      {...imageProps}
      alt={alt}
      src={urlFor(source).auto("format").url()}
      loader={loader}
      quality={quality}
    />
  );
}
