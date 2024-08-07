import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
export interface ExtraPackage {
  id_extra_package: number;
  name: string;
  description: string;
}

interface ExtraPackageState {
  extraPackages: ExtraPackage[];
}

const initialState: ExtraPackageState = {
  extraPackages: [],
};

const extraPackageSlice = createSlice({
  name: 'extraPackage',
  initialState,
  reducers: {
    setExtraPackages(state, action: PayloadAction<ExtraPackage[]>) {
      state.extraPackages = action.payload;
    },
    addExtraPackage(state, action: PayloadAction<ExtraPackage>) {
      state.extraPackages.push(action.payload);
    },
    removeExtraPackage(state, action: PayloadAction<number>) {
      state.extraPackages = state.extraPackages.filter(
        pkg => pkg.id_extra_package !== action.payload,
      );
    },
    updateExtraPackage(state, action: PayloadAction<ExtraPackage>) {
      const index = state.extraPackages.findIndex(
        pkg => pkg.id_extra_package === action.payload.id_extra_package,
      );
      if (index !== -1) {
        state.extraPackages[index] = action.payload;
      }
    },
  },
});

export const {
  setExtraPackages,
  addExtraPackage,
  removeExtraPackage,
  updateExtraPackage,
} = extraPackageSlice.actions;

export const getExtraPackages = (state: RootState) =>
  state.extraPackage.extraPackages;

export default extraPackageSlice.reducer;
