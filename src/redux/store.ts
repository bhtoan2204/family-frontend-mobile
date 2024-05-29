import {configureStore} from '@reduxjs/toolkit';
import profileReducer from './slices/ProfileSclice';
import checkListReducer from './slices/CheckListSlice';
import financeReducer from './slices/FinanceSlice';
import expenseAnalysisReducer from './slices/ExpenseAnalysis';
import calendarReducer from './slices/CalendarSlice';
import incomeAnalysisReducer from './slices/IncomeAnalysis';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    checklist: checkListReducer,
    finance: financeReducer,
    expenseAnalysis: expenseAnalysisReducer,
    calendar: calendarReducer,
    incomeAnalysis: incomeAnalysisReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
