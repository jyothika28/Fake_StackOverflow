Feature: Tampering

Description
This issue focuses on addressing the tampering threat across the application by implementing input sanitization and validation. It ensures the security and integrity of user-provided data, preventing injection attacks and unauthorized tampering. This applies to critical features such as registration, login, and profile management.

Scenario: Prevent Tampering of Registration Inputs

Given The user has access to "http://localhost:3000"
And clicks on "Don't have an account? Sign up"
When The user fills out input fields first name, last name, username with malicious scripts or code
And clicks on Register button
Then Then the user should be registered with the sanitized inputs
When the user tries to login with the tampered credentials
Then The application should display an error message like, "No account found with this username. Please register or try again." without revealing specific details about the input validation


# Scenario: Input Tampering - Invalid Characters in Login Credentials
# Given I am on the login page.
# When I enter a username or password containing invalid characters like "<script>" or special symbols.
# Then The application should sanitize the inputs to remove harmful or malicious content.
# And Display an error message like, "No account found with this username. Please register or try again." without revealing specific details about the input validation.
