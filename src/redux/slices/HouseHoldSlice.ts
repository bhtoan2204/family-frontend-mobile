import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {HouseHoldItemInterface} from 'src/interface/household/household_item';
import {gradients_list} from 'src/assets/images/gradients';

const initialState: HouseHoldItemInterface[] = [];

const householdSlice = createSlice({
  name: 'householdItems',
  initialState,
  reducers: {
    setHouseholdItems(state, action: PayloadAction<HouseHoldItemInterface[]>) {
      return action.payload;
    },
    clearHouseholdItems(state) {
      return [];
    },
    addHouseholdItem(state, action: PayloadAction<HouseHoldItemInterface>) {
      const gradient =
        gradients_list[Math.floor(state.length % gradients_list.length)];

      const newItem: HouseHoldItemInterface = {
        ...action.payload,
        item_image: gradient,
      };
      console.log(newItem);
      state.push(newItem);
    },
    deleteHouseholdItem(state, action: PayloadAction<number>) {
      return state.filter(
        householdItem => householdItem.id_household_item !== action.payload,
      );
    },
  },
});

export const {
  setHouseholdItems,
  clearHouseholdItems,
  addHouseholdItem,
  deleteHouseholdItem,
} = householdSlice.actions;

export default householdSlice.reducer;
