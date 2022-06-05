import { tesloApi } from '@api';
import { IOrder } from '@interfaces';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '@store/index';
import Axios from 'axios';
import { NextRouter } from 'next/router';
import { SetStateAction, Dispatch as DispatchR } from 'react';
import { completeOrder } from './cartSlice';

export const createOrder = (
  setErrorMessage: DispatchR<SetStateAction<string>>,
  setIsPosting: DispatchR<SetStateAction<boolean>>,
  router: NextRouter
) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { address, productsInCart, numberOfItems, tax, total, subTotal } =
      getState().cart;

    if (!address) {
      throw new Error('Address is required');
    }

    const body: IOrder = {
      orderItems: productsInCart.map((product) => ({
        ...product,
        size: product.size!,
      })),
      shippingAddress: address,
      numberOfItems,
      tax,
      total,
      subTotal,
      isPaid: false,
    };

    try {
      const { data } = await tesloApi.post<IOrder>('/orders', body);
      dispatch(completeOrder());
      router.replace(`/orders/${data._id}`);
    } catch (error) {
      setIsPosting(false);
      if (Axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      } else {
        setErrorMessage('Something went wrong');
      }
    }
  };
};
