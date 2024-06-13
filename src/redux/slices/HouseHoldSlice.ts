import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

const initialState: HouseHoldItemInterface[] = [];

const householdSlice = createSlice({
  name: 'householdItems',
  initialState,
  reducers: {
    setHouseholdItems(state, action: PayloadAction<HouseHoldItemInterface[]>) {
      return action.payload;
    },
    clearHouseholdItems(state) {
      state = [];
    },
    addHouseholdItem(state, action: PayloadAction<HouseHoldItemInterface>) {
      state.push(action.payload);
    },
    deleteHouseholdItem(state, action: PayloadAction<number>) {
      return state.filter(
        householdItem => householdItem.id_household_item !== action.payload,
      );
    },
  },
});

export const {setHouseholdItems, clearHouseholdItems, addHouseholdItem,deleteHouseholdItem} =
  householdSlice.actions;

export default householdSlice.reducer;
