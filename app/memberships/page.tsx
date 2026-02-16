import type { Metadata } from "next";

import { CTASection } from "@/components/sections/cta-section";
import { MembershipCards } from "@/components/sections/membership-cards";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Membership Plans",
  description:
    "Compare Zipsters membership plans: Silver, Gold, Platinum, and Exotics with weekly dues and one-time fees.",
};

export default function MembershipsPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Memberships"
            title="Find the Plan That Fits You"
            description="Every plan includes unlimited mileage, regular maintenance coverage, and optional insurance support."
          />

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1f3553]">
              Transparent costs and no hidden fees
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Zipsters membership uses straightforward weekly dues plus a one-time
              membership fee. Your representative will confirm any tier upgrades
              before changes are made.
            </p>
          </div>
        </Container>
      </section>

      <MembershipCards />
      <CTASection />
    </>
  );
}
