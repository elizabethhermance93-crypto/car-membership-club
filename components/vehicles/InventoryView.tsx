"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, Images, RotateCw, Phone, ChevronDown, Users, DoorOpen, Fuel, Car } from "lucide-react";
import type { InventoryItem } from "@/content/siteContent";
import { siteContent } from "@/content/siteContent";
import { usePreloadImages } from "@/hooks/usePreloadImages";

const INVENTORY_VIEW_BG = "/images/inventory-view-back.jpg";

/** Vehicle image for detail hero: prefer no-background cutout (imageNoBg or hero car by make), else inventory image with mask. */
function getVehicleHeroImage(vehicle: InventoryItem): { src: string; isCutout: boolean } {
  if (vehicle.imageNoBg) return { src: vehicle.imageNoBg, isCutout: true };
  const normalized = vehicle.make.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const banner = siteContent.heroBanners?.find(
    (b) => b.name.toLowerCase() === vehicle.make.toLowerCase() || b.id.toLowerCase() === normalized
  );
  if (banner?.carSrc) return { src: banner.carSrc, isCutout: true };
  return { src: vehicle.image, isCutout: false };
}
const DEFAULT_PICKUP = "2100 N Greenville Ave #400, Richardson, TX";
const DEFAULT_ZIP = "75082";
const DEFAULT_PICKUP_FULL = `${DEFAULT_PICKUP} ${DEFAULT_ZIP}`;
const EXCESS_MILEAGE_RATE = "$0.48/mi";
const HEADER_OFFSET = 72;
const DROP_OFF_DISCLAIMER =
  "Delivery location must be within a 25 mile radius of the vehicle's default pick up location. There will be a $60 charge for a custom drop off location unless your plan includes free delivery. Our team will contact you to confirm delivery instructions once you have completed your booking.";

type PeriodId = "weekly" | "biweekly" | "monthly";

function parseDuesPrice(priceStr: string): number {
  const match = priceStr.replace(/[^0-9.]/g, "");
  return match ? Number(match) : 0;
}

function formatDues(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(amount);
}

type InventoryViewProps = {
  vehicle: InventoryItem;
  logoUrl: string | undefined;
  weeklyDues: string;
};

export function InventoryView({
  vehicle,
  logoUrl,
  weeklyDues,
}: InventoryViewProps) {
  const displayName = `${vehicle.make} ${vehicle.model}`;
  const subline = `${vehicle.year} | ${vehicle.type || vehicle.model}`;
  const reducedMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);
  // Avoid hydration mismatch: server and first client paint use "no motion" so HTML matches
  const reduceMotion = !hasMounted || !!reducedMotion;
  const weeklyAmount = parseDuesPrice(weeklyDues);

  const { src: heroCarImage, isCutout: heroCarIsCutout } = getVehicleHeroImage(vehicle);
  // assetsReady: true only after vehicle data (prop) + bg image + car image are loaded (usePreloadImages). Enter animation runs once when content mounts after overlay hides.
  const { ready: assetsReady } = usePreloadImages([INVENTORY_VIEW_BG, heroCarImage]);
  const hasBeenReadyRef = useRef(false);
  const firstContentShownRef = useRef(false);
  const [period, setPeriod] = useState<PeriodId>("weekly");
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false);
  const [pickUpOpen, setPickUpOpen] = useState(false);
  const [dropOffOpen, setDropOffOpen] = useState(false);
  const [dropOffAddress, setDropOffAddress] = useState("");
  const periodRef = useRef<HTMLDivElement>(null);
  const periodListRef = useRef<HTMLUListElement>(null);

  useEffect(() => setHasMounted(true), []);
  useEffect(() => {
    if (assetsReady) hasBeenReadyRef.current = true;
  }, [assetsReady]);
  useEffect(() => {
    if (!assetsReady) return;
    const t = setTimeout(() => {
      firstContentShownRef.current = true;
    }, 1200);
    return () => clearTimeout(t);
  }, [assetsReady]);

  // Phase: "wait" = loading (hero hidden); "static" = show hero with no animation; "enter" = show hero with enter animation
  // Fallback: if preload never fires ready, show hero after delay so user never sees only black
  const [fallbackShowHero, setFallbackShowHero] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFallbackShowHero(true), 2500);
    return () => clearTimeout(t);
  }, []);
  const effectivelyReady = assetsReady || fallbackShowHero;
  const enterPhase =
    !effectivelyReady || !hasMounted ? "wait" : reduceMotion ? "static" : "enter";
  const runFullEnter = enterPhase === "enter";

  // Overlay: show until (assets ready OR fallback) AND minimum time so user always sees the round spinner
  const [overlayMinTimeMet, setOverlayMinTimeMet] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOverlayMinTimeMet(true), 480);
    return () => clearTimeout(t);
  }, []);
  const showLoadingOverlay =
    (!effectivelyReady || !overlayMinTimeMet) && !hasBeenReadyRef.current;

  // Tell global splash (line spinner) that this page is ready so it can hide after navigation
  useEffect(() => {
    if (!effectivelyReady || !overlayMinTimeMet) return;
    hasBeenReadyRef.current = true;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("app-page-ready"));
    }
  }, [effectivelyReady, overlayMinTimeMet]);

  const periodOptions: { id: PeriodId; label: string; multiplier: number }[] = [
    { id: "weekly", label: "Weekly", multiplier: 1 },
    { id: "biweekly", label: "Bi-Weekly", multiplier: 2 },
    { id: "monthly", label: "Monthly", multiplier: 4 },
  ];

  const currentPeriodOption = periodOptions.find((o) => o.id === period) ?? periodOptions[0];
  const displayDuesAmount = weeklyAmount * currentPeriodOption.multiplier;
  const displayDuesFormatted = formatDues(displayDuesAmount);

  useEffect(() => {
    if (!periodDropdownOpen) return;
    periodListRef.current?.focus();
  }, [periodDropdownOpen]);

  useEffect(() => {
    if (!periodDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (periodRef.current && !periodRef.current.contains(e.target as Node)) setPeriodDropdownOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPeriodDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [periodDropdownOpen]);

  // SPEC: cubic-bezier(0.22, 1, 0.36, 1) — model page easing
  const ease = [0.22, 1, 0.36, 1] as const;
  // SPEC: bg enter 350ms | car 520ms delay 120ms | panel 520ms delay 160ms | vehicleId exit 180ms enter 320ms | value crossfade 180ms
  const durationBg = reduceMotion ? 0 : 0.35;
  const durationCar = reduceMotion ? 0 : 0.52;
  const delayCar = reduceMotion ? 0 : 0.12;
  const durationPanel = reduceMotion ? 0 : 0.52;
  const delayPanel = reduceMotion ? 0 : 0.16;
  const staggerDelay = reduceMotion ? 0 : 0.24; // SPEC: panel rows start 240ms after panel starts
  const staggerChildren = reduceMotion ? 0 : 0.04; // SPEC: 40ms per row
  const durationValueCrossfade = reduceMotion ? 0 : 0.18; // SPEC: value updates crossfade 180ms
  const durationVehicleExit = reduceMotion ? 0 : 0.18; // SPEC: vehicleId change exit 180ms
  const durationVehicleEnter = reduceMotion ? 0 : 0.32; // SPEC: vehicleId change enter 320ms

  const panelStaggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: staggerChildren, delayChildren: staggerDelay },
    },
  };
  const panelStaggerItem = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 6 },
    visible: reduceMotion ? {} : { opacity: 1, y: 0 },
  };

  const hoverLift = reduceMotion ? "" : "hover:-translate-y-px";
  const hoverShadow = reduceMotion ? "" : "hover:shadow-md";
  const hoverShadowLg = reduceMotion ? "" : "hover:shadow-xl";

  return (
    <>
      {/* Round spinner: show until assets ready + min time; ensures user sees it on every load/navigation */}
      <AnimatePresence>
        {showLoadingOverlay && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease }}
          >
            <motion.div
              className="h-8 w-8 shrink-0 rounded-full border-2 border-white/30 border-t-white"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              aria-hidden
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero + panel mount only after overlay hides so enter animations run visibly (not under the overlay) */}
      {!showLoadingOverlay && (
      <section className="relative w-full bg-stone-950 md:min-h-[calc(100vh+5rem)]">
        {/* SPEC: vehicleId change — AnimatePresence mode="wait" exit 180ms enter 320ms (model crossfade, no flash) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={vehicle.id}
            className="relative w-full md:min-h-[calc(100vh+5rem)]"
            initial={enterPhase === "wait" ? { opacity: 0 } : enterPhase === "static" ? false : reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={enterPhase === "wait" ? { opacity: 0 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? {} : { opacity: 0, y: 8, transition: { duration: durationVehicleExit, ease } }}
            transition={{ duration: durationVehicleEnter, ease }}
          >
        {/* Hero: on mobile fixed height so vehicle is visible; on desktop full viewport overlay */}
        <div
          className="vehicle-detail-hero relative h-[60vh] w-full md:absolute md:left-0 md:right-0 md:top-0 md:h-[calc(100vh+5rem)]"
        >
          <div className="absolute inset-0">
          {/* MODEL: bg — background fades in smoothly (SPEC: opacity 0→1 over 350ms) */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            initial={runFullEnter ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: durationBg, ease }}
          >
            <Image
              src={INVENTORY_VIEW_BG}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
              unoptimized
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(ellipse 75% 65% at 50% 55%, transparent 35%, rgba(0,0,0,0.45) 100%)",
              }}
              aria-hidden
            />
            {/* Lighten top strip so header matches other pages (not so black) */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-0 h-[90px]"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.06) 60%, transparent 100%)",
              }}
              aria-hidden
            />
          </motion.div>

          {/* MODEL: car — car image fades + translates in (SPEC: opacity 0→1, translateY(18px→0) over 520ms, delay 120ms) */}
          <motion.div
            className={`absolute bottom-0 left-0 z-[1] h-[52%] max-h-[420px] w-[min(62%,720px)] max-md:left-0 max-md:right-0 max-md:w-full max-md:max-h-[50vh] max-md:object-center will-change-transform ${!heroCarIsCutout ? "vehicle-detail-car-mask" : ""}`}
            initial={runFullEnter ? (reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }) : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durationCar, delay: runFullEnter ? delayCar : 0, ease }}
          >
            <Image
              src={heroCarImage}
              alt={displayName}
              fill
              className="object-contain object-left-bottom max-md:object-center"
              sizes="(max-width: 768px) 100vw, 720px"
              priority
              unoptimized
            />
          </motion.div>

          {/* 3a) Mobile-only: hero bar with vehicle info left + Return right (match model) */}
          <motion.div
            className="absolute left-0 right-0 top-[72px] z-10 flex items-center justify-between gap-3 bg-black/50 px-4 py-3 md:hidden"
            initial={runFullEnter ? (reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }) : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durationPanel, delay: runFullEnter ? delayPanel + 0.08 : 0, ease }}
          >
            <div className="flex min-w-0 flex-1 items-center gap-3">
              {logoUrl ? (
                <div className="relative h-7 w-9 shrink-0">
                  <Image src={logoUrl} alt="" fill className="object-contain object-left" unoptimized />
                </div>
              ) : null}
              <div className="min-w-0">
                <p className="truncate text-base font-bold leading-tight text-white">{displayName}</p>
                <p className="truncate text-xs leading-normal text-white/70">{subline}</p>
              </div>
            </div>
            <Link
              href="/vehicles"
              className={`inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#4a4a4a] px-3 py-2 text-sm font-medium text-white ${hoverShadow} ${hoverLift}`}
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
              Return
            </Link>
          </motion.div>

          {/* 3b) Desktop: top row with Return, View Photos, View Interior */}
          <motion.div
            className="absolute left-6 top-[102px] z-10 hidden flex-wrap items-center gap-3 md:left-8 md:flex"
            initial={runFullEnter ? (reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }) : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durationPanel, delay: runFullEnter ? delayPanel + 0.08 : 0, ease }}
          >
            <Link
              href="/vehicles"
              className={`inline-flex items-center gap-2 rounded-lg bg-[#4a4a4a] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-[color,transform,box-shadow] duration-200 ease-out hover:bg-[#555] ${hoverShadow} ${hoverLift}`}
            >
              <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              Return
            </Link>
            <button
              type="button"
              className={`inline-flex items-center gap-2 rounded-lg bg-[#4a4a4a] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-[color,transform,box-shadow] duration-200 ease-out hover:bg-[#555] ${hoverShadow} ${hoverLift}`}
            >
              <Images className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              View Photos
            </button>
            <button
              type="button"
              className={`inline-flex items-center gap-2 rounded-lg bg-[#4a4a4a] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-[color,transform,box-shadow] duration-200 ease-out hover:bg-[#555] ${hoverShadow} ${hoverLift}`}
            >
              <RotateCw className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              View Interior
            </button>
          </motion.div>
          </div>
        </div>

        {/* MODEL: panel — right glass panel fades + translates in (SPEC: opacity 0→1, translateX(24px→0) over 520ms, delay 160ms) */}
        <motion.aside
          className="vehicle-detail-frosted-panel relative z-10 w-full rounded-t-[18px] md:absolute md:left-auto md:right-6 md:top-[50%] md:max-h-[calc(100vh-72px)] md:w-[520px] md:-translate-y-1/2 md:rounded-[18px] lg:right-8 lg:w-[560px] will-change-transform"
          initial={runFullEnter ? (reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24 }) : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: durationPanel, delay: runFullEnter ? delayPanel : 0, ease }}
        >
            <div className="flex min-h-0 flex-col md:max-h-[calc(100vh-72px)]">
            {/* Panel header: logo, title, Get Help */}
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 px-4 pt-4 pb-3 md:px-5 md:pt-5">
              <div className="min-w-0">
                {logoUrl ? (
                  <div className="relative mb-2 h-8 w-12">
                    <Image
                      src={logoUrl}
                      alt={vehicle.make}
                      fill
                      className="object-contain object-left"
                      unoptimized
                    />
                  </div>
                ) : null}
                <h1 className="text-[1.25rem] font-bold leading-tight text-white">{displayName}</h1>
                <p className="mt-1 text-sm leading-normal text-white/70">{subline}</p>
              </div>
              <a
                href="tel:+1234567890"
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm transition-[color,transform,box-shadow] duration-200 ease-out hover:bg-white/15 ${hoverLift} ${hoverShadow}`}
              >
                <Phone className="h-3.5 w-3.5" />
                Get Help
              </a>
            </div>

            {/* Spec row: tighter gap on mobile so one row */}
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-4 border-b border-white/10 px-4 py-4 md:gap-10 md:px-5 md:py-5">
              <span className="flex items-center gap-2.5 text-sm font-medium text-white/95">
                <Users className="h-5 w-5 shrink-0" strokeWidth={2.25} />
                5 seats
              </span>
              <span className="flex items-center gap-2.5 text-sm font-medium text-white/95">
                <DoorOpen className="h-5 w-5 shrink-0" strokeWidth={2.25} />
                4 doors
              </span>
              <span className="flex items-center gap-2.5 text-sm font-medium text-white/95">
                <Fuel className="h-5 w-5 shrink-0" strokeWidth={2.25} />
                Gasoline
              </span>
              <span className="flex items-center gap-2.5 text-sm font-medium text-white/95">
                <Car className="h-5 w-5 shrink-0" strokeWidth={2.25} />
                AWD
              </span>
            </div>

            {/* Scrollable form-like rows: stagger enter */}
            <div className="vehicle-detail-panel-scroll flex-1 px-4 py-4 md:px-5 md:py-5">
              <motion.div
                className="space-y-5"
                variants={panelStaggerContainer}
                initial="hidden"
                animate={runFullEnter ? "visible" : "hidden"}
                transition={{ ease }}
              >
                {/* Period – collapse (inline expand like Pick Up / Drop Off), not dropdown */}
                <motion.div ref={periodRef} variants={panelStaggerItem}>
                  <button
                    type="button"
                    onClick={() => setPeriodDropdownOpen((o) => !o)}
                    className="flex w-full items-center justify-between gap-3 py-1.5 text-left"
                    aria-expanded={periodDropdownOpen}
                    aria-label="Billing period"
                  >
                    <span className="shrink-0 text-sm text-white/60">Membership Dues</span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-white">
                      {currentPeriodOption.label}
                      <ChevronDown
                        className={`h-4 w-4 text-white/70 transition-transform ${periodDropdownOpen ? "rotate-180" : ""}`}
                        strokeWidth={3}
                      />
                    </span>
                  </button>
                  <AnimatePresence>
                    {periodDropdownOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <ul ref={periodListRef} role="listbox" aria-label="Billing period" className="mt-2 space-y-1">
                          {periodOptions.map((opt) => {
                            const amount = formatDues(weeklyAmount * opt.multiplier);
                            const helper =
                              opt.id === "weekly"
                                ? `You will be billed every week for ${amount}.`
                                : opt.id === "biweekly"
                                  ? `You will be billed every two weeks for ${amount}.`
                                  : `You will be billed once per month for ${amount}.`;
                            const isSelected = period === opt.id;
                            return (
                              <li key={opt.id} role="option" aria-selected={isSelected}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPeriod(opt.id);
                                    setPeriodDropdownOpen(false);
                                  }}
                                  className={`w-full rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/10 ${
                                    isSelected ? "bg-white/15" : ""
                                  }`}
                                >
                                  <span className="block text-sm font-medium text-white">{opt.label}</span>
                                  <span className="mt-0.5 block text-xs text-white/60">{helper}</span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Pick Up Location – collapsible */}
                <motion.div variants={panelStaggerItem}>
                  <button
                    type="button"
                    onClick={() => setPickUpOpen((o) => !o)}
                    className="flex w-full items-start justify-between gap-3 py-1.5 text-left"
                    aria-expanded={pickUpOpen}
                  >
                    <span className="shrink-0 text-sm text-white/60">Pick Up Location</span>
                    <span className="flex items-center gap-1 text-right text-sm font-semibold text-white">
                      {DEFAULT_PICKUP}
                      <ChevronDown className={`h-4 w-4 shrink-0 text-white/70 transition-transform ${pickUpOpen ? "rotate-180" : ""}`} strokeWidth={3} />
                    </span>
                  </button>
                  <AnimatePresence>
                    {pickUpOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-1 pl-0 text-[0.75rem] text-white/70">{DEFAULT_ZIP}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div variants={panelStaggerItem}>
                  <DetailRow label="Miles Included" value="Unlimited" />
                </motion.div>
                <motion.div variants={panelStaggerItem}>
                  <DetailRow label="Excess Mileage Rate" value={EXCESS_MILEAGE_RATE} />
                </motion.div>

                {/* Drop Off Location – collapsible with disclaimer + input + Confirm */}
                <motion.div variants={panelStaggerItem}>
                  <button
                    type="button"
                    onClick={() => setDropOffOpen((o) => !o)}
                    className="flex w-full items-start justify-between gap-3 py-1.5 text-left"
                    aria-expanded={dropOffOpen}
                  >
                    <span className="shrink-0 text-sm text-white/60">Drop Off Location</span>
                    <span className="flex items-center gap-1 text-right text-sm font-semibold text-white">
                      {DEFAULT_PICKUP} {DEFAULT_ZIP}
                      <ChevronDown className={`h-4 w-4 shrink-0 text-white/70 transition-transform ${dropOffOpen ? "rotate-180" : ""}`} strokeWidth={3} />
                    </span>
                  </button>
                  <AnimatePresence>
                    {dropOffOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-[0.75rem] leading-relaxed text-white/60">
                          {DROP_OFF_DISCLAIMER}
                        </p>
                        <div className="mt-3 flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter full address here..."
                            value={dropOffAddress}
                            onChange={(e) => setDropOffAddress(e.target.value)}
                            className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                          />
                          <button
                            type="button"
                            className={`shrink-0 rounded-lg bg-[#3d3d3d] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/25 transition-[color,transform,box-shadow] duration-200 ease-out hover:bg-[#333] ${hoverLift} ${hoverShadowLg}`}
                          >
                            Confirm
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.p className="pt-2 text-xs font-semibold uppercase tracking-wider text-white/60" variants={panelStaggerItem}>Membership Type</motion.p>
                <motion.div variants={panelStaggerItem}>
                  <DetailRow label="Membership Dues" value={displayDuesFormatted} animatedKey={period} reducedMotion={!!reduceMotion} />
                </motion.div>
                <motion.div className="flex items-center justify-between border-t border-white/10 pt-4" variants={panelStaggerItem}>
                  <span className="text-sm font-semibold text-white">Total</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={period}
                      className="text-lg font-bold leading-tight text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: durationValueCrossfade, ease }}
                    >
                      {displayDuesFormatted}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </div>

            {/* CTAs – stacked full-width on mobile, row on desktop (staggered enter) */}
            {/* MODEL: panel rows/buttons — subtle stagger (SPEC: 40ms per row, starting 240ms after panel starts) */}
            <motion.div
              className="shrink-0 flex flex-col gap-3 border-t border-white/10 px-4 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:flex-row md:px-5 md:pb-5"
              variants={panelStaggerItem}
              initial="hidden"
              animate={runFullEnter ? "visible" : "hidden"}
              transition={{ duration: 0.35, ease, delay: staggerDelay + staggerChildren * 12 }}
            >
              <Link
                href="/#pricing"
                className={`w-full inline-flex items-center justify-center rounded-xl bg-[#F9B400] px-5 py-3.5 text-[0.9375rem] font-semibold text-white shadow-lg shadow-black/25 transition-[color,transform,box-shadow] duration-200 ease-out hover:bg-[#e5a300] md:min-w-0 md:flex-1 ${hoverLift} ${hoverShadowLg} focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900`}
              >
                Create Account
              </Link>
              <Link
                href="/#vehicles"
                className={`w-full inline-flex items-center justify-center rounded-xl bg-[#3d3d3d] px-5 py-3.5 text-[0.9375rem] font-semibold text-white shadow-lg shadow-black/25 transition-[color,transform,box-shadow] duration-200 ease-out hover:bg-[#333] md:min-w-0 md:flex-1 ${hoverLift} ${hoverShadowLg} focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900`}
              >
                More Information
              </Link>
            </motion.div>
          </div>
        </motion.aside>
          </motion.div>
        </AnimatePresence>
      </section>
      )}
    </>
  );
}

function DetailRow({
  label,
  value,
  withCaret,
  animatedKey,
  reducedMotion,
}: {
  label: string;
  value: React.ReactNode;
  withCaret?: boolean;
  animatedKey?: string;
  reducedMotion?: boolean;
}) {
  const content = (
    <>
      {value}
      {withCaret ? <ChevronDown className="ml-1 inline h-4 w-4 text-white/70" strokeWidth={3} aria-hidden /> : null}
    </>
  );
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="shrink-0 text-sm text-white/60">{label}</span>
      {animatedKey ? (
        <AnimatePresence mode="wait">
          <motion.span
            key={animatedKey}
            className="text-right text-sm font-semibold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {content}
          </motion.span>
        </AnimatePresence>
      ) : (
        <span className="text-right text-sm font-semibold text-white">{content}</span>
      )}
    </div>
  );
}
