import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import profileReducer from './slices/ProfileSclice';
import checkListReducer from './slices/CheckListSlice';
import financeReducer from './slices/FinanceSlice';
import expenseAnalysisReducer from './slices/ExpenseAnalysis';
import calendarReducer from './slices/CalendarSlice';
import incomeAnalysisReducer from './slices/IncomeAnalysis';
import roomReducer from './slices/RoomSlice';
import guidelineReducer from './slices/GuidelineSlice';
import householdItemSlice from './slices/HouseHoldSlice';
import HouseHoldDetailSlice from './slices/HouseHoldDetailSlice';
import educationSlice from './slices/EducationSlice';
import memberSlice from './slices/MemberSlice';
import shoppingListSlice from './slices/ShoppingListSlice';
import forgorPasswordReducer from './slices/ForgotPassword';
import familyReducer from './slices/FamilySlice';
import categorySlice from './slices/CategorySlice';
import HouseHoldRefSlice from './slices/HouseHoldRefSlice';
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    family: familyReducer,
    checklist: checkListReducer,
    shoppinglist: shoppingListSlice,
    finance: financeReducer,
    expenseAnalysis: expenseAnalysisReducer,
    calendar: calendarReducer,
    incomeAnalysis: incomeAnalysisReducer,
    guidelines: guidelineReducer,
    //household
    room: roomReducer,
    householdItems: householdItemSlice,
    householdItemDetail: HouseHoldDetailSlice,
    category: categorySlice,
    householdRef: HouseHoldRefSlice,
    //education
    educations: educationSlice,
    members: memberSlice,
    forgorPassword: forgorPasswordReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
