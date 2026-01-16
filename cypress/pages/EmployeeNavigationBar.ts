import { BasePage } from "./BasePage.ts";

export class EmployeeNavigationBar extends BasePage {
    //** PAGE ONLY LOCATORS */
    private empName() {
        return cy.get('.orangehrm-edit-employee-name').children('h6');
    }

    private empImage() {
        return cy.get('img.employee-image');
    }
    private menuItems() {
        return cy.get('a.orangehrm-tabs-item');
    }

    /** ACTIONS */

    clickMenuItem(menu: string) {
        this.menuItems().contains(menu).click();
    }

    /** ASSERTIONS  */
    verifyEmployeeNameShouldBe(name: string){
        this.empName().should('have.text', name);
    }

    verifyEmployeeImageIsDisplayed(){
        this.empImage().should('be.visible');
    }

}

export const employeeNavigationBar = new EmployeeNavigationBar();