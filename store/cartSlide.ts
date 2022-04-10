import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICardProduct } from '@interfaces';

export interface cartState {
  productsInCart: ICardProduct[];
}

const initialState: cartState = {
  productsInCart: [],
};

export const cartSlice = createSlice({
  name: 'CART',
  initialState,
  reducers: {
    loadCartFromCookiesOrStorage: (
      state,
      { payload }: PayloadAction<ICardProduct[]>
    ) => {
      state.productsInCart = payload;
    },

    updateProductsInCart: (
      state,
      { payload }: PayloadAction<ICardProduct[]>
    ) => {
      state.productsInCart = payload;
    },
  },
});

export const { loadCartFromCookiesOrStorage, updateProductsInCart } =
  cartSlice.actions;

export default cartSlice.reducer;
