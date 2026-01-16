import { employeeNavigationBar } from "../pages/EmployeeNavigationBar.ts";
import { contactDetailsPage } from "../pages/MyInfo/ContactDetailsPage.ts";
import { navigationBar } from "../pages/NavigationBar.ts";
import { queryEmployeeContactDetailsInfo } from "../support/database/employee/employee.db.ts";
import { restoreEmployeeContactDetails } from "../support/database/employee/employee.cleanUp.ts";

describe('Contact Details tab in My Info menu', () => {
    let editData: any, restoreData: any, userAuthData: any;
    let username = '';

    before(() => {
        cy.fixture('myInfo/contactDetails/edit').then((data) => editData = data);
        cy.fixture('myInfo/contactDetails/restore').then((data) => restoreData = data);
        cy.fixture('auth/users').then((data) => {
            userAuthData = data;
            username = userAuthData.username;
        });
    })
    beforeEach(() => {
        cy.loginAsUser();
        navigationBar.clickMenuItem('My Info');
        employeeNavigationBar.clickMenuItem('Contact Details');
    })

    it('Verify data in Contact Details page', () => {
        queryEmployeeContactDetailsInfo(username).then((result: any) => {
            const employee = result[0];
            const street1 = employee.emp_street1;
            const street2 = employee.emp_street2;
            const city = employee.city_code;
            const state = employee.provin_code;
            const zipCode = employee.emp_zipcode;
            const country = employee.name;
            const homeTelephone = employee.emp_hm_telephone;
            const workTelephone = employee.emp_work_telephone;
            const mobilePhone = employee.emp_mobile;
            const workEmail = employee.emp_work_email;
            const otherEmail = employee.emp_oth_email;

            contactDetailsPage.verifyStreet1Value(street1);
            contactDetailsPage.verifyStreet2Value(street2);
            contactDetailsPage.verifyCityValue(city);
            contactDetailsPage.verifyStateValue(state);
            contactDetailsPage.verifyZipCodeValue(zipCode);
            contactDetailsPage.verifyCountryValue(country);
            contactDetailsPage.verifyHomeTelephoneValue(homeTelephone);
            contactDetailsPage.verifyWorkTelephoneValue(workTelephone);
            contactDetailsPage.verifyMobileValue(mobilePhone);
            contactDetailsPage.verifyWorkEmailValue(workEmail);
            contactDetailsPage.verifyOtherEmailValue(otherEmail);
        });
    })

    it('Edit Contact Details information', () => {
        const messageTitle = 'Success';
        const messageContent = 'Successfully Updated';

        contactDetailsPage.inputStreet1(editData.street1);
        contactDetailsPage.inputStreet2(editData.street2);
        contactDetailsPage.inputCity(editData.city);
        contactDetailsPage.inputState(editData.state);
        contactDetailsPage.inputZipCode(editData.zipCode);
        contactDetailsPage.selectCountry(editData.country);
        contactDetailsPage.inputHomeTelephone(editData.homeTelephone);
        contactDetailsPage.inputMobile(editData.mobilePhone);
        contactDetailsPage.inputWorkTelephone(editData.workTelephone);
        contactDetailsPage.inputWorkEmail(editData.email);
        contactDetailsPage.inputOtherEmail(editData.otherEmail);
        contactDetailsPage.clickSaveButton();

        // contactDetailsPage.verifyToastMessageShouldBe(messageTitle, messageContent);
    })

    after('Restore Contact Details data', () => {
        restoreEmployeeContactDetails(username, restoreData);
    })

});

