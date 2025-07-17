import React, { ReactElement, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUser } from '@slices/auth';

interface Props {
  onlyAuth?: boolean;
  onlyUnAuth?: boolean;
  children: ReactElement;
}

const ProtectedRoute: React.FC<Props> = ({
  onlyAuth,
  onlyUnAuth,
  children
}) => {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn && localStorage.getItem('refreshToken')) {
      dispatch(fetchUser());
    }
  }, [dispatch, isLoggedIn]);

  if (isLoading) {
    return null;
  }

  if (onlyAuth && !isLoggedIn) {
    // не авторизован — перенаправляем на логин
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  if (onlyUnAuth && isLoggedIn) {
    // уже залогинен — не пускаем на гостевые страницы
    return <Navigate to='/' replace />;
  }
  return children;
};

export default ProtectedRoute;
