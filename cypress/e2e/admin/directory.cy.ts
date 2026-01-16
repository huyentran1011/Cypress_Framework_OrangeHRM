import { directoryPage } from "../../pages/admin/DirectoryPage.ts";
import { navigationBar } from "../../pages/NavigationBar.ts";
import { queryDirectoryEmployee } from "../../support/database/employee/employee.db.ts";
import type { DirectoryEmployee } from "../../support/database/employee/employee.types.ts";
import validSearchKeyword from "../../fixtures/admin/directory/validSearchKeywords.json" with {type: "json"};
import invalidSearchKeyword from "../../fixtures/admin/directory/invalidSearchKeywords.json" with {type: "json"};



describe('Admin - Directory Page', () => {
    const menuItem = 'Directory';
    const pageHeader = 'Directory';

    beforeEach(() => {
        cy.loginAsAdmin();
        navigationBar.clickMenuItem(menuItem);
    })

    it('Verify Directory Page header', () => {
        directoryPage.verifyPageHeaderShouldBe(pageHeader);
    })
    invalidSearchKeyword.forEach((testCase: any) => {
        it(`Test Cases - ${testCase.testName}`, () => {
            /** Input Data */
            const empFirstname = testCase.inputData.employeeFirstName;
            const empMiddlename = testCase.inputData.employeeMiddleName;
            const empLastname = testCase.inputData.employeeLastName;
            const jobTitle = testCase.inputData.jobTitle;
            const location = testCase.inputData.location;
            /** Expected Data */
            const employeeNameErrorMsg = testCase.expectedResult.errorMessage;
            const errorMsgColor = testCase.expectedResult.textColor;

            /** Test Steps */
            directoryPage.enterEmployeeName(empFirstname, empMiddlename, empLastname);
            directoryPage.selectJobTitle(jobTitle);
            directoryPage.selectLocation(location);
            directoryPage.clickSearchButton();

            /** Verification Steps */
            directoryPage.verifyEmployeeErrorMessage(employeeNameErrorMsg);
            directoryPage.verifyEmployeeErrorMsgColor(errorMsgColor);

            /** Reset Search Page */
            directoryPage.clickResetButton();
        });
    });

    validSearchKeyword.forEach((testCase: any) => {
        it(`Test Cases - ${testCase.testName}`, () => {
            /** Input Data */
            const empFirstname = testCase.inputData.employeeFirstName;
            const empMiddlename = testCase.inputData.employeeMiddleName;
            const empLastname = testCase.inputData.employeeLastName;
            const jobTitle = testCase.inputData.jobTitle;
            const location = testCase.inputData.location;

            /** Test Steps */
            directoryPage.enterAndSelectEmployeeName(empFirstname, empMiddlename, empLastname);
            directoryPage.selectJobTitle(jobTitle);
            directoryPage.selectLocation(location);
            directoryPage.clickSearchButton();

            /** Verification Steps */
            queryDirectoryEmployee(empFirstname, empMiddlename, empLastname, jobTitle, location).then((result: DirectoryEmployee[]) => {
                directoryPage.verifyNumberRecordFoundMessageShouldBeCorrect(result.length);
                directoryPage.verifyNumberOfDirectoryCardsShouldBe(result.length);
                directoryPage.verifyDirectoryCardInfoShouldBeCorrect(result);
            })

            /** Reset Search Page */
            directoryPage.clickResetButton();
        })
    })
})