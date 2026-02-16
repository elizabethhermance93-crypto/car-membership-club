import Image from "next/image";
import { Quote } from "lucide-react";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function Testimonials() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20" id="testimonials">
      <Container>
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
              Testimonials
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              What members are saying
            </h2>
          </div>
        </SectionReveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {siteContent.testimonials.map((item, index) => (
            <SectionReveal key={item.id} delay={index * 0.06}>
              <article className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Quote className="h-6 w-6 text-sky-700" />
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.quote}</p>
                <div className="mt-5 flex items-center gap-3">
                  <Image
                    src={item.avatar}
                    alt=""
                    width={44}
                    height={44}
                    className="rounded-full border border-slate-200"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.role}</p>
                  </div>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
