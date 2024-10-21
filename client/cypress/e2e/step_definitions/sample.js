import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('The user can view {string}', (url) => {
    cy.visit(url);
});

Then('The user can see the title', () => {
    // user can see the title
});