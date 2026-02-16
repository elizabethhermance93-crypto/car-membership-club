import type { Metadata } from "next";

import { CTASection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Service Area",
  description:
    "Review Zipsters service area details and confirm membership availability in your location.",
};

const serviceNotes = [
  "Membership availability can vary by market and current vehicle inventory.",
  "Some plans may have different vehicle options depending on location.",
  "A representative can confirm availability after your request is submitted.",
];

export default function ServiceAreaPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <Container className="max-w-4xl">
          <SectionHeading
            eyebrow="Locations"
            title="Service Area & Availability"
            description="Zipsters serves members in select markets. Submit your location and we will confirm current coverage."
          />

          <div className="mt-8 space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {serviceNotes.map((note) => (
              <p key={note} className="rounded-lg bg-[#f5f8fd] px-4 py-3 text-sm text-slate-700">
                {note}
              </p>
            ))}
            <p className="pt-2 text-xs text-slate-500">
              Service map integration will be added in a future iteration once exact
              market boundaries are finalized.
            </p>
          </div>
        </Container>
      </section>
      <CTASection
        title="Check Availability in Your Area"
        description="Start your membership request and include your location for quick confirmation."
      />
    </>
  );
}
