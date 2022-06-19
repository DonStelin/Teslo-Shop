import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICardProduct, shippingAddress } from '@interfaces';

export interface cartState {
  productsInCart: ICardProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isLoaded: boolean;
  address?: shippingAddress;
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
      state: cartState,
      { payload }: PayloadAction<ICardProduct[]>
    ) => {
      state.productsInCart = payload;
      state.isLoaded = true;
    },

    updateProductsInCart: (
      state: cartState,
      { payload }: PayloadAction<ICardProduct[]>
    ) => {
      state.productsInCart = payload;
    },
    updateOrderSummary: (
      state: cartState,
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
    loadAddressFromCookies(
      state: cartState,
      { payload }: PayloadAction<shippingAddress>
    ) {
      state.address = payload;
    },
    updateAddress(
      state: cartState,
      { payload }: PayloadAction<shippingAddress>
    ) {
      state.address = payload;
    },

    completeOrder(state: cartState) {
      state.productsInCart = [];
      state.numberOfItems = 0;
      state.subTotal = 0;
      state.tax = 0;
      state.total = 0;
    },
  },
});

export const {
  loadCartFromCookiesOrStorage,
  updateProductsInCart,
  updateOrderSummary,
  loadAddressFromCookies,
  updateAddress,
  completeOrder,
} = cartSlice.actions;
