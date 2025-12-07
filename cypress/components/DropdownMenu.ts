export class DropdownMenu {
    constructor(private labelText: string) { }

    private container() {
        return cy.contains('label', this.labelText)
            .closest('div.oxd-input-group');
    }

    private dropdown() {
        return this.container()
            .find('div.oxd-select-text-input');
    }

    open() {
        return this.container().click();
    }

    selectOption(optionText: string) {
        this.open();
        return cy.contains('div[role="option"]', optionText).click();
    }

    shouldHaveValue(expectedValue: string) {
        return this.dropdown().should('contain.text', expectedValue);
    }
}