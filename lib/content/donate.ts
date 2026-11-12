import { site } from "@/lib/site";

/** Donate page copy and payment details. */

export const intro = {
  title: "Choose Your Payment Method",
  body: "Select your preferred way to give. Every donation directly supports children and families in Angaro Wera, Uganda.",
};

export const mobileMoney = {
  number: site.phone.display,
  /** Wallets named on the previous site. */
  wallets: ["MTN Mobile Money", "Airtel Money", "M-Pesa"],
  steps: [
    "Open your mobile money menu and choose Send Money.",
    `Send your gift to ${site.phone.display}.`,
    "You’ll receive a confirmation SMS with a transaction ID.",
    `Email the transaction ID to ${site.email} and we’ll send an official receipt within 24 hours.`,
  ],
};

export const paypal = {
  email: site.email,
  /** PayPal's "Send" page; the giver pastes our email address there. */
  sendUrl: "https://www.paypal.com/myaccount/transfer/homepage/pay",
  /**
   * A PayPal Donate button link lets people give by card without a PayPal account.
   * Create one at paypal.com/donate/buttons and paste the link here to show a "Give by card" button.
   */
  donateUrl: "",
};

export const bank = {
  accountName: "Sycamore Royals International",
  note: "Bank transfers suit larger gifts ($500+). We share the bank name, account number and SWIFT code directly, so you always have the current details.",
};

export const impact = [
  {
    amount: "$25",
    title: "School Supplies",
    body: "Provides books, notebooks, and learning materials for one child for a full semester.",
    image: "/images/impact/education.jpg",
    alt: "A boy smiles as he writes in his exercise book",
  },
  {
    amount: "$50",
    title: "Monthly Food Support",
    body: "Feeds a child nutritious meals for one month, supporting their health and learning.",
    image: "/images/impact/nutrition.jpg",
    alt: "Children seated on chairs holding cups of porridge",
  },
  {
    amount: "$100",
    title: "Medical Care",
    body: "Covers healthcare, immunizations, and check-ups for six months.",
    image: "/images/impact/healthcare.jpg",
    alt: "Young children resting on chairs during a camp day",
  },
  {
    amount: "$50/mo",
    title: "Child Sponsorship",
    body: "Complete support including education, healthcare, mentorship, and spiritual guidance.",
    image: "/images/impact/sponsorship.jpg",
    alt: "A smiling boy holds up a picture he has coloured",
  },
];

export type ReasonIcon = "direct" | "secure" | "receipt" | "transparent";

export const reasons: { title: string; body: string; icon: ReasonIcon }[] = [
  { title: "100% Direct Impact", body: "Every dollar goes directly to programs. Administrative costs are covered separately.", icon: "direct" },
  { title: "Secure & Simple", body: "You give through PayPal, mobile money or your own bank. We never see or store your card details.", icon: "secure" },
  { title: "Official Receipts", body: "Send us your transaction ID and we’ll email an official receipt within 24 hours.", icon: "receipt" },
  { title: "Full Transparency", body: "Regular updates showing exactly how your donation is making a difference.", icon: "transparent" },
];
