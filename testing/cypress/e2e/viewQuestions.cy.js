const { Q1_DESC, Q2_DESC, Q3_DESC, Q4_DESC, A1_TXT, A2_TXT } = require('../../../server/data/posts_strings.ts');

describe("Cypress Tests to verify that all questions are being displayed", () => {
  beforeEach(() => {
    cy.exec("npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/fake_so");
    // Seed the database before each test
    cy.exec("npm run --prefix ../server populate_db mongodb://127.0.0.1:27017/fake_so");
  });

  afterEach(() => {
    // Clear the database after each test
    cy.exec("npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/fake_so");
  });

  it("Check if questions are displayed in descending order of dates.", () => {
    const qTitles = [
      Q4_DESC,
      Q3_DESC,
      Q2_DESC,
      Q1_DESC,
    ];

    cy.visit("http://localhost:3000");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("successfully shows all questions in model in active order", () => {
    const qTitles = [
      Q1_DESC,
      Q2_DESC,
      Q4_DESC,
      Q3_DESC,
    ];
    cy.visit("http://localhost:3000");
    cy.contains("Active").click();
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });
});
