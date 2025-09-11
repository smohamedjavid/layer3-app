# Tests

This directory contains unit tests and component tests for the Layer3 app.

## Test Structure

```
tests/
├── setup.ts                    # Jest setup and global mocks
├── utils/
│   └── formatters.test.ts      # Tests for utility functions
└── components/
    ├── AppText.test.tsx        # Tests for AppText component
    └── TokenItem.test.tsx      # Tests for TokenItem component

```

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

## Test Coverage

The tests cover:

### Utilities (`tests/utils/`)

- **formatters.test.ts**: Tests for address formatting, balance formatting, currency formatting, percentage formatting, date/time formatting

### Components (`tests/components/`)

- **AppText.test.tsx**: Tests for the AppText component with different text types (default, title, subtitle, etc.) and custom styling
- **TokenItem.test.tsx**: Tests for the TokenItem component including balance display, price changes, and conditional rendering

## Mock Setup

The `setup.ts` file includes mocks for:

- Expo modules (expo-image, expo-linking, etc.)
- React Navigation
- React Native Safe Area Context
- Shopify Flash List

## Adding New Tests

When adding new tests:

1. Create test files with the pattern `*.test.(ts|tsx)`
2. Use descriptive test names and organize tests with `describe` blocks
3. Mock external dependencies as needed
4. Follow the existing patterns for consistency

## Test Philosophy

- Focus on testing component behavior and user interactions
- Test error states and edge cases
- Use meaningful assertions that verify expected behavior
- Keep tests fast and reliable
- Test utilities and hooks thoroughly as they're used across the app
