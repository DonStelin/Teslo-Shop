import { ICardProduct } from '@interfaces';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { updateProductsInCart } from '@store/cartSlice';

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

  return { addToCart, updateQuantity, removeProductInCart };
};
