import Image from "next/image";
import { HandHeart, Heart, Infinity as InfinityIcon, ShieldCheck, Sprout, Store, TreeDeciduous, Trophy, Users } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { history, intro, mission, programs, stats, statsNote, values, vision, whoWeAre, type ProgramIcon, type ValueIcon } from "@/lib/content/about";

export function Intro() {
  return (
    <Section className="pb-12 md:pb-16">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance font-serif text-display-md font-bold">
          <span className="text-leaf-deep">Transforming Lives</span> holistically through Action
        </h2>
        <p className="mt-5 text-pretty text-[17px] leading-relaxed text-ink-secondary md:text-[19px]">{intro.lead}</p>
      </Reveal>
      <RevealGroup className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-black/[0.06] ring-1 ring-black/[0.06] lg:grid-cols-4">
        {stats.map((s) => (
          <RevealItem key={s.label} className="bg-white px-6 py-8 text-center md:py-10">
            <p className="font-serif text-[40px] font-bold leading-none text-ink md:text-[48px]">{s.value}</p>
            <p className="mx-auto mt-3 max-w-[14rem] text-[14px] leading-snug text-ink-secondary">{s.label}</p>
          </RevealItem>
        ))}
      </RevealGroup>
      <p className="mt-4 text-center text-[12px] text-ink-tertiary">{statsNote}</p>
    </Section>
  );
}

export function WhoWeAre() {
  return (
    <Section id="who-we-are" className="pt-12 md:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow">Who We Are</p>
          <h2 className="mt-3 font-serif text-display-md font-bold">A Christian community-based organisation, founded in 2020</h2>
          <p className="mt-6 text-[17px] leading-relaxed text-ink-secondary">{whoWeAre}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-[28px] shadow-lift">
            <Image
              src="/images/about/collage-1.jpg"
              alt="Children of Wera at camp, with the Sycamore Royals emblem"
              width={1600}
              height={1200}
              sizes="(min-width: 1024px) 560px, 92vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function VisionMission() {
  return (
    <Section id="vision" tone="mist">
      <RevealGroup className="grid gap-5 lg:grid-cols-2">
        <RevealItem className="bg-hero relative overflow-hidden rounded-[28px] p-8 md:p-12">
          <p className="eyebrow">Our Vision</p>
          <p className="mt-6 text-balance font-serif text-[28px] font-bold leading-tight text-black md:text-[36px]">{vision}</p>
        </RevealItem>
        <RevealItem className="card p-8 md:p-12">
          <p className="eyebrow">Our Mission</p>
          <p className="mt-6 text-pretty font-serif text-[22px] leading-snug text-ink md:text-[26px]">{mission}</p>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}

const valueIcons: Record<ValueIcon, React.ComponentType<{ className?: string }>> = {
  heart: Heart,
  shield: ShieldCheck,
  trophy: Trophy,
  infinity: InfinityIcon,
  sprout: Sprout,
};

export function Values() {
  return (
    <Section id="values">
      <SectionHeading eyebrow="Our Core Values" title="What we plan, do and speak" />
      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {values.map((v) => {
          const Icon = valueIcons[v.icon];
          return (
            <RevealItem key={v.title} className="card flex flex-col p-6 transition-transform duration-500 ease-apple hover:-translate-y-1">
              <span className="grid size-11 place-items-center rounded-full bg-leaf-tint text-leaf-deep">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 font-serif text-[20px] font-bold leading-tight">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-secondary">{v.body}</p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}

const programIcons: Record<ProgramIcon, React.ComponentType<{ className?: string }>> = {
  child: HandHeart,
  community: Users,
  business: Store,
  climate: TreeDeciduous,
};

export function WhatWeDo() {
  return (
    <Section id="what-we-do" tone="mist">
      <SectionHeading
        eyebrow="What We Do"
        title="Four programme areas, one whole-person approach"
        lead="Taking a whole gospel to a whole person, for whole human flourishing."
      />
      <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
        {programs.map((p, i) => {
          const Icon = programIcons[p.icon];
          return (
            <RevealItem key={p.title} className="card group flex gap-5 p-7 md:p-9">
              <div className="flex shrink-0 flex-col items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-leaf-deep text-white transition-transform duration-500 ease-apple group-hover:scale-105">
                  <Icon className="size-6" />
                </span>
                <span className="font-serif text-[15px] font-bold text-ink-tertiary">0{i + 1}</span>
              </div>
              <div>
                <h3 className="font-serif text-[24px] font-bold leading-tight">{p.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.areas.map((a) => (
                    <li key={a} className="rounded-full bg-leaf-tint px-3 py-1 text-[13px] font-medium text-leaf-deep">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}

export function History() {
  return (
    <Section id="history">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <div className="relative overflow-hidden rounded-[28px] shadow-lift">
            <Image
              src="/images/about/history.jpg"
              alt="Stephen Okiror with children and young people of the Wera community"
              width={1080}
              height={1080}
              sizes="(min-width: 1024px) 520px, 92vw"
              className="h-auto w-full"
            />
            <span className="absolute left-5 top-5 rounded-full bg-white/85 px-4 py-2 font-serif text-[15px] font-bold tracking-[0.2em] text-ink backdrop-blur-md">
              EST. 2020
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">Our History</p>
          <h2 className="mt-3 font-serif text-display-md font-bold">A call home to Wera</h2>
          <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ink-secondary">
            {history.map((p, i) => (
              <p key={i} className={i === 0 ? "text-[19px] text-ink" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
