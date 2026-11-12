"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Mail } from "lucide-react";
import { useState } from "react";
import { LinkedInIcon } from "@/components/ui/brand-icons";
import { ButtonAnchor, press, spring } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { Sheet } from "@/components/ui/sheet";
import { founders, type Founder } from "@/lib/content/about";
import { mailto } from "@/lib/site";

/** Meet the founders: two portraits; each opens a sheet with the full story and ways to connect. */
export function Founders() {
  const [open, setOpen] = useState<Founder | null>(null);

  return (
    <Section id="founders" tone="mist">
      <SectionHeading eyebrow="Founders" title="Meet Stephen and Elizabeth" />
      <RevealGroup className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
        {founders.map((f) => (
          <RevealItem key={f.name}>
            <motion.button
              type="button"
              onClick={() => setOpen(f)}
              whileTap={press}
              transition={spring}
              aria-haspopup="dialog"
              className="card group flex h-full w-full flex-col items-center p-8 text-center transition-shadow duration-500 ease-apple hover:shadow-lift md:p-10"
            >
              <span className="bg-hero relative block size-40 overflow-hidden rounded-full p-1.5 md:size-44">
                <Image
                  src={f.photo}
                  alt={`Portrait of ${f.name}`}
                  width={640}
                  height={640}
                  sizes="176px"
                  className="size-full rounded-full object-cover transition-transform duration-700 ease-apple group-hover:scale-[1.04]"
                />
              </span>
              <span className="mt-6 block font-serif text-[26px] font-bold">Meet {f.short}</span>
              <span className="mt-1 block text-[13px] font-semibold uppercase tracking-[0.12em] text-leaf-deep">{f.role}</span>
              <span className="mt-4 block text-[15px] leading-relaxed text-ink-secondary">{f.summary}</span>
              <span className="mt-6 inline-flex items-center gap-0.5 text-[15px] font-semibold text-leaf-deep">
                Read {f.short}’s story
                <ChevronRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </motion.button>
          </RevealItem>
        ))}
      </RevealGroup>

      <Sheet
        open={open !== null}
        onClose={() => setOpen(null)}
        title={open?.name ?? ""}
        description={open?.role}
        media={
          open && (
            <span className="bg-hero block size-24 overflow-hidden rounded-full p-1">
              <Image src={open.photo} alt="" width={640} height={640} sizes="96px" className="size-full rounded-full object-cover" />
            </span>
          )
        }
      >
        {open && (
          <>
            <p className="text-[16px] leading-relaxed text-ink">{open.bio}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonAnchor href={open.linkedin} external variant="leaf" className="flex-1">
                <LinkedInIcon className="size-4" /> Connect on LinkedIn
              </ButtonAnchor>
              <ButtonAnchor href={mailto(`For ${open.name}`)} variant="secondary" className="flex-1">
                <Mail aria-hidden className="size-4" /> Email
              </ButtonAnchor>
            </div>
          </>
        )}
      </Sheet>
    </Section>
  );
}
