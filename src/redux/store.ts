import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import profileReducer from './slices/ProfileSclice';
import checkListReducer from './slices/CheckListSlice';
import financeReducer from './slices/FinanceSlice';
import expenseAnalysisReducer from './slices/ExpenseAnalysis';
import calendarReducer from './slices/CalendarSlice';
import incomeAnalysisReducer from './slices/IncomeAnalysis';
import forgorPasswordReducer from './slices/ForgotPassword';
import familyReducer from './slices/FamilySlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    family: familyReducer,
    checklist: checkListReducer,
    finance: financeReducer,
    expenseAnalysis: expenseAnalysisReducer,
    calendar: calendarReducer,
    incomeAnalysis: incomeAnalysisReducer,
    forgorPassword: forgorPasswordReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
