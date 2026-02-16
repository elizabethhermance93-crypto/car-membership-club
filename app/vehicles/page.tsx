import type { Metadata } from "next";

import { CTASection } from "@/components/sections/cta-section";
import { VehiclesGrid } from "@/components/sections/vehicles-grid";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Vehicles",
  description:
    "Browse Zipsters vehicle categories by membership plan and request your preferred option.",
};

export default function VehiclesPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Vehicles"
            title="Current Membership Inventory"
            description="Inventory changes frequently. Representatives can confirm live availability for your selected plan."
          />
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600">
            The examples below reflect typical categories available by plan.
            Availability can vary by location and current demand.
          </p>
        </Container>
      </section>

      <VehiclesGrid showHeading={false} />
      <CTASection
        title="See What Is Available This Week"
        description="Submit your membership request and a representative will share vehicles that match your plan."
      />
    </>
  );
}
