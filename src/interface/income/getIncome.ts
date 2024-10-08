export interface Income {
  id_income: number;
  id_income_source: number;
  income_amount: string;
  income_date: string;
  description: string;
  income_category: string;
  name: string;
}

export interface ExpenseType {
  id_expenditure_type: number;
  expense_type_name: string;
}

export interface IncomeType {
  id_income_source: number;
  income_source_name: string;
  income_source_name_vn: string;
  id_family: number;
}
export interface UtilitiesType {
  id_utilities_type: number;
  name_en: string;
  name_vn: string;
}
