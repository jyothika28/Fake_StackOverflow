Feature: View all questions by Newest order
  As a user with read access to Fake Stack Overflow
  I want to view all questions in the database sorted by their creation time
  So that I can easily find the most recently created questions.

  Scenario: View questions in Newest order
    Given The user can access the homepage "http://localhost:3000"
    And can see the homepage "All Questions"
    When The user clicks on the "Newest" tab
    Then The user should see all questions in the database sorted by newest creation time first

  Scenario Outline: Return to the Newest tab after viewing questions in another order
    Given The user is viewing questions in "<currentOrder>"
    When The user clicks on the "Newest" tab
    Then The user should see all questions in the database sorted by newest creation time first

    Examples:
      | currentOrder |
      | Active       |
      | Unanswered   |

  Scenario: Return to Newest after viewing Tags
    Given The user is viewing the homepage "http://localhost:3000"
    When The user clicks on the "Tags" menu item
    And clicks on the "Questions" menu item
    And clicks on the "Newest" tab
    Then The user should see all questions in the database sorted by newest creation time first

  Scenario: View questions in Newest order after creating a question and answering question
    Given The user is viewing the homepage "http://localhost:3000"
    And The user has created a new question
    And clicks on the "Answer Question" button filling out the necessary fields like Username, Answer text
    When The user clicks on the "Questions" tab
    And clicks on the "Newest" tab
    Then The user should see all questions in the database sorted by newest creation time, first





