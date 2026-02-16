import { AlertTriangle, Car, HandCoins, Wrench } from "lucide-react";

import { problemsWithBuyingAndLeasing } from "@/lib/site-data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const icons = [Car, HandCoins, AlertTriangle, Wrench];

export function ProblemsSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Problems With"
          title="Buying & Leasing"
          description="Traditional auto financing often creates long-term costs and limitations. Zipsters is designed to remove those pain points."
          align="center"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problemsWithBuyingAndLeasing.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70"
              >
                <div className="inline-flex rounded-lg bg-[#eef4fb] p-2">
                  <Icon className="h-5 w-5 text-[#2a67ad]" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#1f3553]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
