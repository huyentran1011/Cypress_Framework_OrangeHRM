import { accessRecordsPage } from "../../../pages/admin/maintenance/AccessRecordsPage.ts";
import { maintenanceLoginPage } from "../../../pages/admin/maintenance/MaintenanceLoginPage.ts";
import { loginPage } from "../../../pages/LoginPage.ts";
import { navigationBar } from "../../../pages/NavigationBar.ts";
import adminAuthData from "../../../fixtures/auth/admin.json" with {type: "json"};
import validEmpName from "../../../fixtures/admin/maintenance/accessRecords/validEmployeeName.json" with {type: "json"};
import invalidEmpName from "../../../fixtures/admin/maintenance/accessRecords/invalidEmployeeName.json" with {type: "json"};


describe('Maintenance Page', () => {

    const username = adminAuthData.username;
    const password = adminAuthData.password;
    const menuItem = 'Maintenance';

    beforeEach(() => {
        loginPage.loginToSystem(username, password);
        navigationBar.clickMenuItem(menuItem);
        maintenanceLoginPage.enterPassword(password);
        maintenanceLoginPage.clickConfirmButton();
    })

    validEmpName.forEach((testCase: any) => {
        it(`Test Case - ${testCase.testName}`, () => {
            /** Input Data */
            const empFirstname = testCase.inputData.employeeFirstName;
            const empMiddlename = testCase.inputData.employeeMiddleName;
            const empLastname = testCase.inputData.employeeLastName;

            /** Expected Data */
            const employeeID = testCase.expectedResult.employeeID;

            /** Test Steps */
            accessRecordsPage.clickAccessRecordsTab();
            accessRecordsPage.verifyPageHeaderShouldBe('Download Personal Data');
            accessRecordsPage.enterAndSelectEmployeeName(empFirstname, empMiddlename, empLastname)
            accessRecordsPage.clickSearchButton();

            /** Verification Steps */
            accessRecordsPage.verifySelectedEmployeeFirstNameShouldHaveValue(empFirstname);
            accessRecordsPage.verifySelectedEmployeeFirstNameTbxShouldBeDisabled();
            accessRecordsPage.verifySelectedEmployeeMiddleNameShouldHaveValue(empMiddlename);
            accessRecordsPage.verifySelectedEmployeeMiddleNameTbxShouldBeDisabled();
            accessRecordsPage.verifySelectedEmployeeLastNameShouldHaveValue(empLastname);
            accessRecordsPage.verifySelectedEmployeeLastNameTxbShouldBeDisabled();
            accessRecordsPage.verifySelectedEmployeeIdShouldHaveValue(employeeID);
            accessRecordsPage.verifySelectedEmployeeIdTbxShouldBeDisabled();

        })
    })

    invalidEmpName.forEach((testCase: any) => {
        it(`Test Case - ${testCase.testName}`, () => {
            /** Input Data */
            const empFirstname = testCase.inputData.employeeFirstName;
            const empMiddlename = testCase.inputData.employeeMiddleName;
            const empLastname = testCase.inputData.employeeLastName;

            /** Expected Data */
            const errorMessage = testCase.expectedResult.errorMsg;
            const errorMsgColor = testCase.expectedResult.textColor;

            /** Test Steps */
            accessRecordsPage.clickAccessRecordsTab();
            accessRecordsPage.enterEmployeeName(empFirstname, empMiddlename, empLastname);
            accessRecordsPage.clickSearchButton();

            /** Verification Steps */
            accessRecordsPage.verifyEmployeeNameErrorMessage(errorMessage);
            accessRecordsPage.verifyEmployeeNameErrorMsgColor(errorMsgColor);
            accessRecordsPage.verifySelectedEmployeeFirstNameTbxShouldBeNotDisplayed();
            accessRecordsPage.verifySelectedEmployeeMiddleNameTbxShouldBeNotDisplayed();
            accessRecordsPage.verifySelectedEmployeeLastNameTbxShouldBeNotDisplayed();
            accessRecordsPage.verifySelectedEmplyeeIDTbxShouldBeNotDisplayed();
        })
    })

})