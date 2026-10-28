// The light and dark switch and the headings switch in the navbar of the
// demo and the site. Not part of bevel.css, which needs no JavaScript: it
// follows the system setting until <html> has data-theme="light" or "dark",
// and sets headings in Helvetica Neue until an element has .display-serif.
// This script sets that attribute and that class on <html>, remembers each
// choice across pages, and shows the switches, which stay hidden without
// it. Each switch shows what a click does: a moon in light, a sun in dark;
// "Serif" while headings are in Helvetica Neue, "Sans" while they're in
// the serif. Load it in <head> so a saved choice applies before the page
// is drawn.
(() => {
  const root = document.documentElement;
  const systemDark = matchMedia("(prefers-color-scheme: dark)");
  const key = "bevel-theme";
  const icons = {
    dark: '<path d="M13.5 10.1A6 6 0 0 1 5.9 2.5a6 6 0 1 0 7.6 7.6Z"/>',
    light: '<circle cx="8" cy="8" r="3"/><path d="M8 1.5V3M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.06 1.06M11.54 11.54l1.06 1.06M3.4 12.6l1.06-1.06M11.54 4.46l1.06-1.06"/>',
  };

  let saved = null;
  try {
    saved = localStorage.getItem(key);
  } catch {
    // Storage is off: the switch still works, for this page.
  }
  if (saved === "light" || saved === "dark") root.dataset.theme = saved;

  const current = () => root.dataset.theme ?? (systemDark.matches ? "dark" : "light");

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("[data-theme-toggle]");
    if (!button) return;
    const icon = button.querySelector("svg");
    const words = button.querySelector(".visually-hidden");

    // The button offers the other scheme.
    const sync = () => {
      const next = current() === "dark" ? "light" : "dark";
      const label = `Switch to ${next} mode`;
      icon.innerHTML = icons[next];
      words.textContent = label;
      button.title = label;
    };

    button.addEventListener("click", () => {
      const theme = current() === "dark" ? "light" : "dark";
      root.dataset.theme = theme;
      try {
        localStorage.setItem(key, theme);
      } catch {}
      sync();
    });
    systemDark.addEventListener("change", sync);
    sync();
    button.hidden = false;
  });
})();

(() => {
  const root = document.documentElement;
  const key = "bevel-headings";

  let saved = null;
  try {
    saved = localStorage.getItem(key);
  } catch {
    // Storage is off: the switch still works, for this page.
  }
  if (saved === "serif") root.classList.add("display-serif");

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("[data-headings-toggle]");
    if (!button) return;
    const name = button.querySelector("[data-headings-name]");

    // The button offers the other face.
    const sync = () => {
      const next = root.classList.contains("display-serif") ? "sans" : "serif";
      name.textContent = next === "serif" ? "Serif" : "Sans";
      button.title = next === "serif" ? "Set headings in Iowan Old Style" : "Set headings in Helvetica Neue";
    };

    button.addEventListener("click", () => {
      const serif = root.classList.toggle("display-serif");
      try {
        localStorage.setItem(key, serif ? "serif" : "sans");
      } catch {}
      sync();
    });
    sync();
    button.hidden = false;
  });
})();
