import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './burger-constructor';
import { TConstructorIngredient } from '../../utils/types';

describe('burgerConstructor slice', () => {
  const bun: TConstructorIngredient = {
    _id: 'bun1',
    id: 'uuid1',
    name: 'bun',
    type: 'bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 1,
    image: 'img',
    image_mobile: 'img',
    image_large: 'img'
  };

  const ingredient: TConstructorIngredient = {
    _id: 'ing1',
    id: 'uuid2',
    name: 'ing',
    type: 'main',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 2,
    image: 'img',
    image_mobile: 'img',
    image_large: 'img'
  };

  it('should handle addIngredient', () => {
    let state = reducer(undefined, addIngredient(bun));
    expect(state.bun).toEqual(bun);
    state = reducer(state, addIngredient(ingredient));
    expect(state.ingredients).toEqual([ingredient]);
  });

  it('should handle removeIngredient', () => {
    const start = { bun: null, ingredients: [ingredient] };
    const state = reducer(start, removeIngredient(0));
    expect(state.ingredients).toEqual([]);
  });

  it('should handle moveIngredient', () => {
    const ing2 = { ...ingredient, id: 'uuid3' };
    const start = { bun: null, ingredients: [ingredient, ing2] };
    const state = reducer(start, moveIngredient({ fromIndex: 0, toIndex: 1 }));
    expect(state.ingredients[1]).toEqual(ingredient);
  });

  it('should handle clearConstructor', () => {
    const start = { bun, ingredients: [ingredient] };
    const state = reducer(start, clearConstructor());
    expect(state).toEqual({ bun: null, ingredients: [] });
  });
});