import { Before, After } from 'cypress-cucumber-preprocessor/steps';

// Run before each scenario
Before(() => {
    // Reset and populate the database
    cy.exec("npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/fake_so");
    cy.exec("npm run --prefix ../server populate_db mongodb://127.0.0.1:27017/fake_so");
});

// Run after each scenario
After(() => {
    // Clean up the database
    cy.exec("npm run --prefix ../server remove_db mongodb://127.0.0.1:27017/fake_so");
});
