// Accessibility gate: axe-core against WCAG 2.2 AA, reflow at 320px, and
// keyboard focus never hidden under the sticky navbar.
//
// The one documented exception, field borders at 1.6:1 (under the 3:1 target
// for component boundaries), is not something axe checks, so no rule is
// turned off here.

import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const reference = new URL("../site/reference.html", import.meta.url).href;

const describe = (violation) =>
  `${violation.id}: ${violation.help}\n` +
  violation.nodes.map((node) => `  ${node.target.join(" ")}`).join("\n");

test("no WCAG 2.2 AA violations", async ({ page }) => {
  await page.goto(reference);

  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(violations.map(describe)).toEqual([]);
});

test("reflows without horizontal scrolling at 320px", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.endsWith("-375"), "runs once per browser");

  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto(reference);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBe(0);
});

test("keyboard focus never goes under the sticky navbar", async ({ page, browserName }, testInfo) => {
  test.skip(!testInfo.project.name.endsWith("-1280"), "the bar is only sticky from 768px");

  await page.goto(reference);

  // Shift+Tab back up the page from the last control. Going backwards, the
  // browser scrolls each control in at the top edge, where the bar sits
  // (WCAG 2.4.11). This checks the stricter case: no part of it covered.
  // WebKit never scrolls a read-only text field into view on focus, bar or no
  // bar, so those are left out there.
  await page.evaluate(() => {
    const controls = document.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    controls[controls.length - 1].focus();
  });

  const covered = [];
  for (let presses = 0; presses < 500; presses++) {
    await page.keyboard.press("Shift+Tab");
    const focus = await page.evaluate(async () => {
      // WebKit scrolls a focused text field into view a frame or two later,
      // so wait until the page stops scrolling before measuring.
      const frames = () => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
      let last;
      do {
        last = window.scrollY;
        await frames();
      } while (window.scrollY !== last);

      const bar = document.querySelector(".navbar-sticky");
      const control = document.activeElement;
      if (control === document.body || bar.contains(control)) return null;
      return {
        name: control.id || control.textContent.trim().slice(0, 40) || control.outerHTML.slice(0, 80),
        readOnly: control.readOnly === true,
        covered: control.getBoundingClientRect().top < bar.getBoundingClientRect().bottom,
      };
    });
    if (!focus) break;
    if (focus.readOnly && browserName === "webkit") continue;
    if (focus.covered) covered.push(focus.name);
  }

  expect(covered).toEqual([]);
});
