import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/ui/SectionReveal";

type FAQAccordionProps = {
  showHeading?: boolean;
};

export function FAQAccordion({ showHeading = true }: FAQAccordionProps) {
  return (
    <section className="py-16 sm:py-20" id="faq">
      <Container className="max-w-4xl">
        {showHeading ? (
          <SectionReveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Answers to common questions
              </h2>
            </div>
          </SectionReveal>
        ) : null}

        <div className="mt-10 space-y-3">
          {siteContent.faqs.map((faq, index) => (
            <SectionReveal key={faq.question} delay={index * 0.04}>
              <details className="rounded-2xl border border-slate-200 bg-white p-5 open:border-sky-300 open:shadow-sm">
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </details>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
