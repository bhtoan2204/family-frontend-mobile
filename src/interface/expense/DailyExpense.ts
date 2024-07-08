export interface DailyExpense {
    id_expenditure: number;
    id_family: number;
    id_expenditure_type: number;
    id_created_by: string;
    amount: number;
    expenditure_date: string;
    description: string;
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
        id_expenditure_type: number;
        expense_type_name: string;
        id_family: number;
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
