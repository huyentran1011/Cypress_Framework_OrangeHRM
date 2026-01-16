import { userManagementPage } from "../../../pages/admin/userManagement/UserManagementPage.ts";
import { navigationBar } from "../../../pages/NavigationBar.ts";
import { querySystemUsers } from "../../../support/database/systemUser/user.db.ts";
import { createSystemUSer } from "../../../support/database/systemUser/user.cleanUp.ts";
import type { SystemUser } from "../../../support/database/systemUser/user.types.ts";
import { createAndEditUserPage } from "../../../pages/admin/userManagement/CreateAndEditUserPage.ts";
import invalidUsernameKeywords from "../../../fixtures/admin/userManagement/searchUser/invalidUsernameKeywords.json" with {type: "json"};
import invalidEmpNameKeywords from "../../../fixtures/admin/userManagement/searchUser/invalidEmpNameKeywords.json" with {type: "json"};
import validSearchKeywords from "../../../fixtures/admin/userManagement/searchUser/validSearchKeywords.json" with {type: "json"};
import crudUserData from "../../../fixtures/admin/userManagement/CRUD.json" with { type: "json" };
import deleteUserData from "../../../fixtures/admin/userManagement/deleteUsers.json" with { type: "json" };
import { mapUsernameRoleID, mapUsernameStatus } from "../../../utils/mapper.ts";

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

describe('Admin - User Management - CRUD a Users', () => {

    /** Input Data For Create New User*/
    const userRoleForCreate = crudUserData?.inputDataForCreateUser?.userRole ?? '';
    const empFirstnameForCreate = crudUserData?.inputDataForCreateUser?.employeeFirstName ?? '';
    const empMiddlenameForCreate = crudUserData?.inputDataForCreateUser?.employeeMiddleName ?? '';
    const empLastnameForCreate = crudUserData?.inputDataForCreateUser?.employeeLastName ?? '';
    const statusForCreate = crudUserData?.inputDataForCreateUser?.status ?? '';
    const usernameForCreate = crudUserData?.inputDataForCreateUser?.username ?? '';
    const passwordForCreate = crudUserData?.inputDataForCreateUser?.password ?? '';
    const confirmPasswordForCreate = crudUserData?.inputDataForCreateUser?.confirmPassword ?? '';

    /** Expected Data For Create New User*/
    const toastTitleAfterCreate = crudUserData?.expectedResultForCreateUser?.toastTitle ?? '';
    const toastMessageAfterCreate = crudUserData?.expectedResultForCreateUser?.toastMessage ?? '';
    const pageURLAfterCreate = crudUserData?.expectedResultForCreateUser?.pageURL ?? '';
    const searchResultAfterCreate: SystemUser[] = [{
        username: usernameForCreate,
        userRole: userRoleForCreate,
        employeeName: `${empFirstnameForCreate} ${empLastnameForCreate}`,
        status: mapUsernameStatus(statusForCreate),
    }];

    /** Input Data For Edit User*/
    const userRoleForEdit = crudUserData?.inputDataForEditUser?.userRole ?? '';
    const usernameForEdit = crudUserData?.inputDataForEditUser?.username ?? '';
    const empFirstnameForEdit = crudUserData?.inputDataForEditUser?.employeeFirstName ?? '';
    const empLastnameForEdit = crudUserData?.inputDataForEditUser?.employeeLastName ?? '';
    const statusForEdit = crudUserData?.inputDataForEditUser?.status ?? '';

    /** Expected Data For Edit User*/
    const toastTitleAfterEdit = crudUserData?.expectedResultForEditUser?.toastTitle ?? '';
    const toastMessageAfterEdit = crudUserData?.expectedResultForEditUser?.toastMessage ?? '';
    const pageURLAfterEdit = crudUserData?.expectedResultForEditUser?.pageURL ?? '';
    const searchResultAfterEdit: SystemUser[] = [{
        username: usernameForEdit,
        userRole: userRoleForEdit,
        employeeName: `${empFirstnameForEdit} ${empLastnameForEdit}`,
        status: mapUsernameStatus(statusForEdit),
    }];

    /** Expected Data For Delete User*/
    const toastTitleAfterDelete = crudUserData?.expectedResultForDeleteUser?.toastTitle ?? '';
    const toastMessageAfterDelete = crudUserData?.expectedResultForDeleteUser?.toastMessage ?? '';

    /** Expected Data For Searching User Not Found*/
    const toastTitleNoRecordFound = crudUserData?.expectedResultForSearchingDeletedUser?.toastTitle ?? '';
    const toastMessageNoRecordFound = crudUserData?.expectedResultForSearchingDeletedUser?.toastMessage ?? '';

    beforeEach('Login to system under Admin account, then go to Admin page', () => {
        cy.loginAsAdmin();
        navigationBar.clickMenuItem(menuItem);
    })

    it('Create a User', () => {
        /** Access to Add User Page */
        userManagementPage.clickAddButton();

        /** Test Steps */
        createAndEditUserPage.selectUserRole(userRoleForCreate);
        createAndEditUserPage.enterAndSelectEmployeeName(empFirstnameForCreate, empMiddlenameForCreate, empLastnameForCreate);
        createAndEditUserPage.selectStatus(statusForCreate);
        createAndEditUserPage.enterUsername(usernameForCreate);
        createAndEditUserPage.enterPassword(passwordForCreate);
        createAndEditUserPage.enterConfirmPassword(confirmPasswordForCreate);
        createAndEditUserPage.clickSaveButton();
        // createUserPage.createNewUser(userRole, empFirstname, empMiddlename, empLastname, status, username, password, confirmPassword);

        /** Verification Steps in UI*/
        createAndEditUserPage.verifyToastMessageShouldBe(toastTitleAfterCreate, toastMessageAfterCreate);

        /** Verification Steps */
        createAndEditUserPage.shouldCurrentURLContainsText(pageURLAfterCreate);
    })

    it('Read a User', () => {
        /** Test Steps */
        userManagementPage.enterUsername(usernameForCreate);
        userManagementPage.clickSearchButton();

        /** Verification Steps */
        userManagementPage.verifySystemUserDataRowsShouldBeCorrect(searchResultAfterCreate);
    })

    it('Update a User', () => {
        /** Test Steps to search User by Username */
        userManagementPage.enterUsername(usernameForCreate);
        userManagementPage.clickSearchButton();

        /** Test Steps to edit User */
        userManagementPage.clickEditButton();
        createAndEditUserPage.selectUserRole(userRoleForEdit);
        createAndEditUserPage.enterUsername(usernameForEdit);
        createAndEditUserPage.clickSaveButton();

        /** Verification Toast Message*/
        createAndEditUserPage.verifyToastMessageShouldBe(toastTitleAfterEdit, toastMessageAfterEdit);

        /** Verification Steps for URL after Editting */
        createAndEditUserPage.shouldCurrentURLContainsText(pageURLAfterEdit);

        /** Test Steps to Search User after Editting */
        userManagementPage.enterUsername(usernameForEdit);
        userManagementPage.clickSearchButton();

        /** Verification Steps for Search Result */
        userManagementPage.verifySystemUserDataRowsShouldBeCorrect(searchResultAfterEdit);
    })

    it('Delete a User', () => {
        /** Test Steps to search User by Username */
        userManagementPage.enterUsername(usernameForEdit);
        userManagementPage.clickSearchButton();

        /** Test Steps to delete User */
        userManagementPage.clickDeleteButton();
        userManagementPage.clickConfirmDeleteButton();


        /** Verification Toast Message*/
        createAndEditUserPage.verifyToastMessageShouldBe(toastTitleAfterDelete, toastMessageAfterDelete);

        /** Test Steps to search User by Username after Deleting*/
        userManagementPage.enterUsername(usernameForEdit);
        userManagementPage.clickSearchButton();

        /** Verification Toast Message*/
        userManagementPage.verifyToastMessageShouldBe(toastTitleNoRecordFound, toastMessageNoRecordFound);
        userManagementPage.verifyNumberRecordFoundMessageShouldBeCorrect(0);

    })
})