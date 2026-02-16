import type { Metadata } from "next";

import { JoinForm } from "@/components/sections/join-form";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Join Membership",
  description:
    "Start your Zipsters membership request and connect with a representative.",
};

const quickFacts = [
  "No credit checks",
  "No employment verification",
  "Weekly dues",
  "Optional insurance support",
  "Cancel anytime by returning the vehicle",
];

export default function JoinPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Join"
          title="Start Your Membership Request"
          description="Complete this short form and a Zipsters representative will follow up with next steps and current inventory."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <JoinForm />

          <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1f3553]">
              Membership at a glance
            </h2>
            <ul className="space-y-2">
              {quickFacts.map((fact) => (
                <li key={fact} className="rounded-lg bg-[#f5f8fd] px-3 py-2 text-sm text-slate-700">
                  {fact}
                </li>
              ))}
            </ul>

            <p className="text-xs leading-6 text-slate-500">
              Final eligibility is reviewed with a representative. Additional
              documentation may be requested for identity and insurance verification.
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
