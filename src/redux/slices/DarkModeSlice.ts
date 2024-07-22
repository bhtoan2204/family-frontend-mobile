import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {RoomInterface} from 'src/interface/household/room';
import {HouseHoldCategoryInterface} from 'src/interface/household/household_category';

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
    setDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const {setDarkMode} = darkModeSlice.actions;

export default darkModeSlice.reducer;

export const getIsDarkMode = (state: RootState) => state.darkMode.isDarkMode;