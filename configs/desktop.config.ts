import { devices, Project } from '@playwright/test';

export const desktopProjects: Project[] = [
    {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
    },
];
