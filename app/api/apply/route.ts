import { NextResponse } from "next/server";
import { emptyApplication, validateApplication, type ApplyFields } from "@/lib/apply";

export const runtime = "nodejs";

/**
 * Where applications are delivered. Defaults to the Google Apps Script the previous form posted to
 * (it records each application in a Google Sheet). Override with APPLY_WEBHOOK_URL.
 */
const DEFAULT_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbzNnWcQBB5L-Nj2YmcR3z4ee59NvaHgMdkGgYOwfAcytd2KAeBDQHgUS1uDDE2QXTIx/exec";

const MAX_BODY_BYTES = 64 * 1024;

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  // Only accept submissions from our own pages.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json({ ok: false, message: "Forbidden." }, 403);
    } catch {
      return json({ ok: false, message: "Forbidden." }, 403);
    }
  }

  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return json({ ok: false, message: "That’s a little long. Please shorten your answers." }, 413);
  }

  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  const fields = { ...emptyApplication };
  for (const key of Object.keys(emptyApplication) as (keyof ApplyFields)[]) {
    const v = fd.get(key);
    fields[key] = typeof v === "string" ? v.trim() : "";
  }

  const errors = validateApplication(fields);
  if (Object.keys(errors).length) {
    return json({ ok: false, message: "Please check the highlighted fields.", errors }, 422);
  }

  // Honeypot filled in: almost certainly a bot. Report success and drop it.
  if (fields.website) return json({ ok: true });

  // Same multipart shape the previous form sent: every field, plus application_type.
  const out = new FormData();
  for (const key of Object.keys(emptyApplication) as (keyof ApplyFields)[]) {
    if (key !== "website") out.append(key, fields[key]);
  }
  out.append("application_type", fields.appType);

  const webhook = process.env.APPLY_WEBHOOK_URL || DEFAULT_WEBHOOK;

  try {
    const res = await fetch(webhook, {
      method: "POST",
      body: out,
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
    const text = await res.text();
    // Apps Script reports script errors as an HTML page with a 200 status.
    if (!res.ok || /<title>Error<\/title>|Script function not found/i.test(text)) {
      throw new Error(`Webhook responded with ${res.status}`);
    }
    return json({ ok: true });
  } catch (error) {
    console.error("[apply] delivery failed:", error);
    return json(
      { ok: false, message: "We couldn’t send your application just now. Please try again, or email sycamoreroyal@gmail.com." },
      502,
    );
  }
}
