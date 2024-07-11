import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { DailyIncome } from 'src/interface/income/IncomeDaily';
import moment from 'moment';

interface IncomeSliceState {
  incomeList: DailyIncome[];
  sumIncome: number;
  selectedIncome: DailyIncome | null;
  selectedOptionIncome: 'Day' | 'Month' | 'Year';
  selectedDateIncome: string;
}

const initialState: IncomeSliceState = {
  incomeList: [],
  sumIncome: 0,
  selectedIncome: null,
  selectedOptionIncome: 'Day',
  selectedDateIncome: new Date().toISOString().split('T')[0],
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setIncomeList: (state, action: PayloadAction<DailyIncome[]>) => {
      state.incomeList = action.payload;
    },
    setSelectedIncome: (state, action: PayloadAction<DailyIncome | null>) => {
      state.selectedIncome = action.payload;
    },
    setSelectedOptionIncome: (state, action: PayloadAction<'Day' | 'Month' | 'Year'>) => {
      state.selectedOptionIncome = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDateIncome = action.payload;
    },
    deleteIncome: (state, action: PayloadAction<number>) => {
      state.incomeList = state.incomeList.filter(income => income.id_income !== action.payload);
      if (state.selectedIncome && state.selectedIncome.id_income === action.payload) {
        state.selectedIncome = null;
      }
    },
    updateIncome: (state, action: PayloadAction<DailyIncome>) => {
      const index = state.incomeList.findIndex(income => income.id_income === action.payload.id_income);
      if (index !== -1) {
        state.incomeList[index] = action.payload;
      }
      if (state.selectedIncome && state.selectedIncome.id_income === action.payload.id_income) {
        state.selectedIncome = action.payload;
      }
    },
    setSumIncome(state, action: PayloadAction<number>) {
      state.sumIncome = action.payload;
    },
  },
});

export const { setSumIncome, setIncomeList, setSelectedIncome, setSelectedOptionIncome, setSelectedDate, deleteIncome, updateIncome } = incomeSlice.actions;

export const getIncomeList = (state: RootState) => state.income.incomeList;
export const getSelectedIncome = (state: RootState) => state.income.selectedIncome;
export const getSelectedOption = (state: RootState) => state.income.selectedOptionIncome;
export const getSelectedDate = (state: RootState) => state.income.selectedDateIncome;
export const getSumIncome = (state: RootState) => state.income.sumIncome;

export default incomeSlice.reducer;
