import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { africaCountries, africaPoints, africaViewBox } from "@/lib/africa-map";
import { footprint } from "@/lib/content/about";

const future = ["zambia", "liberia", "sierra-leone", "kenya", "malawi"] as const;
const futureNames: Record<(typeof future)[number], string> = {
  zambia: "Zambia",
  liberia: "Liberia",
  "sierra-leone": "Sierra Leone",
  kenya: "Kenya",
  malawi: "Malawi",
};

/** A small sycamore, drawn in the map's blue for proposed sites (as the brief asks). */
function TreeMark({ x, y, size = 34 }: { x: number; y: number; size?: number }) {
  const s = size / 22;
  return (
    <g transform={`translate(${x - 11 * s} ${y - 22 * s}) scale(${s})`}>
      <ellipse cx="11" cy="22" rx="5" ry="1.4" fill="rgba(0,0,0,0.18)" />
      <path d="M10 13.5h2l.6 8.2h-3.2Z" fill="#2F5F96" />
      <circle cx="11" cy="9" r="7.2" fill="#2F7CC9" stroke="#fff" strokeWidth="1.4" />
      <circle cx="8.6" cy="7.4" r="2.2" fill="#fff" fillOpacity="0.28" />
    </g>
  );
}

export function Footprint() {
  const [wx, wy] = africaPoints.wera;
  return (
    <Section id="footprint">
      <SectionHeading eyebrow="Our Footprint" title="Growing deeper before growing wider" lead={footprint.current} />
      <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <Reveal>
          <figure className="card relative overflow-hidden p-4 sm:p-8">
            <svg viewBox={africaViewBox} role="img" aria-labelledby="map-title map-desc" className="h-auto w-full">
              <title id="map-title">Map of Africa showing where Sycamore Royals serves</title>
              <desc id="map-desc">
                Uganda is highlighted in green, with Wera in Amuria District marked. Proposed future sites are marked with blue trees in Zambia,
                Liberia, Sierra Leone, Kenya and Malawi.
              </desc>
              {africaCountries.map((c) => (
                <path
                  key={c.id}
                  d={c.d}
                  fill={c.id === "uganda" ? "#72BC5B" : (future as readonly string[]).includes(c.id) ? "#E3EFFA" : "#EEF1EC"}
                  stroke="#fff"
                  strokeWidth={0.9}
                  strokeLinejoin="round"
                />
              ))}
              {future.map((k) => (
                <TreeMark key={k} x={africaPoints[k][0]} y={africaPoints[k][1]} />
              ))}
              {/* Wera: a pulsing marker */}
              <circle cx={wx} cy={wy} r="7" fill="#81390C" opacity="0.35">
                <animate attributeName="r" values="7;20;7" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.35;0;0.35" dur="2.6s" repeatCount="indefinite" />
              </circle>
              <circle cx={wx} cy={wy} r="6.5" fill="#81390C" stroke="#fff" strokeWidth="2" />
              <g transform={`translate(${wx + 14} ${wy - 24})`}>
                <rect width="96" height="30" rx="15" fill="#fff" stroke="rgba(0,0,0,0.08)" />
                <text x="48" y="19.5" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1D1D1F" fontFamily="-apple-system, Helvetica, Arial, sans-serif">
                  Wera, Amuria
                </text>
              </g>
            </svg>
            <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-ink-secondary">
              <span className="inline-flex items-center gap-2">
                <span className="size-3 rounded-full bg-leaf" aria-hidden /> Where we serve today
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-3 rounded-full bg-sky" aria-hidden /> Proposed future sites
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.1} className="space-y-5">
          <div className="overflow-hidden rounded-[28px] shadow-lift">
            <Image
              src="/images/about/footprint.jpg"
              alt="A boy holds up a sign at a camp in Wera, Amuria"
              width={1080}
              height={1080}
              sizes="(min-width: 1024px) 440px, 92vw"
              className="aspect-[4/3] h-auto w-full object-cover"
            />
          </div>
          <div className="card p-6">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-tertiary">Today</p>
            <p className="mt-1 text-[17px] font-semibold">Wera Community, Amuria District, Uganda</p>
            <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-tertiary">Future expansion</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              <li className="rounded-full bg-leaf-tint px-3 py-1 text-[13px] font-medium text-leaf-deep">Across Uganda</li>
              {future.map((k) => (
                <li key={k} className="rounded-full bg-sky-tint px-3 py-1 text-[13px] font-medium text-[#1F5E9C]">
                  {futureNames[k]}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
