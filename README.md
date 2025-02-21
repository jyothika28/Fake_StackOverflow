## Fake Stack Overflow
Fake Stack Overflow is a MERN stack application that features user authentication, profiles, post moderation, and tag management, with a strong focus on security through STRIDE threat modeling. I implemented Jest and Cypress tests to ensure reliability, achieving 90% code coverage while validating 9 user stories against BDD scenarios. The application is deployed on Render.js with a CI/CD pipeline, streamlining updates and maintenance. I designed a responsive UI using Material UI and integrated CodeQL for automated vulnerability detection, reinforcing security and performance.

Tech Stack
Front-End: React.js, TypeScript, Material UI<br/>
Back-End: Node.js, Express.js, MongoDB<br/>
Authentication: Secure validation & hashed passwords(bcrypt)<br/>
Deployment: Render (Frontend&Backend)<br/>

Features
1. User Authentication – Secure login & registration with strong password policies.
2. Post Questions & Answers – Users can ask programming-related questions and provide answers.
3. Voting System – Upvote/downvote questions & answers to highlight the best solutions.
4. Commenting System – Discuss answers in the comments section.
5. Tagging System – Categorize questions with relevant tags.
6. Search & Filter – Find questions based on keywords and popularity.

Security & Data Integrity
- Data Integrity Checks: Server-side validation ensures votes & answers can't be altered via client-side tampering.
- Input Sanitization – Used express-validator to prevent XSS(Cross-Site Scripting) attacks.
 Server-side validation ensures users cannot alter votes or answers via client-side tampering.

Development & Workflow
1. Issue Tracking: Used GitHub Issues with labels & project boards to manage bugs, enhancements & feature requests.
2. CI/CD Pipeline: Automated testing & deployment with GitHub Actions:
  - Runs Jest unit tests on each push.
  - Executes Cypress E2E tests on the staging environment.
  - Deploys to Vercel (frontend) & Render (backend) upon successful tests.

Testing:
- Unit & Integration Testing with Jest
- End-to-End (E2E) Testing with Cypress
- Executed BDD scenarios
