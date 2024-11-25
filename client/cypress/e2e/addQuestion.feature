Feature: Adding new questions
  As a user with write access to Fake Stack Overflow
  I want to add a new question to the application
  So that I can ask a question to the community

  Scenario: Add a new question successfully
    Given The user has write access to the application "http://localhost:3000"
    When The user clicks the "Ask a Question" button
    And fills out the necessary fields
    And clicks the "Post Question" button
    Then The user should see the new question in the All Questions page with the metadata information

  Scenario: Add a new question with missing Question title
    Given The user has write access to the application "http://localhost:3000"
    When The user clicks the "Ask a Question" button
    And fills out the necessary fields except Question title
    And clicks the "Post Question" button
    Then The user should see an error message "Title cannot be empty"

  Scenario: Add a new question with missing Question Text
    Given The user has write access to the application "http://localhost:3000"
    When The user clicks the "Ask a Question" button
    And fills out the necessary fields leaving Question text field empty
    And clicks the "Post Question" button
    Then The user should see an error message "Question text cannot be empty"

  Scenario: Add a new question with missing Tags
    Given The user has write access to the application "http://localhost:3000"
    When The user clicks the "Ask a Question" button
    And fills out the necessary fields leaving Tags field empty
    And clicks the "Post Question" button
    Then The user should see an error message "Should have at least 1 tag"

  Scenario: Add a new question with missing Username
    Given The user has write access to the application "http://localhost:3000"
    When The user clicks the "Ask a Question" button
    And fill out the necessary fields leaving Username field empty
    And clicks the "Post Question" button
    Then The user should see an error message "Username cannot be empty"

  Scenario: Add a new question with exceeding 100 character limit in Question title
    Given The user has write access to the application "http://localhost:3000"
    When The user clicks the "Ask a Question" button
    And fills out the necessary fields with Question title exceeding 100 character limit
    And clicks the "Post Question" button
    Then The user should see an error message "Title cannot be more than 100 characters"

  Scenario: Add a new question with missing Question title, Question text, Tags and Username
    Given The user has write access to the application "http://localhost:3000"
    When The user clicks the "Ask a Question" button
    And leaves Question title, Question text, Tags and Username fields empty
    And clicks the "Post Question" button
    Then The user should see an error message "Title cannot be empty"
    And The user should see an error message "Question text cannot be empty"
    And The user should see an error message "Should have at least 1 tag"
    And The user should see an error message "Username cannot be empty"

