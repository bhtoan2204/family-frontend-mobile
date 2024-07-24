import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface DarkModeState {
  isDarkMode: boolean;
}

const initialState: DarkModeState = {
  isDarkMode: false,
};

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
  },
});

export const {setDarkMode} = darkModeSlice.actions;

export default darkModeSlice.reducer;

export const getIsDarkMode = (state: RootState) => state.darkMode.isDarkMode;