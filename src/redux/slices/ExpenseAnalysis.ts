import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { DailyExpense } from 'src/interface/expense/DailyExpense';
import moment from 'moment';

interface ExpenseSliceState {
  expenses: DailyExpense[];
  selectedExpense: DailyExpense | null;
  selectedOption: 'Day' | 'Month' | 'Year';
  selectedDate: string;
}

const initialState: ExpenseSliceState = {
  expenses: [],
  selectedExpense: null,
  selectedOption: 'Day',
  selectedDate: moment(new Date()).format('YYYY-MM-DD'),
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<DailyExpense[]>) => {
      state.expenses = action.payload;
    },
    addExpense: (state, action: PayloadAction<DailyExpense>) => {
      state.expenses.push(action.payload);
    },
    updateExpense: (state, action: PayloadAction<DailyExpense>) => {
      const index = state.expenses.findIndex(expense => expense.id_expenditure === action.payload.id_expenditure);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    deleteExpense: (state, action: PayloadAction<number>) => {
      state.expenses = state.expenses.filter(expense => expense.id_expenditure !== action.payload);
      state.selectedExpense = null; 
    },
    
    setSelectedExpense: (state, action: PayloadAction<DailyExpense | null>) => {
      state.selectedExpense = action.payload;
    },
    setSelectedOption(state, action: PayloadAction<'Day' | 'Month' | 'Year'>) {
      state.selectedOption = action.payload;
    },
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
  },
});

export const {
  setExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  setSelectedExpense,
  setSelectedOption,
  setSelectedDate,
} = expenseSlice.actions;

export const selectExpenses = (state: RootState) => state.expense.expenses;
export const selectSelectedExpense = (state: RootState) => state.expense.selectedExpense;
export const getOption = (state: RootState) => state.expense.selectedOption;
export const getDate = (state: RootState) => state.expense.selectedDate;

export default expenseSlice.reducer;