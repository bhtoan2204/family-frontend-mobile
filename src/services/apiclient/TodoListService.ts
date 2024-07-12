import {TodoListItem, TodoListType} from 'src/interface/todo/todo';
import instance from '../httpInterceptor';
import {TodoListUrls} from '../urls/todoUrls';

const TodoListServices = {
  getAllTodoListType: async () => {
    const url = TodoListUrls.getTodoListTypes;
    console.log(url);
    try {
      const response = await instance.get(url);
      if (response.status === 200) {
        return response.data.data as TodoListType[];
      } else {
        return [];
      }
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  },
  getAllItemOfFamily: async (
    id_family: number,
    page: number,
    itemsPerPage: number,
  ) => {
    const url =
      TodoListUrls.getFamilyTodoList +
      `/${id_family}` +
      `?page=${page}&itemsPerPage=${itemsPerPage}`;
    console.log(url);
    try {
      const response = await instance.get(url);
      if (response.status === 200) {
        return response.data.data as TodoListItem[];
      } else {
        return [];
      }
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  },
};

export default TodoListServices;
