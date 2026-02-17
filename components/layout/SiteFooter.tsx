"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Globe,
} from "lucide-react";

import { siteContent } from "@/content/siteContent";
import { useTheme } from "@/components/providers/ThemeProvider";

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram,
  Twitter,
  Google: Globe,
  Facebook,
  YouTube: Youtube,
  LinkedIn: Linkedin,
};

/** Apple logo (white) for App Store badge */
function AppleLogoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

/** Google Play triangle icon (white) for badge */
function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.635z" />
    </svg>
  );
}

export function SiteFooter() {
  const { footer, brand, navigation } = siteContent;
  const { theme, toggleTheme } = useTheme();
  const {
    brandLinks,
    locations,
    exploreLinks,
    contact,
    darkMode,
    appStoreBadges,
    social,
    legalLinks,
    copyright,
  } = footer;

  return (
    <footer className="bg-gradient-to-b from-yellow-500 to-yellow-600 pt-16 text-white transition-colors duration-300 dark:from-yellow-500 dark:to-yellow-600">
      <div className="mx-auto w-full max-w-[1800px] px-6 pb-12 pt-0 sm:px-8 lg:px-10 lg:pb-14 lg:pt-0 xl:px-12">
        {/* Top area: five columns spread full width so no large empty right gap */}
        <div className="grid gap-y-8 gap-x-8 lg:grid-cols-[auto_auto_auto_auto_auto] lg:grid-flow-col lg:justify-between lg:gap-x-10 lg:gap-y-10 lg:items-start">
          {/* Far left: logo + brand links */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="inline-flex items-center">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={280}
                height={80}
                className="h-14 w-auto object-contain object-left lg:h-16"
                unoptimized
              />
            </Link>
            <nav aria-label="Brand links">
              <ul className="flex flex-col gap-2">
                {brandLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base font-normal text-white/95 transition-opacity hover:opacity-100 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Locations column - title underlined per model */}
          <div>
            <p className="text-lg font-bold text-white underline decoration-white underline-offset-2">{locations.title}</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {locations.items.map((item) => (
                <li key={item}>
                  <Link
                    href={locations.moreHref}
                    className="text-base font-normal text-white/95 transition-opacity hover:opacity-100 hover:underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={locations.moreHref}
                  className="text-base font-normal text-white/95 transition-opacity hover:opacity-100 hover:underline"
                >
                  {locations.moreLabel}
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore column */}
          <div>
            <p className="text-lg font-bold text-white">Explore</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base font-normal text-white/95 transition-opacity hover:opacity-100 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <p className="text-lg font-bold text-white">Contact</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="text-base font-normal text-white/95 transition-opacity hover:opacity-100 hover:underline"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-base font-normal text-white/95 transition-opacity hover:opacity-100 hover:underline"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <Link
                  href={contact.appointmentHref}
                  className="text-base font-normal text-white/95 transition-opacity hover:opacity-100 hover:underline"
                >
                  {contact.appointmentLabel}
                </Link>
              </li>
            </ul>
          </div>

          {/* Right block: top nav links + social grid + app badges */}
          <div className="flex flex-col items-start gap-4 lg:items-end lg:justify-start">
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-6">
                {navigation.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 hover:underline md:text-lg"
                    >
                      {link.href === "/pricing" ? "Pricing" : link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="grid grid-cols-3 gap-x-4 gap-y-3">
              {social.map((item) => {
                const Icon = socialIconMap[item.label];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex h-10 w-10 items-center justify-center rounded text-white/95 transition-opacity hover:opacity-100"
                    aria-label={item.label}
                  >
                    {Icon ? <Icon className="h-5 w-5" strokeWidth={1.5} /> : <span className="text-xs">{item.label}</span>}
                  </a>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-3">
              {appStoreBadges[0] && (
                <a
                  href={appStoreBadges[0].href}
                  className="inline-flex items-center gap-3 rounded-xl bg-black px-4 py-2.5 text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                  aria-label="Download on the App Store"
                >
                  <AppleLogoIcon className="h-8 w-8 shrink-0" />
                  <span className="flex flex-col items-start text-left">
                    <span className="text-[10px] leading-tight">Download on the</span>
                    <span className="text-sm font-semibold leading-tight">App Store</span>
                  </span>
                </a>
              )}
              {appStoreBadges[1] && (
                <a
                  href={appStoreBadges[1].href}
                  className="inline-flex items-center gap-3 rounded-xl bg-black px-4 py-2.5 text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                  aria-label="GET IT ON Google Play"
                >
                  <GooglePlayIcon className="h-8 w-8 shrink-0" />
                  <span className="flex flex-col items-start text-left">
                    <span className="text-[10px] font-medium uppercase leading-tight">GET IT ON</span>
                    <span className="text-sm font-semibold leading-tight">Google Play</span>
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divider - distinct white line per model */}
        <div className="mt-8 border-t-2 border-white/50 pt-8 lg:mt-10 lg:pt-10" aria-hidden />

        {/* Bottom row: logo + copyright (left) | legal (center) | dark mode (right) */}
        <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-3 sm:items-center sm:gap-4">
          <div className="flex items-center gap-3 sm:justify-self-start">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white" aria-hidden>
              {brand.name.charAt(0)}
            </span>
            <span className="text-sm font-normal text-white/95">{copyright}</span>
          </div>
          <nav aria-label="Legal" className="flex justify-center">
            <ul className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base font-normal text-white/95 transition-opacity hover:opacity-100 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex justify-end sm:justify-self-end">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 text-sm text-white/95 transition-opacity hover:opacity-100"
            aria-label={theme === "dark" ? darkMode.labelOn : darkMode.labelOff}
          >
            <span className="flex h-6 w-10 items-center rounded-full border border-white/40 bg-white/10 px-1">
              <span
                className={`block h-4 w-4 rounded-full bg-amber-200 shadow transition-transform duration-200 ${
                  theme === "dark" ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </span>
            {theme === "dark" ? (
              <>Dark mode: <span className="underline">on</span></>
            ) : (
              darkMode.labelOff
            )}
          </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
