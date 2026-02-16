"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
};

export function SectionReveal({
  children,
  className = "",
  y = 20,
  delay = 0,
}: SectionRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
