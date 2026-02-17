"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/ui/Container";
import { PrismBackground } from "@/components/ui/PrismBackground";
import { accordionTransition } from "@/lib/motion";

type FAQAccordionProps = {
  showHeading?: boolean;
};

export function FAQAccordion({ showHeading = true }: FAQAccordionProps) {
  const { faqSection, faqs } = siteContent;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const half = Math.ceil(faqs.length / 2);
  const leftCol = faqs.slice(0, half);
  const rightCol = faqs.slice(half);

  return (
    <section className="relative overflow-hidden bg-stone-100 py-16 lg:py-24 transition-colors duration-300 dark:bg-stone-900" id="faq">
      <PrismBackground />
      <Container className="relative max-w-6xl">
        {showHeading && (
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-stone-900 md:text-4xl lg:text-5xl dark:text-white">
              {faqSection.headline}
              <span className="bg-gradient-to-br from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                {faqSection.highlighted}
              </span>
            </h2>
          </div>
        )}

        <div className="mt-10 grid gap-4 lg:mt-16 lg:grid-cols-2 lg:gap-6">
          {[leftCol, rightCol].map((column, colIndex) => (
            <div key={colIndex} className="space-y-1 lg:space-y-2">
              {column.map((faq, rowIndex) => {
                const index = colIndex * half + rowIndex;
                const isOpen = openIndex === index;
                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-lg border border-stone-300 bg-stone-50 transition-colors hover:border-stone-400 hover:bg-stone-100 dark:border-stone-700/60 dark:bg-stone-800/60 dark:hover:border-stone-600 dark:hover:bg-stone-800/80"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-4 text-left md:px-5 md:py-5"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      id={`faq-question-${index}`}
                    >
                      <span
                        className={`font-medium text-stone-900 dark:text-white ${faq.question.startsWith("How is membership at Zipsters different") ? "tracking-tighter text-[0.9375rem] md:text-base" : ""}`}
                      >
                        {faq.question}
                      </span>
                      <motion.span
                        className="shrink-0 text-stone-400"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={accordionTransition}
                        aria-hidden
                      >
                        <svg
                          className="h-5 w-5 md:h-6 md:w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${index}`}
                          role="region"
                          aria-labelledby={`faq-question-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={accordionTransition}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-stone-200 bg-stone-100 px-4 py-4 text-sm leading-relaxed text-stone-700 md:px-5 md:py-5 dark:border-stone-700/60 dark:bg-stone-900/80 dark:text-stone-300">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
