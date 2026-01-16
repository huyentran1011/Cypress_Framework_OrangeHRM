import { userManagementPage } from "../../../pages/admin/userManagement/UserManagementPage.ts";
import { navigationBar } from "../../../pages/NavigationBar.ts";
import type { SystemUser } from "../../../support/database/systemUser/user.types.ts";
import { createAndEditUserPage } from "../../../pages/admin/userManagement/CreateAndEditUserPage.ts";
import crudUserData from "../../../fixtures/admin/userManagement/CRUD.json" with { type: "json" };
import { mapUsernameStatus } from "../../../utils/mapper.ts";

const menuItem = 'Admin';
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