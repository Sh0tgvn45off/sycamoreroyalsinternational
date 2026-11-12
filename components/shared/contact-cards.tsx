import { Mail, MapPin, Phone } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { site } from "@/lib/site";

const cards = [
  { icon: Phone, label: "Call Us", value: site.phone.display, href: `tel:${site.phone.tel}` },
  { icon: Mail, label: "Email Us", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Visit Us", value: site.address.short, href: site.address.maps, external: true },
];

/** Three tappable contact tiles: call, email, directions. */
export function ContactCards() {
  return (
    <RevealGroup className="grid gap-4 md:grid-cols-3">
      {cards.map(({ icon: Icon, label, value, href, external }) => (
        <RevealItem key={label}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="card group flex h-full items-center gap-4 p-6 transition-all duration-500 ease-apple hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-leaf-tint text-leaf-deep transition-colors duration-300 group-hover:bg-leaf-deep group-hover:text-white">
              <Icon aria-hidden className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-tertiary">{label}</span>
              <span className="mt-0.5 block break-words text-[16px] font-semibold text-ink">{value}</span>
            </span>
          </a>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
