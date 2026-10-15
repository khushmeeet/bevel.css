# Gaps found building the demos

What each demo app needed that bevel.css didn't have when it was built, newest first.

## shelf, a bookmarking app

Oct 15, 2026

What `demo/shelf/` (shelf, a made-up bookmarking app after Anybox) needed and v0.2 doesn't have. Unlike money, shelf has a stylesheet of its own, `demo/shelf/shelf.css`, linked after bevel.css the way a real app's would be. Each block in it is one gap below, written with `--bv-` tokens only, so it can move into bevel.css as is. "Candidate" and "Never" refer to the spec's scope table; "New" means it lists neither.

### Filled in by shelf.css

| # | Gap | Where shelf needs it | Spec | Size |
| --- | --- | --- | --- | --- |
| 1 | Sidebar layout | `library.html`: collections, smart collections and tags sit in a 220px column beside the links. `.row` only makes equal columns, so there's no way to set a fixed column beside one that takes the rest. Below 768px the sidebar stacks above the list and fills a phone's first screen, much as a phone app opens on its sidebar; a library version has to decide whether that's right or the sidebar goes after the page. | New. 2.0 did this with span3 and span9; the 12-column grid is Never | Small |
| 2 | Nav list | `library.html`: Inbox, All links, each collection and each tag, with a count at the end and the current one filled blue. `.nav` only styles links on the dark navbar. This is 2.0's `.nav-list` in a `.well`, with 24px rows for WCAG 2.5.8. Any app with more sections than fit in the navbar wants it. | New; close to the Tabs and pills candidate | Medium |
| 3 | Media object | Every list of links: a site icon beside a title and address that wrap clear of the icon. Two flex rules. 2.0 added it as `.media` in 2.3. | New | Small |
| 4 | Cards | `index.html`: pinned links as tiles whose link covers the whole tile. `link.html` and `add.html`: the page preview with its caption. 2.0's `.thumbnail`, a raised white box; `.well` is the only panel and it's sunk in. The spec lists thumbnails under Never as a marketing-site feature, but a bookmarking app, or anything that shows photos or files, shows most things this way. | Never; worth moving to Candidate | Medium |
| 5 | A button joined to a field | Search and quick save on `index.html`, Move on `link.html`, Add on `collections.html`. `.input-append` lines a `.btn` up with the field and squares its corners, but only `.add-on` gives up a side border, so field and button meet in a 2px seam. One rule fixes it: the button overlaps the field's border by 1px. | Fix to v0.2's input add-ons | Small |
| 6 | A list of labels | `collections.html`: the 20 most used tags. Labels inline in a paragraph wrap with their rows touching, and the paragraph's 56ch cap stops them halfway across the page. A linked label is 16px tall, so axe's `target-size` check (WCAG 2.5.8) fails until rows are at least 8px apart; shelf uses 9px. | New | Small |

### Worked around without CSS

| # | Gap | Where the demo works around it | Spec | Size |
| --- | --- | --- | --- | --- |
| 7 | Labels as links | Every tag links to its list. `<a class="label">` keeps the link's faint underline, and its only hover is that underline going solid; 2.x gave linked labels and badges their own hover. Inline in text or a table cell they pass `target-size` under its inline exception; anywhere else see 6. | New | Small |
| 8 | Breadcrumbs | `link.html`: "Library / Reading" is a muted paragraph of links inside a `<nav>`. | Candidate | Small |
| 9 | Search in the navbar | Search is the main way into 248 links, but it lives in a toolbar on Home and Library instead of in the bar on every page. 2.0 had `.navbar-search`. | New | Small |

### Library fixes

- **`figure` keeps the browser's margins.** The reset clears headings, paragraphs and lists, but a `<figure>` still has 40px on each side and 1em above, so shelf.css zeroes them on its cards. `blockquote` has the same margins.
- **App CSS in a `.row` keeps its bottom margin.** bevel.css trims the margin of whatever sits in a row, but in `bevel.utilities`, and an app's CSS is outside any layer, so it wins: a card with a bottom margin, put in a row, adds a second line under it. shelf.css trims its own (`.row > [data-card]`). No CSS can fix this from inside a layer; the README's advice to write app CSS outside layers should say so.

### Fine as is

- **Tables as the list view:** cells with two lines, striping, row hover and `.table-scroll` on a phone covered Anybox's list. `<th scope="row">` rows did the link's details, so the missing description list wasn't missed.
- **Everything v0.2 added:** badges as counts, labels for Unread, Broken and Inbox, a pressed `aria-pressed` Starred button, `.btn-group` filters, pagination with an ellipsis, `.stats`, a `.progress` reading goal, `.well-empty` for an empty Trash, and the confirm-before-deleting pattern on `delete.html`, with a checkbox for what else goes.

### Suggested order

1. Item 5 and the two library fixes: small, and they correct what v0.2 already ships.
2. Sidebar layout, nav list and media object together, since an app with many sections needs all three at once.
3. Cards, after deciding to move thumbnails out of Never.
4. The label list and linked labels, with the target size settled for both.

## money, a finance app

Oct 11, 2026

What `demo/` (money, a made-up finance app) needed and v0.1 doesn't have. Ranked by how much each one got in the way. "Candidate" means the spec's scope table already lists it; "New" means it doesn't.

### Worked around

| # | Gap | Where the demo works around it | Spec | Size |
| --- | --- | --- | --- | --- |
| 1 | File input | `demo/accounts.html`: importing a statement uses a paste-in textarea, because `input[type="file"]` isn't styled. Uploads are routine in server-rendered apps: statements, backups, images. | New | Small |
| 2 | Input prefix and suffix | `demo/budgets.html`: the amount field puts "($)" in its label instead of a `$` before the field. Any field with a unit wants this: dollars, MB, ports. | Candidate (input add-ons) | Small |
| 3 | Spacing between stacked blocks | Headings have no margin and `.row` has no bottom margin, so each gap depends on what follows. `demo/settings.html`: the "Money" heading sits right on the "Currency" label. `demo/index.html`: the figures row only has room below it because the numbers use `.lead`. `.table` and `.alert` already end with 18px; `.row` and headings in content should too, or each app invents its own fix. | New | Small |
| 4 | Text only screen readers see | `demo/transactions.html`: the search box has no visible label, so it uses `aria-label`. Icon-only buttons, unlabelled action columns and count badges need a `.visually-hidden` utility. One rule, and it fits "a handful of utilities". | New | Small |
| 5 | Pagination | `demo/transactions.html`: all 28 transactions fit on one page; a few months of real data won't. | Candidate (breadcrumbs and pagination) | Medium |
| 6 | Empty states | Every list in the demo has a case with nothing in it, such as "Needs category" once everything has one, or a new install with no accounts. None are built, because there's nothing to build them with. | Candidate (wells and empty states) | Medium |

### Would make it clearly better

| # | Gap | Where it would help | Spec | Size |
| --- | --- | --- | --- | --- |
| 7 | Progress bars | `demo/budgets.html`: the "Used" column is a percentage where a bar is the obvious display. hearth wants the same for disk space and backups. | Candidate | Medium |
| 8 | A big figure with a small label | `demo/index.html`: the overview figures are a `<dl>` with `.lead` on each number, which works by accident. Most apps' home pages want this: balance, uptime, disk use. | New; could ship with wells | Small |
| 9 | Confirming before deleting | `demo/settings.html`: "Erase all data" deletes as soon as it's clicked. `<dialog>` needs JavaScript to open, so for these apps a separate confirmation page is the realistic answer. That needs no new CSS, just a documented pattern. | Candidate (modal) | Docs only |

### Library fix

`.alert-heading` gets its size from being an `<h4>`, so an alert after a page's `<h1>` skips heading levels (axe `heading-order`, a best-practice rule, flags `demo/budgets.html`; `reference.html` shows the same markup). If `.alert-heading` set its own 14px/18px size, an alert could use whatever heading level fits the page and look the same.

### Fine as is

- **Tabs and pills:** a `.btn-group` of links marked with `aria-current` worked for both the month switcher and the transaction filters. Not a priority.
- **Tables, labels, form error states, the navbar with `.nav-end`:** all did what the demo needed without workarounds.

### Suggested order

1. Items 1–4 and the `.alert-heading` fix for v0.2. Each is a small CSS change, and together they remove every workaround in the demo.
2. Pagination and empty states next, since every list grows.
3. Progress bars and the figure display after that.
