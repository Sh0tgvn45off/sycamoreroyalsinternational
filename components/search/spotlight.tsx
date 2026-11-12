"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CornerDownLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useDeferredValue, useId, useMemo, useRef, useState } from "react";
import { useFocusTrap, useScrollLock } from "@/lib/hooks";
import { searchIndex, type SearchEntry } from "@/lib/search-index";
import { cn } from "@/lib/utils";
import { useSearch } from "./search-context";

const suggestions: SearchEntry[] = [
  "Make a Donation",
  "Sponsor a Child",
  "Volunteer Your Time",
  "Our History",
  "The Annual Children’s Camp",
  "Contact us",
]
  .map((t) => searchIndex.find((e) => e.title === t))
  .filter((e): e is SearchEntry => Boolean(e));

const normalise = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, "");

/** Ranks entries that contain every word typed; title matches first. */
function find(query: string): SearchEntry[] {
  const words = normalise(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return searchIndex
    .map((entry) => {
      const title = normalise(entry.title);
      const hay = `${title} ${normalise(entry.page)} ${normalise(entry.text)}`;
      if (!words.every((w) => hay.includes(w))) return null;
      const score = words.reduce((s, w) => s + (title.startsWith(w) ? 4 : title.includes(w) ? 2 : 0), 0);
      return { entry, score };
    })
    .filter((r): r is { entry: SearchEntry; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => r.entry);
}

/** A short excerpt of the text around the first matching word. */
function excerpt(text: string, query: string) {
  const word = normalise(query).split(/\s+/).find(Boolean);
  const i = word ? normalise(text).indexOf(word) : -1;
  if (i < 0) return text.length > 110 ? `${text.slice(0, 110).trimEnd()}…` : text;
  const start = Math.max(0, i - 40);
  const out = text.slice(start, start + 120).trim();
  return `${start > 0 ? "…" : ""}${out}${start + 120 < text.length ? "…" : ""}`;
}

/** Spotlight-style search: frosted panel, instant results, arrow keys and Enter. */
export function Spotlight() {
  const { open, hide } = useSearch();
  return <AnimatePresence>{open && <Panel onClose={hide} />}</AnimatePresence>;
}

function Panel({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const deferred = useDeferredValue(query);
  const panel = useRef<HTMLDivElement>(null);
  const listId = useId();

  const results = useMemo(() => (deferred.trim() ? find(deferred) : suggestions), [deferred]);
  const close = useCallback(() => onClose(), [onClose]);
  useScrollLock(true);
  useFocusTrap(panel, true, close);

  const go = (entry: SearchEntry | undefined) => {
    if (!entry) return;
    close();
    router.push(entry.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex justify-center px-4 pt-[12vh]">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-black/35 backdrop-blur-[6px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={close}
      />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Search Sycamore Royals"
        tabIndex={-1}
        className="relative h-fit w-full max-w-xl overflow-hidden rounded-[22px] bg-white/85 shadow-sheet outline-none ring-1 ring-black/[0.08] backdrop-blur-2xl"
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: -6 }}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
      >
        <div className="flex items-center gap-3 border-b border-black/[0.07] px-5">
          <Search aria-hidden className="size-5 shrink-0 text-ink-tertiary" strokeWidth={2.25} />
          <input
            data-autofocus
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search Sycamore Royals"
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
            autoComplete="off"
            spellCheck={false}
            className="h-16 w-full bg-transparent text-[19px] text-ink placeholder:text-ink-tertiary focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          <kbd className="hidden shrink-0 rounded-md bg-black/[0.06] px-2 py-1 text-[11px] font-semibold text-ink-secondary sm:block">esc</kbd>
        </div>

        <div className="max-h-[min(60vh,440px)] overflow-y-auto p-2">
          <p className="px-3 pb-1.5 pt-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-tertiary">
            {query.trim() ? (results.length ? "Results" : "No results") : "Suggestions"}
          </p>
          {query.trim() && !results.length && (
            <p className="px-3 pb-4 text-[15px] text-ink-secondary">
              Nothing matches “{query.trim()}”. Try “volunteer”, “camp” or “mobile money”.
            </p>
          )}
          <ul id={listId} role="listbox" aria-label="Search results">
            {results.map((entry, i) => (
              <li
                key={`${entry.href}-${entry.title}`}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => go(entry)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-100",
                  i === active ? "bg-leaf-deep text-white" : "text-ink",
                )}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold">{entry.title}</p>
                  <p className={cn("truncate text-[13px]", i === active ? "text-white/80" : "text-ink-secondary")}>
                    <span className="font-medium">{entry.page}</span>
                    {query.trim() && <> · {excerpt(entry.text, query)}</>}
                  </p>
                </div>
                {i === active ? (
                  <CornerDownLeft aria-hidden className="size-4 shrink-0 opacity-80" />
                ) : (
                  <ArrowRight aria-hidden className="size-4 shrink-0 text-ink-tertiary" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
