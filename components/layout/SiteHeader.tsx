"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { MotionButtonLink } from "@/components/ui/MotionButtonLink";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={siteContent.brand.logo}
            alt={`${siteContent.brand.name} logo placeholder`}
            width={152}
            height={38}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {siteContent.navigation.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <MotionButtonLink href="/contact" variant="secondary">
            Contact
          </MotionButtonLink>
          <MotionButtonLink href="/apply">Apply now</MotionButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="rounded-lg border border-slate-300 p-2 text-slate-700 lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-200 bg-white lg:hidden"
          >
            <Container className="py-4">
              <nav className="grid gap-1" aria-label="Mobile navigation">
                {siteContent.navigation.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <MotionButtonLink
                    href="/contact"
                    variant="secondary"
                    className="w-full"
                  >
                    Contact
                  </MotionButtonLink>
                  <MotionButtonLink href="/apply" className="w-full">
                    Apply now
                  </MotionButtonLink>
                </div>
              </nav>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
