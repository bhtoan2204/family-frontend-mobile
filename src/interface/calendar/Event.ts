import {ShoppingListCategoryInterface} from '../checklist/checklist';

export interface Event {
  id_calendar: number;
  title: string;
  time_start: Date;
  time_end: Date;
  description: string;
  color: string;
  is_all_day: boolean;
  category: number;
  location: string;
  recurrence_exception: string;
  recurrence_id: number;
  recurrence_rule: string;
  start_timezone: string;
  end_timezone: string;
  name_category: string;
}

export interface CategoryEvent {
  id_category_event: number;
  id_family: number;
  title: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface EventDetail {
  id_calendar: number;
  id_family: number;
  category: number;
  title: string;
  description: string;
  time_start: string;
  time_end: string;
  is_all_day: boolean;
  location: string;
  color: string;
  start_timezone: string | null;
  end_timezone: string | null;
  recurrence_id: string | null;
  recurrence_exception: string | null;
  recurrence_rule: string;
  created_at: string;
  updated_at: string;
  categoryEvent: CategoryEvent;
  checklist: ShoppingListCategoryInterface[] | null;
}
