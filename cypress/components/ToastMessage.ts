export class ToastMessage {
    shouldHaveTitle(expectedTitle: string) {
        return cy.get('p.oxd-text--toast-title')
            .should('have.text', expectedTitle);
    }

    shouldHaveMessage(expectedMessage: string) {
        return cy.get('p.oxd-text--toast-message')
            .should('have.text', expectedMessage);
    }
}