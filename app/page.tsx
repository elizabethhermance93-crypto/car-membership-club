import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { Hero } from "@/components/sections/Hero";
import { PricingCards } from "@/components/sections/PricingCards";
import { Steps } from "@/components/sections/Steps";
import { Testimonials } from "@/components/sections/Testimonials";
import { VehicleCarousel } from "@/components/sections/VehicleCarousel";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Polished placeholder home page scaffold with sliders, motion, and responsive sections.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Steps />
      <PricingCards />
      <VehicleCarousel />
      <Testimonials />
      <FAQAccordion />
      <CTASection />
    </>
  );
}
