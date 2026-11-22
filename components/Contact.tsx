"use client";

import { useState } from "react";
import { links } from "@/data/site";
import { LondonTime } from "./LondonTime";
import { Reveal } from "./Reveal";
import { Em } from "./ui";

type Status = { kind: "idle" | "sending" | "ok" | "error"; text?: string };

const fieldClass =
  "min-h-11 rounded-none border-0 border-b border-term-line bg-transparent py-2.5 font-[inherit] text-term-fg outline-none focus:border-term-prompt aria-[invalid=true]:border-error";

export function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "");
    const bad = {
      name: !data.name?.trim(),
      email: !emailOk,
      message: !data.message?.trim(),
    };
    setInvalid(bad);
    const firstBad = (Object.keys(bad) as (keyof typeof bad)[]).find((k) => bad[k]);
    if (firstBad) {
      setStatus({ kind: "error", text: "✕ error: please fill in every field with a valid email." });
      form.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    setStatus({ kind: "sending", text: "… sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      form.reset();
      setStatus({ kind: "ok", text: "✓ sent. I’ll get back to you soon." });
    } catch (err) {
      setStatus({
        kind: "error",
        text: `✕ ${err instanceof Error ? err.message : "Something went wrong."} You can also email ${links.email}.`,
      });
    }
  }

  return (
    <section id="contact" className="wrap pb-[clamp(72px,9vw,128px)]">
      <Reveal className="flex flex-wrap gap-[clamp(40px,5vw,80px)] rounded-[28px] bg-soft p-[clamp(32px,5vw,72px)]">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-6">
          <span className="font-mono text-[13px] text-ink-2">04 — contact</span>
          <h2 className="h2-display text-[clamp(40px,5.4vw,80px)] leading-[0.98] tracking-[-0.045em]">
            Your turn. <Em>What should we build?</Em>
          </h2>
          <p className="m-0 max-w-[440px] text-[17px] leading-relaxed text-ink-2">
            Internships, collaborations or just a good idea - my inbox is open.
          </p>
          <div className="mt-auto flex flex-col gap-3 font-mono text-sm [&_a]:self-start [&_a]:border-b [&_a]:border-line [&_a]:py-1 [&_a]:no-underline [&_a:hover]:border-accent">
            <a href={`mailto:${links.email}`}>email → {links.email}</a>
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              github → Katerina137
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin → Katerina Matthaiou
            </a>
          </div>
        </div>

        <form
          noValidate
          onSubmit={onSubmit}
          className="flex min-w-0 flex-[1_1_460px] flex-col gap-[22px] rounded-[18px] bg-term-bg p-[clamp(24px,3vw,36px)] font-mono text-sm text-term-fg"
        >
          <div className="flex items-center justify-between border-b border-term-line-soft pb-4 text-xs text-term-dim">
            <span>~/contact — zsh</span>
            <LondonTime />
          </div>
          <span>
            <span className="text-term-prompt">$</span> say-hello --to katerina
          </span>

          <Field id="name" label="› your name" invalid={invalid.name}>
            <input id="name" name="name" type="text" autoComplete="name" maxLength={120} aria-invalid={invalid.name} className={fieldClass} />
          </Field>
          <Field id="email" label="› your email" invalid={invalid.email}>
            <input id="email" name="email" type="email" autoComplete="email" maxLength={200} aria-invalid={invalid.email} className={fieldClass} />
          </Field>
          <Field id="message" label="› what are we building?" invalid={invalid.message}>
            <textarea id="message" name="message" rows={3} maxLength={5000} aria-invalid={invalid.message} className={`${fieldClass} resize-y`} />
          </Field>

          {/* Honeypot: hidden from people, but bots fill it in. The API silently drops those. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <button
            type="submit"
            disabled={status.kind === "sending"}
            className="min-h-12 cursor-pointer self-start rounded-full bg-term-fg px-[22px] py-3.5 font-medium text-term-bg transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
          >
            send ↵
          </button>
          <span
            aria-live="polite"
            className={`min-h-[1em] text-[13px] ${status.kind === "error" ? "text-error" : "text-term-dim"}`}
          >
            {status.text}
          </span>
        </form>
      </Reveal>
    </section>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  invalid?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-term-dim">
        {label}
      </label>
      {children}
    </div>
  );
}
