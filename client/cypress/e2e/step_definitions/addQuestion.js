import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

const newQuestion = {
    title: "How to add a question to the database?",
    text: "I am trying to add a question to the database using JavaScript, but I am not sure how to do it. Can someone help me?",
    tags: "database javascript",
    user: "elephantCDE"
}

function fillForm(q) {
    if(q.title)
        cy.get("#formTitleInput").type(q.title);
    if(q.text)
        cy.get("#formTextInput").type(q.text);
    if(q.tags)
        cy.get("#formTagInput").type(q.tags);
    if(q.user)
        cy.get("#formUsernameInput").type(q.user);
}

// Scenario: Add a new question successfully
//     Given The user has write access to the application "http://localhost:3000"
//     When The user clicks the "Ask a Question" button
//     And fills out the necessary fields
//     And clicks the "Post Question" button
//     Then The user should see the new question in the All Questions page with the metadata information

Given('The user has write access to the application {string}', (url) => {
    cy.visit(url);
});

When('The user clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});

And('fills out the necessary fields', () => {
    fillForm(newQuestion);
});

And('clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});

Then('The user should see the new question in the All Questions page with the metadata information', () => {
    cy.contains("All Questions");
    cy.get(".postTitle").first().should("contain", newQuestion.title);
    cy.get(".question_author").first().should("contain", newQuestion.user);
    cy.get(".question_meta").first().should("contain", "0 seconds");
});