import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Package, Service } from 'src/interface/package/mainPackage';


interface PackageSliceState {
    package: Package | null;
    service: Service | null;
    option : "Package" | "Service" | "Combo" | null;
}
const initialState: PackageSliceState = {
    package: null,
    service: null,
    option: null,
};


const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {

    setPackage(state, action: PayloadAction<Package>) {
      state.package = action.payload;

    },
    setServices(state, action: PayloadAction<Service>) {
      state.service = action.payload;
    },
    setOption(state, action: PayloadAction<"Package" | "Service" | "Combo" | null>) {
      state.option = action.payload;
    }

  },
});

export const { setPackage,setServices,setOption} = packageSlice.actions;

export const selectPackage = (state: RootState) => state.package.package;
export const selectService = (state: RootState) => state.package.service;
export const selectOption = (state: RootState) => state.package.option;

export default packageSlice.reducer;
