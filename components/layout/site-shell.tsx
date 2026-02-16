"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const useLandingChrome = pathname === "/";

  return (
    <>
      {!useLandingChrome ? <SiteHeader /> : null}
      <main id="main-content">{children}</main>
      {!useLandingChrome ? <SiteFooter /> : null}
    </>
  );
}
