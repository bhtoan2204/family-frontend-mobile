import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ComboPackage, Package, Service } from 'src/interface/package/mainPackage';


interface PackageSliceState {
    package: Package | null;
    service: Service | null;
    combo: ComboPackage | null;
    option : "Package" | "Service" | "Combo" | null;
}
const initialState: PackageSliceState = {
    package: null,
    service: null,
    option: null,
    combo: null,
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
    setCombos(state, action: PayloadAction<ComboPackage>) {
      state.combo = action.payload;
    },
    setOption(state, action: PayloadAction<"Package" | "Service" | "Combo" | null>) {
      state.option = action.payload;
    }

  },
});

export const { setCombos, setPackage,setServices,setOption} = packageSlice.actions;

export const selectPackage = (state: RootState) => state.package.package;
export const selectService = (state: RootState) => state.package.service;
export const selectOption = (state: RootState) => state.package.option;
export const selectCombo = (state: RootState) => state.package.combo;

export default packageSlice.reducer;
