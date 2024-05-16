
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from '../store';

interface ExpenseAnalysisState {
  selectedOption: 'Day' | 'Month' | 'Year';
  selectedDate: string;
}

const initialState: ExpenseAnalysisState = {
  selectedOption: 'Day',
  selectedDate: moment().format('YYYY-MM-DD'), 
};

const expenseAnalysisSlice = createSlice({
  name: 'expenseAnalysis',
  initialState,
  reducers: {
    setSelectedOption(state, action: PayloadAction<'Day' | 'Month' | 'Year'>) {
      state.selectedOption = action.payload;
    },
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedOption, setSelectedDate } = expenseAnalysisSlice.actions;

export const getOption= (state: RootState) => state.expenseAnalysis.selectedOption;
export const getDate= (state: RootState) => state.expenseAnalysis.selectedDate;

export default expenseAnalysisSlice.reducer;