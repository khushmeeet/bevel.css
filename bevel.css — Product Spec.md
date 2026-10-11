# bevel.css — Product Spec

Oct 8, 2026 · @Khushmeet Singh

## Summary

bevel.css is one plain stylesheet that gives every app hosted on hearth the look of Bootstrap 2.0, built only on CSS that has worked in every major browser for at least 30 months.

It is for one person's own apps: server-rendered Go pages with little or no JavaScript. The visual reference is the [Bootstrap 2.0.0 documentation](https://bootstrapdocs.com/v2.0.0/docs/), especially its [Components page](https://bootstrapdocs.com/v2.0.0/docs/components.html). The approved preview is the *Bootstrap 2.0 docs (preview)* board on the [Hearth UI design canvas](https://claude.ai/artifact/AtJvchQdnzcs1GDoqpBPvC).

The look is 2012; the engineering is current. Every measurement below is the 2.0.0 value unless marked as a deliberate change, and every deliberate change exists for contrast or durability. The one exception is the pastel tints on labels, badges and alerts, chosen for the look.

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

v0.1 ships ten areas: enough for a page, a nav, text, a form, a table and feedback. Candidates are added only under the promotion rule in *Distribution and versioning*.

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
| Utilities | v0.1 | `.muted`, `.text-right`, `.table-scroll` |
| Masthead and section bar | Candidate | `.subhead` with the masked 18px grid; sticky `.subnav` |
| Tabs and pills | Candidate | CSS only, for links between pages |
| Dropdowns and carets | Candidate | Built on `<details>`; a small `bevel.js` only if a case needs it |
| Modal | Candidate | Built on `<dialog>` |
| Progress bars | Candidate | Plain, striped, animated striped |
| Wells and empty states | Candidate | Inset panel; empty-list message |
| Breadcrumbs and pagination | Candidate | For deep pages and long lists |
| Code blocks with line numbers | Candidate | Docs-style gutter and syntax colors |
| Input add-ons and horizontal forms | Candidate | Prefix such as `git@`; label-left layout |
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
| Media queries with range syntax; `prefers-reduced-motion` | Use | Breakpoints; turning motion off |
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

1. `bevel.reset`: `box-sizing: border-box` everywhere; margins removed from headings, paragraphs and lists.
2. `bevel.base`: element styles (body, headings, links, `code`, `pre`, `hr`, form controls), all inside `:where()` so their specificity is zero.
3. `bevel.layout`: `.container`, `.row`, `.page-header`.
4. `bevel.components`: navbar, buttons, form classes, tables, alerts, labels, badges, hero unit.
5. `bevel.utilities`: `.muted`, `.text-right`, `.table-scroll`.

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

The palette is Bootstrap 2.0.0's, with four values darkened so every piece of text reaches 4.5:1 contrast; those rows show the original in the 2.0.0 column. Labels, badges and alerts use pastel tints instead of 2.0's solid colors, keeping 2.0's hues so blue, green, amber and red mean what they did. v0.1 is light-only.

### Neutrals

| Token | Value | 2.0.0 | Used for | Contrast |
| --- | --- | --- | --- | --- |
| `--bv-color-text` | #333333 | same | Body text, headings | 12.6:1 on white |
| `--bv-color-muted` | #767676 | #999999 | Help text, heading subtitles, `.muted`, placeholders | 4.5:1 on white |
| `--bv-color-input-text` | #555555 | same | Text typed into fields | 7.5:1 on white |
| `--bv-color-surface` | #FFFFFF | same | Page background, grid hero unit |  |
| `--bv-color-surface-alt` | #F5F5F5 | same | Form actions bar, disabled fields, row hover, hero unit |  |
| `--bv-color-stripe` | #F9F9F9 | same | Odd table rows |  |
| `--bv-color-border` | #DDDDDD | same | Table borders, form actions top edge, disabled field border |  |
| `--bv-color-border-soft` | #EEEEEE | same | Page header rule, `hr`, grid hero unit edge |  |
| `--bv-color-border-strong` | #CCCCCC | same | Field borders, default button border |  |
| `--bv-color-border-bottom` | #BBBBBB | same | Default button bottom edge |  |
| `--bv-color-grid` | rgba(0, 0, 0, 0.027) | docs only | Grid hero unit lines; the 2.0 docs drew this grid as a page background image |  |

### Action and focus

| Token | Value | 2.0.0 | Used for | Contrast |
| --- | --- | --- | --- | --- |
| `--bv-color-link` | #0077B3 | #0088CC | Links | 4.9:1 on white |
| `--bv-color-link-hover` | #005580 | same | Hovered links | 8.0:1 on white |
| `--bv-color-primary-top` | #0088CC | same | Primary button gradient start |  |
| `--bv-color-primary-bottom` | #0055CC | same | Primary button gradient end, hover fill |  |
| `--bv-color-primary` | #0074CC | same | Primary button flat fallback | 5.1:1 for white text |
| `--bv-color-primary-active` | #004099 | same | Pressed primary button |  |
| `--bv-color-danger-top` | #E0524E | #EE5F5B | Danger button gradient start |  |
| `--bv-color-danger-bottom` | #BD362F | same | Danger button gradient end, hover fill |  |
| `--bv-color-danger` | #CF443E | #DA4F49 | Danger button flat fallback | 4.7:1 for white text |
| `--bv-color-danger-active` | #942A25 | same | Pressed danger button |  |
| `--bv-color-focus` | rgba(82, 168, 236, 0.8) | same | Focused field border, focus outline |  |
| `--bv-color-focus-glow` | rgba(82, 168, 236, 0.6) | same | Focused field glow |  |

White text on a gradient is measured at the gradient's midpoint, which is why the danger gradient starts darker than 2.0's.

### Navbar

| Token | Value | 2.0.0 | Used for | Contrast |
| --- | --- | --- | --- | --- |
| `--bv-color-navbar-top` | #333333 | same | Bar gradient start |  |
| `--bv-color-navbar-bottom` | #222222 | same | Bar gradient end; active link background |  |
| `--bv-color-navbar` | #2C2C2C | same | Flat fallback |  |
| `--bv-color-navbar-link` | #999999 | same | Links | 5.0:1 on #2C2C2C |
| `--bv-color-navbar-link-active` | #FFFFFF | same | Hovered and active links | 14.5:1 on #222222 |
| `--bv-color-brand` | #FFFFFF | same | Brand | 14.0:1 on #2C2C2C |

### Labels and badges

| Variant | Background | Edge | Text | Text contrast | 2.0.0 (white text on) |
| --- | --- | --- | --- | --- | --- |
| Default (`.label`, `.badge`) | #E9E9E9 | #D4D4D4 | #676767 | 4.7:1 | #999999 |
| Success | #D0F5D7 | #B3E2BC | #17793A | 4.6:1 | #468847 |
| Warning | #F8EAB5 | #E7D48F | #955B00 | 4.6:1 | #F89406 |
| Important | #FFE1E0 | #F9C6C4 | #AA474C | 4.6:1 | #B94A48 |
| Info | #D5EDFF | #B2DAF7 | #346D93 | 4.6:1 | #3A87AD |
| Inverse | #333333 | #333333 | #FFFFFF | 12.6:1 | #333333 |

Chips use the alert hues a step stronger than the alert tints, so a 16px chip still reads as a tint on white. Inverse stays dark: it is the one chip meant to stand out. Tokens follow `--bv-label-<variant>-bg`, `-border` and `-text`.

### Alerts

| Variant | Background | Border | Text | Text contrast | 2.0.0 background, border, text |
| --- | --- | --- | --- | --- | --- |
| Warning (default `.alert`) | #FFF7D9 | #F0E2AD | #9F6204 | 4.6:1 | #FCF8E3, #FBEED5, #C09853 |
| Error (`.alert-error`) | #FFEBEA | #FFD3D2 | #B4484E | 4.6:1 | #F2DEDE, #EED3D7, #B94A48 |
| Success (`.alert-success`) | #DFF9E3 | #C7EBCD | #297C43 | 4.6:1 | #DFF0D8, #D6E9C6, #468847 |
| Info (`.alert-info`) | #E2F3FF | #C3E5FE | #387197 | 4.7:1 | #D9EDF7, #BCE8F1, #3A87AD |

Pastel tints replace 2.0's dusty ones, keeping the same four hues so the meanings hold. The backgrounds share one perceived lightness (OKLCH L 0.955 to 0.975) with a little more color than 2.0's. Each text color keeps its tint's hue and is the lightest that reaches 4.6:1 on its background. The warning text leans from yellow toward amber, so it reads brown rather than olive.

Tokens follow `--bv-alert-<variant>-bg`, `-border` and `-text`.

### Form errors and code

| Token | Value | Used for | Contrast |
| --- | --- | --- | --- |
| `--bv-color-error` | #B94A48 | Error label, help text and typed text | 5.1:1 on white |
| `--bv-color-error-border` | #EE5F5B | Field border in error |  |
| `--bv-color-error-focus` | #E9322D | Focused field border in error |  |
| `--bv-color-error-glow` | #F8B9B7 | Focused field glow in error |  |
| `--bv-color-code-text` | #DD1144 | Inline `code` | 4.6:1 on #F7F7F9 |
| `--bv-color-code-bg` | #F7F7F9 | Inline `code` background |  |
| `--bv-color-code-border` | #E1E1E8 | Inline `code` border |  |

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

- **Paragraphs:** margin 0 0 9px.
- **Links:** `--bv-color-link`, no underline; `--bv-color-link-hover` with underline on hover. Color transitions over 150ms linear.
- **Headings:** `text-rendering: optimizeLegibility`; no margins in the reset, spacing comes from the component or page around them.
- **`strong`, `b`:** weight 700. **`small`** outside headings keeps the surrounding size, as in 2.0.
- **`code`:** padding 2px 4px, radius 3px, 1px border `--bv-color-code-border`, background `--bv-color-code-bg`.
- **`pre`:** block, padding 8px, margin 0 0 9px, background #F5F5F5, 1px border rgba(0, 0, 0, 0.15), radius 4px, `white-space: pre-wrap`, `overflow-wrap: anywhere`.
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
| `--bv-space-7` | 36px (2.25rem) | Masthead spacing (v0.2) |
| `--bv-space-8` | 60px (3.75rem) | Space above each page section; hero unit padding |

### Radius and borders

| Token | Value | Used for |
| --- | --- | --- |
| `--bv-radius-sm` | 3px | Fields, labels, inline code |
| `--bv-radius` | 4px | Buttons, button groups, alerts, tables, `pre` |
| `--bv-radius-lg` | 5px | Large buttons |
| `--bv-radius-xl` | 6px | Hero unit; menus and modals (v0.2) |
| `--bv-radius-pill` | 9px | Badges |

Every border is 1px solid. The navbar and full-width bars have no radius.

### Shadows

| Token | Value | Used on |
| --- | --- | --- |
| `--bv-shadow-button` | inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05) | Buttons at rest |
| `--bv-shadow-button-pressed` | inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05) | Pressed and `.active` buttons |
| `--bv-shadow-field` | inset 0 1px 1px rgba(0,0,0,.075) | Text fields, selects, textareas |
| `--bv-shadow-field-focus` | inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(82,168,236,.6) | Focused fields |
| `--bv-shadow-field-error-focus` | 0 0 6px #F8B9B7 | Focused fields in error |
| `--bv-shadow-navbar` | 0 1px 3px rgba(0,0,0,.25), inset 0 -1px 0 rgba(0,0,0,.1) | Navbar |

### Text emboss

| Token | Value | Used on |
| --- | --- | --- |
| `--bv-emboss-light` | 0 1px 1px rgba(255,255,255,.75) | Default buttons |
| `--bv-emboss-soft` | 0 1px 0 rgba(255,255,255,.5) | Alerts, labels, badges |
| `--bv-emboss-dark` | 0 -1px 0 rgba(0,0,0,.25) | Colored buttons, navbar links, inverse labels and badges |

### Gradients

- Always vertical, top to bottom, with `background-repeat: no-repeat` so a hover can slide the gradient up and reveal the flat fill beneath.
- The default button holds white for its top quarter: `linear-gradient(#FFFFFF, #FFFFFF 25%, #E6E6E6)`.
- In v0.1, only buttons and the navbar use gradients.

### Motion

| Token | Value | Used for |
| --- | --- | --- |
| `--bv-duration-fast` | 100ms | Button background shift, table row hover |
| `--bv-duration` | 150ms | Link and navbar link color |
| `--bv-duration-slow` | 200ms | Field border and glow |
| `--bv-ease` | linear | All transitions, as in 2.0 |

- Only `color`, `background-color`, `background-position`, `border-color`, `box-shadow`, `text-shadow` and `opacity` may animate. Nothing that changes layout.
- Under `prefers-reduced-motion: reduce`, every transition and animation runs in 0.01ms.
- v0.1 has no looping animation; the striped progress bar (v0.2) will be the only one.

## Layout

Pages use a centered container whose content width steps through 2.0's responsive widths, with equal-width columns on CSS grid instead of the 12-column span system.

```html
<body>
  <header class="navbar">…</header>
  <main class="container">
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

- `.row` is a grid with an 18px row gap and a 20px column gap.
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
| Bar (`.navbar-inner`) | Min-height 40px; `linear-gradient(#333333, #222222)` over #2C2C2C; `--bv-shadow-navbar`; no radius; full viewport width |
| Row (`.navbar .container`) | Flex, wraps, items stretch to full bar height |
| Link (`.nav > a`) | 13px on a 19px line; padding 10px 10px 11px; #999999; `--bv-emboss-dark`; no underline |
| Link, hover | #FFFFFF over 150ms linear; background unchanged |
| Link, active (`.active` or `aria-current="page"`) | #FFFFFF on #222222, full bar height |
| Link, focus | Standard focus outline with `outline-offset: -2px`, so it stays inside the bar |
| Divider (`.divider-vertical`) | 1px wide, full bar height, margin 0 9px, #222222 with a 1px #333333 right border; hidden below 768px |
| Brand (`.brand`) | 20px at weight 200 on a 22px line; #FFFFFF; `--bv-emboss-dark`; no underline. Source order picks the side: after a `.nav`, pushed right with `margin-inline-start: auto` and padding 8px 0 10px 20px; first in the row, on the left with padding 8px 20px 10px 0. After a `.nav-end`, it sits flush against those links, and still ends the last row if it wraps |
| End links (`.nav-end`) | Optional, on a `.nav`. `flex-grow: 1` with `justify-content: flex-end`: the group takes the free space and sets its links at the far end, pushing it and everything after it to the right |
| Below 768px | Links wrap onto more rows; no hamburger; the brand ends the last row, or starts the first when it comes before the links |
| Sticky (`.navbar-sticky`) | From 768px: `position: sticky` at the top, z-index 1030 (2.0's fixed-navbar layer), same `--bv-shadow-navbar` as the static bar. The page gets a 58px `scroll-padding-top` (bar plus 18px), so anchor jumps and keyboard focus land below the bar (WCAG 2.4.11). Below 768px the bar scrolls away with the page, as in 2.0 |

## Accessibility

v0.1 targets WCAG 2.2 AA, with one documented exception inherited from the 2.0 look.

- **Text contrast:** at least 4.5:1, or 3:1 for text 24px and up or 18.66px bold. Every text color in *Color* lists its measured ratio.
- **Focus:** every interactive element shows a visible indicator through `:focus-visible`. `outline: none` is never used without a replacement.
- **Keyboard:** v0.1 uses only native elements and no JavaScript, so keyboard behavior is the browser's own.
- **Target size:** the smallest control is 28px tall (buttons, fields), above WCAG 2.2's 24×24px minimum. Navbar links are 40px tall.
- **Zoom and reflow:** type is in `rem`, so browser font settings apply. Pages reflow with no horizontal scrolling at 320px width and at 200% zoom, except inside `.table-scroll`.
- **Motion:** `prefers-reduced-motion` is honored as described under *Motion*.
- **State hooks:** `aria-current`, `aria-pressed`, `aria-disabled` and `aria-invalid` style components directly, so the accessible markup is also the styled markup. Error help is tied to its field with `aria-describedby`.
- **Color is never the only signal:** labels carry words, badges carry numbers, errors carry text.

### Exceptions

| Item | Issue | Mitigation |
| --- | --- | --- |
| Field borders | #CCCCCC on white is 1.6:1, under the 3:1 target for component boundaries | Every field has a visible label and an inset shadow; accepted for the 2.0 look |

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

- **Reference page:** `reference.html` shows every class, variant and state, including long text, empty cells and wrapped toolbars. It is the fixture for the visual, accessibility and coverage gates, and the library's documentation.
- **Visual matrix:** Chromium, Firefox and WebKit at 375px and 1280px widths; the full page plus hover, focus, pressed and disabled states; animations frozen.
- **Baselines change only on purpose:** after reviewing the diff, update with `--update-snapshots` in the same commit as the CSS change.
- **Manual check before each release:** tab through the reference page, and look at it in Safari on macOS and iOS.

## Distribution and versioning

Each app carries its own copy of the CSS as a versioned file it serves itself; there is no package, import path or shared URL.

- **Repository:** `bevel.css`, `reference.html`, `CHANGELOG.md`, the Stylelint config, the Playwright tests and the Go tests.
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
2. Add it, with every state, to `reference.html`.
3. Build it in the `bevel.components` layer, using `--bv-` variables only.
4. Pass every gate and approve the new baselines.
5. Add a changelog entry and bump the minor version.

## Open questions

- [x] **Brand:** decided: 2.0's standard white brand at weight 200, legible on the dark bar.
- [x] **Base size:** decided: 13px, as in 2.0.0.
- [x] **Field borders:** decided: keep #CCCCCC for the 2.0 look; recorded under Accessibility exceptions.
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
| Default (`.btn`) | #FFFFFF, #FFFFFF at 25%, #E6E6E6 | #FAFAFA / #E6E6E6 | #E6E6E6 | #333333, `--bv-emboss-light` | #CCCCCC, bottom #BBBBBB |
| Primary (`.btn-primary`) | #0088CC to #0055CC | #0074CC / #0055CC | #004099 | #FFFFFF, `--bv-emboss-dark` | rgba(0,0,0,.1), bottom rgba(0,0,0,.25) |
| Danger (`.btn-danger`) | #E0524E to #BD362F | #CF443E / #BD362F | #942A25 | #FFFFFF, `--bv-emboss-dark` | Same as primary |

- **Rest:** `--bv-shadow-button`; `display: inline-flex`, content centered, 5px gap between an icon and text; links lose their underline.
- **Hover:** the gradient slides up 15px (`background-position: 0 -15px`) over 100ms linear, revealing the hover fill along the bottom. Text is unchanged. Leaving slides it back down the same way; the hover fill stays beneath until the gradient covers it, so no strip of the rest fill shows.
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
| Label | Block; 13px / 18px; #333333; weight 400; margin-bottom 5px |
| Text fields: `input` (text, email, password, search, number, url, tel, date, time), `select` | Height 28px; padding 4px 6px; 13px / 18px; #555555 on #FFFFFF; 1px #CCCCCC border; radius 3px; `--bv-shadow-field`; width 100% up to 280px |
| `textarea` | Same box; min-height 82px (four lines); `resize: vertical` |
| `select` | Same box with padding 3px 6px; native arrow kept |
| Width modifiers | `.input-block` removes the 280px cap; `.input-small` caps at 90px |
| Placeholder | `--bv-color-muted` |
| Focus | Border `--bv-color-focus`; `--bv-shadow-field-focus`; no outline; border and shadow transition over 200ms linear |
| Disabled and read-only | Background #F5F5F5; border #DDDDDD; `cursor: not-allowed` when disabled |
| Checkbox and radio (`label.checkbox`, `label.radio`) | Inline-flex, 6px gap, control aligned to the first text line; `accent-color` = `--bv-color-link`; 5px between stacked options |
| Field group (`.control-group`) | Label, field and help; margin-bottom 18px |
| Help (`.help-block`) | Block; margin-top 5px; 13px / 18px; `--bv-color-muted` |
| Error (`.control-group.error`, or a field with `aria-invalid="true"`) | Label and help #B94A48; field text #B94A48 and border #EE5F5B; on focus, border #E9322D and `--bv-shadow-field-error-focus` |
| Actions bar (`.form-actions`) | Padding 17px 20px 18px; margin 18px 0; background #F5F5F5; 1px #DDDDDD top border; buttons in a row with a 5px gap |

### Tables

One table style with three modifiers; wide tables scroll inside their own box on small screens.

```html
<div class="table-scroll">
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
| Cells (`th`, `td`) | Padding 8px; 13px / 18px; left-aligned; `vertical-align: middle`; 1px #DDDDDD top border; `font-variant-numeric: tabular-nums` |
| Header cells | Weight 700; `vertical-align: bottom`; no top border on the first row |
| Row hover | Body cells turn #F5F5F5 over 100ms linear |
| `.table-striped` | Odd body rows #F9F9F9; hover still wins |
| `.table-bordered` | 1px #DDDDDD outer border and a 1px left border on every cell after the first column; outer corners 4px |
| `.table-condensed` | Cell padding 4px 5px |
| `.table-scroll` | Wrapper with `overflow-x: auto`; the table keeps its natural width and scrolls inside it |

Cells are vertically centered rather than 2.0's top alignment, so small buttons in an actions column line up with the text.

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
| Label (`.label`) | Inline-block; padding 1px 4px 2px; 11px / 13px bold; radius 3px; `vertical-align: middle`; never wraps; #676767 on #E9E9E9 with a 1px #D4D4D4 inset edge (`box-shadow`, so the chip keeps 2.0's size); `--bv-emboss-soft` |
| Badge (`.badge`) | As a label, with padding 1px 9px 2px, 12px / 14px and radius 9px |
| Variants | `-success`, `-warning`, `-important`, `-info` and `-inverse`, applied as `.label-success`, `.badge-success` and so on; colors in *Color → Labels and badges*. Inverse keeps white text with `--bv-emboss-dark` |
| Meaning | The word or number always carries the meaning; color only reinforces it |

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
| Box (`.hero-unit`) | Padding 60px; margin-bottom 30px; background #F5F5F5; radius 6px; no border or shadow |
| Heading (`.hero-unit h1`) | 60px on a 60px line; weight 700; letter-spacing -1px; no margin |
| Text (`.hero-unit p`) | 18px on a 27px line at weight 300, not 2.0's 200 (see *Typography*); #333333, 11.6:1 on #F5F5F5; the usual 9px paragraph margin |
| Actions | A button in its own paragraph; 2.0 used `.btn-primary.btn-large` |
| Grid (`.hero-unit-grid`) | Optional. White fill ruled with 1px `--bv-color-grid` lines every 18px both ways, every fifth vertical line darker where two layers overlap, as in the 2.0 docs' page background; a 1px `--bv-color-border-soft` inset edge, so the box keeps its size. 2.0's hero had no grid |
| Below 768px | Padding 20px; heading 36px on a 40px line with no letter-spacing, the page header title's size, so it fits a 320px screen without horizontal scrolling. 2.0 had no small-screen hero |

### Utilities

- `.muted`: text in `--bv-color-muted`.
- `.text-right`: `text-align: end`, for numeric columns and right-aligned actions.
- `.table-scroll`: see *Tables*.
