/**
 * Global interaction tokens for consistent hover, crossfade, slide, and accordion behavior.
 * Use these everywhere for animations. Respects prefers-reduced-motion.
 */

const easeOut = [0, 0, 0.2, 1] as const;
const easeInOut = [0.4, 0, 0.2, 1] as const;

/** ~150–200ms, easeOut — buttons, nav links, cards, arrows, brand icons */
export const hoverTransition = {
  duration: 0.18,
  ease: easeOut,
};

/** ~300ms, easeInOut — hero car/background crossfade */
export const crossfadeTransition = {
  duration: 0.3,
  ease: easeInOut,
};

/** ~300ms, easeInOut — carousel slide */
export const slideTransition = {
  duration: 0.3,
  ease: easeInOut,
};

/** ~200–300ms, easeInOut — FAQ expand/collapse */
export const accordionTransition = {
  duration: 0.25,
  ease: easeInOut,
};

/** 350ms, easeOut — scroll reveal (opacity + y) */
export const scrollRevealTransition = {
  duration: 0.35,
  ease: easeOut,
};

/** ~550ms, smooth ease — landing section scroll-in (one section per view) */
export const landingSectionRevealTransition = {
  duration: 0.55,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

/** CTA button hover: translateY(-1px) + shadow */
export const ctaHover = {
  y: -1,
  transition: hoverTransition,
};

/** Card hover: translateY(-4px), subtle (ownership/reviews) */
export const cardHover = {
  y: -4,
  transition: hoverTransition,
};

/** Arrow hover: optional scale 1.05 */
export const arrowHoverScale = 1.05;

/** Check if user prefers reduced motion (for disabling crossfades/scroll reveal) */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
