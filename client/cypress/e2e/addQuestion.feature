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