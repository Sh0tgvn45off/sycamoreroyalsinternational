"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/** The inner pages' gradient band, as on the original: bold serif title, italic line beneath. */
export function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-hero relative overflow-hidden pt-header text-black">
      <div className="container flex min-h-[280px] flex-col items-center justify-center py-16 text-center md:min-h-[360px] md:py-20">
        <motion.h1
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease }}
          className="max-w-4xl text-balance font-serif text-display-lg font-bold uppercase"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="mt-4 text-[18px] italic md:text-[20px]"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
