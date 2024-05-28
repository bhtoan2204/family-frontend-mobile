
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from '../store';

interface calendarState {
  id_family: number | undefined,
  id_category_event: number,
  color: string,
}

const initialState: calendarState = {
    id_family: 0, 
    id_category_event: 0, 
    color: '',
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {

    setFamily(state, action: PayloadAction<number | undefined>) {
      state.id_family = action.payload;
    },

    setColor(state, action:PayloadAction<string>)
    {
      state.color = action.payload;
    },
    setIdcate(state, action:PayloadAction<number>)
    {
      state.id_category_event = action.payload;
    }
  },
});

export const { setFamily,setColor,setIdcate } = calendarSlice.actions;

export const getFamily= (state: RootState) => state.calendar.id_family;
export const getColor= (state: RootState) => state.calendar.color;
export const getIDcate= (state: RootState) => state.calendar.id_category_event;

export default calendarSlice.reducer;