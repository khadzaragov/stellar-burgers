Cypress.Commands.add('mockUser', () => {
  cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
});

Cypress.Commands.add('setTokens', () => {
  Cypress.on('window:before:load', (win) => {
    win.localStorage.setItem('accessToken', 'test');
    win.localStorage.setItem('refreshToken', 'test');
    win.document.cookie = 'accessToken=test';
  });
});

export {};