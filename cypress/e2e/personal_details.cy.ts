import { personalDetailsPage } from "../pages/MyInfo/PersonalDetailsPage.ts";
import { navigationBar } from "../pages/NavigationBar.ts";
import { mapGender } from "../utils/mapper.ts";
import { restoreEmployeePersonalDetails } from "../support/database/employee/employee.cleanUp.ts";
import { queryEmployeePersonalDetailsInfo } from "../support/database/employee/employee.db.ts";
import editData  from "../fixtures/myInfo/personalDetails/edit.json" with {type: "json"};
import restoreData  from "../fixtures/myInfo/personalDetails/restore.json" with {type: "json"};
import userAuthData from "../fixtures/auth/users.json" with {type: "json"};

describe('Personal Details tab in My Info menu', () => {
    let username = userAuthData.username;
    const disabledTbxBackgroundColor = 'rgb(100, 114, 140)';

    beforeEach(() => {
        cy.loginAsUser();
        navigationBar.clickMenuItem('My Info');
    })

    it('Verify default selected tab item', () => {
        const defaultTabName = 'Personal Details';
        personalDetailsPage.verifySelectedTabItemsShouldBe(defaultTabName);
        personalDetailsPage.verifySelectedTabItemBackgroundColor(disabledTbxBackgroundColor)
        personalDetailsPage.verifyTitleOfSelectTabItemShouldBe(defaultTabName);
    })

    it('Verify data in Personal Details page', () => {
        queryEmployeePersonalDetailsInfo(username).then((result: any) => {
            /** Expected Data From Database */
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
            const gender = mapGender(employee.emp_gender);

            /** Verification Steps */
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
        /** Expected Message */
        const messageTitle = 'Success';
        const messageContent = 'Successfully Updated';

        /** Test Steps */
        personalDetailsPage.inputFirstName(editData.firstName);
        personalDetailsPage.inputMiddleName(editData.middleName);
        personalDetailsPage.inputLastName(editData.lastName);
        // personalDetailsPage.inputLicenseExpDate(licenseExpDate);
        personalDetailsPage.selectNationality(editData.nationality);
        personalDetailsPage.selectMaritalStatus(editData.maritalStatus);
        personalDetailsPage.selectGender(mapGender(editData.gender));
        personalDetailsPage.clickSaveButton();
        personalDetailsPage.verifyToastMessageShouldBe(messageTitle, messageContent);

        /** Verification Steps in Database*/
        queryEmployeePersonalDetailsInfo(username).then((result:any) => {
            const employee = result[0];
            const empFirstname = employee.emp_firstname;
            const empMiddlename = employee.emp_middle_name;
            const empLastname = employee.emp_lastname;
            const nationality = employee.name;
            const maritialStatus = employee.emp_marital_status;
            const gender = employee.emp_gender;
            expect(empFirstname).to.equal(editData.firstName);
            expect(empMiddlename).to.equal(editData.middleName);
            expect(empLastname).to.equal(editData.lastName);
            expect(nationality).to.equal(editData.nationality);
            expect(maritialStatus).to.equal(editData.maritalStatus);
            expect(gender).to.equal(editData.gender);

        })
    });
    after('Restore Personal Details of Employee after updating.', () => {
        restoreEmployeePersonalDetails(username, restoreData);
    })
})  