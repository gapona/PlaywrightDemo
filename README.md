# Playwright Test Framework Online Bookstore

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

## 🚀 Available Commands

| Command           | Description                                             |
|-------------------|---------------------------------------------------------|
| `test:desktop` | Run tests on all **Desktop browsers** (Chrome)          |
| `report:open`     | Open Playwright HTML report based on latest test results|

## CI/CD

The project includes a GitHub Actions pipeline that:
- Installs dependencies
- Runs API tests
- Generates a test report as part of the CI process
