import {TodoListItem, TodoListType} from 'src/interface/todo/todo';
import instance from '../httpInterceptor';
import {TodoListUrls} from '../urls/todoUrls';
import baseUrl from '../urls/baseUrl';

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
  updateChecklist: async (
    id_checklist?: number,
    id_family: number | null,
    id_checklist_type?: number,
    task_name?: string,
    description?: string,
    due_date?: string,
    is_completed?: boolean,
    id_calendar?: number,
  ) => {
    try {
      const response = await instance.put(
        `${baseUrl}/api/v1/checklist/updateChecklist`,
        {
          id_checklist,
          id_family,
          id_checklist_type,
          task_name,
          description,
          due_date,
          is_completed,
          id_calendar,
        },
      );

      if (response.status === 200) {
        return response.data.data as TodoListItem;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
        return null;
      }
    } catch (error: any) {
      console.error('Error in updateChecklist:', error.message);
      throw error;
      return null;
    }
  },
  deleteChecklist: async (id_family: number | null, id_checklist?: number) => {
    try {
      const response = await instance.delete(
        TodoListUrls.deleteTodoList + `/${id_checklist}/${id_family}`,
      );

      if (response.status === 204) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      return false;
    }
  },
};

export default TodoListServices;
