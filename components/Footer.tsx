"use client";

import { useIntro } from "./Intro";
import { LondonTime } from "./LondonTime";

export function Footer() {
  const { replay } = useIntro();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="wrap flex flex-col gap-10 pt-12 pb-8">
        <div className="flex flex-wrap justify-between gap-6 font-mono text-[13px] text-ink-2">
          <nav aria-label="Footer" className="flex flex-wrap gap-6 [&_a]:no-underline">
            <a href="#work">work</a>
            <a href="#approach">approach</a>
            <a href="#about">about</a>
            <a href="#contact">contact</a>
          </nav>
          <div className="flex flex-wrap items-center gap-6">
            <span>
              London, UK · <LondonTime />
            </span>
            <button
              type="button"
              onClick={replay}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 3-6.7" />
                <path d="M3 4v5h5" />
              </svg>
              replay intro
            </button>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="font-display text-[clamp(64px,9vw,140px)] leading-[0.85] font-semibold tracking-[-0.06em]"
        >
          katerina<span className="text-accent">.</span>
        </div>
        <div className="flex flex-wrap justify-between gap-3 font-mono text-xs text-muted">
          <span>© {new Date().getFullYear()} Katerina</span>
          <span>designed &amp; built in London</span>
        </div>
      </div>
    </footer>
  );
}
