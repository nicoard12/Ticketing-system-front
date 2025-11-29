describe('Navegación de la aplicación', () => {
  beforeEach(() => {
    // Visitar la página principal antes de cada test
    cy.visit('/')
  })

  it('debe cargar la página principal correctamente', () => {
    cy.contains('TicketingSystem')
  })

})