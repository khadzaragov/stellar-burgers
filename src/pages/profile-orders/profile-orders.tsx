import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders, setUserOrders } from '@slices/orders';
import { selectUserOrders } from '@selectors';
import { useSocket } from '../../utils/use-socket';
import { TOrdersData } from '../../utils/types';
import { getCookie } from '../../utils/cookie';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);

  const token = (getCookie('accessToken') || '').replace('Bearer ', '');
  const wsBase = (process.env.BURGER_API_URL || '')
    .replace('https', 'wss')
    .replace('/api', '');
  useSocket<TOrdersData>(`${wsBase}/orders?token=${token}`, (data) => {
    dispatch(setUserOrders(data.orders));
  });

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
