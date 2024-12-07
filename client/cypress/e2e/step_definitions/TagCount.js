import {
  Given,
  When,
  Then,
And
} from "cypress-cucumber-preprocessor/steps";
import '../../support/hooks';
import { fillSignInForm,existingUser } from "./login";
const tags = [
  { name: "react", count: 1 },
  { name: "javascript", count: 2 },
  { name: "android-studio", count: 2 },
  { name: "shared-preferences", count: 2 },
  { name: "storage", count: 2 },
  { name: "website", count: 1 },
];


// Helper function to validate tag counts
function tagCount() {
  cy.get(".tag").each(($el, index) => {
    cy.wrap($el).should("contain", tags[index].name);
    cy.wrap($el).should("contain", `${tags[index].count} questions`);
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

// Scenario: View all tags with the number of questions associated
// Given The user can access the homepage "http://localhost:3000"
// When The user clicks on the "Tags" tab
// Then The user should see a list of all tags in the system
// And The user should see the number of questions associated with each tag

Given('It is a registered user on the login page {string}', (url) => {
  cy.visit(url);
});

When('The user enters the correct username and password', () => {
  fillSignInForm(existingUser.username, existingUser.password);
});
And('clicks on the Sign In button', () => {
  cy.get('#signInBtn').contains("Sign In").click();
});  

When("The user clicks on the {string} tab", (tabName) => {
  cy.contains(tabName).click();
});

Then("The user should see a list of all tags in the system", () => {
  cy.get(".tag_list").within(() => {
    cy.get(".tagNode").should("have.length", tags.length);
  });
});

And(
  "The user should see the number of questions associated with each tag",
  () => {
    cy.get(".tagNode").each(($el, index) => {
      cy.wrap($el).within(() => {
        cy.get(".tagName").should("contain", tags[index].name);
        cy.contains(`${tags[index].count} questions`);
      });
    });
  }
);

// Scenario Outline: View tags after viewing questions in a different order
// Given The user is viewing questions in "<currentOrder>"
// When The user clicks on the "Tags" tab
// Then The user should see a list of all tags in the system
// And The user should see the number of questions associated with each tag

// Examples:
//   | currentOrder |
//   | Newest       |
//   | Active       |
//   | Unanswered   |
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

When("The user clicks on the {string} tab", (tabName) => {
  cy.contains(tabName).click();
});

Then("The user should see a list of all tags in the system", () => {
  cy.get(".tag_list").within(() => {
    cy.get(".tagNode").should("have.length", tags.length);
  });
});

And(
  "The user should see the number of questions associated with each tag",
  () => {
    cy.get(".tagNode").each(($el, index) => {
      cy.wrap($el).within(() => {
        cy.get(".tagName").should("contain", tags[index].name);
        cy.contains(`${tags[index].count} questions`);
      });
    });
  }
);

// Scenario: View all tags after creating a question
// Given The user can access the homepage "http://localhost:3000"
// When The user creates a question with the tag "react"
// And The user clicks on the "Tags" tab
// Then The user should see a list of all tags in the system with the updated count for the "react" tag

Given('It is a registered user on the login page {string}', (url) => {
  cy.visit(url);
});

When('The user enters the correct username and password', () => {
  fillSignInForm(existingUser.username, existingUser.password);
});
And('clicks on the Sign In button', () => {
  cy.get('#signInBtn').contains("Sign In").click();
});  
When("The user creates a question with the tag {string}", (tag) => {
  createQuestion("New Question", "New Question Text", tag, "New User");
});
And("The user clicks on the {string} tab", (tabName) => {
  cy.contains(tabName).click();
});
Then(
  "The user should see a list of all tags in the system with the update number for the {string} tag",
  (tag) => {
    cy.get(".tag_list").within(() => {
      cy.get(".tagNode").each(($el, index) => {
        if (tags[index].name === tag) {
          cy.wrap($el).within(() => {
            cy.get(".tagName").should("contain", tags[index].name);
            cy.contains(`${tags[index].count + 1} questions`);
          });
        }
      });
    });
  }
);
