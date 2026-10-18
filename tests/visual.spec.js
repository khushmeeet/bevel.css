// Visual gate: the full reference page, plus hover, focus, pressed and
// disabled states, compared against approved baselines. After reviewing a
// diff, update baselines with `make update-snapshots` and commit them with
// the CSS change.

import { test, expect } from "@playwright/test";

const reference = new URL("../site/reference.html", import.meta.url).href;

// Firefox on macOS can lay out the first page a fresh browser opens with a
// stand-in for Helvetica Neue, so text is a little wider and some lines a
// pixel taller. Every later page gets the real font. Open the page once per
// worker first, so every screenshot sees what a person would.
test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  await page.goto(reference);
  await page.close();
});

test.beforeEach(async ({ page }) => {
  await page.goto(reference);
});

test("full page", async ({ page }) => {
  await expect(page).toHaveScreenshot("reference.png", { fullPage: true });
});

// The page scrolled so the bar sits over a heading: at 1280 the bar stays on
// top with its sticky shadow; at 375 it has scrolled away with the page.
test("navbar-sticky-scrolled", async ({ page }) => {
  await page.locator("#buttons .page-header").evaluate((header) => {
    window.scrollTo(0, header.getBoundingClientRect().top + window.scrollY - 20);
  });
  const { width } = page.viewportSize();
  await expect(page).toHaveScreenshot("navbar-sticky-scrolled.png", {
    clip: { x: 0, y: 0, width, height: 96 },
  });
});

// Leaving a button slides the gloss back down as gradually as hovering slid
// it up, and fades the fill back with it, under a gloss that covers the
// whole face throughout, so nothing wipes across it. The screenshots above
// freeze animations, so this reads the styles halfway through instead. The
// motion token is stretched to 10s here so the test can't miss a 100ms
// transition on a busy machine.
test("button-unhover slides back under the gloss", async ({ page }) => {
  await page.addStyleTag({ content: ":root { --bv-duration-fast: 10s; }" });
  const button = page.locator("#btn-primary");
  const rest = await button.evaluate((el) => {
    const style = getComputedStyle(el);
    return { fill: style.backgroundColor, gloss: style.backgroundImage, position: style.backgroundPosition };
  });
  await button.hover();
  const hover = await button.evaluate((el) => {
    el.getAnimations().forEach((a) => a.finish());
    const style = getComputedStyle(el);
    return { fill: style.backgroundColor, position: style.backgroundPosition };
  });
  await page.mouse.move(0, 0);

  const halfway = await button.evaluate((el) => {
    const transitions = el.getAnimations();
    for (const transition of transitions) {
      transition.pause();
      transition.currentTime = 5000;
    }
    const style = getComputedStyle(el);
    return {
      properties: transitions.map((t) => t.transitionProperty).sort(),
      fill: style.backgroundColor,
      gloss: style.backgroundImage,
      position: style.backgroundPosition,
    };
  });
  expect(hover.position).not.toBe(rest.position);
  expect(halfway.properties).toContain("background-color");
  expect(halfway.properties.some((p) => p.startsWith("background-position"))).toBe(true);
  expect(halfway.gloss).toBe(rest.gloss);
  expect(halfway.position).not.toBe(rest.position);
  expect(halfway.position).not.toBe(hover.position);
  expect(halfway.fill).not.toBe(rest.fill);
  expect(halfway.fill).not.toBe(hover.fill);
});

// Each state puts `target` into a state, then captures the `capture` region.
const states = [
  { name: "button-hover-default", action: "hover", target: "#btn-default", capture: "#buttons-variants" },
  { name: "button-hover-primary", action: "hover", target: "#btn-primary", capture: "#buttons-variants" },
  { name: "button-hover-danger", action: "hover", target: "#btn-danger", capture: "#buttons-variants" },
  { name: "button-pressed-default", action: "press", target: "#btn-default", capture: "#buttons-variants" },
  { name: "button-pressed-primary", action: "press", target: "#btn-primary", capture: "#buttons-variants" },
  { name: "button-focus", action: "focus", target: "#btn-primary", capture: "#buttons-variants" },
  { name: "button-disabled-hover", action: "hover", target: "#btn-disabled", capture: "#buttons-disabled" },
  { name: "button-disabled-press", action: "press", target: "#btn-disabled", capture: "#buttons-disabled" },
  { name: "button-group-hover", action: "hover", target: "#group-demo .btn-group .btn >> nth=1", capture: "#group-demo" },
  { name: "button-group-focus", action: "focus", target: "#group-demo .btn-group .btn >> nth=1", capture: "#group-demo" },
  { name: "nav-hover", action: "hover", target: "#navbar-demo .nav a >> nth=1", capture: "#navbar-demo" },
  { name: "nav-focus", action: "focus", target: "#navbar-demo .nav a >> nth=1", capture: "#navbar-demo" },
  { name: "link-hover", action: "hover", target: "#link-demo a", capture: "#link-demo" },
  { name: "field-focus", action: "focus", target: "#f-name", capture: "#group-name" },
  { name: "field-error-focus", action: "focus", target: "#f-port", capture: "#group-port" },
  { name: "checkbox-focus", action: "focus", target: "#f-boot", capture: "#group-checkboxes" },
  { name: "table-row-hover", action: "hover", target: "#table-striped tbody tr:first-child td:first-child", capture: "#table-striped-scroll" },
  { name: "addon-focus", action: "focus", target: "#f-budget", capture: "#group-addon-prefix" },
  { name: "addon-error-focus", action: "focus", target: "#f-quota", capture: "#group-addon-error" },
  { name: "pagination-hover", action: "hover", target: "#pagination-last li:nth-child(3) a", capture: "#pagination-last" },
  { name: "pagination-focus", action: "focus", target: "#pagination-last li:nth-child(3) a", capture: "#pagination-last" },
];

for (const { name, action, target, capture } of states) {
  test(name, async ({ page }) => {
    const element = page.locator(target);

    if (action === "hover") {
      await element.hover();
    } else if (action === "press") {
      await element.hover();
      await page.mouse.down();
    } else if (action === "focus") {
      // A key press first, so the browser treats the focus as keyboard focus
      // and :focus-visible matches.
      await page.keyboard.press("Tab");
      await element.focus();
    }

    await expect(page.locator(capture)).toHaveScreenshot(`${name}.png`);

    if (action === "press") await page.mouse.up();
  });
}
