"use client";

import { motion } from "framer-motion";
import { Check, HandHeart, Handshake, Heart, Mail, Megaphone, Phone, Users, Wrench } from "lucide-react";
import { useState } from "react";
import { ButtonAnchor, buttonClasses, ButtonLink, press, spring } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { Sheet } from "@/components/ui/sheet";
import { partnership, ways, type ApplicationType, type WayAction, type WayIcon } from "@/lib/content/involved";
import { mailto, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ApplicationForm } from "./application-form";

const icons: Record<WayIcon, React.ComponentType<{ className?: string }>> = {
  volunteer: Users,
  partner: Handshake,
  sponsor: Heart,
  share: Megaphone,
  pray: HandHeart,
  skills: Wrench,
};

/** The six ways to help, wired to the application form below and the partnership sheet. */
export function WaysAndForm() {
  const [type, setType] = useState<ApplicationType>("VOLUNTEER");
  const [partnerOpen, setPartnerOpen] = useState(false);

  const act = (action: WayAction) => {
    if (action.kind === "apply") {
      setType(action.type);
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
      // Move focus to the first field once the scroll has settled, for keyboard users.
      window.setTimeout(() => document.getElementById("apply-full_name")?.focus({ preventScroll: true }), 600);
    } else if (action.kind === "partner") {
      setPartnerOpen(true);
    } else if (action.kind === "share") {
      document.getElementById("share")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Section id="ways" tone="mist">
        <SectionHeading eyebrow="Ways You Can Help" title="Every hand matters. Every heart counts." />
        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ways.map((w) => {
            const Icon = icons[w.icon];
            return (
              <RevealItem key={w.title} className="h-full">
                <article
                  className={cn(
                    "card relative flex h-full flex-col p-7 transition-all duration-500 ease-apple hover:-translate-y-1 hover:shadow-lift md:p-8",
                    w.featured && "ring-2 ring-leaf",
                  )}
                >
                  {w.featured && (
                    <span className="absolute -top-3 left-7 rounded-full bg-leaf-deep px-3 py-1 text-[12px] font-bold uppercase tracking-[0.08em] text-white">
                      Most Impactful
                    </span>
                  )}
                  <span className={cn("grid size-12 place-items-center rounded-2xl", w.featured ? "bg-leaf-deep text-white" : "bg-leaf-tint text-leaf-deep")}>
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-6 font-serif text-[24px] font-bold leading-tight">{w.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-secondary">{w.body}</p>
                  <ul className="mb-7 mt-5 space-y-2">
                    {w.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-[14px] font-medium">
                        <Check aria-hidden className="size-4 shrink-0 text-leaf-deep" strokeWidth={3} />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    {w.action.kind === "link" ? (
                      <ButtonLink href={w.action.href} variant="primary" className="w-full">
                        {w.cta}
                      </ButtonLink>
                    ) : (
                      <motion.button
                        type="button"
                        onClick={() => act(w.action)}
                        whileTap={press}
                        transition={spring}
                        aria-haspopup={w.action.kind === "partner" ? "dialog" : undefined}
                        className={buttonClasses({ variant: w.featured ? "primary" : "secondary", className: "w-full" })}
                      >
                        {w.cta}
                      </motion.button>
                    )}
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <Section id="apply">
        <SectionHeading
          eyebrow="Application Form"
          title="Join the team"
          lead="Volunteer on the ground, join our prayer community, or share your professional skills. We read every application."
        />
        <Reveal delay={0.1} className="mt-12">
          <ApplicationForm type={type} onTypeChange={setType} />
        </Reveal>
      </Section>

      <Sheet open={partnerOpen} onClose={() => setPartnerOpen(false)} title={partnership.title} description="Churches, organisations and businesses">
        <div className="space-y-4 text-[16px] leading-relaxed text-ink">
          {partnership.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-2">
          {partnership.kinds.map((k) => (
            <li key={k} className="rounded-xl bg-leaf-tint px-3 py-2.5 text-[14px] font-medium text-leaf-deep">
              {k}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ButtonAnchor href={mailto("Partnership enquiry")} variant="leaf" className="flex-1">
            <Mail aria-hidden className="size-4" /> Email us
          </ButtonAnchor>
          <ButtonAnchor href={`tel:${site.phone.tel}`} variant="secondary" className="flex-1">
            <Phone aria-hidden className="size-4" /> {site.phone.display}
          </ButtonAnchor>
        </div>
      </Sheet>
    </>
  );
}
