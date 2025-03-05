import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Service, ServiceSlice } from "@/app/modules/soul/domain/Service";

const initialState: ServiceSlice = {
  services: [],
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    loadServices: (
      currentNavigationState,
      action: PayloadAction<Service[]>,
    ) => ({
      ...currentNavigationState,
      services: action.payload,
    }),
  },
});

export const { loadServices: loadServicesActionCreator } =
  servicesSlice.actions;

export const servicesReducer = servicesSlice.reducer;
