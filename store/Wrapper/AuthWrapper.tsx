import { FC, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from '@store/hooks';
import { login } from '@store/slices/auth';
import { IUser } from '@interfaces';

export const AuthWrapper: FC = ({ children }) => {
  const dispatch = useAppDispatch();

  const { data, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(login(data?.user as IUser));
    }
  }, [status, data, dispatch]);

  return <>{children}</>;
};
