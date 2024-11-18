const { Q1_DESC, Q2_DESC, Q3_DESC, Q4_DESC, A1_TXT, A2_TXT } = require('../../../server/data/posts_strings.ts');

describe("Cypress Tests to verify all questions are displayed after creating a new question", () => {
  beforeEach(() => {
    cy.exec("npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/fake_so");
    // Seed the database before each test
    cy.exec("npm run --prefix ../server populate_db mongodb://127.0.0.1:27017/fake_so");
  });

  afterEach(() => {
    // Clear the database after each test
    cy.exec("npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/fake_so");
  });

  it("Checks if a6 and a7 exist in q3 answers page", () => {
    const answers = [
      "Using GridFS to chunk and store content.",
      "Storing content as BLOBs in databases.",
    ];
    cy.visit("http://localhost:3000");
    cy.contains(Q3_DESC).click();
    cy.get(".answerText").each(($el, index) => {
      cy.contains(answers[index]);
    });
  });

  it("Checks if a8 exist in q4 answers page", () => {
    cy.visit("http://localhost:3000");
    cy.contains(Q4_DESC).click();
    cy.contains("Store data in a SQLLite database.");
  });
  
});