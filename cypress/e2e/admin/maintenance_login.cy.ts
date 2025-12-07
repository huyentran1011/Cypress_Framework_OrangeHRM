import { maintenanceLoginPage } from "../../pages/admin/MaintenanceLoginPage.ts";
import { loginPage } from "../../pages/LoginPage.ts";
import { navigationBar } from "../../pages/NavigationBar.ts";
import { topBar } from "../../pages/TopBar.ts";

describe('Maintenance Page', () => {

    const username = 'automationfc';
    const password = 'orangehrm5@X';
    const wrongPassword = '12345';
    const menuItem = 'Maintenance';
    const pageHeader = 'Maintenance';
    const pageTitle = 'Administrator Access';
    const pageMessage = 'You have requested to access a critical Administrator function in OrangeHRM and are required to validate your credentials below';

    beforeEach(() => {
        loginPage.loginToSystem(username, password);
        navigationBar.clickMenuItem(menuItem);
    })

    it('Verify Maintenance Login page', () => {
        maintenanceLoginPage.verifyPageTitleShouldHaveValue(pageTitle);
        maintenanceLoginPage.verifyPageMessageShouldHaveValue(pageMessage);
        maintenanceLoginPage.verifyUsernameShouldBeDisabled();
        maintenanceLoginPage.verifyUsernameShouldHaveValue(username);
        maintenanceLoginPage.verifyPasswordShouldBeEnable();
        maintenanceLoginPage.verifyPasswordShouldBeEmpty();
    })

    it('Login with blank password', () => {
        maintenanceLoginPage.clickConfirmButton();
    })

    it('Login with wrong password', () => {
        maintenanceLoginPage.enterPassword(wrongPassword);
        maintenanceLoginPage.clickConfirmButton();
    })

    it('Login with right password', () => { 
        maintenanceLoginPage.enterPassword(password);
        maintenanceLoginPage.clickConfirmButton();
        topBar.verifyPageHeaderShouldBe(pageHeader);

    })
})