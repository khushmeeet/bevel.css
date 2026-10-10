// Visual and accessibility gates: Chromium, Firefox and WebKit, each at a
// phone width (375px) and a desktop width (1280px).

import { defineConfig, devices } from "@playwright/test";

const browsers = {
  chromium: devices["Desktop Chrome"],
  firefox: devices["Desktop Firefox"],
  webkit: devices["Desktop Safari"],
};

const widths = [375, 1280];

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? "list" : [["list"], ["html", { open: "never" }]],

  // Baselines are per platform: fonts render differently on each OS.
  snapshotPathTemplate: "{testDir}/__screenshots__/{platform}/{projectName}/{arg}{ext}",

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.001,
      animations: "disabled",
      caret: "hide",
    },
  },

  projects: Object.entries(browsers).flatMap(([name, device]) =>
    widths.map((width) => ({
      name: `${name}-${width}`,
      use: { ...device, viewport: { width, height: 900 } },
    })),
  ),
});
