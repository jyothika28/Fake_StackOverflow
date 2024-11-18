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

  it('Adds three questions and one answer, then click "Questions", then click unanswered button, verifies the sequence', () => {
    cy.visit("http://localhost:3000");

    // add a question
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question A");
    cy.get("#formTextInput").type("Test Question A Text");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("mks1");
    cy.contains("Post Question").click();

    // add another question
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question B");
    cy.get("#formTextInput").type("Test Question B Text");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("mks2");
    cy.contains("Post Question").click();

    // add another question
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question C");
    cy.get("#formTextInput").type("Test Question C Text");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("mks3");
    cy.contains("Post Question").click();

    // add an answer to question A
    cy.contains("Test Question A").click();
    cy.contains("Answer Question").click();
    cy.get("#answerUsernameInput").type("abc3");
    cy.get("#answerTextInput").type("Answer Question A");
    cy.contains("Post Answer").click();

    // go back to main page
    cy.contains("Questions").click();

    // clicks unanswered
    cy.contains("Unanswered").click();
    const qTitles = ["Test Question C", "Test Question B"];
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("Adds multiple questions one by one and displays them in All Questions", () => {
    cy.visit("http://localhost:3000");

    // Add multiple questions
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question 1");
    cy.get("#formTextInput").type("Test Question 1 Text");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("joym");
    cy.contains("Post Question").click();

    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question 2");
    cy.get("#formTextInput").type("Test Question 2 Text");
    cy.get("#formTagInput").type("react");
    cy.get("#formUsernameInput").type("abhi");
    cy.contains("Post Question").click();

    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question 3");
    cy.get("#formTextInput").type("Test Question 3 Text");
    cy.get("#formTagInput").type("java");
    cy.get("#formUsernameInput").type("abhi");
    cy.contains("Post Question").click();

    // verify the presence of multiple questions in most recently added order.
    cy.contains("Fake Stack Overflow");
    const qTitles = [
      "Test Question 3",
      "Test Question 2",
      "Test Question 1",
      Q4_DESC,
      Q3_DESC,
      Q2_DESC,
      Q1_DESC,
    ];
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });

    // verify that when clicking "Unanswered", the unanswered questions are shown
    cy.contains("Unanswered").click();
    const qTitlesUnanswered = [
      "Test Question 3",
      "Test Question 2",
      "Test Question 1",
    ];
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitlesUnanswered[index]);
    });
  });

  it("Ask a Question creates and displays expected meta data", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question Q1");
    cy.get("#formTextInput").type("Test Question Q1 Text T1");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("new user 32");
    cy.contains("Post Question").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("5 questions");
    cy.contains("new user 32 asked 0 seconds ago");
    const answers = [
      "0 answers",
      "1 answers",
      "2 answers",
      "3 answers",
      "2 answers",
    ];
    const views = [
      "0 views",
      "103 views",
      "200 views",
      "121 views",
      "10 views",
    ];
    cy.get(".postStats").each(($el, index, $list) => {
      cy.wrap($el).should("contain", answers[index]);
      cy.wrap($el).should("contain", views[index]);
    });
    cy.contains("Unanswered").click();
    cy.get(".postTitle").should("have.length", 1);
    cy.contains("1 question");
  });

  it("Ask a Question with empty title shows error", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Ask a Question").click();
    cy.get("#formTextInput").type("Test Question 1 Text Q1");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("new user 32");
    cy.contains("Post Question").click();
    cy.contains("Title cannot be empty");
  });
});