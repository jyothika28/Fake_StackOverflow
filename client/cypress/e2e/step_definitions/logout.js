import { Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';
import '../../support/hooks';
import { fillSignInForm,existingUser } from "./login";

Given('It is a registered user on the login page {string}', (url) => {
    cy.visit(url);
});

When('The user enters the correct username and password', () => {
    fillSignInForm(existingUser.username, existingUser.password);
});
And('clicks on the Sign In button', () => {
    cy.get('#signInBtn').contains("Sign In").click();
});
// And The user is viewing the homepage
//         And clicks on the "Profile" icon button
//         And clicks on the "Logout" button
//         Then The user should be logged out and redirected to the Sign In page
And('The user is viewing the homepage', () => {
    cy.contains("All Questions");
});
And('clicks on the Profile icon button', () => {
    cy.get("#profileBtn").click();
});
And('clicks on the Logout button', () => {
    cy.get("#logoutBtn").contains("Logout").click();
});
Then('The user should be logged out and redirected to the Sign In page', () => {
    cy.contains("Sign In");
});
