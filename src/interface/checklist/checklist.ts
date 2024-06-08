export interface CheckListCategoryTypeInterface {
  id_item_type: number;
  item_type_name: string;
}

export interface CheckListCategoryInterface {
  id: number;
  id_item_type: number;
  category_name?: string;
  id_family: number;
  title: string;
  completed: number;
  total: number;
  createdAt: string;
  checklistItems: ChecklistItemInterface[];
}

export interface ChecklistItemInterface {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  isCompleted: boolean;
  createdAt: Date;
}
