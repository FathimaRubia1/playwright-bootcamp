# Playwright Bootcamp

End-to-end browser automation tests using Playwright and JavaScript CommonJS.

## Prerequisites

- Node.js 18+
- npm

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

**Headless (default — fast, for CI):**

```bash
npx playwright test
```

**Headed (watch the browser):**

```bash
npx playwright test --headed
```

**Run a specific test file:**

```bash
npx playwright test tests/todo.spec.js --headed
```

## Viewing the HTML Report

After a test run, open the report with:

```bash
npx playwright show-report
```

## Tech Stack

- [Playwright](https://playwright.dev/) — browser automation & test runner
- JavaScript (CommonJS — `require` / `module.exports`)

## Project Structure

```
tests/           # Test spec files (*.spec.js)
src/pages/       # Page Object classes (*.page.js)
src/fixtures/    # Custom fixtures and test setup
playwright.config.js
package.json
```

## License

MIT
