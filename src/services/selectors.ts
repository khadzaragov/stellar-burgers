import { RootState } from './store';
import { ConstructorState } from './slices/burger-constructor';

export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const selectFeedOrders = (state: RootState) => state.feeds.orders;
export const selectFeedInfo = (state: RootState) => ({
  total: state.feeds.total,
  totalToday: state.feeds.totalToday
});
export const selectFeedsLoading = (state: RootState) => state.feeds.isLoading;

export const selectUserOrders = (state: RootState) => state.orders.orders;
export const selectOrderRequest = (state: RootState) =>
  state.orders.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.orders.orderModalData;

export const selectConstructorItems = (state: RootState): ConstructorState =>
  state.burgerConstructor;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
