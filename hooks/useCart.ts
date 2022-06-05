import { shippingAddress, ICardProduct } from '@interfaces';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { updateProductsInCart, updateAddress } from '@store/slices/cart';
import Cookies from 'js-cookie';

export const useCart = () => {
  const cart = useAppSelector((state) => state.cart.productsInCart);
  const dispatch = useAppDispatch();

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
          return { ...p, quantity: p.quantity + product.quantity };
        }
        return p;
      });
    }
    dispatch(updateProductsInCart(newCart));
  };

  const updateQuantity = (newProduct: ICardProduct) => {
    const newCart = cart.map((product) => {
      if (product._id !== newProduct._id) return product;
      if (product.size !== newProduct.size) return product;
      return newProduct;
    });
    dispatch(updateProductsInCart(newCart));
  };

  const removeProductInCart = (product: ICardProduct) => {
    //Remove product from cart if the _id and size are the same

    const newCart = cart.filter(
      (p) => p._id !== product._id || p.size !== product.size
    );

    dispatch(updateProductsInCart(newCart));
  };

  const getAddressFromCookies = () => {
    const firstName = Cookies.get('firstName') || '';
    const lastName = Cookies.get('lastName') || '';
    const address = Cookies.get('address') || '';
    const address2 = Cookies.get('address2') || '';
    const zip = Cookies.get('zip') || '';
    const city = Cookies.get('city') || '';
    const country = Cookies.get('country') || '';
    const phone = Cookies.get('phone') || '';

    return {
      firstName,
      lastName,
      address,
      address2,
      zip,
      city,
      country,
      phone,
    };
  };

  const updateUserAddress = (address: shippingAddress) => {
    Cookies.set('firstName', address.firstName, { expires: 7 });
    Cookies.set('lastName', address.lastName, { expires: 7 });
    Cookies.set('address', address.address, { expires: 7 });
    Cookies.set('address2', address.address2 || '', { expires: 7 });
    Cookies.set('zip', address.zip, { expires: 7 });
    Cookies.set('city', address.city, { expires: 7 });
    Cookies.set('country', address.country, { expires: 7 });
    Cookies.set('phone', address.phone, { expires: 7 });
    dispatch(updateAddress(address));
  };

  return {
    addToCart,
    updateQuantity,
    removeProductInCart,
    getAddressFromCookies,
    updateUserAddress,
  };
};
