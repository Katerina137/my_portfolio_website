"use client";

import { motion, type Variants } from "framer-motion";
import { useIntro } from "./Intro";
import { LondonTime } from "./LondonTime";
import { buttonBase, Em } from "./ui";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.2, 0.7, 0.2, 1] } },
};

export function Hero() {
  const { revealed } = useIntro();

  return (
    <motion.section
      id="top"
      className="wrap pt-[clamp(40px,7vw,96px)] pb-[clamp(56px,7vw,96px)]"
      variants={container}
      initial="hidden"
      animate={revealed ? "show" : "hidden"}
    >
      <motion.div variants={item} className="mb-9 flex flex-wrap items-center gap-2.5 font-mono text-[13px] text-ink-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-live-bg px-3 py-[7px] text-live-ink">
          <span className="inline-block size-2 animate-live rounded-full bg-live motion-reduce:animate-none" />
          final year · computer science
        </span>
        <span>fig. a - portfolio, 2026</span>
      </motion.div>

      <motion.h1
        variants={item}
        className="m-0 max-w-[1180px] font-display text-[clamp(44px,7.4vw,112px)] leading-[0.98] font-medium tracking-[-0.045em]"
      >
        Full-stack developer with a <Em>machine learning</Em> curiosity and a <Em>designer’s</Em> eye.
      </motion.h1>

      <motion.div variants={item} className="mt-14 flex flex-wrap items-end justify-between gap-12">
        <div className="flex max-w-[560px] flex-[1_1_420px] flex-col gap-7">
          <p className="m-0 text-lg leading-relaxed text-ink-2">
            I’m Katerina, a Computer Science student at Goldsmiths, University of London. I build web and mobile
            products end to end. Caring about how they look, how they feel and how they hold up under pressure.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#work" className={`${buttonBase} bg-accent !text-on-accent`}>
              See selected work
            </a>
            <a href="#contact" className={`${buttonBase} border border-line bg-surface !text-ink`}>
              Get in touch
            </a>
          </div>
        </div>

        <dl className="m-0 grid flex-[0_1_380px] grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-line pt-5 font-mono text-[13px] leading-normal max-sm:flex-[1_1_100%]">
          <dt className="text-muted">based</dt>
          <dd className="m-0">
            London, UK · <LondonTime />
          </dd>
          <dt className="text-muted">studying</dt>
          <dd className="m-0">Computer Science @ Goldsmiths</dd>
          <dt className="text-muted">building</dt>
          <dd className="m-0">StayPilot — property management</dd>
          <dt className="text-muted">exploring</dt>
          <dd className="m-0">dance × computer vision</dd>
        </dl>
      </motion.div>
    </motion.section>
  );
}
