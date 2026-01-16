import { BasePage } from "../BasePage.ts";
import { Textbox } from "../../components/Textbox.ts";
import { DropdownMenu } from "../../components/DropdownMenu.ts";
import { Button } from "../../components/Button.ts";
import { ToastMessage } from "../../components/ToastMessage.ts";
import { ultils } from "../../utils/utilities.ts";

export class ContactDetailsPage extends BasePage {
    /** COMPONENT LOCATORS */
    street1Tbx = new Textbox('Street 1');
    street2Tbx = new Textbox('Street 2');
    cityTbx = new Textbox('City');
    stateTbx = new Textbox('State/Province');
    zipCodeTbx = new Textbox('Zip/Postal Code');
    countryDdm = new DropdownMenu('Country');
    homeTelephoneTbx = new Textbox('Home');
    mobileTbx = new Textbox('Mobile');
    workTelephoneTbx = new Textbox('Work');
    workEmailTbx = new Textbox('Work Email');
    otherEmailTbx = new Textbox('Other Email');
    saveBtn = new Button('Save');
    toastMsg = new ToastMessage();

    /** ACTIONS */

    inputStreet1(street1Value: string) {
        this.street1Tbx.type(street1Value);
    }

    inputStreet2(street2Value: string) {
        this.street2Tbx.type(street2Value);
    }

    inputCity(cityValue: string) {
        this.cityTbx.type(cityValue);
    }

    inputState(stateValue: string) {
        this.stateTbx.type(stateValue);
    }

    inputZipCode(zipCodeValue: string) {
        this.zipCodeTbx.type(zipCodeValue);
    }

    selectCountry(countryValue: string) {
        this.countryDdm.selectOption(countryValue);
    }

    inputHomeTelephone(homeTelephoneValue: string) {
        this.homeTelephoneTbx.type(homeTelephoneValue);
    }

    inputMobile(mobileValue: string) {
        this.mobileTbx.type(mobileValue);
    }

    inputWorkTelephone(workTelephoneValue: string) {
        this.workTelephoneTbx.type(workTelephoneValue);
    }

    inputWorkEmail(workEmailValue: string) {
        this.workEmailTbx.type(workEmailValue);
    }

    inputOtherEmail(otherEmailValue: string) {
        this.otherEmailTbx.type(otherEmailValue);
    }

    clickSaveButton() {
        this.saveBtn.click();
    }

    /** ASSERTIONS  */

    verifyStreet1Value(street1: string) {
        street1 === null || street1 === undefined ? street1 = '' : street1;
        this.street1Tbx.shouldHaveValue(street1);
    }

    verifyStreet2Value(street2: string) {
        street2 === null || street2 === undefined ? street2 = '' : street2;
        this.street2Tbx.shouldHaveValue(street2);
    }

    verifyCityValue(city: string) {
        city === null || city === undefined ? city = '' : city;
        this.cityTbx.shouldHaveValue(city);
    }

    verifyStateValue(state: string) {
        state === null || state === undefined ? state = '' : state;
        this.stateTbx.shouldHaveValue(state);
    }

    verifyZipCodeValue(zipCode: string) {
        zipCode === null || zipCode == undefined ? zipCode = '' : zipCode;
        this.zipCodeTbx.shouldHaveValue(zipCode);
    }

    verifyCountryValue(country: string) {
        country = ultils.lowerCaseExceptFirst(country);
        this.countryDdm.shouldHaveValue(country);
    }

    verifyHomeTelephoneValue(homeTelephone: string) {
        homeTelephone === null || homeTelephone == undefined? homeTelephone = '' : homeTelephone;
        this.homeTelephoneTbx.shouldHaveValue(homeTelephone);
    }

    verifyMobileValue(mobile: string) {
        mobile === null || mobile == undefined ? mobile = '' : mobile;
        this.mobileTbx.shouldHaveValue(mobile);
    }

    verifyWorkTelephoneValue(workTelephone: string) {
        workTelephone === null || workTelephone == undefined? workTelephone = '' : workTelephone;
        this.workTelephoneTbx.shouldHaveValue(workTelephone);
    }

    verifyWorkEmailValue(workEmail: string) {
        workEmail === null || workEmail == undefined ? workEmail = '' : workEmail;
        this.workEmailTbx.shouldHaveValue(workEmail);
    }

    verifyOtherEmailValue(otherEmail: string) {
        otherEmail === null || otherEmail == undefined ? otherEmail = '' : otherEmail;
        this.otherEmailTbx.shouldHaveValue(otherEmail);
    }

    verifyToastMessageShouldBe(title: string, message: string) {
        this.toastMsg.shouldHaveTitle(title);
        this.toastMsg.shouldHaveMessage(message);
    }
}

export const contactDetailsPage = new ContactDetailsPage();
