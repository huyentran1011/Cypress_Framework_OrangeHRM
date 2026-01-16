import { maintenanceLoginPage } from "../../../pages/admin/maintenance/MaintenanceLoginPage.ts";
import { loginPage } from "../../../pages/LoginPage.ts";
import { navigationBar } from "../../../pages/NavigationBar.ts";
import { topBar } from "../../../pages/TopBar.ts";
import adminAuthData from "../../../fixtures/auth/admin.json" with {type: "json"};

describe('Maintenance Page', () => {

    const username = adminAuthData.username;
    const password = adminAuthData.password;
    const wrongPassword = '12345';
    const menuItem = 'Maintenance';
    const pageHeader = 'Maintenance';
    const pageTitle = 'Administrator Access';
    const pageMessage = 'You have requested to access a critical Administrator function in OrangeHRM and are required to validate your credentials below';
    const errorMessage = 'Required';
    const cridentialMessage = 'Invalid credentials';
    const errorMsgColor = "rgb(235, 9, 16)";

    beforeEach(() => {
        loginPage.loginToSystem(username, password);
        navigationBar.clickMenuItem(menuItem);
    })

    it('Verify Maintenance Login page', () => {
        /** Verification Steps */
        maintenanceLoginPage.verifyPageTitleShouldHaveValue(pageTitle);
        maintenanceLoginPage.verifyPageMessageShouldHaveValue(pageMessage);
        maintenanceLoginPage.verifyUsernameShouldBeDisabled();
        maintenanceLoginPage.verifyUsernameShouldHaveValue(username);
        maintenanceLoginPage.verifyPasswordShouldBeEnable();
        maintenanceLoginPage.verifyPasswordShouldBeEmpty();
    })

    it('Login with blank password', () => {
        /** Test Steps */
        maintenanceLoginPage.clickConfirmButton();

        /** Verification Steps */
        maintenanceLoginPage.verifyPasswordErrorMessage(errorMessage);
        maintenanceLoginPage.verifyPasswordErrorMsgColor(errorMsgColor);

    })

    it('Login with wrong password', () => {
        /** Test Steps */
        maintenanceLoginPage.enterPassword(wrongPassword);
        maintenanceLoginPage.clickConfirmButton();

        /** Verification Steps */
        maintenanceLoginPage.verifyInvalidCredentialsMessage(cridentialMessage);
        maintenanceLoginPage.verifyInvalidCredentialsMsgColor(errorMsgColor);
    })

    it('Login with right password', () => {
        /** Test Steps */
        maintenanceLoginPage.enterPassword(password);
        maintenanceLoginPage.clickConfirmButton();

        /** Verification Steps */
        topBar.verifyPageHeaderShouldBe(pageHeader);

    })
})