export abstract class BasePage {

    /** PAGES AND URL */

    visit(url: string) {
        cy.visit(url);
    }

    getCurrentUrl() {
        return cy.url();
    }

    getPageTitle() {
        return cy.title();
    }

    backToPreviousPage(){
        return cy.go('back');
    }

    /** ACTIONS ON ELEMENT */

    selectItemFromCustomDropdown(dropdownElement: Cypress.Chainable<JQuery<HTMLElement>>, optionsLocator: string, itemText: string) {
        dropdownElement.click();
        cy.get(optionsLocator).contains(itemText).click();
    }

    typeText(element: Cypress.Chainable<JQuery<HTMLElement>>, text: string) {
        if (text.trim().length === 0) {
            element.clear();
        } else {
            element.clear().type(text);
        }
    }

    /** ASSERTIONS (CHAINABLE) */

    shouldCurrentURLContainsText(expectedText: string) {
        return this.getCurrentUrl().should('contain', expectedText);
    }

    shouldHaveValue(element: Cypress.Chainable<JQuery<HTMLElement>>, expectedValue: string) {
        return element.should(($el) => {
            const value = $el.val();
            expect(value).to.equal(expectedValue);
        });
    }

    shouldElementsHaveValues(element: Cypress.Chainable<JQuery<HTMLElement>>, expectedValues: Array<string>) {
        const actualValues: string[] = [];
       return element.each(($el) => {
            actualValues.push($el.text().trim());
        }).then(() => {
            expect(actualValues).to.deep.equal(expectedValues);
        }
        );
    }

}



