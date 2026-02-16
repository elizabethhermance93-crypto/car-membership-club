import { Check } from "lucide-react";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { MotionButtonLink } from "@/components/ui/MotionButtonLink";
import { SectionReveal } from "@/components/ui/SectionReveal";

type PricingCardsProps = {
  showHeading?: boolean;
};

export function PricingCards({ showHeading = true }: PricingCardsProps) {
  return (
    <section className="bg-slate-50 py-16 sm:py-20" id="pricing">
      <Container>
        {showHeading ? (
          <SectionReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
                Plans
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Flexible membership pricing
              </h2>
            </div>
          </SectionReveal>
        ) : null}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {siteContent.plans.map((plan, index) => (
            <SectionReveal key={plan.name} delay={index * 0.06}>
              <article
                className={`h-full rounded-3xl border p-6 shadow-sm ${
                  plan.highlighted
                    ? "border-sky-300 bg-gradient-to-b from-sky-50 to-white"
                    : "border-slate-200 bg-white"
                }`}
              >
                <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                <p className="mt-4 text-4xl font-extrabold text-slate-900">
                  {plan.price}
                  <span className="text-lg font-semibold text-slate-500">{plan.cadence}</span>
                </p>
                <p className="mt-2 text-sm text-slate-600">{plan.setupFee}</p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                      <Check className="h-4 w-4 text-emerald-600" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <MotionButtonLink href="/apply" className="mt-7 w-full">
                  Choose plan
                </MotionButtonLink>
              </article>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
