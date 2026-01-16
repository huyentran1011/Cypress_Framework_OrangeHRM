import { userManagementPage } from "../../../pages/admin/userManagement/UserManagementPage.ts";
import { navigationBar } from "../../../pages/NavigationBar.ts";
import { createSystemUSer } from "../../../support/database/systemUser/user.cleanUp.ts";
import type { SystemUser } from "../../../support/database/systemUser/user.types.ts";
import { createAndEditUserPage } from "../../../pages/admin/userManagement/CreateAndEditUserPage.ts";
import crudUserData from "../../../fixtures/admin/userManagement/CRUD.json" with { type: "json" };
import deleteUserData from "../../../fixtures/admin/userManagement/deleteUsers.json" with { type: "json" };
import { mapUsernameRoleID, mapUsernameStatus } from "../../../utils/mapper.ts";

const menuItem = 'Admin';

describe('Admin - User Management - Delete User Functions', () => {
    beforeEach('Login to system under Admin account, then go to Admin page', () => {
        cy.loginAsAdmin();
        navigationBar.clickMenuItem(menuItem);
    })

    it('Cancel delete user', () => {
        /** Input Data */
        const username = deleteUserData[0]?.inputData[0]?.username ?? '';

        /** Test Steps to search User by Username */
        userManagementPage.enterUsername(username);
        userManagementPage.clickSearchButton();

        /** Test Steps to cancel delete a User */
        userManagementPage.clickDeleteButton();
        userManagementPage.clickCancelDeleteButton();


        /** Test Steps to search User by Username after Canceling*/
        userManagementPage.enterUsername(username);
        userManagementPage.clickSearchButton();

        /** Verification Toast Message */
        userManagementPage.verifyNumberRecordFoundMessageShouldBeCorrect(1);
    })

    it(`Test Case - ${deleteUserData[0]?.testName}`, () => {
        /** Input Data */
        const username = deleteUserData[0]?.inputData[0]?.username ?? '';

        /** Expected Data*/
        const toastTitle = deleteUserData[0]?.expectedResult?.toastTitle ?? '';
        const toastMessage = deleteUserData[0]?.expectedResult?.toastMessage ?? '';

        /** Test Steps to search User by Username */
        userManagementPage.enterUsername(username);
        userManagementPage.clickSearchButton();

        /** Test Steps to delete User */
        userManagementPage.clickDeleteButton();
        userManagementPage.clickConfirmDeleteButton();


        /** Verification Toast Message*/
        createAndEditUserPage.verifyToastMessageShouldBe(toastTitle, toastMessage);

        /** Test Steps to search User by Username after Deleting*/
        userManagementPage.enterUsername(username);
        userManagementPage.clickSearchButton();

        /** Verification Search Result */
        userManagementPage.verifyNumberRecordFoundMessageShouldBeCorrect(0);
    })

    it(`Test Case - ${deleteUserData[1]?.testName}`, () => {
        /** Expected Data*/
        const toastTitle = deleteUserData[1]?.expectedResult?.toastTitle ?? '';
        const toastMessage = deleteUserData[1]?.expectedResult?.toastMessage ?? '';

        /** Test Steps to select and delete Users */
        deleteUserData[1]?.inputData.forEach((user: any) => {
            const username = user.username;
            userManagementPage.clickCheckboxByUsername(username);
        })

        userManagementPage.clickDeleteSelectedBtn();
        userManagementPage.clickConfirmDeleteButton();

        /** Verification Toast Message*/
        createAndEditUserPage.verifyToastMessageShouldBe(toastTitle, toastMessage);


        /** Test Steps to search User by Username after Deleting*/
        deleteUserData[1]?.inputData.forEach((user: any) => {
            const username = user.username;
            userManagementPage.enterUsername(username);
            userManagementPage.clickSearchButton();

            /** Verification Search Result */
            userManagementPage.verifyNumberRecordFoundMessageShouldBeCorrect(0);
        })

    })

    after('Recover deleted users', () => {
        deleteUserData.forEach((object: any) => {
            object.inputData.forEach((user: any) => {
                const userRoleID = mapUsernameRoleID(user.userRole);
                const empNumber = user.empNumber;
                const username = user.username;
                const userPassword = user.password;
                const status = mapUsernameStatus(user.status);
                createSystemUSer(userRoleID, empNumber, username, userPassword, status);
            })
        })
    })

})