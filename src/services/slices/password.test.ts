import reducer, { forgotPassword, resetPassword } from './password';

describe('password slice', () => {
  const initialState = { isLoading: false, error: null };

  it('should handle forgotPassword pending and fulfilled', () => {
    let state = reducer(initialState, forgotPassword.pending('', { email: 'test@example.com' }));
    expect(state.isLoading).toBe(true);
    state = reducer(
      state,
      forgotPassword.fulfilled({ success: true }, '', { email: 'test@example.com' })
    );
    expect(state.isLoading).toBe(false);
  });

  it('should handle forgotPassword rejected', () => {
    const state = reducer(initialState, forgotPassword.rejected(new Error('err'), '', { email: 'test@example.com' }));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('err');
  });

  it('should handle resetPassword pending and fulfilled', () => {
    let state = reducer(initialState, resetPassword.pending('', { password: '1', token: 't' }));
    expect(state.isLoading).toBe(true);
    state = reducer(
      state,
      resetPassword.fulfilled({ success: true }, '', { password: '1', token: 't' })
    );
    expect(state.isLoading).toBe(false);
  });

  it('should handle resetPassword rejected', () => {
    const state = reducer(initialState, resetPassword.rejected(new Error('err'), '', { password: '1', token: 't' }));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('err');
  });
});