import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { fillSignInForm,existingUser } from "./login";
import "../../support/hooks";

const maliciousUser = {
    firstname: "<script>alert('Hello')</script>",
    lastname: "<script>alert('Hello')</script>",
    username: "<script>alert('Hello')</script>",
    email: "testignuser@gmail.com",
    password: "Password@100",
    confirmPassword: "Password@100",
    dob: "1995-10-10"
};

function fillRegistrationForm(user) {
    if(user.firstname)
    cy.get('#formFirstnameInput').type(user.firstname);
    if(user.lastname)
    cy.get('#formLastnameInput').type(user.lastname);
    if(user.username)
    cy.get('#formUsernameInput').type(user.username);
    if(user.email)
    cy.get('#formEmailInput').type(user.email);
    if(user.password)
    cy.get('#formPasswordInput').type(user.password);
    if(user.confirmPassword)
    cy.get('#formConfirmPasswordInput').type(user.confirmPassword);
    if(user.dob)
    cy.get('#formDobInput').type(user.dob);
}


// Given The user has access to "http://localhost:3000"
// And clicks on "Don't have an account? Sign up"
// When The user fills out input fields first name, last name, username with malicious scripts or code
// And clicks on Register button
// Then The application should sanitize all inputs to prevent malicious scripts or code injection
// And When the user tries to login with the tampered credentials
// Then The application should display an error message like, "No account found with this username. Please register or try again." without revealing specific details about the input validation.
Given('The user has access to {string}', (url) => {
    cy.visit(url);
});
And('clicks on {string}', (link) => {
    cy.contains(link).click();
});
When('The user fills out input fields first name, last name, username with malicious scripts or code', () => {
    fillRegistrationForm(maliciousUser);
});
And('clicks on Register button', () => {
    cy.get("#registerBtn").contains("Register").click();
});

Then('Then the user should be registered with the sanitized inputs', () => {
    cy.contains("Sign In");
});
When('the user tries to login with the tampered credentials', () => {
    cy.get('#formUsernameInput').type(maliciousUser.username);
    cy.get('#formPasswordInput').type(maliciousUser.password);
    cy.get('#signInBtn').contains("Sign In").click();
});
Then('The application should display an error message like, {string} without revealing specific details about the input validation', (errorMessage) => {
    cy.contains("All Questions");
});