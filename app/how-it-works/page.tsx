import type { Metadata } from "next";

import { CTASection } from "@/components/sections/cta-section";
import { StepsTimeline } from "@/components/sections/steps-timeline";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See the 4-step Zipsters process to join membership, choose your plan, and start driving.",
};

const requirements = [
  "Valid driver's license",
  "Full coverage insurance",
  "Initial one-time fee + weekly dues",
  "Signed 9-page membership agreement",
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="4 Easy Steps"
            title="How It Works"
            description="A simple membership process designed to get you on the road quickly with clear expectations."
          />

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1f3553]">
              What to have ready before joining
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {requirements.map((item) => (
                <li key={item} className="rounded-lg bg-[#f5f8fd] px-4 py-3 text-sm text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <StepsTimeline showHeading={false} />
      <CTASection />
    </>
  );
}
