import { BasePage } from "../../BasePage.ts";
import { Textbox } from "../../../components/Textbox.ts";
import { Button } from "../../../components/Button.ts";

export class AccessRecordsPage extends BasePage {
    //** COMPONENT LOCATORS */  
    employeeNameTbx = new Textbox('Employee Name');
    searchBtn = new Button('Search');
    downLoadBtn = new Button('Download');
    employeeIdTbx = new Textbox('Employee Id');

    //** PAGE ONLY LOCATORS */
    private pageHeader() {
        return cy.get('h6.orangehrm-main-title');
    }

    private accessRecordsTab() {
        return cy.get('a.oxd-topbar-body-nav-tab-item').contains('Access Records');
    }

    private employeeFirstNameTbx() {
        return cy.get('input[name="firstName"]');
    }

    private employeeMiddlelNameTbx() {
        return cy.get('input[name="middleName"]');
    }

    private employeeLastNameTbx() {
        return cy.get('input[name="lastName"]');
    }

    private searchEmployeeList() {
        return cy.get('div[role="option"]');
    }

    //** ACTIONS */

    clickAccessRecordsTab() {
        this.accessRecordsTab().click();
    }

    selectEmployeeFromList(employeeName: string) {
        this.searchEmployeeList().contains(employeeName).click();
    }

    enterEmployeeName(empFirstname: string, empMiddlename: string, empLastname: string) {
        const employeeName = [empFirstname, empMiddlename, empLastname]
            .filter(name => name && name.trim() !== "")
            .join(" ");
        cy.log("Employee name: " + employeeName)
        if (employeeName !== "") {
            this.employeeNameTbx.type(employeeName);
        } else {
            cy.log('No Employee Name inputted');
            return;
        }
    }

    enterAndSelectEmployeeName(employeeFirstName: string, employeeMiddleName: string, employeeLastName: string) {
        let employeeName = `${employeeFirstName} ${employeeMiddleName} ${employeeLastName}`;
        employeeName = employeeName.trim();

        if (employeeName !== "") {
            this.employeeNameTbx.type(employeeFirstName);
            this.searchEmployeeList().contains('Searching...').should('not.exist');
            this.searchEmployeeList().each((employee) => {
                cy.wrap(employee).then(($el) => {
                    const text = $el.text().trim();
                    if (text === 'No Records found') {
                        return;
                    } else if (text === employeeName) {
                        cy.wrap($el).click();
                        this.searchEmployeeList().should('not.exist');
                    }
                });
            });
        } else {
            cy.log('No employee name selected');
            return;
        }
    }

    clickSearchButton() {
        this.searchBtn.click();
    }

    clickDownloadButton() {
        this.downLoadBtn.click();
    }

    /** ASSERTIONS */

    verifyPageHeaderShouldBe(header: string) {
        this.pageHeader().should('have.text', header);
    }

    verifySelectedEmployeeFirstNameShouldHaveValue(firstName: string) {
        this.employeeFirstNameTbx().should('have.value', firstName);
    }

    verifySelectedEmployeeFirstNameTbxShouldBeDisabled() {
        this.employeeFirstNameTbx().should('be.disabled');
    }

    verifySelectedEmployeeFirstNameTbxShouldBeNotDisplayed() {
        this.employeeFirstNameTbx().should('not.exist');
    }

    verifySelectedEmployeeMiddleNameShouldHaveValue(middleName: string) {
        this.employeeMiddlelNameTbx().should('have.value', middleName);
    }

    verifySelectedEmployeeMiddleNameTbxShouldBeDisabled() {
        this.employeeMiddlelNameTbx().should('be.disabled');
    }

    verifySelectedEmployeeMiddleNameTbxShouldBeNotDisplayed() {
        this.employeeMiddlelNameTbx().should('not.exist');
    }

    verifySelectedEmployeeLastNameShouldHaveValue(lastName: string) {
        this.employeeLastNameTbx().should('have.value', lastName);
    }

    verifySelectedEmployeeLastNameTxbShouldBeDisabled() {
        this.employeeLastNameTbx().should('be.disabled');
    }

    verifySelectedEmployeeLastNameTbxShouldBeNotDisplayed() {
        this.employeeLastNameTbx().should('not.exist');
    }

    verifySelectedEmployeeIdShouldHaveValue(employeeId: string) {
        this.employeeIdTbx.shouldHaveValue(employeeId);
    }

    verifySelectedEmployeeIdTbxShouldBeDisabled() {
        this.employeeIdTbx.shouldBeDisabled();
    }

    verifySelectedEmplyeeIDTbxShouldBeNotDisplayed() {
        this.employeeIdTbx.shouldNotBeExist();
    }

    verifyEmployeeNameErrorMessage(errorMessage: string) {
        return this.employeeNameTbx.shouldHaveErrorMessage(errorMessage);
    }

    verifyEmployeeNameErrorMsgColor(value: string) {
        return this.employeeNameTbx.shouldErrorMessageColor(value);
    }

}

export const accessRecordsPage = new AccessRecordsPage();