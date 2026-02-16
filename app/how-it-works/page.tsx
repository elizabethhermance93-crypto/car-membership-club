import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { Steps } from "@/components/sections/Steps";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Understand the step-by-step process in this placeholder site scaffold.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro
        badge="How it works"
        title="Four simple onboarding steps"
        description="This page reuses the shared Steps component so you can maintain one source for process content."
      />
      <Steps showHeading={false} />
      <CTASection />
    </>
  );
}
