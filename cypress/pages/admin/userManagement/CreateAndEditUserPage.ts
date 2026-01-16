import { BasePage } from "../../BasePage.ts";
import { Textbox } from "../../../components/Textbox.ts";
import { DropdownMenu } from "../../../components/DropdownMenu.ts";
import { Button } from "../../../components/Button.ts";
// import { CheckBox } from "../../../components/CheckBox.ts";
import { ToastMessage } from "../../../components/ToastMessage.ts";

export class CreateAndEditUserPage extends BasePage {
    /** COMPONENT LOCATORS */
    userRoleDdm = new DropdownMenu('User Role');
    employeeNameTbx = new Textbox('Employee Name');
    statusDdm = new DropdownMenu('Status');
    usernameTbx = new Textbox('Username');
    passwordTbx = new Textbox('Password');
    confirmPwTbx = new Textbox('Confirm Password');
    cancelBtn = new Button('Cancel');
    saveBtn = new Button('Save');
    toastMsg = new ToastMessage();

    /** PAGE ONLY LOCATORS */
    private pageHeader() {
        return cy.get('h6.orangehrm-main-title');
    }

    private topbarHeaderModule() {
        return cy.get('h6.oxd-topbar-header-breadcrumb-module');
    }

    private searchEmployeeList() {
        return cy.get('div[role="option"]');
    }

    private changePasswordCheckbox() {
        return cy.get('span.oxd-checkbox-input');
    }

    /** ACTIONS */
    selectUserRole(userRoleValue: string) {
        if (userRoleValue !== "") {
            this.userRoleDdm.selectOption(userRoleValue);
        } else {
            cy.log('No user role selected');
            return;
        }
    }

    editUserRole(userRoleValue: string) {
        if (userRoleValue == "NOT CHANGE") {
            cy.log("User Role is not changed");
            return;
        } else {
            if (userRoleValue !== "") {
                this.userRoleDdm.selectOption(userRoleValue);
            } else {
                this.userRoleDdm.selectOption('-- Select --');
            }
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

    editAndSelectEmployeeName(employeeFirstName: string, employeeMiddleName: string, employeeLastName: string) {
        let employeeName = `${employeeFirstName} ${employeeMiddleName} ${employeeLastName}`;
        employeeName = employeeName.trim();

        if (employeeFirstName == "NOT CHANGE") {
            return;
        } else {
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
                this.employeeNameTbx.clear();
                return;
            }
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

    selectStatus(statusValue: string) {
        if (statusValue !== "") {
            this.statusDdm.selectOption(statusValue);
        } else {
            cy.log('No status selected');
            return;
        }
    }

    editStatus(statusValue: string) {
        if (statusValue == "NOT CHANGE") {
            cy.log("User Status is not changed.");
            return;
        } else {
            if (statusValue !== "") {
                this.statusDdm.selectOption(statusValue);
            } else {
                this.statusDdm.selectOption('-- Select --');
            }
        }
    }

    enterUsername(usernameValue: string) {
        if (usernameValue !== "") {
            this.usernameTbx.type(usernameValue);
            cy.wait(3000);
        } else {
            cy.log('No username inputted');
            return;
        }
    }

    editUsername(usernameValue: string) {
        if (usernameValue == "NOT CHANGE") {
            cy.log("Username is not changed.");
            return;
        } else {
            if (usernameValue !== "") {
                this.usernameTbx.type(usernameValue);
                cy.wait(3000);
            } else {
                this.usernameTbx.clear();
            }
        }
    }

    clickChangePasswordCheckbox() {
        this.changePasswordCheckbox().click();
    }

    enterPassword(passwordValue: string) {
        if (passwordValue !== "") {
            this.passwordTbx.type(passwordValue);
        } else {
            cy.log('No password inputted');
            return;
        }
    }

    editPassword(passwordValue: string) {
        if (passwordValue !== "") {
            this.passwordTbx.type(passwordValue);
        } else {
            this.passwordTbx.clear();
        }
    }

    enterConfirmPassword(confirmPwValue: string) {
        if (confirmPwValue !== "") {
            this.confirmPwTbx.type(confirmPwValue);
        } else {
            cy.log('No confirm password inputted');
            return;
        }
    }

    editConfirmPassword(confirmPwValue: string) {
        if (confirmPwValue !== "") {
            this.confirmPwTbx.type(confirmPwValue);
        } else {
            this.confirmPwTbx.clear();
        }
    }

    clickCancelButton() {
        this.cancelBtn.click();
    }

    clickSaveButton() {
        this.saveBtn.click();
    }

    createNewUser(userRole: string, empFirstname: string, empMiddlename: string, empLastname: string, status: string, username: string, password: string, confirmPassword: string) {
        this.selectUserRole(userRole);
        this.enterAndSelectEmployeeName(empFirstname, empMiddlename, empLastname);
        this.selectStatus(status);
        this.enterUsername(username);
        this.enterPassword(password);
        this.enterConfirmPassword(confirmPassword);
        this.clickSaveButton();
    }

    /** ASSERTIONS  */
    verifyPageHeaderShouldBe(header: string) {
        this.pageHeader().should('have.text', header);
    }

    verifyTopbarHeaderModuleShouldBe(topbarHeaderModule: string) {
        this.topbarHeaderModule().should('have.text', topbarHeaderModule);
    }

    verifyUserRoleErrorMessage(errorMessage: string) {
        if (errorMessage !== "") {
            return this.userRoleDdm.shouldHaveErrorMessage(errorMessage);
        } else {
            cy.log('No error message in User Role field.');
            return;
        }
    }

    verifyUserRoleErrorMsgColor(color: string) {
        return this.userRoleDdm.shouldErrorMessageColor(color);
    }

    verifyEmployeeErrorMessage(errorMessage: string) {
        if (errorMessage !== "") {
            return this.employeeNameTbx.shouldHaveErrorMessage(errorMessage);
        } else {
            cy.log('No error message in Employee Name field.');
            return;
        }
    }

    verifyEmployeeErrorMsgColor(color: string) {
        return this.employeeNameTbx.shouldErrorMessageColor(color);
    }

    verifyStatusErrorMessage(errorMessage: string) {
        if (errorMessage !== "") {
            return this.statusDdm.shouldHaveErrorMessage(errorMessage);
        } else {
            cy.log('No error message in Status field.');
            return;
        }
    }

    verifyStatusErrorMsgColor(color: string) {
        return this.statusDdm.shouldErrorMessageColor(color);
    }

    verifyUsernameErrorMessage(errorMessage: string) {
        if (errorMessage !== "") {
            return this.usernameTbx.shouldHaveErrorMessage(errorMessage);
        } else {
            cy.log('No error message in Username field.');
            return;
        }
    }

    verifyUsernameErrorMsgColor(color: string) {
        return this.usernameTbx.shouldErrorMessageColor(color);
    }

    verifyPasswordErrorMessage(errorMessage: string) {
        if (errorMessage !== "") {
            return this.passwordTbx.shouldHaveErrorMessage(errorMessage);
        } else {
            cy.log('No error message in Password field.');
            return;
        }
    }

    verifyPasswordErrorMsgColor(color: string) {
        return this.passwordTbx.shouldErrorMessageColor(color);
    }

    verifyConfimPwErrorMessage(errorMessage: string) {
        if (errorMessage !== "") {
            return this.confirmPwTbx.shouldHaveErrorMessage(errorMessage);
        } else {
            cy.log('No error message in Confirm Password field.');
            return;
        }
    }

    verifyConfirmPwErrorMsgColor(color: string) {
        return this.confirmPwTbx.shouldErrorMessageColor(color);
    }

    verifyToastMessageShouldBe(title: string, message: string) {
        this.toastMsg.shouldHaveTitle(title);
        this.toastMsg.shouldHaveMessage(message);
    }
}
export const createAndEditUserPage = new CreateAndEditUserPage();