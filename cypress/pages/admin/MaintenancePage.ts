import { BasePage } from "../BasePage.ts";
import { Textbox } from "../../components/Textbox.ts";
import { Button } from "../../components/Button.ts";

export class MaintenancePage extends BasePage {
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
        return cy.get('div[role="option"]').children('span');
    }

    //** ACTIONS */

    clickAccessRecordsTab() {
        this.accessRecordsTab().click();
    }

    enterEmployeeName(employeeName: string) {
        this.employeeNameTbx.type(employeeName);
    }

    selectEmployeeFromList(employeeName: string) {
        this.searchEmployeeList().contains(employeeName).click();
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


}

export const maintenancePage = new MaintenancePage();