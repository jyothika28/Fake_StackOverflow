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
      npm install 
      or
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
1. Download the [Code QL bundle](https://github.com/github/codeql-action/releases/tag/codeql-bundle-v2.19.3) for your operating system.

2. Extract the archive to a directory of your choosing. Let's call this directory `<extraction-root>`

3. Verify the installation by running the following command:

    `$ <extraction-root>/codeql/codelql resolve packs`

    If the installation was succesful, in the output for the above command you should be able to see the path to the ql packs for javascript. The location should be within the extracted CodeQL CLI bundle in the directory `<extraction-root>`. If the CodeQL CLI is unable to locate the qlpacks for the expected languages, check that you downloaded the CodeQL bundle and not a standalone copy of the CodeQL CLI.

3. Prepare the code for analysis by running the following command:

    `$ <extract-root>/codeql/codeql database create <database> --language=javascript-typescript`

    `<database>` is the path to the directory of your choosing where you want the CodeQL database of your source code to be stored. Remember CodeQL first creates an intermediate representation of your source code before performing the analysis. This intermediate representation is called [semmle](https://en.wikipedia.org/wiki/Semmle).

4. Analyze the code and generate report using the following command:

    `$ ~/codeql/codeql database analyze <path/to/codeql-database> --format="sarif-latest" --output <path/to/report/report.sarif>`

5. Analyze the report to see potential vulnerabilities in your code and take steps to fix them.

6. You can run the following script to obtain quick stats about the report:

    `$ npx ts-node codeql-quick-stats.ts`


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

- Any additional information (if any) about your implemention that you would like to inform the grader should be documented in **README-misc.md**.

1. npx eslint server/
This error in server eslint is not resolving. We have migrated to eslint.config.js from .eslintrc.json but the error still persists. Updated eslint.config.js & package.json multiple times but the error still persists.

     ```
/Users/ankurharitosh/Documents/NEU/SWE-Fall-24/Project/final-project-jyotikha-ankur/server/jest.config.js
2:1  error  'module' is not defined  no-undef

✖ 1 problem (1 error, 0 warnings)

    ```

2. Running Jest tests
When running all tests individually, they all pass.
But when we run all togethor, this happens for a few: listen EADDRINUSE: address already in use :::8000