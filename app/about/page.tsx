import type { Metadata } from "next";
import { Approach } from "@/components/about/approach";
import { Footprint } from "@/components/about/footprint";
import { Founders } from "@/components/about/founders";
import { Gallery } from "@/components/about/gallery";
import { History, Intro, Values, VisionMission, WhatWeDo, WhoWeAre } from "@/components/about/sections";
import { SiteFooter } from "@/components/layout/footer";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCards } from "@/components/shared/contact-cards";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { intro } from "@/lib/content/about";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Our story, vision, mission, values, programmes and footprint: a Christian community-based organisation founded in 2020 by Stephen and Elizabeth Okiror in Wera, Amuria, Uganda.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero title={intro.title} subtitle={intro.tagline} />
      <Intro />
      <WhoWeAre />
      <VisionMission />
      <Values />
      <Approach />
      <Founders />
      <WhatWeDo />
      <Footprint />
      <Gallery />
      <History />
      <Section tone="mist">
        <SectionHeading eyebrow="Let’s Connect" title="Reach out to us anytime" lead="We’re here to help, and we’d love to hear from you." />
        <div className="mt-12">
          <ContactCards />
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/get-involved" variant="leaf" size="lg" chevron>
            Get involved
          </ButtonLink>
          <ButtonLink href="/donate" size="lg">
            Donate
          </ButtonLink>
        </div>
      </Section>
      <SiteFooter />
    </>
  );
}
