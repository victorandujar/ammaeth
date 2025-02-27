import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isNavigationMenuOpen: boolean;
}

const initialState: UiState = {
  isNavigationMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isNavigationMenuOpen = action.payload;
    },
  },
});

export const { toggleMenuOpen: toggleMenuOpenActionCreator } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
