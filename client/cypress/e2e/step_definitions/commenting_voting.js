import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { fillSignInForm,existingUser } from "./login";
import '../../support/hooks';


// Scenario: Adding a Comment
// Given It is a registered user on the login page "http://localhost:3000"
// When The user enters the correct username and password
// And clicks on the Sign In button
// And can see the homepage "All Questions"
// When The user clicks on a question that has answers
// And enters a comment in the comment section and click "Submit"
// Then The user should see the comment added to the answer.


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
When('The user clicks on a question that has answers', () => {
    cy.get(".postTitle").contains("Quick question about storage on android").click();
});
And('enters a comment in the comment section and click {string}', (buttonName) => {
    cy.get("#commentedBy").type("Jane");
    cy.get("#comment").type("This is a test comment");
    cy.contains(buttonName).click();
});
Then('The user should see the comment added to the answer', () => {
    cy.contains("Jane: This is a test comment");
});

// Scenario: Voting on a Question
// Given It is a registered user on the login page "http://localhost:3000"
//     When The user enters the correct username and password
//     And clicks on the Sign In button
//     And can see the homepage "All Questions"
//     When The user clicks on a question
//     And clicks on the "Upvote" button
//     Then The questions vote count should be upvoted
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
When('The user clicks on a question', () => {
    cy.get(".postTitle").contains("Quick question about storage on android").click();
});
And('clicks on the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
Then('The questions vote count should be upvoted', () => {
    cy.get(".voteCount").contains("1");
});

// Scenario: Voting on a Question
// Given It is a registered user on the login page "http://localhost:3000"
//     When The user enters the correct username and password
//     And clicks on the Sign In button
//     And can see the homepage "All Questions"
//     When The user clicks on a question
//     And clicks on the "Downvote" button
//     Then The questions vote count should be down voted

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
When('The user clicks on a question', () => {
    cy.get(".postTitle").contains("Quick question about storage on android").click();
});
And('clicks on the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
Then('The questions vote count should be down voted', () => {
    cy.get(".voteCount").contains("-1");
});


// Given It is a registered user on the login page "http://localhost:3000"
//         When The user enters the correct username and password
//         And clicks on the Sign In button
//         And can see the homepage "All Questions"
//         When The user clicks on a question
//         And clicks on the "Flag" button
//         Then The question should see "flagged" on the question

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
When('The user clicks on a question', () => {
    cy.get(".postTitle").contains("Quick question about storage on android").click();
});
And('clicks on the {string} button', (buttonName) => {
    cy.get('#flag').contains(buttonName).click();
});
Then('The question should see {string} on the question', (flagged) => {
    cy.contains(flagged);
});


// Scenario: Flagging an Answer
//     Given It is a registered user on the login page "http://localhost:3000"
//         When The user enters the correct username and password
//         And clicks on the Sign In button
//         And can see the homepage "All Questions"
//         When The user clicks on a question
//         And clicks on the "Flag" button on the answer
//         Then The answer should see "Flagged" on the answer


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
When('The user clicks on a question', () => {
    cy.get(".postTitle").contains("Quick question about storage on android").click();
});
And('clicks on the {string} button on the answer', (buttonName) => {
    cy.get('#flag').contains(buttonName).click();
});
Then('The answer should see {string} on the answer', (flagged) => {
    cy.contains(flagged);
});

// Given It is a registered user on the login page "http://localhost:3000"
//         When The user enters the correct username and password
//         And clicks on the Sign In button
//         And can see the homepage "All Questions"
//         When The user clicks on a question
//         And clicks on the "Flag" button on the comment
//         Then The comment should see "Flagged" on the comment

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
When('The user clicks on a question', () => {
    cy.get(".postTitle").contains("Quick question about storage on android").click();
});
And('clicks on the {string} button on the comment', (buttonName) => {
    cy.get("#commentedBy").type("Jane");
    cy.get("#comment").type("This is a test comment");

    cy.contains("Post Comment").click();
    cy.get('#commentFlagButton').contains(buttonName).click();
});
Then('The comment should see {string} on the comment', (flagged) => {
    cy.contains(flagged);
});

// Scenario: Voting on an Answer
//      Given It is a registered user on the login page "http://localhost:3000"
//         When The user enters the correct username and password
//         And clicks on the Sign In button
//         And can see the homepage "All Questions"
//         When The user clicks on a question
//      And I click the "Upvote" button on the answer
//      Then the answers vote count should display "Refresh" temporarily
//      When I navigate back to the question page
//      Then the answers vote count should display the updated value reflecting the new vote.

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
When('The user clicks on a question', () => {
    cy.get(".postTitle").contains("Quick question about storage on android").click();
});
And('I click the {string} button on the answer', (buttonName) => {
    cy.get('#upvote').contains(buttonName).click();
});
Then('the answers vote count should display {string} temporarily', (temp) => {
    cy.get(".voteCount").contains(temp);
});
When('I navigate back to the question page', () => {
    cy.contains("Questions").click();
    cy.get(".postTitle").contains("Quick question about storage on android").click();
});
Then('the answers vote count should display the updated value reflecting the new vote', () => {
    cy.get(".voteCount").contains("1");
});

