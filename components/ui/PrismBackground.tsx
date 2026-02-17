"use client";

import Image from "next/image";

const PRISM_DARK = "/images/prism-bkg-dark.97e15bfd.webp";
const PRISM_LIGHT = "/images/prism-bkg-light.021943f4.webp";

type PrismBackgroundProps = {
  className?: string;
};

/** Full-bleed prism background image (model look). Theme-aware via dark: opacity. */
export function PrismBackground({ className = "" }: PrismBackgroundProps) {
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden>
      <div className="absolute inset-0 transition-opacity duration-500 dark:opacity-0">
        <Image
          src={PRISM_LIGHT}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 dark:opacity-100">
        <Image
          src={PRISM_DARK}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
