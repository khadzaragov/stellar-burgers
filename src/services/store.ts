import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsReducer from './slices/ingredients';
import feedsReducer from './slices/feeds';
import ordersReducer from './slices/orders';
import authReducer from './slices/auth';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  orders: ordersReducer,
  auth: authReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
