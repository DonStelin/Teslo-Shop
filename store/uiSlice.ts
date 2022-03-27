import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    toggleSideMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { toggleSideMenu } = uiSlice.actions;

export default uiSlice.reducer;
