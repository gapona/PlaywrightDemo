import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private loginButton = this.page.getByRole('button', { name: 'Log in' });
    private emailField = this.page.getByRole('textbox', { name: 'Email' });
    private passwordField = this.page.getByRole('textbox', { name: 'Password' });
    private submitButton = this.page.locator('div').filter({ hasText: /^Log in$/ });

    /** Navigate to the login page */
    async goto() {
        await this.page.goto('https://primewin.com/');
    }

    /** Perform login */
    async login(email: string, password: string) {
        await this.loginButton.click();
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.submitButton.click();
    }
}
