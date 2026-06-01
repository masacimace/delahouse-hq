import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

type RichTextProps = {
  value?: PortableTextBlock[];
};

export function RichText({ value }: RichTextProps) {
  if (!value?.length) return null;

  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert prose-p:leading-8 prose-p:text-neutral-700 dark:prose-p:text-neutral-300">
      <PortableText value={value} />
    </div>
  );
}
