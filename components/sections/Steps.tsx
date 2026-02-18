"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { PrismBackground } from "@/components/ui/PrismBackground";

const CARD_HOVER = { duration: 0.25, ease: "easeInOut" as const };
const STAGGER = 0.08;

type StepsProps = {
  showHeading?: boolean;
};

export function Steps({ showHeading = true }: StepsProps) {
  const { stepsSection, steps } = siteContent;

  return (
    <section
      className="relative overflow-hidden bg-stone-100 py-8 md:py-16 lg:py-24 transition-colors duration-300 dark:bg-stone-900"
      id="how-it-works"
    >
      <PrismBackground />
      <Container className="relative">
        {showHeading && (
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 md:text-4xl lg:text-5xl dark:text-white">
              {stepsSection.headline}
              <span className="bg-gradient-to-br from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                {stepsSection.highlighted}
              </span>
            </h2>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-yellow-600 md:mt-2 md:text-base dark:text-yellow-500">
              {stepsSection.preheadline}
            </p>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3 md:mt-12 md:gap-6 lg:mt-16 lg:gap-8">
          {steps.map((step, index) => (
            <motion.li
              key={step.id}
              className="group flex list-none flex-col items-stretch gap-2 rounded-lg border border-stone-300 bg-stone-50 p-3 shadow-lg transition-[border-color,box-shadow] duration-200 hover:border-stone-400 hover:shadow-xl md:flex-row md:items-start md:gap-6 md:rounded-xl md:p-6 lg:gap-8 lg:p-8 dark:border-stone-700/60 dark:bg-stone-800/80 dark:hover:border-stone-600 dark:hover:shadow-black/20"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * STAGGER }}
              whileHover={{ y: -4, transition: CARD_HOVER }}
            >
              <div className="relative h-14 w-full shrink-0 overflow-hidden rounded-md bg-stone-200 md:h-24 md:w-28 md:rounded-lg lg:h-28 lg:w-36 dark:bg-stone-700">
                <motion.div
                  className="relative h-full w-full"
                  whileHover={{ scale: 1.05 }}
                  transition={CARD_HOVER}
                >
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 112px"
                  />
                </motion.div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wide text-yellow-600 md:text-sm dark:text-yellow-500">
                  Step {index + 1}
                </p>
                <span className="mt-0.5 block h-px w-8 bg-stone-500 md:mt-1 md:w-12 dark:bg-stone-600" aria-hidden />
                <h3 className="mt-1 text-sm font-bold leading-snug text-stone-900 md:mt-3 md:text-lg lg:text-xl dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-1 line-clamp-3 text-[11px] leading-snug text-stone-600 md:mt-2 md:line-clamp-none md:text-sm lg:text-base dark:text-stone-400">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </div>
      </Container>
    </section>
  );
}
