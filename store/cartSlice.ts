import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICardProduct } from '@interfaces';

export interface cartState {
  productsInCart: ICardProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

const initialState: cartState = {
  productsInCart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
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
    updateOrderSummary: (
      state,
      {
        payload,
      }: PayloadAction<{
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      }>
    ) => {
      state.numberOfItems = payload.numberOfItems;
      state.subTotal = payload.subTotal;
      state.tax = payload.tax;
      state.total = payload.total;
    },
  },
});

export const {
  loadCartFromCookiesOrStorage,
  updateProductsInCart,
  updateOrderSummary,
} = cartSlice.actions;

export default cartSlice.reducer;
