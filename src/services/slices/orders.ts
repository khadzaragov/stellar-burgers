import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import {
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi
} from '../../utils/burger-api';

export interface OrdersState {
  orders: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderDetails: TOrder | null;
  error: string | null;
}

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  getOrdersApi
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (ids: string[]) => await orderBurgerApi(ids)
);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

const initialState: OrdersState = {
  orders: [],
  orderRequest: false,
  orderModalData: null,
  orderDetails: null,
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderModalData(state) {
      state.orderModalData = null;
    },
    clearOrderDetails(state) {
      state.orderDetails = null;
    },
    setUserOrders(state, action: PayloadAction<TOrder[]>) {
      state.orders = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.orders = action.payload;
        }
      )
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<{ order: TOrder }>) => {
          state.orderRequest = false;
          state.orderModalData = action.payload.order;
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || null;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<{ orders: TOrder[] }>) => {
          state.orderDetails = action.payload.orders[0];
        }
      );
  }
});

export const { clearOrderModalData, clearOrderDetails, setUserOrders } =
  ordersSlice.actions;
export default ordersSlice.reducer;
