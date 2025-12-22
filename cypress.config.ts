import { defineConfig } from "cypress"

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    video: false,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 2000,
    requestTimeout: 2000,
    responseTimeout: 2000,
    setupNodeEvents(on, config) {
      // Implementar plugins aquí si es necesario
    },
  },
})