"use client";

import { motion } from "framer-motion";
import { Share } from "lucide-react";
import { useSyncExternalStore } from "react";
import { FacebookIcon, LinkedInIcon, WhatsAppIcon, XIcon } from "@/components/ui/brand-icons";
import { buttonClasses, press, spring } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

const MESSAGE = "Join me in supporting Sycamore Royals International, transforming the lives of children and families in Wera, Uganda.";

const subscribeNoop = () => () => {};

/** Share sheet: the device's own share sheet where available, plus the main networks and a copy-link button. */
export function ShareButtons({ fallbackUrl }: { fallbackUrl: string }) {
  // The live address (works on previews and custom domains); falls back to the configured site URL on the server.
  const url = useSyncExternalStore(subscribeNoop, () => window.location.origin, () => fallbackUrl);
  const canShare = useSyncExternalStore(subscribeNoop, () => typeof navigator.share === "function", () => false);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(MESSAGE);
  const links = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: FacebookIcon },
    { label: "X", href: `https://x.com/intent/post?url=${u}&text=${t}`, icon: XIcon },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: LinkedInIcon },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${MESSAGE} ${url}`)}`, icon: WhatsAppIcon },
  ];

  const nativeShare = async () => {
    try {
      await navigator.share({ title: "Sycamore Royals International", text: MESSAGE, url });
    } catch {
      // Dismissed by the user; nothing to do.
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {canShare && (
        <motion.button type="button" onClick={nativeShare} whileTap={press} transition={spring} className={buttonClasses({ variant: "leaf", size: "lg" })}>
          <Share aria-hidden className="size-[18px]" /> Share our story
        </motion.button>
      )}
      <ul className="flex flex-wrap justify-center gap-3">
        {links.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <motion.a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={press}
              transition={spring}
              className={buttonClasses({ variant: "light", className: "gap-2.5" })}
            >
              <Icon className="size-4" /> {label}
            </motion.a>
          </li>
        ))}
      </ul>
      <div className="flex max-w-full items-center gap-3 rounded-full bg-white py-1.5 pl-5 pr-1.5 shadow-sm ring-1 ring-black/[0.06]">
        <span className="truncate text-[14px] text-ink-secondary">{url.replace(/^https?:\/\//, "")}</span>
        <CopyButton value={url} label="link" />
      </div>
    </div>
  );
}
