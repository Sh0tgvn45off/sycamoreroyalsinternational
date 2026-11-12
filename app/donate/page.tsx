import type { Metadata } from "next";
import Image from "next/image";
import { ChartColumn, HeartHandshake, Mail, Phone, Receipt, ShieldCheck } from "lucide-react";
import { PaymentMethods } from "@/components/donate/payment-methods";
import { SiteFooter } from "@/components/layout/footer";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonAnchor } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { impact, intro, reasons, type ReasonIcon } from "@/lib/content/donate";
import { mailto, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Give by mobile money, PayPal or bank transfer. Every donation supports children and families in Angaro Wera, Uganda.",
  alternates: { canonical: "/donate" },
};

const reasonIcons: Record<ReasonIcon, React.ComponentType<{ className?: string }>> = {
  direct: HeartHandshake,
  secure: ShieldCheck,
  receipt: Receipt,
  transparent: ChartColumn,
};

export default function DonatePage() {
  return (
    <>
      <PageHero title="Make a Donation" subtitle="Your generosity transforms lives" />

      <Section id="methods">
        <SectionHeading title={intro.title} lead={intro.body} />
        <div className="mt-14">
          <PaymentMethods />
        </div>
      </Section>

      <Section id="impact" tone="mist">
        <SectionHeading eyebrow="Your Impact" title="What your gift can do" />
        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impact.map((item, i) => {
            const sponsor = i === impact.length - 1;
            return (
              <RevealItem key={item.title} className="h-full">
                <article className={cn("card group flex h-full flex-col overflow-hidden", sponsor && "ring-2 ring-leaf")}>
                  <div className="relative aspect-square overflow-hidden bg-mist">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 46vw, 92vw"
                      className="object-cover transition-transform duration-700 ease-apple group-hover:scale-[1.05]"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3.5 py-1.5 font-serif text-[22px] font-bold leading-none text-ink backdrop-blur-md">
                      {item.amount}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-[21px] font-bold">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-secondary">{item.body}</p>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <Section>
        <SectionHeading eyebrow="Why Your Gift Matters" title="Given with care, used with care" />
        <RevealGroup className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => {
            const Icon = reasonIcons[r.icon];
            return (
              <RevealItem key={r.title} className="text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-leaf-tint text-leaf-deep">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 font-serif text-[21px] font-bold">{r.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-ink-secondary">{r.body}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <section className="bg-hero">
        <div className="container py-20 text-center text-black md:py-24">
          <Reveal>
            <h2 className="font-serif text-display-md font-bold">Questions about giving?</h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-black/70">
              We’re happy to help with sponsorships, larger gifts or anything else.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonAnchor href={mailto("Question about giving")} variant="leaf" size="lg">
                <Mail aria-hidden className="size-[18px]" /> Email us
              </ButtonAnchor>
              <ButtonAnchor href={`tel:${site.phone.tel}`} variant="light" size="lg">
                <Phone aria-hidden className="size-[18px]" /> {site.phone.display}
              </ButtonAnchor>
            </div>
          </Reveal>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
