import type { Metadata } from "next";

import { CTASection } from "@/components/sections/cta-section";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Read answers to common questions about Zipsters membership requirements, dues, swaps, insurance, and cancellation.",
};

export default function FAQPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions Before You Join?"
            description="These answers come directly from the latest membership guidelines and Q&A content."
          />
        </Container>
      </section>
      <FAQAccordion showHeading={false} />
      <CTASection
        title="Still Need Help Deciding?"
        description="Send us your questions and a representative can walk you through plan options and current inventory."
      />
    </>
  );
}
