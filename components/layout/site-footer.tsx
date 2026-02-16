import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-data";

const quickLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Membership Plans", href: "/memberships" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "FAQ", href: "/faq" },
  { label: "Join", href: "/join" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/refresh-the-look-logo.png"
                alt="Refresh The Look USA logo"
                width={42}
                height={54}
              />
              <div>
                <p className="text-base font-bold text-[#1f3553]">
                  {siteConfig.product}
                </p>
                <p className="text-sm text-slate-600">{siteConfig.brand}</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              Flexible car membership built for real life: weekly dues, clear
              requirements, and a friendly team focused on getting you driving.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#1f3553]">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition hover:text-[#2a67ad]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#1f3553]">
              Legal
            </p>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition hover:text-[#2a67ad]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-5 text-slate-500">
              Insurance availability and repair program options vary by member
              profile and location.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {siteConfig.brand}. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
