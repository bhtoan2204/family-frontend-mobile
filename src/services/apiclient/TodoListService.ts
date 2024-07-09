import { TodoListType } from 'src/interface/todo/todo';
import instance from '../httpInterceptor';
import { TodoListUrls } from '../urls/todoUrls';

const TodoListServices = {
    getAllTodoListType: async () => {
        const url = TodoListUrls.getTodoListTypes
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
    }
};

export default TodoListServices;
