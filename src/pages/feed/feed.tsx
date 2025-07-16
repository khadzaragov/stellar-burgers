import { useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds, setFeedsData } from '@slices/feeds';
import { selectFeedOrders, selectFeedsLoading } from '@selectors';
import { useSocket } from '../../utils/use-socket';
import { TOrdersData } from '../../utils/types';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedsLoading);

  const wsBase = (process.env.BURGER_API_URL || '')
    .replace('https', 'wss')
    .replace('/api', '');
  useSocket<TOrdersData>(`${wsBase}/orders/all`, (data) => {
    dispatch(setFeedsData(data));
  });

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
