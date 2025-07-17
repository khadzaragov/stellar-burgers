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
  isAuthChecked: boolean;
  error: string | null;
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async () => await getUserApi()
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  setCookie('accessToken', '', { expires: -1 });
});

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  isAuthChecked: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.isAuthChecked = action.payload;
    }
  },
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
          state.isAuthChecked = true;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
        state.isAuthChecked = true;
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
          state.isAuthChecked = true;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<{ user: TUser }>) => {
          state.user = action.payload.user;
          state.isLoggedIn = true;
          state.isAuthChecked = true;
          state.isLoading = false;
        }
      )
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<{ user: TUser }>) => {
          state.isLoading = false;
          state.user = action.payload.user;
        }
      )
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.isAuthChecked = true;
      });
  }
});

export const { setAuthChecked } = authSlice.actions;
export default authSlice.reducer;
