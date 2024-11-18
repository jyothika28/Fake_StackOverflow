const { Q1_DESC, Q2_DESC, Q3_DESC, Q4_DESC, A1_TXT, A2_TXT } = require('../../../server/data/posts_strings.ts');

describe("Verify searching ", () => {
  beforeEach(() => {
    cy.exec("npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/fake_so");
    // Seed the database before each test
    cy.exec("npm run --prefix ../server populate_db mongodb://127.0.0.1:27017/fake_so");
  });

  afterEach(() => {
    // Clear the database after each test
    cy.exec("npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/fake_so");
  });

  it("Search for a question using text content that does not exist", () => {
    const searchText = "Web3";

    cy.visit("http://localhost:3000");
    cy.get("#searchBar").type(`${searchText}{enter}`);
    cy.get(".postTitle").should("have.length", 0);
  });

  it("Search string in question text", () => {
    const qTitles = [Q3_DESC];
    cy.visit("http://localhost:3000");
    cy.get("#searchBar").type("40 million{enter}");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("Search string in question text", () => {
    const qTitles = [Q4_DESC];
    cy.visit("http://localhost:3000");
    cy.get("#searchBar").type("data remains{enter}");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("Search a question by tag (t1)", () => {
    const qTitles = [Q1_DESC];
    cy.visit("http://localhost:3000");
    cy.get("#searchBar").type("[react]{enter}");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("Search a question by tag (t2)", () => {
    const qTitles = [
      Q2_DESC,
      Q1_DESC,
    ];
    cy.visit("http://localhost:3000");
    cy.get("#searchBar").type("[javascript]{enter}");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("Search a question by tag (t3)", () => {
    const qTitles = [
      Q4_DESC,
      Q2_DESC,
    ];
    cy.visit("http://localhost:3000");
    cy.get("#searchBar").type("[android-studio]{enter}");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("Search a question by tag (t4)", () => {
    const qTitles = [
      Q4_DESC,
      Q2_DESC,
    ];
    cy.visit("http://localhost:3000");
    cy.get("#searchBar").type("[shared-preferences]{enter}");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("Search for a question using a tag that does not exist", () => {
    cy.visit("http://localhost:3000");
    cy.get("#searchBar").type("[nonExistentTag]{enter}");
    cy.get(".postTitle").should("have.length", 0);
  });

  it("Search by tag from new question page", () => {
    const qTitles = [
      Q4_DESC,
      Q2_DESC,
    ];
    cy.visit("http://localhost:3000");
    cy.contains("Ask a Question").click();
    cy.get("#searchBar").type("[shared-preferences]{enter}");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("Search by text from Tags page", () => {
  
    cy.visit("http://localhost:3000");
    cy.contains("Tags").click();
    cy.get("#searchBar").type("40 million{enter}");
    cy.get(".postTitle").should("have.length", 1);
  });
});