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

  it("Adds a question with tags, checks the tags existied", () => {
    cy.visit("http://localhost:3000");

    // add a question with tags
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question A");
    cy.get("#formTextInput").type("Test Question A Text");
    cy.get("#formTagInput").type("test1 test2 test3");
    cy.get("#formUsernameInput").type("mks1");
    cy.contains("Post Question").click();

    // clicks tags
    cy.contains("Tags").click();
    cy.contains("test1");
    cy.contains("test2");
    cy.contains("test3");
  });

  it("Checks if all tags exist", () => {
    cy.visit("http://localhost:3000");
    // all tags exist in the page
    cy.contains("Tags").click();
    cy.contains("react", { matchCase: false });
    cy.contains("javascript", { matchCase: false });
    cy.contains("android-studio", { matchCase: false });
    cy.contains("shared-preferences", { matchCase: false });
    cy.contains("storage", { matchCase: false });
    cy.contains("website", { matchCase: false });
  });

  it("Checks if all questions exist inside tags", () => {
    cy.visit("http://localhost:3000");
    // all question no. should be in the page
    cy.contains("Tags").click();
    cy.contains("6 Tags");
    cy.contains("1 question");
    cy.contains("2 question");
  });

  it("go to question in tag react", () => {
    cy.visit("http://localhost:3000");
    // all question no. should be in the page
    cy.contains("Tags").click();
    cy.contains("react").click();
    cy.contains(Q1_DESC);
  });

  it("go to questions in tag storage", () => {
    cy.visit("http://localhost:3000");
    // all question no. should be in the page
    cy.contains("Tags").click();
    cy.contains("storage").click();
    cy.contains(Q4_DESC);
    cy.contains(Q3_DESC);
  });

  it("create a new question with a new tag and finds the question through tag", () => {
    cy.visit("http://localhost:3000");

    // add a question with tags
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question A");
    cy.get("#formTextInput").type("Test Question A Text");
    cy.get("#formTagInput").type("test1-tag1");
    cy.get("#formUsernameInput").type("mks1");
    cy.contains("Post Question").click();

    // clicks tags
    cy.contains("Tags").click();
    cy.contains("test1-tag1").click();
    cy.contains("Test Question A");
  });

  it("Clicks on a tag and verifies the tag is displayed", () => {
    const tagNames = "javascript";

    cy.visit("http://localhost:3000");
    cy.contains("Tags").click();

    cy.contains(tagNames).click();
    cy.get(".question_tags").each(($el, index, $list) => {
      cy.wrap($el).should("contain", tagNames);
    });
  });

  it("Clicks on a tag in homepage and verifies the questions related tag is displayed", () => {
    const tagNames = "storage";

    cy.visit("http://localhost:3000");

    //clicks the 3rd tag associated with the question.
    cy.get(".question_tag_button").eq(2).click();

    cy.get(".question_tags").each(($el, index, $list) => {
      cy.wrap($el).should("contain", tagNames);
    });
  });
});