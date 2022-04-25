import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import cartReducer from './cartSlice';
import uiReducer from './uiSlice';
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
