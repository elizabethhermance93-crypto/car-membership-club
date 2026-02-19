import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroBrandSection } from "@/components/sections/HeroBrandSection";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { PricingCards } from "@/components/sections/PricingCards";
import { CarSubscriptionSection } from "@/components/sections/CarSubscriptionSection";
import { ProblemsSection } from "@/components/sections/ProblemsSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { Steps } from "@/components/sections/Steps";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Polished placeholder home page scaffold with sliders, motion, and responsive sections.",
};

export default function HomePage() {
  return (
    <>
      <HeroBrandSection />
      <ProblemsSection />
      <SolutionSection />
      <Steps />
      <PricingCards />
      <Testimonials />
      <FAQAccordion />
      <CarSubscriptionSection />
      <SiteFooter />
    </>
  );
}
