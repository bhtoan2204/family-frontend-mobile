import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {HouseHoldItemInterface} from 'src/interface/household/household_item';
import {gradients_list} from 'src/assets/images/gradients';
import {RoomInterface} from 'src/interface/household/room';
import {HouseHoldCategoryInterface} from 'src/interface/household/household_category';

const initialState: {
  loading: boolean;
  items: HouseHoldItemInterface[];
  totalItem: number;
  rooms: RoomInterface[];
  totalRoom: number;
  categories: HouseHoldCategoryInterface[];
  totalCategory: number;
} = {
  loading: false,
  items: [],
  totalItem: 0,
  rooms: [],
  totalRoom: 0,
  categories: [],
  totalCategory: 0,
};

const householdSlice = createSlice({
  name: 'household',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setTotalItem(state, action: PayloadAction<number>) {
      state.totalItem = action.payload;
    },
    setTotalRoom(state, action: PayloadAction<number>) {
      state.totalRoom = action.payload;
    },
    setTotalCategory(state, action: PayloadAction<number>) {
      state.totalCategory = action.payload;
    },

    setHouseholdItems(state, action: PayloadAction<HouseHoldItemInterface[]>) {
      state.items = action.payload;
    },
    clearHouseholdData(state) {
      return {
        loading: false,
        items: [],
        rooms: [],
        categories: [],
        totalCategory: 0,
        totalItem: 0,
        totalRoom: 0,
      };
    },
    addHouseholdItem(state, action: PayloadAction<HouseHoldItemInterface>) {
      const gradient =
        gradients_list[Math.floor(state.items.length % gradients_list.length)];

      const newItem: HouseHoldItemInterface = {
        item_image: gradient,
        ...action.payload,
      };
      console.log(newItem);
      state.items.unshift(newItem);
    },
    deleteHouseholdItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        householdItem => householdItem.id_household_item !== action.payload,
      );
    },
    setRoom(state, action: PayloadAction<RoomInterface[]>) {
      state.rooms = action.payload;
    },
    clearRoom(state) {
      state.rooms = [];
    },
    addRoom(state, action: PayloadAction<RoomInterface>) {
      state.rooms.unshift(action.payload);
    },
    updateRoom(
      state,
      action: PayloadAction<{
        id_family: number;
        id_room: number;
        room_name?: string;
        room_image?: string;
      }>,
    ) {
      const index = state.rooms.findIndex(
        room => room.id_room === action.payload.id_room,
      );
      if (index !== -1) {
        if (action.payload.room_name)
          state.rooms[index].room_name = action.payload.room_name;
        if (action.payload.room_image)
          state.rooms[index].room_image = action.payload.room_image;
      }
    },
    setCategories(state, action: PayloadAction<HouseHoldCategoryInterface[]>) {
      state.categories = action.payload;
    },
    clearCategories(state) {
      state.categories = [];
    },
    addCategories(state, action: PayloadAction<HouseHoldCategoryInterface>) {
      state.categories.unshift(action.payload);
    },
    updateCategories(
      state,
      action: PayloadAction<{
        id_household_item_category: number;
        category_name: string;
      }>,
    ) {
      const index = state.categories.findIndex(
        category =>
          category.id_household_item_category ===
          action.payload.id_household_item_category,
      );
      if (index !== -1) {
        state.categories[index].category_name = action.payload.category_name;
      }
    },
  },
});

export const {
  setLoading,
  setHouseholdItems,
  clearHouseholdData,
  addHouseholdItem,
  deleteHouseholdItem,
  addCategories,
  addRoom,
  clearCategories,
  clearRoom,
  setCategories,
  setRoom,
  updateCategories,
  updateRoom,
  setTotalCategory,
  setTotalItem,
  setTotalRoom,
} = householdSlice.actions;

export default householdSlice.reducer;
