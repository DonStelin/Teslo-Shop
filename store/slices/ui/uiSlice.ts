import { createSlice } from '@reduxjs/toolkit';

export interface uiState {
  isMenuOpen: boolean;
}

const initialState: uiState = {
  isMenuOpen: false,
};

export const uiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    toggleSideMenu(state: uiState) {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { toggleSideMenu } = uiSlice.actions;
