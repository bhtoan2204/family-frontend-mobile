import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

import {
  ShoppingListItem,
  ShoppingList,
  ShoppingListItemType,
  ShoppingListType,
} from 'src/interface/shopping/shopping_list';
import {TodoListType, TodoListItem} from 'src/interface/todo/todo';

interface ShoppingListSliceState {
  todoList: TodoListItem[];
  todoListType: TodoListType[];
  dateSelected: string;
  loading: boolean;
}

const initialState: ShoppingListSliceState = {
  todoList: [],
  todoListType: [],
  dateSelected: new Date().toISOString(),
  loading: false,
};

const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTodoList: (state, action: PayloadAction<TodoListItem[]>) => {
      state.todoList = action.payload;
    },
    setTodoListType: (state, action: PayloadAction<TodoListType[]>) => {
      state.todoListType = action.payload;
    },
    addTodoListType: (state, action: PayloadAction<TodoListType>) => {
      state.todoListType.push(action.payload);
    },
    addTodoListItem: (
      state,
      action: PayloadAction<{
        id_checklist_type: number;
        item: TodoListItem;
      }>,
    ) => {
      const index = state.todoListType.findIndex(
        item => item.id_checklist_type === action.payload.id_checklist_type,
      );
      if (index !== -1) {
        state.todoListType[index].checklists.push(action.payload.item);
      }
    },
    updateDoneTodoList: (
      state,
      action: PayloadAction<{
        id_checklist_type: number;
        id_checklist: number;
      }>,
    ) => {
      const index = state.todoListType.findIndex(
        item => item.id_checklist_type === action.payload.id_checklist_type,
      );
      if (index !== -1) {
        state.todoListType[index].checklists = state.todoListType[
          index
        ].checklists.map(item => {
          if (item.id_checklist === action.payload.id_checklist) {
            return {
              ...item,
              is_completed: !item.is_completed,
            };
          }
          return item;
        });
      }
    },
    updateDateTodoList: (
      state,
      action: PayloadAction<{
        id_checklist_type: number;
        id_checklist: number;
        date: string;
      }>,
    ) => {
      const index = state.todoListType.findIndex(
        item => item.id_checklist_type === action.payload.id_checklist_type,
      );
      if (index !== -1) {
        state.todoListType[index].checklists = state.todoListType[
          index
        ].checklists.map(item => {
          if (item.id_checklist === action.payload.id_checklist) {
            return {
              ...item,
              due_date: action.payload.date,
            };
          }
          return item;
        });
      }
    },
    updateDescription: (
      state,
      action: PayloadAction<{
        id_checklist_type: number;
        id_checklist: number;
        description: string;
      }>,
    ) => {
      const index = state.todoListType.findIndex(
        item => item.id_checklist_type === action.payload.id_checklist_type,
      );
      if (index !== -1) {
        state.todoListType[index].checklists = state.todoListType[
          index
        ].checklists.map(item => {
          if (item.id_checklist === action.payload.id_checklist) {
            return {
              ...item,
              description: action.payload.description,
            };
          }
          return item;
        });
      }
    },
    deleteTodoList: (
      state,
      action: PayloadAction<{
        id_checklist_type: number;
        id_checklist: number;
      }>,
    ) => {
      const index = state.todoListType.findIndex(
        item => item.id_checklist_type === action.payload.id_checklist_type,
      );
      if (index !== -1) {
        state.todoListType[index].checklists = state.todoListType[
          index
        ].checklists.filter(
          item => item.id_checklist !== action.payload.id_checklist,
        );
      }
    },
    setDateSelected: (state, action: PayloadAction<string>) => {
      state.dateSelected = action.payload;
    },
    resetDateSelected: state => {
      state.dateSelected = new Date().toISOString();
    },

    // addTodoList: (state, action: PayloadAction<TodoListItem>) => {
    //   state.todoList.push(action.payload);
    // },
    // updateDoneTodoList: (state, action: PayloadAction<{id_item: number}>) => {
    //   state.todoList = state.todoList.map(item => {
    //     if (item.id_checklist === action.payload.id_item) {
    //       return {
    //         ...item,
    //         is_completed: !item.is_completed,
    //       };
    //     }
    //     return item;
    //   });
    // },
    // updateDateTodoList: (
    //   state,
    //   action: PayloadAction<{id_item: number; date: string}>,
    // ) => {
    //   state.todoList = state.todoList.map(item => {
    //     if (item.id_checklist === action.payload.id_item) {
    //       return {
    //         ...item,
    //         due_date: action.payload.date,
    //       };
    //     }
    //     return item;
    //   });
    // },
    // updateDescription: (
    //   state,
    //   action: PayloadAction<{id_item: number; description: string}>,
    // ) => {
    //   state.todoList = state.todoList.map(item => {
    //     if (item.id_checklist === action.payload.id_item) {
    //       return {
    //         ...item,
    //         description: action.payload.description,
    //       };
    //     }
    //     return item;
    //   });
    // },
    // deleteTodoList: (state, action: PayloadAction<{id_item: number}>) => {
    //   state.todoList = state.todoList.filter(
    //     item => item.id_checklist !== action.payload.id_item,
    //   );
    // },
    // setDateSelected: (state, action: PayloadAction<string>) => {
    //   state.dateSelected = action.payload;
    // },
    // resetDateSelected: state => {
    //   state.dateSelected = new Date().toISOString();
    // },
  },
});

export const {
  setLoading,
  setTodoList,
  setTodoListType,
  addTodoListItem,
  addTodoListType,
  updateDateTodoList,
  updateDescription,
  updateDoneTodoList,
  deleteTodoList,
  setDateSelected,
  resetDateSelected,
} = todoListSlice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default todoListSlice.reducer;
