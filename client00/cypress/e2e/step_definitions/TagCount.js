import { Given, When, Then, And, Before, After } from "cypress-cucumber-preprocessor/steps";

const tags = [
    { name: "react", count: 1 },
    { name: "javascript", count: 2 },
    { name: "android-studio", count: 2 },
    { name: "shared-preferences", count: 2 },
    { name: "storage", count: 2 },
    { name: "website", count: 1 }
];

// Clean up database before and after tests
Before(() => {
    cy.exec("npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/fake_so");
    cy.exec("npm run --prefix ../server populate_db mongodb://127.0.0.1:27017/fake_so");
});

After(() => {
    cy.exec("npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/fake_so");
});

// Helper function to validate tag counts
function tagCount() {
    cy.get(".tag").each(($el, index) => {
        cy.wrap($el).should("contain", tags[index].name);
        cy.wrap($el).should("contain", `${tags[index].count} questions`);
    });
}


// Scenario: View all tags with the number of questions associated
// Given The user can access the homepage "http://localhost:3000"
// When The user clicks on the "Tags" tab
// Then The user should see a list of all tags in the system
// And The user should see the number of questions associated with each tag

Given('The user can access the homepage {string}', (url) => {
    cy.visit(url);
});
    
    When('The user clicks on the {string} tab', (tabName) => {
        cy.contains(tabName).click();
    });
    
    Then('The user should see a list of all tags in the system', () => {
        cy.get(".tag_list").within(() => {
            cy.get(".tagNode").should("have.length", tags.length);
        });
    });

    And('The user should see the number of questions associated with each tag', () => {
        cy.get(".tagNode").each(($el, index) => {
            cy.wrap($el).within(() => {
                cy.get(".tagName").should("contain", tags[index].name);
                cy.contains(`${tags[index].count} questions`);
            });
        });
    });
    

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

Given('The user is viewing questions in {string}', (currentOrder) => {
    cy.contains(currentOrder).click();
});

When('The user clicks on the {string} tab', (tabName) => {
    cy.contains(tabName).click();
});

Then('The user should see a list of all tags in the system', () => {
    cy.get(".tag_list").within(() => {
        cy.get(".tagNode").should("have.length", tags.length);
    });
});

And('The user should see the number of questions associated with each tag', () => {
    cy.get(".tagNode").each(($el, index) => {
        cy.wrap($el).within(() => {
            cy.get(".tagName").should("contain", tags[index].name);
            cy.contains(`${tags[index].count} questions`);
        });
    });
});

// Scenario Outline: View questions associated with a tag when clicked
// Given The user is on the "Tags" page
// And The user can see the list of tags and their associated question counts
// When The user clicks on a tag named "<tagName>"
// Then The user should be taken to a page showing all questions associated with the tag "<tagName>"
// And The questions should be listed with the correct tag displayed

// Examples:
//   | tagName       |
//   | javascript    |
//   | react         |
//   | storage       |
//   | shared-preferences |

Given('The user is on the {string} page', (pageName) => {
    cy.contains(pageName).click();
}
);
    
And('The user can see the list of tags and their associated question counts', () => {
    cy.get(".tag_list").within(() => {
        cy.get(".tagNode").each(($el, index) => {
            cy.wrap($el).within(() => {
                cy.get(".tagName").should("contain", tags[index].name);
                cy.contains(`${tags[index].count} questions`);
            });
        });
    });
});
    
When('The user clicks on a tag named {string}', (tagName) => {
    cy.get(".tagNode").contains(tagName).click();
});
    
Then('The user should be taken to a page showing all questions associated with the tag {string}', (tagName) => {
    cy.url().should("include", `/tags/${tagName}`);
    cy.get(".questions-list").should("be.visible");
});
    
And('The questions should be listed with the correct tag displayed', (tagName) => {
    cy.get(".question-item").each(($el) => {
        cy.wrap($el).should("contain", tagName);
    });
});

