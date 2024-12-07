Feature: Logout
    As a user
    I want to be able to logout
    So that I can protect my account

    Scenario: Logout successfully
        Given It is a registered user on the login page "http://localhost:3000"
        When The user enters the correct username and password
        And clicks on the Sign In button
        And The user is viewing the homepage
        And clicks on the Profile icon button
        And clicks on the Logout button
        Then The user should be logged out and redirected to the Sign In page

    
