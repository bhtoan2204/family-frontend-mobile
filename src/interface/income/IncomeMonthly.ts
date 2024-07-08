export interface IncomeMonthly {
    day: number;
    total: number;
    categories: { name: string; amount: number, id_income_source: number }[];
  }