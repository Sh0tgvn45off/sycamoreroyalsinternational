/** Get Involved page copy, from the previous site and the December 2025 brief. */

export const intro = {
  title: "Be Part of the Change",
  body: "Every hand matters. Every heart counts. Whether you give your time, skills, or resources, your involvement creates ripples of transformation in Angaro Wera and beyond.",
};

export type WayIcon = "volunteer" | "partner" | "sponsor" | "share" | "pray" | "skills";
/** What a card's button does: open the form on a tab, open the partnership sheet, jump to sharing, or go to Donate. */
export type WayAction =
  | { kind: "apply"; type: ApplicationType }
  | { kind: "partner" }
  | { kind: "share" }
  | { kind: "link"; href: string };

export const ways: { title: string; body: string; points: string[]; cta: string; icon: WayIcon; action: WayAction; featured?: boolean }[] = [
  {
    title: "Volunteer Your Time",
    body: "Join our team on the ground in Angaro Wera. Help with Saturday school sessions, community development projects, or administrative tasks. Your time makes a direct impact.",
    points: ["Teaching & tutoring", "Sports & recreation", "Community outreach", "Administrative support"],
    cta: "Apply to Volunteer",
    icon: "volunteer",
    action: { kind: "apply", type: "VOLUNTEER" },
  },
  {
    title: "Become a Partner",
    body: "Organizations, churches, and businesses can partner with us for long-term impact. Together, we can accomplish more than we ever could alone.",
    points: ["Corporate sponsorships", "Church partnerships", "Resource sharing", "Strategic collaboration"],
    cta: "Explore Partnership",
    icon: "partner",
    action: { kind: "partner" },
  },
  {
    title: "Sponsor a Child",
    body: "Transform a child’s future through education, mentorship, and care. Your monthly commitment provides stability and hope to a child in need.",
    points: ["Monthly support commitment", "Regular updates & photos", "Letter correspondence", "Visit opportunities"],
    cta: "Sponsor Now",
    icon: "sponsor",
    action: { kind: "link", href: "/donate#impact" },
    featured: true,
  },
  {
    title: "Spread the Word",
    body: "Use your voice and platform to share our mission. Every conversation, post, and share brings us closer to reaching more families in need.",
    points: ["Share on social media", "Host awareness events", "Tell your network", "Write testimonials"],
    cta: "Share Our Story",
    icon: "share",
    action: { kind: "share" },
  },
  {
    title: "Pray With Us",
    body: "Prayer is powerful. Join our prayer network to intercede for the children, families, and communities we serve. Miracles happen when we pray together.",
    points: ["Weekly prayer updates", "Specific prayer requests", "Testimony sharing", "Prayer community"],
    cta: "Join Prayer Team",
    icon: "pray",
    action: { kind: "apply", type: "PRAYER_COMMUNITY" },
  },
  {
    title: "Share Your Skills",
    body: "Doctors, teachers, engineers, designers, marketers: we need your expertise! Offer pro bono services or short-term consulting to strengthen our operations.",
    points: ["Medical missions", "Professional training", "Design & branding", "Technical consulting"],
    cta: "Offer Your Skills",
    icon: "skills",
    action: { kind: "apply", type: "SKILL_SHARE" },
  },
];

export const partnership = {
  title: "Partner with us",
  body: [
    "SR pursues its mission in collaboration with the Local Church, Government and Ministries, and civil society.",
    "The Church is our primary partner as godly mandate holders to proclaim and demonstrate the Love of God. We strive to achieve synergies and impactful partnership for the sake of the Child and family flourishing.",
  ],
  kinds: ["Corporate sponsorships", "Church partnerships", "Resource sharing", "Strategic collaboration"],
};

/** Values match what the Google Sheet behind the previous form already records. */
export const applicationTypes = [
  { value: "VOLUNTEER", label: "Volunteer" },
  { value: "PRAYER_COMMUNITY", label: "Prayer Community" },
  { value: "SKILL_SHARE", label: "Skill Share" },
] as const;

export type ApplicationType = (typeof applicationTypes)[number]["value"];

export const interests = [
  { value: "teaching", label: "Teaching & Tutoring" },
  { value: "sports", label: "Sports & Recreation" },
  { value: "community", label: "Community Outreach" },
  { value: "admin", label: "Administrative Support" },
  { value: "medical", label: "Medical Services" },
  { value: "other", label: "Other" },
] as const;
