import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Application starter page with client-side validated lead form.",
};

export default function ApplyPage() {
  return (
    <>
      <PageIntro
        badge="Apply"
        title="Start your application"
        description="This lead form is ready for backend hookup later. It currently uses client-side validation only."
      />
      <section className="py-14 sm:py-16">
        <Container className="max-w-4xl">
          <ContactForm mode="apply" />
        </Container>
      </section>
    </>
  );
}
