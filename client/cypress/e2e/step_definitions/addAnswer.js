import { Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';
import '../../support/hooks';
import { fillSignInForm,existingUser } from "./login";

const newAnswer = {
    username: "elephantCDE",
    text: "Some text for the answer",
}
const emptyUsernameAnswer = { 
    username: "",  
    text: "Some text for the answer",
}
const emptyTextAnswer = {
    username: "elephantCDE",
    text: "",
}
// Scenario: Post an answer successfully
//     Given The user has write access to the application "http://localhost:3000"
//     And The user is viewing a question
//     And clicks the "Answer Question" button
//     And fills out the necessary fields like Username, Answer text
//     And clicks the "Post Answer" button
//     Then The user should see the new answer in the question page with the metadata information
Given('It is a registered user on the login page {string}', (url) => {
    cy.visit(url);
});

When('The user enters the correct username and password', () => {
    fillSignInForm(existingUser.username, existingUser.password);
});
And('clicks on the Sign In button', () => {
    cy.get('#signInBtn').contains("Sign In").click();
}); 
And('The user is viewing a question', () => {
    cy.contains("Quick question about storage on android").click();
});
When('clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
And('fills out the necessary fields like Username, Answer text', () => {
    cy.get("#answerUsernameInput").type(newAnswer.username);
    cy.get("#answerTextInput").type(newAnswer.text);
});
And('clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
Then('The user should see the new answer in the question page with the metadata information', () => {
    cy.contains("Some text for the answer");
    cy.contains("elephantCDE");
    cy.contains("0 seconds");
});

// Scenario: Post an answer with missing Username
//     Given The user has write access to the application "http://localhost:3000"
//     And The user is viewing a question
//     And clicks the "Answer Question" button
//     And fills out the necessary fields leaving Username field empty
//     And clicks the "Post Answer" button
//     Then The user should see an error message "Username cannot be empty"

Given('It is a registered user on the login page {string}', (url) => {
    cy.visit(url);
});

When('The user enters the correct username and password', () => {
    fillSignInForm(existingUser.username, existingUser.password);
});
And('clicks on the Sign In button', () => {
    cy.get('#signInBtn').contains("Sign In").click();
}); 
And('The user is viewing a question', () => {
    cy.contains("Quick question about storage on android").click();
});
When('clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
And('fills out the necessary fields leaving Username field empty', () => {
    cy.get("#answerTextInput").type(emptyUsernameAnswer.text);
});
And('clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
Then('The user should see an error message {string}', (errorMessage) => {
    cy.contains(errorMessage);
});

    // Scenario: Post an answer with missing Answer text
    // Given The user has write access to the application "http://localhost:3000"
    // And The user is viewing a question
    // And clicks the "Answer Question" button
    // And fills out the necessary fields leaving Answer text field empty
    // And clicks the "Post Answer" button
    // Then The user should see an error message "Answer text cannot be empty"
    Given('It is a registered user on the login page {string}', (url) => {
        cy.visit(url);
    });
    
    When('The user enters the correct username and password', () => {
        fillSignInForm(existingUser.username, existingUser.password);
    });
    And('clicks on the Sign In button', () => {
        cy.get('#signInBtn').contains("Sign In").click();
    }); 
And('The user is viewing a question', () => {
    cy.contains("Quick question about storage on android").click();
});
When('clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
And('fills out the necessary fields leaving Answer text field empty', () => {
    cy.get("#answerUsernameInput").type(emptyTextAnswer.username);
});
And('clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
Then('The user should see an error message {string}', (errorMessage) => {
    cy.contains(errorMessage);
});
