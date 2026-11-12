"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSearch } from "@/components/search/search-context";
import { press, spring } from "@/components/ui/button";
import { useFocusTrap, useScrollLock } from "@/lib/hooks";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Brand } from "./brand";

const MotionLink = motion.create(Link);

/** The orange magnifier from the original header, redrawn as a crisp vector. */
function SearchGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <circle cx="13.5" cy="13.5" r="9.5" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M20.6 20.6 28 28" stroke="currentColor" strokeWidth="4.6" strokeLinecap="round" />
    </svg>
  );
}

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export function Header() {
  const pathname = usePathname();
  const { show: openSearch } = useSearch();
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the phone menu whenever the page changes.
  useEffect(() => setMenuOpen(false), [pathname]);
  useScrollLock(menuOpen);
  useFocusTrap(menuRef, menuOpen, () => setMenuOpen(false));

  const pill = hovered ?? nav.find((n) => isActive(pathname, n.href))?.href ?? null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-header">
      <div className="mx-auto flex h-header max-w-[1200px] items-center justify-between gap-4 px-4">
        <Brand onNavigate={() => setMenuOpen(false)} />

        {/* Desktop navigation: a soft pill slides to the link under the pointer, resting on the current page. */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex xl:gap-2" onMouseLeave={() => setHovered(null)}>
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onMouseEnter={() => setHovered(item.href)}
                onFocus={() => setHovered(item.href)}
                onBlur={() => setHovered(null)}
                className="relative rounded-md px-3.5 py-[0.6rem] text-[16px] uppercase text-black xl:px-[1.2rem]"
              >
                {pill === item.href && (
                  <motion.span
                    layoutId="nav-pill"
                    aria-hidden
                    className="absolute inset-0 rounded-md border border-black/[0.12] bg-black/[0.07]"
                    transition={{ type: "spring", stiffness: 520, damping: 40 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
          <MotionLink
            href="/donate"
            aria-current={pathname.startsWith("/donate") ? "page" : undefined}
            whileHover={{ scale: 1.04 }}
            whileTap={press}
            transition={spring}
            className="ml-1 rounded-md bg-donate px-[1.2rem] py-[0.6rem] text-[16px] font-bold uppercase text-white transition-colors duration-300 hover:bg-donate-hover"
          >
            Donate
          </MotionLink>
        </nav>

        <div className="flex items-center gap-1 lg:gap-0">
          <motion.button
            type="button"
            onClick={openSearch}
            aria-label="Search the site"
            aria-keyshortcuts="Control+K Meta+K"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            transition={spring}
            className="grid size-11 place-items-center rounded-full text-spark lg:ml-4"
          >
            <SearchGlyph className="size-[26px] lg:size-[34px]" />
          </motion.button>

          {/* Phone menu button: two bars that morph into a close mark */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="phone-menu"
            className="relative grid size-11 place-items-center rounded-full lg:hidden"
          >
            <motion.span
              className="absolute h-[2px] w-[22px] rounded-full bg-black"
              animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={spring}
            />
            <motion.span
              className="absolute h-[2px] w-[22px] rounded-full bg-black"
              animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={spring}
            />
          </button>
        </div>
      </div>

      {/* Phone menu: a frosted sheet that drops from the header, links cascading in */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="phone-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            tabIndex={-1}
            className="fixed inset-x-0 bottom-0 top-header overflow-y-auto bg-white/90 outline-none backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            transition={{ duration: 0.25 }}
          >
            <motion.nav
              aria-label="Main"
              className="container flex flex-col pb-10 pt-6"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } } }}
            >
              {[...nav, { href: "/donate", label: "Donate" }].map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <motion.div
                    key={item.href}
                    variants={{ hidden: { opacity: 0, y: -10 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between border-b border-hairline py-4 text-[28px] font-semibold tracking-tight",
                        active ? "text-ink" : "text-ink/75",
                      )}
                    >
                      {item.label}
                      {active && <span className="size-2 rounded-full bg-leaf" aria-hidden />}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                variants={{ hidden: { opacity: 0, y: -10 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.35 }}
                className="mt-8"
              >
                <MotionLink
                  href="/donate"
                  onClick={() => setMenuOpen(false)}
                  whileTap={press}
                  transition={spring}
                  className="flex h-12 items-center justify-center rounded-full bg-donate text-[17px] font-bold uppercase tracking-wide text-white"
                >
                  Donate
                </MotionLink>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
