Feature: User Authentication

As a registered user, I want to log into my account to access my personalized content and settings. The stakeholders are the Primary Stakeholders, Registered users who need to securely access their accounts. Secondary Stakeholders, Application administrators, ensuring secure authentication and maintaining user session data.

Scenario: Successful User Login
Given It is a registered user on the login page "http://localhost:3000"
When The user enters the correct username and password
And clicks on the "Sign In" button
Then The user should be redirected to the homepage and see personalized content

Scenario: Missing Username
Given It is a registered user on the login page "http://localhost:3000"
When the user enters a blank username field and a password
And clicks on the "Sign In" button
Then The user should see an error message stating, "Username cannot be empty."

Scenario: Missing Password
Given It is a registered user on the login page "http://localhost:3000"
When the user enters a username and leaves the password field blank
And clicks on the "Sign In" button
Then The user should see an error message stating, "Password cannot be empty."

Scenario: Account Not Registered
Given It is a registered user on the login page "http://localhost:3000"
When the user enters a username that is not associated with any account
And clicks on the "Sign In" button
Then The user should see an error message stating, "No account found with this username. Please register or try again."


Scenario: Incorrect Login Credentials
Given It is a registered user on the login page "http://localhost:3000"
When the user enters a incorrect password
And clicks on the "Sign In" button
Then The user should see an error message stating, "Invalid credentials. Please try again."

