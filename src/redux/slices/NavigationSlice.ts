import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentNavigation: null,
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentNavigation: (state, action) => {
      state.currentNavigation = action.payload;
    },
  },
});

export const { setCurrentNavigation } = navigationSlice.actions;

export const selectCurrentNavigation = (state: any) => state.navigation.currentNavigation;

export default navigationSlice.reducer;
