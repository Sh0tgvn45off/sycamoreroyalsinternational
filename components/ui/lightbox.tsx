"use client";

import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap, useScrollLock } from "@/lib/hooks";

export type LightboxItem = { src: string; title: string; caption: string; width: number; height: number };

const subscribeNoop = () => () => {};

/** Full-screen photo viewer, like Photos: arrows, swipe, keyboard, and a caption underneath. */
export function Lightbox({ items, index, onClose }: { items: LightboxItem[]; index: number | null; onClose: () => void }) {
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>{index !== null && <Viewer items={items} start={index} onClose={onClose} />}</AnimatePresence>,
    document.body,
  );
}

function Viewer({ items, start, onClose }: { items: LightboxItem[]; start: number; onClose: () => void }) {
  const [[i, dir], setState] = useState<[number, number]>([start, 0]);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => onClose(), [onClose]);
  const go = useCallback((step: number) => setState(([cur]) => [(cur + step + items.length) % items.length, step]), [items.length]);

  useScrollLock(true);
  useFocusTrap(ref, true, close);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80 || info.velocity.x < -500) go(1);
    else if (info.offset.x > 80 || info.velocity.x > 500) go(-1);
  };

  const item = items[i];

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer: ${item.title}`}
      tabIndex={-1}
      className="fixed inset-0 z-[90] flex flex-col bg-black/90 text-white outline-none backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6">
        <p className="text-[13px] font-medium tabular-nums text-white/60">
          {i + 1} of {items.length}
        </p>
        <button
          type="button"
          onClick={close}
          aria-label="Close photo viewer"
          className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <X className="size-5" strokeWidth={2.25} />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 sm:px-20" onClick={(e) => e.target === e.currentTarget && close()}>
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={i}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 80, scale: d === 0 ? 0.94 : 1 }),
              center: { opacity: 1, x: 0, scale: 1 },
              exit: (d: number) => ({ opacity: 0, x: d * -80 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={onDragEnd}
            className="relative flex max-h-full w-full cursor-grab items-center justify-center active:cursor-grabbing"
          >
            <Image
              src={item.src}
              alt={`${item.title}: ${item.caption}`}
              width={item.width}
              height={item.height}
              sizes="100vw"
              draggable={false}
              className="max-h-[72svh] w-auto max-w-full select-none rounded-xl object-contain"
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute left-4 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:grid"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute right-4 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:grid"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>

      <div className="px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 text-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <p className="font-serif text-xl font-bold">{item.title}</p>
            <p className="mx-auto mt-1 max-w-xl text-[15px] text-white/70">{item.caption}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
