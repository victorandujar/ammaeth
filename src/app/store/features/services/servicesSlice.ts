import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Service, ServiceSlice } from "@/app/modules/services/domain/Service";

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
