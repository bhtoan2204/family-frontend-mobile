import {configureStore} from '@reduxjs/toolkit';
import profileReducer from './slices/ProfileSclice';
import navigationReducer from './slices/NavigationSlice';
import checkListReducer from './slices/CheckListSlice';
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    navigation: navigationReducer,
    checklist: checkListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
