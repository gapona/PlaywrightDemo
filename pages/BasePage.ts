import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /** Navigate to a specific URL */
    async goto(url: string) {
        await this.page.goto(url);
    }

    /** Get a locator by selector */
    protected $(selector: string): Locator {
        return this.page.locator(selector);
    }

    /** Wait for an element to be visible */
    async waitForElementVisible(selector: string, timeout: number = 5000) {
        await this.$(selector).waitFor({ state: 'visible', timeout });
    }

    /** Click on an element */
    async click(selector: string) {
        await this.$(selector).click();
    }

    /** Fill an input field with text */
    async fill(selector: string, text: string) {
        await this.$(selector).fill(text);
    }

    /** Get text content from an element */
    async getText(selector: string): Promise<string> {
        return await this.$(selector).innerText();
    }

    /** Wait for the page to fully load */
    async waitForPageLoad(timeout: number = 10000) {
        await this.page.waitForLoadState('load', { timeout });
    }

    /** Take a screenshot */
    async takeScreenshot(name: string) {
        await this.page.screenshot({ path: `screenshots/${name}.png` });
    }

    /** Assert that an element contains specific text */
    async expectElementToHaveText(selector: string, expectedText: string) {
        await expect(this.$(selector)).toHaveText(expectedText);
    }
}
