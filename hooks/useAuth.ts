import Cookies from 'js-cookie';
import axios from 'axios';
import { tesloApi } from '@api';
import { useAppDispatch } from '@store/hooks';
import { login } from '@store/authSlice';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });

      const { token, user } = data;
      Cookies.set('token', token, { expires: 7 });
      dispatch(login(user));
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post('/user/register', {
        name,
        email,
        password,
      });

      const { token, user } = data;
      Cookies.set('token', token, { expires: 7 });
      dispatch(login(user));

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: ' Oops! Something went wrong. Please try again.',
      };
    }
  };

  const logout = () => {
    Cookies.remove('cart');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('zip');
    Cookies.remove('city');
    Cookies.remove('country');
    Cookies.remove('phone');
    signOut();
  };

  return { loginUser, registerUser, logout };
};
