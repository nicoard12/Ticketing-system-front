describe("Formulario de evento", () => {
  beforeEach(() => {
    // Visitar formulario de evento antes de cada test
    cy.visit("/registrar-evento");
  });

  it("debe mostrar todos los campos del formulario", () => {
    cy.get('input[name="titulo"]').should("be.visible");
    cy.get('textarea[name="descripcion"]').should("be.visible");
    cy.get('input[name="cantidadEntradas"]').should("be.visible");
    cy.get('input[name="precioEntrada"]').should("be.visible");
    cy.get('input[name="ubicacion"]').should("be.visible");
    cy.get('input[name="fecha"]').should("be.visible");
  });

  it("debe completar y enviar el formulario correctamente", () => {
    //completar datos
    cy.fixture("test-data.json").then((data) => {
      const event = data.validEvent;
      cy.get('input[name="titulo"]').type(event.titulo);
      cy.get('textarea[name="descripcion"]').type(event.descripcion);
      cy.get('input[name="cantidadEntradas"]').type(event.cantidadEntradas);
      cy.get('input[name="precioEntrada"]').type(event.precioEntrada);
      cy.get('input[name="ubicacion"]').type(event.ubicacion);
      cy.uploadImage('input[name="imagen"]', event.imagen);
      cy.get('input[name="fecha"]').clear().type(event.fecha);
      cy.get('button[data-cy="add-date-button"]').click(); //agrego una segunda fecha
      cy.get('input[name="fecha"]').eq(1).clear().type(event.fecha2);
    });

    //Enviar form
    cy.get('button[type="submit"]').click();

    //Espero un tiempo por subida de imagen a cloudinary
    cy.wait(3000);

    //Verificar redireccion a home
    cy.contains("Evento creado");
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("debe cancelar correctamente el registro de un evento", () => {
    cy.get('button[data-cy="cancel-button"]').click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
