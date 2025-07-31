import reducer, { fetchFeeds, setFeedsData, initialState } from './feeds';
import { TOrdersData, TOrder } from '../../utils/types';

describe('feeds slice', () => {
  const data: TOrdersData = {
    orders: [
      {
        _id: '1',
        status: 'done',
        name: 'order',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: []
      }
    ],
    total: 1,
    totalToday: 1
  };

  it('should set loading on pending', () => {
    const state = reducer(initialState, fetchFeeds.pending('', undefined));
    expect(state.isLoading).toBe(true);
  });

  it('should handle fulfilled', () => {
    const state = reducer(
      initialState,
      fetchFeeds.fulfilled({ success: true, ...data }, '', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(data.orders);
    expect(state.total).toBe(data.total);
    expect(state.totalToday).toBe(data.totalToday);
  });

  it('should handle rejected', () => {
    const state = reducer(initialState, fetchFeeds.rejected(new Error('err'), '', undefined));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('err');
  });

  it('should handle setFeedsData', () => {
    const state = reducer(initialState, setFeedsData(data));
    expect(state.orders).toEqual(data.orders);
    expect(state.total).toBe(data.total);
    expect(state.totalToday).toBe(data.totalToday);
  });
});