import { applicationTypes, interests, type ApplicationType } from "@/lib/content/involved";

/** Field names match the previous form, so the Google Sheet behind it keeps its columns. */
export type ApplyFields = {
  appType: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  interest: string;
  availability: string;
  prayer_focus: string;
  prayer_availability: string;
  skill_area: string;
  skill_details: string;
  message: string;
  /** Honeypot: hidden from people, often filled in by bots. */
  website: string;
};

export type ApplyErrors = Partial<Record<keyof ApplyFields, string>>;

export const emptyApplication: ApplyFields = {
  appType: "VOLUNTEER",
  full_name: "",
  email: "",
  phone: "",
  location: "",
  interest: "",
  availability: "",
  prayer_focus: "",
  prayer_availability: "",
  skill_area: "",
  skill_details: "",
  message: "",
  website: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s().-]{7,20}$/;

const LIMITS: Partial<Record<keyof ApplyFields, number>> = {
  full_name: 100,
  email: 160,
  phone: 30,
  location: 120,
  availability: 600,
  prayer_focus: 1500,
  prayer_availability: 200,
  skill_area: 160,
  skill_details: 1500,
  message: 3000,
};

export const isApplicationType = (v: string): v is ApplicationType => applicationTypes.some((t) => t.value === v);

/** Same rules in the browser and on the server. Additional information is optional; everything else is required. */
export function validateApplication(f: ApplyFields): ApplyErrors {
  const e: ApplyErrors = {};
  const need = (key: keyof ApplyFields, message: string) => {
    if (!f[key].trim()) e[key] = message;
  };

  if (!isApplicationType(f.appType)) e.appType = "Choose an application type.";
  need("full_name", "Please enter your name.");
  if (!f.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL.test(f.email.trim())) e.email = "That email address doesn’t look right.";
  if (!f.phone.trim()) e.phone = "Please enter a phone number.";
  else if (!PHONE.test(f.phone.trim())) e.phone = "Use digits, spaces and an optional +, e.g. +256 773 584968.";
  need("location", "Please tell us where you’re based.");

  if (f.appType === "VOLUNTEER") {
    if (!interests.some((i) => i.value === f.interest)) e.interest = "Choose an area of interest.";
    need("availability", "Let us know when you’re available.");
  } else if (f.appType === "PRAYER_COMMUNITY") {
    need("prayer_focus", "Tell us how you’d like to pray with us.");
    need("prayer_availability", "Let us know how often you can pray with us.");
  } else if (f.appType === "SKILL_SHARE") {
    need("skill_area", "Which skill would you like to share?");
    need("skill_details", "Tell us a little about how you can help.");
  }

  for (const [key, max] of Object.entries(LIMITS) as [keyof ApplyFields, number][]) {
    if (!e[key] && f[key].length > max) e[key] = `Please keep this under ${max} characters.`;
  }
  return e;
}
