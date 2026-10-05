"use client";

import { m, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, amount: 0.15 } as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Fade + small upward move when scrolled into view; instant under prefers-reduced-motion. */
export function Reveal({ children, className, delay = 0, y = 18 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      data-reveal
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.55, ease, delay }}
    >
      {children}
    </m.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function RevealGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <m.div
      data-reveal
      className={className}
      variants={groupVariants}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div data-reveal className={cn(className)} variants={itemVariants}>
      {children}
    </m.div>
  );
}
