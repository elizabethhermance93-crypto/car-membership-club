import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read how Zipsters handles personal information submitted on this website.",
};

export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow="Legal"
          title="Privacy Policy"
          description="This summary explains how information is collected and used on the Zipsters website."
        />

        <div className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm">
          <div>
            <h2 className="text-base font-bold text-[#1f3553]">
              Information We Collect
            </h2>
            <p>
              We collect information you provide through forms, such as name, phone,
              email, and membership preferences.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#1f3553]">
              How Information Is Used
            </h2>
            <p>
              Information is used to respond to inquiries, discuss membership
              options, and support onboarding communications.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#1f3553]">
              Data Sharing
            </h2>
            <p>
              We do not sell personal information. Data may be shared only with
              service partners needed to support membership operations, such as
              insurance quote processing.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#1f3553]">
              Contact and Updates
            </h2>
            <p>
              Policy updates will be posted on this page. For privacy questions,
              please use the contact form.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
