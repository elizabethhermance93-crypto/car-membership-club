import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Zipsters to ask about membership plans and vehicle availability.",
};

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow="Contact"
          title="Talk With a Representative"
          description="Use this form to ask questions about membership requirements, vehicle options, and plan recommendations."
        />
        <div className="mt-8">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
