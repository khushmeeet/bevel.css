# bevel.css — Product Spec

Oct 8, 2026 · @Khushmeet Singh

## Summary

bevel.css is one plain stylesheet that gives every app hosted on hearth Bootstrap 2.0's look, brought up to date, built only on CSS that has worked in every major browser for at least 30 months.

It is for one person's own apps: server-rendered Go pages with little or no JavaScript. The visual reference is the [Bootstrap 2.0.0 documentation](https://bootstrapdocs.com/v2.0.0/docs/), especially its [Components page](https://bootstrapdocs.com/v2.0.0/docs/components.html). The first approved preview is the *Bootstrap 2.0 docs (preview)* board on the [Hearth UI design canvas](https://claude.ai/artifact/AtJvchQdnzcs1GDoqpBPvC).

The frame is 2012: Helvetica Neue, a dark bar across the top, buttons lit from above, sunken fields, grid paper to open an app, and 2.0's class names. The drawing is current: 14px text, neutral greys and one blue, softer shadows, and a dark mode. So is the engineering. Measurements below are bevel's own; where one keeps a 2.0.0 value, or departs from one for contrast, the text says so.

## Goals, principles and non-goals

The library succeeds if every app looks like it came from the same hand, loads instantly, and still works untouched in ten years.

### Goals

1. **One look across all apps.** Bootstrap 2.0's visual language, brought up to date and applied consistently.
2. **Light.** At most 20 KB gzipped, zero web fonts, zero images, zero JavaScript.
3. **Durable.** One plain CSS file, no build step, only Baseline Widely available features.
4. **Grown on demand.** Small core first; components are added only when a real app needs them.

### Design principles

- **Physical, not flat.** Light comes from above: 2.0's gloss on buttons and a highlight along their top edge, darker bottom borders, recessed fields, wells and tracks, 1px text emboss, and a navbar lit from the top.
- **One rhythm.** 14px text on a 20px line, with the grid paper ruled at the same 20px. Blocks keep 2.0's spacing in steps of 9px.
- **Color means something.** Blue is action and links. Green, amber and red are status. Everything else is grey.
- **Light and dark.** Every color and shadow has a dark value, and the page follows the system's setting.
- **Small, quick motion.** Transitions of 100–200ms on color, background and shadow only. Nothing moves the layout.
- **The app speaks, not the library.** Personal voice lives in each app's copy; the library stays neutral.

### Non-goals

- A Bootstrap clone. No jQuery plugins, no 12-column grid, no LESS or Sass.
- A framework for other people. No theming API beyond tokens, no backwards-compatibility promises to strangers.
- Legacy browsers. Nothing that isn't Baseline Widely available is supported or polyfilled.
- Utility-first styling. A handful of utilities at most; components carry the design.

## Scope

v0.1 ships ten areas: enough for a page, a nav, text, a form, a table and feedback. v0.2 adds input add-ons, pagination, wells with empty states, progress bars, stats, a screen-reader-only utility, spacing after rows and around headings, and a documented pattern for confirming before deleting, all found missing while building the money demo. v0.3 redraws every component on the same classes, with 14px type, a new palette and softer depth, and adds a dark mode, the grid paper behind each page's title, and `h2` as a section label. Candidates are added only under the promotion rule in *Distribution and versioning*.

| Area | Release | Includes |
| --- | --- | --- |
| Tokens and base typography | v0.1 | Color, type, spacing, radius, shadow and motion tokens; headings, paragraphs, links, `small`, `code`, `pre`, `hr` |
| Layout | v0.1 | `.container`, `.row` with `.cols-2`, `.cols-3`, `.cols-4`; `.page-header` |
| Navbar | v0.1 | Dark top bar, links, active state, vertical divider, brand on either side, `.nav-end` for links on the right, optional sticky bar |
| Buttons | v0.1 | Default, primary, danger; small and large; disabled; `.btn-group`, `.btn-toolbar` |
| Forms | v0.1 | Stacked only: label, text inputs, select, textarea, checkbox, radio, help text, error state, `.form-actions` |
| Tables | v0.1 | `.table` with bordered, striped and condensed modifiers; row hover |
| Alerts | v0.1 | Warning (default), error, success, info; `.alert-block` |
| Labels and badges | v0.1 | Default, success, warning, important, info, inverse |
| Hero unit | v0.1 | `.hero-unit`, an opt-in large callout to open a page; `.hero-unit-grid` for the grid paper on the page color |
| Utilities | v0.1 | `.muted`, `.text-right`, `.table-scroll`; `.visually-hidden` from v0.2 |
| Input add-ons | v0.2 | `.input-prepend`, `.input-append` and `.add-on`, for a unit or fixed part such as `$`, `MB` or `git@` |
| Pagination | v0.2 | `.pagination`, numbered page links for long lists |
| Wells and empty states | v0.2 | `.well`, an inset panel; `.well-empty`, the message in place of an empty list |
| Progress bars | v0.2 | `.progress` and `.bar`: plain, striped and animated striped; default, success, warning and danger |
| Stats | v0.2 | `.stats`, a big figure with a small label, for a home page's numbers |
| Confirm before deleting | v0.2 | A documented pattern, no CSS: a confirmation page in place of a dialog |
| Dark mode | v0.3 | A dark value for every color and shadow, following the system's setting |
| Forced color scheme | Unreleased | `data-theme="light"` or `"dark"` on `<html>` overrides the system's setting, for an app that must stay one way or offers a switch |
| Grid paper and section labels | v0.3 | `.grid-paper`, the 20px grid behind the top of the page that opens an app; `h2` as a small-capitals label with a dotted leader to its subtitle |
| Masthead and section bar | Candidate | `.subhead`, a masthead on the grid paper; sticky `.subnav` |
| Tabs and pills | Candidate | CSS only, for links between pages |
| Dropdowns and carets | Candidate | Built on `<details>`; a small `bevel.js` only if a case needs it |
| Modal | Candidate | Built on `<dialog>`; for confirming a delete, see *Patterns* |
| Breadcrumbs | Candidate | For deep pages |
| Code blocks with line numbers | Candidate | Docs-style gutter and syntax colors |
| Horizontal forms | Candidate | Label-left layout |
| More button colors | Candidate | Success, info, warning, inverse |
| Dismissible alerts | Candidate | Close button; needs JavaScript |
| Carousel, typeahead, scrollspy, affix, popovers, thumbnails, collapsing navbar, 12-column grid | Never | Marketing-site features, or replaced by plain CSS |

## Technical baseline

Only features that are Baseline Widely available (in every major browser for 30+ months) may be used; lint enforces this, and anything newer must sit inside `@supports` with a working fallback.

| Feature | Decision | Where it's used |
| --- | --- | --- |
| Custom properties | Use | All tokens and component variables |
| Cascade layers (`@layer`) | Use | Library order below; app CSS stays unlayered and always wins |
| Flexbox, grid, `gap` | Use | All layout |
| Media queries with range syntax; `prefers-reduced-motion`; `hover` | Use | Breakpoints; turning motion off; hover styles only where a pointer hovers |
| `:focus-visible`, `:is()`, `:where()` | Use | Focus rings; zero-specificity base styles |
| Logical properties (`padding-inline`, `margin-block`) | Use | All spacing |
| `rem`, `min()`, `clamp()` | Use | Type sizes and widths |
| `color-mix()` | Use | Derived tints only, never a base token: link underlines, a button's darker bottom edge |
| `accent-color` | Use | Checkbox and radio tint |
| `<dialog>`, `<details>` | Use | Modal and dropdowns without JavaScript (v0.2) |
| `text-underline-offset` | Use | Link underlines |
| `text-wrap: pretty`, `balance` | No | `pretty` renders differently from run to run in Firefox, which breaks the visual gate; `balance` splits a title from its subtitle |
| `prefers-color-scheme`, `color-scheme` | Use | Dark mode, and native controls that follow it |
| `:has()` | Use | The sticky navbar's scroll padding; an `h2`'s leader |
| Native nesting | Later | Widely available since mid-2026 |
| Popover API, `light-dark()` | Later | Become Widely available late 2026 |
| Container queries | Later | Available, but media queries cover v0.1 |
| Anchor positioning, `@scope`, `@property`, relative color syntax, view transitions | No | Not yet Widely available |

### Layer order

```css
@layer bevel.reset, bevel.base, bevel.layout, bevel.components, bevel.utilities;
```

1. `bevel.reset`: `box-sizing: border-box` everywhere; margins removed from headings, paragraphs and lists; images and video capped at their container's width.
2. `bevel.base`: element styles (body, headings, links, `code`, `pre`, `hr`, form controls), all inside `:where()` so their specificity is zero.
3. `bevel.layout`: `.container`, `.row`, `.grid-paper`, `.page-header`.
4. `bevel.components`: navbar, buttons, form classes and add-ons, tables, alerts, labels, badges, hero unit, pagination, progress bars, stats, wells.
5. `bevel.utilities`: `.muted`, `.text-right`, `.table-scroll`, `.visually-hidden`; the rule that trims the last margin in each `.row` column, and the reduced-motion override, both here because they must beat component styles.

An app's own CSS is written outside any layer, so it overrides the library without `!important` or specificity tricks.

### Conventions

- **One file.** `bevel.css`, UTF-8, unminified, with a comment heading each section. No preprocessor, no build step, no JavaScript in v0.1.
- **Class names follow Bootstrap 2.x** (`.btn`, `.btn-primary`, `.btn-small`, `.table-striped`, `.alert-error`, `.label-important`, `.control-group`, `.help-block`, `.form-actions`), so the 2.x docs double as documentation.
- **States accept the class or the ARIA form.** `.active` or `[aria-current="page"]`; `.disabled`, `:disabled` or `[aria-disabled="true"]`; `.control-group.error` or `[aria-invalid="true"]`.
- **Every custom property starts with `--bv-`.** Global tokens are `--bv-<group>-<name>` (`--bv-color-link`). Component variables are `--bv-<component>-<property>` (`--bv-btn-bg`), declared on the component's root; variants only reassign variables.
- **Specificity stays flat.** No IDs, no `!important`, at most one class plus one state (0,2,0).
- **Units.** `rem` for type, line heights and spacing, with the root left at the browser default of 16px; `px` for borders, radii and shadows. Line heights are rem lengths (20px = 1.25rem), except the body's, a ratio so larger text keeps proportional leading.
- **Breakpoints.** Mobile-first at 768px, 980px and 1200px, written as `@media (width >= 768px)`.

## Color

Neutral greys with a cool cast, one blue for everything you can press or follow, and red for what can't be undone; green, amber and red also carry status. Every color has a light value and a dark one. The dark values apply under `prefers-color-scheme: dark`, and `color-scheme: light dark` turns native parts such as select arrows and scrollbars dark with them. Each text pair is measured where it renders, in both schemes, and reaches 4.5:1.

### Neutrals

| Token | Light | Dark | Used for | Contrast, light / dark |
| --- | --- | --- | --- | --- |
| `--bv-color-text` | #1F2328 | #E4E7EB | Body text, headings, field text, inline code | 15.8:1 / 13.3:1 on the page |
| `--bv-color-muted` | #59636E | #9CA4AE | Help text, subtitles, `.muted`, placeholders, column heads, stat labels, add-ons | 6.1:1 / 6.6:1 on the page; 5.7:1 / 5.8:1 on `--bv-color-surface-alt` |
| `--bv-color-surface` | #FFFFFF | #1C1F24 | Page, pagination links, grid hero unit |  |
| `--bv-color-surface-alt` | #F5F6F8 | #25292F | Hero unit, wells, form actions bar, add-ons, `pre`, row hover, disabled fields |  |
| `--bv-color-stripe` | #FAFAFB | #21252A | Odd rows of a striped table |  |
| `--bv-color-field` | #FFFFFF | #16191E | Text field background |  |
| `--bv-color-track` | #EAECEF | #32363C | Progress track |  |
| `--bv-color-border` | #DFE2E6 | #383D44 | Page header rule, `hr`, rule under a table's head, bordered tables, pagination, form actions top edge, disabled field border |  |
| `--bv-color-border-soft` | #EBEDF0 | #2D3137 | Rules between table rows, well edge |  |
| `--bv-color-border-strong` | #8C949E | #737B85 | Field and add-on borders, the `h2` leader, skip link border | 3.1:1 / 3.9:1 on the page, for a field's edge (WCAG 1.4.11) |
| `--bv-color-grid` | rgba(31, 35, 40, 0.04) | rgba(228, 231, 235, 0.035) | `.grid-paper` and `.hero-unit-grid`; `transparent` turns both off |  |

### Action and focus

| Token | Light | Dark | Used for | Contrast, light / dark |
| --- | --- | --- | --- | --- |
| `--bv-color-link` | #0B65C2 | #6CB0F5 | Links, checkbox and radio tint | 5.8:1 / 7.2:1 on the page; 5.2:1 / 6.4:1 or more on every grey surface and alert tint |
| `--bv-color-link-hover` | #094A8F | #95C6F7 | Hovered links | 8.8:1 / 9.2:1 |
| `--bv-color-primary` | #0B65C2 | #1F6BC4 | Primary button, current page in pagination | 5.8:1 / 5.3:1 for white text |
| `--bv-color-primary-hover` | #0A5EB5 | #1D65BA | Fill under a hovered primary button's gloss; its border | 6.4:1 / 5.8:1 |
| `--bv-color-primary-active` | #094A8F | #17539A | Pressed primary button; the current page's edge in pagination | 8.8:1 / 7.7:1 |
| `--bv-color-danger` | #C4362E | #C23A31 | Danger button | 5.4:1 / 5.3:1 for white text |
| `--bv-color-danger-hover` | #B6322A | #B6362E | Fill under a hovered danger button's gloss; its border | 6.0:1 / 5.9:1 |
| `--bv-color-danger-active` | #8F2620 | #922B24 | Pressed danger button | 8.5:1 / 8.1:1 |
| `--bv-color-on-accent` | #FFFFFF | #FFFFFF | Text on primary and danger buttons and the current page in pagination |  |
| `--bv-color-button` | #E6E9ED | #2B2F35 | Default button, under its gloss: the color at its bottom edge | 13.0:1 / 10.9:1 for text, more where the gloss lightens it |
| `--bv-color-button-hover` | #E6E9ED | #383D44 | Fill under a hovered default button's gloss. In light it matches the fill, as 2.0's did, and the slide alone darkens the face; in dark it lightens | 13.0:1 / 8.8:1 |
| `--bv-color-button-active` | #D9DEE4 | #202328 | Pressed default button, with no gloss | 11.7:1 / 12.7:1 |
| `--bv-color-button-border` | #C9CED4 | #43484F | Default button border; its bottom edge is mixed 12% toward black |  |
| `--bv-color-focus` | #0B65C2 | #6CB0F5 | Focus outline, focused field border | 5.8:1 / 7.2:1 on the page; 5.3:1 / 6.4:1 on `--bv-color-surface-alt` |

White text on a colored button is measured under its gloss from the tops of the letters, about a third of the way down, to the bottom: the gloss lightens the fill above the middle and darkens it below, and every pair stays at 4.8:1 or more.

### Navbar

| Token | Light | Dark | Used for | Contrast, light / dark |
| --- | --- | --- | --- | --- |
| `--bv-color-navbar-top` | #2B3036 | #2F3339 | Top of the bar's gradient |  |
| `--bv-color-navbar` | #1F2328 | #21252A | Bottom of the gradient; flat fallback |  |
| `--bv-color-navbar-current` | #16191D | #15171B | The current link's sunken tab |  |
| `--bv-color-navbar-link` | #8C939C | #8C939C | Links | 4.7:1 / 4.5:1 at the bar's midpoint |
| `--bv-color-navbar-link-active` | #FFFFFF | #FFFFFF | Hovered and current links | 17.6:1 / 17.9:1 on the tab; 3.1:1 brighter than the other links |
| `--bv-color-navbar-focus` | #6CB0F5 | #6CB0F5 | Focus ring inside the bar | 5.8:1 / 5.5:1 or more against the bar and the tab |
| `--bv-color-brand` | #FFFFFF | #FFFFFF | Brand | 13.3:1 / 12.7:1 or more |

Text on the bar's gradient is measured at its midpoint, as text on 0.2.0's gradient buttons was.

### Labels and badges

| Variant | Light background / text | Dark background / text | Text contrast, light / dark |
| --- | --- | --- | --- |
| Default (`.label`, `.badge`) | #EEF0F2 / #4B535D | #2C3036 / #B4BBC4 | 6.8:1 / 6.9:1 |
| Success | #E6F4EA / #1A6E33 | #1D2E22 / #86D49A | 5.6:1 / 8.1:1 |
| Warning | #FCF1D6 / #875200 | #322A19 / #E8C177 | 5.8:1 / 8.3:1 |
| Important | #FDECEA / #B42318 | #35211F / #F4A59C | 5.8:1 / 7.7:1 |
| Info | #E7F0FB / #0B5CAD | #1B2B41 / #8EC1F5 | 5.8:1 / 7.6:1 |
| Inverse | #1F2328 / #FFFFFF | #E4E7EB / #1C1F24 | 15.8:1 / 13.3:1 |

A chip is a tint and its text, with a faint neutral edge (`--bv-shadow-label`). The four status hues are 2.0's, so blue, green, amber and red mean what they did. Inverse is the one chip meant to stand out. Tokens follow `--bv-label-<variant>-bg` and `-text`.

### Alerts

| Variant | Light background / border / text | Dark background / border / text | Text contrast, light / dark |
| --- | --- | --- | --- |
| Warning (default `.alert`) | #FDF6E3 / #F3E2B5 / #875200 | #2B2417 / #524423 / #E8C177 | 6.0:1 / 9.0:1 |
| Error (`.alert-error`) | #FEF1EF / #F7D0CB / #B42318 | #2E1D1B / #57322E / #F4A59C | 6.0:1 / 8.2:1 |
| Success (`.alert-success`) | #EDF7F0 / #CFE8D7 / #1A6E33 | #1A271F / #2B4A34 / #86D49A | 5.8:1 / 8.8:1 |
| Info (`.alert-info`) | #EEF4FC / #CFE0F5 / #0B5CAD | #182537 / #2A4771 / #8EC1F5 | 6.0:1 / 8.2:1 |

Paler tints than the labels, with the same text colors. Tokens follow `--bv-alert-<variant>-bg`, `-border` and `-text`.

### Progress bars

| Variant | Light | Dark | Against the track, light / dark |
| --- | --- | --- | --- |
| Default (`.progress`) | #0B65C2 | #6CB0F5 | 4.9:1 / 5.3:1 |
| Success (`.progress-success`) | #2E8540 | #4FA864 | 3.9:1 / 4.1:1 |
| Warning (`.progress-warning`) | #B7740F | #D9A23F | 3.2:1 / 5.3:1 |
| Danger (`.progress-danger`) | #C4362E | #E0645A | 4.5:1 / 3.6:1 |

Every bar keeps 3:1 against its track (WCAG 1.4.11). 2.0.0 had no warning bar, and its info bar is close enough to the default blue to leave out. Tokens follow `--bv-progress-<variant>`.

### Form errors and code

| Token | Light | Dark | Used for | Contrast, light / dark |
| --- | --- | --- | --- | --- |
| `--bv-color-error` | #B42318 | #F4A59C | Error label, legend, help text and field text | 6.6:1 / 9.0:1 on the field |
| `--bv-color-error-border` | #C4362E | #E0645A | Field border in error | 5.4:1 / 5.2:1 on the field |
| `--bv-color-code-bg` | #F0F2F4 | #2A2E34 | Inline `code` background | 14.1:1 / 11.0:1 for text |

## Typography

Text is Helvetica Neue, 2.0's face, at 14px on a 20px line: a step up from 2.0's 13px on 18px, which reads small on today's screens. Nothing is downloaded.

### Families

| Token | Stack | Renders as |
| --- | --- | --- |
| `--bv-font-sans` | "Helvetica Neue", Helvetica, Arial, sans-serif | 2.0's stack. Helvetica Neue on Apple systems, Arial on Windows, and the system's Helvetica substitute on Linux |
| `--bv-font-mono` | ui-monospace, Menlo, "Cascadia Mono", Consolas, "Liberation Mono", monospace | For `code` and `pre` only. SF Mono in Safari, Menlo in other browsers on Apple systems, Cascadia Mono on Windows 11, Consolas on earlier Windows, Liberation Mono on Linux |

`--bv-font-size` is 14px (0.875rem) and `--bv-line-height` 20px (1.25rem). Helvetica Neue has Regular, Medium and Bold on Apple systems, so weight 500 is Medium and 600 and 700 are both Bold; Arial has no Medium, so 500 is Regular there.

### Scale

| Role | Selector | Size | Line height | Weight and spacing | Color |
| --- | --- | --- | --- | --- | --- |
| Body | `body` | 14px (0.875rem) | 20px, as the ratio 1.4286 | 400 | `--bv-color-text` |
| Lead | `.lead` | 18px (1.125rem) | 28px (1.75rem) | 400 | `--bv-color-text` |
| Page header title | `.page-header h1` | 36px (2.25rem) | 40px (2.5rem) | 600, -0.015em | `--bv-color-text` |
| Heading 1 | `h1` | 30px (1.875rem) | 36px (2.25rem) | 600, -0.015em | `--bv-color-text` |
| Heading 2, a section label | `h2` | 12px (0.75rem) | 20px (1.25rem) | 700, uppercase, 0.1em | `--bv-color-text` |
| Heading 3 | `h3` | 16px (1rem) | 24px (1.5rem) | 600 | `--bv-color-text` |
| Heading 4 | `h4` | 14px (0.875rem) | 20px (1.25rem) | 600 | `--bv-color-text` |
| Heading 5 | `h5` | 13px (0.8125rem) | 20px (1.25rem) | 600 | `--bv-color-text` |
| Heading 6 | `h6` | 12px (0.75rem) | 20px (1.25rem) | 600, uppercase, 0.1em | `--bv-color-muted` |
| Heading subtitle | `h1 small` | 18px (1.125rem) | 1, so the heading keeps its line height | 400, no tracking | `--bv-color-muted` |
| Leader subtitle | `h2 small` | 13px (0.8125rem) | 1 | 400, not uppercase, no tracking | `--bv-color-muted` |
| Heading subtitle | `h3 small` | 14px (0.875rem) | 1 | 400 | `--bv-color-muted` |
| Field label, legend | `label`, `legend` | 14px (0.875rem) | 20px (1.25rem) | 500 | `--bv-color-text` |
| Column head | `.table thead th` | 12px (0.75rem) | 20px (1.25rem) | 600, uppercase, 0.06em | `--bv-color-muted` |
| Stat label | `.stats dt` | 12px (0.75rem) | 20px (1.25rem) | 400, uppercase, 0.06em | `--bv-color-muted` |
| Stat figure | `.stats dd` | 30px (1.875rem) | 36px (2.25rem) | 500, -0.01em, tabular figures | `--bv-color-text` |
| Inline code | `code` | 13px (0.8125rem) | 1, so a line with code stays 20px | 400 | `--bv-color-text` |
| Code block | `pre` | 13px (0.8125rem) | 20px (1.25rem) | 400 | `--bv-color-text` |
| Hero title | `.hero-unit h1` | 44px (2.75rem); 36px below 768px | 56px (3.5rem); 40px below 768px | 600, -0.015em | `--bv-color-text` |
| Hero text | `.hero-unit p` | 18px (1.125rem) | 28px (1.75rem) | 400 | `--bv-color-text` |

Buttons, labels and badges set their own sizes; see their sections. The lead and hero text are at the regular weight: 2.0's 200 maps to the hairline Thin cut today, and Light reads faint at 18px.

### Text elements

- **Paragraphs:** margin 0 0 9px; at most 56ch wide, about 70 characters a line at any size. `.text-right` lifts the cap.
- **Links:** `--bv-color-link` with a faint underline at 35% of the link color, so a link never relies on color alone, set 0.2em below the text so it clears descenders; on hover, `--bv-color-link-hover` and a full-strength underline. Navbar links, the brand and link buttons have no underline. Color transitions over 150ms linear.
- **Body:** line height 1.4286, a ratio that gives 20px at 14px, so text an app sets larger keeps proportional leading; `overflow-wrap: break-word`, so long paths and hashes break instead of widening the page.
- **Grid paper (`.grid-paper`):** opt in, on `<body>`, for the page that opens an app; other pages stay plain. A 320px band under the 40px navbar, ruled with 1px `--bv-color-grid` lines every 20px both ways and every fifth vertical one darker where two layers meet, fading into the page color over its last 120px, so it sits behind the page's opening and never behind its text. The 2.0 docs drew this grid as a page decoration; here it is the library's.
- **Images and video:** at most 100% of their container's width, with height kept in proportion.
- **Headings:** margin 0 0 9px, plus an 18px top margin when the heading isn't the first child of its parent, 36px for an `h2`. A heading so sits closer to what it introduces than to what came before it, and a heading at the top of a column, alert or well lines up with its neighbours. The page header, the hero unit and `.alert-heading` set their own. A deliberate change: 2.0.0 headings had no margin, which left a heading touching a form label or table beneath it. `h1` takes -0.015em letter-spacing, which closes up bold Helvetica at display sizes; a subtitle resets it.
- **Section labels:** an `h2` that holds only text and a `<small>` is a flex row with a 12px gap: a 1px dotted `--bv-color-border-strong` leader, at least 18px long, runs from the label to the `<small>` at the end of the line, for a count or a date. Any other markup inside an `h2` keeps ordinary flow.
- **`strong`, `b`:** weight 600. **`small`** outside headings keeps the surrounding size, as in 2.0; inside `h1` to `h3` it is the subtitle size above.
- **`code`:** padding 2px 5px, radius 3px, `--bv-color-text` on `--bv-color-code-bg`, no border.
- **`pre`:** block, padding 12px 16px, margin 0 0 9px, `--bv-color-surface-alt`, radius 4px, no border, `white-space: pre-wrap`, `overflow-wrap: anywhere`.
- **`hr`:** margin 18px 0, no border except 1px top `--bv-color-border` and 1px bottom `--bv-color-etch`, giving 2.0's etched line.

## Spacing, radius, depth and motion

Depth comes from light falling from above: 2.0's gloss over flat button fills, highlights and shadows, and 1px text emboss. Component padding is fixed in each component spec; the spacing tokens are for layout and shared gaps.

### Spacing

| Token | Value | Used for |
| --- | --- | --- |
| `--bv-space-1` | 4px (0.25rem) | Tight gaps inside components |
| `--bv-space-2` | 5px (0.3125rem) | Label to field; between buttons in a form actions bar |
| `--bv-space-3` | 9px (0.5625rem) | Paragraph, heading and code block margins |
| `--bv-space-4` | 14px (0.875rem) | Alert inline padding; block alert vertical padding |
| `--bv-space-5` | 18px (1.125rem) | Margins under tables, alerts, rows, field groups and form actions; space above a heading |
| `--bv-space-6` | 20px (1.25rem) | Gutter: container padding, column gap; hero unit padding below 768px |
| `--bv-space-7` | 36px (2.25rem) | Space above an `h2`; empty well padding |
| `--bv-space-8` | 60px (3.75rem) | Space above each page section; hero unit padding |

### Radius and borders

| Token | Value | Used for |
| --- | --- | --- |
| `--bv-radius-sm` | 3px | Fields, add-ons, labels, inline code, progress track |
| `--bv-radius` | 4px | Buttons, button groups, alerts, bordered tables, `pre`, the ends of a pagination strip, form actions bar, skip link |
| `--bv-radius-lg` | 6px | Large buttons, hero unit, wells |
| `--bv-radius-pill` | 9px | Badges |

Every border is 1px, and solid except the dashed edge of an empty well. The navbar and full-width bars have no radius.

### Shadows

Raised things have a highlight along their top edge and a soft shadow under them; sunken things have a shade along their top inside edge. Light values below; the dark ones are deeper.

| Token | Light value | Used on |
| --- | --- | --- |
| `--bv-shadow-button` | inset 0 1px 0 rgba(255,255,255,.6), 0 1px 2px rgba(31,35,40,.08) | Default buttons at rest |
| `--bv-shadow-button-accent` | inset 0 1px 0 rgba(255,255,255,.18), 0 1px 2px rgba(31,35,40,.18) | Primary and danger buttons at rest |
| `--bv-shadow-pressed` | inset 0 2px 4px rgba(31,35,40,.15) | Pressed and latched buttons; the current page in pagination |
| `--bv-shadow-raised` | 0 1px 2px rgba(31,35,40,.06) | Pagination links; the grid hero unit |
| `--bv-shadow-field` | inset 0 1px 2px rgba(31,35,40,.07) | Text fields, selects, textareas |
| `--bv-shadow-focus` | 0 0 0 3px rgba(11,101,194,.22) | Focused fields, over their own shadow |
| `--bv-shadow-focus-error` | 0 0 0 3px rgba(196,54,46,.2) | Focused fields in error |
| `--bv-shadow-navbar` | inset 0 1px 0 rgba(255,255,255,.08), 0 1px 0 rgba(0,0,0,.15), 0 2px 6px rgba(31,35,40,.2) | Navbar: a highlight along its top, then a crisp 1px line and a soft shadow under it, so the bar sits above the page. The same three layers in dark, deeper |
| `--bv-shadow-navbar-current` | inset 0 2px 6px rgba(0,0,0,.35) | The current navbar link |
| `--bv-shadow-well` | inset 0 1px 2px rgba(31,35,40,.06) | Wells |
| `--bv-shadow-track` | inset 0 1px 2px rgba(31,35,40,.12) | Progress track |
| `--bv-shadow-label` | inset 0 0 0 1px rgba(31,35,40,.06) | The edge of labels and badges, a shadow so the chip keeps its size |

### Sheen, emboss and etching

| Token | Light value | Used on |
| --- | --- | --- |
| `--bv-sheen` | linear-gradient(#FFF, #FFF 16.67%, transparent 66.67%), drawn 150% tall: white over the top quarter of the face, fading to the fill at its bottom; in dark, white from .1 to .02 | Default buttons |
| `--bv-sheen-accent` | linear-gradient(rgba(255,255,255,.2), transparent 33.33%, rgba(0,0,0,.12) 66.67%), drawn 150% tall: lighter at the top of the face, the fill alone at the middle, darker at the bottom; .14 white in dark | Primary and danger buttons, progress bars |
| `--bv-emboss` | 0 1px 0 rgba(255,255,255,.7); none in dark | Text pressed into a light surface: default buttons, alerts, add-ons |
| `--bv-emboss-dark` | 0 -1px 0 rgba(0,0,0,.25) | Text cut out of a dark one: primary and danger buttons, navbar links, the brand, the current page in pagination |
| `--bv-glow` | 0 0 10px rgba(255,255,255,.35) | The current navbar link's text |
| `--bv-color-etch` | #FFFFFF; rgba(255,255,255,.04) in dark | The light half of an etched line: `hr`, the top of the form actions bar |

- The gloss is a translucent gradient over a flat fill, so a variant sets only its fill and every button is lit the same way, as 2.0's gradients were. It is drawn half again as tall as the face (`background-size: 100% 150%`), with its stops at 2/3 scale, and keeps its last color below the face's bottom edge. Hover slides it up; pressing removes it.
- The navbar is the one opaque gradient, `--bv-color-navbar-top` to `--bv-color-navbar`, always top to bottom.

### Motion

| Token | Value | Used for |
| --- | --- | --- |
| `--bv-duration-fast` | 100ms | Button gloss slide, background and shadow; table row and pagination hover |
| `--bv-duration` | 150ms | Link and navbar link color |
| `--bv-duration-slow` | 200ms | Field border and glow |
| `--bv-ease` | linear | All transitions, as in 2.0 |

- Only `color`, `background-color`, `background-position`, `border-color`, `box-shadow` and `opacity` may animate. Nothing that changes layout.
- Under `prefers-reduced-motion: reduce`, every transition and animation runs in 0.01ms.
- The animated striped progress bar is the only looping animation: its stripes move 16px along over 2s, linear, forever, by `background-position`. Reduced motion stops it after one 0.01ms run.

## Layout

Pages use a centered container whose content width steps through 2.0's responsive widths, with equal-width columns on CSS grid instead of the 12-column span system.

```html
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="navbar">…</header>
  <main class="container" id="main">
    <section class="section">
      <div class="page-header"><h1>Apps <small>Five apps on hearth-01</small></h1></div>
      <div class="row cols-3">…</div>
    </section>
  </main>
</body>
```

### Container

| Viewport width | Content width | Inline padding |
| --- | --- | --- |
| Below 768px | Fluid | 20px each side |
| 768px to 979px | 724px | 20px each side |
| 980px to 1199px | 940px | 20px each side |
| 1200px and up | 1170px | 20px each side |

`.container` is `margin-inline: auto` with `max-width` equal to content width plus 40px, so content never touches the screen edge.

### Rows and columns

- `.row` is a grid with an 18px row gap and a 20px column gap, and an 18px bottom margin, like a table or an alert.
- Each column, and the last block in it, drops its bottom margin (a rule in `bevel.utilities`, so it beats component margins), so the space after a row is always the row's own 18px, whether its columns end in a paragraph, a table or a form, or are themselves a well.
- With no modifier, columns are `repeat(auto-fit, minmax(min(100%, 220px), 1fr))`: as many equal columns as fit, each at least 220px.
- `.cols-2`, `.cols-3` and `.cols-4` fix the count at 768px and up, and stack to one column below 768px.
- At the 940px container these produce 460px, 300px and 220px columns, the same widths as 2.0's `span6`, `span4` and `span3`.
- No spans, offsets or nesting rules in v0.1.

### Page header and sections

- `.page-header`: padding-bottom 17px, margin 18px 0, 1px bottom border `--bv-color-border`.
- Its `h1` is 36px on a 40px line; a `small` after a space is the subtitle at 18px, weight 400, `--bv-color-muted`.
- `.section`: padding-top 60px. The first section on a page sits 18px below the navbar instead.

## Components

Each v0.1 component is specified by its markup, its exact measurements and every state; anything not listed here is not part of the component.

### Navbar

The 2.0 docs top bar, in graphite: 40px tall, lit from above, links on the left, a white brand on the right. Put the brand before the links to move it to the left, and add `.nav-end` to push a group of links to the right. Add `.navbar-sticky` to keep it at the top while the page scrolls.

```html
<a class="skip-link" href="#main">Skip to content</a>
<header class="navbar">
  <div class="navbar-inner">
    <div class="container">
      <nav class="nav" aria-label="Main">
        <a href="/apps" aria-current="page">Apps</a>
        <a href="/logs">Logs</a>
        <span class="divider-vertical"></span>
        <a href="/settings">Settings</a>
      </nav>
      <a class="brand" href="/">hearth</a>
    </div>
  </div>
</header>
```

| Part | Spec |
| --- | --- |
| Bar (`.navbar-inner`) | Min-height 40px; `linear-gradient(--bv-color-navbar-top, --bv-color-navbar)` over `--bv-color-navbar`; `--bv-shadow-navbar`, a highlight along its top edge and a shadow on the page under it; no radius; full viewport width. The same bar in light and dark |
| Row (`.navbar .container`) | Flex, wraps, items stretch to full bar height |
| Link (`.nav > a`) | 14px on a 19px line; padding 10px 10px 11px; `--bv-color-navbar-link`; `--bv-emboss-dark`; no underline; never wraps |
| Link, hover | `--bv-color-navbar-link-active` over 150ms linear; background unchanged; only on pointers that hover |
| Link, current (`.active` or `aria-current="page"`) | `--bv-color-navbar-link-active` with `--bv-glow`, on a `--bv-color-navbar-current` tab the full height of the bar, sunk with `--bv-shadow-navbar-current`. The white is 3:1 brighter than the other links, so the current page doesn't rely on hue, and the link is no wider than at rest, so the bar looks the same on every page. A deliberate change from 0.2.0, which marked it with a 3px blue bar along the bottom |
| Button (`.nav > button`) | Looks like a link, for an action in the bar such as a light and dark switch: the link's type, padding and colors, no border or fill, `cursor: pointer`. Its content is centered in the bar with a 5px gap, so an icon on its own sits in the middle; name an icon-only button with a `.visually-hidden` span. A `hidden` button stays hidden |
| Link and brand, focus | 2px `--bv-color-navbar-focus` outline with `outline-offset: -2px`, so it stays inside the bar and shows on it |
| Divider (`.divider-vertical`) | 1px wide, margin 10px 9px; rgba(0,0,0,.35) with a 1px rgba(255,255,255,.07) end border, an etched line; hidden below 768px |
| Brand (`.brand`) | 15px bold on a 22px line, uppercase, 0.12em letter-spacing; `--bv-color-brand`; `--bv-emboss-dark`; no underline; padding 9px 20px. Source order picks the side: first in the row, on the left with a -20px start margin; after a `.nav`, pushed right with `margin-inline-start: auto` and a -20px end margin. Either way the text sits on the content edge, as in 2.0, with room inside the box for the focus ring. After a `.nav-end`, it sits flush against those links, and still ends the last row if it wraps |
| End links (`.nav-end`) | Optional, on a `.nav`. `flex-grow: 1` with `justify-content: flex-end`: the group takes the free space and sets its links at the far end, pushing it and everything after it to the right |
| Below 768px | Links wrap onto more rows; no hamburger; the brand ends the last row, or starts the first when it comes before the links |
| Skip link (`.skip-link`) | First element in the page, pointing at `<main id="main">`. Off-screen until it takes keyboard focus, then a box over the top-left of the bar (z-index 1031, above the sticky bar): `--bv-color-link` on `--bv-color-surface`, 1px `--bv-color-border-strong` border, padding 4px 10px, radius 4px |
| Sticky (`.navbar-sticky`) | From 768px: `position: sticky` at the top, z-index 1030 (2.0's fixed-navbar layer), with the same shadow as the static bar. The page gets a 58px `scroll-padding-top` (bar plus 18px), so anchor jumps and keyboard focus land below the bar (WCAG 2.4.11). Below 768px the bar scrolls away with the page, as in 2.0 |

## Accessibility

bevel targets WCAG 2.2 AA in light and dark, with the documented exceptions below.

- **Text contrast:** at least 4.5:1, or 3:1 for text 24px and up or 18.66px bold, in both schemes. Every text color in *Color* lists its measured ratio.
- **Focus:** every interactive element shows a visible indicator through `:focus-visible`: a 2px `--bv-color-focus` outline, 2px out, at 3:1 or more against everything it crosses; inside the navbar, `--bv-color-navbar-focus`. A focused field shows a blue border and a soft glow instead, with a transparent outline kept for forced-colors mode, where shadows are dropped. `outline: none` is never used without a replacement.
- **Bypass:** a `.skip-link` first in the page lets keyboard users jump past the navbar.
- **Keyboard:** bevel uses only native elements and no JavaScript, so keyboard behavior is the browser's own.
- **Target size:** the smallest control is 30px tall (buttons, fields), above WCAG 2.2's 24×24px minimum, and stacked checkboxes and radios sit 26px apart. Navbar links are 40px tall.
- **Zoom and reflow:** type is in `rem`, so browser font settings apply. Pages reflow with no horizontal scrolling at 320px width and at 200% zoom, except inside `.table-scroll`.
- **Motion:** `prefers-reduced-motion` is honored as described under *Motion*.
- **State hooks:** `aria-current`, `aria-pressed`, `aria-disabled` and `aria-invalid` style components directly, so the accessible markup is also the styled markup. Error help is tied to its field with `aria-describedby`.
- **Color is never the only signal:** labels carry words, badges carry numbers, errors carry text, links carry an underline, a pressed button and the current page in a pagination strip sink in, and the current navbar link is white, 3:1 brighter than the others, on a sunken tab.
- **Hidden text:** `.visually-hidden` gives a field a real `<label>`, or an icon-only button its words, without showing them. Prefer it to `aria-label`, so the name is translated with the page.

### Exceptions

| Item | Issue | Mitigation |
| --- | --- | --- |
| Field text size | Fields use 14px text, and iOS Safari zooms the page when a field under 16px takes focus | Zoom is reversible and doesn't block input; accepted to keep fields the size of the text around them |
| Progress track | The track is 1.2:1 on the page in light and 1.3:1 in dark, so the full length of a bar is hard to see | The bar keeps 3:1 against the track; the value is always in words beside it or in its table row, and in `aria-valuenow` or `aria-valuetext` |

## Testing and quality gates

A release ships only when every automated gate passes; `make test` runs them all.

| Gate | Tool | Fails when |
| --- | --- | --- |
| Baseline | Stylelint with [stylelint-plugin-use-baseline](https://npmjs.com/package/stylelint-plugin-use-baseline), `available: "widely"` | A feature isn't Widely available and isn't inside `@supports` |
| House rules | Stylelint core rules | `!important`; an ID selector; specificity above 0,2,0; a custom property without the `--bv-` prefix; a rule outside `@layer` |
| Size | Go test | `bevel.css` exceeds 20 KB gzipped |
| Tokens | Go test | A `var(--bv-…)` is used but never defined, or a token is defined but never used |
| Coverage | Go test | A class in `bevel.css` is missing from the reference page, or the page uses a class the CSS doesn't define (allow-list for JavaScript hooks) |
| Visual | Playwright screenshot comparison | Any screenshot differs from its approved baseline by more than 0.1% of pixels |
| Accessibility | axe-core in Playwright | Any WCAG 2.2 AA violation on the reference page, other than the documented exception |

- **Reference page:** `site/reference.html` shows every class, variant and state, including long text, empty cells and wrapped toolbars. It is the fixture for the visual, accessibility and coverage gates, and the library's documentation.
- **Visual matrix:** Chromium, Firefox and WebKit at 375px and 1280px widths; the full page plus hover, focus, pressed and disabled states; animations frozen.
- **Baselines change only on purpose:** after reviewing the diff, update with `--update-snapshots` in the same commit as the CSS change.
- **Manual check before each release:** tab through the reference page, and look at it in Safari on macOS and iOS.

## Distribution and versioning

Each app carries its own copy of the CSS as a versioned file it serves itself; there is no package, import path or shared URL.

- **Repository:** `bevel.css`, the site's pages in `site/` (`reference.html` among them), `CHANGELOG.md`, the Stylelint config, the Playwright tests and the Go tests.
- **Release file:** each release is published as `bevel-<version>.css`, identical to `bevel.css` apart from a first-line header such as `/*! bevel.css 0.1.0 */`.
- **In an app:** copy the release file into the app's static folder and link it before the app's own stylesheet, for example `<link rel="stylesheet" href="/static/bevel-0.1.0.css">`. The folder is the app's choice, so any stack works.
- **Caching:** because the version is in the filename, apps can cache it forever (`Cache-Control: public, max-age=31536000, immutable`); a new version is a new filename.
- **Upgrading an app:** copy the new file in, update the link, delete the old file, and check the app. Each app upgrades on its own schedule and can stay on any version.
- **Unminified:** the shipped file is the readable source; gzip handles size.
- **End state:** once the component set settles, bevel reaches 1.0 and is expected to change rarely; apps simply keep the copy they have.

### Versions

| Change | Bump | Example |
| --- | --- | --- |
| Bug fix with no intended visual change | Patch | A focus ring clipped in Firefox |
| New component, variant, modifier or token | Minor | Adding `.progress` |
| Visual change to an existing component | Minor, with new baselines and a changelog entry | Darkening the danger fill |
| Renamed or removed class or token | Major | Renaming `.btn-small` |

Before 1.0, breaking changes ship in minor versions and are flagged in the changelog.

### Promoting a component

A component is styled locally inside an app first. When a second app needs it, it is promoted:

1. Add its section to this spec, with exact measurements and every state.
2. Add it, with every state, to `site/reference.html`.
3. Build it in the `bevel.components` layer, using `--bv-` variables only.
4. Pass every gate and approve the new baselines.
5. Add a changelog entry and bump the minor version.

## Open questions

- [x] **Brand:** decided: white, bold, in tracked capitals, legible on the graphite bar. 0.2.0 used 2.0's weight 200.
- [x] **Base size:** decided: 14px on a 20px line. 0.2.0 kept 2.0's 13px on 18px, which reads small on today's screens.
- [x] **Field borders:** decided: #8C949E, 3:1 on white. 0.2.0 kept 2.0's #CCCCCC under an exception.
- [ ] **Size budget:** is 20 KB gzipped the right ceiling?
- [x] **Naming:** decided: no import path or shared URL; each app ships its own copy as `bevel-<version>.css`.
- [x] **Dark mode:** decided: it follows the system setting, unless `<html>` has `data-theme="light"` or `"dark"`. The demo and the site needed a switch, so the override was added. The dark tokens appear twice, under the media query and under `data-theme="dark"`, and a Go test keeps the two copies the same.

## Sources

- [Bootstrap 2.0.0 documentation](https://bootstrapdocs.com/v2.0.0/docs/)
- [Bootstrap 2.0.0 Components](https://bootstrapdocs.com/v2.0.0/docs/components.html)
- [stylelint-plugin-use-baseline](https://npmjs.com/package/stylelint-plugin-use-baseline)

### Buttons

`.btn` works on `<button>`, `<a>` and `<input type="submit">`; three variants and two size modifiers.

| Property | `.btn` | `.btn-small` | `.btn-large` |
| --- | --- | --- | --- |
| Font size / line height | 14px / 20px | 12px / 18px | 16px / 20px |
| Weight | 500 | 500 | 500 |
| Padding | 4px 12px | 5px 10px | 9px 16px |
| Height, borders included | 30px | 30px | 40px |
| Radius | 4px | 4px | 6px |

| Variant | Fill / hover / pressed | Text | Border | Sheen and shadow |
| --- | --- | --- | --- | --- |
| Default (`.btn`) | `--bv-color-button`, `-hover`, `-active` | `--bv-color-text`, `--bv-emboss` | `--bv-color-button-border` | `--bv-sheen`, `--bv-shadow-button` |
| Primary (`.btn-primary`) | `--bv-color-primary`, `-hover`, `-active` | `--bv-color-on-accent`, `--bv-emboss-dark` | `--bv-color-primary-hover` | `--bv-sheen-accent`, `--bv-shadow-button-accent` |
| Danger (`.btn-danger`) | `--bv-color-danger`, `-hover`, `-active` | `--bv-color-on-accent`, `--bv-emboss-dark` | `--bv-color-danger-hover` | `--bv-sheen-accent`, `--bv-shadow-button-accent` |

- **Rest:** 2.0's gloss over the fill: a default button white over its top quarter and fading to `--bv-color-button` at the bottom, a colored one lighter at the top and darker at the bottom. A highlight along the top edge, a soft shadow under the button, and a bottom border mixed 12% toward black (`color-mix()`). `display: inline-flex`, content centered, 6px between an icon and text; links lose their underline.
- **Hover** (pointers that hover only, so it never sticks after a tap): as in 2.0, the gloss slides up by half the face's height (`background-position: 0 100%`), so the light top leaves and the darker lower part fills the face, while the fill changes to the hover fill; both over 100ms linear. The gloss covers the whole face at every point of the slide, so nothing wipes across it either way. Text is unchanged.
- **Pressed** (`:active`, `.active` or `aria-pressed="true"`): the pressed fill, the gloss removed, and `--bv-shadow-pressed`, so the face sinks into the page. The weight doesn't change, so a latched toggle doesn't push its neighbours.
- **Focus** (`:focus-visible`): 2px solid `--bv-color-focus` outline, 2px offset.
- **Disabled** (`:disabled`, `.disabled` or `aria-disabled="true"`): opacity .5, gloss and shadows removed, `cursor: not-allowed`, no hover or press change.

### Button groups and toolbars

```html
<div class="btn-toolbar">
  <div class="btn-group" role="group" aria-label="Filter apps">
    <button class="btn" aria-pressed="true">All</button>
    <button class="btn">Running</button>
    <button class="btn">Stopped</button>
  </div>
  <button class="btn btn-primary">Deploy an app</button>
</div>
```

- `.btn-group`: inline-flex; each button after the first overlaps the previous by 1px (`margin-inline-start: -1px`).
- Inner corners are square; the first button keeps its left corners and the last keeps its right corners at the button's radius.
- A hovered or focused button in a group gets `z-index: 1`, so its whole border shows over its neighbor.
- `.btn-toolbar`: flex, wraps, 10px gap between groups and loose buttons.

### Forms

Forms are stacked: label above field. Fields are styled as plain elements at zero specificity, so a bare `<input>` already looks right; classes add grouping, help and error states.

```html
<div class="control-group error">
  <label for="port">Port</label>
  <input id="port" class="input-small" type="text" value="8081"
         aria-invalid="true" aria-describedby="port-help">
  <p class="help-block" id="port-help">Taken by chess-trainer. Try 8086.</p>
</div>
<div class="form-actions">
  <button class="btn btn-primary">Deploy</button>
  <button class="btn">Cancel</button>
</div>
```

| Part | Spec |
| --- | --- |
| Label | Block; 14px / 20px; weight 500; `--bv-color-text`; margin-bottom 5px |
| Text fields: `input` (text, email, password, search, number, url, tel, date, datetime-local, month, week, time), `select` | Height 30px; padding 4px 8px; 14px / 20px; `--bv-color-text` on `--bv-color-field`; 1px `--bv-color-border-strong` border; radius 3px; `--bv-shadow-field`, so it sits slightly into the page; width 100% up to 280px |
| `textarea` | Same box; min-height 90px; `resize: vertical` where supported |
| `select` | Same box with padding 3px 8px; native arrow kept. With `multiple` or `size`, height grows to show its rows |
| Width modifiers | `.input-block` removes the 280px cap; `.input-small` caps at 90px |
| Placeholder | `--bv-color-muted` at full opacity |
| Focus | Border `--bv-color-focus` and `--bv-shadow-focus`, a soft 3px glow, over the field's own shadow; a transparent 2px outline, which still shows in forced-colors mode; border and shadow transition over 200ms linear |
| Disabled and read-only | Background `--bv-color-surface-alt`; border `--bv-color-border`; `cursor: not-allowed` when disabled |
| Checkbox and radio (`label.checkbox`, `label.radio`) | Flex, 6px gap, control aligned to the first text line, regular weight; `accent-color` = `--bv-color-link` where supported; 6px between stacked options, so they sit 26px apart |
| Field group (`.control-group`) | Label, field and help; margin-bottom 18px |
| Control group (`fieldset`, `legend`) | `fieldset` has no border, padding or margin; `legend` is styled as a label. Use it for radios and related checkboxes; it can also take `.control-group` |
| Help (`.help-block`) | Block; margin-top 5px; 14px / 20px; `--bv-color-muted` |
| Add-ons (`.input-prepend`, `.input-append`, `.add-on`) | See *Input add-ons* below |
| Error (`.control-group.error`, or a field with `aria-invalid="true"`) | Label, legend and help `--bv-color-error`; field text `--bv-color-error` and border `--bv-color-error-border`; on focus, the same border and `--bv-shadow-focus-error` |
| Actions bar (`.form-actions`) | Padding 17px 20px 18px; margin 18px 0; `--bv-color-surface-alt`; 1px `--bv-color-border` top border with an etched highlight under it; radius 4px; buttons in a row with a 5px gap, wrapping |

### Input add-ons

A unit or fixed part of the value beside a field, such as `$`, `MB` or `git@`.

```html
<label for="budget">Monthly budget</label>
<div class="input-prepend">
  <span class="add-on" id="budget-unit">$</span>
  <input id="budget" class="input-small" type="text" aria-describedby="budget-unit">
</div>
```

| Part | Spec |
| --- | --- |
| Group (`.input-prepend`, `.input-append`) | Flex. The add-on's place in the markup picks its side, so the two classes do the same thing and 2.x markup works as written; a field with an add-on on each side uses both, or either. The field keeps its width and its modifier (`.input-small`, `.input-block`), and shrinks with `min-width: 0` when the add-ons leave too little room, so a group never widens the page |
| Add-on (`.add-on`) | 14px / 20px; padding 4px 5px; at least 30px wide, so it's at least square; `--bv-color-muted` on `--bv-color-surface-alt`; `--bv-emboss`; 1px `--bv-color-border-strong` border; radius 3px; never wraps or shrinks |
| Join | The add-on drops its border on the side that touches the field, so one 1px line divides them; the joined corners are square |
| Focus | The field's usual border and glow, lifted with `z-index: 1` so an add-on after it doesn't cover the glow |
| Error (`.control-group.error`) | Add-on text `--bv-alert-error-text` on `--bv-alert-error-bg`, border `--bv-color-error-border`, following the error alert. With `aria-invalid` alone, only the field turns red, as with the label |
| Disabled | The add-on is unchanged; the field shows its own disabled state |
| Accessibility | The add-on isn't part of the field's accessible name. Give it an `id` and list it in the field's `aria-describedby` |

### Tables

One table style with three modifiers; wide tables scroll inside their own box on small screens.

```html
<div class="table-scroll" role="region" aria-label="Apps on hearth-01" tabindex="0">
  <table class="table table-bordered table-striped">
    <thead><tr><th>App</th><th>Status</th><th class="text-right">Port</th></tr></thead>
    <tbody>
      <tr><td>chess-trainer</td><td><span class="label label-success">Running</span></td><td class="text-right">8081</td></tr>
    </tbody>
  </table>
</div>
```

| Part | Spec |
| --- | --- |
| Table (`.table`) | Width 100%; margin-bottom 18px; `border-collapse: separate`; `border-spacing: 0`; no outer frame |
| Cells (`th`, `td`) | Padding 8px; 14px / 20px; left-aligned; `vertical-align: middle`; 1px `--bv-color-border-soft` top border; `font-variant-numeric: tabular-nums`, so figures line up down a column |
| Header cells | Weight 600. In the head, column labels as small capitals: 12px, uppercase, 0.06em letter-spacing, `--bv-color-muted`, `vertical-align: bottom`, with a 1px `--bv-color-border` rule under them. Neither the first row nor the first row under the head has a top border |
| Right-aligned cells (`.text-right`) | Never wrap, so a figure or an action stays on one line: a minus sign wrapped away from its amount reads as a different number |
| Row hover | Body cells turn `--bv-color-surface-alt` over 100ms linear; only on pointers that hover |
| `.table-striped` | Odd body rows `--bv-color-stripe`; hover still wins |
| `.table-bordered` | 1px `--bv-color-border` outer border and a 1px start border on every cell after the first column; outer corners 4px, and the corner cells rounded to match |
| `.table-condensed` | Cell padding 4px 5px |
| `.table-scroll` | Wrapper with `overflow-x: auto`; the table keeps its natural width and scrolls inside it. Give it `role="region"`, an `aria-label` and `tabindex="0"`, so keyboard users can focus it and scroll; WebKit doesn't make a scroll box focusable on its own |

Cells are vertically centered rather than 2.0's top alignment, so small buttons in an actions column line up with the text.

### Pagination

Numbered links to the pages of a long list, joined into one strip.

```html
<nav class="pagination" aria-label="Pages">
  <ul>
    <li><span><span aria-hidden="true">&lsaquo;</span> Previous</span></li>
    <li><a href="?page=1" aria-current="page">1</a></li>
    <li><a href="?page=2">2</a></li>
    <li><a href="?page=2">Next <span aria-hidden="true">&rsaquo;</span></a></li>
  </ul>
</nav>
```

| Part | Spec |
| --- | --- |
| Strip (`.pagination`) | Margin-bottom 18px and none on top, like a table; 2.0 had 18px both. The list is flex, wraps on a narrow screen with a 4px row gap, and has no bullets or padding |
| Item (`li > a`, `li > span`) | 14px text on a 34px line; padding 0 14px; 36px tall; `--bv-color-surface`; 1px `--bv-color-border` border; `--bv-shadow-raised`; no underline; tabular figures; never wraps. Each item overlaps the one before by 1px, so neighbours share one border. The first item keeps its start corners and the last its end corners at 4px |
| Link | `--bv-color-link`, and `--bv-color-link-hover` on hover |
| Hover | Background `--bv-color-surface-alt` over 100ms linear; only on pointers that hover |
| Focus | Standard focus outline, lifted with `z-index: 1` so neighbours don't cover it |
| Current (`aria-current="page"`, or `.active` on the `li`) | `--bv-color-on-accent` with `--bv-emboss-dark` on `--bv-color-primary`, a `--bv-color-primary-active` border, `--bv-shadow-pressed`, default cursor: filled and sunk like a pressed primary button, so it reads without color |
| Disabled (a `span`, a link with `aria-disabled="true"`, or `.disabled` on the `li`) | `--bv-color-muted` on `--bv-color-surface`, default cursor, no hover. Use a `span` for Previous on the first page, Next on the last, and an ellipsis between page numbers |
| Arrows | Wrap `&lsaquo;` and `&rsaquo;` in `aria-hidden="true"`, so a screen reader reads only the word |

### Alerts

Four tinted boxes for feedback; the default is warning, as in 2.0.

```html
<div class="alert alert-error alert-block" role="alert">
  <h4 class="alert-heading">eink-sync stopped responding</h4>
  <p>It exited with status 1 three days ago.</p>
</div>
<div class="alert alert-info" role="status"><strong>Heads up!</strong> notebook is deploying.</div>
```

| Part | Spec |
| --- | --- |
| Box (`.alert`) | Padding 10px 35px 10px 14px; margin-bottom 18px; 1px border; radius 4px; 14px / 20px; `--bv-emboss`; warning colors by default |
| Variants | `.alert-error`, `.alert-success`, `.alert-info`; colors in *Color → Alerts* |
| `.alert-block` | 14px top and bottom padding; paragraphs inside have no margin, 9px between consecutive ones |
| `.alert-heading` | Usually an `h4`; inherits the alert's text color; margin-bottom 4px |
| Lead word | Optional `<strong>` before the message |
| Roles | `role="alert"` for errors that need attention now; `role="status"` for everything else |
| Close button | Not yet. The 35px end padding stays so adding it later won't reflow text |

### Labels and badges

Labels are short status words; badges are counts.

```html
<span class="label label-success">Running</span>
<span class="badge badge-important">2</span>
```

| Part | Spec |
| --- | --- |
| Label (`.label`) | Inline-block; padding 1px 6px; 12px on a 16px line, 18px tall; weight 500; radius 3px; `vertical-align: middle`; never wraps; the variant's text on its tint, with `--bv-shadow-label` for an edge |
| Badge (`.badge`) | As a label, with padding 1px 8px, radius 9px and tabular figures |
| Variants | `-success`, `-warning`, `-important`, `-info` and `-inverse`, applied as `.label-success`, `.badge-success` and so on; colors in *Color → Labels and badges* |
| Meaning | The word or number always carries the meaning; color only reinforces it |

### Progress bars

How far along some work is, or how full something is.

```html
<p id="disk">Disk: 118 of 192 GB used</p>
<div class="progress" role="meter" aria-labelledby="disk"
     aria-valuenow="118" aria-valuemin="0" aria-valuemax="192">
  <div class="bar" style="width: 61%"></div>
</div>
```

| Part | Spec |
| --- | --- |
| Track (`.progress`) | 8px tall; at least 90px wide, so a column of bars keeps its size; margin-bottom 18px, none in a table cell; `--bv-color-track`; `--bv-shadow-track`, so it sits into the page; radius 3px; clips the bar |
| Bar (`.bar`) | Full height; its width, set inline by the page, is the value, and it's empty without one; the variant's color under `--bv-sheen-accent`, with a darker 1px bottom edge. No text inside, and no width transition: 2.0 eased the width over 0.6s, which moves layout, and a server-rendered bar never changes |
| Variants | `.progress-success`, `.progress-warning`, `.progress-danger` on the track; colors in *Color → Progress bars* |
| Striped (`.progress-striped`) | Diagonal white stripes at 25%, 16px apart, over the gloss |
| Animated (`.progress.active`) | The stripes move; see *Motion* |
| Over the maximum | Set the width to 100%, `aria-valuenow` to the maximum, and the real value in `aria-valuetext` |
| Accessibility | `role="progressbar"` for work under way, such as a backup or import; `role="meter"` for a level, such as disk space or a budget. Either needs `aria-valuenow`, `aria-valuemin`, `aria-valuemax` and a name from `aria-labelledby` or `aria-label`. Say the value in words too: the track is faint (see *Accessibility → Exceptions*) |

### Stats

A big figure with a small label above it, for the few numbers a home page opens with: a balance, uptime, disk used.

```html
<dl class="row cols-4 stats">
  <div><dt>Apps running</dt><dd>4 <small>of 5</small></dd></div>
  <div><dt>Disk used</dt><dd>118 <small>of 192 GB</small></dd></div>
</dl>
```

| Part | Spec |
| --- | --- |
| List (`.stats`) | On a `<dl>`; margin-bottom 18px. Add `.row` and a column count to set the pairs side by side, each `dt` and `dd` in a `<div>` |
| Label (`dt`) | 12px on a 20px line, uppercase, 0.06em letter-spacing; `--bv-color-muted`, as a table's column head |
| Figure (`dd`) | 30px, h1's size, on a 36px line; weight 500; -0.01em letter-spacing; tabular figures; `--bv-color-text` |
| Unit (`dd small`) | 16px at weight 400, `--bv-color-muted`: "118 of 192 GB", "6 hours ago" |
| In wells | Give each pair's `<div>` the `.well` class. A column in a `.row` drops its bottom margin, so the wells keep the row's spacing |

### Hero unit

2.0's large callout, for the one message that opens a page such as an app's home. It is opt-in: nothing changes until a page uses the class.

```html
<div class="hero-unit">
  <h1>Welcome to hearth</h1>
  <p>Five apps on hearth-01.</p>
  <p><a class="btn btn-primary btn-large" href="/deploy">Deploy an app</a></p>
</div>
```

| Part | Spec |
| --- | --- |
| Box (`.hero-unit`) | Padding 60px; margin-bottom 30px; `--bv-color-surface-alt`; radius 6px; no border or shadow. Its last child drops its bottom margin, as in a well, so the space under the last line matches the space over the first |
| Heading (`.hero-unit h1`) | 44px on a 56px line; weight 600; h1's -0.015em letter-spacing; no top margin and 9px below, so its descenders clear the text under it |
| Text (`.hero-unit p`) | 18px on a 28px line at the regular weight; the usual 9px paragraph margin |
| Actions | A button in its own paragraph; 2.0 used `.btn-primary.btn-large` |
| Grid (`.hero-unit-grid`) | Optional. `--bv-color-surface` ruled with 1px `--bv-color-grid` lines every 20px both ways, every fifth vertical line darker where two layers meet, as in the band behind the top of the page; a 1px `--bv-color-border` inset edge, so the box keeps its size, and `--bv-shadow-raised` under it. On a `.grid-paper` page it drops its fill, grid, edge and shadow and sits on the page's grid paper, as the 2.0 docs' masthead did, since two grids that don't line up would show a seam. 2.0's hero had no grid |
| Below 768px | Padding 20px; heading 36px on a 40px line, the page header title's size, so it fits a 320px screen without horizontal scrolling. 2.0 had no small-screen hero |

### Wells and empty states

2.0's inset panel, and the message that takes an empty list's place.

```html
<div class="well well-empty">
  <p><strong>No apps on hearth-01 yet.</strong> Each app deploys with a git push.</p>
  <p><a class="btn btn-primary" href="/deploy">Deploy an app</a></p>
</div>
```

| Part | Spec |
| --- | --- |
| Well (`.well`) | Padding 19px, 20px with the border; margin-bottom 18px, not 2.0's 20px; `--bv-color-surface-alt`; 1px `--bv-color-border-soft` border; radius 6px; `--bv-shadow-well`, so it sits into the page. Its last child drops its bottom margin, so the padding alone sets the space inside. 2.0 had no such rule, and a paragraph's margin showed below the text |
| Empty state (`.well-empty`) | On a `.well`. Padding 35px top and bottom, 36px with the border; no fill or shadow, and a 1px dashed `--bv-color-border` edge, a space waiting to be filled; text centered in `--bv-color-muted`; paragraphs centered as blocks too, so their 56ch cap doesn't push them to one side |
| Content | Say what would be here and how to add the first one, in a sentence or two; a lead-in in `<strong>`; a button or link for the next step in its own paragraph. Use it in place of the list, not inside an empty table |

### Patterns

#### Confirm before deleting

A button can't ask "are you sure?" without JavaScript: a `<dialog>` needs a script to open. These apps confirm on a page of their own instead, built from existing parts; no CSS is involved.

```html
<!-- GET /settings -->
<a class="btn" href="/settings/erase">Erase all data&hellip;</a>

<!-- GET /settings/erase -->
<div class="page-header"><h1>Erase all data?</h1></div>
<p class="lead">This deletes everything in money, and money can't bring it back.</p>
<dl class="row cols-4 stats">…</dl>
<form action="/settings/erase" method="post">
  <div class="form-actions">
    <button class="btn btn-danger" type="submit">Erase all data</button>
    <a class="btn" href="/settings">Keep my data</a>
  </div>
</form>
```

- **The way in** is a plain `.btn` link, not a red button: red is for the action that can't be undone, and this one only opens a page. Its label ends in an ellipsis, because another step follows.
- **The confirmation page** has its own URL and title. It says what will go, in numbers where it can (a `.stats` list does this well), and what, if anything, can bring it back.
- **The one red button** posts the form. Nothing is deleted by a GET, so a crawler, a prefetch or the back button can't delete anything.
- **The way back** says what it does ("Keep my data"), not "Cancel", and returns to the page that started it.
- **For something no backup covers,** the form can also ask for the thing's name, checked by the server, before it deletes.

### Utilities

- `.muted`: text in `--bv-color-muted`.
- `.text-right`: `text-align: end`, for numeric columns and right-aligned actions. On a paragraph it also lifts the line-length cap; in a table cell it keeps the cell on one line.
- `.table-scroll`: see *Tables*.
- `.visually-hidden`: kept for screen readers, never shown: a field's label when the page already makes it clear, the words for an icon-only button, or a unit in a label. Absolutely positioned, 1px square, clipped with `clip-path: inset(50%)`, no wrapping. Use a real element with it rather than `aria-label`, so the text is translated with the page.
