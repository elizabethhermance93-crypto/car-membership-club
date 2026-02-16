import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/ui/SectionReveal";

type PageIntroProps = {
  badge: string;
  title: string;
  description: string;
};

export function PageIntro({ badge, title, description }: PageIntroProps) {
  return (
    <section className="border-b border-slate-200 bg-slate-50 py-14 sm:py-16">
      <Container>
        <SectionReveal>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">
              {badge}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
