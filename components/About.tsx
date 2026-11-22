import { Reveal } from "./Reveal";
import { Em, Eyebrow } from "./ui";

const details = [
  { label: "education", title: "Computer Science", sub: "Goldsmiths, University of London" },
  { label: "experience", title: "IT Intern", sub: "Archirodon Group N.V., Athens" },
  { label: "currently learning", title: "Computer vision", sub: "Pose estimation, OpenCV, MediaPipe" },
  { label: "toolbox", title: "Python · JS/TS · Java · C · SQL", sub: "React, Next.js, Flask, FastAPI, Linux" },
];

export function About() {
  return (
    <section id="about" className="wrap section-y flex flex-wrap gap-[clamp(40px,6vw,96px)]">
      <Reveal className="m-0 flex min-w-0 flex-[0_1_420px] flex-col gap-3.5">
        {/*
          To add your photo: put it in /public (e.g. public/portrait.jpg), then replace the div below with:
          <Image src="/portrait.jpg" alt="Katerina in London" width={840} height={1050} priority={false}
                 className="aspect-[4/5] w-full rounded-[20px] object-cover" />
          and add `import Image from "next/image";` at the top.
        */}
        <div className="flex aspect-[4/5] w-full items-center justify-center rounded-[20px] border border-dashed border-[#a9b0d6] bg-lavender font-mono text-[13px] text-ink-2">
          [ YOUR PORTRAIT ]
        </div>
        <span className="font-mono text-xs text-muted">fig. b — katerina, london</span>
      </Reveal>

      <Reveal className="flex min-w-0 flex-[1_1_520px] flex-col gap-8" delay={0.1}>
        <Eyebrow>03 — about</Eyebrow>
        <h2 className="h2-display">
          About <Em>Katerina.</Em>
        </h2>
        <div className="flex max-w-[680px] flex-col gap-[18px] text-lg leading-[1.65] text-ink-2">
          <p className="m-0">
            I study Computer Science at Goldsmiths, where I focus on full-stack development and am growing into
            machine learning — building products that look good, work well, and get a little smarter over time.
          </p>
          <p className="m-0">
            Outside the coursework I’m building StayPilot, a property management system, and my final-year project
            uses pose estimation to turn dance into abstract art.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] border-t border-line">
          {details.map((d) => (
            <div key={d.label} className="flex flex-col gap-2 border-b border-line py-[22px] pr-6">
              <span className="font-mono text-xs text-muted">{d.label}</span>
              <span className="text-base font-medium">{d.title}</span>
              <span className="text-[15px] text-ink-2">{d.sub}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
