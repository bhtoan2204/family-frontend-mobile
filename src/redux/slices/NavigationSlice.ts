import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface NavigationState {
  currentNavigation: any;
}

const initialState: NavigationState = {
  currentNavigation: [],
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentNavigation: (state, action: PayloadAction<any>) => {
      state.currentNavigation = action.payload;
    },
  },
});

export const { setCurrentNavigation } = navigationSlice.actions;

export const selectCurrentNavigation = (state: RootState) => state.navigation.currentNavigation;

export default navigationSlice.reducer;
