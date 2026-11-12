import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Light grey band, to separate neighbouring sections. */
  tone?: "white" | "mist";
};

export function Section({ id, children, className, tone = "white" }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28", tone === "mist" && "bg-mist", className)}>
      <div className="container">{children}</div>
    </section>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, lead, align = "center", className }: HeadingProps) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-balance font-serif text-display-md font-bold text-ink">{title}</h2>
      {lead && <p className="mt-5 text-pretty text-[17px] leading-relaxed text-ink-secondary md:text-[19px]">{lead}</p>}
    </Reveal>
  );
}
