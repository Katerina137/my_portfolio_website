import { stack } from "@/data/site";

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex" aria-hidden={hidden || undefined}>
      {stack.map((label) => (
        <span
          key={label}
          className="inline-flex items-center gap-5 px-5 py-[22px] font-display text-xl font-medium after:text-sm after:text-accent after:content-['✶']"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="group flex items-center overflow-hidden border-y border-line bg-surface">
      <div className="relative z-[1] flex-none border-r border-line bg-surface px-[clamp(20px,3vw,32px)] py-[22px] font-mono text-[13px] text-muted">
        stack.ts
      </div>
      {/* Two copies so the -50% loop is seamless */}
      <div className="flex w-max animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
