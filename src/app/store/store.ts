"use client";

import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { navigationReducer } from "./features/navigation/navigationSlice";
import { uiReducer } from "./features/ui/uiSlice";
import { servicesReducer } from "./features/services/servicesSlice";

const rootReducer = combineReducers({
  navigation: navigationReducer,
  ui: uiReducer,
  services: servicesReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = setupStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
