Feature: Search questions by search string or tagname/s.

  As a user with read access to Fake Stack Overflow
  I want to search questions by search string or tagname/s
  So that I can find questions that are relevant to me.

  Scenario: Search questions by search string
    Given The user can access the homepage "http://localhost:3000"
    And can see the homepage "All Questions"
    When The user enters a search string in the search bar
    And clicks enter
    Then The user should see only questions that contain the search string in the title or text

  Scenario: Search questions by tagname
    Given The user can access the homepage "http://localhost:3000"
    And can see the homepage "All Questions"
    When The user clicks on a tagname
    Then The user should see only questions that contain the tagname in the tags

  Scenario: No questions in the database contain the search string or tagname
    Given The user can access the homepage "http://localhost:3000"
    And can see the homepage "All Questions"
    When The user enters a search string in the search bar that does not exist in the database
    And clicks enter
    Then The user should see a message "No Questions Found"

  Scenario: Search questions by search string and tagname
    Given The user can access the homepage "http://localhost:3000"
    And can see the homepage "All Questions"
    When The user enters a search string in the search bar
    And clicks on a tagname
    Then The user should see the questions that contain the tagname and the metadata information

