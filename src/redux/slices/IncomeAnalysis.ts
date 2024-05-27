
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from '../store';

interface IncomeAnalysisState {
  selectedOption: 'Day' | 'Month' | 'Year';
  selectedDate: string;
}

const initialState: IncomeAnalysisState = {
  selectedOption: 'Day',
  selectedDate: new Date().toISOString().split('T')[0],
};

const incomeAnalysisSlice = createSlice({
  name: 'incomeAnalysis',
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

export const { setSelectedOption, setSelectedDate } = incomeAnalysisSlice.actions;

export const getOption= (state: RootState) => state.incomeAnalysis.selectedOption;
export const getDate= (state: RootState) => state.incomeAnalysis.selectedDate;

export default incomeAnalysisSlice.reducer;