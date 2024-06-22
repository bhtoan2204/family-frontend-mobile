import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {
  ShoppingListCategoryInterface,
  ShoppingListCategoryTypeInterface,
  ShoppingListItemInterface,
} from 'src/interface/checklist/checklist';

const initialState: ShoppingListCategoryInterface[] = [];

const shoppingListSlice = createSlice({
  name: 'shoppinglist',
  initialState,
  reducers: {
    setInitialShoppingList(
      state,
      action: PayloadAction<ShoppingListCategoryInterface[]>,
    ) {
      return action.payload;
    },
    setShoppingListItemsForShoppingList(
      state,
      action: PayloadAction<{id: number; items: ShoppingListItemInterface[]}>,
    ) {
      const checkListIndex = state.findIndex(
        checklist => checklist.id_list === action.payload.id,
      );
      if (checkListIndex !== -1) {
        state[checkListIndex].checklistItems = action.payload.items;
      }
    },

    addNewShoppingList(
      state,
      action: PayloadAction<ShoppingListCategoryInterface>,
    ) {
      state.push(action.payload);
    },
    increaseNewShoppingListItemToCheckList(
      state,
      action: PayloadAction<{id: number}>,
    ) {
      const checkListIndex = state.findIndex(
        checklist => checklist.id_list === action.payload.id,
      );
      state[checkListIndex].total += 1;
    },
    decreaseCompletedShoppingListItem(
      state,
      action: PayloadAction<{id: number}>,
    ) {
      const checkListIndex = state.findIndex(
        checklist => checklist.id_list === action.payload.id,
      );
      state[checkListIndex].completed += 1;
    },
    updateUnCompletedShoppingListItem(
      state,
      action: PayloadAction<{id: number}>,
    ) {
      const checkListIndex = state.findIndex(
        checklist => checklist.id_list === action.payload.id,
      );
      state[checkListIndex].completed -= 1;
    },
    addNewShoppingListToCheckList(
      state,
      action: PayloadAction<{id: number; item: ShoppingListItemInterface}>,
    ) {
      const checkListIndex = state.findIndex(
        checklist => checklist.id_list === action.payload.id,
      );
      if (checkListIndex !== -1 && state[checkListIndex].checklistItems) {
        const newItem: ShoppingListItemInterface = action.payload.item;
        newItem.id_item = `${state[checkListIndex].checklistItems.length + 1}`;
        state[checkListIndex].checklistItems.push(newItem);
        state[checkListIndex].total += 1;
      }
    },
    updateShoppingItemTitleAndDescription(
      state,
      action: PayloadAction<{
        id: number;
        id_checklist: string;
        title: string;
        description: string;
      }>,
    ) {
      const checkListIndex = state.findIndex(
        checklist => checklist.id_list === action.payload.id,
      );
      if (checkListIndex !== -1 && state[checkListIndex].checklistItems) {
        const checkListItemIndex = state[
          checkListIndex
        ].checklistItems.findIndex(
          item => item.id_item === action.payload.id_checklist,
        );
        if (checkListItemIndex !== -1) {
          state[checkListIndex].checklistItems[checkListItemIndex].item_name =
            action.payload.title;
          state[checkListIndex].checklistItems[checkListItemIndex].description =
            action.payload.description;
        }
      }
    },
    updateShoppingListItemPriority(
      state,
      action: PayloadAction<{
        id: number;
        id_checklist: string;
        priority: number;
      }>,
    ) {
      const checkListIndex = state.findIndex(
        checklist => checklist.id_list === action.payload.id,
      );
      if (checkListIndex !== -1) {
        const checkListItemIndex = state[
          checkListIndex
        ].checklistItems?.findIndex(
          item => item.id_item === action.payload.id_checklist,
        );
        if (checkListItemIndex !== undefined && checkListItemIndex !== -1) {
          state[checkListIndex].checklistItems[
            checkListItemIndex
          ].priority_level = action.payload.priority;
        }
      }
    },
    updateShoppingListItemDueDate(
      state,
      action: PayloadAction<{
        id: number;
        id_checklist: string;
        dueDate: string;
      }>,
    ) {
      const checkListIndex = state.findIndex(
        checklist => checklist.id_list === action.payload.id,
      );
      if (checkListIndex !== -1 && state[checkListIndex].checklistItems) {
        const checkListItemIndex = state[
          checkListIndex
        ].checklistItems.findIndex(
          item => item.id_item === action.payload.id_checklist,
        );
        if (checkListItemIndex !== -1) {
          state[checkListIndex].checklistItems[
            checkListItemIndex
          ].reminder_date = action.payload.dueDate;
        }
      }
    },
    updateShoppingListItemCompleted(
      state,
      action: PayloadAction<{
        id: number;
        id_checklist: string;
        isCompleted: boolean;
      }>,
    ) {
      const checkListIndex = state.findIndex(
        checklist => checklist.id_list === action.payload.id,
      );
      if (checkListIndex !== -1 && state[checkListIndex].checklistItems) {
        const checkListItemIndex = state[
          checkListIndex
        ].checklistItems.findIndex(
          item => item.id_item === action.payload.id_checklist,
        );
        if (checkListItemIndex !== -1) {
          state[checkListIndex].checklistItems[
            checkListItemIndex
          ].is_purchased = action.payload.isCompleted;
          if (action.payload.isCompleted) {
            state[checkListIndex].completed += 1;
          } else {
            state[checkListIndex].completed -= 1;
          }
        }
      }
    },
    updateShoppingListItemQuantity(
      state,
      action: PayloadAction<{
        id: number;
        id_checklist: string;
        quantity: number;
      }>,
    ) {
      const checkListIndex = state.findIndex(
        checklist => checklist.id_list === action.payload.id,
      );
      if (checkListIndex !== -1) {
        const checkListItemIndex = state[
          checkListIndex
        ].checklistItems?.findIndex(
          item => item.id_item === action.payload.id_checklist,
        );
        if (checkListItemIndex !== undefined && checkListItemIndex !== -1) {
          state[checkListIndex].checklistItems[checkListItemIndex].quantity =
            action.payload.quantity;
        }
      }
    },
    updateShoppingListItemPrice(
      state,
      action: PayloadAction<{
        id: number;
        id_checklist: string;
        price: string;
      }>,
    ) {
      const checkListIndex = state.findIndex(
        checklist => checklist.id_list === action.payload.id,
      );
      if (checkListIndex !== -1) {
        const checkListItemIndex = state[
          checkListIndex
        ].checklistItems?.findIndex(
          item => item.id_item === action.payload.id_checklist,
        );
        if (checkListItemIndex !== undefined && checkListItemIndex !== -1) {
          state[checkListIndex].checklistItems[checkListItemIndex].price =
            action.payload.price;
        }
      }
    },
  },
});

export const {
  setInitialShoppingList,
  setShoppingListItemsForShoppingList,
  addNewShoppingList,
  increaseNewShoppingListItemToCheckList,
  decreaseCompletedShoppingListItem,
  updateUnCompletedShoppingListItem,
  addNewShoppingListToCheckList,
  updateShoppingItemTitleAndDescription,
  updateShoppingListItemPriority,
  updateShoppingListItemDueDate,
  updateShoppingListItemCompleted,
  updateShoppingListItemQuantity,
  updateShoppingListItemPrice,
} = shoppingListSlice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default shoppingListSlice.reducer;
