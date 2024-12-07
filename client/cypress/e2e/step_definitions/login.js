import { Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';
import '../../support/hooks';

export const existingUser = {
    username: 'rachelgreen',
    password: 'Rachelhomie@123'
}

export const fillSignInForm = (username, password) => {
    if(username)
    cy.get('#formUsernameInput').type(username);
    if(password)
    cy.get('#formPasswordInput').type(password);
}   

// Scenario: Successful User Login
// Given It is a registered user on the login page "http://localhost:3000"
// When The user enters the correct username and password
// And clicks on the "Sign In" button
// Then The user should be redirected to the homepage and see personalized content
Given('It is a registered user on the login page {string}', (url) => {
    cy.visit(url);
});

When('The user enters the correct username and password', () => {
    fillSignInForm(existingUser.username, existingUser.password);
});
And('clicks on the Sign In button', () => {
    cy.get('#signInBtn').contains("Sign In").click();
});  
Then('The user should be redirected to the homepage and see personalized content', () => {
    cy.contains('All Questions');
});

// Scenario: Missing Username
// Given It is a registered user on the login page "http://localhost:3000"
// When the user enters a blank username field and a password
// And clicks on the "Sign In" button
// Then The user should see an error message stating, "Username cannot be empty."

Given('It is a registered user on the login page {string}', (url) => {
    cy.visit(url);
});
When('the user enters a blank username field and a password', () => {
    fillSignInForm('', existingUser.password);
});
And('clicks on the Sign In button', () => {
    cy.get('#signInBtn').contains("Sign In").click();
}); 
Then('The user should see an error message stating, {string}', (errorMessage) => {
    cy.contains(errorMessage);
});

// Scenario: Missing Password
// Given It is a registered user on the login page "http://localhost:3000"
// When the user enters a username and leaves the password field blank
// And clicks on the "Sign In" button
// Then The user should see an error message stating, "Password cannot be empty."

Given('It is a registered user on the login page {string}', (url) => {
    cy.visit(url);
});
When('the user enters a username and leaves the password field blank', () => {
    fillSignInForm(existingUser.username, '');
});
And('clicks on the Sign In button', () => {
    cy.get('#signInBtn').contains("Sign In").click();
}); 
Then('The user should see an error message stating, {string}', (errorMessage) => {
    cy.contains(errorMessage);
});

// Scenario: Account Not Registered
// Given It is a registered user on the login page "http://localhost:3000"
// When the user enters a username that is not associated with any account
// And clicks on the "Sign In" button
// Then The user should see an error message stating, "No account found with this username. Please register or try again."

Given('It is a registered user on the login page {string}', (url) => {
    cy.visit(url);
});
When('the user enters a username that is not associated with any account', () => {
    fillSignInForm('rossnroll', existingUser.password);
});
And('clicks on the Sign In button', () => {
    cy.get('#signInBtn').contains("Sign In").click();
}); 
Then('The user should see an error message stating, {string}', (errorMessage) => {
    cy.contains(errorMessage);
});

// Scenario: Incorrect Login Credentials
// Given It is a registered user on the login page "http://localhost:3000"
// When the user enters a incorrect password
// And clicks on the "Sign In" button
// Then The user should see an error message stating, "Invalid credentials. Please try again."

Given('It is a registered user on the login page {string}', (url) => {
    cy.visit(url);
});
When('the user enters a incorrect password', () => {
    fillSignInForm(existingUser.username, 'Ross@123');
});
And('clicks on the Sign In button', () => {
    cy.get('#signInBtn').contains("Sign In").click();
}); 
Then('The user should see an error message stating, {string}', (errorMessage) => {
    cy.contains(errorMessage);
});
