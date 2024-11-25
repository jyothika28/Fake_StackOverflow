Feature: Post a new Answer

  As a user with write access to Fake Stack Overflow
  I want to post an answer to a question
  So that I can help the community

  Scenario: Post an answer successfully
    Given The user has write access to the application "http://localhost:3000"
    And The user is viewing a question
    And clicks the "Answer Question" button
    And fills out the necessary fields like Username, Answer text
    And clicks the "Post Answer" button
    Then The user should see the new answer in the question page with the metadata information

  Scenario: Post an answer with missing Username
    Given The user has write access to the application "http://localhost:3000"
    And The user is viewing a question
    And clicks the "Answer Question" button
    And fills out the necessary fields leaving Username field empty
    And clicks the "Post Answer" button
    Then The user should see an error message "Username cannot be empty"

  Scenario: Post an answer with missing Answer text
    Given The user has write access to the application "http://localhost:3000"
    And The user is viewing a question
    And clicks the "Answer Question" button
    And fills out the necessary fields leaving Answer text field empty
    And clicks the "Post Answer" button
    Then The user should see an error message "Answer text cannot be empty"


