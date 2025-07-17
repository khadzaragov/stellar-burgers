import { FC, useMemo, useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import type { ConstructorState } from '@slices/burger-constructor';
import { useNavigate } from 'react-router-dom';
import {
  selectConstructorItems,
  selectOrderModalData,
  selectOrderRequest,
  selectIsLoggedIn
} from '@selectors';
import { createOrder, clearOrderModalData } from '@slices/orders';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems: ConstructorState = useSelector(
    selectConstructorItems
  );
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    const ids = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(ids));
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  useEffect(() => {
    return () => {
      dispatch(clearOrderModalData());
    };
  }, [dispatch]);

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsList = constructorItems.ingredients ?? []; // ← default-пустой массив
    const ingPrice = ingredientsList.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );
    return bunPrice + ingPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
