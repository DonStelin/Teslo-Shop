import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlide';
import uiReducer from './uiSlice';
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
