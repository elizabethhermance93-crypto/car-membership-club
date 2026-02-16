import type { Metadata } from "next";

import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Upcoming Zipsters dashboard.",
};

export default function DashboardPage() {
  return (
    <section className="py-24">
      <Container className="max-w-3xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-extrabold text-[#1f3553]">Dashboard</h1>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Dashboard functionality is coming soon. This route is reserved for
            member account tools and operational reporting features.
          </p>
        </div>
      </Container>
    </section>
  );
}
