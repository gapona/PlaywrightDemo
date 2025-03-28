import {defineConfig, devices} from '@playwright/test';
import {desktopProjects} from './configs/desktop.config';
import {mobileProjects} from './configs/mobile.config';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0, // Retry on CI only
    workers: process.env.CI ? 2 : undefined,// Opt out of parallel tests on CI.
    reporter: [['allure-playwright']], // Use Allure for reporting
    use: {
        headless: !!process.env.CI, //  Headless only in CI
        trace: 'on-first-retry',    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
        screenshot: 'only-on-failure', // Takes screenshot only when a test fails
    },
    projects: [
        ...desktopProjects,
        ...mobileProjects,

        // {
        //     name: 'chromium',
        //     use: {...devices['Desktop Chrome']},
        // },
    ],
});
