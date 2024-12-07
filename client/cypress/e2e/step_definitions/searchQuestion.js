import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { fillSignInForm,existingUser } from "./login";
import '../../support/hooks';


// Scenario: Search questions by search string
// Given The user can access the homepage "http://localhost:3000"
// And can see the homepage "All Questions"
// When The user enters a search string in the search bar
// And clicks enter
// Then The user should see only questions that contain the search string in the title or text


Given('It is a registered user on the login page {string}', (url) => {
    cy.visit(url);
});

When('The user enters the correct username and password', () => {
    fillSignInForm(existingUser.username, existingUser.password);
});
And('clicks on the Sign In button', () => {
    cy.get('#signInBtn').contains("Sign In").click();
});  
And('can see the homepage {string}', (pageName) => {
    cy.contains(pageName);
});
When('The user enters a search string in the search bar', () => {
    cy.get("#searchBar").type("android");
});
And('clicks enter', () => {
    cy.get("#searchBar").type("{enter}");
});
Then('The user should see only questions that contain the search string in the title or text', () => {
    cy.contains("Quick question about storage on android");
    cy.contains("android studio save string shared preference, start activity and load the saved string");
});

// Scenario: Search questions by tagname
//     Given The user can access the homepage "http://localhost:3000"
//     And can see the homepage "All Questions"
//     When The user clicks on a tagname
//     Then The user should see only questions that contain the tagname in the tags
Given('It is a registered user on the login page {string}', (url) => {
    cy.visit(url);
});

When('The user enters the correct username and password', () => {
    fillSignInForm(existingUser.username, existingUser.password);
});
And('clicks on the Sign In button', () => {
    cy.get('#signInBtn').contains("Sign In").click();
});  
And('can see the homepage {string}', (pageName) => {
    cy.contains(pageName);
});
When('The user clicks on a tagname', () => {
    cy.get(".question_tag_button").contains("android-studio").click();
});
Then('The user should see only questions that contain the tagname in the tags', () => {
    cy.contains("2 questions");
    cy.contains("Quick question about storage on android");
    cy.contains("android studio save string shared preference, start activity and load the saved string");
});

// Scenario: No questions in the database contain the search string or tagname
//     Given The user can access the homepage "http://localhost:3000"
//     And can see the homepage "All Questions"
//     When The user enters a search string in the search bar that does not exist in the database
//     And clicks enter
//     Then The user should see a message "No Questions Found"

Given('It is a registered user on the login page {string}', (url) => {
    cy.visit(url);
});

When('The user enters the correct username and password', () => {
    fillSignInForm(existingUser.username, existingUser.password);
});
And('clicks on the Sign In button', () => {
    cy.get('#signInBtn').contains("Sign In").click();
});  
And('can see the homepage {string}', (pageName) => {
    cy.contains(pageName);
});
When('The user enters a search string in the search bar that does not exist in the database', () => {
    cy.get("#searchBar").type("notfound");
});
And('clicks enter', () => {
    cy.get("#searchBar").type("{enter}");
});
Then('The user should see a message {string}', (message) => {
    cy.contains(message);
});

// Scenario: Search questions by search string and tagname
//     Given The user can access the homepage "http://localhost:3000"
//     And can see the homepage "All Questions"
//     When The user enters a search string in the search bar
//     And clicks on a tagname
//     Then The user should see the questions that contain the tagname and the metadata information

Given('It is a registered user on the login page {string}', (url) => {
    cy.visit(url);
});

When('The user enters the correct username and password', () => {
    fillSignInForm(existingUser.username, existingUser.password);
});
And('clicks on the Sign In button', () => {
    cy.get('#signInBtn').contains("Sign In").click();
});  
And('can see the homepage {string}', (pageName) => {
    cy.contains(pageName);
});
When('The user enters a search string in the search bar', () => {
    cy.get("#searchBar").type("quick");
});
And('clicks on a tagname', () => {
    cy.get(".question_tag_button").contains("shared-preferences").click();
});
Then('The user should see the questions that contain the tagname and the metadata information', () => {
    cy.contains("2 questions");
    cy.contains("Quick question about storage on android");
    cy.contains("android studio save string shared preference, start activity and load the saved string");
    cy.contains("elephantCDE");
    cy.contains("1 answers");
});