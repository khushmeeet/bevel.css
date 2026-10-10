// Lint gates for bevel.css: the Baseline gate and the house rules.

/** @type {import("stylelint").Config} */
export default {
  plugins: ["stylelint-plugin-use-baseline", "./stylelint/rules-in-layers.js"],
  rules: {
    // Baseline: only Widely available features, unless inside @supports.
    "plugin/use-baseline": [true, { available: "widely" }],

    // House rules.
    "declaration-no-important": true,
    "selector-max-id": 0,
    "selector-max-specificity": "0,2,0",
    "custom-property-pattern": [
      "^bv-[a-z0-9]+(-[a-z0-9]+)*$",
      { message: (name) => `Expected custom property "${name}" to start with --bv-` },
    ],
    "bevel/rules-in-layers": true,

    // Typos.
    "color-no-invalid-hex": true,
    "declaration-block-no-duplicate-properties": true,
    "function-no-unknown": true,
    "property-no-unknown": true,
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-element-no-unknown": true,
    "unit-no-unknown": true,
  },
};
