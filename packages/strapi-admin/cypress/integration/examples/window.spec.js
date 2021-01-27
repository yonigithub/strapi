/* eslint-disable strict */
/* eslint-disable no-undef */
/// <reference types="cypress" />

context('Strapi auth', () => {
  // beforeEach(cy.setup);
  // afterEach(cy.reset);

  beforeEach(() => {
    cy.visit('http://localhost:4000/admin');
  });

  it('login', () => {
    cy.task('reset');

    cy.findByLabelText('Email')
      .should('exist')
      .type('test@test.fr');
    cy.findByLabelText('Mot de Passe')
      .should('exist')
      .type('mypassword');
    cy.findByRole('button', { name: 'Se connecter' })
      .should('exist')
      .click();
    cy.findByText('Invalid credentials').should('be.visible');
  });
});
