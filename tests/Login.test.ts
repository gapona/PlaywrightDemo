import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {allure} from "allure-playwright";

test('User can log in and see Deposit button', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('andrii.h@primegroup.io', 'Iddqdiddqd1!');

    // Assert that the "Deposit" button is visible
    await expect(page.getByRole('button', {name: 'Deposit', exact: true})).toBeVisible();
});

test('Failed test', async ({page}) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('andrii.h@primegroup.io', 'wrong password');

  // Assert that the "Deposit" button is visible
  await expect(page.getByRole('button', {name: 'Deposit', exact: true})).toBeVisible();
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') { // Если тест упал
    const screenshotPath = await page.screenshot();
    allure.attachment('Failure Screenshot', screenshotPath, 'image/png');
  }
});
