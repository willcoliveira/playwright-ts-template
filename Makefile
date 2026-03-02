.DEFAULT_GOAL := help
DOCKER_IMAGE := playwright-ts-template

## —— Setup ——————————————————————————————————————————————
.PHONY: install
install: ## Install dependencies and Playwright browsers
	npm ci
	npx playwright install --with-deps

## —— Tests ——————————————————————————————————————————————
.PHONY: test
test: ## Run all tests headless
	npx playwright test

.PHONY: test-headed
test-headed: ## Run tests with visible browser
	npx playwright test --headed

.PHONY: test-ui
test-ui: ## Open Playwright UI mode
	npx playwright test --ui

.PHONY: test-debug
test-debug: ## Run tests in debug mode
	npx playwright test --debug

.PHONY: test-chromium
test-chromium: ## Run tests on Chromium only
	npx playwright test --project=chromium

.PHONY: test-firefox
test-firefox: ## Run tests on Firefox only
	npx playwright test --project=firefox

.PHONY: test-webkit
test-webkit: ## Run tests on WebKit only
	npx playwright test --project=webkit

## —— Docker —————————————————————————————————————————————
.PHONY: docker-build
docker-build: ## Build Docker image
	docker build -t $(DOCKER_IMAGE) .

.PHONY: docker-test
docker-test: docker-build ## Build and run tests in Docker
	docker run --rm $(DOCKER_IMAGE)

.PHONY: docker-clean
docker-clean: ## Remove Docker image
	docker rmi $(DOCKER_IMAGE) || true

## —— Reports ————————————————————————————————————————————
.PHONY: report
report: ## Open the HTML test report
	npx playwright show-report

## —— Code Quality ———————————————————————————————————————
.PHONY: lint
lint: ## Run ESLint
	npx eslint .

.PHONY: lint-fix
lint-fix: ## Run ESLint with auto-fix
	npx eslint . --fix

.PHONY: format
format: ## Format code with Prettier
	npx prettier . --write

.PHONY: format-check
format-check: ## Check code formatting
	npx prettier . --check

.PHONY: typecheck
typecheck: ## Run TypeScript type checking
	npx tsc --noEmit

## —— Cleanup ————————————————————————————————————————————
.PHONY: clean
clean: ## Remove generated artifacts
	rm -rf node_modules playwright-report test-results blob-report

## —— Help ———————————————————————————————————————————————
.PHONY: help
help: ## Display available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
