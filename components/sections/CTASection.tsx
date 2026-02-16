import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { MotionButtonLink } from "@/components/ui/MotionButtonLink";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function CTASection() {
  return (
    <section className="pb-16 sm:pb-20">
      <Container>
        <SectionReveal>
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-12 text-white sm:px-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {siteContent.finalCta.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
              {siteContent.finalCta.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MotionButtonLink href={siteContent.finalCta.primary.href}>
                {siteContent.finalCta.primary.label}
              </MotionButtonLink>
              <MotionButtonLink
                href={siteContent.finalCta.secondary.href}
                variant="secondary"
              >
                {siteContent.finalCta.secondary.label}
              </MotionButtonLink>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
