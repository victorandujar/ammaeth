import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  NavigationOptionStructure,
  NavigationState,
} from "@/app/modules/navigation/domain/Navigation";

const initialState: NavigationState = {
  options: [],
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    loadNavOptions: (
      currentNavigationState,
      action: PayloadAction<NavigationOptionStructure[]>,
    ) => ({
      ...currentNavigationState,
      options: action.payload,
    }),
  },
});

export const { loadNavOptions: loadNavOptionsActionCreator } =
  navigationSlice.actions;

export const navigationReducer = navigationSlice.reducer;
