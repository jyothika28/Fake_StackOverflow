Feature: View the answers to all questions that have answers.
    As a read access user to Fake Stack Overflow
I want to view answers to questions that have been answered
So that I can gain insights or find solutions to similar issues

Scenario: View answers for a specific question
        Given The user is on the homepage "http://localhost:3000"
        And The user can see "All Questions" 
        When The user clicks on a question that has answers
        Then The user should see a list of answers associated with the question
        And The answers should display the username and timestamp of the person who answered

    Scenario: View all answers for a question after creating an answer
        Given The user is on the homepage "http://localhost:3000"
        And The user has created a New Question
        And Creates a new answer
        Then The user should see the new answer displayed with the username and timestamp


Scenario: View all answers for a question after creating and viewing answers in "active" order
        Given The user is on the homepage "http://localhost:3000"
        And creates a new answer
        And The new answer is displayed
        And The user clicks on the "Questions" tab
        When The user clicks on the "Active" tab
        Then The user should see the new question displayed with the username and metadata