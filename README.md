# bevel.css

Bootstrap 2.0's look for every app on hearth, in one plain stylesheet built only on CSS that has worked in every major browser for at least 30 months. No build step, no web fonts, no images, no JavaScript.

Open `reference.html` in a browser to see every class, variant and state.

## Using it

Copy a release file into your app's static folder and link it before your own stylesheet:

```html
<link rel="stylesheet" href="/static/bevel-0.1.0.css">
<link rel="stylesheet" href="/static/app.css">
```

The version is in the filename, so the file can be cached forever. To upgrade, copy the new file in, update the link, delete the old file and check the app.

Everything in bevel.css sits in `@layer bevel.*`. Write your app's CSS outside any layer and it wins without `!important`. Override tokens in your own `:root`:

```css
:root {
  --bv-color-link: #0066A0;
}
```

## Developing

Needs Node and Go.

```sh
make test              # every gate: lint, size, tokens, coverage, visual, accessibility
make update-snapshots  # after reviewing a visual diff; commit baselines with the CSS change
make release           # runs the gates, then writes dist/bevel-<version>.css
```

| Gate | Where |
| --- | --- |
| Baseline (Widely available only) and house rules | `stylelint.config.js`, `stylelint/` |
| Size, tokens, coverage | `bevel_test.go` |
| Visual, accessibility | `tests/`, `playwright.config.js` |

Visual baselines live in `tests/__screenshots__/<platform>/`, so each OS keeps its own.

A component is styled inside an app first and promoted here when a second app needs it: add it to the spec and to `reference.html` with every state, build it in `bevel.components` using `--bv-` variables only, pass every gate, then add a changelog entry and bump the minor version.
