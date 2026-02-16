import { faqItems } from "@/lib/site-data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type FaqAccordionProps = {
  limit?: number;
  showHeading?: boolean;
};

export function FAQAccordion({ limit, showHeading = true }: FaqAccordionProps) {
  const items = typeof limit === "number" ? faqItems.slice(0, limit) : faqItems;

  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        {showHeading ? (
          <SectionHeading
            eyebrow="FAQ"
            title="Common Membership Questions"
            description="Clear answers to help you decide whether Zipsters is the right fit."
            align="center"
          />
        ) : null}

        <div className="mt-10 space-y-3">
          {items.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-slate-200 bg-white p-5 open:border-[#2a67ad]/35 open:shadow-sm"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-[#1f3553] marker:hidden">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
