import {configureStore} from '@reduxjs/toolkit';
import profileReducer from './slices/ProfileSclice';
import checkListReducer from './slices/CheckListSlice';
import financeReducer from './slices/FinanceSlice';
import expenseAnalysisReducer from './slices/ExpenseAnalysis';
import calendarReducer from './slices/CalendarSlice';
import incomeAnalysisReducer from './slices/IncomeAnalysis';
import roomReducer from './slices/RoomSlice';
import guidelineReducer from './slices/GuidelineSlice';
import householdItemSlice from './slices/HouseHoldSlice';
import educationSlice from './slices/EducationSlice';
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    checklist: checkListReducer,
    finance: financeReducer,
    expenseAnalysis: expenseAnalysisReducer,
    calendar: calendarReducer,
    incomeAnalysis: incomeAnalysisReducer,
    room: roomReducer,
    guidelines: guidelineReducer,
    householdItems: householdItemSlice,
    educations: educationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
