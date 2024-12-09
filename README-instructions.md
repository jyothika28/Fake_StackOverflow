- Instructions to test the deployed application on Render 
 Render server link - https://final-project-jyotikha-ankur-server.onrender.com
 Render client link - https://final-project-jyotikha-ankur-3.onrender.com
- Instructions to run the jest tests

  ```
    cd server
    npm install
    npx jest --runInBand tests/application.test.ts
    npx jest --runInBand tests/comment.test.ts
    npx jest --runInBand tests/flagQuestion.test.ts
    npx jest --runInBand tests/loginUser.test.ts
    npx jest --runInBand tests/logoutUser.test.ts
    npx jest --runInBand tests/newAnswer.test.ts
    npx jest --runInBand tests/newQuestion.test.ts
    npx jest --runInBand tests/newUser.test.ts
    npx jest --runInBand tests/question.test.ts
    npx jest --runInBand tests/questions.test.ts
    npx jest --runInBand tests/tags.test.ts
    npx jest --runInBand tests/voteAnswer.test.ts
  ```
- Instructions to run the Cypress test cases.
  To populate the database in the local mongo db

  ```
  cd server
  npm run remove_db
  npm run populate_db
  ```
  In a new terminal: Start the server
   ```
      cd server
      npm install
      npm start
    ```

  In a new terminal: Start the client
    ```
      cd client
      npm install --force
      npm start
    ```

  In a new terminal
    ```
      cd client
      npx cypress run --spec cypress/e2e/
    ```

      Or

    ```
      npx cypress open

    ```

- Instructions to generate the coverage report for jest tests.

  ```
      cd server
      npx jest --coverage tests/
  ```

- Instructions to generate the CodeQL report for your application's server.
- Instructions to set environment variables that one may need to run any scripts or tests.

      ```
      cd server
      ```
      Create a new file ".env"

      Paste the following environment variables
      ```
      REACT_APP_MONGODB_URI="mongodb+srv://jyothikajalla032:amMSZ0ELR8AemRhg@fakestackdb.bi9cb.mongodb.net/?retryWrites=true&w=majority&appName=FakeStackDB"

      PORT=8000
      REACT_APP_CLIENT_URL="http://localhost:3000"
      ```
