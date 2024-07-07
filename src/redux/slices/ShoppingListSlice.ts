import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

import {
  ShoppingListItem,
  ShoppingList,
  ShoppingListItemType,
  ShoppingListType,
} from 'src/interface/shopping/shopping_list';

interface ShoppingListSliceState {
  shoppingList: ShoppingList[];
  shoppingListType: ShoppingListType[];
  shoppingListItemType: ShoppingListItemType[];
}

const initialState: ShoppingListSliceState = {
  shoppingList: [],
  shoppingListType: [],
  shoppingListItemType: [],
};

const shoppingListSlice = createSlice({
  name: 'shoppinglist',
  initialState,
  reducers: {
    setShoppingList: (state, action: PayloadAction<ShoppingList[]>) => {
      state.shoppingList = action.payload;
    },
    setShoppingListType: (state, action: PayloadAction<ShoppingListType[]>) => {
      state.shoppingListType = action.payload;
    },
    setShoppingListItemType: (
      state,
      action: PayloadAction<ShoppingListItemType[]>,
    ) => {
      state.shoppingListItemType = action.payload;
    },
    addShoppingList: (state, action: PayloadAction<ShoppingList>) => {
      state.shoppingList.push(action.payload);
    },
    addShoppingListItem: (state, action: PayloadAction<ShoppingListItem>) => {
      const {id_list} = action.payload;
      const itemIndex = state.shoppingList.findIndex(
        list => list.id_list === id_list,
      );
      if (itemIndex !== -1) {
        state.shoppingList[itemIndex].items?.push(action.payload);
      }
    },
    addShoppingListItemType: (
      state,
      action: PayloadAction<ShoppingListItemType>,
    ) => {
      state.shoppingListItemType.push(action.payload);
    },
    addShoppingListType: (state, action: PayloadAction<ShoppingListType>) => {
      state.shoppingListType.push(action.payload);
    },
    updatePurchasedItem: (
      state,
      action: PayloadAction<{id_item: number; id_list: number}>,
    ) => {
      const {id_item, id_list} = action.payload;
      const itemIndex = state.shoppingList.findIndex(
        list => list.id_list === id_list,
      );
      if (itemIndex !== -1) {
        const item = state.shoppingList[itemIndex].items?.find(
          item => item.id_item === id_item,
        );
        if (item) {
          item.is_purchased = !item.is_purchased;
        }
      }
    },
    updatePriceItem: (
      state,
      action: PayloadAction<{id_item: number; id_list: number; price: string}>,
    ) => {
      const {id_item, id_list, price} = action.payload;
      const itemIndex = state.shoppingList.findIndex(
        list => list.id_list === id_list,
      );
      if (itemIndex !== -1) {
        const item = state.shoppingList[itemIndex].items?.find(
          item => item.id_item === id_item,
        );
        if (item) {
          item.price = price;
        }
      }
    },
    updateDescriptionItem: (
      state,
      action: PayloadAction<{
        id_item: number;
        id_list: number;
        description: string;
      }>,
    ) => {
      const {id_item, id_list, description} = action.payload;
      const itemIndex = state.shoppingList.findIndex(
        list => list.id_list === id_list,
      );
      if (itemIndex !== -1) {
        const item = state.shoppingList[itemIndex].items?.find(
          item => item.id_item === id_item,
        );
        if (item) {
          item.description = description;
        }
      }
    },
    updateReminderDateItem: (
      state,
      action: PayloadAction<{
        id_item: number;
        id_list: number;
        reminder_date: string;
      }>,
    ) => {
      const {id_item, id_list, reminder_date} = action.payload;
      const itemIndex = state.shoppingList.findIndex(
        list => list.id_list === id_list,
      );
      if (itemIndex !== -1) {
        const item = state.shoppingList[itemIndex].items?.find(
          item => item.id_item === id_item,
        );
        if (item) {
          item.reminder_date = reminder_date;
        }
      }
    },
  },
});

export const {
  setShoppingList,
  setShoppingListItemType,
  setShoppingListType,
  addShoppingList,
  addShoppingListItemType,
  addShoppingListType,
  updatePurchasedItem,
  addShoppingListItem,
  updateDescriptionItem,
  updatePriceItem,
  updateReminderDateItem
} = shoppingListSlice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default shoppingListSlice.reducer;
