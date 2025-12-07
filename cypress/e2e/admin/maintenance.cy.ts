import { MaintenancePage, maintenancePage } from "../../pages/admin/MaintenancePage.ts";
import { maintenanceLoginPage } from "../../pages/admin/MaintenanceLoginPage.ts";
import { loginPage } from "../../pages/LoginPage.ts";
import { navigationBar } from "../../pages/NavigationBar.ts";

describe('Maintenance Page', () => {

    const username = 'automationfc';
    const password = 'orangehrm5@X';
    const employeeFirstName = 'Anna';
    const employeeMiddleName = '';
    const employeeLastName = 'Le';
    const fullEmployeeName = `${employeeFirstName} ${employeeLastName}`.trim();
    const employeeID = '0116';

    beforeEach(() => {
        loginPage.loginToSystem(username, password);
        navigationBar.clickMenuItem('Maintenance');
        maintenanceLoginPage.enterPassword(password);
        maintenanceLoginPage.clickConfirmButton();
    })

    it('Verify default state of Maintenance Page', () => {
        maintenancePage.verifyPageHeaderShouldBe('Purge Employee Records');
    })

    it('Search employee at Access Records page with valid name', () => {
        maintenancePage.clickAccessRecordsTab();
        maintenancePage.verifyPageHeaderShouldBe('Download Personal Data');
        maintenancePage.enterEmployeeName(employeeFirstName);
        maintenancePage.selectEmployeeFromList(fullEmployeeName);
        maintenancePage.clickSearchButton();
        maintenancePage.verifySelectedEmployeeFirstNameShouldHaveValue(employeeFirstName);
        maintenancePage.verifySelectedEmployeeFirstNameTbxShouldBeDisabled();
        maintenancePage.verifySelectedEmployeeMiddleNameShouldHaveValue(employeeMiddleName);
        maintenancePage.verifySelectedEmployeeMiddleNameTbxShouldBeDisabled();
        maintenancePage.verifySelectedEmployeeLastNameShouldHaveValue(employeeLastName);
        maintenancePage.verifySelectedEmployeeLastNameTxbShouldBeDisabled();
        maintenancePage.verifySelectedEmployeeIdShouldHaveValue(employeeID);
        maintenancePage.verifySelectedEmployeeIdTbxShouldBeDisabled();

    })

    it('Search employee at Access Records page with invalid name', () => {
        maintenancePage.clickAccessRecordsTab();
        maintenancePage.enterEmployeeName(employeeFirstName);
        maintenancePage.clickSearchButton();
        maintenancePage.verifySelectedEmployeeFirstNameTbxShouldBeNotDisplayed();
        maintenancePage.verifySelectedEmployeeMiddleNameTbxShouldBeNotDisplayed();
        maintenancePage.verifySelectedEmployeeLastNameTbxShouldBeNotDisplayed();
        maintenancePage.verifySelectedEmplyeeIDTbxShouldBeNotDisplayed();
    })
})