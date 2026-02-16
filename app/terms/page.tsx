import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Terms",
  description: "Placeholder terms page template.",
};

export default function TermsPage() {
  return (
    <>
      <PageIntro
        badge="Legal"
        title="Terms and conditions"
        description="Placeholder legal content structure. Replace these sections with your finalized legal language."
      />
      <section className="py-14 sm:py-16">
        <Container className="max-w-4xl">
          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Usage terms</h2>
              <p>
                This section is placeholder content for website usage terms and
                accepted behavior.
              </p>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Service terms</h2>
              <p>
                Replace this section with your official service terms, billing terms,
                and cancellation clauses.
              </p>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Policy updates</h2>
              <p>
                Add language explaining how policy changes are communicated to users.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
