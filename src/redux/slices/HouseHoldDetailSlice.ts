import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {HouseHoldItemInterface} from 'src/interface/household/household_item';
import {gradients_list} from 'src/assets/images/gradients';
import {HouseHoldItemDetailInterface} from 'src/interface/household/household_item_detail';

const blankState: HouseHoldItemDetailInterface = {
  id_household_item: -1,
  id_family: -1,
  item_name: '',
  item_imageurl: '',
  description: '',
  id_category: 0,
  id_room: 0,
  category: {
    id_household_item_category: 0,
    category_name: '',
  },
  room: {
    id_room: 0,
    id_family: 0,
    room_name: '',
    created_at: '',
    updated_at: '',
  },
  durableItem: {
    id_household_item: 0,
    condition: '',
  },
  consumableItem: {
    id_household_item: 0,
    quantity: 0,
    threshold: 0,
    expired_date: '',
  },
};

const initialState: HouseHoldItemDetailInterface = {
  id_household_item: -1,
  id_family: -1,
  item_name: '',
  item_imageurl: '',
  description: '',
  id_category: 0,
  id_room: 0,
  category: {
    id_household_item_category: 0,
    category_name: '',
  },
  room: {
    id_room: 0,
    id_family: 0,
    room_name: '',
    created_at: '',
    updated_at: '',
  },
  durableItem: {
    id_household_item: 0,
    condition: '',
  },
  consumableItem: {
    id_household_item: 0,
    quantity: 0,
    threshold: 0,
    expired_date: '',
  },
};

const householdItemDetailSlice = createSlice({
  name: 'householdItemDetail',
  initialState,
  reducers: {
    setHouseholdItemDetail(
      state,
      action: PayloadAction<HouseHoldItemDetailInterface>,
    ) {
      return action.payload;
    },
    clearHouseholdItems(state) {
      return blankState;
    },
    updateImage(state, action: PayloadAction<string>) {
      state.item_imageurl = action.payload;
    },
    updateComsumableItem(
      state,
      action: PayloadAction<HouseHoldItemDetailInterface['consumableItem']>,
    ) {
      state.consumableItem = action.payload;
    },
    updateDurableItem(
      state,
      action: PayloadAction<HouseHoldItemDetailInterface['durableItem']>,
    ) {
      state.durableItem = action.payload;
    },
    updateTitle(state, action: PayloadAction<string>) {
      state.item_name = action.payload;
    },
    updateDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
  },
});

export const {
  setHouseholdItemDetail,
  clearHouseholdItems,
  updateComsumableItem,
  updateDurableItem,
  updateTitle,
  updateDescription,
  updateImage,
} = householdItemDetailSlice.actions;

export default householdItemDetailSlice.reducer;
