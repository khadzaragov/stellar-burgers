import reducer, { fetchIngredients, initialState } from './ingredients';
import { TIngredient } from '../../utils/types';

describe('ingredients slice', () => {
  const data: TIngredient[] = [
    {
      _id: 'id1',
      name: 'name',
      type: 'bun',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 1,
      image: 'img',
      image_mobile: 'img',
      image_large: 'img'
    }
  ];

  it('should set loading on pending', () => {
    const state = reducer(initialState, fetchIngredients.pending('', undefined));
    expect(state.isLoading).toBe(true);
  });

  it('should handle fulfilled', () => {
    const state = reducer(
      initialState,
      fetchIngredients.fulfilled(data, '', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(data);
  });

  it('should handle rejected', () => {
    const state = reducer(
      initialState,
      fetchIngredients.rejected(new Error('err'), '', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('err');
  });
});