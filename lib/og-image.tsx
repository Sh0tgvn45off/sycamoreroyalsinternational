import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero } from "@/lib/content/home";
import { site } from "@/lib/site";

/** Shared by app/opengraph-image.tsx and app/twitter-image.tsx: the card shown when a link is shared. */
export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${site.name}: ${site.motto}`;

const TEXT = {
  bold: "SYCAMORE ROYALS",
  italic: "WELCOME TO",
  regular: `${hero.subtitle.toUpperCase()}SCALING THE HEIGHTS·WERA, AMURIA, UGANDA`,
};

/** Loads a Google Font subset (only the characters we draw). Returns null if offline, so the build never fails. */
async function googleFont(family: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    return src ? await (await fetch(src[1])).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export async function renderOgImage() {
  const [bold, italic, corben, tree] = await Promise.all([
    googleFont("Tinos:wght@700", TEXT.bold),
    googleFont("Tinos:ital@1", TEXT.italic),
    googleFont("Corben", TEXT.regular),
    readFile(join(process.cwd(), "public/images/brand/tree-og.png")),
  ]);
  const treeSrc = `data:image/png;base64,${tree.toString("base64")}`;

  const fonts = [
    bold && { name: "Tinos", data: bold, weight: 700 as const, style: "normal" as const },
    italic && { name: "Tinos", data: italic, weight: 400 as const, style: "italic" as const },
    corben && { name: "Corben", data: corben, weight: 400 as const, style: "normal" as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(105deg, #f7fffe 0%, #d8fdfc 42%, #8ccb78 100%)",
          fontFamily: "Tinos",
          color: "#000",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 88px", width: 800 }}>
          <div style={{ fontSize: 36, fontStyle: "italic", letterSpacing: 9 }}>WELCOME TO</div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, marginTop: 6, whiteSpace: "nowrap" }}>SYCAMORE ROYALS</div>
          <div style={{ fontSize: 21, fontFamily: corben ? "Corben" : "Tinos", lineHeight: 1.75, marginTop: 22, maxWidth: 600 }}>
            {hero.subtitle.toUpperCase()}
          </div>
          <div style={{ display: "flex", fontSize: 18, fontFamily: corben ? "Corben" : "Tinos", marginTop: 34, color: "#81390C", letterSpacing: 3 }}>
            SCALING THE HEIGHTS · WERA, AMURIA, UGANDA
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={treeSrc} height={460} alt="" />
        </div>
      </div>
    ),
    { ...ogSize, fonts: fonts.length ? fonts : undefined },
  );
}
