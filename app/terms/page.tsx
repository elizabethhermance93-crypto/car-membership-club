import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Review the basic terms and conditions for Zipsters membership.",
};

export default function TermsPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow="Legal"
          title="Terms of Use"
          description="These summary terms describe website use and core membership expectations."
        />

        <div className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm">
          <div>
            <h2 className="text-base font-bold text-[#1f3553]">Website Use</h2>
            <p>
              By using this site, you agree to use content for lawful purposes and
              provide accurate information on any forms submitted.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#1f3553]">
              Membership Information
            </h2>
            <p>
              Plan rates, one-time fees, and vehicle availability are subject to
              change. Final membership details are confirmed in the signed membership
              agreement.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#1f3553]">
              Requirements and Eligibility
            </h2>
            <p>
              Members must provide a valid driver&apos;s license and maintain required
              insurance coverage. Additional verification may be requested where
              required by policy or law.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#1f3553]">Changes</h2>
            <p>
              These terms may be updated periodically. Continued use of the site
              indicates acceptance of the latest version.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
