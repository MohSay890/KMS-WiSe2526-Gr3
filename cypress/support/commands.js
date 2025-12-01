// cypress/support/commands.js
Cypress.Commands.add('createTodo', (title) => {
  cy.get('#task-title').type(title);
  cy.get('#todo-form').submit();
});

Cypress.Commands.add('clearAllData', () => {
  cy.clearLocalStorage();
  cy.reload();
});
