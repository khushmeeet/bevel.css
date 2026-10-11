# Changelog

Each release ships as `bevel-<version>.css`. Before 1.0, breaking changes ship in minor versions and are flagged here.

## [0.1.0] - Unreleased

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
