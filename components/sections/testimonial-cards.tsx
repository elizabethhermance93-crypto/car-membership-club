import { Quote } from "lucide-react";

import { testimonials } from "@/lib/site-data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function TestimonialCards() {
  return (
    <section className="bg-[#f7fafc] py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Member Stories"
          title="Trusted by Everyday Drivers"
          description="Real feedback from members using Zipsters as a practical alternative to dealership financing."
          align="center"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <Quote className="h-6 w-6 text-[#2a67ad]" />
              <p className="mt-4 text-sm leading-7 text-slate-700">
                {testimonial.quote}
              </p>
              <p className="mt-6 text-sm font-bold text-[#1f3553]">
                {testimonial.name}
              </p>
              <p className="text-xs text-slate-500">{testimonial.context}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
