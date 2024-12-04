Feature: User Registration
    As a new user, I want to register an account so that I can securely access my personalized content and application features. The Stakeholders are the Primary Stakeholders, New users registering to access the platform. Secondary Stakeholders and application administrators, ensuring secure and accurate user data.


Scenario: Successful Registration
Given The user has access to "http://localhost:3000"
And clicks on "Don't have an account? Sign up"
When the user fills out the required fields first name, last name, username, email, password, and optional date of birth
And clicks on "Register" button
Then the user is Successfully redirected to the Sign in page to login with the newly created account

Scenario: Registration with Existing Email
Given The user has access to "http://localhost:3000"
And clicks on "Don't have an account? Sign up"
When the user fills out the necessary fields with existing email
And clicks on "Register" button
Then the user should see an error message stating, "This email is already registered. Please use a different email or log in."


Scenario: Invalid Email Format
Given The user has access to "http://localhost:3000"
And clicks on "Don't have an account? Sign up"
When the user enters an email address in an invalid format with missing @ or domain
And clicks on the "Register" button
Then The user should see an error message stating, "Invalid email format. Please enter a valid email address."

Scenario: Duplicate Username
Given The user has access to "http://localhost:3000"
And clicks on "Don't have an account? Sign up"
When The user attempts to register using a username that is already taken
And clicks on the "Register" button
Then The user should see an error message stating, "This username is already in use. Please choose a different username."

Scenario: Weak Password
Given The user has access to "http://localhost:3000"
And clicks on "Don't have an account? Sign up"
When The user enters a password that does not meet the required strength criteria  
And clicks on the "Register" button
Then The user should see an error message stating, "Password is too weak. Please ensure your password has at least 8 characters, one uppercase letter, and one special character."


Scenario: Passwords do not match
Given The user has access to "http://localhost:3000"
And clicks on "Don't have an account? Sign up"
When The user enters a password in the "Password" field and a different password in the "Confirm Password" field
And clicks on the "Register" button
Then The user should see an error message stating, "Passwords do not match. Please ensure both password fields match exactly."

Scenario: Registration with Missing Email
Given The user has access to "http://localhost:3000"
And clicks on "Don't have an account? Sign up"
When The user fills out the necessary fields except the email field
And clicks on the "Register" button
Then The user should see an error message stating, "Email cannot be empty."

Scenario: Registration with Missing First Name
Given The user has access to "http://localhost:3000"
And clicks on "Don't have an account? Sign up"
When The user fills out the necessary fields except the first name field
And clicks on the "Register" button
Then The user should see an error message stating, "First name cannot be empty."

Scenario: Registration with Missing Last Name
Given The user has access to "http://localhost:3000"
And clicks on "Don't have an account? Sign up"
When The user fills out the necessary fields except the last name field
And clicks on the "Register" button
Then The user should see an error message stating, "Last name cannot be empty."

Scenario: Registration with Missing Username
Given The user has access to "http://localhost:3000"
And clicks on "Don't have an account? Sign up"
When The user fills out the necessary fields except the username field
And clicks on the "Register" button
Then The user should see an error message stating, "Username cannot be empty."

Scenario: Registration with Missing Password
Given The user has access to "http://localhost:3000"
And clicks on "Don't have an account? Sign up"
When The user fills out the necessary fields except the password field
And clicks on the "Register" button
Then The user should see an error message stating, "Password cannot be empty."


Scenario: Registration with Missing Confirm Password
Given The user has access to "http://localhost:3000"
And clicks on "Don't have an account? Sign up"
When The user fills out the necessary fields except the confirm password field
And clicks on the "Register" button
Then The user should see an error message stating, "Confirm Password cannot be empty."



# Should LOOK INTO THIS
# Scenario: Successful Registration and Login
# Given The user has access to "http://localhost:3000"
# And clicks on "Don't have an account? Sign up"
# When the user fills out the required fields first name, last name, username, email, password, and optional date of birth to register
# And clicks on "Register" button
# Then the user is Successfully redirected to the login page to login with the newly created account
# When the user enters the newly registered username and password on the login page
# And clicks on the "Sign In" button
# Then the user is successfully logged in and should see All Questions page




