import { FC, useEffect } from 'react';
import Cookie from 'js-cookie';
import { useAppDispatch } from '@store/hooks';
import { login } from '@store/authSlice';
import { tesloApi } from '@api';

export const AuthWrapper: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const { data } = await tesloApi('/user/validate-token');
      const { token, user } = data;
      Cookie.set('token', token, { expires: 7 });
      dispatch(login(user));
    } catch (error) {
      Cookie.remove('token');
    }
  };

  return <>{children}</>;
};
