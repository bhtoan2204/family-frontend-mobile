
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from '../store';

interface Income {
  id_income: number;
  id_income_source: number;
  income_amount: string;
  income_date: string;
  description: string;
  income_category: string;
  name: string;
}

interface IncomeSliceState {
  income: Income | null; 
}

const initialState: IncomeSliceState = {
  income: null,
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setIncomeDetails: (state, action: PayloadAction<Income>) => {
      state.income = action.payload;
    },
  },
});

export const { setIncomeDetails } = incomeSlice.actions;

export const getIncome= (state: RootState) => state.income.income;

export default incomeSlice.reducer;