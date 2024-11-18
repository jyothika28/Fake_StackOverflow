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

  it("Created new answer should be displayed at the top of the answers page", () => {
    const answers = [
      "Test Answer 1",
      A1_TXT,
      A2_TXT,
    ];
    cy.visit("http://localhost:3000");
    cy.contains(Q1_DESC).click();
    cy.contains("Answer Question").click();
    cy.get("#answerUsernameInput").type("joym");
    cy.get("#answerTextInput").type(answers[0]);
    cy.contains("Post Answer").click();
    cy.get(".answerText").each(($el, index) => {
      cy.contains(answers[index]);
    });
    cy.contains("joym");
    cy.contains("0 seconds ago");
  });

  it("Username is mandatory when creating a new answer", () => {
    cy.visit("http://localhost:3000");
    cy.contains(Q1_DESC).click();
    cy.contains("Answer Question").click();
    cy.get("#answerTextInput").type("Test Anser 1");
    cy.contains("Post Answer").click();
    cy.contains("Username cannot be empty");
  });

  it("Answer is mandatory when creating a new answer", () => {
    cy.visit("http://localhost:3000");
    cy.contains(Q1_DESC).click();
    cy.contains("Answer Question").click();
    cy.get("#answerUsernameInput").type("joym");
    cy.contains("Post Answer").click();
    cy.contains("Answer text cannot be empty");
  });

  it("Verifies if adding new answers to a questions makes it active", () => {
    cy.visit("http://localhost:3000");

    // add a question
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question A");
    cy.get("#formTextInput").type("Test Question A Text");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("mks0");
    cy.contains("Post Question").click();

    // add an answer to question of React Router
    cy.contains(Q1_DESC).click();
    cy.contains("Answer Question").click();
    cy.get("#answerUsernameInput").type("mks1");
    cy.get("#answerTextInput").type("Answer to React Router");
    cy.contains("Post Answer").click();

    // go back to main page
    cy.contains("Questions").click();

    // add an answer to question of Android Studio
    cy.contains(
      Q2_DESC
    ).click();
    cy.contains("Answer Question").click();
    cy.get("#answerUsernameInput").type("mks1");
    cy.get("#answerTextInput").type("Answer to android studio");
    cy.contains("Post Answer").click();

    // go back to main page
    cy.contains("Questions").click();

    // add an answer to question A
    cy.contains("Test Question A").click();
    cy.contains("Answer Question").click();
    cy.get("#answerUsernameInput").type("mks2");
    cy.get("#answerTextInput").type("Answer Question A");
    cy.contains("Post Answer").click();

    // go back to main page
    cy.contains("Questions").click();

    // clicks active
    cy.contains("Active").click();

    const qTitles = [
      "Test Question A",
      Q2_DESC,
      Q1_DESC,
      Q4_DESC,
      Q3_DESC,
    ];
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });
});