"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ctaHover, hoverTransition, prefersReducedMotion } from "@/lib/motion";

const CROSSFADE_DURATION_MS = 200;
const FALLBACK_BG = "/hero/bg-placeholder.svg";
const FALLBACK_CAR = "/hero/car-placeholder.svg";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionFrom, setTransitionFrom] = useState(0);
  const [transitionTo, setTransitionTo] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [failedUrls, setFailedUrls] = useState<Set<string>>(() => new Set());
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setReduceMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  const useFallback = useCallback((url: string) => {
    setFailedUrls((prev) => (prev.has(url) ? prev : new Set(prev).add(url)));
  }, []);

  const preloadBanner = useCallback((index: number) => {
    const b = heroBanners[index];
    if (!b) return;
    [b.bgSrc, b.carSrc].forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [heroBanners]);

  const setSlide = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      if (isTransitioning) return;
      if (reduceMotion) {
        setActiveIndex(index);
        return;
      }
      setTransitionFrom(activeIndex);
      setTransitionTo(index);
      setIsTransitioning(true);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = setTimeout(() => {
        transitionTimeoutRef.current = null;
        setActiveIndex(index);
        setIsTransitioning(false);
      }, CROSSFADE_DURATION_MS);
    },
    [activeIndex, isTransitioning, reduceMotion]
  );

  const showTwoLayers = isTransitioning && !reduceMotion;
  const fromBanner = heroBanners[transitionFrom] ?? heroBanners[0];
  const toBanner = heroBanners[transitionTo] ?? heroBanners[0];
  const activeBanner = heroBanners[activeIndex] ?? heroBanners[0];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-stone-900">
      {/* Layer 1: Full-bleed backgrounds — two-layer crossfade via CSS animation */}
      <div className="absolute inset-0 z-0">
        {showTwoLayers ? (
          <>
            <div
              key={`bg-from-${transitionFrom}`}
              className="absolute inset-0 hero-bg-layer-out"
            >
              <Image
                src={getBannerSrc(fromBanner, failedUrls, "bg")}
                alt=""
                fill
                className="object-cover object-center"
                sizes="100vw"
                unoptimized={fromBanner.bgSrc.endsWith(".svg")}
                onError={() => useFallback(fromBanner.bgSrc)}
              />
            </div>
            <div
              key={`bg-to-${transitionTo}`}
              className="absolute inset-0 hero-bg-layer-in"
            >
              <Image
                src={getBannerSrc(toBanner, failedUrls, "bg")}
                alt=""
                fill
                priority={transitionTo === 0}
                className="object-cover object-center"
                sizes="100vw"
                unoptimized={toBanner.bgSrc.endsWith(".svg")}
                onError={() => useFallback(toBanner.bgSrc)}
              />
            </div>
          </>
        ) : (
          <div className="absolute inset-0">
            <Image
              src={getBannerSrc(activeBanner, failedUrls, "bg")}
              alt=""
              fill
              priority={activeIndex === 0}
              className="object-cover object-center"
              sizes="100vw"
              unoptimized={activeBanner.bgSrc.endsWith(".svg")}
              onError={() => useFallback(activeBanner.bgSrc)}
            />
          </div>
        )}
      </div>

      {/* Layer 2: Stable dark overlay — same on every banner, above images, below text */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] hero-overlay"
        aria-hidden
      />

      {/* Layer 3: Left content — same across all slides; no reflow during slide change */}
      <Container className="relative z-10 flex min-h-screen flex-col justify-center py-20 lg:py-24">
        <div className="grid w-full max-w-2xl gap-8 lg:max-w-xl">
          <SectionReveal y={24}>
            <div className="flex flex-col gap-4 text-center lg:gap-6 lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-lg sm:text-5xl lg:text-6xl text-white">
                {hero.heading}
                <span className="bg-gradient-to-br from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                {hero.highlighted}
              </span>
                {hero.headingSuffix}
            </h1>
              <p className="text-lg font-bold text-white sm:text-xl lg:text-2xl">
                {hero.tagline}
              </p>
            </div>
          </SectionReveal>

          <SectionReveal y={20} delay={0.05}>
            <ul className="mx-auto grid max-w-xl gap-4 text-left sm:gap-5 lg:mx-0 text-white">
              {hero.bullets.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 rounded-lg py-1"
                >
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full border-2 border-white bg-transparent"
                    aria-hidden
                  />
                  <div>
                    <p className="font-bold sm:text-lg">{item.title}</p>
                    <p className="text-sm text-stone-200 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </SectionReveal>

          <SectionReveal y={20} delay={0.1}>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <motion.span
                whileHover={ctaHover}
                whileTap={{ scale: 0.98 }}
                transition={hoverTransition}
                className="inline-block"
              >
                <Link
                  href={hero.primaryCta.href}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-yellow-500 px-6 py-3.5 text-base font-semibold text-stone-900 shadow-lg shadow-yellow-500/25 transition-[box-shadow,background-color] duration-[180ms] ease-out hover:bg-yellow-400 hover:shadow-xl hover:shadow-yellow-500/30 sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
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
                  className="inline-flex w-full items-center justify-center rounded-lg border-2 border-white bg-transparent px-6 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-stone-900 sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
                >
                {hero.secondaryCta.label}
                </Link>
              </motion.span>
            </div>
          </SectionReveal>
        </div>
      </Container>

      {/* Layer 4: Car — right-anchored; crossfade via CSS animation */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-[2] hidden w-[50%] max-w-[720px] lg:block">
        <div className="absolute inset-0 flex items-end justify-end">
          <div className="relative h-[72%] w-full min-h-[260px] max-h-[85vh]">
            {showTwoLayers ? (
              <>
                <div
                  key={`car-from-${transitionFrom}`}
                  className="absolute inset-0 hero-car-layer-out"
                >
                  <Image
                    src={getBannerSrc(fromBanner, failedUrls, "car")}
                    alt={fromBanner.alt}
                    fill
                    className="object-contain object-bottom"
                    sizes="50vw"
                    unoptimized={fromBanner.carSrc.endsWith(".svg")}
                    onError={() => useFallback(fromBanner.carSrc)}
                  />
                </div>
                <div
                  key={`car-to-${transitionTo}`}
                  className="absolute inset-0 hero-car-layer-in"
                >
                  <Image
                    src={getBannerSrc(toBanner, failedUrls, "car")}
                    alt={toBanner.alt}
                    fill
                    priority={transitionTo === 0}
                    className="object-contain object-bottom"
                    sizes="50vw"
                    unoptimized={toBanner.carSrc.endsWith(".svg")}
                    onError={() => useFallback(toBanner.carSrc)}
                  />
                </div>
              </>
            ) : (
              <div className="absolute inset-0">
                <Image
                  src={getBannerSrc(activeBanner, failedUrls, "car")}
                  alt={activeBanner.alt}
                  fill
                  priority={activeIndex === 0}
                  className="object-contain object-bottom"
                  sizes="50vw"
                  unoptimized={activeBanner.carSrc.endsWith(".svg")}
                  onError={() => useFallback(activeBanner.carSrc)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: car below content, same crossfade */}
      <div className="relative z-10 mx-auto w-full max-w-2xl px-4 lg:hidden">
        <div className="relative aspect-[16/10] w-full min-h-[200px]">
          {showTwoLayers ? (
            <>
              <div
                key={`car-m-from-${transitionFrom}`}
                className="absolute inset-0 hero-car-layer-out"
              >
                <Image
                  src={getBannerSrc(fromBanner, failedUrls, "car")}
                  alt={fromBanner.alt}
                  fill
                  className="object-contain object-bottom"
                  sizes="100vw"
                  unoptimized={fromBanner.carSrc.endsWith(".svg")}
                  onError={() => useFallback(fromBanner.carSrc)}
                />
              </div>
              <div
                key={`car-m-to-${transitionTo}`}
                className="absolute inset-0 hero-car-layer-in"
              >
                <Image
                  src={getBannerSrc(toBanner, failedUrls, "car")}
                  alt={toBanner.alt}
                  fill
                  priority={transitionTo === 0}
                  className="object-contain object-bottom"
                  sizes="100vw"
                  unoptimized={toBanner.carSrc.endsWith(".svg")}
                  onError={() => useFallback(toBanner.carSrc)}
                />
              </div>
            </>
          ) : (
            <div className="absolute inset-0">
              <Image
                src={getBannerSrc(activeBanner, failedUrls, "car")}
                alt={activeBanner.alt}
                fill
                priority={activeIndex === 0}
                className="object-contain object-bottom"
                sizes="100vw"
                unoptimized={activeBanner.carSrc.endsWith(".svg")}
                onError={() => useFallback(activeBanner.carSrc)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Layer 5: Bottom center — 6 logos: inactive muted, active full color, hover 150ms */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-6 lg:pb-8">
        <Container>
          <div
            className="no-scrollbar flex justify-center gap-6 overflow-x-auto px-2 py-2 scroll-smooth md:gap-10 lg:gap-14 [scroll-snap-type:x_mandatory]"
            role="tablist"
            aria-label="Select hero banner"
          >
            {heroBanners.map((banner, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={banner.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show ${banner.name} banner`}
                  onClick={() => setSlide(index)}
                  onMouseEnter={() => preloadBanner(index)}
                  className="hero-logo-btn flex shrink-0 cursor-pointer items-center justify-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 [scroll-snap-align:center]"
                  data-active={isActive}
                >
                  <span className="flex h-9 items-center md:h-10 lg:h-14">
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
