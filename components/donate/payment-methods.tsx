"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, CreditCard, Globe, Landmark, Mail, Phone, Smartphone } from "lucide-react";
import { useState } from "react";
import { ButtonAnchor, press, spring } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Sheet } from "@/components/ui/sheet";
import { bank, mobileMoney, paypal } from "@/lib/content/donate";
import { mailto, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type MethodKey = "mobile" | "paypal" | "bank";

const methods: {
  key: MethodKey;
  title: string;
  body: string;
  region: string;
  icon: React.ComponentType<{ className?: string }>;
  cta: string;
  featured?: boolean;
}[] = [
  {
    key: "mobile",
    title: "African Mobile Money",
    body: "Pay using MTN Mobile Money, Airtel Money, M-Pesa or other mobile wallets.",
    region: "Within Africa",
    icon: Smartphone,
    cta: "Select Method",
  },
  {
    key: "paypal",
    title: "PayPal",
    body: "Secure international giving through PayPal, from anywhere in the world.",
    region: "International",
    icon: Globe,
    cta: "Select Method",
    featured: true,
  },
  {
    key: "bank",
    title: "Direct Bank Transfer",
    body: "Transfer directly to our bank account, ideal for larger donations.",
    region: "All Regions",
    icon: Landmark,
    cta: "View Details",
  },
];

function Tile({ icon: Icon, featured }: { icon: React.ComponentType<{ className?: string }>; featured?: boolean }) {
  return (
    <span className={cn("grid size-14 place-items-center rounded-2xl", featured ? "bg-donate text-white" : "bg-leaf-tint text-leaf-deep")}>
      <Icon className="size-7" />
    </span>
  );
}

/** A labelled value with a copy button, like a row in Apple Wallet. */
function DetailRow({ label, value, copy }: { label: string; value: string; copy?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-mist px-4 py-3.5">
      <div className="min-w-0">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-tertiary">{label}</p>
        <p className="mt-0.5 break-words text-[17px] font-semibold tabular-nums text-ink">{value}</p>
      </div>
      {copy && <CopyButton value={copy} label={label.toLowerCase()} />}
    </div>
  );
}

export function PaymentMethods() {
  const [open, setOpen] = useState<MethodKey | null>(null);
  const close = () => setOpen(null);

  return (
    <>
      <RevealGroup className="grid gap-5 md:grid-cols-3">
        {methods.map((m) => (
          <RevealItem key={m.key} className="h-full">
            <motion.button
              type="button"
              onClick={() => setOpen(m.key)}
              whileTap={press}
              transition={spring}
              aria-haspopup="dialog"
              className={cn(
                "card group relative flex h-full w-full flex-col items-center p-8 text-center transition-shadow duration-500 ease-apple hover:shadow-lift",
                m.featured && "ring-2 ring-donate",
              )}
            >
              {m.featured && (
                <span className="absolute -top-3 rounded-full bg-donate px-3 py-1 text-[12px] font-bold uppercase tracking-[0.08em] text-white">
                  Most Popular
                </span>
              )}
              <Tile icon={m.icon} featured={m.featured} />
              <span className="mt-6 block font-serif text-[24px] font-bold leading-tight">{m.title}</span>
              <span className="mt-3 block text-[15px] leading-relaxed text-ink-secondary">{m.body}</span>
              <span className="mt-4 block rounded-full bg-black/[0.05] px-3 py-1 text-[12px] font-semibold text-ink-secondary">{m.region}</span>
              <span
                className={cn(
                  "mt-7 inline-flex h-11 w-full items-center justify-center gap-1 rounded-full text-[15px] font-semibold transition-colors duration-200",
                  m.featured ? "bg-donate text-white group-hover:bg-donate-dark" : "bg-black/[0.05] text-ink group-hover:bg-black/[0.09]",
                )}
              >
                {m.cta}
                <ChevronRight aria-hidden className="size-4" />
              </span>
            </motion.button>
          </RevealItem>
        ))}
      </RevealGroup>

      <Sheet
        open={open === "mobile"}
        onClose={close}
        title="African Mobile Money"
        description="Send your gift from any mobile money wallet."
        media={<Tile icon={Smartphone} />}
      >
        <ul className="flex flex-wrap gap-2">
          {mobileMoney.wallets.map((w) => (
            <li key={w} className="rounded-full bg-leaf-tint px-3 py-1 text-[13px] font-semibold text-leaf-deep">
              {w}
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <DetailRow label="Send payment to" value={mobileMoney.number} copy={site.phone.tel} />
        </div>
        <ol className="mt-6 space-y-3">
          {mobileMoney.steps.map((s, i) => (
            <li key={s} className="flex gap-3 text-[15px] leading-relaxed">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-leaf-deep text-[12px] font-bold text-white">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <ButtonAnchor href={mailto("Donation: mobile money transaction ID", "Transaction ID:\nAmount:\nName for the receipt:")} variant="leaf" className="mt-7 w-full">
          <Mail aria-hidden className="size-4" /> Email your transaction ID
        </ButtonAnchor>
      </Sheet>

      <Sheet open={open === "paypal"} onClose={close} title="PayPal" description="Give securely from anywhere in the world." media={<Tile icon={Globe} featured />}>
        <DetailRow label="PayPal email" value={paypal.email} copy={paypal.email} />
        <p className="mt-5 text-[15px] leading-relaxed text-ink-secondary">
          In PayPal, choose <strong className="font-semibold text-ink">Send</strong>, paste our email address and add a note such as “Donation”. We’ll
          email your receipt within 24 hours.
        </p>
        <div className="mt-7 flex flex-col gap-3">
          <ButtonAnchor href={paypal.sendUrl} external className="w-full">
            Open PayPal <ArrowUpRight aria-hidden className="size-4" />
          </ButtonAnchor>
          {paypal.donateUrl && (
            <ButtonAnchor href={paypal.donateUrl} external variant="secondary" className="w-full">
              <CreditCard aria-hidden className="size-4" /> Give by card
            </ButtonAnchor>
          )}
        </div>
        <p className="mt-5 text-center text-[13px] text-ink-tertiary">Payments are processed by PayPal. We never see your card details.</p>
      </Sheet>

      <Sheet open={open === "bank"} onClose={close} title="Bank Transfer" description="For direct transfers from any bank." media={<Tile icon={Landmark} />}>
        <DetailRow label="Account name" value={bank.accountName} copy={bank.accountName} />
        <p className="mt-5 text-[15px] leading-relaxed text-ink-secondary">{bank.note}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ButtonAnchor href={mailto("Bank transfer details", "Please send me your bank details for a donation.\n\nName:\nCountry:")} variant="leaf" className="flex-1">
            <Mail aria-hidden className="size-4" /> Request bank details
          </ButtonAnchor>
          <ButtonAnchor href={`tel:${site.phone.tel}`} variant="secondary" className="flex-1">
            <Phone aria-hidden className="size-4" /> Call us
          </ButtonAnchor>
        </div>
      </Sheet>
    </>
  );
}
