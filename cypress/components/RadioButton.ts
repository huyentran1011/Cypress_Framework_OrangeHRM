
export class RadioButton {

    selectByLabel(labelText: string) {
        return cy.contains('label', labelText).click();
    }

    shouldBeChecked(labelText: string) {
        return cy.contains('label', labelText)
            .find('input[type="radio"]')
            .should('be.checked');
    }
}