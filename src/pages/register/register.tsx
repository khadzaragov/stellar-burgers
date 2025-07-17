import { FC, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser } from '@slices/auth';
import { selectAuthError } from '@selectors';
import { RegisterUI } from '@ui-pages';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser({ email, name: userName, password }));
  };

  return (
    <RegisterUI
      errorText={error || undefined}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
