import baseUrl from './baseUrl';

export const TodoListUrls = {
  getTodoListTypes: baseUrl + '/api/v1/checklist/getChecklistTypes',
  getFamilyTodoList: baseUrl + '/api/v1/checklist/getAllChecklist', ///{id_family},
  createTodoListType: baseUrl + '/api/v1/checklist/createChecklistType',
  createTodoList: baseUrl + '/api/v1/checklist/createChecklist',
  updateTodoList: baseUrl + '/api/v1/checklist/updateChecklist',
  deleteTodoList: baseUrl + '/api/v1/checklist/deleteChecklist',//id_checklist/id_family
};
