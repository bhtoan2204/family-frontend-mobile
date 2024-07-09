import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {RoomInterface} from 'src/interface/household/room';
import {HouseHoldCategoryInterface} from 'src/interface/household/household_category';


const initialState: HouseHoldCategoryInterface[] = [];

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<HouseHoldCategoryInterface[]>) {
      return action.payload;
    },
    clearCategories(state) {
      state = [];
    },
    addCategories(state, action: PayloadAction<HouseHoldCategoryInterface>) {
      state.push(action.payload);
      console.log(state);
    },
  },
});

export const {setCategories, clearCategories, addCategories} =
  categorySlice.actions;

export default categorySlice.reducer;
