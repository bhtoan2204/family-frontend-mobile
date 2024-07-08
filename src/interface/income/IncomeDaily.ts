export interface DailyIncome {
    id_income: number;
    id_family: number;
    id_income_source: number;
    id_created_by: string;
    amount: number;
    income_date: string; 
    description: string;
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
    financeIncomeSource: {
      id_income_source: number;
      id_family: number;
      income_source_name: string;
    };
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
  }
  