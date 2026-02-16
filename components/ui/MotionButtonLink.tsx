"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { motion } from "framer-motion";

type MotionButtonLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
};

export function MotionButtonLink({
  children,
  className = "",
  variant = "primary",
  ...props
}: MotionButtonLinkProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600";

  const variants = {
    primary: "bg-sky-600 text-white hover:bg-sky-700",
    secondary:
      "border border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50",
    ghost: "text-white/90 hover:text-white",
  };

  return (
    <motion.span whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
      <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
      </Link>
    </motion.span>
  );
}
