Feature: Commenting and voting/rating.

    Context: Commenting and voting/rating on posts allows users to engage with content, share opinions, and evaluate contributions. This feature embeds values like engagement (encouraging user participation), accountability (transparent feedback on content quality), and usability (intuitive interfaces for commenting and voting).

    Description: As a user, I want to comment on posts and rate them so that I can contribute to discussions and provide feedback on the quality of posts and comments. The stakeholders are the Primary Stakeholders, Users who engage with posts by commenting and voting. Secondary Stakeholders, Moderators ensuring the integrity of comments and ratings.

    Scenario: Adding a Comment
        Given It is a registered user on the login page "http://localhost:3000"
        When The user enters the correct username and password
        And clicks on the Sign In button
        And can see the homepage "All Questions"
        When The user clicks on a question that has answers
        And enters a comment in the comment section and click "Post Comment"
        Then The user should see the comment added to the answer

    Scenario: Voting on a Question
    Given It is a registered user on the login page "http://localhost:3000"
        When The user enters the correct username and password
        And clicks on the Sign In button
        And can see the homepage "All Questions"
        When The user clicks on a question
        And clicks on the "Upvote" button
        Then The questions vote count should be upvoted

     Scenario: Voting on a Question
    Given It is a registered user on the login page "http://localhost:3000"
        When The user enters the correct username and password
        And clicks on the Sign In button
        And can see the homepage "All Questions"
        When The user clicks on a question
        And clicks on the "Downvote" button
        Then The questions vote count should be down voted

    Scenario: Flagging a Question
    Given It is a registered user on the login page "http://localhost:3000"
        When The user enters the correct username and password
        And clicks on the Sign In button
        And can see the homepage "All Questions"
        When The user clicks on a question
        And clicks on the "Flag" button
        Then The question should see "Flagged" on the question

    Scenario: Flagging an Answer
    Given It is a registered user on the login page "http://localhost:3000"
        When The user enters the correct username and password
        And clicks on the Sign In button
        And can see the homepage "All Questions"
        When The user clicks on a question
        And clicks on the "Flag" button on the answer
        Then The answer should see "Flagged" on the answer

    Scenario: Flagging a Comment
    Given It is a registered user on the login page "http://localhost:3000"
        When The user enters the correct username and password
        And clicks on the Sign In button
        And can see the homepage "All Questions"
        When The user clicks on a question
        And clicks on the "Flag" button on the comment
        Then The comment should see "Flagged" on the comment
        
    Scenario: Voting on an Answer
     Given It is a registered user on the login page "http://localhost:3000"
        When The user enters the correct username and password
        And clicks on the Sign In button
        And can see the homepage "All Questions"
        When The user clicks on a question
     And I click the "Upvote" button on the answer
     Then the answers vote count should display "Refresh" temporarily
     When I navigate back to the question page
     Then the answers vote count should display the updated value reflecting the new vote

    # Scenario: Viewing Comment Threads
    #     Given I am a logged-in user viewing an answer
    #     When I scroll through the comments section
    #     Then I should see comments displayed.

    # Threat Modeling:

    # Scenario: Rate Limiting for Commenting and Voting
    #     Given: I repeatedly add comments or votes in a short period.
    #     When: I exceed a predefined rate limit.
    #     Then: The system should throttle requests temporarily to prevent abuse.