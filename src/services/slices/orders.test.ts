import reducer, {
  fetchUserOrders,
  createOrder,
  fetchOrderByNumber,
  clearOrderModalData,
  clearOrderDetails,
  setUserOrders
} from './orders';
import { TOrder } from '../../utils/types';

describe('orders slice', () => {
  const initialState = {
    orders: [],
    orderRequest: false,
    orderModalData: null,
    orderDetails: null,
    error: null
  };

  const order: TOrder = {
    _id: '1',
    status: 'done',
    name: 'order',
    createdAt: '',
    updatedAt: '',
    number: 1,
    ingredients: []
  };

  it('should set orders on fetchUserOrders.fulfilled', () => {
    const state = reducer(initialState, fetchUserOrders.fulfilled([order], '', undefined));
    expect(state.orders).toEqual([order]);
  });

  it('should handle createOrder pending and fulfilled', () => {
    let state = reducer(initialState, createOrder.pending('', []));
    expect(state.orderRequest).toBe(true);
    state = reducer(
      state,
      createOrder.fulfilled({ success: true, order, name: '' }, '', [])
    );
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(order);
  });

  it('should handle createOrder rejected', () => {
    const state = reducer(initialState, createOrder.rejected(new Error('err'), '', []));
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('err');
  });

  it('should handle fetchOrderByNumber.fulfilled', () => {
    const state = reducer(
      initialState,
      fetchOrderByNumber.fulfilled({ success: true, orders: [order] }, '', 1)
    );
    expect(state.orderDetails).toEqual(order);
  });

  it('should clear modal data and details', () => {
    let state = reducer({ ...initialState, orderModalData: order, orderDetails: order }, clearOrderModalData());
    expect(state.orderModalData).toBeNull();
    state = reducer({ ...state, orderDetails: order }, clearOrderDetails());
    expect(state.orderDetails).toBeNull();
  });

  it('should set user orders', () => {
    const state = reducer(initialState, setUserOrders([order]));
    expect(state.orders).toEqual([order]);
  });
});