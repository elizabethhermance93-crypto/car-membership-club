import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Membership Request Received",
  description: "Confirmation page for Zipsters membership inquiries.",
};

type ConfirmationPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function JoinConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const params = await searchParams;
  const rawName = params.name;
  const rawPlan = params.plan;
  const name = typeof rawName === "string" ? rawName : "there";
  const plan = typeof rawPlan === "string" ? rawPlan : "your selected plan";

  return (
    <section className="py-24">
      <Container className="max-w-3xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b88719]">
            Confirmation
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#1f3553] sm:text-4xl">
            Thanks, {name}.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-700">
            Your request for the <strong>{plan}</strong> membership plan has been
            received. A Zipsters representative will contact you shortly with
            current vehicle availability and next steps.
          </p>

          <div className="mt-6 rounded-xl bg-[#f5f8fd] p-4 text-sm leading-7 text-slate-700">
            Please keep your driver's license and insurance information available so
            the representative can move quickly through onboarding.
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/vehicles"
              className="inline-flex items-center justify-center rounded-xl bg-[#2a67ad] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f568f]"
            >
              Browse Vehicles
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
