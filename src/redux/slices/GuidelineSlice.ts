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
      return [];
    },
    deleteGuideline(state, action: PayloadAction<number>) {
      return state.filter(
        guideline => guideline.id_guide_item !== action.payload,
      );
    },
    addGuideline(state, action: PayloadAction<Guildline>) {
      state.unshift(action.payload);
    },
    updateGuideline(state, action: PayloadAction<Guildline>) {
      const index = state.findIndex(
        guideline => guideline.id_guide_item === action.payload.id_guide_item,
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    updateGuidelineTitleAndDescription(
      state,
      action: PayloadAction<{
        id_guide_item: number;
        title: string;
        description: string;
      }>,
    ) {
      const index = state.findIndex(
        guideline => guideline.id_guide_item === action.payload.id_guide_item,
      );
      if (index !== -1) {
        state[index].name = action.payload.title;
        state[index].description = action.payload.description;
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
    updateMarkShareGuideline(
      state,
      action: PayloadAction<{id_guide_item: number; is_share: boolean}>,
    ) {
      const index = state.findIndex(
        guideline => guideline.id_guide_item === action.payload.id_guide_item,
      );
      if (index !== -1) {
        state[index].is_shared = action.payload.is_share;
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
  updateGuidelineTitleAndDescription,
  updateMarkShareGuideline,
} = guidelineSlice.actions;

export default guidelineSlice.reducer;
