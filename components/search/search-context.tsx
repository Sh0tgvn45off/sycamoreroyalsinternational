"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type SearchState = { open: boolean; show: () => void; hide: () => void };

const SearchContext = createContext<SearchState | null>(null);

/** Holds the Spotlight-style search overlay's open state, and listens for ⌘K / Ctrl+K and "/". */
export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(() => ({ open, show, hide }), [open, show, hide]);
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside SearchProvider");
  return ctx;
}
