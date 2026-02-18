"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { ctaHover, hoverTransition } from "@/lib/motion";

const AUTOPLAY_DELAY_MS = 5000;
const FADE_DURATION_MS = 900;
const FALLBACK_BG = "/hero/bg-placeholder.svg";
const FALLBACK_CAR = "/hero/car-placeholder.svg";
const HERO_READY_EVENT = "app-hero-ready";

function getBannerSrc(
  banner: (typeof siteContent.heroBanners)[number],
  failedUrls: Set<string>,
  kind: "bg" | "car"
) {
  const url = kind === "bg" ? banner.bgSrc : banner.carSrc;
  const fallback = kind === "bg" ? FALLBACK_BG : FALLBACK_CAR;
  return failedUrls.has(url) ? fallback : url;
}

export function Hero() {
  const { hero, heroBanners } = siteContent;
  const count = heroBanners?.length ?? 0;
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [failedUrls, setFailedUrls] = useState<Set<string>>(() => new Set());
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countRef = useRef(count);
  countRef.current = count;

  const safeIndex = count > 0 ? Math.min(activeIndex, count - 1) : 0;
  const fadeDurationMs = reduceMotion ? 450 : FADE_DURATION_MS;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    // Notify splash that first section (hero) is now rendered.
    window.dispatchEvent(new CustomEvent(HERO_READY_EVENT));
  }, []);

  const useFallback = useCallback((url: string) => {
    setFailedUrls((prev) => (prev.has(url) ? prev : new Set(prev).add(url)));
  }, []);

  const preloadBanner = useCallback(
    (index: number) => {
      if (!heroBanners || index < 0 || index >= heroBanners.length) return;
      const b = heroBanners[index];
      [b.bgSrc, b.carSrc].forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    },
    [heroBanners]
  );

  const goToSlide = useCallback(
    (index: number) => {
      if (count <= 0 || index < 0 || index >= count) return;
      setActiveIndex(index);
    },
    [count]
  );

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % countRef.current);
    }, AUTOPLAY_DELAY_MS);
    autoplayRef.current = id;
    return () => {
      clearInterval(id);
      autoplayRef.current = null;
    };
  }, [count]);

  if (!hero || !heroBanners || count === 0) {
    return (
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-stone-900">
        <p className="relative z-10 text-white">Loading…</p>
      </section>
    );
  }

  return (
    <section
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-gradient-to-br from-stone-900 pt-20 pb-10 snap-start lg:items-center lg:pb-0"
      aria-label="Hero"
      data-hero-fade-ms={fadeDurationMs}
    >
      {/* Background layers — opacity transition (no separate script; React state + CSS .hero-fade-layer) */}
      <div className="absolute inset-0 z-0">
        {heroBanners.map((banner, index) => (
          <div
            key={banner.id}
            className="hero-fade-layer absolute inset-0 isolate"
            style={{
              opacity: index === safeIndex ? 1 : 0,
              transitionDuration: `${fadeDurationMs}ms`,
              transform: "translateZ(0)",
            }}
          >
            <Image
              src={getBannerSrc(banner, failedUrls, "bg")}
              alt=""
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
              unoptimized={banner.bgSrc.endsWith(".svg")}
              onError={() => useFallback(banner.bgSrc)}
            />
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] hero-overlay"
        aria-hidden
      />

      <div className="relative z-10 w-full px-4 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:gap-12">
          {/* Two-column: left = copy, right = car; then mobile buttons */}
          <div className="grid w-full grid-cols-1 justify-items-center gap-8 overflow-hidden lg:grid-cols-2 lg:h-[60vh]">
            {/* Left: headline + bullets + desktop CTA */}
            <div className="flex flex-col justify-around space-y-6 lg:space-y-4">
              <div className="flex flex-wrap justify-center gap-2 text-center drop-shadow-lg lg:justify-start lg:gap-4 lg:text-left">
                <p className="text-3xl font-extrabold text-white lg:text-5xl">
                  {hero.heading.trim()}
                </p>
                <p className="hero-headline-gradient text-3xl font-extrabold lg:text-5xl">
                  {hero.highlighted}
                </p>
                <p className="text-3xl font-extrabold text-white lg:text-5xl">
                  {hero.headingSuffix?.trim() ?? ""}
                </p>
              </div>

              <div className="grid gap-4 text-sm text-white lg:gap-8 lg:text-base">
                {hero.bullets.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4"
                  >
                    <span
                      className="h-4 w-4 shrink-0 rounded-full border-2 border-white"
                      aria-hidden
                    />
                    <div>
                      <p className="font-bold lg:text-lg">{item.title}</p>
                      <p className="text-white/90">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden lg:block lg:w-1/2">
                <motion.span
                  whileHover={ctaHover}
                  whileTap={{ scale: 0.98 }}
                  transition={hoverTransition}
                  className="inline-block"
                >
                  <Link
                    href={hero.primaryCta.href}
                    className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-6 py-3.5 text-base font-semibold text-stone-900 shadow-lg shadow-yellow-500/25 transition-[box-shadow,background-color] duration-200 hover:bg-yellow-400 hover:shadow-xl hover:shadow-yellow-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
                  >
                    {hero.primaryCta.label}
                  </Link>
                </motion.span>
              </div>
            </div>

            {/* Right: car image */}
            <div className="relative w-full min-h-[20vh] lg:min-w-[50vw]">
              <div className="absolute inset-0 hidden items-end justify-center lg:flex">
                {heroBanners.map((banner, index) => (
                  <div
                    key={banner.id}
                    className="hero-car-layer absolute bottom-0 left-1/2 flex w-full justify-center lg:left-0 lg:right-0"
                    style={{
                      opacity: index === safeIndex ? 1 : 0,
                      transitionDuration: `${fadeDurationMs}ms`,
                      transform: `translateZ(0) scale(${index === safeIndex ? 1 : 0.96})`,
                    }}
                  >
                    <div className="relative h-[40vh] w-full max-w-[90vw] lg:max-w-none">
                      <Image
                        src={getBannerSrc(banner, failedUrls, "car")}
                        alt={banner.alt}
                        fill
                        priority={index === 0}
                        className="object-contain object-bottom"
                        sizes="(max-width: 1024px) 90vw, 50vw"
                        unoptimized={banner.carSrc.endsWith(".svg")}
                        onError={() => useFallback(banner.carSrc)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Mobile car */}
              <div className="relative aspect-[16/10] w-full min-h-[180px] lg:hidden">
                {heroBanners.map((banner, index) => (
                  <div
                    key={banner.id}
                    className="hero-car-layer absolute inset-0"
                    style={{
                      opacity: index === safeIndex ? 1 : 0,
                      transitionDuration: `${fadeDurationMs}ms`,
                      transform: `translateZ(0) scale(${index === safeIndex ? 1 : 0.96})`,
                    }}
                  >
                    <Image
                      src={getBannerSrc(banner, failedUrls, "car")}
                      alt={banner.alt}
                      fill
                      priority={index === 0}
                      className="object-contain object-bottom"
                      sizes="100vw"
                      unoptimized={banner.carSrc.endsWith(".svg")}
                      onError={() => useFallback(banner.carSrc)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: two buttons stacked */}
            <div className="grid w-full gap-2 lg:hidden">
              <motion.span
                whileHover={ctaHover}
                whileTap={{ scale: 0.98 }}
                transition={hoverTransition}
                className="inline-block"
              >
                <Link
                  href={hero.primaryCta.href}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-yellow-500 px-6 py-3.5 text-base font-semibold text-stone-900 shadow-lg transition-[box-shadow,background-color] duration-200 hover:bg-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
                >
                  {hero.primaryCta.label}
                </Link>
              </motion.span>
              <motion.span
                whileHover={{ y: -1, transition: hoverTransition }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <Link
                  href={hero.secondaryCta.href}
                  className="inline-flex w-full items-center justify-center rounded-lg py-3.5 text-base font-semibold text-white transition-colors hover:text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
                >
                  {hero.secondaryCta.label}
                </Link>
              </motion.span>
            </div>
          </div>

          {/* Logo row — 6 columns, grayscale, active scale-125, 100ms transition */}
          <div
            className="hidden lg:grid lg:grid-cols-6 lg:mx-auto lg:gap-14 justify-items-center"
            role="tablist"
            aria-label="Select hero banner"
          >
            {heroBanners.map((banner, index) => {
              const isActive = safeIndex === index;
              return (
                <button
                  key={banner.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show ${banner.name} banner`}
                  onClick={() => goToSlide(index)}
                  onMouseEnter={() => preloadBanner(index)}
                  className="hero-logo-btn flex shrink-0 cursor-pointer items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
                  data-active={isActive}
                >
                  <span className="flex h-9 items-center lg:h-14">
                    <Image
                      src={banner.logoSrc}
                      alt=""
                      width={80}
                      height={40}
                      className="h-full w-auto object-contain pointer-events-none"
                      unoptimized={banner.logoSrc.endsWith(".svg")}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: show logo strip as horizontal scroll */}
      <div className="relative z-20 mt-6 px-4 pb-6 lg:hidden">
        <Container>
          <div
            className="no-scrollbar flex justify-center gap-6 overflow-x-auto py-2 [scroll-snap-type:x_mandatory]"
            role="tablist"
            aria-label="Select hero banner"
          >
            {heroBanners.map((banner, index) => {
              const isActive = safeIndex === index;
              return (
                <button
                  key={banner.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show ${banner.name} banner`}
                  onClick={() => goToSlide(index)}
                  onMouseEnter={() => preloadBanner(index)}
                  className="hero-logo-btn flex shrink-0 cursor-pointer items-center justify-center [scroll-snap-align:center] focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
                  data-active={isActive}
                >
                  <span className="flex h-9 items-center">
                    <Image
                      src={banner.logoSrc}
                      alt=""
                      width={80}
                      height={40}
                      className="h-full w-auto object-contain pointer-events-none"
                      unoptimized={banner.logoSrc.endsWith(".svg")}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </Container>
      </div>
    </section>
  );
}
