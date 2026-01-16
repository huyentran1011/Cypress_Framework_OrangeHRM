declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom command to login as admin user
     * @example cy.loginAsAdmin()
     */
    loginAsAdmin(): Chainable<Subject>;

    /**
     * Custom command to login as normal user
     * @example cy.loginAsUser()
     */
    loginAsUser(): Chainable<Subject>;
  }
}