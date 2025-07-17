import { FC, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '@slices/auth';
import { selectAuthError } from '@selectors';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={error || undefined}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
