import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

interface Props {
  onlyAuth?: boolean;
  onlyUnAuth?: boolean;
  children: ReactElement;
}

const ProtectedRoute: React.FC<Props> = ({ onlyAuth, onlyUnAuth, children }) => {
  // достаём флаг авторизации из стора
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

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
