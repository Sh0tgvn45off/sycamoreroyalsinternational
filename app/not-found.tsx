import Image from "next/image";
import { HomeFooter } from "@/components/layout/footer";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <section className="bg-hero flex min-h-[calc(100svh-5rem)] items-center pt-header text-black md:min-h-[calc(100svh-7.5rem)]">
        <div className="container flex flex-col items-center py-16 text-center">
          <Image src="/images/brand/tree.png" alt="" width={700} height={864} className="h-auto w-28 opacity-90" sizes="112px" />
          <p className="mt-8 font-serif text-[22px] italic tracking-[0.3rem]">PAGE NOT FOUND</p>
          <h1 className="mt-2 font-serif text-display-md font-bold">This branch doesn’t lead anywhere.</h1>
          <p className="mt-4 max-w-md text-[17px] text-black/70">The page may have moved when our new site launched. Let’s get you back on track.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/" variant="leaf" size="lg">
              Go home
            </ButtonLink>
            <ButtonLink href="/about" variant="light" size="lg" chevron>
              About us
            </ButtonLink>
          </div>
        </div>
      </section>
      <HomeFooter />
    </>
  );
}
