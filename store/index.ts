import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth';
import { uiSlice } from './slices/ui';
import { cartSlice } from './slices/cart';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
