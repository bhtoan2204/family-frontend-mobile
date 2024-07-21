export interface TodoListType {
  id_checklist_type: number;
  name_en: string;
  name_vn: string;
  icon_url: string;
}

// {
//     "id_checklist": 28,
//     "id_checklist_type": 3,
//     "id_family": 96,
//     "task_name": "Ngủ",
//     "description": "",
//     "is_completed": false,
//     "due_date": "2024-07-07T18:39:25.035Z",
//     "is_notified_3_days_before": false,
//     "is_notified_1_day_before": false,
//     "is_notified_on_due_date": true,
//     "created_at": "2024-07-07T18:39:30.954Z",
//     "updated_at": "2024-07-07T18:40:01.471Z",
//     "family": {
//       "id_family": 96,
//       "quantity": 5,
//       "name": "MyFamily",
//       "description": "abc",
//       "owner_id": "bd94ba3a-b046-4a05-a260-890913e09df9",
//       "expired_at": "2024-12-28T16:52:34.578Z",
//       "avatar": "https://storage.googleapis.com/famfund-bucket/avatar/avatar_family_bd94ba3a-b046-4a05-a260-890913e09df9_1720098199856_OIP.jpg",
//       "created_at": "2024-03-27T09:20:26.437Z",
//       "updated_at": "2024-07-04T13:03:29.056Z"
//     },
//     "checklistType": {
//       "id_checklist_type": 3,
//       "name_en": "Personal Tasks",
//       "name_vn": "Việc cá nhân",
//       "icon_url": "https://drive.google.com/file/d/1G8FD6vU8iZcBjo1uieuxAezsTBY8C9bL/view?usp=sharing"
//     }
//   },

// {
//   "id_checklist": 82,
//   "id_checklist_type": 1,
//   "id_family": 96,
//   "task_name": "Name of checklist",
//   "description": "Description of checklist",
//   "is_completed": false,
//   "due_date": "2024-06-06T00:00:00.000Z",
//   "is_notified_3_days_before": false,
//   "is_notified_1_day_before": false,
//   "is_notified_on_due_date": true,
//   "created_at": "2024-07-09T03:45:40.342Z",
//   "updated_at": "2024-07-10T11:05:26.353Z",
//   "checklistType": {
//     "id_checklist_type": 1,
//     "name_en": "Daily Tasks",
//     "name_vn": "Việc hằng ngày",
//     "icon_url": "https://lh3.googleusercontent.com/drive-viewer/AKGpihawGKcMy_7MCqKxATsVgZYndH__jY2eLPaZySWzfpq8I0XdEc4ZvPLvG5WZCekOTZH01EiRn5VB3un_aslz7WH2_DwptN10e6M=s2560"
//   }
// },

export interface TodoListItem {
  id_checklist: number;
  id_checklist_type: number;
  id_family: number;
  task_name: string;
  description: string;
  is_completed: boolean;
  due_date: string;
  is_notified_3_days_before: boolean;
  is_notified_1_day_before: boolean;
  is_notified_on_due_date: boolean;
  created_at: string;
  updated_at: string;
  checklistType: TodoListType;
}
