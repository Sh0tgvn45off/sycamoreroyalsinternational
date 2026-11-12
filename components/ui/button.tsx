"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { forwardRef, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "leaf" | "secondary" | "light" | "text";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors duration-200 ease-apple disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // The site's DONATE brown.
  primary: "bg-donate text-white hover:bg-donate-dark",
  leaf: "bg-leaf-deep text-white hover:bg-leaf-dark",
  secondary: "bg-black/[0.05] text-ink hover:bg-black/[0.09]",
  light: "bg-white text-ink shadow-sm ring-1 ring-black/[0.06] hover:bg-white/90",
  text: "rounded-md px-0 text-leaf-deep hover:text-leaf-dark",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-7 text-base",
};

/** Apple-style press: a quick spring down to 96%. */
export const press = { scale: 0.96 };
export const spring = { type: "spring", stiffness: 500, damping: 30, mass: 0.6 } as const;

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string }) {
  return cn(base, variants[variant], variant === "text" ? "h-auto" : sizes[size], className);
}

const MotionLink = motion.create(Link);

type ButtonLinkProps = Omit<ComponentProps<typeof MotionLink>, "className" | "children"> & {
  children?: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Adds an Apple-style trailing chevron. */
  chevron?: boolean;
};

export function ButtonLink({ variant = "primary", size = "md", className, chevron, children, ...props }: ButtonLinkProps) {
  return (
    <MotionLink whileTap={press} transition={spring} className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      {chevron && <ChevronRight aria-hidden className="-ml-1 size-4" strokeWidth={2.25} />}
    </MotionLink>
  );
}

type AnchorProps = Omit<HTMLMotionProps<"a">, "className" | "children"> & {
  children?: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Opens in a new tab (for sites other than ours). */
  external?: boolean;
};

/** Same look as ButtonLink, for mailto:, tel: and other sites. */
export function ButtonAnchor({ variant = "primary", size = "md", className, external, children, ...props }: AnchorProps) {
  return (
    <motion.a
      whileTap={press}
      transition={spring}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {children}
    </motion.a>
  );
}

type ButtonProps = Omit<HTMLMotionProps<"button">, "className" | "children"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, type = "button", children, ...props },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      type={type}
      whileTap={props.disabled ? undefined : press}
      transition={spring}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {children}
    </motion.button>
  );
});
