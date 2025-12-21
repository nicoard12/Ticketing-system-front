describe("Navegación de la aplicación", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("debe navegar al formulario de evento", () => {
    cy.get("#crear-evento").click();
    cy.url().should("include", "registrar-evento");
    cy.contains("Crear evento");
  });

  it("debe volver a la página principal desde el formulario", () => {
    cy.visit("/registrar-evento");
    cy.get("#home-logo").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("debe navegar a un evento", () => {
    cy.get('[data-cy="evento-box"]')
      .should("have.length.at.least", 1)
      .first()
      .click();
    cy.url().should("include", "evento/");
    cy.contains("Eliminar evento");
  });
});
