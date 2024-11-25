import { Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';
import '../../support/hooks';

const newQuestion = {
    title: "How to add a question to the database?",
    text: "I am trying to add a question to the database using JavaScript, but I am not sure how to do it. Can someone help me?",
    tags: "database javascript",
    user: "elephantCDE"
}
const newQuestionNoTitle = {
    text: "I am trying to add a question to the database using JavaScript, but I am not sure how to do it Can someone help me?",
    tags: "database javascript",
    user: "elephantCDE"
}
const newQuestionNoText = {
    title: "How to add a question to the database?",
    tags: "database javascript",
    user: "elephantCDE"
}
const newQuestionNoTags = {
    title: "How to add a question to the database?",
    text: "I am trying to add a question to the database using JavaScript, but I am not sure how to do it Can someone help me?",
    user: "elephantCDE"
}
const newQuestionNoUser = {
    title: "How to add a question to the database?",
    text: "I am trying to add a question to the database using JavaScript, but I am not sure how to do it Can someone help me?",
    tags: "database javascript"
}
const emptyFieldsQuestion = {
    title: "",
    text: "",
    tags: "",
    user: ""
}
const above100CharTitle = {
    title: "The Tags page lets users explore all tags in the system, each paired with the count of related questions. Clicking a tag redirects users to a filtered view, displaying questions associated with it. This feature makes navigating topics and finding relevant content effortless.",
    text: "I am trying to add a question to the database using JavaScript, but I am not sure how to do it",
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


// Scenario: Add a new question with missing Question title
//     Given The user has write access to the application "http://localhost:3000"
//     When The user clicks the "Ask a Question" button
//     And fills out the necessary fields except Question title
//     And clicks the "Post Question" button
//     Then The user should see an error message "Title cannot be empty"

Given('The user has write access to the application {string}', (url) => {
    cy.visit(url);
});

When('The user clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
And('fills out the necessary fields except Question title', () => {
    fillForm(newQuestionNoTitle);
});
And('clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
Then('The user should see an error message {string}', (errorMessage) => {
    cy.contains(errorMessage);
});

// Scenario: Add a new question with missing Question Text
//     Given The user has write access to the application "http://localhost:3000"
//     When The user clicks the "Ask a Question" button
//     And fills out the necessary fields leaving Question text field empty
//     And clicks the "Post Question" button
//     Then The user should see an error message "Question text cannot be empty"

Given('The user has write access to the application {string}', (url) => {
    cy.visit(url);
});
When('The user clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
And('fills out the necessary fields leaving Question text field empty', () => {
    fillForm(newQuestionNoText);
});
And('clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
Then('The user should see an error message {string}', (errorMessage) => {
    cy.contains(errorMessage);
});

// Scenario: Add a new question with missing Tags
// Given The user has write access to the application "http://localhost:3000"
// When The user clicks the "Ask a Question" button
// And fills out the necessary fields leaving Tags field empty
// And clicks the "Post Question" button
// Then The user should see an error message "Should have at least 1 tag"

Given('The user has write access to the application {string}', (url) => {
    cy.visit(url);
});
When('The user clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
And('fills out the necessary fields leaving Tags field empty', () => {
    fillForm(newQuestionNoTags);
});
And('clicks the {string} button', (buttonName) => { 
    cy.contains(buttonName).click();
});
Then('The user should see an error message {string}', (errorMessage) => {
    cy.contains(errorMessage);
}); 

//  Scenario: Add a new question with missing Username
//     Given The user has write access to the application "http://localhost:3000"
//     When The user clicks the "Ask a Question" button
//     And fill out the necessary fields leaving Username field empty
//     And clicks the "Post Question" button
//     Then The user should see an error message "Username cannot be empty"

Given('The user has write access to the application {string}', (url) => {
    cy.visit(url);
});
When('The user clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
And('fill out the necessary fields leaving Username field empty', () => {
    fillForm(newQuestionNoUser);
});
And('clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
Then('The user should see an error message {string}', (errorMessage) => {
    cy.contains(errorMessage);
});

// Scenario: Add a new question with exceeding 100 character limit in Question title
// Given The user has write access to the application "http://localhost:3000"
// When The user clicks the "Ask a Question" button
// And fills out the necessary fields with Question title exceeding 100 character limit
// And clicks the "Post Question" button
// Then The user should see an error message "Title cannot be more than 100 characters"


Given('The user has write access to the application {string}', (url) => {
    cy.visit(url);
});
When('The user clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
And('fills out the necessary fields with Question title exceeding 100 character limit', () => {
    fillForm(above100CharTitle);
});
And('clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
Then('The user should see an error message {string}', (errorMessage) => {
    cy.contains(errorMessage);
});
  
// Scenario: Add a new question with missing Question title, Question text, Tags and Username
// Given The user has write access to the application "http://localhost:3000"
// When The user clicks the "Ask a Question" button
// And leaves Question title, Question text, Tags and Username fields empty
// And clicks the "Post Question" button
// Then The user should see an error message "Title cannot be empty"
// And The user should see an error message "Question text cannot be empty"
// And The user should see an error message "Should have at least 1 tag"
// And The user should see an error message "Username cannot be empty"

Given('The user has write access to the application {string}', (url) => {
    cy.visit(url);
});
When('The user clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
And('leaves Question title, Question text, Tags and Username fields empty', () => {
    fillForm(emptyFieldsQuestion);
});
And('clicks the {string} button', (buttonName) => {
    cy.contains(buttonName).click();
});
Then('The user should see an error message {string}', (errorMessage) => {
    cy.contains(errorMessage);
});
And('The user should see an error message {string}', (errorMessage) => {
    cy.contains(errorMessage);
});
And('The user should see an error message {string}', (errorMessage) => {
    cy.contains(errorMessage);
});
And('The user should see an error message {string}', (errorMessage) => {
    cy.contains(errorMessage);
});
