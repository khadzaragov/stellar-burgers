import { rootReducer } from './store';
import { initialState as ingredientsInitialState } from './slices/ingredients';
import { initialState as feedsInitialState } from './slices/feeds';
import { initialState as ordersInitialState } from './slices/orders';
import { initialState as authInitialState } from './slices/auth';
import { initialState as burgerInitialState } from './slices/burger-constructor';
import { initialState as passwordInitialState } from './slices/password';

describe('rootReducer', () => {
  it('should return initial state', () => {
    const state = rootReducer(undefined, { type: '' });
    expect(state).toEqual({
      ingredients: ingredientsInitialState,
      feeds: feedsInitialState,
      orders: ordersInitialState,
      auth: authInitialState,
      burgerConstructor: burgerInitialState,
      password: passwordInitialState
    });
  });
});