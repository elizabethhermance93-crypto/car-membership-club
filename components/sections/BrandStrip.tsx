"use client";

import Image from "next/image";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";

type BrandStripProps = {
  selectedBrandIndex?: number;
  onBrandSelect?: (index: number) => void;
};

export function BrandStrip({
  selectedBrandIndex = 0,
  onBrandSelect,
}: BrandStripProps) {
  const { brandLogos } = siteContent;

  return (
    <section
      className="relative border-t border-stone-200 bg-stone-100 py-8 lg:py-10 transition-colors duration-300 dark:border-stone-800 dark:bg-stone-900"
      aria-label="Partner brands"
    >
      <Container className="relative">
        <div className="no-scrollbar flex justify-center gap-10 overflow-x-auto px-2 py-2 scroll-smooth md:gap-14 lg:gap-16 [scroll-snap-type:x_mandatory]">
          {brandLogos.map((item, index) => {
            const isActive = selectedBrandIndex === index;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onBrandSelect?.(index)}
                className="flex shrink-0 cursor-pointer items-center justify-center opacity-55 transition-opacity duration-[180ms] ease-out hover:opacity-100 [scroll-snap-align:center] focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 rounded"
                style={isActive ? { opacity: 1 } : undefined}
                aria-pressed={isActive}
                aria-label={`Select ${item.name}`}
              >
                <span className="flex h-9 items-center md:h-10 lg:h-14">
                  <span className="rounded-lg px-2 py-1 ring-stone-600 transition-[box-shadow] duration-[180ms] ease-out hover:ring-2 hover:ring-stone-500/50 focus-visible:ring-2 focus-visible:ring-yellow-500">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={120}
                      height={56}
                      className="h-full w-auto object-contain grayscale dark:opacity-90"
                    />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
