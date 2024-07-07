
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
  selectedOption: 'Day' | 'Month' | 'Year';
  selectedDate: string;
}

const initialState: ExpenseSliceState = {
  expense: null,
  selectedOption: 'Day',
  selectedDate: new Date().toISOString().split('T')[0],
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setExpense: (state, action: PayloadAction<Expenditure>) => {
      state.expense = action.payload;
    },
    updateExpense :  (state, action: PayloadAction<Expenditure>) => {

      state.expense = {...state.expense, ...action.payload};

    },
    setSelectedOption(state, action: PayloadAction<'Day' | 'Month' | 'Year'>) {
      state.selectedOption = action.payload;
    },
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
  },
});

export const { setExpense, updateExpense,  setSelectedOption, setSelectedDate} = expenseSlice.actions;

export const selectExpense = (state: RootState) => state.expense.expense;
export const getOption= (state: RootState) => state.expense.selectedOption;
export const getDate= (state: RootState) => state.expense.selectedDate;

export default expenseSlice.reducer;
