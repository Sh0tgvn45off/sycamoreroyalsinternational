import * as about from "@/lib/content/about";
import * as donate from "@/lib/content/donate";
import * as events from "@/lib/content/events";
import * as involved from "@/lib/content/involved";
import { site } from "@/lib/site";

export type SearchEntry = { title: string; page: string; href: string; text: string };

/** Everything the search overlay can find, built from the same content the pages render. */
export const searchIndex: SearchEntry[] = [
  { title: "Home", page: "Home", href: "/", text: "Welcome to Sycamore Royals. Scaling the heights." },

  // About
  { title: "Who We Are", page: "About Us", href: "/about#who-we-are", text: about.whoWeAre },
  { title: "Our Vision", page: "About Us", href: "/about#vision", text: about.vision },
  { title: "Our Mission", page: "About Us", href: "/about#vision", text: about.mission },
  { title: "Our Core Values", page: "About Us", href: "/about#values", text: about.values.map((v) => `${v.title} ${v.body}`).join(" ") },
  ...about.approach.map((a) => ({ title: `Our Approach: ${a.label}`, page: "About Us", href: "/about#approach", text: a.body.join(" ") })),
  ...about.founders.map((f) => ({ title: `${f.name}, ${f.role}`, page: "About Us", href: "/about#founders", text: f.bio })),
  ...about.programs.map((p) => ({ title: p.title, page: "What We Do", href: "/about#what-we-do", text: p.areas.join(", ") })),
  {
    title: "Our Footprint",
    page: "About Us",
    href: "/about#footprint",
    text: `${about.footprint.current} ${about.footprint.futureNote} map Wera Amuria`,
  },
  { title: "Our History", page: "About Us", href: "/about#history", text: about.history.join(" ") },
  ...about.gallery.map((c) => ({
    title: `Gallery: ${c.title}`,
    page: "Community Gallery",
    href: "/about#gallery",
    text: `${c.body} ${c.items.map((i) => `${i.title} ${i.caption}`).join(" ")} photos`,
  })),

  // Events
  { title: events.intro.title, page: "Events", href: "/events", text: events.intro.body },
  ...events.programs.map((p) => ({ title: p.title, page: "Current Programs", href: "/events#programs", text: p.body })),
  { title: events.camp.title, page: "Events", href: "/events#camp", text: `${events.camp.body} ${events.camp.activities.join(", ")}` },
  ...events.calendar.events.map((e) => ({
    title: e.title,
    page: `Events · ${e.day} ${e.month} ${events.calendar.year}`,
    href: "/events#calendar",
    text: `${e.place}. ${e.body}`,
  })),
  ...events.plans.map((p) => ({ title: `Future Plans: ${p.term} (${p.years})`, page: "Events", href: "/events#plans", text: p.items.join(", ") })),

  // Get involved
  { title: involved.intro.title, page: "Get Involved", href: "/get-involved", text: involved.intro.body },
  ...involved.ways.map((w) => ({ title: w.title, page: "Get Involved", href: "/get-involved#ways", text: `${w.body} ${w.points.join(", ")}` })),
  { title: "Application form", page: "Get Involved", href: "/get-involved#apply", text: "Apply to volunteer, join the prayer community or share your skills. Application form." },
  { title: "Partner with us", page: "Get Involved", href: "/get-involved#ways", text: involved.partnership.body.join(" ") },
  { title: "Contact the founders", page: "Get Involved", href: "/get-involved#contact", text: `Stephen Okiror Elizabeth Akeso Okiror LinkedIn email ${site.email}` },

  // Donate
  { title: "Make a Donation", page: "Donate", href: "/donate", text: donate.intro.body },
  { title: "African Mobile Money", page: "Donate", href: "/donate#methods", text: `${donate.mobileMoney.wallets.join(", ")} ${site.phone.display} MPESA MTN Airtel` },
  { title: "PayPal", page: "Donate", href: "/donate#methods", text: `International giving via PayPal to ${site.email}` },
  { title: "Direct Bank Transfer", page: "Donate", href: "/donate#methods", text: donate.bank.note },
  ...donate.impact.map((i) => ({ title: `${i.amount}: ${i.title}`, page: "Your Impact", href: "/donate#impact", text: i.body })),

  // Contact
  {
    title: "Contact us",
    page: "Contact",
    href: "/get-involved#contact",
    text: `${site.email} ${site.phone.display} ${site.address.short} phone email address visit`,
  },
];
