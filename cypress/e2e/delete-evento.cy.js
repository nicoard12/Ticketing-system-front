describe("Eliminar evento", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("debe cancelar un evento", () => {
    cy.get('[data-cy="evento-box"]')
      .should("have.length.at.least", 1)
      .last()
      .click();
    cy.url().should("include", "evento/");

    cy.get("#eliminar-evento").click();
    cy.get("#cancel-deletion").click();

    cy.url().should("include", "evento/");
    cy.get('h1[data-cy="title"]').should("exist");
  });

  it("debe eliminar un evento", () => {
    cy.get('[data-cy="evento-box"]')
      .should("have.length.at.least", 1)
      .last()
      .click();
    cy.url().should("include", "evento/");

    cy.get("#eliminar-evento").click();
    cy.get("#confirm-deletion").click();

    //Verificar redireccion a home
    cy.contains("Evento eliminado");
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
