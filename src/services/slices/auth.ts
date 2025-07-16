import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TLoginData,
  TRegisterData
} from '../../utils/burger-api';
import { setCookie } from '../../utils/cookie';

interface AuthState {
  user: TUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: TLoginData) => await loginUserApi(data)
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async () => await getUserApi()
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => await logoutApi()
);

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: TUser;
            refreshToken: string;
            accessToken: string;
          }>
        ) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.isLoggedIn = true;
          localStorage.setItem('refreshToken', action.payload.refreshToken);
          setCookie('accessToken', action.payload.accessToken);
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: TUser;
            refreshToken: string;
            accessToken: string;
          }>
        ) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.isLoggedIn = true;
          localStorage.setItem('refreshToken', action.payload.refreshToken);
          setCookie('accessToken', action.payload.accessToken);
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<{ user: TUser }>) => {
          state.user = action.payload.user;
          state.isLoggedIn = true;
        }
      )
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<{ user: TUser }>) => {
          state.user = action.payload.user;
        }
      )
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        localStorage.removeItem('refreshToken');
        setCookie('accessToken', '', { expires: -1 });
      });
  }
});

export default authSlice.reducer;
