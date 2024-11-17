Feature: Show Questions by recent answers
As a user with read access to fake stack overflow
I want to see all questions in the database in most recently answered or active order
So that I can view the questions that were answered most recently

  Scenario: Show all questions in active order on user request
    Given The user can access the homepage "http://localhost:3000"
    And can see the homepage "All Questions"
    When The user clicks on the "Active" tab
    Then The user should see all questions in the database with the most recently posted answers first

  Scenario Outline: Return to the Active tab after viewing questions in another order
    Given The user is viewing questions in "<currentOrder>"
    When The user clicks on the "Active" order
    Then The user should see all questions in the database with the most recently posted answers first

    Examples:
      | currentOrder |
      | Newest       |
      | Unanswered   |

  Scenario: Return to Active after viewing Tags
    Given The user is viewing the homepage "http://localhost:3000"
    When The user clicks on the "Tags" menu item
    And clicks on the "Questions" menu item
    And clicks on the "Active" tab
    Then The user should see all questions in the database with the most recently posted answers first

  Scenario: View questions in active order after answering questions
    Given The user is viewing the homepage "http://localhost:3000"
    And The user has created a new question
    And answers the new question
    And The user answers an existing question from the "Questions" page
    When The user clicks on the "Active" tab in the "Questions" page
    Then The user should see all questions in the database in new active order
