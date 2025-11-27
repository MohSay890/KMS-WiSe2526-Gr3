describe('UAT: Kernfunktionalität der ToDo-Liste', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('sollte ein neues ToDo erfolgreich zur Liste hinzufügen und anzeigen', () => {
    const neuerTask = 'Cypress UATs erfolgreich abschließen';

    cy.get('#task-title').type(neuerTask);
    cy.get('#todo-form').submit();
    cy.get('#task-list').should('contain', neuerTask);
    cy.get('#task-list > li').should('have.length', 1);
  });

  it('sollte ein ToDo als erledigt markieren können', () => {
    const zuErledigen = 'Test-Item zum Abhaken';

    cy.get('#task-title').type(zuErledigen);
    cy.get('#todo-form').submit();

    cy.contains('li', zuErledigen)
      .find('input[type="checkbox"]')
      .click();

    cy.contains('li', zuErledigen).should('have.class', 'completed');
  });
});
