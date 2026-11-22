import { Reveal } from "./Reveal";
import { Em, Eyebrow } from "./ui";

const habits = [
  {
    title: "Learn by building",
    body: "Every new idea gets a prototype. Right now that means machine learning — from small models to turning dance into art.",
    bg: "bg-card-blue",
  },
  {
    title: "Design is part of the spec",
    body: "Motion, type and spacing get the same attention as the API. Something should feel as good as it works.",
    bg: "bg-card-green",
  },
  {
    title: "Show the working",
    body: "Small, deliberate commits from first sketch to final polish. Progress you can read straight from the git log.",
    bg: "bg-card-peach",
  },
];

export function Approach() {
  return (
    <section id="approach" className="border-y border-line bg-white">
      <div className="wrap section-y">
        <Reveal className="mb-14 flex flex-col gap-4">
          <Eyebrow>02 — approach</Eyebrow>
          <h2 className="h2-display max-w-[900px]">
            Three habits behind <Em>everything I ship.</Em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
          {habits.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.1}>
              <article
                className={`${h.bg} flex h-full min-h-[340px] flex-col gap-14 rounded-[20px] p-8 text-ink-2 transition-[transform,box-shadow] duration-[350ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(21,23,28,.35)]`}
              >
                <span className="font-mono text-xs">fig. {String(i + 1).padStart(2, "0")}</span>
                <div className="mt-auto flex flex-col gap-3.5">
                  <h3 className="m-0 font-display text-[28px] font-medium tracking-[-0.03em] text-ink">{h.title}</h3>
                  <p className="m-0 text-base leading-relaxed">{h.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
