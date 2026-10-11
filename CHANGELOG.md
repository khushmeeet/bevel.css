# Changelog

Each release ships as `bevel-<version>.css`. Before 1.0, breaking changes ship in minor versions and are flagged here.

## [Unreleased]

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
