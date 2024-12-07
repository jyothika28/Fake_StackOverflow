#upto
Feature: Show Questions by recent answers
  As a user with read access to fake stack overflow
  I want to see all questions in the database in most recently answered or active order
  So that I can view the questions that were answered most recently
 
 

  Scenario: Show all questions in active order on user request
    Given It is a registered user on the login page "http://localhost:3000"
When The user enters the correct username and password
And clicks on the Sign In button
    And can see the homepage "All Questions"
    When The user clicks on the "Active" tab
    Then The user should see all questions in the database with the most recently posted answers first

  Scenario Outline: Return to the Active tab after viewing questions in another order
    Given It is a registered user on the login page "http://localhost:3000"
When The user enters the correct username and password
And clicks on the Sign In button
    And The user is viewing questions in "<currentOrder>"
    When The user clicks on the "Active" order
    Then The user should see all questions in the database with the most recently posted answers first

    Examples:
      | currentOrder |
      | Newest       |
      | Unanswered   |

  Scenario: Return to Active after viewing Tags
    Given It is a registered user on the login page "http://localhost:3000"
When The user enters the correct username and password
And clicks on the Sign In button
    When The user clicks on the "Tags" menu item
    And clicks on the "Questions" menu item
    And clicks on the "Active" tab
    Then The user should see all questions in the database with the most recently posted answers first

  Scenario: View questions in Active order after creating a question
   Given It is a registered user on the login page "http://localhost:3000"
When The user enters the correct username and password
And clicks on the Sign In button
    And The user is able to see the homepage "All Questions"
    And The user has created a new question
    When The user clicks on the "Active" tab
    Then The user should see all questions in the database with the most recently answers first

   Scenario: View questions in Active order after creating and answering question
    Given It is a registered user on the login page "http://localhost:3000"
When The user enters the correct username and password
And clicks on the Sign In button
    And The user has created a new question
    And clicks on the "Answer Question" button filling out the necessary fields like Username, Answer text
    When The user clicks on the "Questions" tab
    And clicks on the "Active" tab
    Then The user should see all questions in the database with most recently posted answers first



