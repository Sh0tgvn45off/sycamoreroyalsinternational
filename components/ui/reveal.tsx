"use client";

import { motion, type Variants } from "framer-motion";

export const appleEase = [0.25, 0.1, 0.25, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Distance in px the content rises as it fades in. */
  y?: number;
};

/** Fades and lifts content into view the first time it scrolls on screen. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: appleEase, delay }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: appleEase } },
};

/** A group whose RevealItem children animate in one after another. */
export function RevealGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.div id={id} className={className} variants={item}>
      {children}
    </motion.div>
  );
}
