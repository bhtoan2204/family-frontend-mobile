
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Expenditure {
  id_expenditure: number;
  id_expense_type: number;
  expense_amount: string;
  expenditure_date: string;
  description: string;
  name: string;
  expense_category: string;
  image_url: string;
}

interface ExpenseSliceState {
  expense: Expenditure | null; 
}

const initialState: ExpenseSliceState = {
  expense: null,
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setExpense: (state, action: PayloadAction<Expenditure>) => {
      state.expense = action.payload;
    },
  },
});

export const { setExpense } = expenseSlice.actions;

export const selectExpense = (state: RootState) => state.expense.expense;

export default expenseSlice.reducer;
