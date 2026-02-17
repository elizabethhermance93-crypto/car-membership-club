"use client";

import { motion } from "framer-motion";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { PrismBackground } from "@/components/ui/PrismBackground";

const STAGGER = 0.05;

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function SolutionSection() {
  const { solutionSection } = siteContent;

  return (
    <section className="relative overflow-hidden bg-stone-100 py-16 lg:py-24 transition-colors duration-300 dark:bg-stone-900">
      <PrismBackground />
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-yellow-600 md:text-base dark:text-yellow-500">
            {solutionSection.preheadline}
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 md:text-4xl lg:text-5xl dark:text-white">
            {solutionSection.headline}
            <span className="bg-gradient-to-br from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              {solutionSection.highlighted}
            </span>
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:mt-16 lg:gap-6">
          {solutionSection.benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              className="group flex items-start gap-4 rounded-lg border border-stone-300 bg-stone-50 px-5 py-4 transition-colors duration-200 hover:border-stone-400 hover:bg-stone-100 dark:border-stone-700/50 dark:bg-stone-800/50 dark:hover:border-stone-600 dark:hover:bg-stone-800/80"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * STAGGER }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/90 text-white transition-transform duration-200 group-hover:scale-110">
                <CheckIcon />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-stone-900 dark:text-white">{benefit.title}</p>
                <div className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                  {benefit.description.split("\n").map((line, i) => (
                    <p key={i} className={i > 0 ? "mt-1" : ""}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
