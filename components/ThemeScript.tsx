"use client";

// Sets the theme before the page paints, so there's no flash of the wrong colours.
// Saved choice wins; otherwise follow the device setting.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`;

/**
 * The browser runs this from the server-rendered HTML. In the browser React renders it
 * as an inert data block (type="text/plain"), since React never runs scripts on the
 * client and warns if it is asked to.
 */
export function ThemeScript() {
  return (
    <script
      suppressHydrationWarning
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
}
