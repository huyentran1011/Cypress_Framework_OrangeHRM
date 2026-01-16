import { Button } from "../components/Button.ts";
import { Textbox } from "../components/Textbox.ts";
import { BasePage } from "./BasePage.ts";

export class LoginPage extends BasePage {

    //** COMPONENT LOCATORS */
    usernameTbx = new Textbox('Username');
    passwordTbx = new Textbox('Password');
    loginBtn = new Button('Login');

    //** PAGE ONLY LOCATORS */
    private invalidCredentialsMsg() {
        return cy.get('.oxd-alert-content-text');
    }

    /** ACTIONS */

    visitLoginPage() {
        this.visit('/web/index.php/auth/login');
    }

    enterUsername(username: string) {
        this.usernameTbx.type(username);
    }

    enterPassword(password: string) {
        this.passwordTbx.type(password);
    }

    clickLoginButton() {
        this.loginBtn.click();
    }

    loginToSystem(username: string, password: string) {
        this.visitLoginPage();
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickLoginButton();
    }

    /** ASSERTIONS  */

    verifyUsernameErrorMessage(errorMessage: string) {
        return this.usernameTbx.shouldHaveErrorMessage(errorMessage);
    }

    verifyUsernameErrorMsgColor(value: string) {
        return this.usernameTbx.shouldErrorMessageColor(value);
    }

    verifyPasswordErrorMessage(errorMessage: string) {
        return this.passwordTbx.shouldHaveErrorMessage(errorMessage);
    }

    verifyPasswordErrorMessageColor(value: string) {
        return this.passwordTbx.shouldErrorMessageColor(value);
    }

    verifyInvalidCredentialsMessage(message: string) {
        return this.invalidCredentialsMsg().should('have.text', message);
    }

    verifyInvalidCredentialsMsgColor(value: string) {
        return this.invalidCredentialsMsg().should('have.css', 'color', value);
    }
}

export const loginPage = new LoginPage();