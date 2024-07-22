
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  darkMode: true, 
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

export const selectDarkMode = (state: RootState) => state.theme.darkMode;

export default themeSlice.reducer;
