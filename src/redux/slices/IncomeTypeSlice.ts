import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {IncomeType} from 'src/interface/income/getIncome';

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
      const categoriesArray = Array.isArray(state.categories)
        ? state.categories
        : Object.values(state.categories); // Chuyển đổi nếu cần

      categoriesArray.push(action.payload);
      state.categories = categoriesArray; // Cập nhật lại state.categories
    },
    updateIncomeType: (state, action: PayloadAction<IncomeType>) => {
      const categoriesArray = Array.isArray(state.categories)
        ? state.categories
        : Object.values(state.categories); // Chuyển đổi nếu cần

      const index = categoriesArray.findIndex(
        cat => cat.id_income_source === action.payload.id_income_source,
      );
      if (index !== -1) {
        categoriesArray[index] = action.payload;
        state.categories = categoriesArray; // Cập nhật lại state.categories
      }
    },
    deleteIncomeType: (state, action: PayloadAction<number>) => {
      const categoriesArray = Array.isArray(state.categories)
        ? state.categories
        : Object.values(state.categories); // Chuyển đổi nếu cần

      state.categories = categoriesArray.filter(
        cat => cat.id_income_source !== action.payload,
      );
    },
    setSelectedIncomeType: (
      state,
      action: PayloadAction<IncomeType | null>,
    ) => {
      state.selectedIncomeType = action.payload;
    },
  },
});

export const {
  setIncomeTypes,
  addIncomeType,
  updateIncomeType,
  deleteIncomeType,
  setSelectedIncomeType,
} = incomeTypeSlice.actions;

export const selectIncomeTypes = (state: RootState) =>
  state.incomeType.categories;
export const selectSelectedIncomeType = (state: RootState) =>
  state.incomeType.selectedIncomeType;

export default incomeTypeSlice.reducer;
