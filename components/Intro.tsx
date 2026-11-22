"use client";

import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { bootLogs } from "@/data/site";
import { LondonTime } from "./LondonTime";

type IntroState = {
  /** True once the loader starts leaving; page content animates in on this. */
  revealed: boolean;
  replay: () => void;
};

const IntroContext = createContext<IntroState>({ revealed: true, replay: () => {} });
export const useIntro = () => useContext(IntroContext);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [run, setRun] = useState(0);
  const [visible, setVisible] = useState(true);
  const [revealed, setRevealed] = useState(false);

  // Visitors who prefer reduced motion skip the intro entirely.
  useEffect(() => {
    if (reduce) {
      setVisible(false);
      setRevealed(true);
    }
  }, [reduce]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
  }, [visible]);

  const finish = useCallback(() => {
    setVisible(false);
    setRevealed(true);
  }, []);

  const replay = useCallback(() => {
    window.scrollTo(0, 0);
    if (reduce) return;
    setRevealed(false);
    setVisible(true);
    setRun((r) => r + 1);
  }, [reduce]);

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={{ revealed, replay }}>
        <AnimatePresence>{visible && <Loader key={run} onDone={finish} />}</AnimatePresence>
        {children}
      </IntroContext.Provider>
    </MotionConfig>
  );
}

function Loader({ onDone }: { onDone: () => void }) {
  const progress = useMotionValue(0);
  const counter = useTransform(progress, (v) => String(Math.round(v)).padStart(3, "0"));
  const barWidth = useTransform(progress, (v) => `${v}%`);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let done: ReturnType<typeof setTimeout>;
    const controls = animate(progress, 100, {
      duration: 1.8,
      ease: [0.45, 0, 0.55, 1],
      onUpdate: (v) => setPct(Math.round(v)),
      onComplete: () => {
        done = setTimeout(onDone, 550);
      },
    });
    return () => {
      controls.stop();
      clearTimeout(done);
    };
  }, [progress, onDone]);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-soft p-[clamp(24px,4vw,56px)] font-mono text-[13px] text-ink-2"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-ink">// katerina.portfolio</span>
          <span>v2026.11 — booting</span>
        </div>
        <div className="flex flex-col gap-1.5 text-right">
          <span>london, uk.</span>
          <LondonTime />
        </div>
      </div>

      <div className="flex max-w-[520px] flex-col gap-2">
        {bootLogs.map((log) => (
          <motion.span
            key={log.text}
            initial={false}
            animate={pct >= log.at ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.35 }}
          >
            {log.text}
          </motion.span>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-2.5">
            <span>
              {pct >= 100 ? "ready" : "loading"}
              <span className="animate-blink motion-reduce:animate-none">_</span>
            </span>
            <span className="font-display text-[clamp(96px,20vw,300px)] leading-[0.82] font-medium tracking-[-0.05em] text-ink tabular-nums">
              <motion.span>{counter}</motion.span>
              <span className="text-[0.32em] tracking-[-0.02em] text-accent">%</span>
            </span>
          </div>
          <span className="pb-3 font-serif text-[clamp(28px,3.4vw,48px)] italic">design &amp; engineering</span>
        </div>
        <div className="h-0.5 w-full bg-line">
          <motion.div className="h-0.5 bg-accent" style={{ width: barWidth }} />
        </div>
      </div>
    </motion.div>
  );
}
