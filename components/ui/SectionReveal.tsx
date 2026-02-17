"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { scrollRevealTransition, prefersReducedMotion } from "@/lib/motion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
};

export function SectionReveal({
  children,
  className = "",
  y = 12,
  delay = 0,
}: SectionRevealProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    setReduceMotion(prefersReducedMotion());
  }, []);

  const transition = reduceMotion
    ? { duration: 0, delay: 0 }
    : { ...scrollRevealTransition, delay };
  const initial = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y };
  const animate = reduceMotion ? undefined : { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate ?? { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
