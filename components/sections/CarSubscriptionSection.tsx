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
    <section className="relative overflow-hidden bg-stone-950 py-16 lg:py-24 transition-colors duration-300 dark:bg-stone-950">
      <PrismBackground />
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-white/90 md:text-base">
            {carSubscriptionSection.preheadline}
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
            <span className="text-stone-200">
              {carSubscriptionSection.headline}
            </span>
            <span className="bg-gradient-to-br from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              {carSubscriptionSection.headlineHighlight}
            </span>
          </h2>
          <p className="mt-3 text-lg text-white/95">
            {carSubscriptionSection.subtitle}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl space-y-6 lg:mt-16">
          {carSubscriptionSection.cards.map((card, index) => (
            <motion.article
              key={card.id}
              className="rounded-xl border border-stone-600/50 bg-stone-800/90 p-6 shadow-xl shadow-black/30 backdrop-blur-sm dark:border-stone-600/50 dark:bg-stone-800/90"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * STAGGER }}
            >
              <h3 className="text-xl font-bold text-white md:text-2xl">
                {card.title}
                {card.highlightVariant === "white" ? (
                  <span className="font-bold text-white">
                    {card.highlighted}
                  </span>
                ) : (
                  <span className="bg-gradient-to-br from-yellow-400 to-yellow-500 bg-clip-text font-bold text-transparent">
                    {card.highlighted}
                  </span>
                )}
                {card.titleSuffix}
              </h3>
              <div className="mt-4 space-y-4">
                {card.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-white/90 md:text-base"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
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
