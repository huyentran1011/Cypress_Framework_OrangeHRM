import { userManagementPage } from "../../../pages/admin/userManagement/UserManagementPage.ts";
import { navigationBar } from "../../../pages/NavigationBar.ts";
import { querySystemUsers } from "../../../support/database/systemUser/user.db.ts";
import type { SystemUser } from "../../../support/database/systemUser/user.types.ts";
import invalidUsernameKeywords from "../../../fixtures/admin/userManagement/invalidUsernameKeywords.json" with {type: "json"};
import invalidEmpNameKeywords from "../../../fixtures/admin/userManagement/invalidEmpNameKeywords.json" with {type: "json"};
import validSearchKeywords from "../../../fixtures/admin/userManagement/validSearchKeywords.json" with {type: "json"};

const menuItem = 'Admin';
const topbarHeaderModule = 'Admin';
const topbarHeaderLevel = 'User Management';
const pageHeader = 'System Users';

describe('Admin - User Management - Search Users Functions', () => {

    beforeEach('Login to system under Admin account, then go to Admin page', () => {
        cy.loginAsAdmin();
        navigationBar.clickMenuItem(menuItem);
    })

    it('Verify Top Bar Header And Page Title of User Management Page', () => {
        userManagementPage.verifyPageHeaderShouldBe(pageHeader);
        userManagementPage.verifyTopbarHeaderModuleShouldBe(topbarHeaderModule);
        userManagementPage.verifyTopBarHeaderLevelShouldBe(topbarHeaderLevel);
    })

    invalidUsernameKeywords.forEach((user: any) => {
        it(`Test case - ${user.testName}`, () => {
            /** Input Data */
            const username = user.inputData.username;
            const userRole = user.inputData.userRole;
            const empFirstname = user.inputData.employeeFirstName;
            const empMiddlename = user.inputData.employeeMiddleName;
            const empLastname = user.inputData.employeeLastName;
            const status = user.inputData.status;
            /** Expected Data */
            const numberRecordsFound = user.expectedResult.numberRecordsFound;

            /** Test Steps */
            userManagementPage.enterUsername(username);
            userManagementPage.selectUserRole(userRole);
            userManagementPage.enterEmployeeName(empFirstname, empMiddlename, empLastname);
            userManagementPage.selectStatus(status);
            userManagementPage.clickSearchButton();

            /** Verification Steps */
            userManagementPage.verifyNumberRecordFoundMessageShouldBeCorrect(numberRecordsFound);

            /** Reset Search Page */
            userManagementPage.clickResetButton();
        })
    })

    invalidEmpNameKeywords.forEach((user: any) => {
        it(`Test case - ${user.testName}`, () => {
            /** Input Data */
            const username = user.inputData.username;
            const userRole = user.inputData.userRole;
            const empFirstname = user.inputData.employeeFirstName;
            const empMiddlename = user.inputData.employeeMiddleName;
            const empLastname = user.inputData.employeeLastName;
            const status = user.inputData.status;

            /** Expected Data */
            const errorMessage = user.expectedResult.errorMessage;
            const errorMsgColor = user.expectedResult.textColor;

            /** Test Steps */
            userManagementPage.enterUsername(username);
            userManagementPage.selectUserRole(userRole);
            userManagementPage.enterEmployeeName(empFirstname, empMiddlename, empLastname);
            userManagementPage.selectStatus(status);
            userManagementPage.clickSearchButton();

            /** Verification Steps */
            userManagementPage.verifyEmployeeErrorMessage(errorMessage);
            userManagementPage.verifyEmployeeErrorMsgColor(errorMsgColor);
            /** Reset Search Page */
            userManagementPage.clickResetButton();
        })
    })

    validSearchKeywords.forEach((user: any) => {
        it(`Test Case - ${user.testName}`, () => {
            /** Input Data */
            const username = user.inputData.username;
            const userRole = user.inputData.userRole;
            const empFirstname = user.inputData.employeeFirstName;
            const empMiddlename = user.inputData.employeeMiddleName;
            const empLastname = user.inputData.employeeLastName;
            const status = user.inputData.status;

            /** Test Steps */
            userManagementPage.enterUsername(username);
            userManagementPage.selectUserRole(userRole);
            userManagementPage.enterAndSelectEmployeeName(empFirstname, empMiddlename, empLastname);
            userManagementPage.selectStatus(status);
            userManagementPage.clickSearchButton();
            querySystemUsers(username, userRole, empFirstname, empMiddlename, empLastname, status).then((result: SystemUser[]) => {
                userManagementPage.verifySystemUserDataRowsShouldBeCorrect(result);
            });

            /** Reset Search Page */
            userManagementPage.clickResetButton();
            userManagementPage.reloadPage();
        })
    })
})
