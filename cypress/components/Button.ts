export class Button {
    constructor(private buttonText: string) { }

    private button() {
        return cy.contains('button', this.buttonText);
    }

    click() {
        return this.button().click();
    }

    shouldDisabled() {
        return this.button().should('be.disabled');
    }

    shouldEnabled() {
        return this.button().should('not.be.disabled');
    }
}