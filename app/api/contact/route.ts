import { NextResponse } from "next/server";

/**
 * POST /api/contact
 * Validates the contact form and emails it to you via Resend (https://resend.com).
 *
 * Environment variables (set in .env.local and in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY      — API key from resend.com
 *   CONTACT_TO_EMAIL    — where messages are delivered (your inbox)
 *   CONTACT_FROM_EMAIL  — optional; defaults to Resend's test sender. Use an address on a verified domain once you have one.
 */

const LIMITS = { name: 120, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = { name?: unknown; email?: unknown; message?: unknown; company?: unknown };

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled in → almost certainly a bot. Pretend it worked so it doesn't retry.
  if (str(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name);
  const email = str(body.email);
  const message = str(body.message);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill in every field." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) {
    return NextResponse.json({ error: "That email address doesn’t look right." }, { status: 400 });
  }
  if (name.length > LIMITS.name || message.length > LIMITS.message) {
    return NextResponse.json({ error: "Your message is too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return NextResponse.json({ error: "The contact form isn’t set up yet." }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio: message from ${name.replace(/[\r\n]+/g, " ")}`,
      text: `${message}\n\n— ${name} <${email}>`,
    }),
  });

  if (!res.ok) {
    console.error("Contact form: Resend responded", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ error: "Couldn’t send right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
