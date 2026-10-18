# Changelog

Each release ships as `bevel-<version>.css`. Before 1.0, breaking changes ship in minor versions and are flagged here.

## [0.6.0] - 2026-10-18

Dark mode is lighter, the navbar stands apart from the page in light and dark, and a page can pick its scheme.

### Added

- `data-theme="light"` or `data-theme="dark"` on `<html>` forces that scheme over the system's setting, native parts such as select arrows included. Without it, nothing changes.
- A `<button>` in a `.nav` looks like a link, for an action in the bar. Its content is centered, so an icon on its own sits in the middle of the bar. The demo and the site use one, with a small script of their own, to switch between light and dark: a moon in light and a sun in dark, showing what a click does.

### Changed

- The dark page is #1C1F24 instead of #15171A, and every dark grey above it moves up with it: surfaces, stripes, fields, tracks, borders, buttons, code, and the label and alert tints. Table stripes and grey surfaces are a step further from the page so they still show. Every text pair stays at 4.5:1 or more.
- The dark navbar is a graphite bar a step lighter than the page, #2F3339 to #21252A, with a dark line and a shadow under it, instead of a near-black bar the same shade as the page. The current link's sunken tab is #15171B, so it shows against the bar.
- The navbar sits higher off the page in both schemes: under its top highlight, `--bv-shadow-navbar` now has a crisp 1px line and a 6px shadow below the bar, in place of a 3px blur.
- On a `.grid-paper` page, `.hero-unit-grid` drops its own grid, edge and shadow and sits on the page's grid paper, so its edge no longer shows where the two grids don't line up.

## [0.5.0] - 2026-10-18

Fixes for forced colors and three layout edge cases.

### Changed

- An `h2` gets the dotted leader only when it holds a `<small>`, as 0.3.0 documented. A plain `h2` also drew one, to the end of the line, and as a flex row it ignored `text-align`, so it couldn't be centred in `.well-empty` or right-aligned with `.text-right`. It is ordinary block text again; give it a `<small>`, for a count or a date, to keep the leader.

### Fixed

- Forced colors, such as Windows High Contrast: progress bars were invisible, with the bar and its track both painted the system background. The bar now takes the system highlight color and the track gets an edge. Pressed and latched buttons, the current navbar link and the current page in pagination take the highlight colors too, since the fill and shadows that marked them are dropped, and pages you can't go to read as disabled text.
- The current page in a pagination strip shows its whole edge. The next page's border covered its end edge. A focused page still sits over both.
- Checkboxes and radios in `.checkbox` and `.radio` are 13px in every browser, so they centre on the first line of text. Firefox drew them at 14px and WebKit at 12px, half a pixel off.

## [0.4.0] - 2026-10-16

Button hover is back to 0.2.0's strength.

### Changed

- Hovering a button slides its gloss up by half the button's height, as 0.2.0 did, so the light top leaves and the darker lower part fills the face. 0.3.0 only changed the fill under the gloss, which barely showed on a default button. The gloss is now drawn half again as tall as the button, with its stops at 2/3 scale, and `--bv-sheen` and `--bv-sheen-accent` changed to match; an app that overrides either needs the same. Primary and danger hover fills are a step lighter, #0A5EB5 and #B6322A, since the slide darkens them too; the default hover fill matches the rest fill in light, as 2.0's did, and is #30353B in dark.

## [0.3.0] - 2026-10-16

A new look on 2.0's frame: Helvetica Neue at 14px, neutral greys and one blue, controls still lit from above, and a dark mode. Class names and markup are unchanged, but every component looks different and most color and depth tokens are new or renamed, so check each app after upgrading. An app that overrides a removed token loses that override without warning.

### Added

- Dark mode: the colors and shadows have dark values under `prefers-color-scheme: dark`, and `color-scheme: light dark` turns native parts such as select arrows and scrollbars dark with them. Shadows are deeper and text emboss is dropped.
- Grid paper, as in the 2.0 docs: add `.grid-paper` to `<body>` for a band of lines every 20px under the navbar, every fifth vertical one darker, fading out so it sits behind the page's opening and never its text. It's opt in, for the page that opens an app; the rest stay plain. Set `--bv-color-grid` to `transparent` to turn it off everywhere.
- Section labels: `h2` is set in small tracked capitals with 36px above it. When it holds only text and a `<small>`, a dotted leader runs to the `<small>` at the end of the line, for a count or a date.
- Tokens: `--bv-color-field`, `--bv-color-track`, `--bv-color-on-accent`, `--bv-color-primary-hover`, `--bv-color-danger-hover`, `--bv-color-button` with `-hover`, `-active` and `-border`, `--bv-color-navbar-focus`, `--bv-color-etch`, `--bv-progress-<variant>`, `--bv-sheen`, `--bv-sheen-accent`, `--bv-shadow-button-accent`, `--bv-shadow-pressed`, `--bv-shadow-raised`, `--bv-shadow-focus`, `--bv-shadow-focus-error`, `--bv-shadow-navbar-current`, `--bv-shadow-track`, `--bv-shadow-label`, `--bv-emboss` and `--bv-glow`.

### Changed

- **Breaking:** text is 14px on a 20px line, up from 2.0's 13px on 18px, still in Helvetica Neue. Buttons and fields are 30px tall instead of 28px; small buttons stay that height and large ones are 40px. Headings are weight 600, and `h3` to `h6` are 16, 14, 13 and 12px, with `h6` in capitals. The lead and hero text are 18px on a 28px line at the regular weight, and the hero heading is 44px from 768px up instead of 60px.
- **Breaking:** the palette is neutral greys with a cool cast and one blue, #0B65C2, for links, primary buttons and focus, with red #C4362E for danger. Field borders are #8C949E, 3:1 on white, so the field border contrast exception is gone. Labels, badges and alerts have new tints with text at 5.5:1 or more on them; labels and badges trade their colored edge and emboss for a faint neutral edge.
- Buttons have 2.0's gloss again, laid over a flat fill: a default button is white over its top quarter and fades to grey at the bottom, and a primary or danger button is lighter at the top and darker at the bottom. Each has a highlight along its top edge, a slightly darker bottom border, a soft shadow and embossed text. Hover darkens the fill under the gloss instead of sliding 2.0's gradient up. Pressed and latched buttons lose the gloss and sink.
- The navbar is a graphite bar lit from above, with a shadow on the page. The current link sinks into the bar and its text turns white and glows, 3:1 brighter than the other links, in place of the blue bar along its bottom; `--bv-color-navbar-current` is now the sunken tab's fill. The brand is in bold tracked capitals, the divider is etched, and focus inside the bar is a lighter blue that shows on it.
- A focused field gets a blue border and a soft 3px glow, red in an error state. The focus ring elsewhere sits 2px outside its element instead of 1px.
- Table column heads and stat labels are 12px muted capitals. Labels and badges are 12px at weight 500.
- Progress tracks are 8px tall and recessed; bars have the colored buttons' gloss, with stripes 16px apart.
- The current page in a pagination strip is filled blue with white text, still sunk in.
- Inline code is in the text color on a grey tint, with no border, and code blocks lose their border. The monospace stack is the system's own where the browser offers it, then Menlo, Cascadia Mono, Consolas and Liberation Mono.
- `.hero-unit-grid` uses the same 20px grid on the page color, with a faint edge and a soft shadow. Wells have a 6px radius, as the hero unit does.
- `h1` takes -0.015em letter-spacing, closing up bold Helvetica at display sizes; subtitles reset it. Link underlines sit 0.2em below the text, clear of descenders.
- The hero heading has 9px under it instead of touching the text below, and the hero's last child drops its bottom margin, as a well's does, so the space under its buttons matches the space over its heading.

### Removed

- **Breaking:** the tokens for 2.0's gradients and edges: `--bv-color-input-text`, `--bv-color-border-bottom`, `--bv-color-primary-top` and `-bottom`, `--bv-color-danger-top` and `-bottom`, `--bv-color-focus-glow`, `--bv-color-navbar-bottom`, `--bv-color-error-focus`, `--bv-color-error-glow`, `--bv-color-code-text`, `--bv-color-code-border`, `--bv-label-<variant>-border`, `--bv-progress-<variant>-top` and `-bottom`, `--bv-radius-xl`, `--bv-shadow-button-pressed`, `--bv-shadow-field-focus`, `--bv-shadow-field-error-focus`, `--bv-shadow-pagination`, `--bv-shadow-progress`, `--bv-shadow-progress-bar`, `--bv-emboss-light` and `--bv-emboss-soft`. Their nearest replacements are under Added.

### Fixed

- Heading subtitles are their documented size again: 18px in `h1`, 14px in `h3`, and 13px at the end of an `h2`'s leader. The rule that keeps `small` at the surrounding size came after them at the same zero specificity, so every subtitle rendered at its heading's full size, and page titles with one wrapped onto extra lines on a phone. Subtitles now have a line height of 1, as in 2.3, so a heading with one is exactly as tall as one without.
- Right-aligned table cells (`.text-right`) don't wrap. On a narrow screen an amount such as −$101.35 could break between its sign and its digits.

## [0.2.0] - 2026-10-11

Everything the money demo had to work around or would have been better with, apart from the file input.

### Added

- Input add-ons: `.input-prepend` and `.input-append` with `.add-on` put a unit or fixed part of the value, such as `$`, `MB` or `git@`, beside a field. The add-on's place in the markup picks its side, it takes the error state's tint, and the group shrinks the field rather than widen the page.
- Pagination: `.pagination` joins page links into one 36px strip, with hover, focus, a current page that sinks in like a pressed button (`aria-current="page"` or `.active`) and pages you can't go to (a `span`, `aria-disabled` or `.disabled`). It wraps on a narrow screen.
- Wells and empty states: `.well` is 2.0's inset panel, and its last block drops its bottom margin. `.well-empty` centers a muted message and an action, for a list with nothing in it.
- Progress bars: `.progress` with a `.bar` set to a width inline, in default blue, `.progress-success`, `.progress-warning` and `.progress-danger`, plus `.progress-striped` and the animated `.progress.active`. The blue and red bars use the primary and danger buttons' gradients, with green and amber at the same depth, so every bar keeps 3:1 against its track. Reduced motion stops the stripes.
- Stats: `.stats` on a `<dl>` sets each `<dd>` as a 30px figure under a muted label, with a `<small>` for its unit. Add `.row` to set the figures side by side, and `.well` on each pair to put it in a panel.
- A documented pattern for confirming before deleting: a plain link to a confirmation page that says what will go and holds the one red button. No CSS; see Patterns in `reference.html` and `demo/erase.html`.
- `.visually-hidden`, for text only screen readers get: a field's label, or the words for an icon-only button.
- Tokens: `--bv-space-7` (36px), `--bv-progress-<variant>-top` and `-bottom`, and `--bv-shadow-pagination`, `--bv-shadow-well`, `--bv-shadow-progress` and `--bv-shadow-progress-bar`.

### Changed

- Headings get space around them: 9px below, and 18px above unless they start their container. A heading no longer sits on the form label or table under it. Headings in `.page-header` and `.hero-unit` keep no margin. This changes the spacing of every page with headings in its content.
- `.row` ends with an 18px margin, and each column, and the last block in it, drops its own, so the space after a row is always 18px. Rows whose columns ended in text or a paragraph had 0 or 9px after them and now have 18px. On a narrow screen, stacked columns that ended in a table or form sit 18px closer together.

## [0.1.0] - 2026-10-11

First release: enough for a page, a nav, text, a form, a table and feedback.

### Added

- Tokens for color, type, spacing, radius, shadow, emboss and motion, all prefixed `--bv-`.
- Base typography: headings with subtitles, `.lead`, paragraphs capped at about 70 characters a line, links with a faint underline, `small`, `code`, `pre` and the etched `hr`. Long words break instead of widening the page, and images and video shrink to fit.
- Layout: `.container`, `.row` with `.cols-2`, `.cols-3` and `.cols-4`, `.section` and `.page-header`.
- Navbar: dark top bar with links, an active state marked by a bottom bar, vertical divider and brand; the brand sits left or right by its place in the markup, `.nav-end` pushes a group of links to the right, and `.navbar-sticky` keeps the bar at the top while the page scrolls. `.skip-link` lets keyboard users jump past it.
- Buttons: default, primary and danger; small and large; pressed and disabled; `.btn-group` and `.btn-toolbar`.
- Forms, stacked: labels, text fields (including date, time, datetime-local, month and week), select and list boxes, textarea, checkbox, radio, `fieldset` and `legend`, help text, error state and `.form-actions`.
- Tables: `.table` with striped, bordered and condensed modifiers, and row hover.
- Alerts: warning, error, success and info in pastel tints, plus `.alert-block`.
- Labels and badges: default, success, warning, important, info and inverse, as pastel chips.
- Hero unit: `.hero-unit`, an opt-in large callout to open a page, with a smaller heading and inset below 768px; `.hero-unit-grid` swaps the grey fill for the 2.0 docs' 18px grid on white.
- Utilities: `.muted`, `.text-right` and `.table-scroll`.
