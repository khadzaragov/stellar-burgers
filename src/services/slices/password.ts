import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { forgotPasswordApi, resetPasswordApi } from '../../utils/burger-api';

export interface PasswordState {
  isLoading: boolean;
  error: string | null;
}

export const forgotPassword = createAsyncThunk(
  'password/forgotPassword',
  async (data: { email: string }) => await forgotPasswordApi(data)
);

export const resetPassword = createAsyncThunk(
  'password/resetPassword',
  async (data: { password: string; token: string }) =>
    await resetPasswordApi(data)
);

const initialState: PasswordState = {
  isLoading: false,
  error: null
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  }
});

export default passwordSlice.reducer;
