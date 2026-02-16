import Image from "next/image";
import Link from "next/link";

import { navigationItems } from "@/lib/site-data";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a67ad]"
        >
          <Image
            src="/assets/refresh-the-look-logo.png"
            alt="Refresh The Look USA logo"
            width={46}
            height={58}
            priority
          />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#1f3553]">
              Zipsters
            </p>
            <p className="text-xs text-slate-600">Membership Club</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition hover:text-[#2a67ad] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a67ad]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="/join">Join Membership</ButtonLink>
        </div>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-[#1f3553]">
            Menu
          </summary>
          <nav
            className="absolute right-0 mt-3 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-lg"
            aria-label="Mobile"
          >
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[#2a67ad]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <ButtonLink href="/join" className="w-full">
                  Join Membership
                </ButtonLink>
              </li>
            </ul>
          </nav>
        </details>
      </Container>
    </header>
  );
}
