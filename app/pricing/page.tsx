import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { PricingCards } from "@/components/sections/PricingCards";
import { VehicleCarousel } from "@/components/sections/VehicleCarousel";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Compare placeholder pricing plans for this Posh-style scaffold.",
};

export default function PricingPage() {
  return (
    <>
      <PageIntro
        badge="Pricing"
        title="Compare plan options"
        description="All values on this page are placeholders. Update plan names, rates, features, and fees in one content file."
      />
      <PricingCards showHeading={false} />
      <VehicleCarousel showHeading={false} />
      <CTASection />
    </>
  );
}
