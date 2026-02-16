import type { Metadata } from "next";

import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Member Portal",
  description: "Upcoming Zipsters member portal.",
};

export default function MemberPortalPage() {
  return (
    <section className="py-24">
      <Container className="max-w-3xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-extrabold text-[#1f3553]">Member Portal</h1>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Portal features are coming soon. This placeholder route is ready for
            future account login, payment, and vehicle swap workflows.
          </p>
        </div>
      </Container>
    </section>
  );
}
