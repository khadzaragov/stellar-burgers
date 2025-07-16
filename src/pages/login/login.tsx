import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '@slices/auth';
import { selectIsLoggedIn } from '@selectors';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      const redirectTo = (location.state as any)?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
    }
  }, [isLoggedIn, navigate, location.state]);

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
