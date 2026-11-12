"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { press, spring } from "./button";

/** Copies a value and confirms with a checkmark, like iOS. */
export function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard blocked (old browser or insecure context): select-and-copy is still possible by hand.
    }
  };

  return (
    <motion.button
      type="button"
      onClick={copy}
      whileTap={press}
      transition={spring}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold transition-colors duration-200",
        copied ? "bg-leaf-tint text-leaf-deep" : "bg-black/[0.05] text-ink hover:bg-black/[0.09]",
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? "done" : "copy"}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.18 }}
          className="inline-flex items-center gap-1.5"
        >
          {copied ? <Check aria-hidden className="size-3.5" strokeWidth={3} /> : <Copy aria-hidden className="size-3.5" strokeWidth={2.25} />}
          {copied ? "Copied" : "Copy"}
        </motion.span>
      </AnimatePresence>
      <span role="status" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </motion.button>
  );
}
