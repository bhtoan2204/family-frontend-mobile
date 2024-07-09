import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ExpenseType } from 'src/interface/expense/ExpenseType';

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
      state.categories = [...state.categories, action.payload];
    },
    updateExpenseType: (state, action: PayloadAction<ExpenseType>) => {
      state.categories = state.categories.map(cat =>
        cat.id_expenditure_type === action.payload.id_expenditure_type ? action.payload : cat
      );
    },
    deleteExpenseType: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter(cat => cat.id_expenditure_type !== action.payload);
    },
    setSelectedExpenseType: (state, action: PayloadAction<ExpenseType | null>) => {
      state.selectedExpenseType = action.payload;
    },
  },
});

export const { setExpenseTypes, createExpenseType, updateExpenseType, deleteExpenseType, setSelectedExpenseType } = expenseTypeSlice.actions;

export const selectExpenseTypes = (state: RootState) => state.expenseType.categories;
export const selectSelectedExpenseType = (state: RootState) => state.expenseType.selectedExpenseType;

export default expenseTypeSlice.reducer;
