import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICardProduct, direction } from '@interfaces';

export interface cartState {
  productsInCart: ICardProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isLoaded: boolean;
  address?: direction;
}

const initialState: cartState = {
  productsInCart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  isLoaded: false,
  address: undefined,
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
      state.isLoaded = true;
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
    loadAddressFromCookies(state, { payload }: PayloadAction<direction>) {
      state.address = payload;
    },
    updateAddress(state, { payload }: PayloadAction<direction>) {
      state.address = payload;
    },
  },
});

export const {
  loadCartFromCookiesOrStorage,
  updateProductsInCart,
  updateOrderSummary,
  loadAddressFromCookies,
  updateAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
