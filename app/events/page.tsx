import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, Check, MapPin } from "lucide-react";
import { ProgramsCarousel } from "@/components/events/programs-carousel";
import { SiteFooter } from "@/components/layout/footer";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { calendar, camp, intro, moments, plans } from "@/lib/content/events";
import { mailto } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events & Programs",
  description:
    "Our programmes in Wera, Amuria: educational support, discipleship, community development, leadership training, youth engagement and health, plus the annual children’s camp.",
  alternates: { canonical: "/events" },
};

/** Bento layout for the camp photos: one large, two tall, two wide. */
const tiles = ["col-span-2 row-span-2", "row-span-2", "row-span-2", "col-span-2", "col-span-2"];

export default function EventsPage() {
  return (
    <>
      <PageHero title="Our Events & Programs" subtitle="Making a difference through community action" />

      <Section className="pb-12 md:pb-16">
        <SectionHeading title={intro.title} lead={intro.body} />
        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-hidden rounded-[28px] shadow-lift">
            <Image
              src="/images/moments/crowd.jpg"
              alt="Children of Wera crowd together in an open field during a camp day"
              width={1600}
              height={720}
              sizes="(min-width: 1200px) 1136px, 92vw"
              className="h-auto w-full"
              priority
            />
          </div>
        </Reveal>
      </Section>

      <section id="programs" className="overflow-hidden py-16 md:py-24">
        <div className="container">
          <SectionHeading eyebrow="Current Programs" title="Six ways we serve, every season" align="left" />
        </div>
        <Reveal delay={0.1} className="mt-10">
          <ProgramsCarousel />
        </Reveal>
      </section>

      <Section id="camp" tone="mist">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-14">
          <Reveal>
            <p className="eyebrow">Camp</p>
            <h2 className="mt-3 font-serif text-display-md font-bold">{camp.title}</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-secondary">{camp.body}</p>
            <ul className="mt-7 grid grid-cols-2 gap-3">
              {camp.activities.map((a) => (
                <li key={a} className="flex items-center gap-2.5 text-[15px] font-medium">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-leaf-deep text-white">
                    <Check aria-hidden className="size-3.5" strokeWidth={3} />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
          <RevealGroup className="grid auto-rows-[120px] grid-cols-2 gap-3 sm:auto-rows-[150px] md:grid-cols-4">
            {moments.map((m, i) => (
              <RevealItem key={m.src} className={cn("relative overflow-hidden rounded-2xl bg-white", tiles[i])}>
                <Image src={m.src} alt={m.alt} fill sizes="(min-width: 1024px) 340px, 46vw" className="object-cover transition-transform duration-700 ease-apple hover:scale-[1.04]" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section id="calendar">
        <SectionHeading eyebrow={`${calendar.year} Calendar`} title="Gatherings in Angaro and Wera" lead={calendar.note} />
        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
          {calendar.events.map((e) => (
            <RevealItem key={e.title} className="card flex flex-col p-7">
              <div className="flex items-center gap-4">
                <div className="flex size-[68px] shrink-0 flex-col items-center justify-center rounded-2xl bg-leaf-tint text-leaf-deep">
                  <span className="font-serif text-[28px] font-bold leading-none">{e.day}</span>
                  <span className="mt-1 text-[12px] font-semibold uppercase tracking-[0.14em]">{e.month}</span>
                </div>
                <span className="rounded-full bg-black/[0.05] px-3 py-1 text-[12px] font-semibold text-ink-secondary">{calendar.year}</span>
              </div>
              <h3 className="mt-6 font-serif text-[22px] font-bold leading-tight">{e.title}</h3>
              <p className="mt-2 flex items-center gap-1.5 text-[14px] font-medium text-ink-secondary">
                <MapPin aria-hidden className="size-4 text-leaf-deep" /> {e.place}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-secondary">{e.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-10 flex justify-center">
          <ButtonAnchor href={mailto("Upcoming events")} variant="secondary" size="lg">
            <CalendarDays aria-hidden className="size-[18px]" /> Ask about upcoming events
          </ButtonAnchor>
        </Reveal>
      </Section>

      <Section id="plans" tone="mist">
        <SectionHeading eyebrow="Future Plans" title="Where we’re heading" />
        <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-2">
          {plans.map((p, i) => (
            <RevealItem key={p.term} className={cn("rounded-[28px] p-8 md:p-10", i === 0 ? "card" : "bg-hero")}>
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-secondary">{p.years}</p>
              <h3 className="mt-1 font-serif text-[30px] font-bold">{p.term}</h3>
              <ul className="mt-6 space-y-3.5">
                {p.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[16px] leading-snug">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-leaf-deep text-white">
                      <Check aria-hidden className="size-3" strokeWidth={3.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <section className="bg-hero">
        <div className="container py-20 text-center text-black md:py-28">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-balance font-serif text-display-md font-bold">Join Us at Our Next Event</h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-black/70 md:text-[19px]">
              Be part of the transformation. Whether you attend, volunteer, or support from afar, your involvement makes a real difference in our
              community.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/get-involved" variant="leaf" size="lg" chevron>
                Get Involved
              </ButtonLink>
              <ButtonLink href="/donate" size="lg">
                Support Our Work
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
