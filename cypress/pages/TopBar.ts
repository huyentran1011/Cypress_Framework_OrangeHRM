import { BasePage } from "./BasePage.ts";

export class TopBar extends BasePage {

    private userDropdown() {
        return cy.get('span.oxd-userdropdown-tab');
    }
    private dropdownItems = 'a[role="menuitem"]';
    private displayedUsername() {
        return cy.get('p.oxd-userdropdown-name');
    }
    private pageHeader() {
        return cy.get('h6.oxd-topbar-header-breadcrumb-module');
    }

    /** ACTIONS */

    selectItemFromUserDropdown(itemText: string) {
        this.userDropdown().click
        this.selectItemFromCustomDropdown(this.userDropdown(), this.dropdownItems, itemText);
    }

    getDisplayedUsername() {
        return this.displayedUsername().invoke('text');
    }

    logout(){
        this.selectItemFromUserDropdown('Logout');
    }

    /** ASSERTIONS  */

    verifyPageHeaderShouldBe(headerText: string) {
        this.pageHeader().should('have.text', headerText);
    }

    verifyDisplayedUsernameShouldBe(username: string) {
        this.displayedUsername().should('have.text', username);
    }
}

export const topBar = new TopBar();