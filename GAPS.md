# Gaps found building the demo

Oct 11, 2026

What `demo/` (money, a made-up finance app) needed and v0.1 doesn't have. Ranked by how much each one got in the way. "Candidate" means the spec's scope table already lists it; "New" means it doesn't.

## Worked around

| # | Gap | Where the demo works around it | Spec | Size |
| --- | --- | --- | --- | --- |
| 1 | File input | `demo/accounts.html`: importing a statement uses a paste-in textarea, because `input[type="file"]` isn't styled. Uploads are routine in server-rendered apps: statements, backups, images. | New | Small |
| 2 | Input prefix and suffix | `demo/budgets.html`: the amount field puts "($)" in its label instead of a `$` before the field. Any field with a unit wants this: dollars, MB, ports. | Candidate (input add-ons) | Small |
| 3 | Spacing between stacked blocks | Headings have no margin and `.row` has no bottom margin, so each gap depends on what follows. `demo/settings.html`: the "Money" heading sits right on the "Currency" label. `demo/index.html`: the figures row only has room below it because the numbers use `.lead`. `.table` and `.alert` already end with 18px; `.row` and headings in content should too, or each app invents its own fix. | New | Small |
| 4 | Text only screen readers see | `demo/transactions.html`: the search box has no visible label, so it uses `aria-label`. Icon-only buttons, unlabelled action columns and count badges need a `.visually-hidden` utility. One rule, and it fits "a handful of utilities". | New | Small |
| 5 | Pagination | `demo/transactions.html`: all 28 transactions fit on one page; a few months of real data won't. | Candidate (breadcrumbs and pagination) | Medium |
| 6 | Empty states | Every list in the demo has a case with nothing in it, such as "Needs category" once everything has one, or a new install with no accounts. None are built, because there's nothing to build them with. | Candidate (wells and empty states) | Medium |

## Would make it clearly better

| # | Gap | Where it would help | Spec | Size |
| --- | --- | --- | --- | --- |
| 7 | Progress bars | `demo/budgets.html`: the "Used" column is a percentage where a bar is the obvious display. hearth wants the same for disk space and backups. | Candidate | Medium |
| 8 | A big figure with a small label | `demo/index.html`: the overview figures are a `<dl>` with `.lead` on each number, which works by accident. Most apps' home pages want this: balance, uptime, disk use. | New; could ship with wells | Small |
| 9 | Confirming before deleting | `demo/settings.html`: "Erase all data" deletes as soon as it's clicked. `<dialog>` needs JavaScript to open, so for these apps a separate confirmation page is the realistic answer. That needs no new CSS, just a documented pattern. | Candidate (modal) | Docs only |

## Library fix

`.alert-heading` gets its size from being an `<h4>`, so an alert after a page's `<h1>` skips heading levels (axe `heading-order`, a best-practice rule, flags `demo/budgets.html`; `reference.html` shows the same markup). If `.alert-heading` set its own 14px/18px size, an alert could use whatever heading level fits the page and look the same.

## Fine as is

- **Tabs and pills:** a `.btn-group` of links marked with `aria-current` worked for both the month switcher and the transaction filters. Not a priority.
- **Tables, labels, form error states, the navbar with `.nav-end`:** all did what the demo needed without workarounds.

## Suggested order

1. Items 1–4 and the `.alert-heading` fix for v0.2. Each is a small CSS change, and together they remove every workaround in the demo.
2. Pagination and empty states next, since every list grows.
3. Progress bars and the figure display after that.
