import { ListChecks } from "lucide-react";

import { howItWorksSteps } from "@/lib/site-data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type StepsTimelineProps = {
  compact?: boolean;
  showHeading?: boolean;
};

export function StepsTimeline({
  compact = false,
  showHeading = true,
}: StepsTimelineProps) {
  return (
    <section className={compact ? "py-12" : "py-16 sm:py-20"}>
      <Container>
        {showHeading ? (
          <SectionHeading
            eyebrow="4 Easy Steps"
            title="How it Works"
            description="The process stays simple from signup to driving."
            align="center"
          />
        ) : null}

        <ol
          className={`mt-10 grid gap-5 ${
            compact ? "md:grid-cols-2" : "md:grid-cols-2"
          }`}
        >
          {howItWorksSteps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#eef4fb] text-sm font-bold text-[#2a67ad]">
                  {index + 1}
                </span>
                <ListChecks className="h-5 w-5 text-[#2a67ad]" />
                <p className="text-sm font-semibold uppercase tracking-wide text-[#b88719]">
                  Step {index + 1}
                </p>
              </div>
              <h3 className="mt-3 text-xl font-bold text-[#1f3553]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
