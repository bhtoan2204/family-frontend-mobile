export interface ChecklistItemInterface {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  priority: number;
  isCompleted: boolean;
  createdAt: Date;
}
