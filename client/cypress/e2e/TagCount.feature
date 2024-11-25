Feature: View all tags and the number of questions associated with each tag
  As a user with read access to Fake Stack Overflow
  I want to view all tags in the system along with the number of questions associated with each tag
  So that I can easily identify popular topics and explore related questions.

  Scenario: View all tags with the number of questions associated
    Given The user can access the homepage "http://localhost:3000"
    When The user clicks on the "Tags" tab
    Then The user should see a list of all tags in the system
    And The user should see the number of questions associated with each tag

  Scenario Outline: View tags after viewing questions in a different order
    Given The user is viewing questions in "<currentOrder>"
    When The user clicks on the "Tags" tab
    Then The user should see a list of all tags in the system
    And The user should see the number of questions associated with each tag

    Examples:
      | currentOrder |
      | Newest       |
      | Active       |
      | Unanswered   |

  Scenario: View all tags after creating a question
    Given The user can access the homepage "http://localhost:3000"
    When The user creates a question with the tag "react"
    And The user clicks on the "Tags" tab
    Then The user should see a list of all tags in the system with the update number for the "react" tag

# Scenario Outline: View questions associated with a tag when clicked
#     Given The user is on the "Tags" page
#     And The user can see the list of tags and their associated question counts
#     When The user clicks on a tag named "<tagName>"
#     Then The user should be taken to a page showing all questions associated with the tag "<tagName>"
#     And The questions should be listed with the correct tag displayed

#     Examples:
#       | tagName       |
#       | javascript    |
#       | react         |
#       | storage       |
#       | shared-preferences |


