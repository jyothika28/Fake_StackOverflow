Feature: View Unanswered Questions
  As a user with read access to Fake Stack Overflow
  I want to view all unanswered questions in the database
  So that I can find questions that still need answers.

  Scenario: View unanswered questions
    Given The user can access the homepage "http://localhost:3000"
    And can see the homepage "All Questions"
    When The user clicks on the "Unanswered" tab
    Then The user should see only unanswered questions in the database

  Scenario: View unanswered questions after creating a question
    Given The user is viewing the homepage "http://localhost:3000"
    And The user has created a new Question
    When The user clicks on the "Unanswered" tab
    Then The user should see Unanswered questions in the database

  Scenario Outline: Return to Unanswered tab after creating and viewing questions in another order
    Given The user is viewing the homepage "http://localhost:3000"
    When The user is viewing questions in "<currentOrder>"
    And The user has created a new Question
    When The user clicks on the "Unanswered" tab
    Then The user should see only unanswered questions in database

    Examples:
      | currentOrder |
      | Newest       |
      | Active       |