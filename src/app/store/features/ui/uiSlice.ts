import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isNavigationMenuOpen: boolean;
  scrollProgress: number;
  isTransitioning: boolean;
  isInGalaxy: boolean;
  headerText: string;
  headerColor: string;
}

const initialState: UiState = {
  isNavigationMenuOpen: false,
  scrollProgress: 0,
  isTransitioning: false,
  isInGalaxy: false,
  headerText: "",
  headerColor: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isNavigationMenuOpen = action.payload;
    },
    updateScrollProgress: (state, action: PayloadAction<number>) => {
      state.scrollProgress = Math.min(Math.max(action.payload, 0), 1);
    },
    setTransitionState: (state, action: PayloadAction<boolean>) => {
      state.isTransitioning = action.payload;
    },
    setGalaxyState: (state, action: PayloadAction<boolean>) => {
      state.isInGalaxy = action.payload;
    },
    resetNavigation: (state) => {
      state.scrollProgress = 0;
      state.isTransitioning = false;
      state.isInGalaxy = false;
    },
    setHeaderText: (state, action: PayloadAction<string>) => {
      state.headerText = action.payload;
    },
    setHeaderColor: (state, action: PayloadAction<string>) => {
      state.headerColor = action.payload;
    },
  },
});

export const {
  updateScrollProgress: updateScrollProgressActionCreator,
  setTransitionState: setTransitionStateActionCreator,
  setGalaxyState: setGalaxyStateActionCreator,
  resetNavigation: resetNavigationActionCreator,
  toggleMenuOpen: toggleMenuOpenActionCreator,
  setHeaderText: setHeaderTextActionCreator,
  setHeaderColor: setHeaderColorActionCreator,
} = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
