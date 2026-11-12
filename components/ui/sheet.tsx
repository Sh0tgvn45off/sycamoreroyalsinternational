"use client";

import { AnimatePresence, motion, useDragControls, type PanInfo } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap, useMediaQuery, useScrollLock } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type SheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Short line under the title. */
  description?: string;
  /** Optional artwork above the title (an icon tile, a photo). */
  media?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const subscribeNoop = () => () => {};

/**
 * Apple-style modal. A bottom sheet with a grabber on phones (drag down to dismiss),
 * a centred card on larger screens. Frosted backdrop, focus trap, Escape to close.
 */
export function Sheet({ open, onClose, title, description, media, children, className }: SheetProps) {
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const phone = useMediaQuery("(max-width: 639px)");
  const panel = useRef<HTMLDivElement>(null);
  const drag = useDragControls();
  const titleId = useId();
  const descId = useId();

  const close = useCallback(() => onClose(), [onClose]);
  useScrollLock(open);
  useFocusTrap(panel, open, close);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 110 || info.velocity.y > 600) close();
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-black/40 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descId : undefined}
            tabIndex={-1}
            className={cn(
              "relative flex max-h-[92svh] w-full flex-col overflow-hidden bg-white shadow-sheet outline-none",
              "rounded-t-[28px] sm:max-w-lg sm:rounded-[28px]",
              className,
            )}
            initial={phone ? { y: "100%" } : { opacity: 0, scale: 0.94, y: 12 }}
            animate={phone ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={phone ? { y: "100%" } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 380, damping: 36, mass: 0.9 }}
            drag={phone ? "y" : false}
            dragControls={drag}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.7 }}
            onDragEnd={onDragEnd}
          >
            {/* Grabber: drag here to dismiss on phones */}
            <div
              className="flex shrink-0 touch-none justify-center pb-1 pt-2.5 sm:hidden"
              onPointerDown={(e) => drag.start(e)}
            >
              <span className="h-[5px] w-10 rounded-full bg-black/15" />
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid size-8 place-items-center rounded-full bg-black/[0.06] text-ink-secondary transition-colors hover:bg-black/10 hover:text-ink"
            >
              <X className="size-4" strokeWidth={2.5} />
            </button>
            <div className="overflow-y-auto overscroll-contain px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-4 sm:px-8 sm:pb-8 sm:pt-8">
              {media && <div className="mb-5">{media}</div>}
              <h2 id={titleId} className="pr-10 font-serif text-[26px] font-bold leading-tight text-ink">
                {title}
              </h2>
              {description && (
                <p id={descId} className="mt-2 text-[15px] leading-relaxed text-ink-secondary">
                  {description}
                </p>
              )}
              <div className="mt-6">{children}</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
