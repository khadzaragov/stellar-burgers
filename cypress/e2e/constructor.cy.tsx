describe('Burger constructor page', () => {
  beforeEach(() => {
    cy.mockUser();
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.setTokens();
    cy.visit('/');
    cy.wait('@getUser');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookies();
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

    cy.get('[data-testid="burger-constructor"]').within(() => {
      cy.contains('Краторная булка N-200i (верх)').should('exist');
      cy.contains('Краторная булка N-200i (низ)').should('exist');
      cy.contains('Филе люминесцентного тетраодонтимформа').should('exist');
    });
  });

  it('should open and close ingredient modal', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-testid="ingredient-details"]').within(() => {
      cy.contains('Краторная булка N-200i').should('exist');
      cy.contains('420').should('exist');
      cy.contains('80').should('exist');
      cy.contains('24').should('exist');
      cy.contains('53').should('exist');
    });
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="ingredient-details"]').should('not.exist');
    cy.contains('Детали ингредиента').should('not.exist');

    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-testid="ingredient-details"]').within(() => {
      cy.contains('Краторная булка N-200i').should('exist');
      cy.contains('420').should('exist');
      cy.contains('80').should('exist');
      cy.contains('24').should('exist');
      cy.contains('53').should('exist');
    });
    cy.get('[data-testid="modal-overlay"]').click('topLeft', { force: true });
    cy.get('[data-testid="ingredient-details"]').should('not.exist');
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('should create order and clear constructor', () => {
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('postOrder');

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
    cy.wait('@postOrder');
    cy.contains('1234').should('exist');
    cy.get('[data-testid="modal-close"]').click();
    cy.contains('1234').should('not.exist');
    cy.contains('Выберите булки');
    cy.contains('Выберите начинку');
  });
});