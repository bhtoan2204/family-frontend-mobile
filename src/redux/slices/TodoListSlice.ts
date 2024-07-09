import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

import {
  ShoppingListItem,
  ShoppingList,
  ShoppingListItemType,
  ShoppingListType,
} from 'src/interface/shopping/shopping_list';
import {TodoList, TodoListType} from 'src/interface/todo/todo';

interface ShoppingListSliceState {
  todoList: TodoList[];
  todoListType: TodoListType[];
}

const initialState: ShoppingListSliceState = {
  todoList: [],
  todoListType: [],
};

const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setTodoList: (state, action: PayloadAction<TodoList[]>) => {
      state.todoList = action.payload;
    },
    setTodoListType: (state, action: PayloadAction<TodoListType[]>) => {
      state.todoListType = action.payload;
    },

    addTodoList: (state, action: PayloadAction<TodoList>) => {
      state.todoList.push(action.payload);
    },
  },
});

export const {setTodoList, setTodoListType, addTodoList} =
  todoListSlice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default todoListSlice.reducer;
