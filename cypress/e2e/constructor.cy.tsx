describe('Burger constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('should add bun and ingredient to constructor', () => {
    cy.contains('Краторная булка N-200i')
      .parent()
      .within(() => {
        cy.contains('Добавить').click();
      });
    cy.contains('Филе люминесцентного тетраодонтимформа')
      .parent()
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains('Краторная булка N-200i (верх)').should('exist');
    cy.contains('Филе люминесцентного тетраодонтимформа').should('exist');
  });

  it('should open and close ingredient modal', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('button').contains('Close').should('not.exist');
    cy.get('button').first().click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('should create order and clear constructor', () => {
    cy.setCookie('accessToken', 'test');
    cy.window().then((w) => {
      w.localStorage.setItem('refreshToken', 'test');
    });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });

    cy.contains('Краторная булка N-200i')
      .parent()
      .within(() => {
        cy.contains('Добавить').click();
      });
    cy.contains('Филе люминесцентного тетраодонтимформа')
      .parent()
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains('Оформить заказ').click();
    cy.contains('1234').should('exist');
    cy.get('.overlay').click('center');
    cy.contains('1234').should('not.exist');
    cy.contains('Выберите булки');
    cy.contains('Выберите начинку');
  });
});