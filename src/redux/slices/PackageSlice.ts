import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Package {
    id_main_package: number;
    name: string;
    price: number;
    description: string;
    duration_months: number;
  };

interface PackageSliceState {
    package: Package;
}
const initialState: PackageSliceState = {
    package: {
    id_main_package: 0,
    name: '',
    price: 0,
    description: '',
    duration_months: 0,
  },
};


const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {

    setPackage(state, action: PayloadAction<Package>) {
      state.package = action.payload;

    },

  },
});

export const { setPackage } = packageSlice.actions;

export const selectPackage = (state: RootState) => state.package.package;

export default packageSlice.reducer;
