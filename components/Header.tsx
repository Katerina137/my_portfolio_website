import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="wrap relative z-[5] flex flex-wrap items-center justify-between gap-4 py-7">
      <a href="#top" className="flex items-baseline gap-2.5 text-ink no-underline">
        <span className="font-display text-[22px] font-semibold tracking-[-0.03em]">Katerina Matthaiou</span>
        <span className="font-mono text-xs text-muted">/KM</span>
      </a>
      <nav
        aria-label="Main"
        className="flex flex-wrap items-center gap-[clamp(14px,2.4vw,32px)] font-mono text-[13px] [&_a]:no-underline"
      >
        <a href="#work">01 work</a>
        <a href="#approach">02 approach</a>
        <a href="#about">03 about</a>
        <a
          href="#contact"
          className="inline-flex min-h-11 items-center rounded-full bg-ink px-[18px] py-3 !text-inverse transition-transform duration-300 hover:-translate-y-0.5"
        >
          say hello →
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
