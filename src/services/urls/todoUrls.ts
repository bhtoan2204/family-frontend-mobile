import baseUrl from './baseUrl';

export const TodoListUrls = {
  getTodoListTypes  : baseUrl + '/api/v1/checklist/getChecklistTypes',
  getFamilyTodoList: baseUrl + '/api/v1/checklist/getAllChecklist', ///{id_family},
  createTodoList   : baseUrl + '/api/v1/checklist/createChecklist',
};
