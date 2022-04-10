import { useEffect } from 'react';
import { ICardProduct } from '@interfaces';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import Cookie from 'js-cookie';
import {
  loadCartFromCookiesOrStorage,
  updateProductsInCart,
} from '@store/cartSlide';

export const useCart = () => {
  const cart = useAppSelector((state) => state.cart.productsInCart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(cart));
  }, [cart]);

  const loadCartFromCookies = () => {
    const cookies = Cookie.get('cart');
    if (cookies) {
      const cart = JSON.parse(cookies);
      dispatch(loadCartFromCookiesOrStorage(cart));
    }
  };

  const addToCart = (product: ICardProduct) => {
    let newCart;
    const productInCartWithSameSize = cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCartWithSameSize) {
      newCart = [...cart, product];
    } else {
      newCart = cart.map((p) => {
        if (p._id === product._id && p.size === product.size) {
          return { ...p, quantity: p.quantity + 1 };
        }
        return p;
      });
    }
    dispatch(updateProductsInCart(newCart));
  };

  return { addToCart, loadCartFromCookies };
};
