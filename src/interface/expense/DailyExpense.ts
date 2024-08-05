export interface DailyExpense {
  id_expenditure: number;
  id_family: number;
  id_expenditure_type: number | null;
  id_created_by: string | null;
  amount: number;
  expenditure_date: string | null;
  description: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  family: {
    id_family: number;
    quantity: number;
    name: string;
    description: string;
    owner_id: string;
    expired_at: string;
    avatar: string;
    created_at: string;
    updated_at: string;
  };
  financeExpenditureType: {
    id_expenditure_type: number | null;
    expense_type_name: string | null;
    id_family: number | null;
  } | null;
  users: {
    id_user: string;
    email: string;
    phone: string;
    firstname: string;
    lastname: string;
    created_at: string;
    updated_at: string;
    isphoneverified: boolean;
    isadmin: boolean;
    login_type: string;
    avatar: string;
    genre: string;
    birthdate: string;
    is_banned: boolean;
  };
  utilities: Utility;
}

export interface Utility {
  id_utility: number;
  id_family: number;
  id_utilities_type: number;
  description: string;
  image_url: string | null;
  value: number;
  id_expenditure: number;
  created_at: string;
  updated_at: string;
}
