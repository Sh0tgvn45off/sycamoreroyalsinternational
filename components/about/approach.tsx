"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Section, SectionHeading } from "@/components/ui/section";
import { approach, type ApproachKey } from "@/lib/content/about";

const options = approach.map((a) => ({ value: a.key, label: a.label }));

/** Our Approach: four facets behind one segmented control, crossfading text and photo. */
export function Approach() {
  const [key, setKey] = useState<ApproachKey>("implementation");
  const current = approach.find((a) => a.key === key)!;

  return (
    <Section id="approach">
      <SectionHeading eyebrow="Our Approach" title="Facilitative, like a biblical sycamore tree" />
      <Reveal className="mt-10 flex justify-center">
        <SegmentedControl
          id="approach"
          label="Our approach"
          options={options}
          value={key}
          onChange={setKey}
          panelIds={Object.fromEntries(approach.map((a) => [a.key, "approach-panel"]))}
        />
      </Reveal>
      <Reveal delay={0.1}>
        <div
          id="approach-panel"
          role="tabpanel"
          aria-labelledby={`approach-tab-${key}`}
          className="card mt-8 grid overflow-hidden lg:grid-cols-2"
        >
          <div className="relative aspect-[4/3] bg-mist lg:aspect-auto lg:min-h-[420px]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={current.key}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Image src={current.image.src} alt={current.image.alt} fill sizes="(min-width: 1024px) 600px, 92vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center p-8 md:p-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-serif text-[30px] font-bold">{current.label}</h3>
                <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-ink-secondary">
                  {current.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
