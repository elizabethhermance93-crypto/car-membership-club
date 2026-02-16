import { CheckCircle2 } from "lucide-react";

import { smarterSolutionItems } from "@/lib/site-data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function SolutionSection() {
  return (
    <section className="bg-[#f7fafc] py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Zipsters"
          title="The Smarter Solution"
          description="A flexible membership model with transparent requirements and practical support."
          align="center"
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {smarterSolutionItems.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1fa971]" />
                <div>
                  <h3 className="text-lg font-bold text-[#1f3553]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
