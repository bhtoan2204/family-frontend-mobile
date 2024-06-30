
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Event } from 'src/interface/calendar/Event';
import { isMonday } from 'date-fns';
interface CalendarState {
    event : Event;
    id_family: number | undefined;
    selectDate: string;
    id_category_event: number,
    color: string,
    freq: string;
    isOnly: boolean;
}
const initialState: CalendarState = {
  event:{
    id_calendar: 0,
    title: '',
    time_start: new Date(),
    time_end: new Date(),
    description: '',
    color: '',
    is_all_day: false,
    category: 0,
    location: '',
    recurrence_exception: '',
    recurrence_id: 0,
    recurrence_rule: '',
    start_timezone: '',
    end_timezone: '',
    name_category: '',
  },
  id_family: 0,
  selectDate: (new Date()).toString(),
  id_category_event: 0,
  color: '',
  freq: '',
  isOnly: false,

};



const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {

    setFamily(state, action:PayloadAction<number | undefined>)
    {
      state.id_family = action.payload;
    },

    setDate(state, action:PayloadAction<string>)
    {
      state.selectDate = action.payload;
    },
  
    setEvent: (state, action: PayloadAction<Event>) => {
      state.event ={...state.event, ...action.payload};
    },
    setColor(state, action:PayloadAction<string>)
     {
      state.color = action.payload;
    },
    setIdcate(state, action:PayloadAction<number>)
    {
      state.id_category_event = action.payload;
    },
    setOnly(state, action:PayloadAction<boolean>)
    {
      state.isOnly = action.payload;
    },

  },
});

export const { setFamily, setDate, setEvent,setColor,setIdcate, setOnly} = calendarSlice.actions;

export const getFamily= (state: RootState) => state.calendar.id_family;
export const getDate= (state: RootState) => state.calendar.selectDate;
export const getEvent= (state: RootState) => state.calendar.event;
export const getColor= (state: RootState) => state.calendar.color;
export const getIDcate= (state: RootState) => state.calendar.id_category_event;
export const getFreq= (state: RootState) => state.calendar.freq;
export const getOnly= (state: RootState) => state.calendar.isOnly;

export default calendarSlice.reducer;