import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { fillSignInForm,existingUser } from "./login";
import "../../support/hooks";

const Q1_TITLE = "Programmatically navigate using React router";
const Q2_TITLE =
  "android studio save string shared preference, start activity and load the saved string";
const Q3_TITLE = "Quick question about storage on android";
const Q4_TITLE = "Object storage for a web application";
const Q5_TITLE = "Test Question A";

function verifyActiveOrder() {
  const qTitleByActivity = [Q1_TITLE, Q2_TITLE, Q3_TITLE, Q4_TITLE];
  cy.get(".postTitle").each(($el, index, $list) => {
    cy.wrap($el).should("contain", qTitleByActivity[index]);
  });
}
function verifyActiveOrderAfterAddingQuestion() {
  const qTitleByActive = [Q5_TITLE, Q1_TITLE, Q2_TITLE, Q3_TITLE, Q4_TITLE];
  cy.get(".postTitle").each(($el, index, $list) => {
    cy.wrap($el).should("contain", qTitleByActive[index]);
  });
}

function createQuestion(title, text, tag, username) {
  cy.contains("Ask a Question").click();
  cy.get("#formTitleInput").type(title);
  cy.get("#formTextInput").type(text);
  cy.get("#formTagInput").type(tag);
  cy.get("#formUsernameInput").type(username);
  cy.contains("Post Question").click().wait(1000);
}
//createAnswer(Q5_TITLE, "abc3", "Answer Question A");
function createAnswer(qtitle, username, text) {
  cy.contains(qtitle).click();
  cy.contains("Answer Question");
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

Given('It is a registered user on the login page {string}', (url) => {
  cy.visit(url);
});

When('The user enters the correct username and password', () => {
  fillSignInForm(existingUser.username, existingUser.password);
});
And('clicks on the Sign In button', () => {
  cy.get('#signInBtn').contains("Sign In").click();
}); 

And("can see the homepage {string}", (pageName) => {
  cy.contains(pageName);
});

When("The user clicks on the {string} tab", (orderName) => {
  cy.contains(orderName).click();
});

Then(
  "The user should see all questions in the database with the most recently posted answers first",
  () => {
    verifyActiveOrder();
  }
);

// Scenario Outline: Return to the Active tab after viewing questions in another order
//     Given The user is viewing questions in "<currentOrder>"
//     When The user clicks on the "Active" order
//     Then The user should see all questions in the database with the most recently posted answers first
Given('It is a registered user on the login page {string}', (url) => {
  cy.visit(url);
});

When('The user enters the correct username and password', () => {
  fillSignInForm(existingUser.username, existingUser.password);
});
And('clicks on the Sign In button', () => {
  cy.get('#signInBtn').contains("Sign In").click();
}); 
And("The user is viewing questions in {string}", (currentOrder) => {
  cy.contains(currentOrder).click();
});

When("The user clicks on the {string} order", (orderName) => {
  cy.contains(orderName).click();
});

Then(
  "The user should see all questions in the database with the most recently posted answers first",
  () => {
    verifyActiveOrder();
  }
);

// Scenario: Return to Active after viewing Tags
//     Given The user is viewing the homepage "http://localhost:3000"
//     When The user clicks on the "Tags" menu item
//     And clicks on the "Questions" menu item
//     And clicks on the "Active" tab
//     Then The user should see all questions in the database with the most recently posted answers first

Given('It is a registered user on the login page {string}', (url) => {
  cy.visit(url);
});

When('The user enters the correct username and password', () => {
  fillSignInForm(existingUser.username, existingUser.password);
});
And('clicks on the Sign In button', () => {
  cy.get('#signInBtn').contains("Sign In").click();
}); 

When("The user clicks on the {string} menu item", (menuItem) => {
  cy.contains(menuItem).click();
});

And("clicks on the {string} menu item", (menuItem) => {
  cy.contains(menuItem).click();
});

And("clicks on the {string} tab", (tabName) => {
  cy.contains(tabName).click();
});

Then(
  "The user should see all questions in the database with the most recently posted answers first",
  () => {
    verifyActiveOrder();
  }
);
// Scenario: View questions in Active order after creating a question
// Given The user is viewing the homepage "http://localhost:3000"
// And The user is able to see the homepage "All Questions"
// And The user has created a new question
// When The user clicks on the "Active" tab
// Then The user should see all questions in the database with the most recently answers first
Given('It is a registered user on the login page {string}', (url) => {
  cy.visit(url);
});

When('The user enters the correct username and password', () => {
  fillSignInForm(existingUser.username, existingUser.password);
});
And('clicks on the Sign In button', () => {
  cy.get('#signInBtn').contains("Sign In").click();
}); 
And("The user is able to see the homepage {string}", (pageName) => {
  cy.contains(pageName);
});
And("The user has created a new question", () => {
  createQuestion(Q5_TITLE, "Test Question A Text", "javascript", "mks1");
});
When("The user clicks on the {string} tab", (tabName) => {
  cy.contains(tabName).click();
});
Then(
  "The user should see all questions in the database with the most recently answers first",
  () => {
    verifyActiveOrderAfterAddingQuestion();
  }
);


// Scenario: View questions in Active order after creating and answering question
// Given The user is viewing the homepage "http://localhost:3000"
// And The user has created a new question
// And clicks on the "Answer Question" button filling out the necessary fields like Username, Answer text
// When The user clicks on the "Questions" tab
// And clicks on the "Active" tab
// Then The user should see all questions in the database with most recently posted answers first
Given('It is a registered user on the login page {string}', (url) => {
  cy.visit(url);
});

When('The user enters the correct username and password', () => {
  fillSignInForm(existingUser.username, existingUser.password);
});
And('clicks on the Sign In button', () => {
  cy.get('#signInBtn').contains("Sign In").click();
}); 
  And("The user has created a new question", () => {
    createQuestion(Q5_TITLE, "Test Question A Text", "javascript", "pop");
  });
  And(
    "clicks on the {string} button filling out the necessary fields like Username, Answer text",
    (buttonName) => {
      createAnswer(Q5_TITLE, "pop", "Answer Question Aight");
    }
  );
  When("The user clicks on the {string} tab", (tabName) => {
    cy.contains("Questions").click();
  });
  And("clicks on the {string} tab", (tabName) => {
    cy.contains(tabName).click();
  });
  Then(
    "The user should see all questions in the database with most recently posted answers first",
    () => {
      verifyActiveOrderAfterAddingQuestion();
    }
  );

