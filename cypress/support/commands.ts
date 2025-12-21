/// <reference types="cypress" />
Cypress.Commands.add("uploadImage", (selector: string, fixturePath: string) => {
  cy.get(selector).selectFile(`cypress/fixtures/${fixturePath}`, {
    force: true,
  });

  cy.get('img[data-cy="preview-image"]')
    .should("exist")
});


Cypress.Commands.add("fillEventForm", (data) => {
  if (data.titulo) {
    cy.get('input[name="titulo"]').type(data.titulo)
  }

  if (data.descripcion) {
    cy.get('textarea[name="descripcion"]').type(data.descripcion)
  }

  if (data.cantidadEntradas) {
    cy.get('input[name="cantidadEntradas"]').type(data.cantidadEntradas)
  }

  if (data.precioEntrada) {
    cy.get('input[name="precioEntrada"]').type(data.precioEntrada)
  }

  if (data.ubicacion) {
    cy.get('input[name="ubicacion"]').type(data.ubicacion)
  }

  if (data.imagen) {
    cy.uploadImage('input[name="imagen"]', data.imagen)
  }

  if (data.fecha) {
    cy.get('input[name="fecha"]').clear().type(data.fecha)

    if (data.fecha2) {
      cy.get('button[data-cy="add-date-button"]').click()
      cy.get('input[name="fecha"]').eq(1).clear().type(data.fecha2)
    }
  }
})
