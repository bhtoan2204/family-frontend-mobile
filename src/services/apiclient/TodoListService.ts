import {TodoListItem, TodoListType} from 'src/interface/todo/todo';
import instance from '../httpInterceptor';
import {TodoListUrls} from '../urls/todoUrls';
import baseUrl from '../urls/baseUrl';

const TodoListServices = {
  getAllTodoListType: async (id_family: number) => {
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
  addTodoListType: async ({
    name,
    id_family,
    id_calendar,
    icon_url,
  }: {
    name: string;
    id_family: number;
    id_calendar: number | null;
    icon_url: string;
  }) => {
    const res = await instance.post(TodoListUrls.createTodoListType, {
      name,
      id_family,
      id_calendar,
      icon_url,
    });
    if (res.status === 201) {
      return {
        ...res.data.data,
        checklists: [],
      } as TodoListType;
    } else {
      return null;
    }
  },
  addItem: async ({
    id_family,
    id_checklist_type,
    task_name,
    description,
    due_date,
  }: {
    id_family: number;
    id_checklist_type: number;
    task_name: string;
    description: string;
    due_date: string;
  }) => {
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
  updateItem: async ({
    id_checklist,
    id_family,
    id_checklist_type,
    task_name,
    description,
    due_date,
    is_completed,
  }: {
    id_checklist: number;
    id_family: number;
    id_checklist_type: number;
    task_name?: string;
    description?: string;
    due_date?: string;
    is_completed?: boolean;
  }) => {
    const body: any = {
      id_checklist,
      id_family,
      id_checklist_type,
    };
    if (task_name != undefined) {
      body['task_name'] = task_name;
    }
    if (description != undefined) {
      body['description'] = description;
    }
    if (due_date != undefined) {
      body['due_date'] = due_date;
    }
    if (is_completed != undefined) {
      body['is_completed'] = is_completed;
    }
    console.log(body);
    const res = await instance.put(TodoListUrls.updateTodoList, body);
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  },
  deleteItem: async ({
    id_checklist,
    id_family,
  }: {
    id_checklist: number;
    id_family: number;
  }) => {
    const url = TodoListUrls.deleteTodoList + `/${id_checklist}/${id_family}`;
    const res = await instance.delete(url);
    if (res.status === 204) {
      return true;
    } else {
      return false;
    }
  },
};

export default TodoListServices;
