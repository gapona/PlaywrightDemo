# Playwright Test Framework Online Bookstore

[![Playwright Tests](https://github.com/gapona/PlaywrightDemo/actions/workflows/playwright.yml/badge.svg)](https://github.com/gapona/PlaywrightDemo/actions)

## Project Overview

This project is an API automation test framework for the FakeRest Online Bookstore API.
It covers both Books and Authors REST endpoints and demonstrates a clean, maintainable
approach to API test automation using Playwright Test.

## Tech Stack

- Language: TypeScript
- Test framework: Playwright Test
- API testing: Playwright APIRequestContext
- Reporting: Playwright HTML Reporter
- CI/CD: GitHub Actions

## Project Structure

```text
tests/
└── api/
    ├── config/      # API configuration and endpoints
    ├── helpers/     # API client and request helpers
    ├── models/      # Data models and typings
    ├── services/    # Service-layer abstractions
    ├── specs/       # Test specifications
    └── utils/       # Shared utilities
```

## API Coverage

### Books API
- GET /api/v1/Books
- GET /api/v1/Books/{id}
- POST /api/v1/Books
- PUT /api/v1/Books/{id}
- DELETE /api/v1/Books/{id}

### Authors API
- GET /api/v1/Authors
- GET /api/v1/Authors/{id}
- POST /api/v1/Authors
- PUT /api/v1/Authors/{id}
- DELETE /api/v1/Authors/{id}
- GET /api/v1/Authors/authors/books/{idBook}

## Test Scenarios

The framework covers both happy paths and edge cases, including:
- Non-existent resource IDs
- Empty and null fields
- Boundary and invalid values
- API-specific behavior of FakeRest mock responses

## 🚀 Running Tests

| Command           | Description                                             |
|-------------------|---------------------------------------------------------|
| `npm install` | Install project dependencies          |
| `npm run test:desktop` | Run tests on all **Desktop browsers** (Chrome)          |
| `npm run report:open`  | Open Playwright HTML report based on latest test results|

## Reporting
The project uses the built-in Playwright HTML Reporter.

After each CI run, the report is uploaded as a GitHub Actions artifact.

To view the report:
1. Open the GitHub Actions run
2. Download the `playwright-report` artifact
3. Unzip and open `index.html`

## CI/CD Pipeline

The project includes a GitHub Actions pipeline that runs automatically
on every push and pull request to the main branch.

The pipeline performs the following steps:
- Installs project dependencies
- Installs Playwright browsers
- Executes API tests
- Generates a Playwright HTML test report
- Uploads the report as a build artifact

This ensures that test execution and reporting are fully automated
and reproducible in a CI environment.
