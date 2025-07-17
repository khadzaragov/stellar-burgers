import React, { ReactElement, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUser, setAuthChecked } from '@slices/auth';
import { TLocationState } from '@utils-types';
import { Preloader } from '../ui/preloader';

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
  const { isLoggedIn, isAuthChecked, isLoading } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();

  useEffect(() => {
    if (!isAuthChecked) {
      if (localStorage.getItem('refreshToken')) {
        dispatch(fetchUser());
      } else {
        dispatch(setAuthChecked(true));
      }
    }
  }, [dispatch, isAuthChecked]);

  if (!isAuthChecked || isLoading) {
    return <Preloader />;
  }

  if (onlyAuth && !isLoggedIn) {
    // не авторизован — перенаправляем на логин
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  if (onlyUnAuth && isLoggedIn) {
    // уже залогинен — не пускаем на гостевые страницы
    const { from } = (location.state as TLocationState) || {
      from: { pathname: '/' }
    };
    return <Navigate to={from} replace />;
  }
  return children;
};

export default ProtectedRoute;
