import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Read common placeholder questions in this FAQ scaffold.",
};

export default function FAQPage() {
  return (
    <>
      <PageIntro
        badge="FAQ"
        title="Frequently asked questions"
        description="Replace these placeholder answers with your final product, policy, and eligibility details."
      />
      <FAQAccordion showHeading={false} />
      <CTASection />
    </>
  );
}
