import type { Metadata, Viewport } from "next";
import { Corben, Tinos } from "next/font/google";
import { Header } from "@/components/layout/header";
import { SearchProvider } from "@/components/search/search-context";
import { Spotlight } from "@/components/search/spotlight";
import { MotionProvider } from "@/components/ui/motion-provider";
import { site } from "@/lib/site";
import "./globals.css";

/** Tinos is metrically identical to Times New Roman, the face the original headings rendered in. */
const tinos = Tinos({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-tinos",
  display: "swap",
});

const corben = Corben({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-corben",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: ${site.motto}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.name,
  alternateName: site.shortName,
  slogan: site.motto,
  url: site.url,
  logo: `${site.url}/images/brand/emblem.png`,
  email: site.email,
  telephone: site.phone.tel,
  foundingDate: String(site.founded),
  founders: [
    { "@type": "Person", name: "Stephen Okiror" },
    { "@type": "Person", name: "Elizabeth Akeso Okiror" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ajesa Cell, Osekai Wera",
    addressLocality: "Amuria",
    addressCountry: "UG",
  },
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${tinos.variable} ${corben.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SearchProvider>
            <Header />
            <main id="main">{children}</main>
            <Spotlight />
          </SearchProvider>
        </MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
