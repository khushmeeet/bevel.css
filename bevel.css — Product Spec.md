# bevel.css — Product Spec

Oct 8, 2026 · @Khushmeet Singh

## Summary

bevel.css is one plain stylesheet that gives every app hosted on hearth the look of Bootstrap 2.0, built only on CSS that has worked in every major browser for at least 30 months.

It is for one person's own apps: server-rendered Go pages with little or no JavaScript. The visual reference is the [Bootstrap 2.0.0 documentation](https://bootstrapdocs.com/v2.0.0/docs/), especially its [Components page](https://bootstrapdocs.com/v2.0.0/docs/components.html). The approved preview is the *Bootstrap 2.0 docs (preview)* board on the [Hearth UI design canvas](https://claude.ai/artifact/AtJvchQdnzcs1GDoqpBPvC).

The shapes are 2012; the colors and the engineering are current. Every measurement below is the 2.0.0 value unless marked as a deliberate change, and every deliberate change exists for contrast or durability. The exception is color: the palette is modern, chosen for the look (see *Color*).

## Goals, principles and non-goals

The library succeeds if every app looks like it came from the same hand, loads instantly, and still works untouched in ten years.

### Goals

1. **One look across all apps.** The Bootstrap 2.0 visual language, applied consistently.
2. **Light.** At most 20 KB gzipped, zero web fonts, zero images, zero JavaScript in v0.1.
3. **Durable.** One plain CSS file, no build step, only Baseline Widely available features.
4. **Grown on demand.** Small core first; components are added only when a real app needs them.

### Design principles

- **Physical, not flat.** Light comes from above: top-lit gradients, darker bottom borders, recessed inputs, and 1px text emboss.
- **One rhythm.** 13px text on an 18px line; vertical spacing in multiples of 9px.
- **Color means something.** Blue is action and links. Green, amber and red are status. Everything else is grey.
- **Small, quick motion.** Transitions of 100–200ms on color, background and shadow only. Nothing moves the layout.
- **The app speaks, not the library.** Personal voice lives in each app's copy; the library stays neutral.

### Non-goals

- A Bootstrap clone. No jQuery plugins, no 12-column grid, no LESS or Sass.
- A framework for other people. No theming API beyond tokens, no backwards-compatibility promises to strangers.
- Legacy browsers. Nothing that isn't Baseline Widely available is supported or polyfilled.
- Utility-first styling. A handful of utilities at most; components carry the design.

## Scope

v0.1 ships ten areas: enough for a page, a nav, text, a form, a table and feedback. v0.2 adds input add-ons, pagination, wells with empty states, progress bars, stats, a screen-reader-only utility, spacing after rows and around headings, and a documented pattern for confirming before deleting, all found missing while building the money demo. Candidates are added only under the promotion rule in *Distribution and versioning*.

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
| Hero unit | v0.1 | `.hero-unit`, an opt-in large callout to open a page; `.hero-unit-grid` for the 18px grid on white |
| Utilities | v0.1 | `.muted`, `.text-right`, `.table-scroll`; `.visually-hidden` from v0.2 |
| Input add-ons | v0.2 | `.input-prepend`, `.input-append` and `.add-on`, for a unit or fixed part such as `$`, `MB` or `git@` |
| Pagination | v0.2 | `.pagination`, numbered page links for long lists |
| Wells and empty states | v0.2 | `.well`, an inset panel; `.well-empty`, the message in place of an empty list |
| Progress bars | v0.2 | `.progress` and `.bar`: plain, striped and animated striped; default, success, warning and danger |
| Stats | v0.2 | `.stats`, a big figure with a small label, for a home page's numbers |
| Confirm before deleting | v0.2 | A documented pattern, no CSS: a confirmation page in place of a dialog |
| Masthead and section bar | Candidate | `.subhead` with the masked 18px grid; sticky `.subnav` |
| Tabs and pills | Candidate | CSS only, for links between pages |
| Dropdowns and carets | Candidate | Built on `<details>`; a small `bevel.js` only if a case needs it |
| Modal | Candidate | Built on `<dialog>`; for confirming a delete, see *Patterns* |
| Breadcrumbs | Candidate | For deep pages |
| Code blocks with line numbers | Candidate | Docs-style gutter and syntax colors |
| Horizontal forms | Candidate | Label-left layout |
| More button colors | Candidate | Success, info, warning, inverse |
| Dismissible alerts | Candidate | Close button; needs JavaScript |
| Dark mode | Candidate | Token overrides under `prefers-color-scheme` and `[data-theme]` |
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
| `color-mix()` | Use | Derived tints only, never a base token |
| `accent-color` | Use | Checkbox and radio tint |
| `<dialog>`, `<details>` | Use | Modal and dropdowns without JavaScript (v0.2) |
| Native nesting, `:has()` | Later | Widely available since mid-2026; revisit at v0.2 |
| Popover API, `light-dark()` | Later | Become Widely available late 2026 |
| Container queries | Later | Available, but media queries cover v0.1 |
| Anchor positioning, `@scope`, `@property`, relative color syntax, view transitions | No | Not yet Widely available |

### Layer order

```css
@layer bevel.reset, bevel.base, bevel.layout, bevel.components, bevel.utilities;
```

1. `bevel.reset`: `box-sizing: border-box` everywhere; margins removed from headings, paragraphs and lists; images and video capped at their container's width.
2. `bevel.base`: element styles (body, headings, links, `code`, `pre`, `hr`, form controls), all inside `:where()` so their specificity is zero.
3. `bevel.layout`: `.container`, `.row`, `.page-header`.
4. `bevel.components`: navbar, buttons, form classes and add-ons, tables, alerts, labels, badges, hero unit, pagination, progress bars, stats, wells.
5. `bevel.utilities`: `.muted`, `.text-right`, `.table-scroll`, `.visually-hidden`; the rule that trims the last margin in each `.row` column, and the reduced-motion override, both here because they must beat component styles.

An app's own CSS is written outside any layer, so it overrides the library without `!important` or specificity tricks.

### Conventions

- **One file.** `bevel.css`, UTF-8, unminified, with a comment heading each section. No preprocessor, no build step, no JavaScript in v0.1.
- **Class names follow Bootstrap 2.x** (`.btn`, `.btn-primary`, `.btn-small`, `.table-striped`, `.alert-error`, `.label-important`, `.control-group`, `.help-block`, `.form-actions`), so the 2.x docs double as documentation.
- **States accept the class or the ARIA form.** `.active` or `[aria-current="page"]`; `.disabled`, `:disabled` or `[aria-disabled="true"]`; `.control-group.error` or `[aria-invalid="true"]`.
- **Every custom property starts with `--bv-`.** Global tokens are `--bv-<group>-<name>` (`--bv-color-link`). Component variables are `--bv-<component>-<property>` (`--bv-btn-bg`), declared on the component's root; variants only reassign variables.
- **Specificity stays flat.** No IDs, no `!important`, at most one class plus one state (0,2,0).
- **Units.** `rem` for type, line heights and spacing, with the root left at the browser default of 16px; `px` for borders, radii and shadows. Line heights are rem lengths (18px = 1.125rem) to keep 2.0's exact rhythm.
- **Breakpoints.** Mobile-first at 768px, 980px and 1200px, written as `@media (width >= 768px)`.

## Color

The shapes are Bootstrap 2.0.0's; the colors are modern. From v0.3 the neutrals are cool slate greys with a touch of blue, actions use a brighter blue, status colors are emerald, amber, rose and sky, and the navbar is deep slate rather than charcoal. Most values come from Tailwind CSS's slate, blue, emerald, amber, rose and sky scales. The meanings stay 2.0's: blue is action, green, amber and red are status. Every piece of text reaches 4.5:1 contrast on every surface it sits on, every focus ring and progress bar 3:1. The 0.2.0 column shows what each value replaced. Light only, for now.

### Neutrals

| Token | Value | 0.2.0 | Used for | Contrast |
| --- | --- | --- | --- | --- |
| `--bv-color-text` | #1E293B | #333333 | Body text, headings | 14.6:1 on white; 13.4:1 on #F1F5F9 |
| `--bv-color-muted` | #5B6779 | #6E6E6E | Help text, heading subtitles, `.muted`, placeholders | 5.7:1 on white; 5.2:1 on #F1F5F9 |
| `--bv-color-input-text` | #334155 | #555555 | Text typed into fields | 10.4:1 on white |
| `--bv-color-surface` | #FFFFFF | same | Page background, grid hero unit |  |
| `--bv-color-surface-alt` | #F1F5F9 | #F5F5F5 | Form actions bar, disabled fields, row hover, hero unit, wells |  |
| `--bv-color-stripe` | #F8FAFC | #F9F9F9 | Odd table rows |  |
| `--bv-color-border` | #E2E8F0 | #DDDDDD | Table borders, form actions top edge, disabled field border |  |
| `--bv-color-border-soft` | #EDF1F6 | #EEEEEE | Page header rule, `hr`, grid hero unit edge |  |
| `--bv-color-border-strong` | #CBD5E1 | #CCCCCC | Field borders, default button border |  |
| `--bv-color-border-bottom` | #AAB6C6 | #BBBBBB | Default button bottom edge |  |
| `--bv-color-grid` | rgba(15, 23, 42, 0.03) | rgba(0, 0, 0, 0.027) | Grid hero unit lines; the 2.0 docs drew this grid as a page background image |  |

### Action and focus

| Token | Value | 0.2.0 | Used for | Contrast |
| --- | --- | --- | --- | --- |
| `--bv-color-link` | #2563EB | #006DA3 | Links, checkbox and radio tint | 5.2:1 on white; 4.7:1 or more on every alert tint and on #F1F5F9 |
| `--bv-color-link-hover` | #1D4ED8 | #005580 | Hovered links | 6.7:1 on white |
| `--bv-color-primary-top` | #3B82F6 | #0088CC | Primary button gradient start |  |
| `--bv-color-primary-bottom` | #1D4ED8 | #0055CC | Primary button gradient end, hover fill |  |
| `--bv-color-primary` | #2563EB | #0074CC | Primary button flat fallback | 5.2:1 for white text; 5.0:1 at the gradient's midpoint |
| `--bv-color-primary-active` | #1E40AF | #004099 | Pressed primary button |  |
| `--bv-color-danger-top` | #F43F5E | #E0524E | Danger button gradient start |  |
| `--bv-color-danger-bottom` | #BE123C | #BD362F | Danger button gradient end, hover fill |  |
| `--bv-color-danger` | #E11D48 | #CF443E | Danger button flat fallback | 4.7:1 for white text; 4.8:1 at the gradient's midpoint |
| `--bv-color-danger-active` | #9F1239 | #942A25 | Pressed danger button |  |
| `--bv-color-focus` | #3B82F6 | #0088CC | Focus outline, focused field border | 3.7:1 on white, 3.4:1 on #F1F5F9, 4.0:1 or more on the navbar |
| `--bv-color-focus-glow` | rgba(59, 130, 246, 0.5) | rgba(82, 168, 236, 0.6) | Focused field glow |  |

White text on a gradient is measured at the gradient's midpoint.

### Navbar

| Token | Value | 0.2.0 | Used for | Contrast |
| --- | --- | --- | --- | --- |
| `--bv-color-navbar-top` | #1E293B | #333333 | Bar gradient start |  |
| `--bv-color-navbar-bottom` | #0F172A | #222222 | Bar gradient end; active link background |  |
| `--bv-color-navbar` | #172033 | #2C2C2C | Flat fallback |  |
| `--bv-color-navbar-link` | #94A3B8 | #999999 | Links | 6.3:1 on #172033 |
| `--bv-color-navbar-link-active` | #FFFFFF | same | Hovered and active links | 17.9:1 on #0F172A |
| `--bv-color-navbar-current` | #3B82F6 | #0088CC | Bar under the current link | 4.9:1 on #0F172A |
| `--bv-color-brand` | #FFFFFF | same | Brand | 16.3:1 on #172033 |

### Labels and badges

| Variant | Background | Edge | Text | Text contrast | 0.2.0 background, edge, text |
| --- | --- | --- | --- | --- | --- |
| Default (`.label`, `.badge`) | #E8EDF3 | #D3DCE6 | #475467 | 6.5:1 | #E9E9E9, #D4D4D4, #676767 |
| Success | #D1FAE5 | #A7F3D0 | #047857 | 4.8:1 | #D0F5D7, #B3E2BC, #17793A |
| Warning | #FEF3C7 | #FCD97A | #A14B06 | 5.4:1 | #F8EAB5, #E7D48F, #955B00 |
| Important | #FFE4E6 | #FECDD3 | #BE123C | 5.2:1 | #FFE1E0, #F9C6C4, #AA474C |
| Info | #E0F2FE | #BAE6FD | #0369A1 | 5.2:1 | #D5EDFF, #B2DAF7, #346D93 |
| Inverse | #1E293B | #1E293B | #FFFFFF | 14.6:1 | #333333, #333333, #FFFFFF |

Chips use the alert hues a step stronger than the alert tints (the 100 step where alerts use the 50), so a 16px chip still reads as a tint on white. Inverse stays dark: it is the one chip meant to stand out. Tokens follow `--bv-label-<variant>-bg`, `-border` and `-text`.

### Alerts

| Variant | Background | Border | Text | Text contrast | 0.2.0 background, border, text |
| --- | --- | --- | --- | --- | --- |
| Warning (default `.alert`) | #FFFBEB | #FDE7A9 | #A14B06 | 5.8:1 | #FFF7D9, #F0E2AD, #9F6204 |
| Error (`.alert-error`) | #FFF1F2 | #FECDD3 | #BE123C | 5.7:1 | #FFEBEA, #FFD3D2, #B4484E |
| Success (`.alert-success`) | #ECFDF5 | #A7F3D0 | #047857 | 5.2:1 | #DFF9E3, #C7EBCD, #297C43 |
| Info (`.alert-info`) | #F0F9FF | #BAE6FD | #0369A1 | 5.6:1 | #E2F3FF, #C3E5FE, #387197 |

The palest tint of each hue, with a border two steps stronger and text that keeps the hue at 5.2:1 or more. The warning text leans from amber toward orange, so it reads brown rather than olive. Links inside every alert keep 4.7:1 or more.

Tokens follow `--bv-alert-<variant>-bg`, `-border` and `-text`.

### Progress bars

| Variant | Gradient, top to bottom | Contrast at the midpoint, against the track | 0.2.0 |
| --- | --- | --- | --- |
| Default (`.progress`) | #3B82F6 to #1D4ED8, the primary button's | 4.6:1 | #0088CC to #0055CC |
| Success (`.progress-success`) | #10A36F to #047857 | 3.9:1 | #2B9F4A to #017F31 |
| Warning (`.progress-warning`) | #EA8A0B to #C2610A | 3.1:1 | #E18500 to #C16300 |
| Danger (`.progress-danger`) | #F43F5E to #BE123C, the danger button's | 4.5:1 | #E0524E to #BD362F |

Bars take the colored buttons' weight: the default and danger bars use the primary and danger buttons' gradient tokens, so they stay in step with them, and green and amber are set at the same depth. Every bar keeps 3:1 against its track (WCAG 1.4.11), measured at the gradient's midpoint like the buttons. 2.0.0 had no warning bar, and its info bar is close enough to the default blue to leave out. Tokens follow `--bv-progress-<variant>-top` and `-bottom`.

### Form errors and code

| Token | Value | 0.2.0 | Used for | Contrast |
| --- | --- | --- | --- | --- |
| `--bv-color-error` | #BE123C | #B94A48 | Error label, help text and typed text | 6.3:1 on white |
| `--bv-color-error-border` | #F43F5E | #EE5F5B | Field border in error |  |
| `--bv-color-error-focus` | #E11D48 | #E9322D | Focused field border in error |  |
| `--bv-color-error-glow` | #FECDD3 | #F8B9B7 | Focused field glow in error |  |
| `--bv-color-code-text` | #BE185D | #DD1144 | Inline `code` | 5.5:1 on #F1F5F9 |
| `--bv-color-code-bg` | #F1F5F9 | #F7F7F9 | Inline `code` background |  |
| `--bv-color-code-border` | #E2E8F0 | #E1E1E8 | Inline `code` border |  |

## Typography

Text is Helvetica Neue at 13px on an 18px line, exactly as in 2.0.0; nothing is downloaded.

### Families

| Token | Stack |
| --- | --- |
| `--bv-font-sans` | "Helvetica Neue", Helvetica, Arial, sans-serif |
| `--bv-font-mono` | Menlo, Monaco, Consolas, "Courier New", monospace |

### Scale

| Role | Selector | Size | Line height | Weight | Color |
| --- | --- | --- | --- | --- | --- |
| Body | `body` | 13px (0.8125rem) | 18px (1.125rem) | 400 | `--bv-color-text` |
| Lead | `.lead` | 20px (1.25rem) | 27px (1.6875rem) | 300 | `--bv-color-text` |
| Page header title | `.page-header h1` | 36px (2.25rem) | 40px (2.5rem) | 700 | `--bv-color-text` |
| Heading 1 | `h1` | 30px (1.875rem) | 36px (2.25rem) | 700 | `--bv-color-text` |
| Heading 2 | `h2` | 24px (1.5rem) | 36px (2.25rem) | 700 | `--bv-color-text` |
| Heading 3 | `h3` | 18px (1.125rem) | 27px (1.6875rem) | 700 | `--bv-color-text` |
| Heading 4 | `h4` | 14px (0.875rem) | 18px (1.125rem) | 700 | `--bv-color-text` |
| Heading 5 | `h5` | 12px (0.75rem) | 18px (1.125rem) | 700 | `--bv-color-text` |
| Heading 6 | `h6` | 11px (0.6875rem) | 18px (1.125rem) | 700, uppercase | `--bv-color-muted` |
| Heading subtitle | `h1 small`, `h2 small` | 18px (1.125rem) | inherited | 400 | `--bv-color-muted` |
| Heading subtitle | `h3 small` | 14px (0.875rem) | inherited | 400 | `--bv-color-muted` |
| Inline code | `code` | 12px (0.75rem) | 1, so a line with code stays 18px | 400 | `--bv-color-code-text` |
| Code block | `pre` | 12px (0.75rem) | 18px (1.125rem) | 400 | `--bv-color-text` |
| Hero title | `.hero-unit h1` | 60px (3.75rem); 36px below 768px | 60px (3.75rem); 40px below 768px | 700, -1px letter-spacing from 768px | `--bv-color-text` |
| Hero text | `.hero-unit p` | 18px (1.125rem) | 27px (1.6875rem) | 300 | `--bv-color-text` |

The lead and hero text are weight 300. 2.0 asked for 200, which rendered as Helvetica Neue Light in 2012; today 200 maps to the hairline Thin cut.

### Text elements

- **Paragraphs:** margin 0 0 9px; at most 56ch wide, about 70 characters a line at any size. `.text-right` lifts the cap.
- **Links:** `--bv-color-link` with a faint underline at 40% of the link color, so a link never relies on color alone; on hover, `--bv-color-link-hover` and a full-strength underline. Navbar links, the brand and link buttons have no underline. Color transitions over 150ms linear.
- **Body:** line height 1.3847, a ratio that gives 18px at 13px, so text an app sets larger keeps proportional leading; `overflow-wrap: break-word`, so long paths and hashes break instead of widening the page.
- **Images and video:** at most 100% of their container's width, with height kept in proportion.
- **Headings:** `text-rendering: optimizeLegibility`; margin 0 0 9px, plus an 18px top margin when the heading isn't the first child of its parent. A heading so sits closer to what it introduces than to what came before it, whatever that is, and a heading at the top of a column, alert or well lines up with its neighbours. The page header, the hero unit and `.alert-heading` set their own. A deliberate change: 2.0.0 headings had no margin, which left a heading touching a form label or table beneath it.
- **`strong`, `b`:** weight 700. **`small`** outside headings keeps the surrounding size, as in 2.0.
- **`code`:** padding 2px 4px, radius 3px, 1px border `--bv-color-code-border`, background `--bv-color-code-bg`.
- **`pre`:** block, padding 8px, margin 0 0 9px, background #F1F5F9, 1px border rgba(15, 23, 42, 0.15), radius 4px, `white-space: pre-wrap`, `overflow-wrap: anywhere`.
- **`hr`:** margin 18px 0, no border except 1px top `--bv-color-border-soft` and 1px bottom #FFFFFF, giving 2.0's etched line.

## Spacing, radius, depth and motion

Depth comes from three things only: vertical gradients lit from the top, 1px text emboss, and the shadows below. Component padding is fixed in each component spec; the spacing tokens are for layout and shared gaps.

### Spacing

| Token | Value | Used for |
| --- | --- | --- |
| `--bv-space-1` | 4px (0.25rem) | Tight gaps inside components |
| `--bv-space-2` | 5px (0.3125rem) | Label to field; between buttons in a form actions bar |
| `--bv-space-3` | 9px (0.5625rem) | Half rhythm: paragraph and code block margins |
| `--bv-space-4` | 14px (0.875rem) | Alert inline padding; block alert vertical padding |
| `--bv-space-5` | 18px (1.125rem) | One rhythm line: margins under tables, alerts, field groups, form actions |
| `--bv-space-6` | 20px (1.25rem) | Gutter: container padding, column gap; hero unit padding below 768px |
| `--bv-space-7` | 36px (2.25rem) | Two rhythm lines: empty well padding; masthead spacing later |
| `--bv-space-8` | 60px (3.75rem) | Space above each page section; hero unit padding |

### Radius and borders

| Token | Value | Used for |
| --- | --- | --- |
| `--bv-radius-sm` | 3px | Fields, labels, inline code |
| `--bv-radius` | 4px | Buttons, button groups, alerts, tables, `pre` |
| `--bv-radius-lg` | 5px | Large buttons |
| `--bv-radius-xl` | 6px | Hero unit; menus and modals (v0.2) |
| `--bv-radius-pill` | 9px | Badges |

Every border is 1px solid, except the 3px bar under the current navbar link. The navbar and full-width bars have no radius.

### Shadows

| Token | Value | Used on |
| --- | --- | --- |
| `--bv-shadow-button` | inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(15,23,42,.06) | Buttons at rest |
| `--bv-shadow-button-pressed` | inset 0 2px 4px rgba(15,23,42,.14), 0 1px 2px rgba(15,23,42,.04) | Pressed and `.active` buttons |
| `--bv-shadow-field` | inset 0 1px 2px rgba(15,23,42,.06) | Text fields, selects, textareas |
| `--bv-shadow-field-focus` | inset 0 1px 2px rgba(15,23,42,.06), 0 0 8px rgba(59,130,246,.5) | Focused fields |
| `--bv-shadow-field-error-focus` | 0 0 6px #FECDD3 | Focused fields in error |
| `--bv-shadow-navbar` | 0 1px 3px rgba(15,23,42,.2), inset 0 -1px 0 rgba(15,23,42,.1) | Navbar |
| `--bv-shadow-pagination` | 0 1px 2px rgba(15,23,42,.05) | Pagination links; 2.0 put it on the whole strip |
| `--bv-shadow-well` | inset 0 1px 1px rgba(15,23,42,.04) | Wells |
| `--bv-shadow-progress` | inset 0 1px 2px rgba(15,23,42,.08) | Progress track |
| `--bv-shadow-progress-bar` | inset 0 0 0 1px rgba(15,23,42,.08), inset 0 -1px 0 rgba(15,23,42,.12) | Progress bar: an edge like a colored button's border, darker along the bottom |

### Text emboss

| Token | Value | Used on |
| --- | --- | --- |
| `--bv-emboss-light` | 0 1px 1px rgba(255,255,255,.75) | Default buttons |
| `--bv-emboss-soft` | 0 1px 0 rgba(255,255,255,.5) | Alerts, labels, badges |
| `--bv-emboss-dark` | 0 -1px 0 rgba(15,23,42,.25) | Colored buttons, navbar links, inverse labels and badges |

### Gradients

- Always vertical, top to bottom, with `background-repeat: no-repeat` so a hover can slide the gradient up and reveal the flat fill beneath.
- The default button holds white for its top quarter: `linear-gradient(#FFFFFF, #FFFFFF 25%, #E9EEF4)`.
- Buttons, the navbar and progress bars use gradients; the progress track is a recessed one, darker at the top.

### Motion

| Token | Value | Used for |
| --- | --- | --- |
| `--bv-duration-fast` | 100ms | Button background shift, table row and pagination hover |
| `--bv-duration` | 150ms | Link and navbar link color |
| `--bv-duration-slow` | 200ms | Field border and glow |
| `--bv-ease` | linear | All transitions, as in 2.0 |

- Only `color`, `background-color`, `background-position`, `border-color`, `box-shadow`, `text-shadow` and `opacity` may animate. Nothing that changes layout.
- Under `prefers-reduced-motion: reduce`, every transition and animation runs in 0.01ms.
- The animated striped progress bar is the only looping animation: its stripes move 40px along over 2s, linear, forever, by `background-position`. Reduced motion stops it after one 0.01ms run.

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

- `.page-header`: padding-bottom 17px, margin 18px 0, 1px bottom border `--bv-color-border-soft`.
- Its `h1` is 36px on a 40px line; a `small` after a space is the subtitle at 18px, weight 400, `--bv-color-muted`.
- `.section`: padding-top 60px. The first section on a page sits 18px below the navbar instead.

## Components

Each v0.1 component is specified by its markup, its exact measurements and every state; anything not listed here is not part of the component.

### Navbar

The 2.0 docs top bar: dark, 40px tall, links on the left, a white brand on the right. Put the brand before the links to move it to the left, and add `.nav-end` to push a group of links to the right. Add `.navbar-sticky` to keep it at the top while the page scrolls.

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
| Bar (`.navbar-inner`) | Min-height 40px; `linear-gradient(#1E293B, #0F172A)` over #172033; `--bv-shadow-navbar`; no radius; full viewport width |
| Row (`.navbar .container`) | Flex, wraps, items stretch to full bar height |
| Link (`.nav > a`) | 13px on a 19px line; padding 10px 10px 11px; #94A3B8; `--bv-emboss-dark`; no underline |
| Link, hover | #FFFFFF over 150ms linear; background unchanged; only on pointers that hover |
| Link, active (`.active` or `aria-current="page"`) | #FFFFFF on #0F172A, full bar height, with a 3px `--bv-color-navbar-current` bottom border taken out of the bottom padding, so the link stays 40px and the current page doesn't rely on brightness alone |
| Link and brand, focus | Standard focus outline with `outline-offset: -2px`, so it stays inside the bar |
| Divider (`.divider-vertical`) | 1px wide, full bar height, margin 0 9px, #0F172A with a 1px #1E293B right border; hidden below 768px |
| Brand (`.brand`) | 20px at weight 200 on a 22px line; #FFFFFF; `--bv-emboss-dark`; no underline; padding 8px 20px 10px. Source order picks the side: first in the row, on the left with a -20px start margin; after a `.nav`, pushed right with `margin-inline-start: auto` and a -20px end margin. Either way the text sits on the content edge, as in 2.0, with room inside the box for the focus ring. After a `.nav-end`, it sits flush against those links, and still ends the last row if it wraps |
| End links (`.nav-end`) | Optional, on a `.nav`. `flex-grow: 1` with `justify-content: flex-end`: the group takes the free space and sets its links at the far end, pushing it and everything after it to the right |
| Below 768px | Links wrap onto more rows; no hamburger; the brand ends the last row, or starts the first when it comes before the links |
| Skip link (`.skip-link`) | First element in the page, pointing at `<main id="main">`. Off-screen until it takes keyboard focus, then a white box with the link color over the top-left of the bar (z-index 1031, above the sticky bar), padding 4px 10px, radius 4px, `--bv-shadow-navbar` |
| Sticky (`.navbar-sticky`) | From 768px: `position: sticky` at the top, z-index 1030 (2.0's fixed-navbar layer), same `--bv-shadow-navbar` as the static bar. The page gets a 58px `scroll-padding-top` (bar plus 18px), so anchor jumps and keyboard focus land below the bar (WCAG 2.4.11). Below 768px the bar scrolls away with the page, as in 2.0 |

## Accessibility

v0.1 targets WCAG 2.2 AA, with one documented exception inherited from the 2.0 look.

- **Text contrast:** at least 4.5:1, or 3:1 for text 24px and up or 18.66px bold. Every text color in *Color* lists its measured ratio.
- **Focus:** every interactive element shows a visible indicator through `:focus-visible`, in `--bv-color-focus` at 3:1 or more against everything it crosses. `outline: none` is never used without a replacement.
- **Bypass:** a `.skip-link` first in the page lets keyboard users jump past the navbar.
- **Keyboard:** v0.1 uses only native elements and no JavaScript, so keyboard behavior is the browser's own.
- **Target size:** the smallest control is 28px tall (buttons, fields), above WCAG 2.2's 24×24px minimum. Navbar links are 40px tall.
- **Zoom and reflow:** type is in `rem`, so browser font settings apply. Pages reflow with no horizontal scrolling at 320px width and at 200% zoom, except inside `.table-scroll`.
- **Motion:** `prefers-reduced-motion` is honored as described under *Motion*.
- **State hooks:** `aria-current`, `aria-pressed`, `aria-disabled` and `aria-invalid` style components directly, so the accessible markup is also the styled markup. Error help is tied to its field with `aria-describedby`.
- **Color is never the only signal:** labels carry words, badges carry numbers, errors carry text, links carry an underline, the current navbar link carries a bar, and the current page in a pagination strip sinks in.
- **Hidden text:** `.visually-hidden` gives a field a real `<label>`, or an icon-only button its words, without showing them. Prefer it to `aria-label`, so the name is translated with the page.

### Exceptions

| Item | Issue | Mitigation |
| --- | --- | --- |
| Field borders | #CBD5E1 on white is 1.5:1, under the 3:1 target for component boundaries | Every field has a visible label and an inset shadow; accepted for the 2.0 look |
| Field text size | Fields use 13px text, and iOS Safari zooms the page when a field under 16px takes focus | Zoom is reversible and doesn't block input; accepted to keep 2.0's field size on every screen |
| Progress track | The #F1F5F9 to #F8FAFC track is 1.1:1 on white, so the full length of a bar is hard to see | The bar keeps 3:1 against the track; the value is always in words beside it or in its table row, and in `aria-valuenow` or `aria-valuetext`; accepted for the 2.0 look |

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
| Visual change to an existing component | Minor, with new baselines and a changelog entry | Adjusting the danger gradient |
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

- [x] **Brand:** decided: 2.0's standard white brand at weight 200, legible on the dark bar.
- [x] **Base size:** decided: 13px, as in 2.0.0.
- [x] **Field borders:** decided: keep a light border (#CBD5E1 since v0.3) for the 2.0 look; recorded under Accessibility exceptions.
- [ ] **Size budget:** is 20 KB gzipped the right ceiling?
- [x] **Naming:** decided: no import path or shared URL; each app ships its own copy as `bevel-<version>.css`.
- [ ] **Dark mode:** schedule it for v0.2, or wait until an app needs it?

## Sources

- [Bootstrap 2.0.0 documentation](https://bootstrapdocs.com/v2.0.0/docs/)
- [Bootstrap 2.0.0 Components](https://bootstrapdocs.com/v2.0.0/docs/components.html)
- [stylelint-plugin-use-baseline](https://npmjs.com/package/stylelint-plugin-use-baseline)

### Buttons

`.btn` works on `<button>`, `<a>` and `<input type="submit">`; three variants and two size modifiers cover v0.1.

| Property | `.btn` | `.btn-small` | `.btn-large` |
| --- | --- | --- | --- |
| Font size / line height | 13px / 18px | 11px / 16px | 15px / 20px |
| Padding | 4px 10px | 5px 9px | 9px 14px |
| Height, borders included | 28px | 28px | 40px |
| Radius | 4px | 4px | 5px |

| Variant | Gradient, top to bottom | Flat fill / hover fill | Pressed fill | Text | Border |
| --- | --- | --- | --- | --- | --- |
| Default (`.btn`) | #FFFFFF, #FFFFFF at 25%, #E9EEF4 | #F8FAFC / #E9EEF4 | #E9EEF4 | #1E293B, `--bv-emboss-light` | #CBD5E1, bottom #AAB6C6 |
| Primary (`.btn-primary`) | #3B82F6 to #1D4ED8 | #2563EB / #1D4ED8 | #1E40AF | #FFFFFF, `--bv-emboss-dark` | rgba(15,23,42,.1), bottom rgba(15,23,42,.25) |
| Danger (`.btn-danger`) | #F43F5E to #BE123C | #E11D48 / #BE123C | #9F1239 | #FFFFFF, `--bv-emboss-dark` | Same as primary |

- **Rest:** `--bv-shadow-button`; `display: inline-flex`, content centered, 5px gap between an icon and text; links lose their underline.
- **Hover** (pointers that hover only, so it never sticks after a tap): the gradient slides up 15px (`background-position: 0 -15px`) over 100ms linear, revealing the hover fill along the bottom. Text is unchanged. Leaving slides it back down the same way; the hover fill stays beneath until the gradient covers it, so no strip of the rest fill shows.
- **Pressed** (`:active`, `.active` or `aria-pressed="true"`): gradient removed, pressed fill, `--bv-shadow-button-pressed`.
- **Focus** (`:focus-visible`): 2px solid `--bv-color-focus` outline, 1px offset.
- **Disabled** (`:disabled`, `.disabled` or `aria-disabled="true"`): opacity .65, gradient and shadows removed, `cursor: not-allowed`, no hover or press change.

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

v0.1 forms are stacked: label above field. Fields are styled as plain elements at zero specificity, so a bare `<input>` already looks right; classes add grouping, help and error states.

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
| Label | Block; 13px / 18px; #1E293B; weight 400; margin-bottom 5px |
| Text fields: `input` (text, email, password, search, number, url, tel, date, datetime-local, month, week, time), `select` | Height 28px; padding 4px 6px; 13px / 18px; #334155 on #FFFFFF; 1px #CBD5E1 border; radius 3px; `--bv-shadow-field`; width 100% up to 280px |
| `textarea` | Same box; min-height 82px (four lines); `resize: vertical` |
| `select` | Same box with padding 3px 6px; native arrow kept. With `multiple` or `size`, height grows to show its rows |
| Width modifiers | `.input-block` removes the 280px cap; `.input-small` caps at 90px |
| Placeholder | `--bv-color-muted` |
| Focus | Border `--bv-color-focus`; `--bv-shadow-field-focus`; no outline; border and shadow transition over 200ms linear |
| Disabled and read-only | Background #F1F5F9; border #E2E8F0; `cursor: not-allowed` when disabled |
| Checkbox and radio (`label.checkbox`, `label.radio`) | Inline-flex, 6px gap, control aligned to the first text line; `accent-color` = `--bv-color-link`; 5px between stacked options |
| Field group (`.control-group`) | Label, field and help; margin-bottom 18px |
| Control group (`fieldset`, `legend`) | `fieldset` has no border, padding or margin; `legend` is styled as a label. Use it for radios and related checkboxes; it can also take `.control-group` |
| Help (`.help-block`) | Block; margin-top 5px; 13px / 18px; `--bv-color-muted` |
| Add-ons (`.input-prepend`, `.input-append`, `.add-on`) | See *Input add-ons* below |
| Error (`.control-group.error`, or a field with `aria-invalid="true"`) | Label, legend and help #BE123C; field text #BE123C and border #F43F5E; on focus, border #E11D48 and `--bv-shadow-field-error-focus` |
| Actions bar (`.form-actions`) | Padding 17px 20px 18px; margin 18px 0; background #F1F5F9; 1px #E2E8F0 top border; buttons in a row with a 5px gap |


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
| Add-on (`.add-on`) | 13px / 18px; padding 4px 5px; at least 28px wide, so it's at least square (2.0's 16px minimum plus padding and border); `--bv-color-muted` (4.7:1) on `--bv-color-surface-alt`; `--bv-emboss-light`; 1px `--bv-color-border-strong` border; radius 3px; never wraps or shrinks |
| Join | The add-on drops its border on the side that touches the field, so one 1px line divides them; the joined corners are square |
| Focus | The field's usual border and glow, lifted with `z-index: 1` so an add-on after it doesn't cover the glow |
| Error (`.control-group.error`) | Add-on text `--bv-alert-error-text` on `--bv-alert-error-bg` (5.7:1), border `--bv-color-error-border`. 2.0 used #B94A48 on #F2DEDE; the pastel tint follows the alerts. With `aria-invalid` alone, only the field turns red, as with the label |
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
| Table (`.table`) | Width 100%; margin-bottom 18px; `border-collapse: separate`; `border-spacing: 0` |
| Cells (`th`, `td`) | Padding 8px; 13px / 18px; left-aligned; `vertical-align: middle`; 1px #E2E8F0 top border; `font-variant-numeric: tabular-nums` |
| Header cells | Weight 700; `vertical-align: bottom`; no top border on the first row |
| Row hover | Body cells turn #F1F5F9 over 100ms linear; only on pointers that hover |
| `.table-striped` | Odd body rows #F8FAFC; hover still wins |
| `.table-bordered` | 1px #E2E8F0 outer border and a 1px left border on every cell after the first column; outer corners 4px |
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
| Item (`li > a`, `li > span`) | 13px text on a 34px line; padding 0 14px; 36px tall, two rhythm lines; white; 1px `--bv-color-border` border; `--bv-shadow-pagination`; no underline; tabular figures; never wraps. Each item overlaps the one before by 1px, so neighbours share one border. The first item keeps its start corners and the last its end corners at 3px |
| Link | `--bv-color-link`, and `--bv-color-link-hover` on hover |
| Hover | Background `--bv-color-surface-alt` over 100ms linear; only on pointers that hover |
| Focus | Standard focus outline, lifted with `z-index: 1` so neighbours don't cover it |
| Current (`aria-current="page"`, or `.active` on the `li`) | `--bv-color-text` on `--bv-color-surface-alt`, `--bv-shadow-button-pressed`, default cursor. A deliberate change: 2.0's #999999 on #F5F5F5 is 2.6:1 and differs from the links by color alone; sunk like a pressed button, the current page reads without color |
| Disabled (a `span`, a link with `aria-disabled="true"`, or `.disabled` on the `li`) | `--bv-color-muted` on white, default cursor, no hover. Use a `span` for Previous on the first page, Next on the last, and an ellipsis between page numbers |
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
| Box (`.alert`) | Padding 8px 35px 8px 14px; margin-bottom 18px; 1px border; radius 4px; 13px / 18px; `--bv-emboss-soft`; warning colors by default |
| Variants | `.alert-error`, `.alert-success`, `.alert-info`; colors in *Color → Alerts* |
| `.alert-block` | 14px top and bottom padding; paragraphs inside have no margin, 9px between consecutive ones |
| `.alert-heading` | Usually an `h4`; inherits the alert's text color; margin-bottom 4px |
| Lead word | Optional `<strong>` at weight 700 before the message |
| Roles | `role="alert"` for errors that need attention now; `role="status"` for everything else |
| Close button | Not in v0.1. The 35px right padding stays so adding it later won't reflow text |

### Labels and badges

Labels are short status words; badges are counts.

```html
<span class="label label-success">Running</span>
<span class="badge badge-important">2</span>
```

| Part | Spec |
| --- | --- |
| Label (`.label`) | Inline-block; padding 1px 4px 2px; 11px / 13px bold; radius 3px; `vertical-align: middle`; never wraps; #475467 on #E8EDF3 with a 1px #D3DCE6 inset edge (`box-shadow`, so the chip keeps 2.0's size); `--bv-emboss-soft` |
| Badge (`.badge`) | As a label, with padding 1px 9px 2px, 12px / 14px and radius 9px |
| Variants | `-success`, `-warning`, `-important`, `-info` and `-inverse`, applied as `.label-success`, `.badge-success` and so on; colors in *Color → Labels and badges*. Inverse keeps white text with `--bv-emboss-dark` |
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
| Track (`.progress`) | 18px tall, one rhythm line; at least 90px wide, so a column of bars keeps its size; margin-bottom 18px, none in a table cell; `linear-gradient(#F1F5F9, #F8FAFC)`; `--bv-shadow-progress`; radius 4px; clips the bar |
| Bar (`.bar`) | Full height; its width, set inline by the page, is the value, and it's empty without one; the variant's gradient; `--bv-shadow-progress-bar`. No text inside, and no width transition: 2.0 eased the width over 0.6s, which moves layout, and a server-rendered bar never changes |
| Variants | `.progress-success`, `.progress-warning`, `.progress-danger` on the track; colors in *Color → Progress bars* |
| Striped (`.progress-striped`) | 2.0's white stripes at 15%, 45° and 40px apart, laid over the bar's gradient |
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
| Label (`dt`) | 13px / 18px; `--bv-color-muted` |
| Figure (`dd`) | 30px, h1's size, on a 36px line, two rhythm lines; weight 300, the lead's; `--bv-color-text` |
| Unit (`dd small`) | 18px, `--bv-color-muted`, as in a heading's subtitle: "118 of 192 GB", "6 hours ago" |
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
| Box (`.hero-unit`) | Padding 60px; margin-bottom 30px; background #F1F5F9; radius 6px; no border or shadow |
| Heading (`.hero-unit h1`) | 60px on a 60px line; weight 700; letter-spacing -1px; no margin |
| Text (`.hero-unit p`) | 18px on a 27px line at weight 300, not 2.0's 200 (see *Typography*); #1E293B, 13.4:1 on #F1F5F9; the usual 9px paragraph margin |
| Actions | A button in its own paragraph; 2.0 used `.btn-primary.btn-large` |
| Grid (`.hero-unit-grid`) | Optional. White fill ruled with 1px `--bv-color-grid` lines every 18px both ways, every fifth vertical line darker where two layers overlap, as in the 2.0 docs' page background; a 1px `--bv-color-border-soft` inset edge, so the box keeps its size. 2.0's hero had no grid |
| Below 768px | Padding 20px; heading 36px on a 40px line with no letter-spacing, the page header title's size, so it fits a 320px screen without horizontal scrolling. 2.0 had no small-screen hero |


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
| Well (`.well`) | Padding 19px, 20px with the border; margin-bottom 18px, not 2.0's 20px, so it keeps the rhythm; `--bv-color-surface-alt`; 1px rgba(15,23,42,.05) border; radius 4px; `--bv-shadow-well`. Its last child drops its bottom margin, so the padding alone sets the space inside. 2.0 had no such rule, and a paragraph's margin showed below the text |
| Empty state (`.well-empty`) | On a `.well`. Padding 35px top and bottom, 36px with the border; text centered in `--bv-color-muted` (4.7:1); paragraphs centered as blocks too, so their 56ch cap doesn't push them to one side |
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
- `.text-right`: `text-align: end`, for numeric columns and right-aligned actions. On a paragraph it also lifts the line-length cap.
- `.table-scroll`: see *Tables*.
- `.visually-hidden`: kept for screen readers, never shown: a field's label when the page already makes it clear, the words for an icon-only button, or a unit in a label. Absolutely positioned, 1px square, clipped with `clip-path: inset(50%)`, no wrapping. Use a real element with it rather than `aria-label`, so the text is translated with the page.
