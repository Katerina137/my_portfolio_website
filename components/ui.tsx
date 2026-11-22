/** The italic serif accent used inside headings. */
export function Em({ children }: { children: React.ReactNode }) {
  return <em className="font-serif font-normal tracking-[-0.01em] text-accent">{children}</em>;
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-[13px] text-muted ${className}`}>{children}</span>;
}

export const buttonBase =
  "inline-flex min-h-12 items-center gap-2 rounded-full px-[22px] py-[15px] text-[15px] font-medium no-underline transition-transform duration-300 hover:-translate-y-0.5";
