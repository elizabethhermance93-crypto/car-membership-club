"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { PrismBackground } from "@/components/ui/PrismBackground";

const STAGGER = 0.12;

export function CarSubscriptionSection() {
  const { carSubscriptionSection, pricingSection } = siteContent;

  return (
    <section className="relative overflow-hidden bg-stone-100 py-10 md:py-12 lg:py-14 transition-colors duration-300 dark:bg-stone-950">
      <PrismBackground />
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-stone-600 md:text-base dark:text-white/90">
            {carSubscriptionSection.preheadline}
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 md:text-4xl lg:text-5xl dark:text-inherit">
            <span className="text-stone-800 dark:text-stone-200">
              {carSubscriptionSection.headline}
            </span>
            <span className="bg-gradient-to-br from-yellow-500 to-yellow-600 bg-clip-text text-transparent dark:from-yellow-400 dark:to-yellow-500">
              {carSubscriptionSection.headlineHighlight}
            </span>
          </h2>
          <p className="mt-3 text-lg text-stone-700 dark:text-white/95">
            {carSubscriptionSection.subtitle}
          </p>
        </div>

        {/* Two cards side-by-side from tablet so both fit in one viewport */}
        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 md:mt-10 md:grid-cols-2 md:gap-6 lg:mt-12 lg:gap-8">
          {carSubscriptionSection.cards.map((card, index) => (
            <motion.article
              key={card.id}
              className="rounded-xl border border-stone-300 bg-white/95 p-5 shadow-xl shadow-stone-900/10 backdrop-blur-sm dark:border-stone-600/50 dark:bg-stone-800/90 dark:shadow-black/30 md:p-5 lg:p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * STAGGER }}
            >
              <h3 className="text-lg font-bold text-stone-900 md:text-xl lg:text-2xl dark:text-white">
                {card.title}
                {card.highlightVariant === "white" ? (
                  <span className="font-bold text-stone-900 dark:text-white">
                    {card.highlighted}
                  </span>
                ) : (
                  <span className="bg-gradient-to-br from-yellow-500 to-yellow-600 bg-clip-text font-bold text-transparent dark:from-yellow-400 dark:to-yellow-500">
                    {card.highlighted}
                  </span>
                )}
                {card.titleSuffix}
              </h3>
              <div className="mt-3 space-y-3 md:mt-4 md:space-y-3 lg:space-y-4">
                {card.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-stone-600 md:text-sm lg:text-base dark:text-white/90"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:mt-8 lg:mt-10">
          <Link
            href={pricingSection.seeFullComparison.href}
            className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-yellow-500/25 transition-all duration-200 hover:bg-yellow-400 hover:shadow-xl hover:shadow-yellow-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
          >
            {pricingSection.seeFullComparison.label}
          </Link>
        </div>
      </Container>
    </section>
  );
}
