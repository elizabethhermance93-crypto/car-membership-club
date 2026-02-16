import Image from "next/image";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { MotionButtonLink } from "@/components/ui/MotionButtonLink";
import { SectionReveal } from "@/components/ui/SectionReveal";

const bulletIcons = [
  "/placeholders/icon-car.svg",
  "/placeholders/icon-shield.svg",
  "/placeholders/icon-swap.svg",
];

export function Hero() {
  const { hero } = siteContent;

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-24">
      <Image
        src={hero.backgroundImage}
        alt=""
        fill
        priority
        className="object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/60 to-slate-900/85" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <SectionReveal>
          <div className="max-w-xl">
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-100">
              {hero.badge}
            </p>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              {hero.heading}{" "}
              <span className="bg-gradient-to-r from-sky-300 to-indigo-300 bg-clip-text text-transparent">
                {hero.highlighted}
              </span>
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-200 sm:text-lg">
              {hero.description}
            </p>

            <ul className="mt-7 space-y-3">
              {hero.bullets.map((bullet, index) => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-slate-100 sm:text-base">
                  <Image
                    src={bulletIcons[index % bulletIcons.length]}
                    alt=""
                    width={24}
                    height={24}
                    className="mt-0.5 shrink-0"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <MotionButtonLink href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </MotionButtonLink>
              <MotionButtonLink href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </MotionButtonLink>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur">
            <Image
              src={hero.vehicleImage}
              alt="Vehicle placeholder visual"
              width={1100}
              height={560}
              className="h-auto w-full rounded-2xl object-cover"
              priority
            />
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
