import { userManagementPage } from "../../../pages/admin/userManagement/UserManagementPage.ts";
import { createAndEditUserPage } from "../../../pages/admin/userManagement/CreateAndEditUserPage.ts"
import { navigationBar } from "../../../pages/NavigationBar.ts";
import { querySystemUsers } from "../../../support/database/systemUser/user.db.ts";
import { deleteSystemUser } from "../../../support/database/systemUser/user.cleanUp.ts";
import type { SystemUser } from "../../../support/database/systemUser/user.types.ts";
import invalidCreateUserData from "../../../fixtures/admin/userManagement/createUser/invalidData.json" with { type: "json" };
import validCreateUserData from "../../../fixtures/admin/userManagement/createUser/validData.json" with { type: "json" };

const menuItem = 'Admin';
const topbarHeaderModule = 'Admin';
const pageHeader = 'Add User';

describe('Admin - Create User Functions - Invalid Data', () => {
    beforeEach('Login to system under Admin account, then go to Admin page', () => {
        cy.loginAsAdmin();
        navigationBar.clickMenuItem(menuItem);
        userManagementPage.clickAddButton();
    })
    it('Verify Top Bar Header And Page Title of Edit User page', () => {
        createAndEditUserPage.verifyPageHeaderShouldBe(pageHeader);
        createAndEditUserPage.verifyTopbarHeaderModuleShouldBe(topbarHeaderModule);
    })

    invalidCreateUserData.forEach((user: any) => {
        it(`Test case - ${user.testName}`, () => {
            /** Input Data */
            const userRole = user.inputData.userRole;
            const empFirstname = user.inputData.employeeFirstName;
            const empMiddlename = user.inputData.employeeMiddleName;
            const empLastname = user.inputData.employeeLastName;
            const status = user.inputData.status;
            const username = user.inputData.username;
            const password = user.inputData.password;
            const confirmPassword = user.inputData.confirmPassword;
            /** Expected Data */
            const userRoleErrorMsg = user.expectedResult.userRoleErrorMsg;
            const employeeNameErrorMsg = user.expectedResult.employeeNameErrorMsg;
            const statusErrorMsg = user.expectedResult.statusErrorMsg;
            const usenameErrorMsg = user.expectedResult.usenameErrorMsg;
            const passwordErrorMsg = user.expectedResult.passwordErrorMsg;
            const confirmPasswordErrorMsg = user.expectedResult.confirmPasswordErrorMsg;
            const errorMsgColor = user.expectedResult.textColor;

            /** Test Steps */
            createAndEditUserPage.selectUserRole(userRole);
            createAndEditUserPage.enterAndSelectEmployeeName(empFirstname, empMiddlename, empLastname);
            createAndEditUserPage.selectStatus(status);
            createAndEditUserPage.enterUsername(username);
            createAndEditUserPage.enterPassword(password);
            createAndEditUserPage.enterConfirmPassword(confirmPassword);
            createAndEditUserPage.clickSaveButton();

            /** Verification Steps */
            createAndEditUserPage.verifyUserRoleErrorMessage(userRoleErrorMsg);
            createAndEditUserPage.verifyEmployeeErrorMessage(employeeNameErrorMsg);
            createAndEditUserPage.verifyStatusErrorMessage(statusErrorMsg);
            createAndEditUserPage.verifyUsernameErrorMessage(usenameErrorMsg);
            createAndEditUserPage.verifyPasswordErrorMessage(passwordErrorMsg);
            createAndEditUserPage.verifyConfimPwErrorMessage(confirmPasswordErrorMsg);

            createAndEditUserPage.verifyUserRoleErrorMsgColor(errorMsgColor);

        })
    })
})

describe.only('Admin - Create User Functions - Valid Data', () => {


    beforeEach('Login to system under Admin account, then go to Admin page', () => {
        cy.loginAsAdmin();
        navigationBar.clickMenuItem(menuItem);
        userManagementPage.clickAddButton();
    })
    it('Create a User successfully', () => {
        /** Input Data */
        const userRole = validCreateUserData[0]?.inputData?.userRole ?? '';
        const empFirstname = validCreateUserData[0]?.inputData?.employeeFirstName ?? '';
        const empMiddlename = validCreateUserData[0]?.inputData?.employeeMiddleName ?? '';
        const empLastname = validCreateUserData[0]?.inputData?.employeeLastName ?? '';
        const status = validCreateUserData[0]?.inputData?.status ?? '';
        const username = validCreateUserData[0]?.inputData?.username ?? '';
        const password = validCreateUserData[0]?.inputData?.password ?? '';
        const confirmPassword = validCreateUserData[0]?.inputData?.confirmPassword ?? '';
        /** Expected Data */
        const toastTitle = validCreateUserData[0]?.expectedResult?.toastTitle ?? '';
        const toastMessage = validCreateUserData[0]?.expectedResult?.toastMessage ?? '';
        const pageURL = validCreateUserData[0]?.expectedResult?.pageURL ?? '';
        /** Test Steps */
        createAndEditUserPage.selectUserRole(userRole);
        createAndEditUserPage.enterAndSelectEmployeeName(empFirstname, empMiddlename, empLastname);
        createAndEditUserPage.selectStatus(status);
        createAndEditUserPage.enterUsername(username);
        createAndEditUserPage.enterPassword(password);
        createAndEditUserPage.enterConfirmPassword(confirmPassword);
        createAndEditUserPage.clickSaveButton();

        /** Verification Steps in UI*/
        createAndEditUserPage.verifyToastMessageShouldBe(toastTitle, toastMessage);
        createAndEditUserPage.shouldCurrentURLContainsText(pageURL);

        /** Verification Steps in Database*/
        querySystemUsers(username, userRole, empFirstname, empMiddlename, empLastname, status).then((result: SystemUser[]) => {
            result.length == 1;
        });
    })

    it('Cancel creating a User', () => {
        /** Input Data */
        const userRole = validCreateUserData[1]?.inputData?.userRole ?? '';
        const empFirstname = validCreateUserData[1]?.inputData?.employeeFirstName ?? '';
        const empMiddlename = validCreateUserData[1]?.inputData?.employeeMiddleName ?? '';
        const empLastname = validCreateUserData[0]?.inputData?.employeeLastName ?? '';
        const status = validCreateUserData[1]?.inputData?.status ?? '';
        const username = validCreateUserData[1]?.inputData?.username ?? '';
        const password = validCreateUserData[1]?.inputData?.password ?? '';
        const confirmPassword = validCreateUserData[1]?.inputData?.confirmPassword ?? '';
        /** Expected Data */
        const pageURL = validCreateUserData[1]?.expectedResult?.pageURL ?? '';

        /** Test Steps */
        createAndEditUserPage.selectUserRole(userRole);
        createAndEditUserPage.enterAndSelectEmployeeName(empFirstname, empMiddlename, empLastname);
        createAndEditUserPage.selectStatus(status);
        createAndEditUserPage.enterUsername(username);
        createAndEditUserPage.enterPassword(password);
        createAndEditUserPage.enterConfirmPassword(confirmPassword);
        createAndEditUserPage.clickCancelButton();
        /** Verification Steps */
        createAndEditUserPage.shouldCurrentURLContainsText(pageURL);

        /** Verification Steps in Database */
        querySystemUsers(username, userRole, empFirstname, empMiddlename, empLastname, status).then((result: SystemUser[]) => {
            result.length == 0;
        });
    });

    after('Delete the created username.', () => {
        const username = validCreateUserData[0]?.inputData?.username ?? '';
        deleteSystemUser(username);
    })
})
