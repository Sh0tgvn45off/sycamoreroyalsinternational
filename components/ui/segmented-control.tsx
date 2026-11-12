"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  options: readonly Option<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Unique per control on the page, so the sliding pill animates within its own track. */
  id: string;
  label: string;
  className?: string;
  /** Ids of the panels each tab controls, keyed by value. */
  panelIds?: Partial<Record<T, string>>;
};

/** Apple's segmented control: a white pill that springs between options. Arrow keys move between them. */
export function SegmentedControl<T extends string>({ options, value, onChange, id, label, className, panelIds }: Props<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn("no-scrollbar inline-flex max-w-full overflow-x-auto rounded-full bg-black/[0.05] p-1", className)}
    >
      {options.map((o, i) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${o.value}`}
            aria-selected={active}
            aria-controls={panelIds?.[o.value]}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(o.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "relative shrink-0 rounded-full px-4 py-2 text-[14px] font-semibold transition-colors duration-200 sm:px-5",
              active ? "text-ink" : "text-ink-secondary hover:text-ink",
            )}
          >
            {active && (
              <motion.span
                layoutId={`${id}-pill`}
                className="absolute inset-0 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_1px_rgba(0,0,0,0.04)]"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
