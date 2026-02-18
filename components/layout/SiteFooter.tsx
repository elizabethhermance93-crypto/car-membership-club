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

type SocialIconProps = { className?: string; strokeWidth?: number };
const socialIconMap: Record<string, React.ComponentType<SocialIconProps>> = {
  Instagram,
  Twitter,
  Google: Globe,
  Facebook,
  YouTube: Youtube,
  LinkedIn: Linkedin,
};

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
        {/* Mobile footer: modern, compact, easier scan */}
        <div className="lg:hidden">
          <nav aria-label="Footer navigation" className="mb-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-lg font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    {link.href === "/pricing" ? "Pricing" : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid grid-cols-2 gap-x-10 gap-y-8">
            <div>
              <Link href="/" className="inline-block">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={200}
                  height={56}
                  className="h-12 w-auto max-w-[200px] object-contain object-left"
                  unoptimized
                />
              </Link>
              <ul className="mt-4 space-y-2">
                {brandLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[1.05rem] font-semibold text-white/95 transition-opacity hover:opacity-100 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-3xl font-bold tracking-tight">{locations.title}</p>
              <ul className="mt-4 space-y-2">
                {locations.items.map((item) => (
                  <li key={item}>
                    <Link
                      href={locations.moreHref}
                      className="text-[1.05rem] text-white/95 transition-opacity hover:opacity-100 hover:underline"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={locations.moreHref}
                    className="text-[1.05rem] text-white/95 transition-opacity hover:opacity-100 hover:underline"
                  >
                    {locations.moreLabel}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-3xl font-bold tracking-tight">Explore</p>
              <ul className="mt-4 space-y-2">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[1.05rem] text-white/95 transition-opacity hover:opacity-100 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-3xl font-bold tracking-tight">Contact</p>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="text-[1.05rem] text-white/95 transition-opacity hover:opacity-100 hover:underline"
                  >
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-[1.05rem] text-white/95 transition-opacity hover:opacity-100 hover:underline"
                  >
                    {contact.email}
                  </a>
                </li>
                <li>
                  <Link
                    href={contact.appointmentHref}
                    className="text-[1.05rem] text-white/95 transition-opacity hover:opacity-100 hover:underline"
                  >
                    {contact.appointmentLabel}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-x-6 gap-y-5">
            {social.map((item) => {
              const Icon = socialIconMap[item.label];
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/10 text-white/95 transition-all hover:bg-black/20 hover:text-white"
                  aria-label={item.label}
                >
                  {Icon ? (
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  ) : (
                    <span className="text-xs">{item.label}</span>
                  )}
                </a>
              );
            })}
          </div>

          <div className="mt-8 flex items-center gap-3">
            {appStoreBadges[0] && (
              <a
                href={appStoreBadges[0].href}
                className="inline-flex rounded-xl transition-all duration-200 hover:opacity-90 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-yellow-600"
                aria-label="Download on the App Store"
              >
                <Image
                  src="/images/download-app-store.png"
                  alt="Download on the App Store"
                  width={170}
                  height={52}
                  className="h-11 w-auto rounded-xl object-contain"
                  unoptimized
                />
              </a>
            )}
            {appStoreBadges[1] && (
              <a
                href={appStoreBadges[1].href}
                className="inline-flex rounded-xl transition-all duration-200 hover:opacity-90 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-yellow-600"
                aria-label="GET IT ON Google Play"
              >
                <Image
                  src="/images/download-play-store.png"
                  alt="GET IT ON Google Play"
                  width={170}
                  height={52}
                  className="h-11 w-auto rounded-xl object-contain"
                  unoptimized
                />
              </a>
            )}
          </div>

          <div className="mt-8 border-t-2 border-white/50 pt-6" aria-hidden />

          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-base">
            <p className="text-white/95">{copyright}</p>
            {legalLinks.slice(0, 1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/95 transition-opacity hover:opacity-100 hover:underline"
              >
                {link.label}
              </Link>
            ))}
            {legalLinks.slice(1, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/95 transition-opacity hover:opacity-100 hover:underline"
              >
                {link.label}
              </Link>
            ))}
            {legalLinks.slice(2, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/95 transition-opacity hover:opacity-100 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="mt-4 inline-flex items-center gap-2 text-base text-white/95 transition-opacity hover:opacity-100"
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
              <>Dark Mode: <span className="underline">on</span></>
            ) : (
              darkMode.labelOff
            )}
          </button>
        </div>

        {/* Desktop footer: existing five-column structure */}
        <div className="hidden gap-y-8 gap-x-8 lg:grid lg:grid-cols-[auto_auto_auto_auto_auto] lg:grid-flow-col lg:justify-between lg:gap-x-10 lg:gap-y-10 lg:items-start">
          {/* Far left: logo + brand links */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="inline-flex items-center">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={280}
                height={80}
                className="h-14 w-auto object-contain object-left lg:h-20"
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
                  className="inline-flex rounded-xl transition-all duration-200 hover:opacity-90 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-yellow-600"
                  aria-label="Download on the App Store"
                >
                  <Image
                    src="/images/download-app-store.png"
                    alt="Download on the App Store"
                    width={170}
                    height={52}
                    className="h-11 w-auto rounded-xl object-contain"
                    unoptimized
                  />
                </a>
              )}
              {appStoreBadges[1] && (
                <a
                  href={appStoreBadges[1].href}
                  className="inline-flex rounded-xl transition-all duration-200 hover:opacity-90 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-yellow-600"
                  aria-label="GET IT ON Google Play"
                >
                  <Image
                    src="/images/download-play-store.png"
                    alt="GET IT ON Google Play"
                    width={170}
                    height={52}
                    className="h-11 w-auto rounded-xl object-contain"
                    unoptimized
                  />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divider - desktop */}
        <div className="mt-8 hidden border-t-2 border-white/50 pt-8 lg:mt-10 lg:block lg:pt-10" aria-hidden />

        {/* Bottom row: desktop */}
        <div className="hidden grid-cols-1 gap-4 pt-6 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">
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
