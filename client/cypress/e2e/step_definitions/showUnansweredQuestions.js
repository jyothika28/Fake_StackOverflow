import { Given, When, Then, And} from "cypress-cucumber-preprocessor/steps";
import '../../support/hooks';
function createQuestion(title, text, tag, username) {
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type(title);
    cy.get("#formTextInput").type(text);
    cy.get("#formTagInput").type(tag);
    cy.get("#formUsernameInput").type(username);
    cy.contains("Post Question").click();
}
// Scenario: View unanswered questions
//     Given The user can access the homepage "http://localhost:3000"
//     And can see the homepage "All Questions"
//     When The user clicks on the "Unanswered" tab
//     Then The user should see only unanswered questions in the database
Given('The user can access the homepage {string}', (url) => {
    cy.visit(url);
});
And('can see the homepage {string}', (pageName) => {
    cy.contains(pageName);
});
When('The user clicks on the {string} tab', (tabName) => {
    cy.contains(tabName).click();
});
Then('The user should see only unanswered questions in the database', () => {
    cy.contains("0 questions"); 
});

// Scenario: View unanswered questions after creating a question
// Given The user is viewing the homepage "http://localhost:3000"
// And The user has created a new Question
// When The user clicks on the "Unanswered" tab
// Then The user should see Unanswered questions in the database
Given('The user is viewing the homepage {string}', (url) => {
    cy.visit(url);
});
And('The user has created a new Question', () => {
    createQuestion("Test Question", "abc", "Test", "rachel");
});
When('The user clicks on the {string} tab', (tabName) => {
    cy.contains(tabName).click();
});
Then('The user should see Unanswered questions in the database', () => {
    cy.get(".postTitle").contains("Test Question");
    cy.get(".question_author").contains("rachel");
    cy.get(".postStats").contains("0 answers");
    cy.get(".postStats").contains("0 views");
});



// Scenario: Return to Unanswered tab after creating and viewing questions in another order
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user is viewing questions in "<currentOrder>"
//     And The user has created a new Question
//     When The user clicks on the "Unanswered" tab
//     Then The user should see only unanswered questions in database

// Examples:
//   | currentOrder |
//   | Newest       |
//   | Active       |

Given('The user is viewing the homepage {string}', (url) => {
    cy.visit(url);
});
When('The user is viewing questions in {string}', (currentOrder) => {
    cy.contains(currentOrder).click();
});
And('The user has created a new Question', () => {
    createQuestion("Test Question", "abc", "Test", "rachel");
});
When('The user clicks on the {string} tab', (tabName) => {
    cy.contains(tabName).click();
});
Then('The user should see only unanswered questions in database', () => {
    cy.get(".postTitle").contains("Test Question");
    cy.get(".question_author").contains("rachel");
    cy.get(".postStats").contains("0 answers");
    cy.get(".postStats").contains("0 views");
});
