"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState, useRef } from "react";

import { siteContent } from "@/content/siteContent";
import { MenuDrawer } from "@/components/layout/MenuDrawer";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuDesktopRef = useRef<HTMLButtonElement>(null);
  const menuMobileRef = useRef<HTMLButtonElement>(null);
  const [openedBy, setOpenedBy] = useState<"desktop" | "mobile">("desktop");

  const openMenu = (source: "desktop" | "mobile") => {
    setOpenedBy(source);
    setIsOpen(true);
  };

  const triggerRef = openedBy === "desktop" ? menuDesktopRef : menuMobileRef;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 w-full h-[72px] px-6 md:px-8 lg:px-10 bg-transparent border-none shadow-none"
        style={{ border: "none", boxShadow: "none" }}
        role="banner"
      >
        {/* Overlay only: smooth top gradient so hero shows through; no divider, no bar */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 40px, rgba(0,0,0,0.08) 72px, transparent 90px)",
          }}
          aria-hidden
        />

        <div className="relative grid h-full w-full grid-cols-[1fr_auto] md:grid-cols-[1fr_1fr_1fr] items-center gap-4">
          {/* Left: logo image */}
          <div className="flex min-w-0 justify-start">
            <Link
              href="/"
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 rounded"
            >
              <Image
                src={siteContent.brand.logo}
                alt={siteContent.brand.name}
                width={240}
                height={64}
                priority
                className="h-10 w-auto object-contain object-center md:h-12"
                unoptimized
              />
            </Link>
          </div>

          {/* Center: spacer on desktop so grid stays 3-column; nav is viewport-centered via absolute below */}
          <div className="hidden md:block min-w-0" aria-hidden />

          {/* Right: Sign In + Menu (desktop) or Sign In + hamburger (mobile) */}
          <div className="flex min-w-0 items-center justify-end gap-3">
            <Link
              href={siteContent.headerCta.signIn.href}
              className="inline-flex items-center justify-center rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-stone-900 shadow-md shadow-yellow-500/20 transition-all duration-200 ease-out hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/30 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
            >
              {siteContent.headerCta.signIn.label}
            </Link>
            <button
              ref={menuMobileRef}
              type="button"
              onClick={() => openMenu("mobile")}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center text-white/90 transition-opacity duration-200 ease-out hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded"
              aria-expanded={isOpen}
              aria-controls="menu-drawer"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <button
              ref={menuDesktopRef}
              type="button"
              onClick={() => openMenu("desktop")}
              className="group hidden md:inline-flex relative pb-0.5 text-sm lg:text-base font-medium text-white/90 transition-opacity duration-200 ease-out hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded"
            >
              {siteContent.headerCta.menu.label}
              <span className="absolute left-0 right-0 bottom-0 h-px scale-x-0 bg-white transition-transform duration-200 ease-out origin-center group-hover:scale-x-100" aria-hidden />
            </button>
          </div>
        </div>

        {/* Center nav: truly viewport-centered on desktop/tablet (absolute so left/right width doesn't shift it) */}
        <nav
          className="absolute left-1/2 top-0 bottom-0 hidden md:flex items-center justify-center -translate-x-1/2 pointer-events-none"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-5 md:gap-6 lg:gap-10 pointer-events-auto">
            {siteContent.navigation.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href + "/"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative pb-0.5 text-sm lg:text-base font-medium text-white/90 transition-opacity duration-200 ease-out hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded ${
                    isActive ? "text-yellow-400" : ""
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 right-0 bottom-0 h-px origin-center transition-transform duration-200 ease-out ${
                      isActive ? "scale-x-100 bg-yellow-400" : "scale-x-0 bg-white group-hover:scale-x-100"
                    }`}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Full-screen overlay + right drawer menu (desktop + tablet + mobile) */}
      <MenuDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
      />
    </>
  );
}
