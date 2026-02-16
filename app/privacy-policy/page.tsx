import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Placeholder privacy policy template page.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageIntro
        badge="Legal"
        title="Privacy policy"
        description="Placeholder privacy policy structure. Replace with your approved legal language."
      />
      <section className="py-14 sm:py-16">
        <Container className="max-w-4xl">
          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Information collected</h2>
              <p>
                Placeholder policy text for information collected through forms and
                website analytics.
              </p>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">How data is used</h2>
              <p>
                Replace this block with your data usage, processing, and retention
                policy details.
              </p>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Contact for privacy requests</h2>
              <p>
                Add the proper privacy contact email or mailing address for requests.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
