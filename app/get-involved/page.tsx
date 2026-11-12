import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { ShareButtons } from "@/components/involved/share";
import { WaysAndForm } from "@/components/involved/ways-and-form";
import { SiteFooter } from "@/components/layout/footer";
import { PageHero } from "@/components/layout/page-hero";
import { LinkedInIcon } from "@/components/ui/brand-icons";
import { ButtonAnchor } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { founders } from "@/lib/content/about";
import { intro } from "@/lib/content/involved";
import { mailto, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Volunteer in Angaro Wera, partner with us, sponsor a child, pray with us or share your skills. Every hand matters; every heart counts.",
  alternates: { canonical: "/get-involved" },
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero title="Get Involved" subtitle="Join us in transforming lives and building community" />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="font-serif text-display-md font-bold">{intro.title}</h2>
            <p className="mt-6 text-[19px] leading-relaxed text-ink-secondary">{intro.body}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[28px] shadow-lift">
              <Image
                src="/images/about/collage-2.jpg"
                alt="Children and families of Wera at a Sycamore Royals gathering"
                width={1600}
                height={1200}
                sizes="(min-width: 1024px) 560px, 92vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <WaysAndForm />

      <Section id="contact" tone="mist">
        <SectionHeading eyebrow="Contact" title="We’d love to hear from you" />
        <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3">
          <RevealItem className="card p-7 lg:col-span-2">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-tertiary">Contact the Founders</h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {founders.map((f) => (
                <li key={f.name} className="flex items-center gap-4 rounded-2xl bg-mist p-4">
                  <Image src={f.photo} alt="" width={640} height={640} sizes="64px" className="size-16 shrink-0 rounded-full object-cover" />
                  <div className="min-w-0">
                    <p className="font-serif text-[19px] font-bold leading-tight">{f.name}</p>
                    <p className="mt-0.5 text-[13px] text-ink-secondary">{f.role}</p>
                    <div className="mt-2 flex gap-2">
                      <a
                        href={f.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${f.name} on LinkedIn`}
                        className="grid size-8 place-items-center rounded-full bg-white text-[#0A66C2] ring-1 ring-black/[0.06] transition-transform hover:scale-105"
                      >
                        <LinkedInIcon className="size-3.5" />
                      </a>
                      <a
                        href={mailto(`For ${f.name}`)}
                        aria-label={`Email ${f.name}`}
                        className="grid size-8 place-items-center rounded-full bg-white text-ink ring-1 ring-black/[0.06] transition-transform hover:scale-105"
                      >
                        <Mail className="size-3.5" />
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </RevealItem>
          <RevealItem className="card flex flex-col p-7">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-tertiary">Visit Us</h3>
            <p className="mt-5 flex gap-3 text-[16px] leading-relaxed">
              <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-leaf-deep" />
              <span>
                Sycamore Royals International
                <br />
                {site.address.lines[0]}
                <br />
                {site.address.lines[1]}, East Africa
              </span>
            </p>
            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              <ButtonAnchor href={site.address.maps} external variant="secondary" size="sm">
                Open in Maps
              </ButtonAnchor>
              <ButtonAnchor href={mailto("General enquiry")} variant="leaf" size="sm">
                Email Us
              </ButtonAnchor>
            </div>
          </RevealItem>
        </RevealGroup>
      </Section>

      <Section id="share">
        <SectionHeading
          eyebrow="Spread the Word"
          title="Help us spread the word"
          lead="Share our mission with your network. Every share brings us one step closer to transforming more lives."
        />
        <Reveal delay={0.1} className="mt-10">
          <ShareButtons fallbackUrl={site.url} />
        </Reveal>
      </Section>
      <SiteFooter />
    </>
  );
}
