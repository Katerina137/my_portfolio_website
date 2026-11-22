"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/data/projects";
import { Reveal } from "./Reveal";
import { Em, Eyebrow } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");
const ease = [0.2, 0.7, 0.2, 1] as const;

export function Work() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = projects.length;
  const current = projects[active];
  const num = pad(active + 1);

  const go = (i: number, focus = false) => {
    const next = (i + total) % total;
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onTabKey = (e: React.KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (step) {
      e.preventDefault();
      go(active + step, true);
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      go(e.key === "Home" ? 0 : total - 1, true);
    }
  };

  return (
    <section id="work" className="wrap section-y">
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-4">
          <Eyebrow>01 — selected work</Eyebrow>
          <h2 className="h2-display">
            Things I’ve built, <Em>opened as files.</Em>
          </h2>
        </div>
        <Eyebrow>
          {num} / {pad(total)}
        </Eyebrow>
      </Reveal>

      <Reveal className="overflow-hidden rounded-[20px] border border-line bg-surface">
        <div
          role="tablist"
          aria-label="Projects"
          onKeyDown={onTabKey}
          className="flex gap-1.5 overflow-x-auto border-b border-line bg-tabbar p-2.5"
        >
          {projects.map((p, i) => {
            const selected = i === active;
            return (
              <button
                key={p.file}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`tab-${i}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="project-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => go(i)}
                className={`relative min-h-11 flex-none cursor-pointer rounded-[10px] px-4 py-2.5 font-mono text-[13px] transition-colors duration-200 ${
                  selected ? "text-inverse" : "text-ink-2 hover:bg-pill"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="tab-highlight"
                    className="absolute inset-0 rounded-[10px] bg-ink"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative">{p.file}</span>
              </button>
            );
          })}
        </div>

        <div id="project-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="flex flex-wrap">
          <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-6 p-[clamp(28px,4vw,56px)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.file}
                className="flex flex-1 flex-col gap-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[13px] text-muted">
                  <span>
                    {num} · {current.kind}
                  </span>
                  <span className="rounded-full bg-pill px-3 py-1.5 text-pill-ink">{current.status}</span>
                </div>
                <h3 className="m-0 font-display text-[clamp(34px,4vw,56px)] leading-none font-medium tracking-[-0.04em]">
                  {current.title}
                </h3>
                <p className="m-0 max-w-[560px] text-[17px] leading-[1.65] text-ink-2">{current.desc}</p>
                <div className="border-t border-line-soft pt-5 font-mono text-[13px] text-ink-2">
                  <span className="text-muted">role ·</span> {current.role}
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.stack.map((s) => (
                    <span key={s} className="rounded-full border border-line px-3 py-[7px] font-mono text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-auto flex gap-2.5 pt-3">
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => go(active - 1)}
                className="inline-flex size-12 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Chevron d="M15 18l-6-6 6-6" />
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => go(active + 1)}
                className="inline-flex size-12 cursor-pointer items-center justify-center rounded-full bg-ink text-inverse transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Chevron d="M9 18l6-6-6-6" />
              </button>
            </div>
          </div>

          <div
            className="flex min-w-0 flex-[1_1_460px] flex-col justify-center gap-4 p-[clamp(28px,4vw,56px)] font-mono text-xs text-ink-2 transition-colors duration-[400ms] sm:min-h-[420px]"
            style={{ backgroundColor: `var(--tint-${current.tint})` }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.file}
                initial={{ opacity: 0, y: 12, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.985 }}
                transition={{ duration: 0.3, ease }}
                className="flex flex-col gap-4"
              >
                <div className="overflow-hidden rounded-[14px] border border-ink/8 bg-surface shadow-[0_30px_60px_-40px_var(--c-shadow)]">
                  <div className="flex items-center justify-between border-b border-line-soft px-4 py-3 text-muted">
                    <span>~/projects/{current.file}</span>
                    <span>{current.lang}</span>
                  </div>
                  <pre className="m-0 overflow-x-auto px-5 py-[22px] text-[13.5px] leading-[1.75] whitespace-pre-wrap text-ink">
                    {current.snippet}
                  </pre>
                </div>
                <span>fig. {num} — excerpt, simplified</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Chevron({ d }: { d: string }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
