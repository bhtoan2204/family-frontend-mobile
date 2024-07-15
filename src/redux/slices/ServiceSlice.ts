
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ExtraPackage {
  id_extra_package: number;
  name: string;
  description: string | null; 
}
export interface FamilyService {
  id_family: number;
  extra_packages: ExtraPackage[];
}

interface FamilyServiceState {
  familyServices: FamilyService[];
}

const initialState: FamilyServiceState = {
  familyServices: [],
};

export const familyServiceSlice = createSlice({
  name: 'familyService',
  initialState,
  reducers: {
    setFamilyServices: (state, action: PayloadAction<FamilyService[]>) => {
      state.familyServices = action.payload;
    },
    addFamilyService: (state, action: PayloadAction<FamilyService>) => {
      state.familyServices.push(action.payload);
    },
    updateFamilyService: (state, action: PayloadAction<FamilyService>) => {
      const index = state.familyServices.findIndex(service => service.id_family === action.payload.id_family);
      if (index !== -1) {
        state.familyServices[index] = action.payload;
      }
    },
    clearFamilyServices: (state) => {
      state.familyServices = [];
    },
  },
});

export const {
  setFamilyServices,
  addFamilyService,
  updateFamilyService,
  clearFamilyServices,
} = familyServiceSlice.actions;

export const selectFamilyServices = (state: RootState) => state.familyService.familyServices;

export default familyServiceSlice.reducer;
