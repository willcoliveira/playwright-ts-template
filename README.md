# Playwright Base

Playwright + TypeScript starter project for E2E test automation with AI agent skills powered by [wico](https://github.com/willcoliveira/qualiow-playwright-skills).

## Project Description

This project provides a clean, ready-to-use Playwright setup with TypeScript for anyone starting a new E2E test automation project. It includes the Page Object Model pattern, Docker support, GitHub Actions CI, and a set of AI agent skills that help your coding assistant write, debug, and review tests properly.

The tests run against `https://playwright.dev` as a demo target. You can point it to your own application by setting the `BASE_URL` environment variable.

## How to Install This Project

### Prerequisites

#### Node.js

Having Node.js installed is mandatory to run this project. Download and install from [nodejs.org](https://nodejs.org/en/download/).

After installation, open a terminal and verify the version (check `.nvmrc` for the required version — must be >= v22):

```bash
# If using nvm, switch to the project's node version
nvm use

# Verify Node.js version
node -v

# Verify npm version
npm -v
```

#### Docker (optional)

Docker is required only if you want to run tests inside a container. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) for your operating system.

After installation, verify Docker is running:

```bash
# Check Docker is installed and running
docker --version

# Verify Docker daemon is running
docker ps
```

### If you are using VSCode I recommend: Playwright Test for VSCode

For a better development experience, install the [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension. It provides:

- Test explorer with run/debug capabilities
- Live test results in the editor
- Browser picker and headed mode toggle
- Trace viewer integration
- Pick locator tool for element selection

### Clone and Setup

```bash
# Clone the repository
git clone git@github.com:willcoliveira/playwright-ts-template.git
cd playwright-ts-template

# Use the correct Node version
nvm use

# Install dependencies and Playwright browsers
npm install
```

Or use the Makefile:

```bash
make install
```

## How to Run This Project CLI

### How to Run Tests using npm

```bash
# Run all tests
npm test

# Run tests with browser visible
npm run test:headed

# Run tests in debug mode
npm run test:debug
```

### How to Run the Tests Using Playwright Interface

```bash
# Run with Playwright UI
npm run test:ui

# Or using Makefile
make test-ui

# Or using the VSCode extension as described above
```

### How to Run the tests using Makefile

```bash
make test           # Run all tests headless
make test-headed    # Run with browser visible
make test-chromium  # Run on Chromium only
make test-firefox   # Run on Firefox only
make test-webkit    # Run on WebKit only
```

### How to Run the Tests Using Docker

#### Build the Docker Image

```bash
make docker-build
```

#### Run Tests in Docker

```bash
make docker-test
```

The test reports will be available in the `playwright-report/` directory.

## How to Analyse the Test Results

### View HTML Report

```bash
# Open the latest HTML report
make report

# Or using npm
npm run report
```

The report includes:

- Test results summary
- Detailed test steps
- Screenshots (on failure)
- Trace files (on first retry)

## Available Commands

| Command              | Description                                  |
| -------------------- | -------------------------------------------- |
| `make install`       | Install dependencies and Playwright browsers |
| `make test`          | Run all tests headless                       |
| `make test-headed`   | Run tests with visible browser               |
| `make test-ui`       | Open Playwright UI mode                      |
| `make test-debug`    | Run tests in debug mode                      |
| `make test-chromium` | Run tests on Chromium only                   |
| `make test-firefox`  | Run tests on Firefox only                    |
| `make test-webkit`   | Run tests on WebKit only                     |
| `make docker-build`  | Build Docker image                           |
| `make docker-test`   | Build and run tests in Docker                |
| `make docker-clean`  | Remove Docker image                          |
| `make report`        | Open the HTML test report                    |
| `make lint`          | Run ESLint                                   |
| `make lint-fix`      | Run ESLint with auto-fix                     |
| `make format`        | Format code with Prettier                    |
| `make format-check`  | Check code formatting                        |
| `make typecheck`     | Run TypeScript type checking                 |
| `make clean`         | Remove generated artifacts                   |
| `make help`          | Display all available commands               |

## Caveats and Linters Validations

### ESLint

```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

### Prettier

```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

### TypeScript

```bash
# Type check
npm run typecheck
```

## Project Structure

```
playwright-ts-template/
├── src/
│   ├── pages/
│   │   ├── components/            # Shared UI components
│   │   └── home.page.ts           # Example page object
│   ├── tests/
│   │   └── home.spec.ts           # Example test
│   ├── helpers/                   # Utility helpers
│   └── test-data/                 # Static test data
├── .claude/
│   └── skills/                    # AI agent skills (wico)
│       ├── playwright-e2e/        # E2E testing patterns
│       └── playwright-cli/        # CLI browser automation
├── .github/
│   └── workflows/
│       └── tests.yml              # GitHub Actions CI
├── playwright.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── Makefile
├── Dockerfile
└── package.json
```

## CI/CD

The project contains a GitHub Actions workflow that runs on:

- Push to `main` branch
- Pull requests to `main` branch

The workflow installs dependencies, runs all tests, and uploads the HTML report as a downloadable artifact with 7-day retention.

## Environment Variables

| Variable   | Description          | Default                  |
| ---------- | -------------------- | ------------------------ |
| `BASE_URL` | Application base URL | `https://playwright.dev` |
| `CI`       | CI environment flag  | -                        |

## AI Agent Skills

This project includes AI agent skills generated by [wico-playwright-agent-skills](https://github.com/willcoliveira/qualiow-playwright-skills). These skills teach your AI coding assistant (Claude Code, Cursor, etc.) how to:

- Write tests following Playwright best practices
- Debug failing tests with a structured workflow
- Review tests against a 7-category checklist
- Use the Page Object Model pattern correctly
- Follow project conventions (MUST/SHOULD/WON'T rules)

After cloning, search for `<!-- YOUR PROJECT: ... -->` markers in `.claude/skills/` files and fill in your project-specific details.

## License

MIT
