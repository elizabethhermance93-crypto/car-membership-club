"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";

/**
 * Renders the site footer only when NOT on the landing (home) page.
 * On home, the footer is rendered inside the fullpage strip as the last section so it stays visible.
 */
export function FooterWhenNotLanding() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === null) return null;
  return <SiteFooter />;
}
