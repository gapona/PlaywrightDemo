import { defineConfig } from '@playwright/test';
import { desktopProjects } from './configs/desktop.config';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : undefined,

    reporter: [
        ['html', { open: 'never' }]
    ],

    use: {
        headless: !!process.env.CI,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },

    projects: [
        ...desktopProjects
    ],
});
