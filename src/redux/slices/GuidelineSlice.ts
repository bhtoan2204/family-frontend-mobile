import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Guildline, GuildLineDetail} from 'src/interface/guideline/guideline';

interface GuidelineState {
  id_room: number;
  room_name: string;
}

const initialState: Guildline[] = [];

const guidelineSlice = createSlice({
  name: 'guidelines',
  initialState,
  reducers: {
    setGuideline(state, action: PayloadAction<Guildline[]>) {
      return action.payload;
    },
    clearGuideline(state) {
      state = [];
    },
    deleteGuideline(state, action: PayloadAction<number>) {
      return state.filter(guideline => guideline.id_item !== action.payload);
    },
    addGuideline(state, action: PayloadAction<Guildline>) {
      state.push(action.payload);
    },
  },
});

export const {setGuideline, clearGuideline, deleteGuideline, addGuideline} =
  guidelineSlice.actions;

export default guidelineSlice.reducer;
