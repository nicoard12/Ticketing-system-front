import './commands'

// Configuraciones globales
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornar false previene que Cypress falle el test
  // Útil si la aplicación tiene errores no críticos
  return false
})