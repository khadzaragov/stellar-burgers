import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';
import { createOrder } from './orders';

export interface ConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient(state, action: PayloadAction<number>) {
      state.ingredients.splice(action.payload, 1);
    },
    moveIngredient(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      const item = state.ingredients[action.payload.fromIndex];
      state.ingredients.splice(action.payload.fromIndex, 1);
      state.ingredients.splice(action.payload.toIndex, 0, item);
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state) => {
      state.bun = null;
      state.ingredients = [];
    });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
