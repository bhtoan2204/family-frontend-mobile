import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {ExpenseType} from 'src/interface/expense/ExpenseType';

interface ExpenseTypeSliceState {
  categories: ExpenseType[];
  selectedExpenseType: ExpenseType | null;
}

const initialState: ExpenseTypeSliceState = {
  categories: [],
  selectedExpenseType: null,
};

const expenseTypeSlice = createSlice({
  name: 'expenseType',
  initialState,
  reducers: {
    setExpenseTypes: (state, action: PayloadAction<ExpenseType[]>) => {
      state.categories = action.payload;
    },
    createExpenseType: (state, action: PayloadAction<ExpenseType>) => {
      const categoriesArray = Array.isArray(state.categories)
        ? state.categories
        : Object.values(state.categories);

      categoriesArray.push(action.payload);
      state.categories = categoriesArray;
    },
    updateExpenseType: (state, action: PayloadAction<ExpenseType>) => {
      const categoriesArray = Array.isArray(state.categories)
        ? state.categories
        : Object.values(state.categories);

      const index = categoriesArray.findIndex(
        cat => cat.id_expenditure_type === action.payload.id_expenditure_type,
      );
      if (index !== -1) {
        categoriesArray[index] = action.payload;
        state.categories = categoriesArray;
      }
    },
    deleteExpenseType: (state, action: PayloadAction<number>) => {
      const categoriesArray = Array.isArray(state.categories)
        ? state.categories
        : Object.values(state.categories);
      state.categories = categoriesArray.filter(
        cat => cat.id_expenditure_type !== action.payload,
      );
    },
    setSelectedExpenseType: (
      state,
      action: PayloadAction<ExpenseType | null>,
    ) => {
      state.selectedExpenseType = action.payload;
    },
  },
});

export const {
  setExpenseTypes,
  createExpenseType,
  updateExpenseType,
  deleteExpenseType,
  setSelectedExpenseType,
} = expenseTypeSlice.actions;

export const selectExpenseTypes = (state: RootState) =>
  state.expenseType.categories;
export const selectSelectedExpenseType = (state: RootState) =>
  state.expenseType.selectedExpenseType;

export default expenseTypeSlice.reducer;
