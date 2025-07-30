import { rootReducer } from './store';

describe('rootReducer', () => {
  it('should return initial state', () => {
    const state = rootReducer(undefined, { type: '' });
    expect(state).toEqual({
      ingredients: { items: [], isLoading: false, error: null },
      feeds: { orders: [], total: 0, totalToday: 0, isLoading: false, error: null },
      orders: {
        orders: [],
        orderRequest: false,
        orderModalData: null,
        orderDetails: null,
        error: null
      },
      auth: {
        user: null,
        isLoggedIn: false,
        isLoading: false,
        isAuthChecked: false,
        error: null
      },
      burgerConstructor: { bun: null, ingredients: [] },
      password: { isLoading: false, error: null }
    });
  });
});