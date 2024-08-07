import {TodoListItem, TodoListType} from 'src/interface/todo/todo';
import instance from '../httpInterceptor';
import {TodoListUrls} from '../urls/todoUrls';

const TodoListServices = {
  getAllTodoListType: async (id_family:number) => {
    const url = TodoListUrls.getTodoListTypes + `?id_family=${id_family}`;
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
      `?id_family=${id_family}` +
      `&page=${page}&itemsPerPage=${itemsPerPage}&sortBy=created_at&sortDirection=ASC`;
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
  addItem: async (
    id_family: number,
    id_checklist_type: number,
    task_name: string,
    description: string,
    due_date: string,
  ) => {
    const res = await instance.post(TodoListUrls.createTodoList, {
      id_family,
      id_checklist_type,
      task_name,
      description,
      due_date,
    });
    if (res.status === 200) {
      return res.data.data as TodoListItem;
    } else {
      return null;
    }
  },
};

export default TodoListServices;
