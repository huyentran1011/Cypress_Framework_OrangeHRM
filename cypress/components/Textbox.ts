
export class Textbox {

    constructor(private labelText: string) { }

    private root() {
        return cy.contains('label', this.labelText)
            .closest('div.oxd-input-group');
    }

    private input() {
        // return this.root().find('input.oxd-input--active');
        return this.root().find('input');
    }

    private errorMessage(){
        return this.root().children('span.oxd-input-field-error-message');
    }

    type(value: string) {
        return this.input()
            .clear()
            .type(value);
    }

    shouldHaveValue(expectedValue: string) {
        return this.input()
            .should('have.value', expectedValue);
    }

    shouldBeEmpty() {
        return this.input()
            .should('have.value', '');
    }

    shouldBeDisabled() {
        return this.input()
            .should('be.disabled');
    }

    shouldBeEnable() {
        return this.input()
            .should('be.enabled');
    }

    shouldNotBeExist() {
        return cy.contains('label', this.labelText).should('not.exist');
    }

    shouldHaveBackgroundColor(color: string) {
        return this.input()
            .and('have.css', 'color', color);
    }

    shouldHaveErrorMessage(expectedMessage: string) {
        return this.errorMessage()
            .should('have.text', expectedMessage);
    }

    shouldErrorMessageColor(color: string) {
        return this.errorMessage()
            .should('have.css', 'color', color);
    }

}
