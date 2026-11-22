"use client";

import { useEffect, useState } from "react";

function londonNow() {
  const d = new Date();
  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" });
  const tz = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", timeZoneName: "short" })
    .formatToParts(d)
    .find((p) => p.type === "timeZoneName");
  return `${time} ${tz?.value ?? "GMT"}`;
}

/** Live London time, e.g. "07:26 GMT". Renders a placeholder on the server to avoid hydration mismatches. */
export function LondonTime() {
  const [label, setLabel] = useState("--:-- GMT");

  useEffect(() => {
    const tick = () => setLabel(londonNow());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{label}</span>;
}
