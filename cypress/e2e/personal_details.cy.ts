import { personalDetailsPage } from "../pages/MyInfo/PersonalDetailsPage.ts";
import { loginPage } from "../pages/LoginPage.ts";
import { navigationBar } from "../pages/NavigationBar.ts";

describe('Personal Details tab in My Info menu', () => {
    const username = 'anna1011';
    const password = 'Annatran1011@X';
    const disabledTbxBackgroundColor = 'rgb(100, 114, 140)'

    beforeEach(() => {
        loginPage.loginToSystem(username, password);
        navigationBar.clickMenuItem('My Info');
    })

    it('Verify default selected tab item', () => {
        const defaultTabName = 'Personal Details';
        personalDetailsPage.verifySelectedTabItemsShouldBe(defaultTabName);
        personalDetailsPage.verifySelectedTabItemBackgroundColor(disabledTbxBackgroundColor)
        personalDetailsPage.verifyTitleOfSelectTabItemShouldBe(defaultTabName);
    })

    it('Verify data in Personal Details page', { defaultCommandTimeout: 10000 }, () => {
        const sqlQuery = "SELECT t1.employee_id, t1.emp_firstname, t1.emp_middle_name, t1.emp_lastname,t1.emp_birthday,t3.name,t1.emp_gender, t1.emp_marital_status,t1.emp_dri_lice_num, t1.emp_dri_lice_exp_date FROM `hs_hr_employee` as t1 INNER JOIN `ohrm_user` as t2 ON t1.emp_number = t2.emp_number INNER JOIN `ohrm_nationality` as t3 ON t1.nation_code = t3.id WHERE t2.user_name = '" + username + "';";
        cy.task('queryDatabase', { query: sqlQuery }).then((result: any) => {
            const employee = result[0];
            const employeeId = employee.employee_id;
            const licenseExpDate = employee.emp_dri_lice_exp_date.toString().split('T')[0];
            const driverLicenseNo = employee.emp_dri_lice_num;
            const firstName = employee.emp_firstname;
            const middleName = employee.emp_middle_name;
            const lastName = employee.emp_lastname;
            const dateOfBirth = employee.emp_birthday.toString().split('T')[0];
            const nationality = employee.name;
            const maritalStatus = employee.emp_marital_status;

            const genderMap: Record<number, string> = {
                1: 'Male',
                2: 'Female',
            };

            const gender = genderMap[Number(employee.emp_gender)] ?? '';

            cy.log('Data from database: ');
            cy.log('First Name: ' + firstName);
            cy.log('Middle Name: ' + middleName);
            cy.log('Last Name: ' + lastName);
            cy.log('Employee ID: ' + employeeId);
            cy.log('License Expiry Date: ' + licenseExpDate);
            cy.log('Driver License No: ' + driverLicenseNo);
            cy.log('Nationality: ' + nationality);
            cy.log('Marital Status: ' + maritalStatus);
            cy.log('Date of Birth: ' + dateOfBirth);

            personalDetailsPage.verifyFirstNameValue(firstName);
            personalDetailsPage.verifyMiddleNameValue(middleName);
            personalDetailsPage.verifyLastNameValue(lastName);

            personalDetailsPage.verifyEmployeeIdValue(employeeId);
            personalDetailsPage.verifyEmployeeIdTbxIsDisabled();
            personalDetailsPage.verifyEmployeeIdTbxBackgroundColor(disabledTbxBackgroundColor);

            personalDetailsPage.verifyDriverLicenseNoValue(driverLicenseNo);
            personalDetailsPage.verifyDriverLicenseNoTbxIsDisabled();
            personalDetailsPage.verifyDriverLicenseNoTbxBackgroundColor(disabledTbxBackgroundColor);

            personalDetailsPage.verifyLicenseExpDateValue(licenseExpDate);

            personalDetailsPage.verifyNationalityValue(nationality);

            personalDetailsPage.verifyMaritalStatusValue(maritalStatus);

            personalDetailsPage.verifyDateOfBirthValue(dateOfBirth);
            personalDetailsPage.verifyDateOfBirthTbxIsDisabled();
            personalDetailsPage.verifyDateOfBirthTbxBackgroundColor(disabledTbxBackgroundColor);

            personalDetailsPage.verifyGenderValue(gender);
        });

    })

    it('Update information of Personal Details', () => {
        const firstName = 'Lenny';
        const middleName = 'Morgan';
        const lastName = 'Chandler';
        const licenseExpDate = '2027-12-01';
        const nationality = 'American';
        const maritalStatus = 'Married';
        const gender = 'Male';
        const messageTitle = 'Success';
        const messageContent = 'Successfully Updated';

        personalDetailsPage.inputFirstName(firstName);
        personalDetailsPage.inputMiddleName(middleName);
        personalDetailsPage.inputLastName(lastName);
        // personalDetailsPage.inputLicenseExpDate(licenseExpDate);
        personalDetailsPage.selectNationality(nationality);
        personalDetailsPage.selectMaritalStatus(maritalStatus);
        personalDetailsPage.selectGender(gender);
        personalDetailsPage.clickSaveButton();
        personalDetailsPage.verifyToastMessageShouldBe(messageTitle, messageContent);

        // Verify updated data in SQL database
        const sqlQuery = "SELECT t1.employee_id, t1.emp_firstname, t1.emp_middle_name, t1.emp_lastname,t1.emp_birthday,t3.name,t1.emp_gender, t1.emp_marital_status,t1.emp_dri_lice_num, t1.emp_dri_lice_exp_date FROM `hs_hr_employee` as t1 INNER JOIN `ohrm_user` as t2 ON t1.emp_number = t2.emp_number INNER JOIN `ohrm_nationality` as t3 ON t1.nation_code = t3.id WHERE t2.user_name = '" + username + "';";
        cy.task('queryDatabase', { query: sqlQuery }).then((result: any) => {
            const employee = result[0];
            expect(employee.emp_firstname).to.equal(firstName);
            expect(employee.emp_middle_name).to.equal(middleName);
            expect(employee.emp_lastname).to.equal(lastName);
            // expect(employee.emp_dri_lice_exp_date.toString().split('T')[0]).to.equal(licenseExpDate);
            expect(employee.name).to.equal(nationality);
            expect(employee.emp_marital_status).to.equal(maritalStatus);
            const genderMap: Record<number, string> = {
                1: 'Male',
                2: 'Female',
            };
            expect(gender).to.equal(genderMap[Number(employee.emp_gender)] ?? '');
        })
    })
    after('Restore data', () => {
        const firstName = 'Anna';
        const middleName = '';
        const lastName = 'Tran';
        const licenseExpDate = '2028-12-12';
        const nationality = 'Vietnamese';
        const maritalStatus = 'Single';
        const gender = 'Female';

        personalDetailsPage.inputFirstName(firstName);
        personalDetailsPage.inputMiddleName(middleName);
        personalDetailsPage.inputLastName(lastName);
        // personalDetailsPage.inputLicenseExpDate(licenseExpDate);
        personalDetailsPage.selectNationality(nationality);
        personalDetailsPage.selectMaritalStatus(maritalStatus);
        personalDetailsPage.selectGender(gender);
        personalDetailsPage.clickSaveButton();
    })



})