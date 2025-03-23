import { devices, Project } from '@playwright/test';

export const mobileProjects: Project[] = [
    {
        name: 'iPhone 14 - Safari',
        use: {
            ...devices['iPhone 14'],
            viewport: { width: 800, height: 1600 },
            browserName: 'webkit',
            deviceScaleFactor: 3,
        },
    },
    {
        name: 'Samsung Galaxy S9+ - Firefox',
        use: {
            viewport: { width: 800, height: 1600 },
            browserName: 'firefox',
            deviceScaleFactor: 4,
            userAgent: 'Mozilla/5.0 (Linux; Android 9; SM-G965F)', // реальный User-Agent Samsung Galaxy S9+
        },
    },
    {
        name: 'Pixel 7 - Chromium',
        use: {
            ...devices['Pixel 7'],
            viewport: { width: 800, height: 1600 },
            browserName: 'chromium',
            deviceScaleFactor: 2.75,
        },
    },
    {
        name: 'OnePlus 9 - Edge',
        use: {
            viewport: { width: 800, height: 1600 },
            browserName: 'chromium',
            channel: 'msedge',
            isMobile: true,
            hasTouch: true,
            deviceScaleFactor: 3.1,
            userAgent: 'Mozilla/5.0 (Linux; Android 11; LE2113)',
        },
    },
];
