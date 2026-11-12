import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** The framed tree emblem with the two-line wordmark, as on the original header. */
export function Brand({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  return (
    <Link href="/" onClick={onNavigate} className={cn("flex shrink-0 items-center rounded-md", className)} aria-label="Sycamore Royals International, home">
      <Image
        src="/images/brand/emblem.png"
        alt=""
        width={179}
        height={320}
        priority
        className="h-[52px] w-auto lg:h-20"
        sizes="45px"
      />
      <span className="ml-2.5 text-center leading-[1.2] text-black lg:ml-3">
        <span className="block font-serif text-[1.02rem] tracking-[3px] min-[400px]:text-[1.15rem] lg:text-[1.4rem] lg:tracking-[4px]">
          SYCAMORE ROYALS
        </span>
        <span className="-mt-[3px] block font-sans text-[9.5px] italic tracking-[5px] min-[400px]:text-[10.5px] lg:-mt-[5px] lg:text-[14px] lg:tracking-[8px]">
          SCALING THE HEIGHTS
        </span>
      </span>
    </Link>
  );
}
