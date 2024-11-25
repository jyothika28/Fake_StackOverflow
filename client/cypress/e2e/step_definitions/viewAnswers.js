
import { Given, When, Then, And} from "cypress-cucumber-preprocessor/steps";
import '../../support/hooks';
const AnswerData={
    title: "android studio save string shared preference, start activity and load the saved string",
    username: "saltyPeter",
    answers:[
        {
            text: "Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.",
            username: "abaya"
        },
        {
            text:"YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);",
            username:"alia"
        },
        {
            text:"I just found all the above examples just too confusing, so I wrote my own.",
            username:"sana"
        },
        {
            text:"A new answer to the shared preference question",
            username:"Ross"
        }
    ]  
}
function createQuestion(title, text, tag, username) {
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type(title);
    cy.get("#formTextInput").type(text);
    cy.get("#formTagInput").type(tag);
    cy.get("#formUsernameInput").type(username);
    cy.contains("Post Question").click();
}
//createAnswer(Q5_TITLE, "abc3", "Answer Question A");
function createAnswer(qtitle, username, text) {
    //Add a wait here to ensure the question is created before we try to answer it
    cy.contains(qtitle).click();
    cy.contains("Answer Question");
cy.contains("Answer Question").click();
    cy.get("#answerUsernameInput").type(username);
    cy.get("#answerTextInput").type(text);
    cy.contains("Post Answer").click();
}
// Scenario: View answers for a specific question
//         Given The user is on the homepage "http://localhost:3000"
//         And The user can see "All Questions" 
//         When The user clicks on a question that has answers
//         Then The user should see a list of answers associated with the question
//         And The answers should display the username and timestamp of the person who answered

Given('The user is on the homepage {string}', (url) => {
    cy.visit(url);
});
And('The user can see {string}', (pageName) => {
    cy.contains(pageName);
});
When('The user clicks on a question that has answers', () => {
    //get the first question with class name postTitle and click on it
    cy.get(".postTitle").contains("Quick question about storage on android").click();
});
{/* <div className="answerAuthor">
        <div className="answer_author">{ansBy}</div>
        <div className="answer_question_meta">{meta}</div>
      </div> */}
Then('The user should see a list of answers associated with the question', () => {
    cy.get(".answer").should("have.length", 1);
});
And('The answers should display the username and timestamp of the person who answered', () => {
    cy.get(".answer_author").should("contain", "ihba001");
    cy.get(".answer_question_meta").should("contain", "Mar 22, 2023 at 21:17:53");
} );

// Scenario: View all answers for a question after creating an answer
// Given The user is on the homepage "http://localhost:3000"
// And The user has created a New uestion
// And Creates a new answer
// Then The user should see the new answer displayed with the username and timestamp

Given('The user is on the homepage {string}', (url) => {
    cy.visit(url);
});
And('The user has created a New Question', () => {
    createQuestion("Test Question", "abc", "Test", "rachel");
});
And('Creates a new answer', () => {
    createAnswer("Test Question", "monica geller", "Answering the Test Question");
});
Then('The user should see the new answer displayed with the username and timestamp', () => {
    cy.get(".answer").should("have.length", 1);
    cy.get("#answerText").should("contain", "Answering the Test Question");
    cy.get(".answer_author").should("contain", "monica geller");
    cy.get(".answer_question_meta").should("contain", "0 seconds");
} );

// Scenario: View all answers for a question after creating and viewing answers in "active" order
//         Given The user is on the homepage "http://localhost:3000"
//         And creates a new answer
//         And The new answer is displayed
//         And The user clicks on the "Questions" tab
//         When The user clicks on the "Active" tab
//         Then The user should see the new question displayed with the username and metadata

Given('The user is on the homepage {string}', (url) => {
    cy.visit(url);
});
And('creates a new answer', () => {
    createAnswer("android studio save string shared preference, start activity and load the saved string", "Ross", "A new answer to the shared preference question");
});
And('The new answer is displayed', () => {
    cy.get(".answer").should("have.length", AnswerData.answers.length);
    AnswerData.answers.forEach((answer, index) => {
        cy.get(".answer").eq(index).within(() => {
            // Verify the answer text
            cy.get("#answerText").contains(answer.text);
            cy.get(".answer_author").contains(answer.username);
        });
    });
});
And('The user clicks on the {string} tab', (tabName) => {
    cy.contains(tabName).click();
});
When('The user clicks on the {string} tab', (tabName) => {
    cy.contains(tabName).click();
});
Then('The user should see the new question displayed with the username and metadata', () => {
    cy.get(".postTitle").contains(AnswerData.title);
    cy.get(".question_author").contains(AnswerData.username);
    cy.get(".postStats").contains(`${AnswerData.answers.length} answers`);
} );
