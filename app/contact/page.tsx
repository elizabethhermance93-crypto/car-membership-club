import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/ContactForm";
import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact page scaffold with client-side validated form.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        badge="Contact"
        title="Speak with our team"
        description="Use this placeholder page to collect inquiries and route leads to your sales workflow."
      />
      <section className="py-14 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Contact details</h2>
            <p className="mt-4 text-sm text-slate-600">
              Replace these placeholders with your real support channels, hours, and
              service locations.
            </p>
            <div className="mt-5 space-y-2 text-sm text-slate-700">
              <p>{siteContent.brand.supportPhone}</p>
              <p>{siteContent.brand.supportEmail}</p>
              <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
