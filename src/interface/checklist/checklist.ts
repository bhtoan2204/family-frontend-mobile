export interface ShoppingListCategoryTypeInterface {
  id_item_type: number;
  item_type_name: string;
}

export interface ShoppingListCategoryInterface {
  id_list: number;
  id_item_type?: number;
  category_name?: string;
  id_family: number;
  title: string;
  completed: number;
  total: number;
  created_at?: string;
  checklistItems: ShoppingListItemInterface[];
}

export interface ShoppingListItemInterface {
  id_item: number;
  id_list: number;
  item_name: string;
  quantity: number;
  is_purchased: boolean;
  priority_level: number;
  reminder_date: string;
  price: string;
  description?: string;
  id_item_type: number;
  // title: string;
  // description: string;
  // dueDate: string;
  // priority: number;
  // isCompleted: boolean;
  // createdAt: Date;
}
