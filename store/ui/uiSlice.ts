import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ISnackbarState = 'success' | 'error' | 'info' | null;

export interface uiState {
  isMenuOpen: boolean;
  snackbar: {
    isOpen: boolean;
    message: string;
    type: ISnackbarState;
  };
}

const initialState: uiState = {
  isMenuOpen: false,
  snackbar: {
    isOpen: false,
    message: '',
    type: null,
  },
};

export const uiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    toggleSideMenu(state: uiState) {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setSnackbarAlert(
      state: uiState,
      { payload }: PayloadAction<{ message: string; type: ISnackbarState }>
    ) {
      state.snackbar.isOpen = true;
      state.snackbar.message = payload.message;
      state.snackbar.type = payload.type;
    },
    clearSnackbar(state: uiState) {
      state.snackbar.isOpen = false;
      state.snackbar.message = '';
      state.snackbar.type = null;
    },
  },
});

export const { toggleSideMenu, clearSnackbar, setSnackbarAlert } =
  uiSlice.actions;
