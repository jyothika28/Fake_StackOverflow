import { Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';
import '../../support/hooks';

const existingUser = {
    username: 'rachelgreen',
    password: 'Rachelhomie@123'
}

const fillSignUpForm = (username, password) => {
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
    fillSignUpForm(existingUser.username, existingUser.password);
});
And('clicks on the {string} button', (buttonName) => {
    cy.get('#signInBtn').contains(buttonName).click();
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
    fillSignUpForm('', existingUser.password);
});
And('clicks on the {string} button', (buttonName) => {
    cy.get('#signInBtn').contains(buttonName).click();
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
    fillSignUpForm(existingUser.username, '');
});
And('clicks on the {string} button', (buttonName) => {
    cy.get('#signInBtn').contains(buttonName).click();
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
    fillSignUpForm('rossnroll', existingUser.password);
});
And('clicks on the {string} button', (buttonName) => {
    cy.get('#signInBtn').contains(buttonName).click();
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
    fillSignUpForm(existingUser.username, 'Ross@123');
});
And('clicks on the {string} button', (buttonName) => {
    cy.get('#signInBtn').contains(buttonName).click();
}); 
Then('The user should see an error message stating, {string}', (errorMessage) => {
    cy.contains(errorMessage);
});
