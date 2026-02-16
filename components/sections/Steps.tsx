import Image from "next/image";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/ui/SectionReveal";

type StepsProps = {
  showHeading?: boolean;
};

export function Steps({ showHeading = true }: StepsProps) {
  return (
    <section className="py-16 sm:py-20" id="steps">
      <Container>
        {showHeading ? (
          <SectionReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Four simple steps to get started
              </h2>
            </div>
          </SectionReveal>
        ) : null}

        <ol className="mt-10 grid gap-5 md:grid-cols-2">
          {siteContent.steps.map((step, index) => (
            <SectionReveal key={step.id} delay={index * 0.06}>
              <li className="flex h-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Image
                  src={step.image}
                  alt=""
                  width={120}
                  height={80}
                  className="h-16 w-24 rounded-lg object-cover sm:h-20 sm:w-30"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sky-700">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
                </div>
              </li>
            </SectionReveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
