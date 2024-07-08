import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/ProfileSclice';
import checkListReducer from './slices/CheckListSlice';
import financeReducer from './slices/FinanceSlice';
import expenseReducer from './slices/ExpenseAnalysis';
import calendarReducer from './slices/CalendarSlice';
import incomeReducer from './slices/IncomeAnalysis';
import forgorPasswordReducer from './slices/ForgotPassword';
import familyReducer from './slices/FamilySlice';
import packagedReducer from './slices/PackageSlice';
import messageFamilyReducer from './slices/MessageFamily';
import MessageUserReducer from './slices/MessageUser';
import notificationsReducer from './slices/NotificationSlice';
import assetReducer from './slices/AssetSlice';
import incomeTypeReducer from './slices/IncomeTypeSlice';
import expenseTypeReducer from './slices/ExpenseTypeSlice';
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    family: familyReducer,
    checklist: checkListReducer,
    finance: financeReducer,
    expense: expenseReducer,
    calendar: calendarReducer,
    income: incomeReducer,
    forgorPassword: forgorPasswordReducer,
    package: packagedReducer,
    messageFamily: messageFamilyReducer,
    message: MessageUserReducer,
    notifications: notificationsReducer,
    asset: assetReducer,
    incomeType: incomeTypeReducer,
    expenseType: expenseTypeReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
