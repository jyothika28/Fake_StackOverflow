import { Given, When, Then, And, Before, After } from "cypress-cucumber-preprocessor/steps";

Before(() => {
    cy.exec("npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/fake_so");
    cy.exec("npm run --prefix ../server populate_db mongodb://127.0.0.1:27017/fake_so");
});

After(() => {
    cy.exec("npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/fake_so");
});

// Scenario: View questions in Newest order
// Given The user can access the homepage "http://localhost:3000"
// And can see the homepage "All Questions"
// When The user clicks on the "Newest" tab
// Then The user should see all questions in the database sorted by newest creation time first

Given('The user can access the homepage {string}', (url) => {
    cy.visit(url);
});

And('can see the homepage {string}', (pageName) => {
    cy.contains(pageName);
});

When('The user clicks on the {string} tab', (tabName) => {
    cy.contains(tabName).click();
});

Then('The user should see all questions in the database sorted by newest creation time first', () => {
    verifyNewestOrder();
});


const Q1_TITLE = "Quick question about storage on android";

const Q2_TITLE = "Object storage for a web application";

const Q3_TITLE = "android studio save string shared preference, start activity and load the saved string";
const Q4_TITLE = "Programmatically navigate using React router";
const Q5_TITLE = "Test Question A";

function verifyNewestOrder() {
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


// Scenario Outline: Return to the Newest tab after viewing questions in another order
// Given The user is viewing questions in "<currentOrder>"
// When The user clicks on the "Newest" tab
// Then The user should see all questions in the database sorted by newest creation time first

// Examples:
//   | currentOrder |
//   | Active       |
//   | Unanswered   |

Given('The user is viewing questions in {string}', (currentOrder) => {
    cy.visit("http://localhost:3000");
    cy.contains(currentOrder).click();
});

When('The user clicks on the {string} tab', (tabName) => {
    cy.contains(tabName).click();
});

Then('The user should see all questions in the database sorted by newest creation time first', () => {
    verifyNewestOrder();
});

// Scenario: Return to Newest after viewing Tags
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user clicks on the "Tags" menu item
//     And clicks on the "Questions" menu item
//     And clicks on the "Newest" tab
//     Then The user should see all questions in the database sorted by newest creation time first


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

Then('The user should see all questions in the database sorted by newest creation time first', () => {
    verifyNewestOrder();
});

//   Scenario: View questions in Newest and Active order after creating and answering questions
//     Given The user is viewing the homepage "http://localhost:3000"
//     And The user has created a new question
//     And answers the new question
//     And The user answers an existing question from the "Questions" page
//     When The user clicks on the "Newest" tab
//     Then The user should see all questions in the database sorted by newest creation time first
//     When The user clicks on the "Active" tab
//     Then The user should see all questions in the database sorted by the most recently posted answers first


// let's see
// Given('The user is viewing the homepage {string}', (url) => {
//     cy.visit(url);
// });

// And('The user has created a new question', () => {
//     cy.contains("Ask a Question").click();
//     cy.get("#formTitleInput").type("How to add a question to the database?");
//     cy.get("#formTextInput").type("I am trying to add a question to the database using JavaScript, but I am not sure how to do it. Can someone help me?");
//     cy.get("#formTagInput").type("database javascript");
//     cy.get("#formUsernameInput").type("elephantCDE");
//     cy.contains("Post Question").click();
// });

// And('answers the new question', () => {
//     cy.get(".postTitle").first().click();
//     cy.get("#formTextInput").type("You can add a question to the database by using the following code snippet: ...");
//     cy.get("#formUsernameInput").type("elephantCDE");
//     cy.contains("Post Answer").click();
// });

// And('The user answers an existing question from the {string} page', (pageName) => {
//     cy.contains("All Questions").click();
//     cy.get(".postTitle").last().click();
//     cy.get("#formTextInput").type("You can add a question to the database by using the following code snippet: ...");
//     cy.get("#formUsernameInput").type("elephantCDE");
//     cy.contains("Post Answer").click();
// });

// When('The user clicks on the {string} tab', (tabName) => {
//     cy.contains(tabName).click();
// });

// Then('The user should see all questions in the database sorted by newest creation time first', () => {
//     verifyNewestOrder();
// });
    
// When('The user clicks on the {string} tab', (tabName) => {
//         cy.contains(tabName).click();
// });
    
// Then('The user should see all questions in the database sorted by the most recently posted answers first', () => {
//         verifyActiveOrder();
//     });