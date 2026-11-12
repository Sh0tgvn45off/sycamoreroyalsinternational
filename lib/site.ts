/** Organisation details used across the site. */

function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  // Set by Vercel on every deployment.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Sycamore Royals International",
  shortName: "Sycamore Royals",
  motto: "Scaling the Heights",
  url: siteUrl(),
  description:
    "Sycamore Royals International is a Christian not-for-profit in Wera, Amuria District, Uganda, proclaiming and demonstrating the Gospel through charitable activities, creation care and sustainable businesses.",
  founded: 2020,
  email: "sycamoreroyal@gmail.com",
  phone: { display: "+256 773 584968", tel: "+256773584968" },
  address: {
    lines: ["Ajesa Cell, Osekai Wera", "Amuria District, Uganda"],
    short: "Ajesa Cell, Osekai Wera, Amuria, Uganda",
    maps: "https://www.google.com/maps/search/?api=1&query=Wera%2C+Amuria+District%2C+Uganda",
  },
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/events", label: "Events" },
  { href: "/get-involved", label: "Get Involved" },
] as const;

export const mailto = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const q = params.toString().replace(/\+/g, "%20");
  return `mailto:${site.email}${q ? `?${q}` : ""}`;
};
