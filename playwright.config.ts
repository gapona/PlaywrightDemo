import {desktopProjects} from "./configs/desktop.config";
import {defineConfig} from "@playwright/test";

export default defineConfig({
    testDir: './tests',
    reporter: [['html', { open: 'never' }]],
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : undefined,
    projects: [...desktopProjects],
});
