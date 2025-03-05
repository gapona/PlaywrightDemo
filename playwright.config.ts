import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,  // Run tests in files in parallel
    forbidOnly: !!process.env.CI, //Fail the build on CI if you accidentally left test.only in the source code.
    retries: process.env.CI ? 2 : 0, // Retry on CI only
    workers: process.env.CI ? 2 : undefined,// Opt out of parallel tests on CI.
    reporter: [['allure-playwright']], // Use Allure for reporting
    use: {
        // baseURL: 'http://127.0.0.1:3000',
        headless: !!process.env.CI, //  Headless only in CI
        trace: 'on-first-retry',    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
        screenshot: 'only-on-failure', // Takes screenshot only when a test fails
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },

        {
            name: 'firefox',
            use: {...devices['Desktop Firefox']},
        },

        {
            name: 'webkit',
            use: {...devices['Desktop Safari']},
        },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: {
        //     ...devices['iPhone 12'],
        //     isMobile: true,  // ✅ Ensure mobile emulation
        //     hasTouch: true,  // ✅ Enable touch events
        //     viewport: {width: 390, height: 844},  // ✅ Explicit viewport
        //   },
        // }

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
