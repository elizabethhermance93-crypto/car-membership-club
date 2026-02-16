import type { Metadata } from "next";

import { CTASection } from "@/components/sections/cta-section";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { HeroSection } from "@/components/sections/hero-section";
import { MembershipCards } from "@/components/sections/membership-cards";
import { ProblemsSection } from "@/components/sections/problems-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { StepsTimeline } from "@/components/sections/steps-timeline";
import { TestimonialCards } from "@/components/sections/testimonial-cards";
import { TrustBar } from "@/components/sections/trust-bar";
import { VehiclesGrid } from "@/components/sections/vehicles-grid";

export const metadata: Metadata = {
  title: "Car Membership Club",
  description:
    "Join Zipsters for flexible car membership with weekly dues, optional insurance support, and straightforward eligibility.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProblemsSection />
      <SolutionSection />
      <MembershipCards />
      <StepsTimeline />
      <VehiclesGrid />
      <TestimonialCards />
      <FAQAccordion limit={6} />
      <CTASection />
    </>
  );
}
