describe('Burger constructor page', () => {
  beforeEach(() => {
    cy.mockUser();
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.setTokens();
    cy.visit('/');
    cy.wait('@getUser');
    cy.wait('@getIngredients');
    cy.contains('Краторная булка N-200i').as('bunItem');
    cy.contains('Филе люминесцентного тетраодонтимформа').as('mainItem');
    cy.get('[data-testid="burger-constructor"]').as('constructor');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should add bun and ingredient to constructor', () => {
    cy.get('@bunItem')
      .parent()
      .within(() => {
        cy.contains('Добавить').click();
      });
    cy.get('@mainItem')
      .parent()
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.get('@constructor').within(() => {
      cy.contains('Краторная булка N-200i (верх)').should('exist');
      cy.contains('Краторная булка N-200i (низ)').should('exist');
      cy.contains('Филе люминесцентного тетраодонтимформа').should('exist');
    });
  });

  it('should open and close ingredient modal', () => {
    cy.get('@bunItem').click();
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

    cy.get('@bunItem').click();
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

    cy.get('@bunItem')
      .parent()
      .within(() => {
        cy.contains('Добавить').click();
      });
    cy.get('@mainItem')
      .parent()
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains('Оформить заказ').click();
    cy.wait('@postOrder');
    cy.contains('1234').should('exist');
    cy.get('[data-testid="modal-close"]').click();
    cy.contains('1234').should('not.exist');
    cy.get('[data-testid="burger-constructor"]').within(() => {
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
});