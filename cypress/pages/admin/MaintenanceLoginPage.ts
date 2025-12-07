import { BasePage } from "../BasePage.ts";
import { Button } from "../../components/Button.ts";
import { Textbox } from "../../components/Textbox.ts";


export class MaintenanceLoginPage extends BasePage {
    //** COMPONENT LOCATORS */
    usernameTbx = new Textbox('Username');
    passwordTbx = new Textbox('Password');
    cancelBtn = new Button('Cancel');
    confirmBtn = new Button('Confirm');

     //** PAGE ONLY LOCATORS */
     private pageTitle() {
        return cy.get('h6.orangehrm-admin-access-title');
     } 

    private pageMessage() {
        return cy.get('.oxd-text--toast-message');
     } 

    /** ACTIONS */

    enterPassword(password: string) {
        this.passwordTbx.type(password);
    }

    clickConfirmButton() {
        this.confirmBtn.click();
    }

    clickCancelButton() {
        this.cancelBtn.click();
    }

    loginToAdministrator(username: string, password: string){
        this.enterPassword(password);
        this.clickConfirmButton();
    }

     /** ASSERTIONS */

     verifyPageTitleShouldHaveValue(title: string){
        this.pageTitle().should('have.text', title);
     }

     verifyPageMessageShouldHaveValue(message: string){
        this.pageMessage().should('have.text', message);
     }

     verifyUsernameShouldBeDisabled(){
        this.usernameTbx.shouldBeDisabled();
     }

     verifyUsernameShouldHaveValue(username: string){
        this.usernameTbx.shouldHaveValue(username);
     }

    verifyPasswordShouldBeEnable(){
        this.passwordTbx.shouldBeEnable();
     }

     verifyPasswordShouldBeEmpty(){
        this.passwordTbx.shouldBeEmpty();
     }

}

export const maintenanceLoginPage = new MaintenanceLoginPage();