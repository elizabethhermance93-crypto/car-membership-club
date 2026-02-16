import Link from "next/link";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-100">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="text-lg font-semibold">{siteContent.brand.name}</p>
            <p className="mt-1 text-sm text-slate-300">{siteContent.brand.tagline}</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              {siteContent.footer.about}
            </p>
            <div className="mt-5 text-sm text-slate-300">
              <p>{siteContent.brand.supportPhone}</p>
              <p>{siteContent.brand.supportEmail}</p>
            </div>
          </div>

          {siteContent.footer.columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-200">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-300 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            {siteContent.footer.social.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-sm text-slate-300 hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {siteContent.footer.legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-slate-300 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
