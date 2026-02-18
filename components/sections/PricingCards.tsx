"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { PrismBackground } from "@/components/ui/PrismBackground";

const GRADIENTS = {
  blue: "from-blue-600 to-blue-400",
  green: "from-emerald-600 to-emerald-400",
  orange: "from-amber-500 to-orange-400",
  violet: "from-violet-600 to-purple-400",
} as const;

const CARD_HOVER = { duration: 0.2, ease: "easeInOut" as const };

type PricingCardsProps = {
  showHeading?: boolean;
};

export function PricingCards({ showHeading = true }: PricingCardsProps) {
  const { pricingSection, plans } = siteContent;

  return (
    <section className="relative overflow-hidden bg-stone-100 py-5 md:py-16 lg:py-24 transition-colors duration-300 dark:bg-stone-900" id="pricing">
      <PrismBackground />
      <Container className="relative">
        {showHeading && (
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-yellow-600 md:text-base dark:text-yellow-500">
              {pricingSection.preheadline}
            </p>
            <h2 className="mt-0.5 text-xl font-extrabold tracking-tight text-stone-900 md:mt-2 md:text-4xl lg:text-5xl dark:text-white">
              {pricingSection.headline}
            </h2>
          </div>
        )}

        <div className="mt-3 grid grid-cols-1 gap-2 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-4">
          {plans.map((plan, index) => {
            const gradient = plan.gradient ?? "blue";
            return (
              <motion.article
                key={plan.name}
                className={`flex flex-col overflow-hidden rounded-lg bg-gradient-to-br shadow-lg ${GRADIENTS[gradient]} p-2.5 text-white sm:rounded-xl sm:p-5 lg:p-4`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -2, transition: CARD_HOVER }}
              >
                <div className="flex flex-1 flex-col">
                  <h3 className="text-sm font-extrabold sm:text-xl lg:text-2xl">{plan.name}</h3>
                  <p className="mt-0.5 text-[10px] font-semibold opacity-90 sm:mt-1.5 sm:text-xs lg:text-sm">
                    vehicles starting at
                  </p>
                  <p className="flex items-baseline gap-0.5 sm:gap-1">
                    <span className="text-base font-bold sm:text-2xl lg:text-3xl">{plan.price}</span>
                    <span className="text-[10px] opacity-90 sm:text-base lg:text-lg">{plan.cadence}</span>
                  </p>
                  <p className="mt-0.5 text-[9px] italic leading-tight opacity-90 sm:text-[11px] lg:text-xs">
                    {plan.setupFee}
                  </p>
                  <ul className="mt-2 hidden space-y-1 sm:mt-4 sm:block sm:space-y-1.5 lg:mt-5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs lg:text-sm">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/#vehicles"
                    className="mt-1.5 inline-flex w-full items-center justify-center rounded bg-white/20 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur transition-colors hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:mt-4 sm:rounded-lg sm:px-3 sm:py-2.5 sm:text-xs lg:mt-5 lg:py-2 lg:text-sm"
                  >
                    View Vehicles
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
