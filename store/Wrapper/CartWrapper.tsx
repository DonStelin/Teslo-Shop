import { FC, useEffect } from 'react';
import Cookie from 'js-cookie';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  loadCartFromCookiesOrStorage,
  updateOrderSummary,
} from '@store/cartSlice';

export const CartWrapper: FC = ({ children }) => {
  const cart = useAppSelector((state) => state.cart.productsInCart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const cookies = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
      dispatch(loadCartFromCookiesOrStorage(cookies));
    } catch (error) {
      dispatch(loadCartFromCookiesOrStorage([]));
    }
  }, []);

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(cart), { expires: 7 });
  }, [cart]);

  useEffect(() => {
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
      total: subTotal + tax,
    };

    dispatch(updateOrderSummary(orderSummary));
  }, [cart]);

  return <>{children}</>;
};
