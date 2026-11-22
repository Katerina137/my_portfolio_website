export type Project = {
  /** Shown as the tab label and in the code window path. */
  file: string;
  kind: string;
  status: string;
  title: string;
  desc: string;
  role: string;
  stack: string[];
  lang: string;
  /** Background behind the code window. Colours are defined per theme in app/globals.css (--tint-*). */
  tint: "rose" | "olive" | "sand" | "blush";
  /** Short, simplified excerpt shown in the code window. */
  snippet: string;
};

// Add a project by adding an object here. Numbering, tabs and the
// "01 / 06" counter all update automatically.
export const projects: Project[] = [
  {
    file: "sidequest.jsx",
    kind: "full-stack platform",
    status: "graded 97%",
    title: "SideQuest",
    desc: "A full-stack volunteer management platform built in a team of three. I led most of the frontend, contributed significantly to the Flask backend, and wrote the bulk of the documentation.",
    role: "primary contributor — frontend, backend, docs",
    stack: ["JavaScript / JSX", "Flask", "Python"],
    lang: "py",
    tint: "olive",
    snippet: `@app.route("/quests", methods=["GET"])
def list_quests():
    quests = Quest.query.filter_by(open=True)
    return jsonify([q.to_dict() for q in quests])

# team of 3 · grade: 97%`,
  },
  {
    file: "staypilot.tsx",
    kind: "web app",
    status: "in build",
    title: "StayPilot",
    desc: "A property management system for rental owners, covering bookings, guests, finances, cleaning and maintenance. Built frontend-first on mock data, starting with properties, bookings and the calendar.",
    role: "solo — design & engineering",
    stack: ["React", "Vite", "TypeScript", "Tailwind v4"],
    lang: "tsx",
    tint: "rose",
    snippet: `type Module =
  | "properties" | "bookings"
  | "calendar"   | "guests"
  | "finances"   | "cleaning";

// mock data first, backend next`,
  },
  {
    file: "dance-to-art.py",
    kind: "final-year project",
    status: "in research",
    title: "Dance → Abstract Art",
    desc: "My final-year project: using computer-vision pose estimation to translate dance into abstract artwork that carries the emotion and expression of the movement.",
    role: "solo — research & build",
    stack: ["computer vision", "pose estimation", "generative art"],
    lang: "py",
    tint: "blush",
    snippet: `for frame in stream:
    pose = estimator.track(frame)
    feeling = read_expression(pose)
    canvas.paint(feeling)   # movement → mark`,
  },
  {
    file: "draw-app.js",
    kind: "creative coding",
    status: "shipped",
    title: "Interactive Drawing App",
    desc: "A browser drawing application built with p5.js — brushes, tools and a canvas that responds the moment you move.",
    role: "solo",
    stack: ["p5.js", "JavaScript"],
    lang: "js",
    tint: "sand",
    snippet: `function draw() {
  if (mouseIsPressed) {
    tool.stroke(pmouseX, pmouseY, mouseX, mouseY);
  }
}`,
  },
];
