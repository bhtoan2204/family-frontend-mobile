import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Guildline, GuildLineDetail} from 'src/interface/guideline/guideline';

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
      return state.filter(
        guideline => guideline.id_guide_item !== action.payload,
      );
    },
    addGuideline(state, action: PayloadAction<Guildline>) {
      state.push(action.payload);
    },
    updateGuideline(state, action: PayloadAction<Guildline>) {
      const index = state.findIndex(
        guideline => guideline.id_guide_item === action.payload.id_guide_item,
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    updateGuidelineImage(
      state,
      action: PayloadAction<{
        id_guide_item: number;
        imageUrl: string;
      }>,
    ) {
      const index = state.findIndex(
        guideline => guideline.id_guide_item === action.payload.id_guide_item,
      );
      if (index !== -1) {
        if (state[index].steps) {
          state[index].steps[0].imageUrl = action.payload.imageUrl;
        }
      }
    },
    updateGuidelineData(state, action: PayloadAction<Guildline>) {
      const index = state.findIndex(
        guideline => guideline.id_guide_item === action.payload.id_guide_item,
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const {
  setGuideline,
  clearGuideline,
  deleteGuideline,
  addGuideline,
  updateGuideline,
  updateGuidelineData,
} = guidelineSlice.actions;

export default guidelineSlice.reducer;
