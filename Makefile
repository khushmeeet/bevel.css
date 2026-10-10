# `make test` runs every gate. `make release` runs them, then writes
# dist/bevel-<version>.css with the version from the top of CHANGELOG.md.

VERSION := $(shell sed -n 's/^\#\# \[\([0-9][0-9.]*\)\].*/\1/p' CHANGELOG.md | head -n 1)

.PHONY: test lint test-go test-browser update-snapshots release clean

test: lint test-go test-browser

node_modules: package.json package-lock.json
	npm ci
	npx playwright install chromium firefox webkit
	touch node_modules

# Baseline and house rules.
lint: node_modules
	npx stylelint bevel.css

# Size, tokens and coverage.
test-go:
	go test .

# Visual and accessibility.
test-browser: node_modules
	npx playwright test

# Review the diffs first, then commit the new baselines with the CSS change.
update-snapshots: node_modules
	npx playwright test --update-snapshots

release: test
	@test -n "$(VERSION)" || { echo "No version found in CHANGELOG.md"; exit 1; }
	mkdir -p dist
	{ printf '/*! bevel.css %s */\n' "$(VERSION)"; cat bevel.css; } > dist/bevel-$(VERSION).css
	@echo "Wrote dist/bevel-$(VERSION).css"

clean:
	rm -rf dist test-results playwright-report
