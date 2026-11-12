"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { spring } from "@/components/ui/button";
import { programs } from "@/lib/content/events";
import { cn } from "@/lib/utils";

/** Apple-style card shelf: scroll-snapping cards with round arrow buttons. */
export function ProgramsCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: "smooth" });
  };

  return (
    <div>
      <ul
        ref={track}
        onScroll={update}
        aria-label="Current programs"
        className="no-scrollbar -my-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-6 [scroll-padding-inline:max(1.25rem,calc((100vw-1200px)/2+2rem))] [padding-inline:max(1.25rem,calc((100vw-1200px)/2+2rem))]"
      >
        {programs.map((p) => (
          <li key={p.title} className="w-[82vw] max-w-[360px] shrink-0 snap-start">
            <article className="card group flex h-full flex-col overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="360px"
                  className="object-cover transition-transform duration-700 ease-apple group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-[22px] font-bold">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-secondary">{p.body}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <div className="container mt-6 flex justify-end gap-3">
        {([-1, 1] as const).map((dir) => {
          const disabled = dir === -1 ? edges.start : edges.end;
          const Icon = dir === -1 ? ChevronLeft : ChevronRight;
          return (
            <motion.button
              key={dir}
              type="button"
              onClick={() => scroll(dir)}
              disabled={disabled}
              whileTap={disabled ? undefined : { scale: 0.9 }}
              transition={spring}
              aria-label={dir === -1 ? "Previous programs" : "Next programs"}
              className={cn(
                "grid size-11 place-items-center rounded-full bg-black/[0.06] text-ink transition-colors duration-200 hover:bg-black/10",
                disabled && "cursor-default opacity-35 hover:bg-black/[0.06]",
              )}
            >
              <Icon className="size-5" strokeWidth={2.25} />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
