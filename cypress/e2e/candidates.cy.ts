describe('Candidatos', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should create a candidate', () => {
    cy.contains('Listado de candidatos').should('be.visible');

    cy.get('.add-button').click();
    cy.wait(200);

    cy.contains('Creación de Candidato').should('be.visible');

    cy.get('input[formControlName="name"]').focus().type('Cristian');
    cy.get('input[formControlName="surname"]').focus().type('Manuel');

    cy.get('input[type="file"]').selectFile('cypress/fixtures/test.xlsx', { force: true });

    cy.contains('test.xlsx').should('be.visible');

    cy.get('button[type="submit"]').click();

    cy.contains('Candidato creado exitosamente').should('be.visible');

    cy.contains('Creación de Candidato').should('not.exist');

    cy.contains('Cristian').should('be.visible');
    cy.contains('Manuel').should('be.visible');
  });

  it('should validate form`s fields', () => {
    cy.get('.add-button').click();
    cy.wait(200);

    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('input[formControlName="name"]').focus().type('Cristian');
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('input[formControlName="surname"]').focus().type('Ángel');
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('input[type="file"]').selectFile('cypress/fixtures/test.xlsx', { force: true });

    cy.get('button[type="submit"]').should('not.be.disabled');
  });
});
