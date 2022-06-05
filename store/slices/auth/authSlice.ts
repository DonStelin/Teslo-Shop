import { IUser } from '@interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
  isLoggedIn: boolean;
  user?: IUser;
}

const initialState: authState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'AUTH',
  initialState,
  reducers: {
    login: (state: authState, { payload }: PayloadAction<IUser>) => {
      state.isLoggedIn = true;
      state.user = payload;
    },
    logout: (state: authState) => {
      state.isLoggedIn = false;
      state.user = undefined;
    },
  },
});

export const { login, logout } = authSlice.actions;
