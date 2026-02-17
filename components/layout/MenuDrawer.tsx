"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Headphones, Calendar, MessageCircle, MapPin } from "lucide-react";

import { siteContent } from "@/content/siteContent";
import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * Full-screen overlay + right-side drawer menu.
 * Tweak: drawer width (--menu-drawer-width), overlay blur (backdrop-blur-[?]),
 * animation duration (OVERLAY_MS, DRAWER_MS) below.
 */
const OVERLAY_MS = 200;
const DRAWER_MS = 240;

const focusableSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

type MenuDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Ref of the trigger button (Menu) to restore focus on close */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

export function MenuDrawer({ isOpen, onClose, triggerRef }: MenuDrawerProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { navigation, headerCta, footer } = siteContent;
  const { locations, contact } = footer;

  // Body scroll lock
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Focus trap
  const getFocusables = useCallback(() => {
    const el = drawerRef.current;
    if (!el) return [];
    return Array.from(el.querySelectorAll<HTMLElement>(focusableSelector));
  }, []);

  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;
    const focusables = getFocusables();
    const first = focusables[0];
    if (first) first.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = getFocusables();
      if (list.length === 0) return;
      const firstEl = list[0];
      const lastEl = list[list.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, getFocusables]);

  // Restore focus to trigger on close
  const handleClose = useCallback(() => {
    onClose();
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, [onClose, triggerRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay: full viewport, blur + dim. Click on backdrop (not on drawer) closes. z-index above header. */}
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 z-[100] bg-black/35 backdrop-blur-[10px]"
            style={{
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
              paddingLeft: "env(safe-area-inset-left)",
              paddingRight: "env(safe-area-inset-right)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: OVERLAY_MS / 1000, ease: "easeOut" }}
            onClick={(e) => e.target === e.currentTarget && handleClose()}
            aria-hidden
          >
            {/* Close X: in overlay area, top, just left of drawer (NOT inside drawer). Tweak position: right = drawer width + gap. */}
            <button
          type="button"
          onClick={handleClose}
          className="absolute top-6 right-[calc(min(85vw,360px)+1rem)] z-[102] flex h-10 w-10 items-center justify-center rounded-full text-white/95 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
          style={{ top: "max(1.5rem, env(safe-area-inset-top))" }}
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
            </button>
          </motion.div>

          {/* Drawer: right panel, very dark, slide-in. Width: desktop ~360px, mobile 85vw max 360 min 300. Tweak in className. */}
          <motion.div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        id="menu-drawer"
        aria-label="Menu"
        className="fixed top-0 right-0 z-[101] flex h-full w-[min(85vw,360px)] min-w-[300px] max-w-[360px] flex-col bg-stone-950 shadow-2xl md:w-[360px]"
        style={{
          height: "100dvh",
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: DRAWER_MS / 1000, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-8">
          {/* Title: brand in gold, centered */}
          <p className="text-center text-xl font-bold tracking-tight text-yellow-500 md:text-2xl">
            {siteContent.brand.name}
          </p>

          {/* Pill buttons: Vehicles, Pricing, How it Works (gray), Sign In (gold) */}
          <nav className="mt-8 flex flex-col gap-3" aria-label="Menu navigation">
            {navigation.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href + "/"));
              const label =
                link.href === "/pricing" ? "Pricing" : link.label;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleClose}
                  className={`flex h-[52px] items-center justify-center rounded-xl px-4 text-base font-medium transition-all duration-200 active:scale-[0.99] ${
                    isActive
                      ? "bg-gradient-to-b from-stone-600 to-stone-500 text-white shadow-md hover:brightness-110 hover:shadow-lg"
                      : "bg-gradient-to-b from-stone-700 to-stone-600 text-stone-200 shadow hover:brightness-110 hover:shadow-md"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href={headerCta.signIn.href}
              onClick={handleClose}
              className="flex h-[52px] items-center justify-center rounded-xl bg-gradient-to-b from-yellow-500 to-yellow-600 px-4 text-base font-semibold text-stone-900 shadow-md shadow-yellow-500/20 transition-all duration-200 hover:brightness-110 hover:shadow-lg active:scale-[0.99]"
            >
              {headerCta.signIn.label}
            </Link>
          </nav>

          {/* 2x2 grid: Contact Us, Visit Us, Get a Quote, View Locations */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2" role="navigation" aria-label="Quick links">
            <Link
              href={contact.appointmentHref}
              onClick={handleClose}
              className="flex items-center gap-3 rounded-lg py-3 text-white/90 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-inset"
            >
              <Headphones className="h-5 w-5 shrink-0" aria-hidden />
              <span>Contact Us</span>
            </Link>
            <Link
              href={contact.appointmentHref}
              onClick={handleClose}
              className="flex items-center gap-3 rounded-lg py-3 text-white/90 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-inset"
            >
              <Calendar className="h-5 w-5 shrink-0" aria-hidden />
              <span>Visit Us</span>
            </Link>
            <Link
              href="/quote"
              onClick={handleClose}
              className="flex items-center gap-3 rounded-lg py-3 text-white/90 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-inset"
            >
              <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
              <span>Get a Quote</span>
            </Link>
            <Link
              href={locations.moreHref}
              onClick={handleClose}
              className="flex items-center gap-3 rounded-lg py-3 text-white/90 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-inset"
            >
              <MapPin className="h-5 w-5 shrink-0" aria-hidden />
              <span>View Locations</span>
            </Link>
          </div>

          {/* Dark mode toggle at bottom */}
          <div className="mt-auto flex items-center justify-between pt-8">
            <span className="text-sm font-medium text-stone-400">
              Dark Mode
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              role="switch"
              aria-checked={theme === "dark"}
              aria-label={theme === "dark" ? "Dark mode on" : "Dark mode off"}
              className="relative h-7 w-12 shrink-0 rounded-full border border-stone-600 bg-stone-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
            >
              <span
                className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-stone-200 shadow transition-transform duration-200 ${
                  theme === "dark" ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
