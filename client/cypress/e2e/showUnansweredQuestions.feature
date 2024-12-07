Feature: View Unanswered Questions
  As a user with read access to Fake Stack Overflow
  I want to view all unanswered questions in the database
  So that I can find questions that still need answers.

  Scenario: View unanswered questions
    Given It is a registered user on the login page "http://localhost:3000"
When The user enters the correct username and password
And clicks on the Sign In button
    And can see the homepage "All Questions"
    When The user clicks on the "Unanswered" tab
    Then The user should see only unanswered questions in the database

  Scenario: View unanswered questions after creating a question
   Given It is a registered user on the login page "http://localhost:3000"
When The user enters the correct username and password
And clicks on the Sign In button
    And The user has created a new Question
    When The user clicks on the "Unanswered" tab
    Then The user should see Unanswered questions in the database

  Scenario Outline: Return to Unanswered tab after creating and viewing questions in another order
    Given It is a registered user on the login page "http://localhost:3000"
When The user enters the correct username and password
And clicks on the Sign In button
    When The user is viewing questions in "<currentOrder>"
    And The user has created a new Question
    When The user clicks on the "Unanswered" tab
    Then The user should see only unanswered questions in database

    Examples:
      | currentOrder |
      | Newest       |
      | Active       |