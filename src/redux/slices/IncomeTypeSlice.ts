import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IncomeType } from 'src/interface/income/getIncome';

interface IncomeTypeSliceState {
  categories: IncomeType[];
  selectedIncomeType: IncomeType | null;

}

const initialState: IncomeTypeSliceState = {
  categories: [],
  selectedIncomeType: null,

};

const incomeTypeSlice = createSlice({
  name: 'incomeType',
  initialState,
  reducers: {
    setIncomeTypes: (state, action: PayloadAction<IncomeType[]>) => {
      state.categories = action.payload;
    },
    addIncomeType: (state, action: PayloadAction<IncomeType>) => {
      state.categories.push(action.payload);
    },
    updateIncomeType: (state, action: PayloadAction<IncomeType>) => {
      const index = state.categories.findIndex(cat => cat.id_income_source === action.payload.id_income_source);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteIncomeType: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter(cat => cat.id_income_source !== action.payload);
    },
    setSelectedIncomeType: (state, action: PayloadAction<IncomeType | null>) => {
        state.selectedIncomeType = action.payload;
      },
  },
});

export const { setIncomeTypes, addIncomeType, updateIncomeType, deleteIncomeType, setSelectedIncomeType } = incomeTypeSlice.actions;

export const selectIncomeTypes = (state: RootState) => state.incomeType.categories;
export const selectSelectedIncomeType = (state: RootState) => state.incomeType.selectedIncomeType;

export default incomeTypeSlice.reducer;
