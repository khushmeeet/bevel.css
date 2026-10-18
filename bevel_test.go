// Gates that read bevel.css and the docs pages directly: size, tokens,
// coverage and releases. The lint, visual and accessibility gates live in Stylelint and
// Playwright; `make test` runs them all.
package bevel

import (
	"bytes"
	"compress/gzip"
	"os"
	"regexp"
	"slices"
	"strings"
	"testing"
)

const maxGzipBytes = 20 * 1024

var (
	commentRE   = regexp.MustCompile(`(?s)/\*.*?\*/`)
	attributeRE = regexp.MustCompile(`\[[^\]]*\]`)
	classRE     = regexp.MustCompile(`\.(-?[_a-zA-Z][_a-zA-Z0-9-]*)`)
	tokenDefRE  = regexp.MustCompile(`(--bv-[a-z0-9-]+)\s*:`)
	tokenUseRE  = regexp.MustCompile(`var\(\s*(--bv-[a-z0-9-]+)`)
	htmlClassRE = regexp.MustCompile(`(?s)<[a-zA-Z][^>]*?\sclass\s*=\s*"([^"]*)"`)

	releaseRE      = regexp.MustCompile(`(?m)^## \[(\d+\.\d+\.\d+)\]`)
	releaseIDRE    = regexp.MustCompile(`<h2 id="v(\d+\.\d+\.\d+)"`)
	namedReleaseRE = regexp.MustCompile(`(?:bevel-|bevel\.css |download/v)(\d+\.\d+\.\d+)`)
)

// The docs pages. Each may use only classes bevel.css defines: their
// page-only styles, in site/docs.css, hang off data attributes instead.
var pages = []string{"site/index.html", "site/reference.html", "site/changelog.html", "site/source.html"}

// Pages may use these without bevel.css defining them.
func allowedPageClass(class string) bool {
	return strings.HasPrefix(class, "js-") // JavaScript hooks
}

func TestSize(t *testing.T) {
	css := read(t, "bevel.css")

	var buf bytes.Buffer
	zw := gzip.NewWriter(&buf)
	zw.Write([]byte(css))
	zw.Close()

	t.Logf("bevel.css: %d bytes, %d bytes gzipped (limit %d)", len(css), buf.Len(), maxGzipBytes)
	if buf.Len() > maxGzipBytes {
		t.Errorf("bevel.css is %d bytes gzipped, over the %d byte limit", buf.Len(), maxGzipBytes)
	}
}

func TestTokens(t *testing.T) {
	css := commentRE.ReplaceAllString(read(t, "bevel.css"), "")

	defined := matches(tokenDefRE, css)
	used := matches(tokenUseRE, css)

	for _, name := range used {
		if !slices.Contains(defined, name) {
			t.Errorf("%s is used but never defined", name)
		}
	}
	for _, name := range defined {
		if !slices.Contains(used, name) {
			t.Errorf("%s is defined but never used", name)
		}
	}
}

func TestCoverage(t *testing.T) {
	cssClasses := classesInCSS(read(t, "bevel.css"))
	referenceClasses := classesInHTML(read(t, "site/reference.html"))

	if len(cssClasses) == 0 {
		t.Fatal("found no classes in bevel.css")
	}
	for _, class := range cssClasses {
		if !slices.Contains(referenceClasses, class) {
			t.Errorf(".%s is in bevel.css but missing from site/reference.html", class)
		}
	}
	for _, page := range pages {
		for _, class := range classesInHTML(read(t, page)) {
			if !slices.Contains(cssClasses, class) && !allowedPageClass(class) {
				t.Errorf(".%s is used in %s but bevel.css doesn't define it", class, page)
			}
		}
	}
}

// data-theme="dark" forces the same dark values the system setting brings
// in, so the two copies of the dark tokens can't drift apart.
func TestForcedDark(t *testing.T) {
	css := read(t, "bevel.css")
	block := func(selector string) []string {
		start := strings.Index(css, selector+" {")
		if start < 0 {
			t.Fatalf("no %s block in bevel.css", selector)
		}
		body := css[start+len(selector)+2:]
		body = body[:strings.Index(body, "}")]
		var lines []string
		for _, line := range strings.Split(body, "\n") {
			if line = strings.TrimSpace(line); line != "" {
				lines = append(lines, line)
			}
		}
		return lines
	}
	system := block(`:where(:root:not([data-theme="light"]))`)
	forced := block(`:where(:root[data-theme="dark"])`)
	if len(system) < 50 {
		t.Fatalf("the system dark block has only %d declarations", len(system))
	}
	if !slices.Equal(system, forced) {
		t.Errorf("the data-theme=\"dark\" block differs from the prefers-color-scheme: dark block")
	}
}

// The changelog page has a section for every release in CHANGELOG.md, in the
// same order, and every page that names a release names the newest one, so a
// release can't leave the docs behind.
func TestReleases(t *testing.T) {
	releases := allMatches(releaseRE, read(t, "CHANGELOG.md"))
	if len(releases) == 0 {
		t.Fatal("found no releases in CHANGELOG.md")
	}
	if onPage := allMatches(releaseIDRE, read(t, "site/changelog.html")); !slices.Equal(onPage, releases) {
		t.Errorf("site/changelog.html has releases %v; CHANGELOG.md has %v", onPage, releases)
	}

	newest := releases[0]
	for _, name := range append([]string{"README.md"}, pages...) {
		for _, release := range unique(allMatches(namedReleaseRE, read(t, name))) {
			if release != newest {
				t.Errorf("%s names release %s; the newest is %s", name, release, newest)
			}
		}
	}
}

// classesInCSS returns every class named in a selector of a style rule.
func classesInCSS(css string) []string {
	var classes []string
	for _, selector := range selectors(css) {
		selector = attributeRE.ReplaceAllString(selector, "")
		classes = append(classes, matches(classRE, selector)...)
	}
	return unique(classes)
}

// selectors returns the selector list of every style rule, skipping at-rule
// preludes such as "@layer bevel.base" and every declaration block. Style
// rules hold only declarations: bevel.css doesn't use native nesting.
func selectors(css string) []string {
	css = commentRE.ReplaceAllString(css, "")

	var out []string
	start := 0
	for i := 0; i < len(css); i++ {
		switch css[i] {
		case '{':
			prelude := strings.TrimSpace(css[start:i])
			if !strings.HasPrefix(prelude, "@") {
				out = append(out, prelude)
				i += strings.IndexByte(css[i:], '}')
			}
			start = i + 1
		case '}', ';':
			start = i + 1
		}
	}
	return out
}

// classesInHTML returns every class in a class attribute of a real tag, so
// escaped markup in code samples doesn't count.
func classesInHTML(html string) []string {
	var classes []string
	for _, m := range htmlClassRE.FindAllStringSubmatch(html, -1) {
		classes = append(classes, strings.Fields(m[1])...)
	}
	return unique(classes)
}

// matches returns the first group of every match, sorted, without repeats.
func matches(re *regexp.Regexp, s string) []string {
	return unique(allMatches(re, s))
}

// allMatches returns the first group of every match, in order.
func allMatches(re *regexp.Regexp, s string) []string {
	var out []string
	for _, m := range re.FindAllStringSubmatch(s, -1) {
		out = append(out, m[1])
	}
	return out
}

func unique(s []string) []string {
	slices.Sort(s)
	return slices.Compact(s)
}

func read(t *testing.T, name string) string {
	t.Helper()
	b, err := os.ReadFile(name)
	if err != nil {
		t.Fatal(err)
	}
	return string(b)
}
