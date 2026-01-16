import { userManagementPage } from "../../../pages/admin/userManagement/UserManagementPage.ts";
import { createAndEditUserPage } from "../../../pages/admin/userManagement/CreateAndEditUserPage.ts"
import { navigationBar } from "../../../pages/NavigationBar.ts";
import { querySystemUsers } from "../../../support/database/systemUser/user.db.ts";
import { updateSystemUser } from "../../../support/database/systemUser/user.cleanUp.ts";
import type { SystemUser } from "../../../support/database/systemUser/user.types.ts";
import invalidEditUserData from "../../../fixtures/admin/userManagement/editUser/invalidData.json" with { type: "json" };
import validEditUserData from "../../../fixtures/admin/userManagement/editUser/validData.json" with { type: "json" };
import invalidPasswords from "../../../fixtures/admin/userManagement/editUser/invalidPassword.json" with { type: "json" };

const menuItem = 'Admin';

describe('Admin - Edit User Functions - Invalid Data', () => {
    beforeEach('Login to system under Admin account, then go to Admin page', () => {
        cy.loginAsAdmin();
        navigationBar.clickMenuItem(menuItem);
    })

    invalidEditUserData.forEach((testCase: any) => {
        it(`Test case - ${testCase.testName}`, () => {

            /** Input Data */
            const usernameForSearching = testCase.inputData.usernameForSearching;
            const userRole = testCase.inputData.userRole;
            const empFirstname = testCase.inputData.employeeFirstName;
            const empMiddlename = testCase.inputData.employeeMiddleName;
            const empLastname = testCase.inputData.employeeLastName;
            const status = testCase.inputData.status;
            const username = testCase.inputData.username;

            /** Expected Data */
            const userRoleErrorMsg = testCase.expectedResult.userRoleErrorMsg;
            const employeeNameErrorMsg = testCase.expectedResult.employeeNameErrorMsg;
            const statusErrorMsg = testCase.expectedResult.statusErrorMsg;
            const usenameErrorMsg = testCase.expectedResult.usernameErrorMsg;

            /** Test Steps to search User by Username */
            userManagementPage.enterUsername(usernameForSearching);
            userManagementPage.clickSearchButton();

            /** Test Steps to edit User */
            userManagementPage.clickEditButton();

            /** Test Steps */
            createAndEditUserPage.editUserRole(userRole);
            createAndEditUserPage.editAndSelectEmployeeName(empFirstname, empMiddlename, empLastname);
            createAndEditUserPage.editStatus(status);
            createAndEditUserPage.editUsername(username);
            createAndEditUserPage.clickSaveButton();

            /** Verification Steps */
            createAndEditUserPage.verifyUserRoleErrorMessage(userRoleErrorMsg);
            createAndEditUserPage.verifyEmployeeErrorMessage(employeeNameErrorMsg);
            createAndEditUserPage.verifyStatusErrorMessage(statusErrorMsg);
            createAndEditUserPage.verifyUsernameErrorMessage(usenameErrorMsg);

            /** Cancel */

        })
    })

    invalidPasswords.forEach((user: any) => {
        it(`Test case - ${user.testName}`, () => {

            /** Input Data */
            const username = user.inputData.username;
            const password = user.inputData.password;
            const confirmPassword = user.inputData.confirmPassword;
            /** Expected Data */
            const passwordErrorMsg = user.expectedResult.passwordErrorMsg;
            const confirmPasswordErrorMsg = user.expectedResult.confirmPasswordErrorMsg;

            /** Test Steps to search User by Username */
            userManagementPage.enterUsername(username);
            userManagementPage.clickSearchButton();

            /** Test Steps to edit User */
            userManagementPage.clickEditButton();

            /** Test Steps */
            createAndEditUserPage.clickChangePasswordCheckbox();
            createAndEditUserPage.editPassword(password);
            createAndEditUserPage.editConfirmPassword(confirmPassword);
            createAndEditUserPage.clickSaveButton();

            /** Verification Steps */
            createAndEditUserPage.verifyPasswordErrorMessage(passwordErrorMsg);
            createAndEditUserPage.verifyConfimPwErrorMessage(confirmPasswordErrorMsg);

        })
    })
})

describe('Admin - Edit User Functions - Valid Data', () => {
    beforeEach('Login to system under Admin account, then go to Admin page', () => {
        cy.loginAsAdmin();
        navigationBar.clickMenuItem(menuItem);
    })

    it('Cancel editing a User', () => {
        /** Input Data */
        const usernameForSearching = validEditUserData[0]?.inputData.usernameForSearching ?? '';
        const userRole = validEditUserData[0]?.inputData?.userRole ?? '';
        const empFirstname = validEditUserData[0]?.inputData?.employeeFirstName ?? '';
        const empMiddlename = validEditUserData[0]?.inputData?.employeeMiddleName ?? '';
        const empLastname = validEditUserData[0]?.inputData?.employeeLastName ?? '';
        const status = validEditUserData[0]?.inputData?.status ?? '';
        const username = validEditUserData[0]?.inputData?.username ?? '';
        const password = validEditUserData[0]?.inputData?.password ?? '';
        const confirmPassword = validEditUserData[0]?.inputData?.confirmPassword ?? '';
        /** Expected Data */
        const pageURL = validEditUserData[0]?.expectedResult?.pageURL ?? '';

        /** Test Steps to search User by Username */
        userManagementPage.enterUsername(usernameForSearching);
        userManagementPage.clickSearchButton();

        /** Test Steps to edit User */
        userManagementPage.clickEditButton();

        /** Test Steps */
        createAndEditUserPage.selectUserRole(userRole);
        createAndEditUserPage.enterAndSelectEmployeeName(empFirstname, empMiddlename, empLastname);
        createAndEditUserPage.selectStatus(status);
        createAndEditUserPage.enterUsername(username);
        createAndEditUserPage.clickChangePasswordCheckbox();
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

    it.only('Edit a User successfully', () => {
        /** Input Data */
        const usernameForSearching = validEditUserData[1]?.inputData.usernameForSearching ?? '';
        const userRole = validEditUserData[1]?.inputData?.userRole ?? '';
        const empFirstname = validEditUserData[1]?.inputData?.employeeFirstName ?? '';
        const empMiddlename = validEditUserData[1]?.inputData?.employeeMiddleName ?? '';
        const empLastname = validEditUserData[1]?.inputData?.employeeLastName ?? '';
        const status = validEditUserData[1]?.inputData?.status ?? '';
        const password = validEditUserData[1]?.inputData?.password ?? '';
        const confirmPassword = validEditUserData[1]?.inputData?.confirmPassword ?? '';
        /** Expected Data */
        const toastTitle = validEditUserData[1]?.expectedResult?.toastTitle ?? '';
        const toastMessage = validEditUserData[1]?.expectedResult?.toastMessage ?? '';
        const pageURL = validEditUserData[1]?.expectedResult?.pageURL ?? '';

        /** Test Steps to search User by Username */
        userManagementPage.enterUsername(usernameForSearching);
        userManagementPage.clickSearchButton();

        /** Test Steps to edit User */
        userManagementPage.clickEditButton();

        /** Test Steps */
        createAndEditUserPage.selectUserRole(userRole);
        createAndEditUserPage.enterAndSelectEmployeeName(empFirstname, empMiddlename, empLastname);
        createAndEditUserPage.selectStatus(status);
        createAndEditUserPage.clickChangePasswordCheckbox();
        createAndEditUserPage.enterPassword(password);
        createAndEditUserPage.enterConfirmPassword(confirmPassword);
        createAndEditUserPage.clickSaveButton();

        /** Verification Steps in UI*/
        createAndEditUserPage.verifyToastMessageShouldBe(toastTitle, toastMessage);
        createAndEditUserPage.shouldCurrentURLContainsText(pageURL);

        /** Verification Steps in Database*/
        querySystemUsers(usernameForSearching, userRole, empFirstname, empMiddlename, empLastname, status).then((result: SystemUser[]) => {
            result.length == 1;
        });
    })


    after('Recover the editted username.', () => {
        const username = validEditUserData[1]?.inputData?.username ?? '';
        const userRoleID = 2;
        const userPassword = 'Qwerty123@';
        const status = 1;
        const empNumber = 56;
        updateSystemUser(userRoleID, userPassword, status, empNumber, username);
    })
})
