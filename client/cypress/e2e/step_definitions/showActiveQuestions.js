import { Given, When, Then, And, Before, After } from "cypress-cucumber-preprocessor/steps";

Before(() => {
    cy.exec("npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/fake_so");
    cy.exec("npm run --prefix ../server populate_db mongodb://127.0.0.1:27017/fake_so");
});

After(() => {
    cy.exec("npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/fake_so");
});

const Q1_TITLE = "Programmatically navigate using React router";
const Q2_TITLE = "android studio save string shared preference, start activity and load the saved string";
const Q3_TITLE = "Quick question about storage on android";
const Q4_TITLE = "Object storage for a web application";
const Q5_TITLE = "Test Question A";

function verifyActiveOrder() {
    const qTitleByActivity = [
        Q1_TITLE,
        Q2_TITLE,
        Q3_TITLE,
        Q4_TITLE,
    ];
    cy.get(".postTitle").each(($el, index, $list) => {
        cy.wrap($el).should("contain", qTitleByActivity[index]);
    });
}

function createQuestion(title, text, tag, username) {
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type(title);
    cy.get("#formTextInput").type(text);
    cy.get("#formTagInput").type(tag);
    cy.get("#formUsernameInput").type(username);
    cy.contains("Post Question").click();
}

function createAnswer(qtitle, username, text) {
    cy.contains(qtitle).click();
    cy.contains("Answer Question").click();
    cy.get("#answerUsernameInput").type(username);
    cy.get("#answerTextInput").type(text);
    cy.contains("Post Answer").click();
}

// Scenario: Show all questions in active order on user request
//     Given The user can access the homepage "http://localhost:3000"
//     And can see the homepage "All Questions"
//     When The user clicks on the "Active" tab
//     Then The user should see all questions in the database with the most recently posted answers first

Given('The user can access the homepage {string}', (url) => {
    cy.visit(url);
});

And('can see the homepage {string}', (pageName) => {
    cy.contains(pageName);
});

When('The user clicks on the {string} tab', (orderName) => {
    cy.contains(orderName).click();
});

Then('The user should see all questions in the database with the most recently posted answers first', () => {
    verifyActiveOrder();
});

// Scenario Outline: Return to the Active tab after viewing questions in another order
//     Given The user is viewing questions in "<currentOrder>"
//     When The user clicks on the "Active" order
//     Then The user should see all questions in the database with the most recently posted answers first

Given('The user is viewing questions in {string}', (currentOrder) => {
    cy.visit("http://localhost:3000");
    cy.contains(currentOrder).click();
});

When('The user clicks on the {string} order', (orderName) => {
    cy.contains(orderName).click();
});

Then('The user should see all questions in the database with the most recently posted answers first', () => {
    verifyActiveOrder();
});

// Scenario: Return to Active after viewing Tags 
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user clicks on the "Tags" menu item
//     And clicks on the "Questions" menu item
//     And clicks on the "Active" tab 
//     Then The user should see all questions in the database with the most recently posted answers first

Given('The user is viewing the homepage {string}', (url) => {
    cy.visit(url);
});

When('The user clicks on the {string} menu item', (menuItem) => {
    cy.contains(menuItem).click();
});

And('clicks on the {string} menu item', (menuItem) => {
    cy.contains(menuItem).click();
});

And('clicks on the {string} tab', (tabName) => {
    cy.contains(tabName).click();
});

Then('The user should see all questions in the database with the most recently posted answers first', () => {
    verifyActiveOrder();
});

// Scenario: View questions in active order after answering questions
//     Given The user is viewing the homepage "http://localhost:3000"
//     And The user has created a new question
//     And answers the new question
//     And The user answers an existing question from the "Questions" page
//     When The user clicks on the "Active" tab in the "Questions" page
//     Then The user should see all questions in the database in new active order

Given('The user is viewing the homepage {string}', (url) => {
    cy.visit(url);
});

And('The user has created a new question', () => {
    createQuestion(Q5_TITLE, "Test Question A Text", "javascript", "mks1");
});

And('answers the new question', () => {
    createAnswer(Q5_TITLE, "abc3", "Answer Question A");
});

And('The user answers an existing question from the {string} page', (pageName) => {
    cy.contains(pageName).click();
    createAnswer(Q4_TITLE, "abc4", "Answer Question D");
});

When('The user clicks on the {string} tab in the {string} page', (tabName, pageName) => {
    cy.contains(pageName).click();
    cy.contains(tabName).click();
});

Then('The user should see all questions in the database in new active order', () => {
    const newActiveOrder = [
        Q4_TITLE,
        Q5_TITLE,
        Q1_TITLE,
        Q2_TITLE,
        Q3_TITLE
    ];
    cy.get(".postTitle").each(($el, index, $list) => {
        cy.wrap($el).should("contain", newActiveOrder[index]);
    });
});
