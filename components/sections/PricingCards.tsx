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

const CARD_HOVER = { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] };

type PricingCardsProps = {
  showHeading?: boolean;
};

export function PricingCards({ showHeading = true }: PricingCardsProps) {
  const { pricingSection, plans } = siteContent;

  return (
    <section className="relative overflow-hidden bg-stone-100 py-16 lg:py-24 transition-colors duration-300 dark:bg-stone-900" id="pricing">
      <PrismBackground variant="dark" />
      <Container className="relative">
        {showHeading && (
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-yellow-600 md:text-base dark:text-yellow-500">
              {pricingSection.preheadline}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 md:text-4xl lg:text-5xl dark:text-white">
              {pricingSection.headline}
            </h2>
          </div>
        )}

        <div className="no-scrollbar mt-10 flex gap-4 overflow-x-auto pb-4 scroll-smooth lg:mt-16 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:pb-0 [scroll-snap-type:x_mandatory]">
          {plans.map((plan, index) => {
            const gradient = plan.gradient ?? "blue";
            return (
              <motion.article
                key={plan.name}
                className={`flex min-w-[240px] shrink-0 flex-col overflow-hidden rounded-xl bg-gradient-to-br shadow-lg [scroll-snap-align:center] sm:min-w-[260px] lg:min-w-0 ${GRADIENTS[gradient]} p-4 text-white sm:p-5 lg:p-4`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -2, transition: CARD_HOVER }}
              >
                <div className="flex flex-1 flex-col">
                  <h3 className="text-xl font-extrabold lg:text-2xl">{plan.name}</h3>
                  <p className="mt-1.5 text-xs font-semibold opacity-90 lg:text-sm">
                    vehicles starting at
                  </p>
                  <p className="mt-0.5 flex items-baseline gap-1">
                    <span className="text-2xl font-bold lg:text-3xl">{plan.price}</span>
                    <span className="text-base opacity-90 lg:text-lg">{plan.cadence}</span>
                  </p>
                  <p className="mt-0.5 text-[11px] italic opacity-90 lg:text-xs">
                    {plan.setupFee}
                  </p>
                  <ul className="mt-4 space-y-1.5 lg:mt-5">
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
                    className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-white/20 px-3 py-2.5 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent lg:mt-5 lg:py-2 lg:text-sm"
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
