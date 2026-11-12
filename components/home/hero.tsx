"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Transition } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { hero } from "@/lib/content/home";

/** Apple's "expo out": quick start, long gentle settle. */
const ease = [0.16, 1, 0.3, 1] as const;

/** The original slide-in from the left, with a soft focus pull. */
const slideIn = (delay: number) => ({
  initial: { opacity: 0, x: -30, filter: "blur(6px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, ease, delay } satisfies Transition,
});

/**
 * The original home hero, kept as it was: welcome line, title and mission on the left,
 * the sycamore tree rising from the bottom on the right, over the cyan-to-green gradient.
 * Now responsive, with spring physics and a gentle sway in the tree.
 */
export function HomeHero() {
  return (
    <section className="bg-hero relative flex min-h-[calc(100svh-5rem)] overflow-hidden pt-header text-black md:min-h-[calc(100svh-7.5rem)]">
      <div className="flex w-full flex-col pt-10 md:flex-row md:pb-0 md:pl-[10px] md:pr-8 md:pt-12">
        {/* Text column */}
        <div className="flex flex-col justify-center px-6 text-center md:w-1/2 md:shrink-0 md:pl-[clamp(1.5rem,13.9vw,200px)] md:pr-[10px] md:text-left">
          <motion.h2
            {...slideIn(0.15)}
            className="font-serif text-[22px] font-light uppercase italic tracking-[0.4rem] min-[400px]:text-[26px] md:text-[30px]"
          >
            {hero.welcome}
          </motion.h2>
          <motion.h1 {...slideIn(0.45)} className="font-serif text-[31px] font-bold uppercase leading-tight min-[400px]:text-[35px] md:text-[39px]">
            {hero.title}
          </motion.h1>
          <motion.p
            {...slideIn(0.75)}
            className="mx-auto mt-2 max-w-[30rem] font-corben text-[13px] uppercase leading-[1.9] md:mx-0 md:text-[14px]"
          >
            {hero.subtitle}
          </motion.p>
          <motion.div {...slideIn(1.05)} className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-3 md:justify-start md:gap-x-7">
            {hero.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group inline-flex items-center gap-0.5 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-bark md:text-[13px] md:tracking-[0.14em]"
              >
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-apple group-hover:bg-[length:100%_1px]">
                  {l.label}
                </span>
                <ChevronRight aria-hidden className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5" strokeWidth={2.5} />
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Tree column: rises from the bottom edge, then sways in the breeze */}
        <div className="mt-8 flex flex-1 items-end justify-center md:mt-0 md:w-1/2 md:shrink-0 md:justify-start md:pl-[10px]">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 15, mass: 1, delay: 1.1 }}
            className="w-[min(240px,62vw)] md:w-[min(343px,100%)]"
          >
            <motion.div
              animate={{ rotate: [0, 0.9, 0, -0.9, 0] }}
              transition={{ duration: 9, ease: "easeInOut", repeat: Infinity, delay: 2.6 }}
              style={{ transformOrigin: "50% 100%" }}
            >
              <Image
                src="/images/brand/tree.png"
                alt="The Sycamore Royals tree"
                width={700}
                height={864}
                priority
                sizes="(min-width: 768px) 343px, 240px"
                className="block h-auto w-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
