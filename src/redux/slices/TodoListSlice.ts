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
}

const initialState: ShoppingListSliceState = {
  todoList: [],
  todoListType: [],
  dateSelected: new Date().toISOString(),
};

const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setTodoList: (state, action: PayloadAction<TodoListItem[]>) => {
      state.todoList = action.payload;
    },
    setTodoListType: (state, action: PayloadAction<TodoListType[]>) => {
      state.todoListType = action.payload;
    },

    addTodoList: (state, action: PayloadAction<TodoListItem>) => {
      state.todoList.push(action.payload);
    },
    updateDoneTodoList: (state, action: PayloadAction<{id_item: number}>) => {
      state.todoList = state.todoList.map(item => {
        if (item.id_checklist === action.payload.id_item) {
          return {
            ...item,
            is_completed: !item.is_completed,
          };
        }
        return item;
      });
    },
    updateDateTodoList: (
      state,
      action: PayloadAction<{id_item: number; date: string}>,
    ) => {
      state.todoList = state.todoList.map(item => {
        if (item.id_checklist === action.payload.id_item) {
          return {
            ...item,
            due_date: action.payload.date,
          };
        }
        return item;
      });
    },
    updateDescription: (
      state,
      action: PayloadAction<{id_item: number; description: string}>,
    ) => {
      state.todoList = state.todoList.map(item => {
        if (item.id_checklist === action.payload.id_item) {
          return {
            ...item,
            description: action.payload.description,
          };
        }
        return item;
      });
    },
    deleteTodoList: (state, action: PayloadAction<{id_item: number}>) => {
      state.todoList = state.todoList.filter(
        item => item.id_checklist !== action.payload.id_item,
      );
    },
    setDateSelected: (state, action: PayloadAction<string>) => {
      state.dateSelected = action.payload;
    },
    resetDateSelected: state => {
      state.dateSelected = new Date().toISOString();
    },
  },
});

export const {
  setTodoList,
  setTodoListType,
  addTodoList,
  updateDateTodoList,
  updateDescription,
  updateDoneTodoList,
  deleteTodoList,
  setDateSelected,
  resetDateSelected,
} = todoListSlice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default todoListSlice.reducer;
