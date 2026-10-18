# bevel.css

Bootstrap 2.0's look, brought up to date and in light and dark, for every app on hearth, in one plain stylesheet built only on CSS that has worked in every major browser for at least 30 months. No build step, no web fonts, no images, no JavaScript.

The site lives in `site/`. Open `site/index.html` in a browser for what it is and why, and `site/reference.html` for every class, variant and state; `changelog.html` and `source.html` sit beside them. Their page-only styles are in `site/docs.css`, which isn't part of the library. Open `demo/index.html` to see the classes in a small made-up app, with no CSS of its own.

## Using it

Copy a release file into your app's static folder and link it before your own stylesheet:

```html
<link rel="stylesheet" href="/static/bevel-0.6.0.css">
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
| Size, tokens, coverage, releases | `bevel_test.go` |
| Visual, accessibility | `tests/`, `playwright.config.js` |

Visual baselines live in `tests/__screenshots__/<platform>/`, so each OS keeps its own.

A component is styled inside an app first and promoted here when a second app needs it: add it to the spec and to `site/reference.html` with every state, build it in `bevel.components` using `--bv-` variables only, pass every gate, then add a changelog entry to `CHANGELOG.md` and `site/changelog.html` and bump the minor version.
