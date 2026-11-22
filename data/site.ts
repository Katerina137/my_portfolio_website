import { projects } from "./projects";

// TODO: replace with your real links.
export const links = {
  email: "Kmatthaiou61@gmail.com",
  github: "https://github.com/Katerina137",
  linkedin: "https://www.linkedin.com/in/katerina-matthaiou-38732a385",
};

export const stack = [
  "Python", "TypeScript", "React", "Next.js", "Flask", "FastAPI", "Node",
  "SQL", "C", "Java", "Linux", "Framer Motion", "Tailwind", "p5.js",
];

/** Lines that appear in the loader as the counter passes `at`. */
export const bootLogs = [
  { at: 6, text: "> resolving location … london, uk" },
  { at: 24, text: "> linking goldsmiths/computer-science" },
  { at: 46, text: `> mounting projects (${String(projects.length).padStart(2, "0")})` },
  { at: 68, text: "> training models … ok" },
  { at: 90, text: "> polishing the details …" },
];
