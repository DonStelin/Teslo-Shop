import { FC, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Cookie from 'js-cookie';
import { useAppDispatch } from '@store/hooks';
import { login } from '@store/authSlice';
import { tesloApi } from '@api';
import { IUser } from '@interfaces';

export const AuthWrapper: FC = ({ children }) => {
  const dispatch = useAppDispatch();

  const { data, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      // console.log({ user: data.user });
      dispatch(login(data?.user as IUser));
    }
  }, [status, data, dispatch]);

  // useEffect(() => {
  //   checkToken();
  // }, []);

  /*  const checkToken = async () => {
    if (!Cookie.get('token')) return;

    try {
      const { data } = await tesloApi('/user/validate-token');
      const { token, user } = data;
      Cookie.set('token', token, { expires: 7 });
      dispatch(login(user));
    } catch (error) {
      Cookie.remove('token');
    }
  }; */

  return <>{children}</>;
};
