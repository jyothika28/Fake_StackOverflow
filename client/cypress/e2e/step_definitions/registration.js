import { Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';
import '../../support/hooks';

const user1 = {
    firstname: 'John',
    lastname: 'Doe',
    username: 'johndoe',
    email: 'john123d@gmail.com',
    password: 'Password@100',
    confirmPassword: 'Password@100',
    dob: '1990-01-01'
}

// 'Rachel', 'Green', 'rachelgreen', 'rach@gmail.com', u1_pwd, new Date('1990-01-20')
const existingEmail = {  
    firstname:'Rachel',
    lastname:'Green',
    username:'rachelgreen2',
    email:'rach@gmail.com',
    password:'Password@100',
    confirmPassword:'Password@100',
    dob:'1990-01-20'
}
const invalidEmail={
    firstname:'Rachel',
    lastname:'Green',
    username:'rachelgreen2',
    email:'rach123gmail.com',
    password:'Password@100',
    confirmPassword:'Password@100',
    dob:'1990-01-20'
}
const exisitingUsername = {
        firstname:'Rachel',
        lastname:'Green',
        username:'rachelgreen',
        email:'rach123@gmail.com',
        password:'Password@100',
        confirmPassword:'Password@100',
        dob:'1990-01-20'
    }
    
const weakPassword = {
    firstname: 'John',
    lastname: 'Doe',
    username: 'johndoe',
    email: 'john@gmail.com',
    password: 'password',
    confirmPassword: 'password',
    dob: '1990-01-01'
}
const differentPasswords = {
        firstname: 'John',
        lastname: 'Doe',
        username: 'johndoe',
        email: 'john@gmail.com',
        password: 'Password@100',
        confirmPassword: 'Password@200',
        dob: '1990-01-01'
    }

    
// #  formFirstnameInput
// #         formLastnameInput
// #         formUsernameInput
// #         formEmailInput
// #         formPasswordInput
// #         formConfirmPasswordInput
// #         formDobInput

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

// Scenario: Successful Registration
// Given The user has access to "http://localhost:3000"
// And clicks on "Don't have an account? Sign up" button
// When the user fills out the required fields first name, last name, username, email, password, and optional date of birth
// And clicks on Register button
// Then the user is Successfully redirected to the login page to login with the newly created account


Given('The user has access to {string}', (url) => {
    cy.visit(url);
});
And('clicks on {string}', (link) => {
    cy.contains(link).click();
});
When('the user fills out the required fields first name, last name, username, email, password, and optional date of birth', () => {
    fillRegistrationForm(user1);
});
And('clicks on Register button', () => {
    cy.get("#registerBtn").contains("Register").click();
});
Then('the user is Successfully redirected to the Sign in page to login with the newly created account', () => {
    cy.contains("Sign in").should('be.visible');
});

// Scenario: Registration with Existing Email
// Given The user has access to "http://localhost:3000"
// And clicks on "Don't have an account? Sign up"
// When the user fills out the necessary fields with existing email
// And clicks on Register button
// Then the user should see an error message stating, "This email is already registered. Please use a different email or log in."

Given('The user has access to {string}', (url) => {
    cy.visit(url);
});
And('clicks on {string}', (link) => {
    cy.contains(link).click();
});
When('the user fills out the necessary fields with existing email', () => {
    fillRegistrationForm(existingEmail);
});
And('clicks on Register button', () => {
    cy.get("#registerBtn").contains("Register").click();
});
Then('the user should see an error message stating, {string}', (errorMessage) => {
    cy.contains(errorMessage).should('be.visible');
});

// Scenario: Invalid Email Format
// Given The user has access to "http://localhost:3000"
// And clicks on "Don't have an account? Sign up"
// When the user enters an email address in an invalid format with missing @ or domain
// And clicks on the Register button
// Then The user should see an error message stating, "Invalid email format. Please enter a valid email address."

Given('The user has access to {string}', (url) => {
    cy.visit(url);
});
And('clicks on {string}', (link) => {
    cy.contains(link).click();
});
When('the user enters an email address in an invalid format with missing @ or domain', () => {
    fillRegistrationForm(invalidEmail);
});
And('clicks on Register button', () => {
    cy.get("#registerBtn").contains("Register").click();
});
Then('The user should see an error message stating, {string}', (errorMessage) => {
    cy.contains(errorMessage).should('be.visible');
});


// Scenario: Duplicate Username
// Given The user has access to "http://localhost:3000"
// And clicks on "Don't have an account? Sign up"
// When The user attempts to register using a username that is already taken
// And clicks on the Register button
// Then The user should see an error message stating, "This username is already in use. Please choose a different username."

Given('The user has access to {string}', (url) => {
    cy.visit(url);
});
And('clicks on {string}', (link) => {
    cy.contains(link).click();
});
When('The user attempts to register using a username that is already taken', () => {
    fillRegistrationForm(exisitingUsername);
});
And('clicks on Register button', () => {
    cy.get("#registerBtn").contains("Register").click();
});
Then('The user should see an error message stating, {string}', (errorMessage) => {
    cy.contains(errorMessage).should('be.visible');
});


// Scenario: Weak Password
// Given The user has access to "http://localhost:3000"
// And clicks on "Don't have an account? Sign up"
// When The user enters a password that does not meet the required strength criteria  
// And clicks on the Register button
// Then The user should see an error message stating, "Password is too weak. Please ensure your password has at least 8 characters, one uppercase letter, and one special character."

Given('The user has access to {string}', (url) => {
    cy.visit(url);
}); 
And('clicks on {string}', (link) => {
    cy.contains(link).click();
});
When('The user enters a password that does not meet the required strength criteria', () => {
    fillRegistrationForm(weakPassword);
});
And('clicks on Register button', () => {
    cy.get("#registerBtn").contains("Register").click();
});
Then('The user should see an error message stating, {string}', (errorMessage) => {
    cy.contains(errorMessage).should('be.visible');
});


// Scenario: Passwords do not match
// Given The user has access to "http://localhost:3000"
// And clicks on "Don't have an account? Sign up"
// When The user enters a password in the "Password" field and a different password in the "Confirm Password" field
// And clicks on the Register button
// Then The user should see an error message stating, "Passwords do not match. Please ensure both password fields match exactly."

Given('The user has access to {string}', (url) => {
    cy.visit(url);
});
And('clicks on {string}', (link) => {
    cy.contains(link).click();
});
When('The user enters a password in the "Password" field and a different password in the "Confirm Password" field', () => {
    fillRegistrationForm(differentPasswords);
});
And('clicks on Register button', () => {
    cy.get("#registerBtn").contains("Register").click();
});
Then('The user should see an error message stating, {string}', (errorMessage) => {
    cy.contains(errorMessage).should('be.visible');
});



// Scenario: Registration with Missing Email
// Given The user has access to "http://localhost:3000"
// And clicks on "Don't have an account? Sign up"
// When The user fills out the necessary fields except the email field
// And clicks on the Register button
// Then The user should see an error message stating, "Email cannot be empty."

Given('The user has access to {string}', (url) => {
    cy.visit(url);
});
And('clicks on {string}', (link) => {
    cy.contains(link).click();
});
When('The user fills out the necessary fields except the email field', () => {
    fillRegistrationForm(user1);
    cy.get('#formEmailInput').clear();
});
And('clicks on Register button', () => {
    cy.get("#registerBtn").contains("Register").click();
});
Then('The user should see an error message stating, {string}', (errorMessage) => {
    cy.contains(errorMessage).should('be.visible');
});


// Scenario: Registration with Missing First Name
// Given The user has access to "http://localhost:3000"
// And clicks on "Don't have an account? Sign up"
// When The user fills out the necessary fields except the first name field
// And clicks on the Register button
// Then The user should see an error message stating, "First name cannot be empty."

Given('The user has access to {string}', (url) => {
    cy.visit(url);
});
And('clicks on {string}', (link) => {
    cy.contains(link).click();
});
When('The user fills out the necessary fields except the first name field', () => {
    fillRegistrationForm(user1);
    cy.get('#formFirstnameInput').clear();
});
And('clicks on Register button', () => {
    cy.get("#registerBtn").contains("Register").click();
});
Then('The user should see an error message stating, {string}', (errorMessage) => {
    cy.contains(errorMessage).should('be.visible');
});


// Scenario: Registration with Missing Last Name
// Given The user has access to "http://localhost:3000"
// And clicks on "Don't have an account? Sign up"
// When The user fills out the necessary fields except the last name field
// And clicks on the Register button
// Then The user should see an error message stating, "Last name cannot be empty."

Given('The user has access to {string}', (url) => {
    cy.visit(url);
});
And('clicks on {string}', (link) => {
    cy.contains(link).click();
});
When('The user fills out the necessary fields except the last name field', () => {
    fillRegistrationForm(user1);
    cy.get('#formLastnameInput').clear();
});
And('clicks on Register button', () => {
    cy.get("#registerBtn").contains("Register").click();
});
Then('The user should see an error message stating, {string}', (errorMessage) => {
    cy.contains(errorMessage).should('be.visible');
});

// Scenario: Registration with Missing Username
// Given The user has access to "http://localhost:3000"
// And clicks on "Don't have an account? Sign up"
// When The user fills out the necessary fields except the username field
// And clicks on the Register button
// Then The user should see an error message stating, "Username cannot be empty."

Given('The user has access to {string}', (url) => {
    cy.visit(url);
});
And('clicks on {string}', (link) => {
    cy.contains(link).click();
});
When('The user fills out the necessary fields except the username field', () => {
    fillRegistrationForm(user1);
    cy.get('#formUsernameInput').clear();
});
And('clicks on Register button', () => {
    cy.get("#registerBtn").contains("Register").click();
});
Then('The user should see an error message stating, {string}', (errorMessage) => {
    cy.contains(errorMessage).should('be.visible');
});

// Scenario: Registration with Missing Password
// Given The user has access to "http://localhost:3000"
// And clicks on "Don't have an account? Sign up"
// When The user fills out the necessary fields except the password field
// And clicks on the Register button
// Then The user should see an error message stating, "Password cannot be empty."

Given('The user has access to {string}', (url) => {
    cy.visit(url);
});
And('clicks on {string}', (link) => {
    cy.contains(link).click();
});
When('The user fills out the necessary fields except the password field', () => {
    fillRegistrationForm(user1);
    cy.get('#formPasswordInput').clear();
});
And('clicks on Register button', () => {
    cy.get("#registerBtn").contains("Register").click();
});
Then('The user should see an error message stating, {string}', (errorMessage) => {
    cy.contains(errorMessage).should('be.visible');
});

// Scenario: Registration with Missing Confirm Password
// Given The user has access to "http://localhost:3000"
// And clicks on "Don't have an account? Sign up"
// When The user fills out the necessary fields except the confirm password field
// And clicks on the Register button
// Then The user should see an error message stating, "Confirm Password cannot be empty."

Given('The user has access to {string}', (url) => {
    cy.visit(url);
});
And('clicks on {string}', (link) => {
    cy.contains(link).click();
});
When('The user fills out the necessary fields except the confirm password field', () => {
    fillRegistrationForm(user1);
    cy.get('#formConfirmPasswordInput').clear();
});
And('clicks on Register button', () => {
    cy.get("#registerBtn").contains("Register").click();
});
Then('The user should see an error message stating, {string}', (errorMessage) => {
    cy.contains(errorMessage).should('be.visible');
});