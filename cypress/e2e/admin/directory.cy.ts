import { directoryPage } from "../../pages/admin/DirectoryPage.ts";
import { loginPage } from "../../pages/LoginPage.ts";
import { navigationBar } from "../../pages/NavigationBar.ts";

describe('Admin - Directory Page', () => {
    const username = 'automationfc';
    const password = 'orangehrm5@X';
    const menuItem = 'Directory';
    const pageHeader = 'Directory';

    const errorMsgColor = 'rgb(235, 9, 16)';
    const employeeNameErrorMsg = 'Invalid';


    beforeEach(() => {
        loginPage.loginToSystem(username, password);
        navigationBar.clickMenuItem(menuItem);
    })

    it('Verify Directory Page header', () => {
        directoryPage.verifyPageHeaderShouldBe(pageHeader);
    })

    it('Search with invalid employee name', () => {
        const invalidEmployeeName = 'John Wick';
        const jobTitle = 'Java Developer';
        const location = 'Dallas Branch';
        directoryPage.enterEmployeeName(invalidEmployeeName);
        directoryPage.selectJobTitle(jobTitle);
        directoryPage.selectLocation(location);
        directoryPage.clickSearchButton();
        directoryPage.verifyEmployeeErrorMessage(employeeNameErrorMsg);
        directoryPage.verifyEmployeeErrorMsgColor(errorMsgColor);
    })

    it('Search with only Job Titles', () => {
        const jobTitle = 'Java Developer';
        const numberOfExpectedRecords = 4;

        directoryPage.selectJobTitle(jobTitle);
        directoryPage.clickSearchButton();
        directoryPage.verifyNumberRecordFoundMessageShouldBeCorrect(numberOfExpectedRecords);
        directoryPage.verifyNumberOfDirectoryCardsShouldBe(numberOfExpectedRecords);
        directoryPage.verifyAllDirectoryCardsShouldHaveJobTitle(jobTitle);
    })


    it('Search with only Location', () => {
        const location = 'Dallas Branch';
        const numberOfExpectedRecords = 30;

        directoryPage.selectLocation(location);
        directoryPage.clickSearchButton();
        directoryPage.verifyNumberRecordFoundMessageShouldBeCorrect(numberOfExpectedRecords);
        directoryPage.verifyNumberOfDirectoryCardsShouldBe(numberOfExpectedRecords);
        directoryPage.verifyAllDirectoryCardsShouldHaveLocation(location);
    })

    it('Search with only valid Employee Name', () => {
        const validEmployeeFirstName = 'Andrew';
        const validEmployeeMiddleName = '';
        const validEmployeeLastName = 'Anderson';
        const searchResult = [{
            employeeFullName: "Andrew  Anderson",
            subTitle: 'Sales',
            department: 'DC3',
            location: 'Dallas Branch'
        }]

        directoryPage.enterAndSelectEmployeeName(validEmployeeFirstName, validEmployeeMiddleName, validEmployeeLastName);
        directoryPage.clickSearchButton();
        directoryPage.verifyNumberRecordFoundMessageShouldBeCorrect(searchResult.length);
        directoryPage.verifyNumberOfDirectoryCardsShouldBe(searchResult.length);
        directoryPage.verifyDirectoryCardInfoShouldBeCorrect(searchResult);
    })

    it('Search with only valid Employee Name, subTitle and Location', () => {
        const validEmployeeFirstName = 'Andrew';
        const validEmployeeMiddleName = '';
        const validEmployeeLastName = 'Anderson';
        const jobTitle = 'Sales';
        const location = 'Dallas Branch';

        const searchResult = [{
            employeeFullName: "Andrew  Anderson",
            subTitle: 'Sales',
            department: 'DC3',
            location: 'Dallas Branch'
        }]

        directoryPage.enterAndSelectEmployeeName(validEmployeeFirstName, validEmployeeMiddleName, validEmployeeLastName);
        directoryPage.selectJobTitle(jobTitle);
        directoryPage.selectLocation(location);
        directoryPage.clickSearchButton();
        directoryPage.verifyNumberRecordFoundMessageShouldBeCorrect(searchResult.length);
        directoryPage.verifyNumberOfDirectoryCardsShouldBe(searchResult.length);
        directoryPage.verifyDirectoryCardInfoShouldBeCorrect(searchResult);
    })
})