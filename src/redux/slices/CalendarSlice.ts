
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from '../store';

interface calendarState {
  id_family: number | undefined,
  id_category_event: number,
  color: string,
  date: string;
  freq: string;

}

const initialState: calendarState = {
  id_family: 0,
  id_category_event: 0,
  color: '',
  date: (new Date()).toString(),
  freq: '',

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
    },

    setDate(state, action:PayloadAction<string>)
    {
      state.date = action.payload;
    },
    setFreq(state, action:PayloadAction<string>)
    {
      state.freq = action.payload;
    },
   
  },
});

export const { setFamily,setColor,setIdcate,setFreq, setDate} = calendarSlice.actions;

export const getFamily= (state: RootState) => state.calendar.id_family;
export const getColor= (state: RootState) => state.calendar.color;
export const getIDcate= (state: RootState) => state.calendar.id_category_event;
export const getDate= (state: RootState) => state.calendar.date;
export const getFreq= (state: RootState) => state.calendar.freq;

export default calendarSlice.reducer;