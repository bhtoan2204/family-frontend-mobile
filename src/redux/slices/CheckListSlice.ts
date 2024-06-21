import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {
  CheckListCategoryInterface,
  ChecklistItemInterface,
} from 'src/interface/checklist/checklist';

const initialState: CheckListCategoryInterface[] = [];

const checkListSlice = createSlice({
  name: 'checklist',
  initialState,
  reducers: {
    setInitialCheckList(
      state,
      action: PayloadAction<CheckListCategoryInterface[]>,
    ) {
      return action.payload;
    },
    setCheckListItemsForCheckList(
      state,
      action: PayloadAction<{id: number; items: ChecklistItemInterface[]}>,
    ) {
      const checkListIndex = state.findIndex(
        checklist => checklist.id_list === action.payload.id,
      );
      if (checkListIndex !== -1) {
        state[checkListIndex].checklistItems = action.payload.items;
      }
    },

    addNewCheckListItem(
      state,
      action: PayloadAction<CheckListCategoryInterface>,
    ) {
      state.push(action.payload);
    },
    increaseNewCheckListItemToCheckList(
      state,
      action: PayloadAction<{id: number}>,
    ) {
      const checkListIndex = state.findIndex(
        checklist => checklist.id_list === action.payload.id,
      );
      state[checkListIndex].total += 1;
    },
    decreaseCompletedCheckListItem(state, action: PayloadAction<{id: number}>) {
      const checkListIndex = state.findIndex(
        checklist => checklist.id_list === action.payload.id,
      );
      state[checkListIndex].completed += 1;
    },
    updateUnCompletedCheckListItem(state, action: PayloadAction<{id: number}>) {
      const checkListIndex = state.findIndex(
        checklist => checklist.id_list === action.payload.id,
      );
      state[checkListIndex].completed -= 1;
    },
    addNewCheckListItemToCheckList(
      state,
      action: PayloadAction<{id: number; item: ChecklistItemInterface}>,
    ) {
      const checkListIndex = state.findIndex(
        checklist => checklist.id_list === action.payload.id,
      );
      if (checkListIndex !== -1 && state[checkListIndex].checklistItems) {
        const newItem: ChecklistItemInterface = action.payload.item;
        newItem.id_item = `${state[checkListIndex].checklistItems.length + 1}`;
        state[checkListIndex].checklistItems.push(newItem);
        state[checkListIndex].total += 1;
      }
    },
    updateCheckListItemTitleAndDescription(
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
    updateCheckListItemPriority(
      state,
      action: PayloadAction<{
        id: number;
        id_checklist: string;
        priority: number;
      }>,
    ) {
      // const checkListIndex = state.findIndex(
      //   checklist => checklist.id === action.payload.id,
      // );
      // if (checkListIndex !== -1 && state[checkListIndex].checklistItems) {
      //   const checkListItemIndex = state[
      //     checkListIndex
      //   ].checklistItems.findIndex(
      //     item => item.id === action.payload.id_checklist,
      //   );
      //   if (checkListItemIndex !== -1) {
      //     state[checkListIndex].checklistItems[checkListItemIndex].priority =
      //       action.payload.priority;
      //   }
      // }
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
    updateCheckListItemDueDate(
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
    updateCheckListItemCompleted(
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
    updateCheckListItemQuantity(
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
    updateCheckListItemPrice(
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
  setInitialCheckList,
  addNewCheckListItem,
  increaseNewCheckListItemToCheckList,
  decreaseCompletedCheckListItem,
  updateUnCompletedCheckListItem,
  addNewCheckListItemToCheckList,
  updateCheckListItemTitleAndDescription,
  updateCheckListItemPriority,
  updateCheckListItemDueDate,
  setCheckListItemsForCheckList,
  updateCheckListItemCompleted,
  updateCheckListItemPrice,
  updateCheckListItemQuantity,
} = checkListSlice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default checkListSlice.reducer;
