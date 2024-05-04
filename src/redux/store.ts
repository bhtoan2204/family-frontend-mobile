import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/ProfileSclice'
import FinanceReducer from './slices/FinanceSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    finace: FinanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
