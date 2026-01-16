import { BasePage } from "./BasePage.ts";

export class NavigationBar extends BasePage {
    //** PAGE ONLY LOCATORS */
    private menuItems() {
        return cy.get('a.oxd-main-menu-item');
    }

    private searchTbx() {
        return cy.get('input[placeholder="Search"]');
    }

    private toggleBtn() {
        return cy.get('button').children('i.oxd-icon');
    }

    private menuIcon = 'svg.oxd-main-menu-item--icon';
    private menuName = 'span.oxd-main-menu-item--name';

    /** ACTIONS */

    enterSearchKeyword(keyword: string) {
        this.searchTbx().clear().type(keyword);
    }

    clickToogleButton() {
        this.toggleBtn().click();
    }

    clickMenuItem(menu: string) {
        this.menuItems().children(this.menuName).contains(menu).click();
    }

    getUnselectedMenuItems() {
        return this.menuItems().not('.active');
    }

    /** ASSERTIONS  */

    verifynMenuItemsShouldNotExist() {
        this.menuItems().should('not.exist');
    }

    verifySelectedMenuItemShouldBeActive(menuName: string) {
        this.menuItems().filter('.active').should('have.text', menuName);
    }

    verifySelectedMenuItemColor(color: string) {
        this.menuItems().filter('.active').should('have.css', 'color', color);
    }

    verifyUnselectedMenuItems(expectedMenuNames: Array<string>) {
        this.shouldElementsHaveValues(this.getUnselectedMenuItems(), expectedMenuNames);
    }

    verifyUnselectedMenuItemColor(color: string) {
        this.getUnselectedMenuItems().should('have.css', 'color', color);
    }

    verifyMenuIconShouldBeVisible() {
        return this.menuItems().children(this.menuIcon).should('be.visible');
    }

    verifyMenuItemsShouldHaveLength(length: number) {
        return this.menuItems().should('have.length', length);
    }

    verifyMenuShouldHaveItems(expectedMenuNames: Array<string>) {
        this.shouldElementsHaveValues(this.menuItems(), expectedMenuNames);
    }

    verifyMenuNameShouldBeUndisplayed() {
        return this.menuItems().children(this.menuName).should('have.css', 'display', 'none');
    }

    verifyMainMenuNameShouldBeDisplayed() {
        return this.menuItems().children(this.menuName).should('not.have.css', 'display', 'none');
    }

    verifySearchTexboxShouldBeVisible() {
        this.searchTbx().should('be.visible');
    }


}
export const navigationBar = new NavigationBar();