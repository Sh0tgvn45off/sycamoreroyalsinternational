import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { nav, site } from "@/lib/site";

const year = new Date().getFullYear();

function Copyright() {
  return <p className="text-[0.95rem] text-black/80">&copy; {year} Sycamore Royals International. All Rights Reserved.</p>;
}

/** The home page's single-line footer, as on the original. */
export function HomeFooter() {
  return (
    <footer className="flex h-20 items-start justify-center border-t-2 border-black/10 bg-white px-4 pt-6 text-center md:h-[7.5rem]">
      <Copyright />
    </footer>
  );
}

/** Full footer for the inner pages. */
export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-mist">
      <div className="container grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.3fr] md:py-20">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 rounded-md">
            <Image src="/images/brand/emblem.png" alt="" width={179} height={320} className="h-16 w-auto" sizes="36px" />
            <span className="leading-tight">
              <span className="block font-serif text-lg tracking-[3px]">SYCAMORE ROYALS</span>
              <span className="block font-serif text-[13px] tracking-[4px] text-ink-secondary">INTERNATIONAL</span>
            </span>
          </Link>
          <p className="mt-2 text-[13px] italic tracking-[0.3em] text-ink-secondary">SCALING THE HEIGHTS</p>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink-secondary">
            A Christian not-for-profit in Wera, Amuria District, Uganda, proclaiming and demonstrating the Gospel through charitable activities, creation care and sustainable businesses.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink">Quick Links</h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            {[...nav, { href: "/donate", label: "Donate" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-secondary transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink">Contact Us</h2>
          <ul className="mt-5 space-y-4 text-[15px] text-ink-secondary">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-start gap-3 transition-colors hover:text-ink">
                <Mail aria-hidden className="mt-0.5 size-[18px] shrink-0 text-leaf-deep" />
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.tel}`} className="flex items-start gap-3 transition-colors hover:text-ink">
                <Phone aria-hidden className="mt-0.5 size-[18px] shrink-0 text-leaf-deep" />
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={site.address.maps} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition-colors hover:text-ink">
                <MapPin aria-hidden className="mt-0.5 size-[18px] shrink-0 text-leaf-deep" />
                <span>
                  {site.address.lines[0]}
                  <br />
                  {site.address.lines[1]}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-hairline">
        <div className="container py-6 text-center">
          <Copyright />
        </div>
      </div>
    </footer>
  );
}
