"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Expand } from "lucide-react";
import { useState } from "react";
import { Lightbox } from "@/components/ui/lightbox";
import { Reveal } from "@/components/ui/reveal";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Section, SectionHeading } from "@/components/ui/section";
import { gallery } from "@/lib/content/about";

const all = gallery.flatMap((c) => c.items);
const options = gallery.map((c) => ({ value: c.key, label: c.label }));

/** Community Gallery: four themes of three photos; tap any photo to open the viewer. */
export function Gallery() {
  const [key, setKey] = useState(gallery[0].key);
  const [viewing, setViewing] = useState<number | null>(null);
  const chapter = gallery.find((c) => c.key === key)!;
  const offset = all.indexOf(chapter.items[0]);

  return (
    <Section id="gallery" tone="mist">
      <SectionHeading eyebrow="Community Gallery" title="Explore our community through images and stories" />
      <Reveal className="mt-10 flex justify-center">
        <SegmentedControl
          id="gallery"
          label="Gallery themes"
          options={options}
          value={key}
          onChange={setKey}
          panelIds={Object.fromEntries(gallery.map((c) => [c.key, "gallery-panel"]))}
        />
      </Reveal>

      <div id="gallery-panel" role="tabpanel" aria-labelledby={`gallery-tab-${key}`} className="mt-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={chapter.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="font-serif text-[28px] font-bold">{chapter.title}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-ink-secondary">{chapter.body}</p>
            </div>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {chapter.items.map((item, i) => (
                <motion.li
                  key={item.src}
                  className="h-full"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.06 * i, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => setViewing(offset + i)}
                    aria-haspopup="dialog"
                    aria-label={`View photo: ${item.title}`}
                    className="card group block h-full w-full overflow-hidden text-left"
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden bg-mist">
                      <Image
                        src={item.src}
                        alt={item.caption}
                        fill
                        sizes="(min-width: 768px) 380px, 92vw"
                        className="object-cover transition-transform duration-700 ease-apple group-hover:scale-[1.05]"
                      />
                      <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/35 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <Expand aria-hidden className="size-4" />
                      </span>
                    </span>
                    <span className="block p-5">
                      <span className="block font-serif text-[19px] font-bold">{item.title}</span>
                      <span className="mt-1 block text-[14px] leading-snug text-ink-secondary">{item.caption}</span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <Lightbox items={all} index={viewing} onClose={() => setViewing(null)} />
    </Section>
  );
}
