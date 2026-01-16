/// <reference types="cypress" />
import { loginPage } from "../pages/LoginPage.ts";

Cypress.Commands.add('loginAsAdmin', () => {
    cy.fixture('auth/admin').then(data => {
        loginPage.loginToSystem(data.username, data.password);
    });

});

Cypress.Commands.add('loginAsUser', () => {
    cy.fixture('auth/users').then(data => {
        loginPage.loginToSystem(data.username, data.password);
    });
});