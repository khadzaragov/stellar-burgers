import reducer, { loginUser, logout, registerUser, fetchUser, updateUser, setAuthChecked } from './auth';
import { TUser } from '../../utils/types';

describe('auth slice', () => {
  const initialState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    isAuthChecked: false,
    error: null
  };

  const user: TUser = { email: 'test@example.com', name: 'Test' };

  it('should handle loginUser pending and fulfilled', () => {
    let state = reducer(initialState, loginUser.pending('', { email: '', password: '' }));
    expect(state.isLoading).toBe(true);
    state = reducer(
      state,
      loginUser.fulfilled(
        { success: true, user, refreshToken: '', accessToken: '' },
        '',
        { email: '', password: '' }
      )
    );
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isLoggedIn).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });

  it('should handle loginUser rejected', () => {
    const state = reducer(initialState, loginUser.rejected(new Error('err'), '', { email: '', password: '' }));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('err');
    expect(state.isAuthChecked).toBe(true);
  });

  it('should handle logout fulfilled', () => {
    const state = reducer({ ...initialState, user }, logout.fulfilled(undefined, '', undefined));
    expect(state.user).toBeNull();
    expect(state.isLoggedIn).toBe(false);
  });

  it('should handle setAuthChecked', () => {
    const state = reducer(initialState, setAuthChecked(true));
    expect(state.isAuthChecked).toBe(true);
  });
});