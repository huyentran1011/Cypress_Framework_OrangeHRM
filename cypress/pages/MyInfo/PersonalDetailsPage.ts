import { BasePage } from "../BasePage.ts";
import { Textbox } from "../../components/Textbox.ts";
import { RadioButton } from "../../components/RadioButton.ts";
import { DropdownMenu } from "../../components/DropdownMenu.ts";
import { Button } from "../../components/Button.ts";
import { ToastMessage } from "../../components/ToastMessage.ts";

export class PersonalDetailsPage extends BasePage {

    //** COMPONENT LOCATORS */
    employeeIdTbx = new Textbox('Employee Id');
    driverLicenseTbx = new Textbox("Driver's License Number");
    licenseExpDateTbx = new Textbox('License Expiry Date');
    dateOfBirthTbx = new Textbox('Date of Birth');
    genderRadioBtn = new RadioButton();
    nationalityDdm = new DropdownMenu('Nationality');
    maritalStatusDdm = new DropdownMenu('Marital Status');
    saveBtn = new Button('Save');
    addBtn = new Button('Add');
    toastMsg = new ToastMessage();

    //** PAGE ONLY LOCATORS */
    private tabItems() {
        return cy.get('a.orangehrm-tabs-item');
    }
    private pageTitle() {
        return cy.get('h6.orangehrm-main-title');
    }
    private firstNameTextbox() {
        return cy.get('input[name="firstName"]');
    }
    private middleNameTextbox() {
        return cy.get('input[name="middleName"]');
    }
    private lastNameTextbox() {
        return cy.get('input[name="lastName"]');
    }

    /** ACTIONS */

    inputFirstName(firstNameValue: string) {
       this.typeText(this.firstNameTextbox(), firstNameValue);
    }

    inputMiddleName(middleNameValue: string) {
        this.typeText(this.middleNameTextbox(), middleNameValue);
    }

    inputLastName(lastNameValue: string) {
        this.typeText(this.lastNameTextbox(), lastNameValue);
    }

    inputLicenseExpDate(licenseExpDate: string) {
        this.licenseExpDateTbx.type(licenseExpDate);

    }

    selectNationality(nationalityValue: string) {
        this.nationalityDdm.selectOption(nationalityValue);

    }

    selectMaritalStatus(maritalStatusValue: string) {
        this.maritalStatusDdm.selectOption(maritalStatusValue);
    }

    selectGender(gender: "Male" | "Female") {
        this.genderRadioBtn.selectByLabel(gender);
    }

    clickSaveButton() {
        this.saveBtn.click();
    }

    /** ASSERTIONS  */
    verifySelectedTabItemsShouldBe(tabName: string) {
        this.tabItems().filter('.--active')
            .should('have.text', tabName);
    }

    verifySelectedTabItemBackgroundColor(value: string) {
        this.tabItems().filter('.--active')
            .and('have.css', 'color', value);
    }

    verifyTitleOfSelectTabItemShouldBe(title: string) {
        this.pageTitle().first().should('have.text', title);
    }

    verifyFirstNameValue(firstName: string) {
        return this.firstNameTextbox()
            .should(($el) => {
                const value = $el.val();
                expect(value).to.equal(firstName);
            });
    }

    verifyMiddleNameValue(middleName: string) {
        return this.middleNameTextbox()
            .should(($el) => {
                const value = $el.val();
                expect(value).to.equal(middleName);
            });
    }

    verifyLastNameValue(lastName: string) {
        return this.lastNameTextbox()
            .should(($el) => {
                const value = $el.val();
                expect(value).to.equal(lastName);
            });
    }

    verifyEmployeeIdTbxIsDisabled() {
        this.employeeIdTbx.shouldBeDisabled();
    }

    verifyEmployeeIdTbxBackgroundColor(color: string) {
        this.employeeIdTbx.shouldHaveBackgroundColor(color);
    }

    verifyEmployeeIdValue(employeeIdValue: string) {
        this.employeeIdTbx.shouldHaveValue(employeeIdValue);
    }

    verifyDriverLicenseNoTbxIsDisabled() {
        this.driverLicenseTbx.shouldBeDisabled();
    }

    verifyDriverLicenseNoTbxBackgroundColor(color: string) {
        this.driverLicenseTbx.shouldHaveBackgroundColor(color);
    }

    verifyDriverLicenseNoValue(driverLicenseNo: string) {
        this.driverLicenseTbx.shouldHaveValue(driverLicenseNo);
    }

    verifyLicenseExpDateValue(expDate: string) {
        this.licenseExpDateTbx.shouldHaveValue(expDate);
    }

    verifyNationalityValue(nationality: string) {
        this.nationalityDdm.shouldHaveValue(nationality);
    }

    verifyMaritalStatusValue(maritalStatus: string) {
        this.maritalStatusDdm.shouldHaveValue(maritalStatus);
    }

    verifyDateOfBirthValue(dateOfBirth: string) {
        this.dateOfBirthTbx.shouldHaveValue(dateOfBirth);
    }

    verifyDateOfBirthTbxIsDisabled() {
        this.dateOfBirthTbx.shouldBeDisabled();
    }

    verifyDateOfBirthTbxBackgroundColor(color: string) {
        this.dateOfBirthTbx.shouldHaveBackgroundColor(color);
    }

    verifyGenderValue(gender: string) {
        this.genderRadioBtn.shouldBeChecked(gender);
    }

    verifyToastMessageShouldBe(title: string, message: string) {
        this.toastMsg.shouldHaveTitle(title);
        this.toastMsg.shouldHaveMessage(message);
    }
}

export const personalDetailsPage = new PersonalDetailsPage();