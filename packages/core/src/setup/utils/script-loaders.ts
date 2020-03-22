export const loadRollup = () =>
  new Promise(resolve => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/rollup@latest/dist/rollup.browser.js";
    script.setAttribute("data-packager", "true");
    script.onload = resolve;
    document.head.appendChild(script);
  });

export const loadMagicString = () =>
  new Promise(resolve => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/magic-string@latest/dist/magic-string.umd.min.js";
    script.setAttribute("data-packager", "true");
    script.onload = resolve;
    document.head.appendChild(script);
  });
