import { TOrder } from '@utils-types';
import type { ConstructorState } from '@slices/burger-constructor';

export type BurgerConstructorUIProps = {
  constructorItems: ConstructorState;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
