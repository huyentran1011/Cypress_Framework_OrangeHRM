import { BasePage } from "../../BasePage.ts";
import { Textbox } from "../../../components/Textbox.ts";
import { DropdownMenu } from "../../../components/DropdownMenu.ts";
import { Button } from "../../../components/Button.ts";
import type { SystemUser } from "../../../support/database/systemUser/user.types.ts";
import { mapUsernameStatus } from "../../../utils/mapper.ts";
import { utils } from "../../../utils/utilities.ts";
import { ToastMessage } from "../../../components/ToastMessage.ts";

export class UserManagementPage extends BasePage {

    /** COMPONENT LOCATORS */
    usernameTbx = new Textbox('Username');
    userRoleDdm = new DropdownMenu('User Role');
    employeeNameTbx = new Textbox('Employee Name');
    statusDdm = new DropdownMenu('Status');
    resetBtn = new Button('Reset');
    searchBtn = new Button('Search');
    addBtn = new Button('Add');
    confirmDeleteBtn = new Button('Yes, Delete');
    cancelDeleteBtn = new Button('No, Cancel');
    deleteSelectedBtn = new Button('Delete Selected');
    toastMsg = new ToastMessage();

    /** PAGE ONLY LOCATORS */
    private pageHeader() {
        return cy.get('h5.oxd-table-filter-title');
    }

    private topbarHeaderModule() {
        return cy.get('h6.oxd-topbar-header-breadcrumb-module');
    }

    private topbarHeaderLevel() {
        return cy.get('h6.oxd-topbar-header-breadcrumb-level');
    }

    private searchEmployeeList() {
        return cy.get('div[role="option"]');
    }

    private recordsFoundMessage() {
        return cy.contains('span', 'Found');
    }

    private userRows() {
        return cy.get('.oxd-table-card');
    }

    private columnHeaders() {
        return cy.get('div.oxd-table-header-cell');
    }

    private dataCells = 'div[role="cell"]';
    private bottonContainer = 'div.orangehrm-bottom-container';
    private nextPaginationIcon = 'i.bi-chevron-right';
    private paginationButton = 'button.oxd-pagination-page-item';

    private editBtn() {
        return cy.get('i.bi-pencil-fill').parent('button');
    }

    private deleteBtn() {
        return cy.get('i.bi-trash').parent('button');
    }

    private checkboxByUsername(username: string){
        return cy.get('div').contains(username).parent().prev('div[role="cell"]').find('span');
    }

    /** ACTIONS */
    enterUsername(usernameValue: string) {
        if (usernameValue !== "") {
            this.usernameTbx.type(usernameValue);
        } else {
            cy.log('No username inputted');
            return;
        }
    }

    selectUserRole(userRoleValue: string) {
        if (userRoleValue !== "") {
            this.userRoleDdm.selectOption(userRoleValue);
        } else {
            cy.log('No user role selected');
            return;
        }
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

    selectStatus(statusValue: string) {
        statusValue = utils.normalizeString(statusValue);
        cy.log("status after nomalize: " + statusValue);
        if (statusValue !== "") {
            this.statusDdm.selectOption(statusValue);
        } else {
            cy.log('No status selected');
            return;
        }
    }

    clickSearchButton() {
        this.searchBtn.click();
    }

    clickResetButton() {
        this.resetBtn.click();
    }

    clickAddButton() {
        this.addBtn.click();
    }

    clickEditButton() {
        this.editBtn().click();
    }

    clickDeleteButton() {
        this.deleteBtn().click();
    }

    clickConfirmDeleteButton() {
        this.confirmDeleteBtn.click();
    }

    clickCancelDeleteButton() {
        this.cancelDeleteBtn.click();
    }

    clickCheckboxByUsername(username: string){
        this.checkboxByUsername(username).click();
    }

    clickDeleteSelectedBtn(){
        this.deleteSelectedBtn.click();
    }

    getIndexOfColumnHeader(headerName: string): Cypress.Chainable<number> {
        return this.columnHeaders().then(($headers) => {
            const index = [...$headers].findIndex(header =>
                header.innerText.trim().includes(headerName)
            );

            if (index === -1) {
                throw new Error(`Column header "${headerName}" not found`);
            }

            return index;
        })
    }

    /** ASSERTIONS  */

    verifyPageHeaderShouldBe(header: string) {
        this.pageHeader().should('have.text', header);
    }

    verifyTopbarHeaderModuleShouldBe(topbarHeaderModule: string) {
        this.topbarHeaderModule().should('have.text', topbarHeaderModule);
    }

    verifyTopBarHeaderLevelShouldBe(topbarHeaderLevel: string) {
        this.topbarHeaderLevel().should('have.text', topbarHeaderLevel);
    }

    verifyEmployeeErrorMessage(errorMessage: string) {
        return this.employeeNameTbx.shouldHaveErrorMessage(errorMessage);
    }

    verifyEmployeeErrorMsgColor(color: string) {
        return this.employeeNameTbx.shouldErrorMessageColor(color);
    }

    verifyNumberRecordFoundMessageShouldBeCorrect(numberRecordFound: number) {
        this.recordsFoundMessage().should((element) => {
            const textMessage = element.text().trim();
            if (numberRecordFound === 0) {
                expect(textMessage).to.equal('No Records Found');
            } else if (numberRecordFound === 1) {
                expect(textMessage).to.equal('(1) Record Found');
            } else {
                expect(textMessage).to.equal(`(${numberRecordFound}) Records Found`);
            }
        });
    }

    verifySystemUserDataRowsShouldBeCorrect(expectedSearchResults: SystemUser[]) {
        const actualSearchResults: SystemUser[] = [];
        const collectRowsFromCurrentPage = () => {
            this.getIndexOfColumnHeader('Username').then(usernameColInd => {
                this.getIndexOfColumnHeader('User Role').then(userRoleColInd => {
                    this.getIndexOfColumnHeader('Employee Name').then(empNameColInd => {
                        this.getIndexOfColumnHeader('Status').then(statusColInd => {
                            this.userRows().each(($row) => {
                                const cells = Cypress.$($row).find(this.dataCells);
                                const username = cells.eq(usernameColInd).text().trim();
                                const userRole = cells.eq(userRoleColInd).text().trim();
                                const employeeName = cells.eq(empNameColInd).text().trim();
                                const status = mapUsernameStatus(cells.eq(statusColInd).text().trim());
                                actualSearchResults.push({ username, userRole, employeeName, status });
                            });
                        })
                    })
                })
            })
        };

        const goThroughAllPages = (): Cypress.Chainable => {
            collectRowsFromCurrentPage();

            return cy.get(this.bottonContainer).then(($container) => {
                const $nextPaginationButton = $container
                    .find(this.nextPaginationIcon)
                    .parent(this.paginationButton);
                if ($nextPaginationButton.length && !$nextPaginationButton.is(':disabled')) {
                    cy.wrap($nextPaginationButton).click();
                    return goThroughAllPages(); // chain recursion
                }
                return cy.wrap(null);
            });
        };

        goThroughAllPages()
            .then(() => {
                const actual = this.sortSystemUsers(actualSearchResults);
                const expected = this.sortSystemUsers(expectedSearchResults);

                actual.forEach((a, i) => {
                    const e = expected[i];
                    if (JSON.stringify(a) !== JSON.stringify(e)) {
                        cy.log(` Mismatch at index ${i}`);
                        cy.log(`Actual: ${JSON.stringify(a)}`);
                        cy.log(`Expected: ${JSON.stringify(e)}`);
                    }
                });
                this.diffUsers(actual, expected);

            })
            .then(() => {
                const actual = this.sortSystemUsers(actualSearchResults);
                const expected = this.sortSystemUsers(expectedSearchResults);
                cy.wrap(actual).should('deep.equal', expected);
            });
    }

    verifyToastMessageShouldBe(title: string, message: string) {
        this.toastMsg.shouldHaveTitle(title);
        this.toastMsg.shouldHaveMessage(message);
    }

    //** Normalizer + sorter helper */

    normalizeSystemUser = (u: SystemUser) => ({
        username: u.username.trim(),
        userRole: u.userRole.trim(),
        employeeName: utils.normalizeString(u.employeeName),
        status: Number(u.status)
    });

    sortSystemUsers = (arr: SystemUser[]) => {
        if (!Array.isArray(arr)) {
            throw new Error(`sortSystemUsers expected array but got: ${typeof arr}`);
        }

        return arr
            .map(this.normalizeSystemUser)
            .sort((a, b) =>
                `${a.username}|${a.userRole}|${a.employeeName}|${a.status}`
                    .localeCompare(
                        `${b.username}|${b.userRole}|${b.employeeName}|${b.status}`
                    )
            );
    };

    diffUsers = (actual: SystemUser[], expected: SystemUser[]) => {
        actual.forEach((a, i) => {
            const e = expected[i];

            Object.keys(a).forEach((key) => {
                const actualValue = (a as any)[key];
                const expectedValue = (e as any)[key];

                if (actualValue !== expectedValue) {
                    cy.log(`Mismatch at index ${i}, field "${key}"`);
                    cy.log(`Actual   (${typeof actualValue}): ${JSON.stringify(actualValue)}`);
                    cy.log(`Expected (${typeof expectedValue}): ${JSON.stringify(expectedValue)}`);
                }
            });
        });
    };
}

export const userManagementPage = new UserManagementPage();