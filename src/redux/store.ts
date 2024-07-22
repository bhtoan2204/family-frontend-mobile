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
import HouseHoldDetailSlice from './slices/HouseHoldDetailSlice';
import educationSlice from './slices/EducationSlice';
import memberSlice from './slices/MemberSlice';
import shoppingListSlice from './slices/ShoppingListSlice';
import forgorPasswordReducer from './slices/ForgotPassword';
import familyReducer from './slices/FamilySlice';
import packagedReducer from './slices/PackageSlice';
import messageFamilyReducer from './slices/MessageFamily';
import MessageUserReducer from './slices/MessageUser';
import notificationsReducer from './slices/NotificationSlice';
import assetReducer from './slices/AssetSlice';
import incomeTypeReducer from './slices/IncomeTypeSlice';
import expenseTypeReducer from './slices/ExpenseTypeSlice';
import expenseReducer from './slices/ExpenseAnalysis';
import incomeReducer from './slices/IncomeAnalysis';

import categorySlice from './slices/CategorySlice';
import HouseHoldRefSlice from './slices/HouseHoldRefSlice';
import TodoListSlice from './slices/TodoListSlice';
import DarkModeSlice from './slices/DarkModeSlice';
import localizationReducer from './slices/languageSlice'
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    family: familyReducer,
    localization: localizationReducer,

    // checklist: checkListReducer,
    shoppinglist: shoppingListSlice,
    todoList: TodoListSlice,
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
    package: packagedReducer,
    messageFamily: messageFamilyReducer,
    message: MessageUserReducer,
    notifications: notificationsReducer,
    asset: assetReducer,
    incomeType: incomeTypeReducer,
    expenseType: expenseTypeReducer,
    expense: expenseReducer,
    income: incomeReducer,
    darkMode: DarkModeSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
