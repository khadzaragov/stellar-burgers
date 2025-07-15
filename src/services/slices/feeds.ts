import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '../../utils/types';
import { getFeedsApi } from '../../utils/burger-api';

export interface FeedsState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
}

export const fetchFeeds = createAsyncThunk(
  'feeds/fetchFeeds',
  async () => await getFeedsApi()
);

const initialState: FeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.isLoading = false;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      )
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  }
});

export default feedsSlice.reducer;