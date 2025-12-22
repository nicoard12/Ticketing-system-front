/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    uploadImage(selector: string, filePath: string): Chainable<void>;
    fillEventForm(data: any);
  }
}
