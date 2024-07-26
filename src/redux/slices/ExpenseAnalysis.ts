import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { DailyExpense } from 'src/interface/expense/DailyExpense';
import moment from 'moment';

interface ExpenseSliceState {
  expenses: DailyExpense[];
  sumExpense: number;
  selectedExpense: DailyExpense | null;
  selectedOption: 'Day' | 'Month' | 'Year';
  selectedDate: string;
}

const initialState: ExpenseSliceState = {
  expenses: [],
  sumExpense: 0,
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
    updateExpense: (state, action: PayloadAction<Partial<DailyExpense>>) => {
      const index = state.expenses.findIndex(expense => expense.id_expenditure === action.payload.id_expenditure);
      const payload = action.payload;

      if (index !== -1) {
        const oldAmount = state.expenses[index].amount;

        state.expenses[index] = { ...state.expenses[index], ...payload };
        const newAmount = state.expenses[index].amount;
        state.sumExpense = state.sumExpense - oldAmount + newAmount;

      }
      if (state.selectedExpense && state.selectedExpense.id_expenditure === payload.id_expenditure) {
        state.selectedExpense = { ...state.selectedExpense, ...payload };
      }
    },
    deleteExpense: (state, action: PayloadAction<number>) => {
      const expenseToRemove = state.expenses.find(expense => expense.id_expenditure === action.payload);
      if (expenseToRemove) {
        state.sumExpense -= expenseToRemove.amount;
      }
      
      state.expenses = state.expenses.filter(expense => expense.id_expenditure !== action.payload);
      if (state.selectedExpense && state.selectedExpense.id_expenditure === action.payload) {
        state.selectedExpense = null;
      }
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
    setSumExpense(state, action: PayloadAction<number>) {
      state.sumExpense = action.payload;
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
  setSumExpense,
} = expenseSlice.actions;

export const selectExpenses = (state: RootState) => state.expense.expenses;
export const selectSelectedExpense = (state: RootState) => state.expense.selectedExpense;
export const getOption = (state: RootState) => state.expense.selectedOption;
export const getDate = (state: RootState) => state.expense.selectedDate;
export const getSumExpense = (state: RootState) => state.expense.sumExpense;

export default expenseSlice.reducer;