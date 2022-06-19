import { FC, useEffect } from 'react';
import Cookie from 'js-cookie';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  loadCartFromCookiesOrStorage,
  updateOrderSummary,
  loadAddressFromCookies,
} from '@store/cart';
import Cookies from 'js-cookie';

export const CartWrapper: FC = ({ children }) => {
  const { productsInCart: cart, subTotal: cartSubtotal } = useAppSelector(
    (state) => state.cart
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const cookies = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
      if (cart === cookies) return;
      dispatch(loadCartFromCookiesOrStorage(cookies));
    } catch (error) {
      dispatch(loadCartFromCookiesOrStorage([]));
    }
  }, []);

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(cart), { expires: 7 });
  }, [cart]);

  useEffect(() => {
    if (Cookies.get('firstName')) {
      const address = {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
      };

      dispatch(loadAddressFromCookies(address));
    }
  }, [dispatch]);

  useEffect(() => {
    if (cart.length === 0 && !cartSubtotal) return;
    const numberOfItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const tax = subTotal * taxRate;

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax,
      total: subTotal + subTotal * taxRate,
    };

    dispatch(updateOrderSummary(orderSummary));
  }, [cart]);

  return <>{children}</>;
};
